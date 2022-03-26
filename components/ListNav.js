import React, { useEffect, useState } from "react";
import style from "../styles/ListNav.module.css";

const ListNav = ({ season, weather, theme, sex, styles }) => {
  const [data, getData] = useState([]);
  // const [active, setActive] = useState([]);

  useEffect(() => {
    const fil = [season, weather, theme, sex, styles];
    if (fil) {
      getData([...fil]);
      getData((prevState) => prevState.filter((item) => item != ""));
    }
  }, [season, weather, theme, sex, styles]);

  const deleteFilter = (list) => {
    getData((prevState) => prevState.filter((item) => item != list));
    // switch (true) {
    //   case list == season:
    //     setActive((prevState) => [...prevState, list]);
    //     break;
    //   case list == weather:
    //     setActive((prevState) => [...prevState, list]);
    //     break;
    //   case list == theme:
    //     setActive((prevState) => [...prevState, list]);
    //     break;
    //   case list == sex:
    //     setActive((prevState) => [...prevState, list]);
    //     break;
    //   case list == styles:
    //     setActive((prevState) => [...prevState, list]);
    //     break;
    //   default:
    // }
  };

  return (
    <div className={style.container}>
      <div className={style.nav}>
        <div>filter</div>
        {data.map((list, i) => (
          <div key={i} onClick={() => deleteFilter(list)} className={style.li}>
            {list ? list : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListNav;
