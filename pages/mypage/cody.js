import React, { useEffect, useState } from "react";
import style from "../../styles/Cody.module.css";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { fireStore } from "../../service/firebase";
import Link from "next/link";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import * as codyAction from "../../store/modules/cody";

const cody = () => {
  const bookmarkStore = useSelector((state) => state.cody.cody);
  const user = useSelector((state) => state.email.email);
  const [triger, setTriger] = useState(true);
  const [bookmark, getBookmark] = useState(bookmarkStore);
  const dispatch = useDispatch();

  const unactiveBookmark = async (id) => {
    if (confirm("이 코디를 북마크에서 뺄까요?")) {
      await deleteDoc(doc(fireStore, "bookmark", user, "like", id));
      setTriger(!triger);
    }
  };

  useEffect(() => {
    return async () => {
      const q = await query(collection(fireStore, "bookmark", user, "like"));
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      getBookmark(...[newData]);
      dispatch(codyAction.getCody(newData));
    };
  }, [triger]);

  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.title}>관심 코디</div>
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
                    <Link href={`/item/${item.id}`}>
                      <div className={style.bookmark_img_container}>
                        <img className={style.img} src={item.img_url} />
                      </div>
                    </Link>
                    <div className={style.bookmark_info_container}>
                      <div className={style.bookmark_info_category}>
                        <div>{item.category.style}</div>
                        <div>{item.category.theme}</div>
                      </div>
                      <img
                        onClick={() => unactiveBookmark(item.id)}
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

export default cody;
