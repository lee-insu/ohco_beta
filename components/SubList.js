import React, { useEffect, useState } from "react";
import style from "../styles/SubList.module.css";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import { useQuery } from "@apollo/client";
import { GET_CODY_BOOKMARK } from "../graphQL/schema";
import Link from "next/link";
import { logEvent } from "firebase/analytics";
import { analytics } from "../service/firebase";

const SubList = ({ data, theme }) => {
  const [recommandCody, getRecommandCody] = useState([]);

  useEffect(() => {
    if (data) {
      data.recommand_cody.map((x) => {
        getRecommandCody((prev) => [...prev, x.id]);
      });
    }
    return () => {
      getRecommandCody([]);
    };
  }, [data]);

  const { loading, data: codyArray } = useQuery(GET_CODY_BOOKMARK, {
    variables: { id: recommandCody },
  });

  const analyticsEvent = (item) => {
    if (theme == "music") {
      logEvent(analytics, "click_index_musicody", {
        content_type: "image",
        content_id: item.id,
        items: [{ name: item.id }],
      });
    } else if (theme == "perfume") {
      logEvent(analytics, "click_index_perfumecody", {
        content_type: "image",
        content_id: item.id,
        items: [{ name: item.id }],
      });
    }
  };

  return (
    <div className={style.sub_list}>
      {data ? (
        <div className={style.inner}>
          <div className={style.title}>
            {theme == "music" ? (
              <>
                <div className={style.style_title}>
                  '{data.name}' 느낌의 코디
                </div>
                <div className={style.sub_style_title}>
                  {data.artist}, {data.mood}
                </div>
              </>
            ) : (
              <>
                <div className={style.style_title}>
                  '{data.name}' 에 어울려요
                </div>
                <div className={style.sub_style_title}>{data.scent}향</div>
              </>
            )}
          </div>
          {!loading ? (
            <Row className={style.info_container} type="flex">
              <Col lg={24} xl={24} className={style.list_container}>
                <div className={style.cody_ul_container}>
                  <ul className={style.cody_ul}>
                    {codyArray.codyarray.slice(0, 20).map((item) => (
                      <li onClick={() => analyticsEvent(item)} key={item.id}>
                        <Link href={`item/${item.id}`}>
                          <img
                            className={style.usercody_img}
                            src={item.img_url}
                          />
                        </Link>
                        <div className={style.cody_info_container}>
                          <div>{item.category.style}</div>
                          <div>{item.category.theme}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          ) : (
            <div>불러오는 중...</div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SubList;
