import React from "react";
import style from "../styles/FooterInfo.module.css";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import Link from "next/link";

const FooterInfo = () => {
  const insta = () => {
    if (confirm("ohco 인스타로 이동할까요?")) {
      window.open(`https://www.instagram.com/ohco.im/`);
    } else {
      return;
    }
  };

  return (
    <div className={style.container}>
      <Row type="flex">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className={style.banner}>
            <div className={style.banner_container}>
              <div className={style.text}>
                <div className={style.title}>오코는 상품 중개자입니다</div>
                <div className={style.sub}>
                  오코는 해당 상품에 대한 중개자이며 <br />
                  모든 구매 과정은 해당 상품 판매자에 있습니다.
                </div>
              </div>
              <img className={style.img} src="/img/banner_5.svg" />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className={style.banner_1}>
            <div onClick={insta} className={style.banner_container}>
              <div className={style.text}>
                <div className={style.title}>뭐든지 물어보세요!</div>
                <div className={style.sub}>
                  오코는 어떤 이야기는 소통하고 싶어요.
                  <br />
                  칭찬, 농담, 불편한 점, 피카츄 빵 등
                  <br />
                  어떤 대화도 상관없으니 가볍게
                  <br />
                  DM 보내주세요!
                </div>
              </div>
              <img className={style.img} src="/img/banner_4.svg" />
            </div>
          </div>
        </Col>
      </Row>
      <div className={style.sub_container}>
        <Row type="flex">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <strong>OH CO! Beta 2.0</strong>
            <br /> <br />
            <p style={{ width: "80%" }}>
              오코는 상품을 중개만 해주며 상품정보 및 가격을 반드시 확인해주시길
              바랍니다. 오코는 고객이 쇼핑몰을 통해 구매한 상품에 대해
              보증하거나 별도의 책임을 지지 않으며 상품의 주문, 결제, 배송,
              교환, 환불 등 상품판매와 관련된 일체의 책임은 해당 쇼핑몰에
              있습니다.
            </p>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className={style.privacy}>
              <Link href={`/agreement`}>
                <div>이용약관</div>
              </Link>
              &nbsp; | &nbsp;
              <Link href={`/privacy`}>
                <div>개인정보처리방침</div>
              </Link>
            </div>
            <br />
            <div>문의</div>
            <div>instagram: @ohco.im</div>
            <div>mail: ohcoofficial@gmail.com</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FooterInfo;
