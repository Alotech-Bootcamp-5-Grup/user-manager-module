import axios from "axios";
import Cookies from "universal-cookie";

export default async function isAccessTokenValid(data) {
    const cookies = new Cookies();
    var response = await axios.get(`http://localhost:3010/token/?redirectURL=http://localhost:3021`, {
        headers: { "x-access-token": data }
    }).then((rsp) => {
        if (rsp.data.user_type === "USER" || rsp.data.user_type === "ADMIN") {
            if (rsp.data.Access_Token) {
                cookies.set("access_token", rsp.data.Access_Token);
            }
            return rsp.data;
        }
        return "you dont have permission to acces this page";


    }).catch((err) => {
        return err.response.data
    })
    return response;
}