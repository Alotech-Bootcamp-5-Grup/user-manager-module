import './App.css';
import HomePage from './Views/Home/home-page';
import isAccessTokenValid from './services/valid_access_token';
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie/es6";

function App() {
  const cookies = new Cookies();
  const [state, setState] = useState(false);

  useEffect(() => {
    const access_token = cookies.get("access_token");
    if (!access_token) {
      window.location.href = `${process.env.REACT_APP_SSO_CLIENT_URL}?redirectURL=${window.location.href}`;
    } else {
      isAccessTokenValid(access_token).then((response_data) => {
        if (response_data.response && response_data.user_type === "ADMIN") {
          setState(true);
        }
      })
    }
  }, []);

  return (
    <div className="App">
      {state ? <>
        <HomePage />
      </> : <>
      <p style={{backgroundColor: "grey", padding: "10px"}}>You do not have permission to access this page</p> 
        <div className="form-item form-btns " style={{ margin: "15px", justifyContent: "center" }}>
          <button className="form-btn form-btn-login login-btn btn-cursor" 
          style={{ width: "20%" }}
          onClick={
            () => {
              cookies.remove('access_token');
            }
          }>Remove AccessToken</button>
        </div>
      </>}
    </div>
  );
}

export default App;
