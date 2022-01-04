# User Manager Module

Bu uygulama, Patika'nın düzenlediği AloTech Fullstack Bootcamp'i bitirme projesinin bir parçasıdır.

#### Grup - 5
> Eren Tanrıverdioğlu - Furkan Aktaş - Parahat Nepesov - Timur Turbil

## Projenin Mimarisi
![project architecture](https://github.com/Alotech-Bootcamp-5-Grup/user-manager-module/blob/main/proje-diagram.png)

## Modülün İşlevi
User Manager Module, veritabanındaki `users` tablosu üzerinde CRUD işlemleri yapmılmasını sağlar. Her adımda, endpoint'lere gelen isteklerde gönderilen token'ı SSO Authorization Servisi'ne göndererek yetki ve doğruluk kontrolü yapar. CRUD işlemleri için önceden tanımlanmış olan Stored Procedure'lara istek gönderir.

## Teknoloji ve Kütüphaneler
Backend:
- Express
- Bcrypt
- Sequelize
- Joi

Frontend:
- React
- Axios
- universal-cookie

## Kurulum

- Projeyi klonlayın:
`git clone https://github.com/Alotech-Bootcamp-5-Grup/user-manager-module.git`

- Server klasörüne girin:
`cd user-manager-module/server`

- Gerekli kütüphaneleri kurun:
`npm install`

- .env dosyasını oluşturun:
windows: `rename  .env-sample  .env`
linux/unix: `mv .env-sample .env`

- .env dosyasındaki değişkenlere gerekli değerleri atayın
`PORT=`: Ugulamanızın çalışmasını istediğiniz portu belirtin.
`DB_HOST=`: MySQL veritabanınız için host bilgilerini belirtin. örn: localhost
`DB_USER=`: MySQL veritabanı kullanıcı adını belirtin.
`DB_PASS=`: MySQL veritabanı kullanıcı parolasını belirtin.
`DB_NAME=`: MySQL veritabanı adını belirtin.
`SSO_SERVER_URL=`: SSO Authorization Servisi'nin, token kontrolü için istek atacağı endpoint'i belirtin. örn: http://localhost:3010/token/

- Sunucuyu çalıştırın:
`npm start`

- Frontend klasörüne girin:
`cd ../frontend`

- Gerekli kütüphaneleri kurun:
`npm install`

- .env dosyasını oluşturun:
windows: `rename  .env-sample  .env`
linux/unix: `mv .env-sample .env`

- .env dosyasındaki değişkenlere gerekli değerleri atayın
`PORT=`: Ugulamanızın çalışmasını istediğiniz portu belirtin.
`REACT_APP_TOKEN_VERIFY_URL=`: SSO Authorization Servisi'nin, token kontrolü için istek atacağı endpoint'i belirtin. örn: http://localhost:3010/token/
`REACT_APP_USER_ROOT_URL=`: CRUD işlemlerinin gerçekleştirilmesi için istek atılacak olan endpoint'i belirtin. örn: http://localhost:3020/user/
`REACT_APP_SSO_CLIENT_URL=`: Token bulunmaması durumunda kullanıcıyı yönlendireceği SSO Client'ının adresini belirtin. örn: http://localhost:3011/

- Uygulamayı çalıştırın:
`npm start`

## Varsayılan Kullanıcı Bilgileri
- username: sample_user
- password: sample_password

## Veritabanı

User Manager Module'ün sunucusu çalıştırıldığında, veritabanında `users` ve `tokens` tablolarını ve CRUD işlemleri için gerekli Stored Procedure'ları oluşturur. Eğer tablolar daha önceden oluşturulmuşsa işlem yapmaz. Tablonun ve Stored Procedure'ların DDL'leri aşağıdaki gibidir:

```
CREATE TABLE `tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` json DEFAULT NULL,
  `token` text,
  `ttl` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `user_ip` varchar(60) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
```

```
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `user_name` varchar(25) NOT NULL,
  `user_surname` varchar(25) NOT NULL,
  `user_password` text NOT NULL,
  `user_email` varchar(80) NOT NULL,
  `user_type` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `user_email` (`user_email`)
);
```

createUser Procedure:
```
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `createUser`(new_username VARCHAR(20), new_user_name VARCHAR(25), new_user_surname VARCHAR(25), new_user_password TEXT, new_user_email VARCHAR(80), new_user_type ENUM('USER','ADMIN'))
BEGIN INSERT INTO users(username, user_name, user_surname, user_password, user_email, user_type) values(new_username, new_user_name, new_user_surname, new_user_password, new_user_email, new_user_type); END$$
DELIMITER ;
```

deleteUser Procedure:
```
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUser`(user_id INT)
BEGIN DELETE FROM users WHERE id=user_id; END$$
DELIMITER ;

```

getListOfUsers Procedure:
```
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getListOfUsers`()
BEGIN SELECT * FROM users; END$$
DELIMITER ;
```

getUserInfo Procedure:
```
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserInfo`(user_id INT)
BEGIN SELECT * FROM users WHERE id=user_id LIMIT 1; END$$
DELIMITER ;

```

updateUser Procedure:
```
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUser`(user_id INT, new_username VARCHAR(20), new_user_name VARCHAR(25), new_user_surname VARCHAR(25), new_user_password TEXT, new_user_email VARCHAR(80), new_user_type ENUM('USER','ADMIN'))
BEGIN UPDATE users SET username=new_username, user_name=new_user_name, user_surname=new_user_surname, user_password=new_user_password, user_email=new_user_email, user_type=new_user_type WHERE id=user_id; END$$
DELIMITER ;
```

## İstekler ve Yanıtlar

User Manager Module'ün backendinin 5 adet endpoint'i bulunur.

Kullanıcı listesini elde etmek için header kısmına `x-access-token` olarak token bilgisi eklenerek `/user` adresine get isteği gönderilir.
```
get /user
headers["x-access-token"]: string

response - 200
res.status(200).json({ "status": "success", userList })
{
    status: string,
    userList: list
    [
        {
            id: integer,
            username: string,
            user_name: string,
            user_surname: string,
            user_password: bcrypt_hash,
            user_email: string,
            user_type: string
        }
    ]
}

response - 400/500
{
    status: string,
    message: string
}
```

Yeni kullanıcı oluşturmak için header kısmına `x-access-token` olarak token bilgisi eklenerek kullanıcı bilgileri JSON formatında `/user` adresine post isteği olarak gönderilir.
```
post /user
headers["x-access-token"]: string
{
    username: string,
    user_name: string,
    user_surname: string,
    user_password: string,
    user_email: string,
    user_type: string
}

response - 200
{
    status: string,
    message: string
}

response - 400/500
{
    status: string,
    message: string
}
```

Bir kullanıcının bilgilerine erişmek için, header kısmına `x-access-token` olarak token bilgisi ve URL parametresi olarak user_id eklenerek `/user` adresine get isteği gönderilir.
```
get /user/:user_id
headers["x-access-token"]: string

response - 200
{
    status: string,
    user: object
    {
        username: string,
        user_name: string,
        user_surname: string,
        user_email: string,
        user_type: string
    }
}

response - 400/500
{
    status: string,
    message: string
}
```

Bir kullanıcının bilgilerini güncellemek için, header kısmına `x-access-token` olarak token bilgisi ve URL parametresi olarak user_id eklenerek kullanıcı bilgileri JSON formatında `/user` adresine put isteği olarak gönderilir.
```
put /user/:user_id
headers["x-access-token"]: string
{
    user_id: integer,
    username: string,
    user_name: string,
    user_surname: string,
    user_password: string,
    user_email: string,
    user_type: string
}

response - 200
{
    status: string,
    message: string
}

response - 400/500
{
    status: string,
    message: string
}
```

Bir kullanıcıyı silmek için, header kısmına `x-access-token` olarak token bilgisi ve URL parametresi olarak user_id eklenerek `/user` adresine delete isteği gönderilir.
```
delete /user/:user_id
headers["x-access-token"]: string

response - 200
{
    status: string,
    message: string
}

response - 400/500
{
    status: string,
    message: string
}
```

## Test

Servis ve uygulama klasörleri içerisinde:
`npm test`
