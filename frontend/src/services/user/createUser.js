import alertify from "alertifyjs";
import axios from "axios";
import { authHeader } from "../../helpers/auth-header";

export default async function createUser(data) {  
  try {
    const res = await axios({
      method: "post",
      url: `http://localhost:3020/user?redirectURL=${window.location.href}`,
      headers: authHeader(),
      data: data
    })
    alertify.success(res.data.message);
    return res.data;
  } catch (error) {
    alertify.error(error.response.data.message);
  }
}
