import { useState } from 'react';
import { CheckSquareOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import {
  FooterToolbar,
  ModalForm,
  ProCard,
  ProFormText,
} from '@ant-design/pro-components';

import '../../styles/reset.scss';
import ModuleApi from './module.api';


const ModalRole = (props) => {
  const { openModal, setOpenModal, listPermissions, singleRole, setSingleRole } = props;
  const [animation, setAnimation] = useState('open');
  const [form] = Form.useForm();

  const handleReset = async () => {
    setAnimation('close');
    await new Promise((resolve) => setTimeout(resolve, 400));
    setOpenModal(false);
    setAnimation('open');
  };


  return (
    <>
      {openModal && (
        <ModalForm
          title="Cập nhật vai trò"
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
          initialValues={singleRole}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            submitButtonProps: {
              icon: <CheckSquareOutlined />,
            },
            searchConfig: {
              resetText: 'Hủy',
              submitText: 'Cập nhật',
            },
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <ProFormText
                label='Vai trò'
                name='name'
                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                placeholder='Nhập tên vai trò...'
              />
            </Col>
            <Col span={24}>
              <ProCard
                title="Quyền hạn"
                subTitle="Các quyền hạn được phép cho vai trò này"
                headStyle={{ color: '#d81921' }}
                style={{ marginBottom: 20 }}
                headerBordered
                size="small"
                bordered
              >
                <ModuleApi
                  form={form}
                  listPermissions={listPermissions}
                  singleRole={singleRole}
                  openModal={openModal}
                />

              </ProCard>
            </Col>
          </Row>
        </ModalForm>
      )}
    </>
  );
};

export default ModalRole;