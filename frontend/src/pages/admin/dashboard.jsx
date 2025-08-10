import { Card, Col, Row, Statistic } from "antd";
import CountUp from "react-countup";

const DashboardPage = () => {
  const formatter = (value) => {
    return <CountUp end={Number(value)} separator="," />;
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24} md={8}>
          <Card title="Trung tâm" bordered={false}>
            <Statistic
              title="Active Users"
              value={112893}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card title="Người dùng" bordered={false}>
            <Statistic
              title="Active Users"
              value={112893}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card title="Vaccine" bordered={false}>
            <Statistic
              title="Active Users"
              value={112893}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
