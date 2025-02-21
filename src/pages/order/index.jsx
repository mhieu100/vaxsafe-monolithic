import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTimePicker,
} from "@ant-design/pro-components";
import { Form, message, notification } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { callFetchCenter } from "../../config/api.center";
import { callAddAppointment } from "../../config/api.appointment";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const OrderPage = () => {
  const { vaccineId } = useParams();
  const [displayCenter, setDisplayCenter] = useState(null);

  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    fetchCenter();
  }, []);

  const fetchCenter = async () => {
    const res = await callFetchCenter();
    if (res && res.data) {
      setDisplayCenter(res.data.result);
    }
    // setIsLoading(false);
  };

  const [form] = Form.useForm();

  const handleReset = async () => {
    form.resetFields();

    await new Promise((r) => setTimeout(r, 400));
  };

  const submitOrder = async (valuesForm) => {
    await waitTime(2000);
    const { date, time, center, paymentType } = valuesForm;
    const res = await callAddAppointment(
      vaccineId,
      user.id,
      center,
      date,
      time,
      paymentType
    );
    if (res.statusCode === 200) {
      handleReset();
      message.success("Đặt lịch thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const paymentType = [
    { type: "CASH", name: "Tiền mặt" },
    { type: "CREDIT_CARD", name: "Thẻ" },
  ];

  return (
    <div className="m-3">
      <h3>Đăng ký lịch tiêm chủng của bạn {user.fullName}</h3>

      <ProForm
        initialValues={{
          date: null,
          time: null,
        }}
        className="mt-4"
        layout="horizontal"
        grid={{ span: 12 }}
        onFinish={submitOrder}
        form={form}
        submitter={{
          searchConfig: {
            submitText: "Xác nhận", // Đổi tên nút Submit
            resetText: "Làm mới", // Đổi tên nút Reset
          },
          resetButtonProps: {
            style: { backgroundColor: "#f0f0f0", color: "#000" }, // Tùy chỉnh nút Reset
          },
          submitButtonProps: {
            style: { backgroundColor: "#1890ff", color: "#fff" }, // Tùy chỉnh nút Submit
          },
        }}
      >
        <ProFormDatePicker
          colProps={{ xl: 8, md: 12 }}
          width="md"
          label="Ngày tiêm"
          name="date"
          placeholder="Chọn ngày tiêm"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày tiêm!",
            },
            {
              validator: (_, value) => {
                if (value && value.isBefore(new Date(), "day")) {
                  return Promise.reject(
                    "Ngày tiêm không được là ngày trong quá khứ!"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        />
        <ProFormTimePicker
          colProps={{ xl: 8, md: 12 }}
          width="md"
          label="Giờ tiêm"
          name="time"
          placeholder="Chọn giờ tiêm"
          fieldProps={{
            format: "HH:mm",
          }}
          // rules={[
          //   {
          //     required: true,
          //     message: "Vui lòng chọn giờ tiêm!",
          //   },
          //   {
          //     validator: (_, value) => {
          //       const selectedDate = form.getFieldValue("date");
          //       if (selectedDate && value) {
          //         const selectedDateTime = moment(selectedDate).set({
          //           hour: value.hour(),
          //           minute: value.minute(),
          //         });
          //         if (selectedDateTime.isBefore(moment())) {
          //           return Promise.reject(
          //             "Giờ tiêm không được là thời gian trong quá khứ!"
          //           );
          //         }
          //       }
          //       return Promise.resolve();
          //     },
          //   },
          // ]}
        />

        <ProFormSelect
          width="md"
          name="center"
          label="Trung tâm tiêm chủng"
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

        <ProFormSelect
          width="md"
          name="paymentType"
          label="Phương thức thanh toán"
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
      </ProForm>
    </div>
  );
};

export default OrderPage;
