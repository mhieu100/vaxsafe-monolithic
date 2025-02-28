import { useEffect, useState } from 'react';
import { Button, Card, Col, message, Row, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';
import { useLocation } from 'react-router-dom';

import { callFetchVaccine } from '../../config/api.vaccine';
import ModalOrder from '../../components/modal/modal.order';
import { callUpdatePayment } from '../../config/api.appointment';

const { Title, Text } = Typography;

const { Meta } = Card;

const ShopPage = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vnpResponse = searchParams.get('vnp_ResponseCode');
  const paymentId = searchParams.get('vnp_OrderInfo');

  useEffect(() => {
    const handlePaymentCallback = async () => {
      if (vnpResponse && paymentId) { // Chỉ gọi khi có cả hai giá trị
        try {
          const response = await callUpdatePayment(paymentId, vnpResponse);
          if (vnpResponse === '00') {
            message.success('Đặt lịch thành công');
          } else {
            message.error('Đặt lịch thất bại');
          }
        } catch (error) {
          console.error('Error updating payment:', error);
          message.error('Có lỗi xảy ra khi cập nhật thanh toán');
        }
      }
    };
  
    handlePaymentCallback();
  }, [vnpResponse, paymentId]);

  const [openModal, setOpenModal] = useState(false);
  const [vaccine, setVaccine] = useState(null);
  const [displayVaccine, setDisplayVaccine] = useState(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');
  const [sortQuery, setSortQuery] = useState('sort=name,desc');

  useEffect(() => {
    setCurrent(1);
    setPageSize(100);
    setFilter('');
    setSortQuery('sort=name,desc');
    fetchVaccine();
  }, [current, pageSize, filter, sortQuery]);

  const fetchVaccine = async () => {
    let query = `page=${current}&size=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    const res = await callFetchVaccine(query);
    if (res && res.data) {
      setDisplayVaccine(res.data.result);
      setTotal(res.data.meta.total);
    }
  };



  return (
    <>
      <Row style={{ display: 'flex' }} gutter={[20, 20]}>
        <Col span={24}>
          <Title level={2} className='text-center'>
            Danh sách vaccine <Text type='success'>({total} loại vaccine)</Text>
          </Title>
        </Col>
        {displayVaccine &&
          displayVaccine.map((vaccine, index) => {
            return (
              <Col key={index} span={6} style={{ justifyItems: 'center' }}>
                <Card
                  bordered={false}
                  style={{
                    width: 250,
                  }}
                  cover={<img alt='example' src={`http://localhost:8080/storage/vaccine/${vaccine.image}`} height={150} />}
                >
                  <Meta
                    title={vaccine.name.slice(0, 20) + '...'}
                    description={parse(vaccine.description.slice(0, 20) + '...')}
                  />
                  <div className='d-flex justify-content-between mt-3'>
                    <p>
                      Giá:
                      <span className='text-success'>
                        {new Intl.NumberFormat('vi-VN').format(vaccine.price)}
                      </span>
                      VNĐ
                    </p>

                    <p>Số lượng: {vaccine.stockQuantity}</p>
                  </div>

                  <Button
                    type='primary'
                    onClick={() => {
                      setOpenModal(true)
                      setVaccine(vaccine)
                    }
                    }
                  >
                    <PlusOutlined />
                    Đăng ký tiêm chủng
                  </Button>
                </Card>

              </Col>


            );
          })}
      </Row>
      <ModalOrder
        openModal={openModal}
        setOpenModal={setOpenModal}
        vaccine={vaccine}
      />
    </>
  );
};

export default ShopPage;
