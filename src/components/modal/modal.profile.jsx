import { ModalForm, ProFormDatePicker, ProFormText } from '@ant-design/pro-components';
import { Col, Form, message, notification, Row } from 'antd';
import { useState } from 'react';

import { callUpdateUser } from '../../config/api.user';


const ModalProfile = (props) => {

    const { openModal, setOpenModal, reloadData, user } = props

    const [animation, setAnimation] = useState('open');

    const [form] = Form.useForm();

    const updateProfile = async (valuesForm) => {
        const { fullname, phone, birthday, address } = valuesForm;

        const res = await callUpdateUser(
            user.id,
            fullname,
            phone,
            birthday,
            address,
        );

        if (res.data) {
            message.success('Cập nhật người dùng thành công');
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message,
            });
        }
        handleReset();
        reloadData();
    };

    const handleReset = async () => {
        form.resetFields();

        setAnimation('close');
        await new Promise((r) => setTimeout(r, 400));
        setOpenModal(false);
        setAnimation('open');
    };

    return (
        <>{openModal && <ModalForm title="Chỉnh sửa thông tin" open={openModal} preserve={false}
            form={form}
            submitter={{
                searchConfig: {
                    submitText: 'Cập nhật',
                    resetText: 'Hủy bỏ',
                },
            }}
            initialValues={user}
            onFinish={updateProfile} modalProps={{
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
            }} >

            <Row gutter={16}>
                <Col span={12}>
                    <ProFormText
                        label='Tên đầy đủ'
                        name='fullname'
                        rules={[
                            { required: true, message: 'Vui lòng không bỏ trống' },
                        ]}
                        placeholder='Nhập tên ...'
                    />
                </Col>
                <Col span={12}>
                    <ProFormText
                        label='Email'
                        name='email'
                        disabled
                    />
                </Col>
                <Col span={12}>
                    <ProFormText
                        label='Địa chỉ'
                        name='address'
                        rules={[
                            { required: true, message: 'Vui lòng không bỏ trống' },
                        ]}
                        placeholder='Nhập địa chỉ...'
                    />
                </Col>
                <Col span={12}>
                    <ProFormText
                        label='Số điện thoại'
                        name='phone'
                        rules={[
                            { required: true, message: 'Vui lòng không bỏ trống' },
                        ]}
                        placeholder='Nhập số điện thoại...'
                    />
                </Col>
                <Col span={12}>
                    <ProFormDatePicker
                        colProps={{ xl: 12, md: 24 }}
                        width='md'
                        label='Ngày sinh'
                        name='birthday'
                        placeholder='Chọn ngày sinh'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày sinh!',
                            }
                        ]}
                    />
                </Col>
            </Row>
        </ModalForm>}</>
    )
}

export default ModalProfile;