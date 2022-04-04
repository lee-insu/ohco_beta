import React from "react";
import style from "../styles/ColorCody.module.css";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import Link from "next/link";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import * as filterAction from "../store/modules/filter";
import { logEvent } from "firebase/analytics";
import { analytics } from "../service/firebase";

export const colorList = [
  {
    mood: "베이지와 차분한 무드",
    text: "베이지와 차분함",
    img: "https://i.ibb.co/cQyPP3x/image.jpg",
    main: "#F0E4CC",
    sub: "cool",
  },
  {
    mood: "베이지와 포근한 무드",
    text: "베이지와 포근함",
    img: "https://i.ibb.co/K2TqCg8/image.jpg",
    main: "#F0E4CC",
    sub: "warm",
  },
  {
    mood: "네이비와 차분한 무드",
    text: "네이비와 차분함",
    img: "https://i.ibb.co/t4BtG91/image.jpg",
    main: "#010049",
    sub: "cool",
  },
  {
    mood: "네이비와 포근한 무드",
    text: "네이비와 포근함",
    img: "https://i.ibb.co/rtKZjRK/image.jpg",
    main: "#010049",
    sub: "warm",
  },
  {
    mood: "블루와 차분한 무드",
    text: "블루와 차분함",
    img: "https://i.ibb.co/MDGYTnN/image.jpg",
    main: "#0a07ce",
    sub: "cool",
  },
  {
    mood: "화이트와 차분한 무드",
    text: "화이트와 차분함",
    img: "https://i.ibb.co/WPpPHr7/image.jpg",
    main: "#ffffff",
    sub: "cool",
  },
  {
    mood: "화이트와 포근한 무드",
    text: "화이트와 포근함",
    img: "https://i.ibb.co/z2r508K/ww.jpg",
    main: "#ffffff",
    sub: "warm",
  },
];

const ColorCody = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const clickMood = (item) => {
    dispatch(filterAction.getMood(""));
    dispatch(filterAction.getSex(""));
    dispatch(filterAction.getStyle(""));
    dispatch(filterAction.getTheme(""));
    dispatch(filterAction.getSeason(""));

    try {
      dispatch(filterAction.getMood(item.mood));
    } catch (error) {
      console.log(error);
    }
  };

  const analyticsColor = (item) => {
    logEvent(analytics, "click_index_color", {
      content_type: "image",
      content_id: item.mood,
      items: [{ name: item.mood }],
    });
  };

  return (
    <div className={style.sub_list}>
      <div className={style.inner}>
        <div className={style.style_title}>색 조합으로 코디 찾기</div>
        <div className={style.sub_style_title}>
          가장 인기있는 상하의 색 조합
        </div>
        <Row className={style.info_container} type="flex">
          <Col lg={24} xl={24} className={style.list_container}>
            <div className={style.cody_ul_container}>
              <ul className={style.cody_ul}>
                {colorList &&
                  colorList.map((item, i) => (
                    <li onClick={() => clickMood(item)} key={i}>
                      <Link href={`list`}>
                        <img
                          onClick={() => analyticsColor(item)}
                          className={style.usercody_img}
                          src={item.img}
                        />
                      </Link>
                      <div className={style.cody_info_container}>
                        <div className={style.color_flex}>
                          <div
                            style={{ backgroundColor: `${item.main}` }}
                            className={style.main_color}
                          />
                          <div className={style.plus}>+</div>
                          <div className={style.sub_color_flex}>
                            <div
                              className={classNames(
                                style.main_color,
                                item.sub == "warm" ? style.warm_1 : style.cool_1
                              )}
                            />
                            <div
                              className={classNames(
                                style.main_color,
                                item.sub == "warm" ? style.warm_2 : style.cool_2
                              )}
                            />
                            <div
                              className={classNames(
                                style.main_color,
                                item.sub == "warm" ? style.warm_3 : style.cool_3
                              )}
                            />
                            <div
                              className={classNames(
                                style.main_color,
                                item.sub == "warm" ? style.warm_4 : style.cool_4
                              )}
                            />
                          </div>
                        </div>
                        <div>{item.text}</div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ColorCody;
