import React, { useEffect, useState } from "react";
import style from "../styles/Register.module.css";
import { authService } from "../service/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import Privacy from "../components/Privacy";
import { useSelector } from "react-redux";

const register = () => {
  const isLogin = useSelector((state) => state.displayName.isLogin);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

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
    } else if (name == "nickname") {
      setNickname(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        authService,
        email,
        password
      );
      await updateProfile(user, { displayName: nickname });
      alert("회원가입이 완료되었습니다!");
      router.replace("/login");
    } catch (error) {
      if (error.code === "auth/weak-password") {
        alert("비밀번호는 6자 이상으로 해주세요!");
        setPassword("");
      } else if (error.code === "auth/invalid-email") {
        alert("이메일 형식이 맞지 않습니다");
        setEmail("");
        setPassword("");
        setNickname("");
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.banner}></div>
      <div className={style.inner}>
        <div className={style.title_container}>
          <div className={style.logo}>회원가입</div>
        </div>
        <form onSubmit={onSubmit} className={style.form}>
          <div className={style.text}>이메일 주소</div>
          <input
            className={style.input}
            type="text"
            name="email"
            autoComplete="username"
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
            autoComplete="new-password"
            onChange={onChange}
            value={password}
            placeholder="영문+숫자 8자 이상"
            required
          />
          <div className={style.text}>닉네임</div>
          <input
            className={style.input}
            type="text"
            name="nickname"
            onChange={onChange}
            value={nickname}
            required
          />
          <Privacy />
          <input className={style.register} type="submit" value="회원가입" />
        </form>
      </div>
    </div>
  );
};

export default register;
