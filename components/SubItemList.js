import React, { useEffect, useState } from "react";
import style from "../styles/SubItemList.module.css";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import Link from "next/link";
import { logEvent } from "firebase/analytics";
import { analytics } from "../service/firebase";

const SubItemList = ({ data, theme }) => {
  const [itemData, getItemData] = useState([]);

  useEffect(() => {
    if (data !== false) {
      getItemData(data);
    }
  }, [data]);

  const shuffle = (array) => {
    for (let index = array.length - 1; index > 0; index--) {
      const randomPosition = Math.floor(Math.random() * (index + 1));
      const temporary = array[index];
      array[index] = array[randomPosition];
      array[randomPosition] = temporary;
    }
    return array;
  };

  const analyticsEvent = (item) => {
    if (theme == "music") {
      logEvent(analytics, "click_index_music", {
        content_type: "image",
        content_id: item.id,
        items: [{ name: item.id }],
      });
    } else if (theme == "perfume") {
      logEvent(analytics, "click_index_perfume", {
        content_type: "image",
        content_id: item.id,
        items: [{ name: item.id }],
      });
    }
  };

  return (
    <div className={style.sub_list}>
      {itemData ? (
        <div className={style.inner}>
          <div className={style.title}>
            {theme == "music" ? (
              <>
                <div className={style.style_title}>음악을 코디로 표현하면</div>
              </>
            ) : (
              <>
                <div className={style.style_title}>향수과 어울리는 코디</div>
              </>
            )}
          </div>
          <Row className={style.info_container} type="flex">
            <Col lg={24} xl={24} className={style.list_container}>
              <div className={style.item_ul_container}>
                <ul className={style.item_ul}>
                  {itemData.slice(0, 8).map((item) => (
                    <li onClick={() => analyticsEvent(item)} key={item.id}>
                      <Link
                        href={
                          theme == "music"
                            ? `music/${item.id}`
                            : `perfume/${item.id}`
                        }
                      >
                        <img className={style.item_img} src={item.img_url} />
                      </Link>
                      <div className={style.item_info_container}>
                        {theme == "music" ? (
                          <>
                            <div>{item.mood}</div>
                            <div>{item.name}</div>
                          </>
                        ) : (
                          <>
                            <div>{item.mood}</div>
                            <div>{item.name}</div>
                            <div>{item.scent}</div>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div>불러오는 중...</div>
      )}
    </div>
  );
};

export default SubItemList;
