const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Veritabanı bağlantısı oluşturur
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

// users tablosundaki tüm kayıtları siler
exports.deleteAllUsers = async () => {
    try {
        await sequelize.query("DELETE FROM users");
        await setAutoIncrement();
    } catch (err) {
        console.log("users error ", err);
    }
};

// tokens tablosundaki tüm kayıtları siler
exports.deleteTokens = async () => {
    try {
        await sequelize.query("DELETE FROM tokens");
    } catch (err) {
        console.log("tokens error ", err);
    }
};
const setAutoIncrement = async () => {
    try {
        await sequelize.query("ALTER TABLE users AUTO_INCREMENT = 1");
    } catch (err) {
        console.log("tokens error ", err);
    }
};

// Stored Procedure aracılğıyla yeni kullanıcı oluşturur
exports.createUser = async (user) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.user_password, saltRounds);

        const response = await sequelize.query(
            "CALL createUser (:new_username, :new_user_name, :new_user_surname, :new_user_password, :new_user_email, :new_user_type)",
            {
                replacements: {
                    new_username: user.username,
                    new_user_name: user.user_name,
                    new_user_surname: user.user_surname,
                    new_user_password: hashedPassword,
                    new_user_email: user.user_email,
                    new_user_type: user.user_type,
                },
            }
        );
        console.log("here createUser response", JSON.stringify(response));
    } catch (err) {
        console.log("createuser " + err);
    }
};

// users tabanında kullanıcı mevcut değilse, varsayılan bir kullanici oluşturur
exports.createUserIfNotExist = async () => {
    var user = {
        username: "sample_user",
        user_name: "user_first_name",
        user_surname: "user_last_name",
        user_password: "sample_password",
        user_email: "sampleMail@gmail.com",
        user_type: "ADMIN",
    };
    try {
        var response = await sequelize.query("SELECT * FROM users");
        if (response[0].length == 0) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.user_password, saltRounds);
            const response = await sequelize.query(
                "CALL createUser (:new_username, :new_user_name, :new_user_surname, :new_user_password, :new_user_email, :new_user_type)",
                {
                    replacements: {
                        new_username: user.username,
                        new_user_name: user.user_name,
                        new_user_surname: user.user_surname,
                        new_user_password: hashedPassword,
                        new_user_email: user.user_email,
                        new_user_type: user.user_type,
                    },
                }
            );
            console.log("createUser response", JSON.stringify(response));
        }

    } catch (err) {
        console.log("createuser " + err);
    }
};
