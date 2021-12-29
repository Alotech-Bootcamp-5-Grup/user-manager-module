import { useModal } from "react-hooks-use-modal";
import getListOfUsers from "../../services/user/getListOfUsers";
import { AiOutlineUser } from "react-icons/ai";
import deleteUser from "../../services/user/deleteUser";
import createUser from "../../services/user/createUser";
import updateUser from "../../services/user/updateUser";
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie/es6";
import "../../assets/styles/Login-Register.css";

export default function HomePage() {
  const cookies = new Cookies();
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("USER");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [updateUserInfo, setUpdateUserInfo] = useState({});
  const [updateUserId, setUpdateUserId] = useState(0);
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [Modal2, open2, close2, isOpen2] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [Modal3, open3, close3, isOpen3] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  useEffect(() => {
    getAndSetUser();
  }, []);

  function getAndSetUser() {
    getListOfUsers().then((response_users) => {
      setUsers(response_users.userList);
    });
  }
  const createUserFunction = () => {
    setUserType("USER");
    var data = {
      "username": username,
      "user_name": firstName,
      "user_surname": lastName,
      "user_password": password,
      "user_email": email,
      "user_type": userType,
    };
    createUser(data).then(() => {
      getAndSetUser();
    });
  };

  const removeItemFromAnArray = (arr, item) => {
    let changedArray = arr;
    for (var i = 0; i < arr.length; i++) {

      if (arr[i] === item) {
        arr.splice(i, 1);
        i--;
      }
    }
    setSelectedUserIds(changedArray);
  }

  const addSelectedUsers = (user) => {
    setUpdateUserId(user.id);
    setUpdateUserInfo(user);
    if (selectedUserIds.includes(user.id)) {
      removeItemFromAnArray(selectedUserIds, user.id);
    } else {
      var arr = selectedUserIds;
      arr.push(user.id);
      setSelectedUserIds(arr);
    }
  }
  const deleteUserFunction = () => {
    for (var i = 0; i < selectedUserIds.length; i++) {
      deleteUser(selectedUserIds[i]).then(() => {
        getAndSetUser();
      });
    }
  };

  const setUserNameFuntion = (e) => {
    setUsername(e.target.value);
  };

  const setFirstNameFuntion = (e) => {
    setFirstName(e.target.value);
  };

  const setLastNameFunction = (e) => {
    setLastName(e.target.value);
  };

  const setEmailFunction = (e) => {
    setEmail(e.target.value);
  };

  const setPasswordFunction = (e) => {
    setPassword(e.target.value);
  };




  const updateUserInfoSetState = (e) => {
    var userInfo = updateUserInfo;
    userInfo[`${e.target.name}`] = e.target.value;
    setUpdateUserInfo(userInfo);
  }

  const updateUserFunction = () => {
    var userInfo = updateUserInfo;
    userInfo["user_type"] = userType;
    userInfo["user_id"] = updateUserId;
    delete userInfo['id'];
    updateUser(userInfo).then(() => {
      getAndSetUser();
    });;
  }

  return (
    <main style={{ padding: "1rem 0" }}>
      <div>
        <div className="form-item form-btns " style={{ margin: "15px", justifyContent: "center" }}>
          <button className="form-btn form-btn-login login-btn btn-cursor" style={{ width: "20%" }} onClick={open}>Create User</button>
        </div>
        <div className="form-item form-btns " style={{ margin: "15px", justifyContent: "center" }}>
          <button
            className="form-btn form-btn-login login-btn btn-cursor"
            style={{ width: "20%" }}
            onClick={
              () => {
                setSelectedUserIds([])
                open2()
              }
            }>User Table</button>
        </div>
        <div className="form-item form-btns " style={{ margin: "15px", justifyContent: "center" }}>
          <button
            className="form-btn form-btn-login login-btn btn-cursor"
            style={{ width: "20%" }}
            onClick={
              () => {
                cookies.remove('access_token');
              }
            }>Remove Accesstoken</button>
        </div>
        <Modal>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              width: "300px",
              borderRadius: "10px",
            }}
          >
            <div className="form-item" style={{ margin: "15px" }}>
              <div className="form-item-input">
                <i className="fas fa-envelope"></i>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUserNameFuntion(e)}
                  required
                />
              </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
              <div className="form-item-input">
                <i className="fas fa-envelope"></i>
                <input
                  name="user_name"
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setFirstNameFuntion(e)}
                  required
                />
              </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
              <div className="form-item-input">
                <i className="fas fa-envelope"></i>
                <input
                  name="user_surname"
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => setLastNameFunction(e)}
                  required
                />
              </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
              <div className="form-item-input">
                <i className="fas fa-envelope"></i>
                <input
                  name="email"
                  type="email"
                  placeholder="E-Mail..."
                  onChange={(e) => setEmailFunction(e)}
                  required
                />
              </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
              <div className="form-item-input">
                <i className="fas fa-envelope"></i>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPasswordFunction(e)}
                  required
                />
              </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
              <div className="form-item-input"><select onChange={(e) => setUserType(e.target.value)} id="cars" style={{ padding: "10px", width: "100%" }}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              </div>
            </div>
            <div className="form-item form-btns " style={{ margin: "15px" }}>
              <button
                className="form-btn form-btn-login login-btn btn-cursor"
                style={{ width: "100%" }}
                onClick={() => {
                  createUserFunction()
                }}
              >
                CREATE USER
              </button>
            </div>
            <div className="form-item form-btns " style={{ margin: "15px" }}>
              <button
                className="form-btn form-btn-login login-btn btn-cursor"
                style={{ width: "100%" }}
                onClick={close}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
        <Modal2>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              width: "600px",
              borderRadius: "10px",
            }}
          >
            {users.length > 0
              ? users.map((user, index) => {
                if (user.id != cookies.get('user_id')) {
                  return (
                    <div style={{ borderStyle: "groove" }} key={index}>
                      <AiOutlineUser />
                      {' '}
                      {user.user_name}
                      {' '}
                      {user.user_surname}
                      <div style={{ display: "inline", float: "right" }}>
                        <input
                          type="checkbox"
                          onChange={(event) => addSelectedUsers(user)}
                        /></div>
                    </div>
                  );
                }

              })
              : "boşş"}
            <div className="form-item form-btns " style={{ marginTop: "50px" }}>
              <button
                className="form-btn form-btn-login login-btn btn-cursor"

                onClick={close2}
                style={{ padding: "6px", width: "20%" }}
              >
                Close
              </button>
              <div style={{ display: 'inline-block', float: "right" }}>
                <button
                  className="form-btn form-btn-login login-btn btn-cursor"
                  onClick={() => {
                    close2();
                    open3()
                  }}
                  style={{ padding: "6px", width: "50%" }}
                >
                  Update
                </button>
                <button
                  className="form-btn form-btn-login login-btn btn-cursor"
                  onClick={() => deleteUserFunction()}
                  style={{ padding: "6px", width: "50%" }}
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        </Modal2>
        <Modal3>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              width: "300px",
              borderRadius: "10px",
            }}
          >
            <div className="form-item" style={{ margin: "15px" }}>
              <div className="form-item-input">
                <i className="fas fa-envelope"></i>
                <input
                  // value={updateUserInfo.username}
                  name="username"
                  type="text"
                  placeholder={updateUserInfo.username}
                  onChange={(e) => updateUserInfoSetState(e)}
                  required
                />
              </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
              <div className="form-item-input">
                <i className="fas fa-envelope"></i>
                <input
                  // value={updateUserInfo.user_name}
                  name="user_name"
                  type="text"
                  placeholder={updateUserInfo.user_name}
                  onChange={(e) => updateUserInfoSetState(e)}
                  required
                />
              </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
              <div className="form-item-input">
                <i className="fas fa-envelope"></i>
                <input
                  // value={updateUserInfo.user_surname}
                  name="user_surname"
                  type="text"
                  placeholder={updateUserInfo.user_surname}
                  onChange={(e) => updateUserInfoSetState(e)}
                  required
                />
              </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
              <div className="form-item-input">
                <i className="fas fa-envelope"></i>
                <input
                  // value={updateUserInfo.user_email}
                  name="user_email"
                  type="email"
                  placeholder={updateUserInfo.user_email}
                  onChange={(e) => updateUserInfoSetState(e)}
                  required
                />
              </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
              <div className="form-item-input">
                <i className="fas fa-envelope"></i>
                <input
                  // value={updateUserInfo.user_password}
                  name="user_password"
                  type="password"
                  placeholder="*********"
                  onChange={(e) => updateUserInfoSetState(e)}
                  required
                />
              </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
              <div className="form-item-input"><select onChange={(e) => setUserType(e.target.value)} id="cars" style={{ padding: "10px", width: "100%" }}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              </div>
            </div>
            <div className="form-item form-btns " style={{ margin: "15px" }}>
              <button
                className="form-btn form-btn-login login-btn btn-cursor"
                style={{ width: "100%" }}
                onClick={() => {
                  updateUserFunction()
                }}
              >
                UPDATE USER
              </button>
            </div>
            <div className="form-item form-btns " style={{ margin: "15px" }}>
              <button
                className="form-btn form-btn-login login-btn btn-cursor"
                style={{ width: "100%" }}
                onClick={close3}
              >
                Close
              </button>
            </div>
          </div>
        </Modal3>
      </div>
    </main>
  );
}