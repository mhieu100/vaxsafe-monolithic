import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTimePicker,
} from "@ant-design/pro-components";
import { Form, message, notification } from "antd";
import { useEffect, useState } from "react";
import { callFetchCenter, callOrder } from "../../config/api";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=name,desc");
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    setCurrent(1);
    setPageSize(100);
    setFilter("");
    setSortQuery("sort=name,desc");
    fetchCenter();
  }, [current, pageSize, filter, sortQuery]);

  const fetchCenter = async () => {
    // setIsLoading(true);
    let query = `page=${current}&size=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    const res = await callFetchCenter(query);
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
    const { date, time, center } = valuesForm;
    console.log(date, time, center, user.id, vaccineId);
    const res = await callOrder(vaccineId, user.id, center, date, time);
    if (res.data) {
      handleReset();
      message.success("Đặt lịch thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  return (
    <div className="m-3">
      <h3>Đăng ký lịch tiêm chủng của bạn {user.fullName}</h3>

      <ProForm
        className="mt-4"
        layout={"horizontal"}
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
          width={"md"}
          label="Ngày tiêm"
          name="date"
          placeholder={"Chọn ngày tiêm"}
        />
        <ProFormTimePicker
          colProps={{ xl: 8, md: 12 }}
          width={"md"}
          label="Giờ tiêm"
          name="time"
          placeholder={"Chọn giờ tiêm"}
          fieldProps={{
            format: "HH:mm",
          }}
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
                value: center.id,
              };
            })
          }
        />
      </ProForm>
    </div>
  );
};

export default OrderPage;
