import { useEffect, useState } from "react";
import { callFetchCenter } from "../../config/api";
import { Card, Col, Row } from "antd";
import { Typography } from "antd";

const { Title, Text } = Typography;

const { Meta } = Card;

const VaccineCenterPage = () => {
  const [displayCenter, setDisplayCenter] = useState(null);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [total, setTotal] = useState(0);
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
      setTotal(res.data.meta.total);
    }
    // setIsLoading(false);
  };

  return (
    <>
      <Row style={{ display: "flex" }} gutter={[20, 20]}>
        <Col span={24}>
          <Title level={2} className="text-center">
            Danh sách trung tâm tiêm chủng{" "}
            <Text type="success">({total} trung tâm)</Text>
          </Title>
        </Col>
        {displayCenter &&
          displayCenter.map((center, index) => {
            return (
              <Col key={index} span={12} style={{ justifyItems: "center" }}>
                <Card size="small" style={{width: "95%"}} bordered={false} >
                  <div className="d-flex">
                    <img
                      alt="example"
                      src={`http://localhost:8080/storage/center/${center.image}`}
                      height={120}
                    />
                    <Meta title={center.name} description={center.address} className="mx-4" />
                  </div>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default VaccineCenterPage;
