# Rest-server Invest Idea

## Важные нюансы

1.  В силу технических ограничений, воспользоваться присланным макетом не представлялось возможным, поэтому было согласовано использовать в качестве макета данную [страницу сайта](https://academybusiness.ru/recommendations/invest-ideas);
2.  Для того, чтобы протестировать функционал голосования из пункта 3 ТЗ. Необходим функционал аутентификации, авторизации и регистрации соотвественно. Так как вышеописанные функционалы, нужны только для реализации функионала голосования - они намеренно упрощены (отсутсвует валидация, хэширование паролей, refresh token), что заранее было обговорено.
3.  Логика графика доходности, отличается от того, что на сайте см. ниже;
4.  Проект можно протестировать, публичная база данных, с готовыми записями и данные для конфигурационного файла прилагаются см. ниже.

## Описание ендпоинтов

Все данные возвращаются в формате json.
Все POST запросы принимают данные в формате json.

### POST http://localhost:8080/api/users/register

Создает нового пользователя

Обязательные поля тела запроса:

- name
- email
- password

Значения для обязательных полей - строки.

Возвращает документ созданного пользователя.

### POST http://localhost:8080/api/auth/login

Аутентифицирует пользователя.

Обязательные поля тела запроса:

- email
- password

Значения для обязательных полей - строки.

Возвращает accessToken.

#### Тело ответа:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGE0ZmY1MjA1ZDkwOTUwODg0NWZmZTkiLCJpYXQiOjE2MjE1MTc5MDMsImV4cCI6MTYyMTU1MzkwM30.urloljul0o5MBtPqaOpIxveadE1YINzs5GZvGha0gK0"
}
```

### GET http://localhost:8080/api/invest-ideas

Возвращает массив

#### Тело ответа, если идеи не найдена

```json
{
  "message": "No ideas Found"
}
```

### GET http://localhost:8080/api/invest-ideas/:\_id

Позволяет получить конкретную идею по ее id.

#### Тело ответа:

```json
{
  "id": "60a4f7c9dea1a94a603e19bb",
  "company": "AstraZeneca",
  "status": "Закрыт",
  "openingPrice": 63,
  "closingPrice": 68,
  "currentPrice": 68.01,
  "priceType": "£",
  "investType": "Покупка",
  "openingDate": "2019-07-12T00:00:00.000Z",
  "closingDate": "2019-09-12T00:00:00.000Z",
  "description": "description",
  "reasonsToInvest": "Краткое обоснование ...",
  "companyLogo": "companyLogoURI",
  "companyBackground": "companyBackgroundURI",
  "predictedIncome": "7.94",
  "currentIncome": "7.95",
  "ideaRealization": "100.20"
}
```

#### Тело ответа, если идея не найдена

```json
{
  "message": "No idea Found"
}
```

### POST http://localhost:8080/api/invest-ideas/create

Создает идею

### GET http://localhost:8080/api/invest-ideas/getChart/:ideaId

Позволяет получить график доходности идеи.

#### query параметры

**sort**

Допустимые значения:

- hour
- day
- week
- month
- year

### GET http://localhost:8080/api/idea-rating/:ideaId

### POST http://localhost:8080/api/idea-rating/vote
