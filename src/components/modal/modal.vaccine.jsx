 
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  CheckSquareOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  FooterToolbar,
  ModalForm,
  ProCard,
  ProFormText,
} from '@ant-design/pro-components';
import {
  Col,
  ConfigProvider,
  Form,
  message,
  Modal,
  notification,
  Row,
  Upload,
} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import enUS from 'antd/es/calendar/locale/en_US';

import { callCreateVaccine, callUpdateVaccine } from '../../config/api.vaccine';
import { callUploadSingleFile } from '../../config/api.file';

import '../../styles/reset.scss';

const ModalVaccine = (props) => {
  const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const [animation, setAnimation] = useState('open');

  const [dataLogo, setDataLogo] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handlePreview = async (file) => {
    if (!file.originFileObj) {
      setPreviewImage(file.url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
      );
      return;
    }
    getBase64(file.originFileObj, (url) => {
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
      );
    });
  };

  const handleRemoveFile = () => {
    setDataLogo([]);
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoadingUpload(true);
    }
    if (info.file.status === 'done') {
      setLoadingUpload(false);
    }
    if (info.file.status === 'error') {
      setLoadingUpload(false);
      message.error(
        info?.file?.error?.event?.message ?? 'Đã có lỗi xảy ra khi upload file.'
      );
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUploadFileLogo = async ({ file, onSuccess, onError }) => {
    const res = await callUploadSingleFile(file, 'vaccine');
    if (res && res.data) {
      setDataLogo([
        {
          name: res.data.fileName,
          uid: uuidv4(),
        },
      ]);
      if (onSuccess) onSuccess('ok');
    } else {
      if (onError) {
        setDataLogo([]);
        const error = new Error(res.message);
        onError({ event: error });
      }
    }
  };

  const handleReset = async () => {
    form.resetFields();
    setValue('');
    setDataInit(null);

    setAnimation('close');
    await new Promise((r) => setTimeout(r, 400));
    setOpenModal(false);
    setAnimation('open');
  };

  const submitVaccine = async (valuesForm) => {
    const {
      name,
      manufacturer,
      disease,
      dosage,
      ageRange,
      price,
      stockQuantity,
      requiredDoses,
    } = valuesForm;

    if (dataLogo.length === 0) {
      message.error('Vui lòng upload ảnh Vaccine');
      return;
    }

    if (dataInit?.vaccineId) {
      const res = await callUpdateVaccine(
        dataInit.vaccineId,
        name,
        value,
        dataLogo[0].name,
        manufacturer,
        disease,
        dosage,
        ageRange,
        price,
        stockQuantity,
        requiredDoses
      );
      if (res.data) {
        message.success('Cập nhật vaccine thành công');
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: 'Có lỗi xảy ra',
          description: res.message,
        });
      }
    } else {
      const res = await callCreateVaccine(
        name,
        value,
        dataLogo[0].name,
        manufacturer,
        disease,
        dosage,
        ageRange,
        price,
        stockQuantity,
        requiredDoses
      );
      if (res.data) {
        message.success('Thêm mới vaccine thành công');
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: 'Có lỗi xảy ra',
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

  return (
    <>
      {openModal && (
        <>
          <ModalForm
            title={
              <>
                {dataInit?.vaccineId ? 'Cập nhật Vaccine' : 'Tạo mới Vaccine'}
              </>
            }
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
                resetText: 'Hủy',
                submitText: <>{dataInit?.vaccineId ? 'Cập nhật' : 'Tạo mới'}</>,
              },
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  label='Tên vaccine'
                  name='name'
                  rules={[
                    { required: true, message: 'Vui lòng không bỏ trống' },
                  ]}
                  placeholder='Nhập tên vaccine...'
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label='Nơi sản xuất'
                  name='manufacturer'
                  rules={[
                    { required: true, message: 'Vui lòng không bỏ trống' },
                  ]}
                  placeholder='Nơi sản xuất...'
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label='Loại bệnh'
                  name='disease'
                  rules={[
                    { required: true, message: 'Vui lòng không bỏ trống' },
                  ]}
                  placeholder='Loại bệnh...'
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label='Price'
                  name='price'
                  rules={[
                    { required: true, message: 'Vui lòng không bỏ trống' },
                  ]}
                  placeholder='giá tiền...'
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label='Stock'
                  name='stockQuantity'
                  rules={[
                    { required: true, message: 'Vui lòng không bỏ trống' },
                  ]}
                  placeholder='Số lượng kho...'
                />
              </Col>

              <Col span={8}>
                <Form.Item labelCol={{ span: 24 }} label='Ảnh Vaccine' name='logo'>
                  <ConfigProvider locale={enUS}>
                    <Upload
                      name='logo'
                      listType='picture-card'
                      className='avatar-uploader'
                      maxCount={1}
                      multiple={false}
                      customRequest={handleUploadFileLogo}
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                      onRemove={(file) => handleRemoveFile(file)}
                      onPreview={handlePreview}
                      defaultFileList={
                        dataInit?.vaccineId
                          ? [
                            {
                              uid: uuidv4(),
                              name: dataInit?.image ?? '',
                              status: 'done',
                              url: `${'http://localhost:8080/'}storage/vaccine/${dataInit?.image
                                }`,
                              
                            },
                          ]
                          : []
                      }
                    >
                      <div>
                        {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </ConfigProvider>
                </Form.Item>
              </Col>

              <ProCard
                title='Miêu tả'
                headStyle={{ color: '#d81921' }}
                style={{ marginBottom: 20 }}
                headerBordered
                size='small'
                bordered
              >
                <Col span={24}>
                  <ReactQuill theme='snow' value={value} onChange={setValue} />
                </Col>
              </ProCard>
            </Row>
          </ModalForm>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={() => setPreviewOpen(false)}
            style={{ zIndex: 1500 }}
          >
            <img alt='example' style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </>
      )}
    </>
  );
};

export default ModalVaccine;