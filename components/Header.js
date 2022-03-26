import { Drawer, Menu } from "antd";
import Link from "next/link";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useSelector } from "react-redux";
import { authService } from "../service/firebase";
import style from "../styles/Header.module.css";
import { useDispatch } from "react-redux";
import * as searchAction from "../store/modules/search";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_SEARCH_CODY } from "../graphQL/schema";

const Header = () => {
  const displayName = useSelector((state) => state.displayName);

  const logout = () => {
    authService.signOut();
    window.location.replace("/");
  };

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(!visible);
  };

  const onClose = () => {
    setVisible(!visible);
  };

  const [searchActive, setSearchActive] = useState(false);
  const [result, getResult] = useState(null);
  const router = useRouter();

  const dispatch = useDispatch();

  const searchShow = () => {
    setSearchActive(!searchActive);
  };

  const searchClose = () => {
    setSearchActive(!searchActive);
  };

  const onChange = (e) => {
    const target = e.target.value;
    const newTarget = target.replace(/(\s*)/g, "");
    getResult(newTarget);
  };

  useEffect(() => {
    if (result == "") {
      getResult(null);
    }
  }, [result]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchAction.getSearch(result));
    searchClose();
    router.push("/search");
  };

  const { data: cody } = useQuery(GET_SEARCH_CODY, {
    variables: {
      search: result,
    },
  });

  return (
    <div className={style.container}>
      <BrowserView>
        <div className={style.inner}>
          <Link href="/">
            <div className={style.logo}>
              <img src="/icon/logo.svg" />
            </div>
          </Link>

          <nav className={style.nav}>
            <img
              className={style.search}
              onClick={searchShow}
              src="/icon/icons8-search.svg"
            />
            <Link href="/list">
              <div>LIST</div>
            </Link>
            {displayName.isLogin ? (
              <>
                <div onClick={logout}>LOGOUT</div>
                <Link href="/mypage">
                  <div>MYPAGE</div>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <div>LOGIN</div>
                </Link>
                <Link href="/login">
                  <div>MYPAGE</div>
                </Link>
              </>
            )}
          </nav>
          <Drawer
            placement="top"
            onClose={searchClose}
            visible={searchActive}
            destroyOnClose="true"
            closeIcon=""
            height={
              Array.isArray(result) && result.length === 0 ? "125" : "auto"
            }
          >
            <form onSubmit={onSubmit} className={style.search_container}>
              <input
                className={style.input}
                type="text"
                onChange={onChange}
                placeholder="이름, 계절, 스타일 등.."
              />
              <div onClick={searchClose} className={style.search_close}>
                취소
              </div>
            </form>

            {cody &&
            Array.isArray(cody.codysearch) &&
            cody.codysearch.length === 0 ? null : (
              <div className={style.result_container}>
                <div className={style.preview_title}>검색 결과 미리보기</div>
                {cody &&
                  cody.codysearch.slice(0, 5).map((item) => (
                    <div key={item.id}>
                      <Link href={`/item/${item.id}`}>
                        <div
                          onClick={searchClose}
                          className={style.result_item_container}
                        >
                          <img className={style.cody_img} src={item.img_url} />
                          <div className={style.sub}>
                            <div>{item.category.style}</div>
                            <div>{item.category.theme}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </Drawer>
        </div>
      </BrowserView>

      <MobileView>
        <div className={style.container}>
          <Link href="/">
            <div className={style.logo}>
              <img src="/icon/logo.svg" />
            </div>
          </Link>

          <nav className={style.nav_ul}>
            <div className={style.nav_btn}>
              <img
                onClick={searchShow}
                className={style.icon_search}
                src="/icon/icons8-search.svg"
              />
              <img
                onClick={showDrawer}
                className={style.icon_menu}
                src="/icon/menu.svg"
              />
            </div>
          </nav>
          <Drawer
            placement="top"
            onClose={searchClose}
            visible={searchActive}
            destroyOnClose="true"
            closeIcon=""
            height={
              Array.isArray(result) && result.length === 0 ? "100%" : "100%"
            }
          >
            <form onSubmit={onSubmit} className={style.search_container}>
              <input
                className={style.input}
                type="text"
                onChange={onChange}
                placeholder="이름, 계절, 스타일 등.."
              />
              <div onClick={searchClose} className={style.search_close}>
                취소
              </div>
            </form>

            {cody &&
            Array.isArray(cody.codysearch) &&
            cody.codysearch.length === 0 ? null : (
              <div className={style.result_container}>
                <div className={style.preview_title}>검색 결과 미리보기</div>
                {cody &&
                  cody.codysearch.slice(0, 5).map((item) => (
                    <div key={item.id}>
                      <Link href={`/item/${item.id}`}>
                        <div
                          onClick={searchClose}
                          className={style.result_item_container}
                        >
                          <img className={style.cody_img} src={item.img_url} />
                          <div className={style.sub}>
                            <div>{item.category.style}</div>
                            <div>{item.category.theme}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </Drawer>

          <Drawer
            placement="right"
            onClose={onClose}
            visible={visible}
            destroyOnClose="true"
            width="300"
            closeIcon={<img className={style.close} src="/icon/close.svg" />}
          >
            <Menu mode="vertical">
              <Menu.Item key="list">
                <Link href="/list">
                  <div className={style.menu_btn} onClick={onClose}>
                    LIST
                  </div>
                </Link>
              </Menu.Item>
              {displayName.isLogin ? (
                <>
                  <Menu.Item key="mypage">
                    <Link href="/mypage">
                      <div className={style.menu_btn} onClick={onClose}>
                        MYPAGE
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="logout">
                    <div onClick={logout} className={style.logout}>
                      LOGOUT
                    </div>
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item key="mypage">
                    <Link href="/login">
                      <div className={style.menu_btn} onClick={onClose}>
                        MYPAGE
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="login">
                    <Link href="/login">
                      <div className={style.menu_btn} onClick={onClose}>
                        LOGIN
                      </div>
                    </Link>
                  </Menu.Item>
                </>
              )}
            </Menu>
          </Drawer>
        </div>
      </MobileView>
    </div>
  );
};

export default Header;
