import axios from "axios";
import { authHeader } from "../../helpers/auth-header";

export default async function createUser(data) {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_USER_ROOT_URL}?redirectURL=${window.location.href}`,
      headers: authHeader(),
      data: data
    })
    return res.data;
  } catch (error) {
    console.error(error.response.data);
  }
}
