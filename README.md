# Movies Explorer API

- Фронтенд: [https://vladmovies.nomoreparties.co](https://vladmovies.nomoreparties.co)
- Адрес сервера: [https://api.vladmovies.nomoredomains.xyz](https://api.vladmovies.nomoredomains.xyz)

## 🔀 Роуты

| Роут               | Тип        | Описание                                         |
| ------------------ | ---------- | ------------------------------------------------ |
| `/signup`          | **POST**   | Создание нового пользователя.                    |
| `/signin`          | **POST**   | Авторизация.                                     |
| `/users/me`        | **PATCH**  | Обновляет информацию о пользователе.             |
| `/movies`          | **GET**    | GET-запрос возвращает все фильмы из базы данных. |
|                    | **POST**   | POST-запрос создает новую запись фильма.         |
| `/movies/:movieId` | **DELETE** | Удаляет карточку по уникальному \_id.            |

## 🛠️ Технологии

- Framework: **Express.js**
- ODM: **Mongoose**
- Validation: **Celebrate**
- Logging: **Express-winston**

## 📁 Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и фильма  
`/models` — папка с файлами описания схем пользователя и фильма  
`/middlewares` — папка с мидлварами  
`/helpers` — вспомогательные функции, правила валидации  
`/errors` — папка с файлами ошибок

## ⬇️ Установка

Убедитесь, что установлен Node.js (v18.X)

`npm install` — установка пакетов

## 🚀 Запуск проекта

`npm run start` — запускает сервер  
`npm run dev` — запускает сервер с hot-reload
