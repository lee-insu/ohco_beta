import Head from "next/head";
import Image from "next/image";
import style from "../styles/Home.module.css";
import Banner from "../components/banner";
import CodyList from "../components/CodyList";
import SubList from "../components/SubList";
import {
  GET_MUSIC,
  GET_MUSIC_ARRAY,
  GET_PERFUMES,
  GET_PERFUMES_ARRAY,
} from "../graphQL/schema";
import SubItemList from "../components/SubItemList";
import { client } from "../service/apollo";
import Temperature from "../components/Temperature";
import ColorCody from "../components/ColorCody";

export default function Home({
  musicArray,
  musicLoading,
  perfumeArray,
  perfumeLoading,
  musicItemLoad,
  musicItem,
  perfumeItemLoad,
  perfumeItem,
}) {
  const music = "music";
  const perfumes = "perfumes";

  return (
    <div className={style.container}>
      <div className={style.banner}>
        <Banner />
      </div>
      <div className={style.today_list}>
        <div className={style.inner}>
          <div className={style.title}>
            <div className={style.style_title}>지금 날씨에 어울리는 코디</div>
            <div className={style.location}>
              <Temperature />
            </div>
          </div>
          <CodyList />
        </div>
      </div>
      <div className={style.today_list}>
        <div className={style.sub_inner}>
          <ColorCody />
        </div>
      </div>
      <div className={style.sub_banner}>
        <img src="/img/music.svg" />
      </div>

      <div className={style.today_list}>
        <div className={style.sub_inner}>
          <SubItemList data={!musicLoading && musicArray} theme={music} />
        </div>
      </div>
      <div className={style.today_list}>
        <div className={style.sub_inner}>
          <SubList data={!musicItemLoad && musicItem.music} theme={music} />
        </div>
      </div>
      <div className={style.sub_banner}>
        <img src="/img/perfume.svg" />
      </div>
      <div className={style.today_list}>
        <div className={style.sub_inner}>
          <SubItemList
            data={!perfumeLoading && perfumeArray}
            theme={perfumes}
          />
        </div>
      </div>
      <div className={style.today_list}>
        <div className={style.sub_inner}>
          <SubList
            data={!perfumeItemLoad && perfumeItem.perfume}
            theme={perfumes}
          />
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = async () => {
  const { loading: music_loading, data: music_data } = await client.query({
    query: GET_MUSIC_ARRAY,
  });

  const { loading: perfume_loading, data: perfume_data } = await client.query({
    query: GET_PERFUMES_ARRAY,
  });

  const { loading: music_loading_item, data: music_item } = await client.query({
    query: GET_MUSIC,
    variables: {
      id:
        !music_loading &&
        music_data.musicarray[
          Math.floor(Math.random() * music_data.musicarray.length)
        ].id,
    },
  });

  const {
    loading: perfume_loading_item,
    data: perfume_item,
  } = await client.query({
    query: GET_PERFUMES,
    variables: {
      id:
        !perfume_loading &&
        perfume_data.perfumesarray[
          Math.floor(Math.random() * perfume_data.perfumesarray.length)
        ].id,
    },
  });

  return {
    props: {
      musicArray: music_data?.musicarray,
      musicLoading: music_loading,
      perfumeArray: perfume_data?.perfumesarray,
      perfumeLoading: perfume_loading,
      musicItemLoad: music_loading_item,
      musicItem: music_item,
      perfumeItemLoad: perfume_loading_item,
      perfumeItem: perfume_item,
    },
  };
};
