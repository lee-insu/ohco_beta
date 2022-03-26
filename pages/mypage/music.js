import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../../styles/productPick.module.css";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import { fireStore } from "../../service/firebase";
import * as musicAction from "../../store/modules/music";

const music = () => {
  const bookmarkStore = useSelector((state) => state.music.music);
  const user = useSelector((state) => state.email.email);
  const [triger, setTriger] = useState(true);
  const [bookmark, getBookmark] = useState(bookmarkStore);
  const dispatch = useDispatch();

  const unactiveItem = async (id) => {
    if (confirm("이 음악을 북마크에서 뺄까요?")) {
      await deleteDoc(doc(fireStore, "music", user, "like", id));
      setTriger(!triger);
    }
  };

  useEffect(() => {
    return async () => {
      const q = await query(collection(fireStore, "music", user, "like"));
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      getBookmark(...[newData]);
      dispatch(musicAction.getMusic(newData));
    };
  }, [triger]);
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.title}>관심 분위기</div>
        <Row className-={style.row} gutter={[8, 4]}>
          {bookmark
            ? bookmark.map((item) => (
                <Col
                  key={item.id}
                  className={style.li_bookmark}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <div className={style.li}>
                    <Link href={`/music/${item.id}`}>
                      <div className={style.bookmark_img_container}>
                        <img className={style.img} src={item.img_url} />
                      </div>
                    </Link>
                    <div className={style.bookmark_info_container}>
                      <div className={style.bookmark_info_category}>
                        <div>{item.mood}</div>
                        <div>{item.name}</div>
                      </div>
                      <img
                        onClick={() => unactiveItem(item.id)}
                        className={style.bookmark}
                        src="/icon/icons8-bookmark-filled.svg"
                      />
                    </div>
                  </div>
                </Col>
              ))
            : null}
        </Row>
      </div>
    </div>
  );
};

export default music;
