
import React from 'react';

export default function CustomModel() {
    return (
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
                        //   value={updateUserInfo.username}
                        name="username"
                        type="text"
                        placeholder="Username"
                        //   onChange={(e) => updateUserInfoSetState(e)}
                        required
                    />
                </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
                <div className="form-item-input">
                    <i className="fas fa-envelope"></i>
                    <input
                        //   value={updateUserInfo.user_name}
                        name="user_name"
                        type="text"
                        placeholder="First Name"
                        //   onChange={(e) => updateUserInfoSetState(e)}
                        required
                    />
                </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
                <div className="form-item-input">
                    <i className="fas fa-envelope"></i>
                    <input
                        //   value={updateUserInfo.user_surname}
                        name="user_surname"
                        type="text"
                        placeholder="Last Name"
                        //   onChange={(e) => updateUserInfoSetState(e)}
                        required
                    />
                </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
                <div className="form-item-input">
                    <i className="fas fa-envelope"></i>
                    <input
                        //   value={updateUserInfo.user_email}
                        name="email"
                        type="email"
                        placeholder="E-Mail..."
                        /*  onChange={(e) => updateUserInfoSetState(e)} */
                        required
                    />
                </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
                <div className="form-item-input">
                    <i className="fas fa-envelope"></i>
                    <input
                        /* value={updateUserInfo.user_password} */
                        name="password"
                        type="password"
                        placeholder="Password"
                        /* onChange={(e) => updateUserInfoSetState(e)} */
                        required
                    />
                </div>
            </div>
            <div className="form-item" style={{ margin: "15px" }}>
                <div className="form-item-input"><select /* onChange={(e) => setUserType(e.target.value)} */ id="cars" style={{ padding: "10px", width: "100%" }}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                </div>
            </div>
            <div className="form-item form-btns " style={{ margin: "15px" }}>
                <button
                    className="form-btn form-btn-login login-btn btn-cursor"
                /* onClick={() => createUserFunction()} */
                >
                    CREATE USER
                </button>
            </div>
            <div className="form-item form-btns " style={{ margin: "15px" }}>
                <button
                    className="form-btn form-btn-login login-btn btn-cursor"
                /* onClick={close3} */
                >
                    Kapat
                </button>
            </div>
        </div>
    );
}