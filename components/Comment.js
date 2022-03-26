import React, { useEffect, useState } from "react";
import style from "../styles/Comment.module.css";
import {
  addDoc,
  doc,
  collection,
  getDocs,
  query,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fireStore } from "../service/firebase";

const Comment = ({ item }) => {
  const [write, setWrite] = useState("");
  const [comments, getComments] = useState([]);
  const [triger, setTriger] = useState(false);
  const userinfo = useSelector((state) => state);
  const router = useRouter();

  const onChange = (e) => {
    const value = e.target.value;
    if (userinfo.displayName.isLogin) {
      setWrite(value);
    } else {
      router.push("/login");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(fireStore, "comments", item, "comment"), {
      writer: userinfo.email.email,
      comment: write,
      nickname: userinfo.displayName.displayName,
      uid: userinfo.uid.uid,
      time: `${new Date().getFullYear()}년 ${
        new Date().getMonth() + 1
      }월 ${new Date().getDate()}일 ${new Date().getHours()}시 ${new Date().getMinutes()}분 `,
    });
    setWrite("");
    setTriger(!triger);
  };

  const deleteCmt = async (id, uid) => {
    if (uid === userinfo.uid.uid) {
      if (confirm("댓글을 삭제할까요?")) {
        await deleteDoc(doc(fireStore, "comments", item, "comment", id));
        setTriger(!triger);
      }
    } else {
      alert("댓글 작성자가 아닙니다");
    }
  };

  useEffect(async () => {
    const q = await query(
      collection(fireStore, "comments", item, "comment"),
      orderBy("time")
    );
    const snap = await getDocs(q).size;
    const data = await getDocs(q);
    const newData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    getComments(newData);
  }, [triger]);

  return (
    <div className={style.container}>
      <div className={style.title}>댓글</div>
      <ul className={style.ul}>
        {comments
          ? comments.map((cmt, i) => (
              <li onClick={() => deleteCmt(cmt.id, cmt.uid)} key={i}>
                <div className={style.user}>{cmt.nickname}</div>
                <div className={style.comment}>{cmt.comment}</div>
              </li>
            ))
          : null}
      </ul>

      <form onSubmit={onSubmit} className={style.form}>
        <input
          className={style.input}
          type="text"
          value={write}
          onChange={onChange}
          placeholder="댓글 쓰기..."
          required
        />
        <input className={style.submit} type="submit" value="올리기" />
      </form>
    </div>
  );
};

export default Comment;
