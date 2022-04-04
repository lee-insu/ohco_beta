import { Col, Row, List, Card, Drawer, Menu } from "antd";
import React, { useEffect, useRef, useState } from "react";
import style from "../styles/List.module.css";
import "antd/dist/antd.css";
import Link from "next/link";
import { GET_CODY_FILTER } from "../graphQL/schema";
import { useQuery } from "@apollo/client";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { analytics, fireStore } from "../service/firebase";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  query,
  deleteDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { filterList } from "../service/filterList";
import { logEvent } from "firebase/analytics";
import * as filterAction from "../store/modules/filter";

const list = () => {
  const useremail = useSelector((state) => state.email.email);
  const router = useRouter();
  const [bookmark, getBookmark] = useState([]);
  const [bookmarkReset, setBookmarkReset] = useState(0);

  const [cody, getCody] = useState([]);
  const [filterData, setFilterData] = useState(filterList);
  const [acitveFilter, setActiveFilter] = useState(false);
  const [activeId, setActiveId] = useState("");

  const [filTheme, setFilTheme] = useState("");
  const [filStyle, setFilStyle] = useState("");
  const [filMood, setFilMood] = useState("");
  const [filSex, setFilSex] = useState("");
  const [filSeason, setFilSeason] = useState("");
  const [filterArray, getFilterArray] = useState([]);
  const fetchMoreEl = useRef(null);
  const [hasNext, setHasNext] = useState(true);
  const intersecting = useInfiniteScroll(fetchMoreEl);
  const codyLen = Object.keys(cody).length;
  const [isCount, setIsCount] = useState(codyLen + 8);
  const [visible, setVisible] = useState(false);

  const filterStore = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { data } = useQuery(GET_CODY_FILTER, {
    variables: {
      mood: filterStore.mood,
      season: filterStore.season,
      sex: filterStore.sex,
      style: filterStore.style,
      theme: filterStore.theme,
      count: isCount,
    },
  });

  useEffect(() => {
    if (data) {
      getCody(data.codyfilter);
    }

    const filter = [
      filterStore.season,
      filterStore.sex,
      filterStore.style,
      filterStore.theme,
      filterStore.mood,
    ];

    if (filter) {
      const filternull = filter.filter((fil) => fil != null);
      getFilterArray(...[filternull]);
      getFilterArray((prevState) => prevState.filter((item) => item != ""));
    }
  }, [data, filterStore]);

  useEffect(() => {
    if (intersecting && hasNext) {
      setIsCount((prevState) => prevState + 4);
    }

    if (intersecting && codyLen + 8 < isCount) {
      setHasNext(false);
    }

    return () => {
      if (intersecting && codyLen == isCount) {
        setHasNext(true);
      }
      if (codyLen + 10 < isCount) {
        setIsCount(codyLen + 8);
      }
    };
  }, [intersecting]);

  useEffect(async () => {
    if (useremail) {
      const q = await query(
        collection(fireStore, "bookmark", useremail, "like")
      );
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => doc.id);
      getBookmark(newData);
    }
  }, [useremail, bookmarkReset]);

  const handleFilter = (filterId) => {
    switch (filterId) {
      case "테마":
        setActiveFilter(true);
        setActiveId(filterId);
        break;
      case "스타일":
        setActiveFilter(true);
        setActiveId(filterId);
        break;
      case "계절":
        setActiveFilter(true);
        setActiveId(filterId);
        break;
      case "성별":
        setActiveFilter(true);
        setActiveId(filterId);
        break;
      case "분위기":
        setActiveFilter(true);
        setActiveId(filterId);
        break;
      default:
    }
  };

  const clickFilter = async (filter) => {
    switch (true) {
      case filter.id == "스타일":
        await setFilStyle(filter);
        await dispatch(filterAction.getStyle(filter.value));
        break;
      case filter.id == "테마":
        await setFilTheme(filter);
        await dispatch(filterAction.getTheme(filter.value));
        break;
      case filter.id == "계절":
        await setFilSeason(filter);
        await dispatch(filterAction.getSeason(filter.value));
        break;
      case filter.id == "분위기":
        await setFilMood(filter);
        await dispatch(filterAction.getMood(filter.value));
        break;
      case filter.id == "성별":
        await setFilSex(filter);
        await dispatch(filterAction.getSex(filter.value));
        break;
      default:
    }
  };

  const selectFilter = (filter) => {
    switch (true) {
      case filter == filSex.id:
        return <div name={filter}>{filSex.value}</div>;
      case filter == filStyle.id:
        return <div name={filter}>{filStyle.value}</div>;
      case filter == filMood.id:
        return <div name={filter}>{filMood.value}</div>;
      case filter == filSeason.id:
        return <div name={filter}>{filSeason.value}</div>;
      case filter == filTheme.id:
        return <div name={filter}>{filTheme.value}</div>;
      default:
    }
  };

  const deleteFilter = (list) => {
    getFilterArray((prevState) => prevState.filter((item) => item != list));
    switch (list) {
      case "감각 있는 도시":
      case "따스하게 밝은 날":
      case "캠퍼스 거리":
      case "저녁의 서촌 거리":
      case "주광색이 어울리는 카페":
      case "집 앞 꾸안꾸":
        setFilTheme("");
        dispatch(filterAction.getTheme(""));
        break;
      case "캐주얼":
      case "포멀":
      case "스트릿":
      case "모던캐주얼":
      case "원마일웨어":
      case "아메카지":
      case "시티보이":
      case "러블리":
      case "유니크":
      case "스포티":
      case "미니멀":
        setFilStyle("");
        dispatch(filterAction.getStyle(""));
        break;
      case "초봄":
      case "초여름":
      case "초가을":
      case "초겨울":
      case "봄":
      case "여름":
      case "가을":
      case "겨울":
        setFilSeason("");
        dispatch(filterAction.getSeason(""));
        break;
      case "네이비와 차분한 무드":
      case "네이비와 포근한 무드":
      case "버건디와 차분한 무드":
      case "화이트와 차분한 무드":
      case "화이트와 포근한 무드":
      case "그레이와 차분한 무드":
      case "그레이와 포근한 무드":
      case "블랙과 차분한 무드":
      case "블랙과 포근한 무드":
      case "그린과 차분한 무드":
      case "그린과 포근한 무드":
      case "엘로우와 차분한 무드":
      case "엘로우와 포근한 무드":
      case "블루와 차분한 무드":
      case "블루와 포근한 무드":
      case "베이지와 차분한 무드":
      case "베이지와 포근한 무드":
      case "레드와 차분한 무드":
      case "레드와 포근한 무드":
      case "퍼플과 차분한 무드":
        setFilMood("");
        dispatch(filterAction.getMood(""));
        break;
      case "남":
      case "여":
        setFilSex("");
        dispatch(filterAction.getSex(""));
        break;
      default:
    }
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    const modifiedData = [...filterData];
    modifiedData.map((data) => {
      data.filter.map((item) => {
        switch (true) {
          case item.id == "스타일":
            item.isChecked = item.value === value;
            break;
          case item.id == "테마":
            item.isChecked = item.value === value;
            break;
          case item.id == "계절":
            item.isChecked = item.value === value;
            break;
          case item.id == "분위기":
            item.isChecked = item.value === value;
            break;
          case item.id == "성별":
            item.isChecked = item.value === value;
            break;
          default:
        }
      });
    });
  };

  const activeBookmark = async (item) => {
    if (useremail) {
      if (confirm("이 코디를 옷장에 저장할까요?")) {
        await setDoc(doc(fireStore, "bookmark", useremail, "like", item.id), {
          active: true,
          id: item.id,
          img_url: item.img_url,
          category: {
            theme: item.category.theme,
            style: item.category.style,
          },
        });
        setBookmarkReset((counter) => (counter += 1));
      } else {
        return;
      }
    } else {
      router.push("/login");
    }
  };

  const unactiveBookmark = async (id) => {
    await deleteDoc(doc(fireStore, "bookmark", useremail, "like", id));
    setBookmarkReset((counter) => (counter += 1));
  };

  const showDrawer = () => {
    setVisible(!visible);
  };

  const onClose = () => {
    setVisible(!visible);
  };

  const filterReset = (e) => {
    e.preventDefault();
    setFilSeason("");
    setFilSex("");
    setFilStyle("");
    setFilTheme("");
    setFilMood("");
    dispatch(filterAction.getSeason(""));
    dispatch(filterAction.getSex(""));
    dispatch(filterAction.getStyle(""));
    dispatch(filterAction.getTheme(""));
    dispatch(filterAction.getMood(""));
  };

  const analyticsCodyList = (item) => {
    logEvent(analytics, "list_cody", {
      content_type: "image",
      content_id: item.id,
      items: [{ name: item.id }],
    });
  };

  return (
    <div className={style.container}>
      <div className={style.banner}>
        <div className={style.title}>나다운 분위기 찾기</div>
      </div>
      <div className={style.list_container}>
        <nav className={style.nav}>
          <div onClick={showDrawer} className={style.mobile_filter}>
            필터
          </div>
          <Drawer
            placement="top"
            title={
              <div onClick={filterReset} className={style.filterReset}>
                필터 초기화
              </div>
            }
            onClose={onClose}
            visible={visible}
            destroyOnClose="true"
            width="100%"
            height="100%"
            closeIcon={<img className={style.close} src="/icon/close.svg" />}
            footer={
              <div className={style.closeBtn} onClick={onClose}>
                필터 적용하기
              </div>
            }
          >
            {filterData.map((filter, i) => (
              <Col className={style.filter_list_container} key={i} xl={24}>
                <div
                  name={filter.id}
                  onClick={
                    acitveFilter && filter.id === activeId
                      ? () => setActiveFilter(false)
                      : () => handleFilter(filter.id)
                  }
                  className={style.filter_list}
                >
                  <div name={filter.id} className={style.filter_text}>
                    <div name={filter.id}>{filter.id}</div>
                    {filStyle.id == filter.id ||
                    filSex.id == filter.id ||
                    filTheme.id == filter.id ||
                    filMood.id == filter.id ||
                    filSeason.id == filter.id ? (
                      selectFilter(filter.id)
                    ) : (
                      <div name={filter.id}>모든 {filter.id}</div>
                    )}
                  </div>
                  <div name={filter.id} className={style.plus}>
                    {acitveFilter && filter.id === activeId ? "-" : "+"}
                  </div>
                </div>
                {filter.id == activeId && acitveFilter ? (
                  <div className={style.filter_title_menu}>
                    <div className={style.filter_menu_container}>
                      {filter.filter.map((fil, i) => (
                        <div key={i} className={style.filter_menu_list}>
                          <input
                            type="checkbox"
                            value={fil.value}
                            name={fil.id}
                            onChange={(e) => handleChange(e)}
                            onClick={() => clickFilter(fil)}
                            checked={fil.isChecked}
                          />
                          <div>{fil.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </Col>
            ))}
          </Drawer>
          {filterArray.map((list, i) => (
            <div
              className={style.filter_li}
              key={i}
              onClick={() => deleteFilter(list)}
            >
              {list ? list : null}
            </div>
          ))}
        </nav>
        <div className={style.inner}>
          <Row>
            <Col className={style.filter} xs={0} sm={0} md={0} lg={4} xl={4}>
              <Col className={style.filter_title}>필터</Col>
              <div className={style.filter_container}>
                {filterData.map((filter, i) => (
                  <Col className={style.filter_list_container} key={i} xl={24}>
                    <div
                      name={filter.id}
                      onClick={
                        acitveFilter && filter.id === activeId
                          ? () => setActiveFilter(false)
                          : () => handleFilter(filter.id)
                      }
                      className={style.filter_list}
                    >
                      <div name={filter.id} className={style.filter_text}>
                        <div name={filter.id}>{filter.id}</div>
                        {filStyle.id == filter.id ||
                        filSex.id == filter.id ||
                        filTheme.id == filter.id ||
                        filMood.id == filter.id ||
                        filSeason.id == filter.id ? (
                          selectFilter(filter.id)
                        ) : (
                          <div name={filter.id}>모든 {filter.id}</div>
                        )}
                      </div>
                      <div name={filter.id} className={style.plus}>
                        {acitveFilter && filter.id === activeId ? "-" : "+"}
                      </div>
                    </div>
                    {filter.id == activeId && acitveFilter ? (
                      <div className={style.filter_title_menu}>
                        <div className={style.filter_menu_container}>
                          {filter.filter.map((fil, i) => (
                            <div key={i} className={style.filter_menu_list}>
                              <input
                                type="checkbox"
                                value={fil.value}
                                name={fil.id}
                                onChange={(e) => handleChange(e)}
                                onClick={() => clickFilter(fil)}
                                checked={fil.isChecked}
                              />
                              <div>{fil.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </Col>
                ))}
              </div>
            </Col>

            <Col
              className={style.cody_list}
              xs={24}
              sm={24}
              md={24}
              lg={20}
              xl={20}
            >
              <Row className={style.row} gutter={[8, 4]}>
                {cody
                  ? cody.map((item, i) => (
                      <Col
                        key={i}
                        className={style.li_container}
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        <div
                          onClick={() => analyticsCodyList(item)}
                          className={style.cody_li}
                        >
                          <Link href={`/item/${item.id}`}>
                            <div className={style.cody_img_container}>
                              <img className={style.img} src={item.img_url} />
                            </div>
                          </Link>

                          <div className={style.item_container}>
                            <div className={style.item_category}>
                              <div>{item.category.style}</div>
                              <div>{item.category.theme}</div>
                            </div>
                            <img
                              onClick={
                                bookmark.includes(item.id)
                                  ? () => unactiveBookmark(item.id)
                                  : () => activeBookmark(item)
                              }
                              className={style.bookmark}
                              src={
                                bookmark.includes(item.id)
                                  ? "/icon/icons8-bookmark-filled.svg"
                                  : "/icon/icons8-bookmark.svg"
                              }
                            />
                          </div>
                        </div>
                      </Col>
                    ))
                  : null}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <div ref={fetchMoreEl}></div>
    </div>
  );
};

export default list;
