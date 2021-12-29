import alertify from "alertifyjs";
import axios from "axios";
import { authHeader } from "../../helpers/auth-header";

export default async function deleteUser(userId) {
  try {
    const res = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_USER_ROOT_URL}${userId}/?redirectURL=${window.location.href}`,
      headers: authHeader(),
    })
    alertify.success(res.data.message);
    return res.data;
  } catch (error) {
    alertify.error(error.data.message);
  }
}
