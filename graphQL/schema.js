import { gql } from "@apollo/client";

const GET_CODY_MAIN = gql`
  query CodyMain($season: String, $offset: Int, $limit: Int) {
    codymain(seoson: $season, offset: $offset, limit: $limit) {
      id
      user_id
      img_url
      category {
        mood
        season
        sex
        style
        theme
      }
    }
  }
`;

const GET_CODY_FILTER = gql`
  query CodyFilter(
    $mood: String
    $season: String
    $sex: String
    $style: String
    $theme: String
    $count: Int
  ) {
    codyfilter(
      mood: $mood
      season: $season
      sex: $sex
      style: $style
      theme: $theme
      count: $count
    ) {
      id
      user_id
      img_url
      category {
        mood
        season
        sex
        style
        theme
      }
    }
  }
`;

const GET_CODY_LIST = gql`
  query Codylist {
    codylist {
      id
      user_id
      img_url
      category {
        mood
        season
        sex
        style
        theme
      }
    }
  }
`;

const GET_CODY_ID = gql`
  query CODY_ID($id: ID!) {
    codyitem(id: $id) {
      id
      user_id
      img_url
      category {
        mood
        season
        sex
        style
        theme
      }
      information {
        name
        youtube
        instagram
        shop
      }
      products {
        id
        img_url
        name
        brand
        shop_url
        price
      }
      music {
        id
        artist
        album
        name
        mood
        img_url
      }
      perfumes {
        id
        img_url
        name
        brand
        price
      }
    }
  }
`;

const GET_USER_CODY_LIST = gql`
  query Usercodylist($user_id: String) {
    usercodylist(user_id: $user_id) {
      id
      img_url
      category {
        mood
        season
        sex
        style
        theme
      }
    }
  }
`;

const GET_SIMILAR_LIST = gql`
  query Usersimilarlist($style: String, $sex: String) {
    usersimilarlist(style: $style, sex: $sex) {
      id
      img_url
      category {
        mood
        season
        sex
        style
        theme
      }
    }
  }
`;

const GET_CODY_BOOKMARK = gql`
  query Codyarray($id: [String]) {
    codyarray(id: $id) {
      id
      img_url
      category {
        mood
        season
        sex
        style
        theme
      }
    }
  }
`;

const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      img_url
      price
      name
      img_copyright
      brand
      cody
      shop_url
      recommand_products {
        id
      }
    }
  }
`;

const GET_PRODUCT_ITEMS = gql`
  query Productarray($id: [String]) {
    productarray(id: $id) {
      id
      img_url
      name
      brand
      price
    }
  }
`;

const GET_PERFUMES = gql`
  query Perfume($id: ID!) {
    perfume(id: $id) {
      id
      img_url
      price
      name
      brand
      scent
      mood
      shop_url
      recommand_cody {
        id
      }
    }
  }
`;

const GET_PERFUMES_ARRAY = gql`
  query Perfumesarray {
    perfumesarray {
      id
      name
      mood
      brand
      img_url
      scent
      recommand_cody {
        id
      }
    }
  }
`;

const GET_MUSIC = gql`
  query Music($id: ID!) {
    music(id: $id) {
      id
      artist
      album
      name
      mood
      img_url
      music_url
      recommand_cody {
        id
      }
    }
  }
`;

const GET_MUSIC_ARRAY = gql`
  query Musicarray {
    musicarray {
      id
      name
      img_url
      mood
      artist
      recommand_cody {
        id
      }
    }
  }
`;

const GET_SEARCH_CODY = gql`
  query Codysearch($search: String) {
    codysearch(search: $search) {
      id
      img_url
      category {
        mood
        season
        sex
        style
        theme
      }
    }
  }
`;

const GET_SEARCH_PRODUCTS = gql`
  query Productsearch($search: String) {
    productsearch(search: $search) {
      id
      img_url
      name
      brand
      price
    }
  }
`;

const GET_SEARCH_MUSIC = gql`
  query Musicsearch($search: String) {
    musicsearch(search: $search) {
      id
      name
      img_url
      mood
      artist
    }
  }
`;

const GET_SEARCH_PERFUMES = gql`
  query Perfumesearch($search: String) {
    perfumesearch(search: $search) {
      id
      name
      mood
      brand
      img_url
      scent
    }
  }
`;

export {
  GET_CODY_MAIN,
  GET_CODY_LIST,
  GET_CODY_ID,
  GET_CODY_FILTER,
  GET_CODY_BOOKMARK,
  GET_USER_CODY_LIST,
  GET_PRODUCT,
  GET_PRODUCT_ITEMS,
  GET_PERFUMES,
  GET_PERFUMES_ARRAY,
  GET_SIMILAR_LIST,
  GET_MUSIC,
  GET_MUSIC_ARRAY,
  GET_SEARCH_CODY,
  GET_SEARCH_PRODUCTS,
  GET_SEARCH_MUSIC,
  GET_SEARCH_PERFUMES,
};
