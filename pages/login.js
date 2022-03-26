import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import style from "../styles/Login.module.css";
import { authService } from "../service/firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const login = () => {
  const isLogin = useSelector((state) => state.displayName.isLogin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.replace("/");
    }
  }, [isLogin]);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(authService, email, password);
      router.push("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("유저 정보가 없습니다");
        setEmail("");
        setPassword("");
      } else if (error.code === "auth/wrong-password") {
        alert("비밀번호가 틀렸습니다");
        setPassword("");
      }
    }
  };

  const resetPassword = (e) => {
    e.preventDefault();
    if (!email) {
      alert("이메일란에 이메일을 적으면 재설정 메일이 발송됩니다.");
    } else {
      sendPasswordResetEmail(authService, email);
      try {
        alert("해당 메일로 재설정 메일을 보냈습니다!");
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          alert("해당 계정 정보가 없습니다.");
          setEmail("");
        }
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.banner}></div>
      <div className={style.inner}>
        <div className={style.title_container}>
          <div className={style.logo}>OH CO!</div>
          <div className={style.sub}>나다운 분위기를 입는 코디</div>
        </div>
        <form onSubmit={onSubmit} className={style.form}>
          <div className={style.text}>이메일 주소</div>
          <input
            className={style.input}
            type="text"
            name="email"
            onChange={onChange}
            value={email}
            placeholder="이메일을 적어주세요"
            required
          />

          <div className={style.text}>비밀번호</div>
          <input
            className={style.input}
            type="password"
            name="password"
            onChange={onChange}
            value={password}
            required
          />
          <div onClick={resetPassword} className={style.find_password}>
            비밀번호를 잊으셨나요?
          </div>
          <input className={style.login} type="submit" value="로그인" />
        </form>
        <Link href="/register">
          <div className={style.register_container}>
            <div className={style.register}>회원가입 하기</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default login;
