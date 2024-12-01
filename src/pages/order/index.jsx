import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTimePicker,
} from "@ant-design/pro-components";
import { message } from "antd";
import { useEffect, useState } from "react";
import { callFetchCenter } from "../../config/api";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const OrderPage = () => {
  const [displayCenter, setDisplayCenter] = useState(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=name,desc");

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

  return (
    <div className="m-3">
      <h3>Đăng ký lịch tiêm chủng</h3>

      <ProForm
        className="mt-4"
        layout={"horizontal"}
        grid={{ span: 12 }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success("Đặt lịch thành công");
        }}
        params={{}}
        request={async () => {
          await waitTime(100);
          return {
            name: "蚂蚁设计有限公司",
            useMode: "chapter",
          };
        }}
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
            displayCenter.map((center, index) => {
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
