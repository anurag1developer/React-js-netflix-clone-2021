import axios from "axios";

/** base url to make requests to the movie database */
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
// we name it default tha's whey when we import it we can name it whatever we want
// you can only have one default export
// 51:00 lecture netflx clone react clever programmer
