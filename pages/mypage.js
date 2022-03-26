import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import style from "../styles/Mypage.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fireStore } from "../service/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useQuery } from "@apollo/client";
import { GET_CODY_BOOKMARK } from "../graphQL/schema";
import * as codyAction from "../store/modules/cody";
import * as productAction from "../store/modules/product";
import * as musicAction from "../store/modules/music";
import * as perfumeAction from "../store/modules/perfume";

const mypage = () => {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();

  const [pick, getPick] = useState([]);
  const [productsPick, getProductsPick] = useState([]);
  const [perfumesPick, getPerfumesPick] = useState([]);
  const [musicPick, getMusicPick] = useState([]);
  const [bookmark, getBookmark] = useState([]);
  const [triger, setTriger] = useState(false);

  const { data } = useQuery(GET_CODY_BOOKMARK, {
    variables: {
      id: pick,
    },
  });

  useEffect(async () => {
    if (user.displayName.isLogin) {
      const q = await query(
        collection(fireStore, "bookmark", user.email.email, "like")
      );
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => doc.id);
      getPick(newData);
      setTriger(false);
    }

    if (user.displayName.isLogin) {
      const q = await query(
        collection(fireStore, "products", user.email.email, "like")
      );
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      getProductsPick(newData);
      dispatch(productAction.getProduct(newData));
    }

    if (user.displayName.isLogin) {
      const q = await query(
        collection(fireStore, "perfumes", user.email.email, "like")
      );
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      getPerfumesPick(newData);
      dispatch(perfumeAction.getPerfume(newData));
    }

    if (user.displayName.isLogin) {
      const q = await query(
        collection(fireStore, "music", user.email.email, "like")
      );
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      getMusicPick(newData);
      dispatch(musicAction.getMusic(newData));
    }
  }, [triger]);

  useEffect(() => {
    if (data) {
      getBookmark(data.codyarray);
      dispatch(codyAction.getCody(data.codyarray));
    }
  }, [data]);

  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.userinfo_container}>
          <div className={style.userinfo_box}>
            <div className={style.userinfo_profile}>
              <div className={style.profile_img}></div>
            </div>

            <div className={style.userinfo}>
              <div>{user.displayName.displayName}</div>
              <div>{user.email.email}</div>
            </div>
          </div>
        </div>
        <div className={style.ad}>다양한 기능을 준비하고 있습니다..</div>
        <div className={style.bookmark_container}>
          <div className={style.title_container}>
            <div className={style.sub_title}>관심 있는 코디</div>
            {bookmark.length > 4 && (
              <Link href="/mypage/cody">
                <div className={style.moreBtn}>더보기</div>
              </Link>
            )}
          </div>

          <ul className={style.item_bookmark_container}>
            {bookmark.slice(0, 4).map((item) => (
              <li key={item.id} className={style.li}>
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
                </div>
              </li>
            ))}
          </ul>
        </div>

        {productsPick ? (
          <div className={style.product_container}>
            <div className={style.title_container}>
              <div className={style.sub_title}>관심 있는 상품</div>
              {productsPick.length > 4 && (
                <Link href="/mypage/product">
                  <div className={style.moreBtn}>더보기</div>
                </Link>
              )}
            </div>
            <ul className={style.item_bookmark_container}>
              {productsPick.slice(0, 4).map((item) => (
                <li key={item.id} className={style.li}>
                  <Link href={`/product/${item.id}`}>
                    <div className={style.product_img_container}>
                      <img className={style.product_img} src={item.img_url} />
                    </div>
                  </Link>
                  <div className={style.bookmark_info_container}>
                    <div className={style.bookmark_info_category}>
                      <div>{item.brand}</div>
                      <div>{item.name}</div>
                      <div>
                        {item.price ? item.price.toLocaleString("en-US") : 0}원
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {musicPick ? (
          <div className={style.product_container}>
            <div className={style.title_container}>
              <div className={style.sub_title}>관심 있는 분위기</div>
              {musicPick.length > 4 && (
                <Link href="/mypage/music">
                  <div className={style.moreBtn}>더보기</div>
                </Link>
              )}
            </div>
            <ul className={style.item_bookmark_container}>
              {musicPick.slice(0, 4).map((item) => (
                <li key={item.id} className={style.li}>
                  <Link href={`/music/${item.id}`}>
                    <div className={style.product_img_container}>
                      <img className={style.product_img} src={item.img_url} />
                    </div>
                  </Link>
                  <div className={style.bookmark_info_container}>
                    <div className={style.bookmark_info_category}>
                      <div>{item.mood}</div>
                      <div>{item.name}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {perfumesPick ? (
          <div className={style.product_container}>
            <div className={style.title_container}>
              <div className={style.sub_title}>관심 있는 향수</div>
              {perfumesPick.length > 4 && (
                <Link href="/mypage/perfume">
                  <div className={style.moreBtn}>더보기</div>
                </Link>
              )}
            </div>
            <ul className={style.item_bookmark_container}>
              {perfumesPick.slice(0, 4).map((item) => (
                <li key={item.id} className={style.li}>
                  <Link href={`/perfume/${item.id}`}>
                    <div className={style.product_img_container}>
                      <img className={style.product_img} src={item.img_url} />
                    </div>
                  </Link>
                  <div className={style.bookmark_info_container}>
                    <div className={style.bookmark_info_category}>
                      <div>{item.brand}</div>
                      <div>{item.name}</div>
                      <div>
                        {item.price ? item.price.toLocaleString("en-US") : 0}원
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default mypage;
