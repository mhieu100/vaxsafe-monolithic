import { Carousel, Col, Row } from "antd";
const contentStyle = {
  width: "100%",
};

const HomePage = () => {
  return (
    <Row gutter={[20, 20]} justify="center">
      <Col span={16}>
        <Carousel
          autoplay
          arrows
          infinite={false}
          style={{ borderRadius: "20px" }}
        >
          <div>
            <img
              style={contentStyle}
              src="https://vnvc.vn/wp-content/uploads/2024/09/chien-dich-tiem-vac-xin-soi.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              style={contentStyle}
              src="https://vnvc.vn/wp-content/uploads/2024/07/cach-dieu-tri-benh-bach-hau.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              style={contentStyle}
              src="https://vnvc.vn/wp-content/uploads/2023/10/lich-tiem-phe-cau-cho-tre-em-va-nguoi-lon.jpg"
              alt=""
            />
          </div>
        </Carousel>
      </Col>
      <Col span={8}>
        <img
          width="100%"
          alt="example"
          src="https://vnvc.vn/wp-content/uploads/2024/09/le-ra-mat-vac-xin-sot-xuat-huyet.jpg"
        />
        <img style={{ marginTop: "10px" }}
          width="100%"
          alt="example"
          src="https://vnvc.vn/wp-content/uploads/2024/09/le-ra-mat-vac-xin-sot-xuat-huyet.jpg"
        />
      </Col>
    </Row>
  );
};

export default HomePage;
