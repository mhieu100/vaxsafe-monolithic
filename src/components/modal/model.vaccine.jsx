/* eslint-disable react/prop-types */
import { CheckSquareOutlined } from "@ant-design/icons";
import {
  FooterToolbar,
  ModalForm,
  ProCard,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Col, Form, message, notification, Row } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/reset.scss";
import { callCreateVaccine, callUpdateVaccine } from "../../config/api";

const ModalVaccine = (props) => {
  const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;

  const [form] = Form.useForm();
  const [value, setValue] = useState("");
  const [animation, setAnimation] = useState("open");

  const submitVaccine = async (valuesForm) => {
    const {
      vaccineName,
      image,
      manufacturer,
      disease,
      dosage,
      ageRange,
      price,
      stockQuantity,
      requiredDoses,
    } = valuesForm;

    if (dataInit?.vaccineId) {
      //update
      const res = await callUpdateVaccine(
        dataInit.vaccineId,
        vaccineName,
        value,
        image,
        manufacturer,
        disease,
        dosage,
        ageRange,
        price,
        stockQuantity,
        requiredDoses
      );
      if (res.data) {
        message.success("Cập nhật vaccine thành công");
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
      const res = await callCreateVaccine(
        vaccineName,
        value,
        image,
        manufacturer,
        disease,
        dosage,
        ageRange,
        price,
        stockQuantity,
        requiredDoses
      );
      if (res.data) {
        message.success("Thêm mới vaccine thành công");
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    }
  };

  useEffect(() => {
    if (dataInit?.vaccineId && dataInit?.description) {
      setValue(dataInit.description);
    }
  }, [dataInit]);

  const handleReset = async () => {
    form.resetFields();
    setValue("");
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
                {dataInit?.vaccineId ? "Cập nhật Vaccine" : "Tạo mới Vaccine"}
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
            onFinish={submitVaccine}
            initialValues={dataInit?.vaccineId ? dataInit : {}}
            submitter={{
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
              submitButtonProps: {
                icon: <CheckSquareOutlined />,
              },
              searchConfig: {
                resetText: "Hủy",
                submitText: <>{dataInit?.vaccineId ? "Cập nhật" : "Tạo mới"}</>,
              },
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  label="Tên vaccine"
                  name="vaccineName"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Nhập tên vaccine..."
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Nơi sản xuất"
                  name="manufacturer"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Nơi sản xuất..."
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Loại bệnh"
                  name="disease"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Loại bệnh..."
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Price"
                  name="price"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="giá tiền..."
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Stock"
                  name="stockQuantity"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Số lượng kho..."
                />
              </Col>

              <Col span={12}>
                <ProFormTextArea
                  label="Link ảnh"
                  name="image"
                  rules={[
                    { required: true, message: "Vui lòng không bỏ trống" },
                  ]}
                  placeholder="Link ảnh =..."
                  fieldProps={{
                    autoSize: { minRows: 4 },
                  }}
                />
              </Col>
              <ProCard
                title="Miêu tả"
                headStyle={{ color: "#d81921" }}
                style={{ marginBottom: 20 }}
                headerBordered
                size="small"
                bordered
              >
                <Col span={24}>
                  <ReactQuill theme="snow" value={value} onChange={setValue} />
                </Col>
              </ProCard>
            </Row>
          </ModalForm>
        </>
      )}
    </>
  );
};

export default ModalVaccine;
