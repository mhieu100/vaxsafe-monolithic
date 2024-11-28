/* eslint-disable react/prop-types */
import { CheckSquareOutlined } from "@ant-design/icons";
import {
  FooterToolbar,
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Col, Form, message, notification, Row } from "antd";
import { useState } from "react";
import "../../styles/reset.scss";
import { callCreateUser, callUpdateUser } from "../../config/api";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

const ModalUser = (props) => {
  const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;

  const [form] = Form.useForm();
  const [animation, setAnimation] = useState("open");

  const submitUser = async (valuesForm) => {
    const { fullName, email, phoneNumber, role, dateOfBirth, address } =
      valuesForm;
    if (dataInit?.userId) {
      //update
      const res = await callUpdateUser(
        dataInit.userId,
        fullName,
        email,
        phoneNumber,
        "12345",
        dataInit.role,
        dateOfBirth,
        address
      );
      if (res.data) {
        message.success("Cập nhật người dùng thành công");
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    } else {
      //create
      const res = await callCreateUser(
        fullName,
        email,
        phoneNumber,
        "12345",
        role,
        dateOfBirth,
        address
      );
      if (res.data) {
        message.success("Thêm mới người dùng thành công");
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: "Tạo người dùng thất bại",
          description: res.error,
        });
      }
    }
  };

  const handleReset = async () => {
    form.resetFields();
    setDataInit(null);

    //add animation when closing modal
    setAnimation("close");
    await new Promise((r) => setTimeout(r, 400));
    setOpenModal(false);
    setAnimation("open");
  };

  return (
    <>
      {openModal && (
        <>
          <ModalForm
            title={
              <>
                {dataInit?.vaccineId
                  ? "Cập nhật Người dùng"
                  : "Tạo mới Người dùng"}
              </>
            }
            open={openModal}
            modalProps={{
              onCancel: () => {
                handleReset();
              },
              afterClose: () => handleReset(),
              destroyOnClose: true,
              //   width: isMobile ? "100%" : 900,
              footer: null,
              keyboard: false,
              maskClosable: false,
              className: `modal-company ${animation}`,
              rootClassName: `modal-company-root ${animation}`,
            }}
            scrollToFirstError={true}
            preserve={false}
            form={form}
            onFinish={submitUser}
            initialValues={dataInit?.userId ? dataInit : {}}
            submitter={{
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
              submitButtonProps: {
                icon: <CheckSquareOutlined />,
              },
              searchConfig: {
                resetText: "Hủy",
                submitText: <>{dataInit?.userId ? "Cập nhật" : "Tạo mới"}</>,
              },
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  label="Tên người dùng"
                  name="fullName"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Nhập tên người dùng..."
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Password"
                  name="password"
                  disabled
                  placeholder="Default: 12345"
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Nhập email..."
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Nhập số điện thoại..."
                />
              </Col>
              <Col span={12}>
                <ProFormDatePicker
                  name="dateOfBirth"
                  label="Ngày sinh"
                  placeholder="Nhập ngày sinh..."
                  value={
                    dataInit?.dateOfBirth
                      ? dayjs(dataInit.dateOfBirth, dateFormat)
                      : null
                  }
                  width="100%"
                />
              </Col>
              <Col span={12}>
                <ProFormTextArea
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Nhập địa chỉ..."
                  fieldProps={{
                    autoSize: { minRows: 4 },
                  }}
                />
              </Col>
              <Col span={12}>
                {dataInit?.userId ? (
                  <ProFormSelect
                    width="100%"
                    disabled
                    options={[
                      {
                        value: "DOCTOR",
                        label: "DOCTOR",
                      },
                      {
                        value: "PATIENT",
                        label: "PATIENT",
                      },
                      {
                        value: "CASHIER",
                        label: "CASHIER",
                      },
                    ]}
                    name="role"
                    label="Vai trò"
                  />
                ) : (
                  <ProFormSelect
                    width="100%"
                    options={[
                      {
                        value: "DOCTOR",
                        label: "DOCTOR",
                      },
                      {
                        value: "PATIENT",
                        label: "PATIENT",
                      },
                      {
                        value: "CASHIER",
                        label: "CASHIER",
                      },
                    ]}
                    name="role"
                    label="Vai trò"
                    placeholder="Chọn vai trò..."
                    rules={[
                      { required: true, message: "Vui lòng không bỏ trống" },
                    ]}
                  />
                )}
              </Col>
            </Row>
          </ModalForm>
        </>
      )}
    </>
  );
};

export default ModalUser;
