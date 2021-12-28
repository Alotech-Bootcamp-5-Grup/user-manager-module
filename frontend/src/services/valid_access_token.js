import axios from "axios";
import Cookies from "universal-cookie";

export default async function isAccessTokenValid(data) {
  const cookies = new Cookies();
  const response = await axios.get(`${process.env.REACT_APP_TOKEN_VERIFY_URL}?redirectURL=${window.location.href}`, {
    headers: { "x-access-token": data }
  })
  .then((rsp) => {
    if (rsp.data.Access_Token) {
      cookies.set("access_token", rsp.data.Access_Token);
    }
    return rsp.data;
  }).catch((err) => {
    return err.response.data
  })
  return response;
}
