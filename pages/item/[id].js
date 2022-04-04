import { Col, Row } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import Comment from "../../components/Comment.js";
import style from "../../styles/Detail.module.css";
import { useQuery } from "@apollo/client";
import {
  GET_CODY_ID,
  GET_SIMILAR_LIST,
  GET_USER_CODY_LIST,
} from "../../graphQL/schema";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fireStore } from "../../service/firebase";
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import Link from "next/link";
import { client } from "../../service/apollo.js";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../service/firebase";

const Detail = ({ item, codyData, loading }) => {
  const [codyItem, getCodyItem] = useState([]);
  const [userItem, getUserItem] = useState([]);
  const [bookmarkId, getBookmarkId] = useState([]);
  const [productId, getProductId] = useState([]);
  const [perfumeId, getPerfumeId] = useState([]);
  const [musicId, getMusicId] = useState([]);
  const [similarStyle, getSimilerStyle] = useState([]);
  const [triger, setTriger] = useState(false);
  const userinfo = useSelector((state) => state);
  const [activeBookmark, setActiveBookmark] = useState(false);

  const router = useRouter();

  const { data: userData } = useQuery(GET_USER_CODY_LIST, {
    variables: {
      user_id: codyItem ? codyItem.user_id : codyItem.user_id,
    },
  });
  const { data: similarData } = useQuery(GET_SIMILAR_LIST, {
    variables: {
      style: codyData && codyData.category.style,
      sex: codyData && codyData.category.sex,
    },
  });

  useEffect(async () => {
    if (codyData) {
      getCodyItem(codyData);
    }
    if (userinfo.displayName.isLogin) {
      const q = await query(
        collection(fireStore, "bookmark", userinfo.email.email, "like")
      );
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => doc.id);
      getBookmarkId(newData);
    }
  }, [codyData, activeBookmark]);

  useEffect(() => {
    if (bookmarkId.includes(item)) {
      setActiveBookmark(true);
    } else {
      setActiveBookmark(false);
    }
  }, [bookmarkId]);

  useEffect(() => {
    if (userData) {
      if (userData.usercodylist != null) {
        let [...array] = userData.usercodylist;
        getUserItem(array.sort(() => Math.random() - 0.5));
      }
    }
  }, [userData]);

  useEffect(async () => {
    if (userinfo.displayName.isLogin && codyItem.products) {
      const q = await query(
        collection(fireStore, "products", userinfo.email.email, "like")
      );
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => doc.id);
      getProductId(newData);
    }
    if (userinfo.displayName.isLogin && codyItem.perfumes) {
      const q = await query(
        collection(fireStore, "perfumes", userinfo.email.email, "like")
      );
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => doc.id);
      getPerfumeId(newData);
    }
    if (userinfo.displayName.isLogin && codyItem.music) {
      const q = await query(
        collection(fireStore, "music", userinfo.email.email, "like")
      );
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => doc.id);
      getMusicId(newData);
    }
  }, [codyItem, triger]);

  const handleBookmark = async () => {
    switch (activeBookmark) {
      case true:
        await deleteDoc(
          doc(fireStore, "bookmark", userinfo.email.email, "like", item)
        );
        setActiveBookmark(false);

        break;
      case false:
        if (userinfo.displayName.isLogin) {
          await setDoc(
            doc(fireStore, "bookmark", userinfo.email.email, "like", item),
            {
              active: true,
              id: codyItem.id,
              img_url: codyItem.img_url,
              category: {
                theme: codyItem.category.theme,
                style: codyItem.category.style,
              },
            }
          );
          setActiveBookmark(true);
        } else {
          router.push("/login");
        }
      default:
    }
  };

  const activeProduct = async (item) => {
    if (userinfo.displayName.isLogin) {
      if (confirm("이 상품을 옷장에 저장할까요?")) {
        await setDoc(
          doc(fireStore, "products", userinfo.email.email, "like", item.id),
          {
            active: true,
            id: item.id,
            img_url: item.img_url,
            name: item.name,
            brand: item.brand,
            price: item.price,
          }
        );
      }
      setTriger(!triger);
    } else {
      router.push("/login");
    }
  };

  const unactiveProduct = async (id) => {
    await deleteDoc(
      doc(fireStore, "products", userinfo.email.email, "like", id)
    );
    setTriger(!triger);
  };

  const activePerfume = async (item) => {
    if (userinfo.displayName.isLogin) {
      if (confirm("이 향수를 옷장에 저장할까요?")) {
        await setDoc(
          doc(fireStore, "perfumes", userinfo.email.email, "like", item.id),
          {
            active: true,
            id: item.id,
            img_url: item.img_url,
            name: item.name,
            brand: item.brand,
            price: item.price,
          }
        );
      }
      setTriger(!triger);
    } else {
      router.push("/login");
    }
  };

  const unactivePerfume = async (id) => {
    await deleteDoc(
      doc(fireStore, "perfumes", userinfo.email.email, "like", id)
    );
    setTriger(!triger);
  };

  const activeMusic = async (item) => {
    if (userinfo.displayName.isLogin) {
      if (confirm("이 곡을 저장할까요?")) {
        await setDoc(
          doc(fireStore, "music", userinfo.email.email, "like", item.id),
          {
            active: true,
            id: item.id,
            img_url: item.img_url,
            name: item.name,
            artist: item.artist,
            album: item.album,
            mood: item.mood,
          }
        );
      }
      setTriger(!triger);
    } else {
      router.push("/login");
    }
  };

  const unactiveMusic = async (id) => {
    await deleteDoc(doc(fireStore, "music", userinfo.email.email, "like", id));
    setTriger(!triger);
  };

  useEffect(() => {
    const shuffle = () => Math.random() - 0.5;

    if (similarData) {
      const shuffleCody = [...similarData.usersimilarlist].sort(shuffle);
      getSimilerStyle(shuffleCody);
    }
  }, [similarData]);

  const analyticsProduct = (item) => {
    logEvent(analytics, "click_item_product", {
      content_type: "image",
      content_id: item.id,
      items: [{ name: item.id }],
    });
  };

  const analyticsMusic = (item) => {
    logEvent(analytics, "click_item_music", {
      content_type: "image",
      content_id: item.id,
      items: [{ name: item.id }],
    });
  };

  const analyticsPerfume = (item) => {
    logEvent(analytics, "click_item_perfume", {
      content_type: "image",
      content_id: item.id,
      items: [{ name: item.id }],
    });
  };

  const analyticsSimilar = (item) => {
    logEvent(analytics, "click_item_similar", {
      content_type: "image",
      content_id: item.id,
      items: [{ name: item.id }],
    });
  };

  const analyticsUser = (item) => {
    logEvent(analytics, "click_item_usercody", {
      content_type: "image",
      content_id: item.id,
      items: [{ name: item.id }],
    });
  };
  return (
    <div className={style.container}>
      <div className={style.banner}></div>
      {!loading && codyItem.category && codyItem.information ? (
        <div className={style.inner}>
          <Row type="flex" className={style.info_container}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div className={style.img_container}>
                <div className={style.img}>
                  <img src={codyItem.img_url} />
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div className={style.detail_container}>
                <div className={style.title}>{codyItem.category.theme}</div>
                <ul className={style.ul}>
                  <li>
                    <div className={style.question}>성별</div>
                    <div className={style.answer}>{codyItem.category.sex}</div>
                  </li>
                  <li>
                    <div className={style.question}>계절</div>
                    <div className={style.answer}>
                      {codyItem.category.season}
                    </div>
                  </li>

                  <li>
                    <div className={style.question}>스타일</div>
                    <div className={style.answer}>
                      {codyItem.category.style}
                    </div>
                  </li>
                  <li>
                    <div className={style.question}>분위기</div>
                    <div className={style.answer}>{codyItem.category.mood}</div>
                  </li>
                </ul>
                <div className={style.info_margin} className={style.title}>
                  Infomation
                </div>
                <ul className={style.ul}>
                  <li>
                    <div className={style.question}>이름</div>
                    <div className={style.answer}>
                      {codyItem.information.name}
                    </div>
                  </li>
                  <li>
                    <div className={style.question}>인스타그램</div>
                    <div className={style.answer}>
                      <a
                        href={`https://www.instagram.com/${codyItem.information.instagram}`}
                        target="_blank"
                      >
                        @{codyItem.information.instagram}
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className={style.question}>유튜브</div>
                    <div className={style.answer}>
                      {codyItem.information.youtube ? (
                        <a href={codyItem.information.youtube} target="_blank">
                          바로가기
                        </a>
                      ) : null}
                    </div>
                  </li>
                  <li>
                    <div className={style.question}>쇼핑몰</div>
                    <div className={style.answer}>
                      {codyItem.information.shop ? (
                        <a href={codyItem.information.shop} target="_blank">
                          바로가기
                        </a>
                      ) : null}
                    </div>
                  </li>
                </ul>
                <div onClick={handleBookmark} className={style.bookmark}>
                  <img
                    className={style.bookmark_icon}
                    src={
                      !activeBookmark
                        ? "/icon/icons8-bookmark.svg"
                        : "/icon/icons8-bookmark-filled.svg"
                    }
                  />
                  <div>관심 코디 북마크</div>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            {Array.isArray(codyItem.products) &&
            codyItem.products.length !== 0 ? (
              <Col lg={24} xl={24} className={style.list_container}>
                <div className={style.sub_head}>이 코디와 연관된 상품</div>
                <div className={style.cody_ul_container}>
                  <ul className={style.product_ul}>
                    {codyItem.products.map((item) => (
                      <li key={item.id} className={style.product_li}>
                        <img
                          onClick={
                            productId.includes(item.id)
                              ? () => unactiveProduct(item.id)
                              : () => activeProduct(item)
                          }
                          className={style.product_bookmark}
                          src={
                            productId.includes(item.id)
                              ? "/icon/icons8-bookmark-filled.svg"
                              : "/icon/icons8-bookmark.svg"
                          }
                        />

                        <Link href={`/product/${item.id}`}>
                          <img
                            onClick={() => analyticsProduct(item)}
                            className={style.product_img}
                            src={item.img_url}
                          />
                        </Link>
                        <div className={style.product_category}>
                          <div>{item.brand}</div>
                          <div>{item.name}</div>
                          <div>
                            {item.price
                              ? item.price.toLocaleString("en-US")
                              : 0}
                            원
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ) : null}
            <Col lg={24} xl={24} className={style.list_container}>
              <div className={style.sub_head}>비슷한 분위기의 코디</div>
              <div className={style.cody_ul_container}>
                <ul className={style.cody_ul}>
                  {similarStyle &&
                    similarStyle.slice(0, 6).map((item) => (
                      <li key={item.id}>
                        <Link href={`/item/${item.id}`}>
                          <img
                            onClick={() => analyticsSimilar(item)}
                            className={style.usercody_img}
                            src={item.img_url}
                          />
                        </Link>
                        <div className={style.info_category}>
                          <div>{item.category.style}</div>
                          <div>{item.category.theme}</div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </Col>
            <Col lg={24} xl={24} className={style.list_container}>
              <div className={style.sub_head}>
                {codyItem.information.name}님의 다른 코디
              </div>
              <div className={style.cody_ul_container}>
                <ul className={style.cody_ul}>
                  {userItem
                    ? userItem.map((item) => (
                        <li key={item.id}>
                          <Link href={`/item/${item.id}`}>
                            <img
                              onClick={() => analyticsUser(item)}
                              className={style.usercody_img}
                              src={item.img_url}
                            />
                          </Link>
                          <div className={style.info_category}>
                            <div>{item.category.style}</div>
                            <div>{item.category.theme}</div>
                          </div>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </Col>

            {Array.isArray(codyItem.music) && codyItem.music.length !== 0 ? (
              <Col lg={24} xl={24} className={style.list_container}>
                <div className={style.sub_head}>코디와 어울리는 노래</div>
                <div className={style.cody_ul_container}>
                  <ul className={style.product_ul}>
                    {codyItem.music.map((item) => (
                      <li key={item.id} className={style.product_li}>
                        <img
                          onClick={
                            musicId.includes(item.id)
                              ? () => unactiveMusic(item.id)
                              : () => activeMusic(item)
                          }
                          className={style.product_bookmark}
                          src={
                            musicId.includes(item.id)
                              ? "/icon/icons8-bookmark-filled.svg"
                              : "/icon/icons8-bookmark.svg"
                          }
                        />

                        <Link href={`/music/${item.id}`}>
                          <img
                            onClick={() => analyticsMusic(item)}
                            className={style.product_img}
                            src={item.img_url}
                          />
                        </Link>
                        <div className={style.product_category}>
                          <div>{item.mood}</div>
                          <div>{item.name}</div>
                          <div>{item.artist}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ) : null}

            {Array.isArray(codyItem.perfumes) &&
            codyItem.perfumes.length !== 0 ? (
              <Col lg={24} xl={24} className={style.list_container}>
                <div className={style.sub_head}>함께 풍기면 좋은 향수</div>
                <div className={style.cody_ul_container}>
                  <ul className={style.product_ul}>
                    {codyItem.perfumes.map((item) => (
                      <li key={item.id} className={style.product_li}>
                        <img
                          onClick={
                            perfumeId.includes(item.id)
                              ? () => unactivePerfume(item.id)
                              : () => activePerfume(item)
                          }
                          className={style.product_bookmark}
                          src={
                            perfumeId.includes(item.id)
                              ? "/icon/icons8-bookmark-filled.svg"
                              : "/icon/icons8-bookmark.svg"
                          }
                        />

                        <Link href={`/perfume/${item.id}`}>
                          <img
                            onClick={() => analyticsPerfume(item)}
                            className={style.product_img}
                            src={item.img_url}
                          />
                        </Link>
                        <div className={style.product_category}>
                          <div>{item.brand}</div>
                          <div>{item.name}</div>
                          <div>
                            {item.price
                              ? item.price.toLocaleString("en-US")
                              : 0}
                            원
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ) : null}
          </Row>
          <div className={style.comment_container}>
            <Comment item={item} />
          </div>
        </div>
      ) : (
        <div>정보를 불러오고 있습니다..</div>
      )}
    </div>
  );
};

export default Detail;

export const getServerSideProps = async (context) => {
  const id = context.params.id;

  const { loading, data } = await client.query({
    query: GET_CODY_ID,
    variables: { id },
  });

  return {
    props: {
      item: id,
      codyData: data?.codyitem,
      loading,
    },
  };
};
