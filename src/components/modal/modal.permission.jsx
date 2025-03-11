import { useState } from 'react';
import { CheckSquareOutlined } from '@ant-design/icons';
import { Col, Form, message, notification, Row } from 'antd';
import {
  FooterToolbar,
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';

import '../../styles/reset.scss';
import { callCreatePermission, callUpdatePermission } from '../../config/api.permission';


const ModalPermission = (props) => {
  const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;

  const [form] = Form.useForm();
  const [animation, setAnimation] = useState('open');


  const submitUser = async (valuesForm) => {
    const { name, method, apiPath, module } = valuesForm;
    try {
      if (dataInit?.id) {
        // Update user
        const res = await callUpdatePermission(
          dataInit.id,
          name,
          method,
          apiPath,
          module
        );

        if (res.data) {
          message.success('Cập nhật quyền thành công');
        } else {
          notification.error({
            message: 'Có lỗi xảy ra',
            description: res.message,
          });
        }
      } else {
        // Create user
        const res = await callCreatePermission(
          name,
          method,
          apiPath,
          module
        );

        if (res.data) {
          message.success('Thêm mới quyền thành công');
        } else {
          notification.error({
            message: 'Tạo quyền thất bại',
            description: res.error,
          });
        }
      }

      handleReset();
      reloadTable();
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: error.message || 'Lỗi không xác định',
      });
    }
  };

  const handleReset = async () => {
    form.resetFields();
    setDataInit(null);
    // Add animation when closing modal
    setAnimation('close');
    await new Promise((resolve) => setTimeout(resolve, 400));
    setOpenModal(false);
    setAnimation('open');
  };


  return (
    <>
      {openModal && (
        <ModalForm
          title={dataInit?.userId ? 'Cập nhật quyền' : 'Tạo mới quyền'}
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
          onFinish={submitUser}
          initialValues={dataInit?.id ? dataInit : {}}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            submitButtonProps: {
              icon: <CheckSquareOutlined />,
            },
            searchConfig: {
              resetText: 'Hủy',
              submitText: <>{dataInit?.id ? 'Cập nhật' : 'Tạo mới'}</>,
            },
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                label='Tên quyền'
                name='name'
                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                placeholder='Nhập tên quyền...'
              />
            </Col>
            <Col span={12}>
              <ProFormText
                label='Method'
                name='method'
                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                placeholder='Nhập tên method...'
              />
            </Col>
            <Col span={12}>
              <ProFormText
                label='API'
                name='apiPath'
                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                placeholder='Nhập tên api...'
              />
            </Col>
            <Col span={12}>
              <ProFormText
                label='Module'
                name='module'
                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                placeholder='Nhập tên module...'
              />
            </Col>
          </Row>
        </ModalForm>
      )}
    </>
  );
};

export default ModalPermission;