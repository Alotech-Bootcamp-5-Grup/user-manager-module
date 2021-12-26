import axios from "axios";
import { authHeader } from "../../helpers/auth-header";
import { requestUrl } from "../../helpers/requestUrl";

export default async function getListOfUsers() {
  // let access_token = JSON.parse(localStorage.getItem('access_token'));
  // await requestHelper();
  try {
    const res = await axios({
      method: "get",
      url: requestUrl + "user" + "?redirectURL=http://localhost:3021",
      headers: authHeader(),
    })
    return res.data;
  } catch (error) {
    console.error(error.response.data);
  }
}