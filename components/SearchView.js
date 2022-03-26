import React, { useEffect, useState } from "react";
import style from "../styles/SearchView.module.css";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import {
  GET_SEARCH_CODY,
  GET_SEARCH_MUSIC,
  GET_SEARCH_PERFUMES,
  GET_SEARCH_PRODUCTS,
} from "../graphQL/schema";
import * as searchAction from "../store/modules/search";
import { useRouter } from "next/router";

const SearchView = () => {
  const search = useSelector((state) => state.search.search);
  const router = useRouter();
  const [result, getResult] = useState("");
  const dispatch = useDispatch();

  const { data: cody } = useQuery(GET_SEARCH_CODY, {
    variables: {
      search,
    },
  });

  const { data: products } = useQuery(GET_SEARCH_PRODUCTS, {
    variables: {
      search,
    },
  });

  const { data: music } = useQuery(GET_SEARCH_MUSIC, {
    variables: {
      search,
    },
  });

  const { data: perfumes } = useQuery(GET_SEARCH_PERFUMES, {
    variables: {
      search,
    },
  });

  const onChange = (e) => {
    const target = e.target.value;
    getResult(target);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchAction.getSearch(result));
  };

  useEffect(() => {
    if (search == null) {
      router.push("/");
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.input_container}>
        <form onSubmit={onSubmit} className={style.form}>
          <input
            className={style.input}
            type="text"
            onChange={onChange}
            placeholder={` "${search}" 의 검색 결과`}
          />
        </form>
      </div>

      <div className={style.item_area}>
        {cody &&
        Array.isArray(cody.codysearch) &&
        cody.codysearch.length !== 0 ? (
          <>
            <div className={style.title}>코디</div>
            <Row gutter={[8, 4]}>
              {cody.codysearch.map((item, i) => (
                <Col
                  key={i}
                  className={style.li_container}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <div className={style.cody_li}>
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
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        ) : null}
      </div>

      <div className={style.item_area}>
        {products &&
        Array.isArray(products.productsearch) &&
        products.productsearch.length !== 0 ? (
          <>
            <div className={style.title}>상품</div>
            <Row className={style.row} gutter={[8, 4]}>
              {products.productsearch.map((item, i) => (
                <Col
                  key={i}
                  className={style.li_container}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <div className={style.product_li}>
                    <Link href={`/product/${item.id}`}>
                      <img className={style.product_img} src={item.img_url} />
                    </Link>

                    <div className={style.product_item_container}>
                      <div className={style.product_category}>
                        <div>{item.brand}</div>
                        <div>{item.name}</div>
                        <div>
                          {item.price ? item.price.toLocaleString("en-US") : 0}
                          원
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        ) : null}
      </div>

      <div className={style.item_area}>
        {music &&
        Array.isArray(music.musicsearch) &&
        music.musicsearch.length !== 0 ? (
          <>
            <div className={style.title}>음악</div>
            <Row className={style.row} gutter={[8, 4]}>
              {music.musicsearch.map((item, i) => (
                <Col
                  key={i}
                  className={style.li_container}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <div className={style.product_li}>
                    <Link href={`/music/${item.id}`}>
                      <img className={style.product_img} src={item.img_url} />
                    </Link>

                    <div className={style.product_item_container}>
                      <div className={style.product_category}>
                        <div>{item.mood}</div>
                        <div>{item.name}</div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        ) : null}
      </div>

      <div className={style.item_area}>
        {perfumes &&
        Array.isArray(perfumes.perfumesearch) &&
        perfumes.perfumesearch.length !== 0 ? (
          <>
            <div className={style.title}>향수</div>
            <Row className={style.row} gutter={[8, 4]}>
              {perfumes.perfumesearch.map((item, i) => (
                <Col
                  key={i}
                  className={style.li_container}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <div className={style.product_li}>
                    <Link href={`/perfume/${item.id}`}>
                      <img className={style.product_img} src={item.img_url} />
                    </Link>

                    <div className={style.product_item_container}>
                      <div className={style.product_category}>
                        <div>{item.mood}</div>
                        <div>{item.name}</div>
                        <div>{item.scent}</div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SearchView;
