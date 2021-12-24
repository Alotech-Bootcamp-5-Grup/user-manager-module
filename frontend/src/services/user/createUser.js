import axios from "axios";
import { authHeader } from "../../helpers/auth-header";
import { requestUrl } from "../../helpers/requestUrl";

export default async function createUser(data) {
  // let access_token = JSON.parse(localStorage.getItem('access_token'));
  // await requestHelper();
  try {
    const res = await axios({
      method: "post",
      url: requestUrl + "user",
      headers: authHeader(),
      data: data
    })
    return res.data;
  } catch (error) {
    console.error(error.response.data);
  }
}