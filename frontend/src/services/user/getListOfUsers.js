import alertify from "alertifyjs";
import axios from "axios";
import { authHeader } from "../../helpers/auth-header";

export default async function getListOfUsers() {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_USER_ROOT_URL}?redirectURL=${window.location.href}`,
      headers: authHeader(),
    })
    return res.data;
  } catch (error) {
    alertify.error(error.data.message);
  }
}
