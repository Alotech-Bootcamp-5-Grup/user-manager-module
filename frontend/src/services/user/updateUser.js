import axios from "axios";
import { authHeader } from "../../helpers/auth-header";
import alertify from "alertifyjs";
export default async function updateUser(user) {
    try {
        const res = await axios({
            method: "put",
            url: `${process.env.REACT_APP_USER_ROOT_URL}${user['user_id']}?redirectURL=${window.location.href}`,
            headers: authHeader(),
            data: user,
        })
        alertify.success(res.data.message);
        return res.data;
    } catch (error) {
        alertify.error(error.response.data.message);
    }
}