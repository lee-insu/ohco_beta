import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "../../styles/Music.module.css";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import { GET_CODY_BOOKMARK, GET_MUSIC } from "../../graphQL/schema";
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { fireStore } from "../../service/firebase";
import Link from "next/link";
import { client } from "../../service/apollo";

const Music = ({ item, data, loading }) => {
  const userinfo = useSelector((state) => state);
  const router = useRouter();
  const [triger, setTriger] = useState(false);
  const [activeBookmark, setActiveBookmark] = useState(false);
  const [music, getMusic] = useState(null);
  const [similarStyle, getSimilerStyle] = useState([]);
  const [cody, getCody] = useState([]);
  useEffect(async () => {
    if (data) {
      getMusic(data);
    }
    if (userinfo.displayName.isLogin) {
      const q = await query(
        collection(fireStore, "music", userinfo.email.email, "like")
      );
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => doc.id);
      newData && newData.includes(item)
        ? setActiveBookmark(true)
        : setActiveBookmark(false);
    } else {
      setActiveBookmark(false);
    }
  }, [triger, item, loading]);

  useEffect(() => {
    if (music !== null) {
      music.recommand_cody.map((x) => getCody((prev) => [...prev, x.id]));
    }
    return () => {
      getCody([]);
    };
  }, [music, item]);

  const { data: codyItem } = useQuery(GET_CODY_BOOKMARK, {
    variables: {
      id: cody,
    },
  });

  useEffect(() => {
    const shuffle = () => Math.random() - 0.5;

    if (codyItem) {
      const shuffleCody = [...codyItem.codyarray].sort(shuffle);
      getSimilerStyle(shuffleCody);
    }
  }, [codyItem]);

  const handleBookmark = async () => {
    switch (activeBookmark) {
      case true:
        await deleteDoc(
          doc(fireStore, "music", userinfo.email.email, "like", item)
        );
        setTriger(!triger);
        break;
      case false:
        if (userinfo.displayName.isLogin) {
          await setDoc(
            doc(fireStore, "music", userinfo.email.email, "like", item),
            {
              active: true,
              id: music.id,
              artist: music.artist,
              album: music.album,
              name: music.name,
              mood: music.mood,
              img_url: music.img_url,
            }
          );
          setTriger(!triger);
        } else {
          router.push("/login");
        }

      default:
    }
  };

  return (
    <div className={style.container}>
      <div className={style.banner}></div>
      <div className={style.inner}>
        <Row type="flex" className={style.info_container}>
          {music !== null ? (
            <>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div className={style.img_container}>
                  <img className={style.img} src={music.img_url} />
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div className={style.detail_container}>
                  <div className={style.title}>{music.name}</div>
                  <ul className={style.ul}>
                    <li>
                      <div className={style.question}>노래</div>
                      <div className={style.answer}>{music.name}</div>
                    </li>
                    <li>
                      <div className={style.question}>앨범</div>
                      <div className={style.answer}>{music.album}</div>
                    </li>
                    <li>
                      <div className={style.question}>아티스트</div>
                      <div className={style.answer}>{music.artist}</div>
                    </li>
                    <li>
                      <div className={style.question}>분위기</div>
                      <div className={style.answer}>{music.mood}</div>
                    </li>
                  </ul>
                  <div className={style.save_container}>
                    <div className={style.shop_link}>
                      <a href={music.music_url}>음악 듣기</a>
                    </div>
                    <div onClick={handleBookmark} className={style.bookmark}>
                      <img
                        className={style.bookmark_icon}
                        src={
                          !activeBookmark
                            ? "/icon/icons8-bookmark.svg"
                            : "/icon/icons8-bookmark-filled.svg"
                        }
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </>
          ) : null}
        </Row>
        <Row>
          {codyItem && Array.isArray(similarStyle) && similarStyle !== 0 ? (
            <Col lg={24} xl={24} className={style.list_container}>
              <div className={style.sub_head}>노래 분위기와 찰떡 코디</div>
              <div className={style.cody_ul_container}>
                <ul className={style.cody_ul}>
                  {similarStyle.slice(0, 15).map((item) => (
                    <li key={item.id}>
                      <Link href={`/item/${item.id}`}>
                        <img
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
          ) : null}
        </Row>
      </div>
    </div>
  );
};
export default Music;

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const { loading, data } = await client.query({
    query: GET_MUSIC,
    variables: { id },
  });

  return {
    props: {
      item: id,
      data: data.music,
      loading,
    },
  };
};
