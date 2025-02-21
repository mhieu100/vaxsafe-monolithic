import { useEffect, useState } from 'react';
import { CheckSquareOutlined } from '@ant-design/icons';
import { Col, Form, message, notification, Row } from 'antd';
import { FooterToolbar, ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { callFetchDoctor } from '../../config/api.user';
import { callUpdateAppointment } from '../../config/api.appointment';
import '../../styles/reset.scss';

dayjs.extend(customParseFormat);

const ModalAppointment = (props) => {
  const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;

  const [form] = Form.useForm();
  const [animation, setAnimation] = useState('open');
  const [listDoctor, setListDoctor] = useState([]);

  // Fetch danh sách bác sĩ
  useEffect(() => {
    fetchDoctor();
  }, []); // Empty dependency array để chỉ chạy một lần khi component mount

  const fetchDoctor = async () => {
    const res = await callFetchDoctor();
    if (res && res.data) {
      setListDoctor(res.data.result);
    }
  };

  // Xử lý submit form
  const submitAppointment = async (valuesForm) => {
    const { doctorId } = valuesForm;
    const res = await callUpdateAppointment(dataInit.appointmentId, doctorId);

    if (res.data) {
      message.success('Cập nhật lịch tiêm chủng thành công');
      handleReset();
      reloadTable();
    } else {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: res.message,
      });
    }
  };

  // Reset form và đóng modal
  const handleReset = async () => {
    form.resetFields();
    setDataInit(null);

    // Thêm animation khi đóng modal
    setAnimation('close');
    await new Promise((resolve) => setTimeout(resolve, 400));
    setOpenModal(false);
    setAnimation('open');
  };

  return (
    <>
      {openModal && (
        <ModalForm
          title="Cập nhật đơn tiêm chủng"
          open={openModal}
          modalProps={{
            onCancel: () => {
              handleReset();
            },
            afterClose: () => handleReset(),
            destroyOnClose: true,
            footer: null,
            keyboard: false,
            maskClosable: false,
            className: `modal-company ${animation}`,
            rootClassName: `modal-company-root ${animation}`,
          }}
          scrollToFirstError
          preserve={false}
          form={form}
          onFinish={submitAppointment}
          initialValues={dataInit}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            submitButtonProps: {
              icon: <CheckSquareOutlined />,
            },
            searchConfig: {
              resetText: 'Hủy',
              submitText: <>Cập nhật</>,
            },
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText label="Tên Vaccine" name="vaccineName" disabled />
            </Col>
            <Col span={12}>
              <ProFormText label="Tên bệnh nhân" name="patientName" disabled />
            </Col>
            <Col span={12}>
              <ProFormText label="Ngày hẹn" name="appointmentDate" disabled />
            </Col>
            <Col span={12}>
              <ProFormText label="Giờ hẹn" name="appointmentTime" disabled />
            </Col>
            <Col span={12}>
              <ProFormText label="Trạng thái" name="status" disabled />
            </Col>
            <Col span={12}>
              <ProFormSelect
                width="100%"
                name="doctorId"
                label="Bác sĩ đảm nhận"
                placeholder="Chọn bác sĩ"
                options={listDoctor.map((doctor) => ({
                  label: doctor.fullname,
                  value: doctor.userId,
                }))}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn bác sĩ!',
                  },
                ]}
              />
            </Col>
          </Row>
        </ModalForm>
      )}
    </>
  );
};

export default ModalAppointment;