import { useEffect, useState } from "react";
import { callFetchVaccine } from "../../config/api";
import { Button, Card, Col, Row } from "antd";
import { Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const { Meta } = Card;

const ShopPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [displayVaccine, setDisplayVaccine] = useState(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=vaccineName,desc");
  const navigate = useNavigate();

  useEffect(() => {
    setCurrent(1);
    setPageSize(100);
    setFilter("");
    setSortQuery("sort=vaccineName,desc");
    fetchVaccine();
  }, [current, pageSize, filter, sortQuery]);

  const fetchVaccine = async () => {
    // setIsLoading(true);
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
    // setIsLoading(false);
  };

  const placeOrderVaccine = () => {
    // call API here
    // if success, show success message
    // if fail, show error message
    navigate("/order");
  }

  return (
    <>
      <Row style={{ display: "flex" }} gutter={[20, 20]}>
        <Col span={24}>
          <Title level={2} className="text-center">
            Danh sách vaccine <Text type="success">({total} loại vaccine)</Text>
          </Title>
        </Col>
        {displayVaccine &&
          displayVaccine.map((vaccine, index) => {
            return (
              <Col key={index} span={6} style={{ justifyItems: "center" }}>
                <Card
                  bordered={false}
                  style={{
                    width: 300,
                  }}
                  cover={<img alt="example" src={vaccine.image} height={150} />}
                >
                  <Meta
                    title={vaccine.vaccineName.slice(0, 30) + "..."}
                    description={vaccine.description.slice(0, 30) + "..."}
                  />
                  <div className="d-flex justify-content-between mt-3">
                    <p>
                      Giá:{" "}
                      <span className="text-success">
                        {new Intl.NumberFormat("vi-VN").format(vaccine.price)}
                      </span>{" "}
                      VNĐ
                    </p>

                    <p>Số lượng: {vaccine.stockQuantity}</p>
                  </div>

                  <Button
                    type="primary"
                    onClick={placeOrderVaccine}
                  >
                    <PlusOutlined />
                    Đăng ký tiêm chủng
                  </Button>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default ShopPage;
