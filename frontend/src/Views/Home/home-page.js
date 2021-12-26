import { useModal } from "react-hooks-use-modal";
import getListOfUsers from "../../services/user/getListOfUsers";
import { AiOutlineUser } from "react-icons/ai";
import deleteUser from "../../services/user/deleteUser";
import createUser from "../../services/user/createUser";
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie/es6";

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
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [Modal2, open2, close2, isOpen2] = useModal("root", {
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

  const addSelectedUsers = (userId) => {
    if (selectedUserIds.includes(userId)) {
      removeItemFromAnArray(selectedUserIds, userId);
      console.log(selectedUserIds)
    } else {
      var arr = selectedUserIds;
      arr.push(userId);
      setSelectedUserIds(arr);
      console.log(selectedUserIds)
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
  return (
    <main style={{ padding: "1rem 0" }}>
      <div>
        <button onClick={open}>Create User</button>
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
                onClick={() => createUserFunction()}
              >
                CREATE USER
              </button>
            </div>
            <div className="form-item form-btns " style={{ margin: "15px" }}>
              <button
                className="form-btn form-btn-login login-btn btn-cursor"
                onClick={close}
              >
                Kapat
              </button>
            </div>
          </div>
        </Modal>
        <button onClick={
          () => {
            setSelectedUserIds([])
            open2()
          }
        }>User List</button>
        <Modal2>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              width: "300px",
              borderRadius: "10px",
            }}
          >
            {users.length > 0
              ? users.map((user, index) => {
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
                        onChange={(event) => addSelectedUsers(user.id)}
                      /></div>
                  </div>
                );
              })
              : "boşş"}
            <div className="form-item form-btns " style={{ margin: "15px" }}>
              <button
                className="form-btn form-btn-login login-btn btn-cursor"
                onClick={() => deleteUserFunction()}
              >
                Delete selected user
              </button>{" "}
            </div>
            <div className="form-item form-btns " style={{ margin: "15px" }}>
              <button
                className="form-btn form-btn-login login-btn btn-cursor"
                onClick={close2}
              >
                Close
              </button>{" "}
            </div>
          </div>
        </Modal2>
        <button onClick={
          () => {
            cookies.remove('access_token');
          }
        }>set accesstoken null</button>
      </div>
    </main>
  );
}