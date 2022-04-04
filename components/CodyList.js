import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Col, Row } from "antd";
import { GET_CODY_MAIN } from "../graphQL/schema";
import { useQuery } from "@apollo/client";
import style from "../styles/CodyList.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { logEvent } from "firebase/analytics";
import { analytics } from "../service/firebase";

const tempCody = (temp) => {
  let season = "";
  switch (true) {
    case temp < -3:
      season = "겨울";
      break;
    case temp < 4:
      season = "겨울";
      break;
    case temp < 6:
      season = "초겨울";
      break;
    case temp < 13:
      season = "초봄";
      break;
    case temp < 21:
      season = "봄";
      break;
    case temp < 23:
      season = "초여름";
      break;
    case temp < 40:
      season = "여름";
      break;

    default:
      return season;
  }

  return season;
};

const CodyList = () => {
  const temperature = useSelector((state) => state.temp.temp);
  const [cody, getCody] = useState([]);
  const [loadmore, setLoadmore] = useState(4);
  const [season, handleSeoson] = useState("");

  const { loading, error, data } = useQuery(GET_CODY_MAIN, {
    variables: {
      offset: 0,
      limit: loadmore,
      season,
    },
  });

  useEffect(() => {
    const tempSeason = tempCody(temperature);
    handleSeoson(tempSeason);
    if (data) {
      getCody(data.codymain);
    }
  }, [data, temperature]);

  const handleFetchData = () => {
    setLoadmore((e) => e + 4);
  };

  const analyticsEvent = (item) => {
    logEvent(analytics, "click_index_weathercody", {
      content_type: "image",
      content_id: item.id,
      items: [{ name: item.id }],
    });
  };

  return (
    <div>
      <Row className={style.cody_container} type="flex">
        {cody ? (
          cody.map((item) => (
            <Link key={item.id} href={`/item/${item.id}`}>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <div
                  onClick={() => analyticsEvent(item)}
                  className={style.cody}
                >
                  <img className={style.img} src={item.img_url} />
                  <div className={style.cody_info_container}>
                    <div>{item.category.style}</div>
                    <div>{item.category.theme}</div>
                  </div>
                </div>
              </Col>
            </Link>
          ))
        ) : (
          <div>불러오는 중..</div>
        )}
      </Row>
      <div className={style.tag}>
        <div onClick={() => handleFetchData(loadmore)} className={style.more}>
          더보기
        </div>
      </div>
    </div>
  );
};

export default CodyList;
