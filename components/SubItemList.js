import React, { useEffect, useState } from "react";
import style from "../styles/SubItemList.module.css";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import Link from "next/link";

const SubItemList = ({ data, theme }) => {
  const [itemData, getItemData] = useState([]);

  useEffect(() => {
    if (data !== false) {
      getItemData(data);
    }
  }, [data]);

  return (
    <div className={style.sub_list}>
      {itemData ? (
        <div className={style.inner}>
          <div className={style.title}>
            {theme == "music" ? (
              <>
                <div className={style.style_title}>음악으로 코디 스타일링</div>
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
                    <li key={item.id}>
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
