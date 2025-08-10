import { Col, Form, message, notification, Row } from 'antd';
import { useEffect, useState } from 'react';
import { ModalForm, ProFormDatePicker, ProFormSelect, ProFormTimePicker } from '@ant-design/pro-components';
import { useSelector } from 'react-redux';


import '../../styles/reset.scss';

import { callAddAppointmentCash, callAddAppointmentCreditCard } from '../../config/api.appointment';
import { callFetchCenter } from '../../config/api.center';
import { useNavigate } from 'react-router-dom';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const ModalOrder = (props) => {
  const navigate = useNavigate();
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
    const { date, time, center, paymentType } = valuesForm;
  
    if (paymentType === 'CREDIT_CARD') {
      const res = await callAddAppointmentCreditCard(
        vaccine.vaccineId,
        user.id,
        center,
        date,
        time,
      );
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
        message.success('Appointment booked successfully');
        handleReset();
        navigate('/success');
      } else {
        notification.error({
          message: 'An error occurred',
          description: res.message,
        });
      }
    }
  };
  
  const paymentType = [
    { type: 'CASH', name: 'Cash' },
    { type: 'CREDIT_CARD', name: 'Card ATM' },
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
      {openModal && (
        <ModalForm
          title="Book Vaccination Appointment"
          open={openModal}
          scrollToFirstError={true}
          preserve={false}
          form={form}
          submitter={{
            searchConfig: {
              submitText: 'Book Appointment',
              resetText: 'Cancel',
            },
          }}
          onFinish={submitOrder}
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
        >
          <Row gutter={16}>
            <Col span={12}>
              <ProFormDatePicker
                colProps={{ xl: 12, md: 24 }}
                width="md"
                label="Vaccination Date"
                name="date"
                placeholder="Select vaccination date"
                rules={[
                  {
                    required: true,
                    message: 'Please select a vaccination date!',
                  },
                  {
                    validator: (_, value) => {
                      if (value && value.isBefore(new Date(), 'day')) {
                        return Promise.reject(
                          'Vaccination date cannot be in the past!'
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
                width="md"
                label="Vaccination Time"
                name="time"
                placeholder="Select vaccination time"
                fieldProps={{
                  format: 'HH:mm',
                }}
                rules={[
                  {
                    required: true,
                    message: 'Please select a vaccination time!',
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                colProps={{ xl: 12, md: 24 }}
                width="md"
                name="center"
                label="Vaccination Center"
                placeholder="Select vaccination center"
                rules={[
                  {
                    required: true,
                    message: 'Please select a vaccination location!',
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
                width="md"
                name="paymentType"
                label="Payment Method"
                placeholder="Select payment method"
                rules={[
                  {
                    required: true,
                    message: 'Please select a payment method!',
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