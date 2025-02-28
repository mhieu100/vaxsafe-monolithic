import { Col, Form, message, notification, Row } from 'antd';
import { useEffect, useState } from 'react';
import { ModalForm, ProFormDatePicker, ProFormSelect, ProFormTimePicker } from '@ant-design/pro-components';
import { useSelector } from 'react-redux';


import '../../styles/reset.scss';

import { callAddAppointmentCash, callAddAppointmentCreditCard } from '../../config/api.appointment';
import { callFetchCenter } from '../../config/api.center';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const ModalOrder = (props) => {

  const [displayCenter, setDisplayCenter] = useState(null);
  const [animation, setAnimation] = useState('open');
  const { openModal, setOpenModal, vaccine } = props;
  const [form] = Form.useForm();

  const user = useSelector((state) => state.account.user);

  const handleReset = async () => {
    form.resetFields();

    setAnimation('close');
    await new Promise((r) => setTimeout(r, 400));
    setOpenModal(false);
    setAnimation('open');
  };

  const submitOrder = async (valuesForm) => {
    await waitTime(2000);

    const { date, time, center, paymentType } = valuesForm;

    if (paymentType === 'CREDIT_CARD') {
      const res = await callAddAppointmentCreditCard(
        vaccine.vaccineId,
        user.id,
        center,
        date,
        time,);
      window.location.href = res;
    } else {
      const res = await callAddAppointmentCash(
        vaccine.vaccineId,
        user.id,
        center,
        date,
        time,
      );
      if (res.statusCode === 200) {
        message.success('Đặt lịch thành công');
        handleReset();
      } else {
        notification.error({
          message: 'Có lỗi xảy ra',
          description: res.message,
        });
      }
    }
  };
  const paymentType = [
    { type: 'CASH', name: 'Tiền mặt' },
    { type: 'CREDIT_CARD', name: 'Thẻ' },
  ];

  useEffect(() => {
    fetchCenter();
  }, []);

  const fetchCenter = async () => {
    const res = await callFetchCenter();
    if (res && res.data) {
      setDisplayCenter(res.data.result);
    }
  };

  return (
    <>
      {openModal && (<ModalForm title="Đặt lịch tiêm chủng" open={openModal} scrollToFirstError={true}
        preserve={false}
        form={form}
        submitter={{
          searchConfig: {
            submitText: 'Đặt lịch',
            resetText: 'Hủy bỏ',
          },

        }}
        onFinish={submitOrder} modalProps={{
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
        }}>
        <Row gutter={16}>

          <Col span={12}>
            <ProFormDatePicker
              colProps={{ xl: 12, md: 24 }}
              width='md'
              label='Ngày tiêm'
              name='date'
              placeholder='Chọn ngày tiêm'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ngày tiêm!',
                },
                {
                  validator: (_, value) => {
                    if (value && value.isBefore(new Date(), 'day')) {
                      return Promise.reject(
                        'Ngày tiêm không được là ngày trong quá khứ!'
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormTimePicker
              colProps={{ xl: 12, md: 24 }}
              width='md'
              label='Giờ tiêm'
              name='time'
              placeholder='Chọn giờ tiêm'
              fieldProps={{
                format: 'HH:mm',
              }}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn giờ tiêm!',
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              colProps={{ xl: 12, md: 24 }}
              width='md'
              name='center'
              label='Trung tâm tiêm chủng'
              placeholder='Chọn trung tâm tiêm chủng'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn địa điểm tiêm chủng!',
                },

              ]}
              options={
                displayCenter &&
                displayCenter.map((center) => {
                  return {
                    label: center.name,
                    value: center.centerId,
                  };
                })
              }
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              colProps={{ xl: 12, md: 24 }}
              width='md'
              name='paymentType'
              label='Phương thức thanh toán'
              placeholder='Chọn phương thức thanh toán'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn phương thức thanh toán!',
                },

              ]}
              options={
                paymentType &&
                paymentType.map((item) => {
                  return {
                    label: item.name,
                    value: item.type,
                  };
                })
              }
            />
          </Col>
        </Row>
      </ModalForm>)}

    </>
  );
};
export default ModalOrder;