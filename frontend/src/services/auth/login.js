import axios from "axios";
import { requestUrl } from "../../helpers/requestUrl";
import Cookies from 'universal-cookie';

export default async function loginUser(data) {
  let access_token = Cookies.get('access_token');
  // await requestHelper();
  try {
    // const res = await axios({
    //   method: "post",
    //   url: requestUrl + "",
    //   data: data,
    //   headers: authHeader(),
    // })
    // return res.data;
  } catch (error) {
    console.error(error.response.data);
  }
}
