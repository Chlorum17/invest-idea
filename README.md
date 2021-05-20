# Rest-server Invest Idea

## Важные нюансы

1.  В силу технических ограничений, воспользоваться присланным макетом не представлялось возможным, поэтому было согласовано использовать в качестве макета данную [страницу сайта](https://academybusiness.ru/recommendations/invest-ideas);
2.  Для того, чтобы протестировать функционал голосования из пункта 3 ТЗ. Необходим функционал аутентификации, авторизации и регистрации соотвественно. Так как вышеописанные функционалы, нужны только для реализации функионала голосования - они намеренно упрощены (отсутсвует валидация, хэширование паролей, refresh token), что заранее было обговорено.
3.  Логика графика доходности, отличается от того, что на сайте [см. ниже](#GET-http://localhost:8080/api/invest-ideas/getChart/:ideaId);
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

### GET http://localhost:8080/api/invest-ideas/:ideaId

Позволяет получить конкретную идею по ее id. Тело ответа содержит на 2 поля больше, чем [GET http://localhost:8080/api/invest-ideas](#GET-http://localhost:8080/api/invest-ideas)

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

Создает идею, предполагается что **companyLogo** и **companyBackground** это ссылки на изображения, и получены отдельным запросом. В данном тестовом задании, эти поля не являются обязательными.
Все остальные поля - являются обязательными.

#### Допустимые значения полей

**status**:

- 'Открыт'
- 'Закрыт'

**priceType**:

- '$'
- 'Р'
- '£'
- '₣'

**investType**:

- 'Продажа'
- 'Покупка'

#### Допустимые типы данных полей

- **openingPrice**, **closingPrice**, **currentPrice** - числа;
- **openingDate**, **closingDate** - даты;
- Все остальные поля - строки.

#### Тело запроса

```json
{
  "company": "Tesla",
  "status": "Открыт",
  "openingPrice": 600,
  "closingPrice": 540,
  "currentPrice": 578.25,
  "priceType": "$",
  "investType": "Продажа",
  "openingDate": "2021-05-13",
  "closingDate": "2021-08-13",
  "description": "description",
  "reasonsToInvest": "Краткое обоснование ...",
  "companyLogo": "companyLogoURI",
  "companyBackground": "companyBackgroundURI"
}
```

#### Тело ответа

```json
{
  "id": "60a4f437e87fbb47482f28eb",
  "company": "Tesla",
  "status": "Открыт",
  "openingPrice": 600,
  "closingPrice": 540,
  "currentPrice": 578.25,
  "priceType": "$",
  "investType": "Продажа",
  "openingDate": "2021-05-13T00:00:00.000Z",
  "closingDate": "2021-08-13T00:00:00.000Z",
  "description": "description",
  "companyLogo": "companyLogoURI",
  "companyBackground": "companyBackgroundURI",
  "predictedIncome": "10.00",
  "currentIncome": "3.63",
  "ideaRealization": "36.25"
}
```

### GET http://localhost:8080/api/invest-ideas/getChart/:ideaId

Позволяет получить массив записей средних значений дохода, записи представлены в виде объектов, где поля:

- **averageValue** - среднее значение дохода;
- **date** - дата фиксации среднего значения дохода

Если за указанный период записей нет - вернет последнюю запись.
Если записей вообще нет - вернет пустой массив.

#### query параметры

**period**, допустимые значения:

- hour (последний час);
- day (последний день (24 часа), текущий час не учитывается);
- week (последняя неделя (7 дней), текущий день не учитывается);
- month (последний месяц (30 дней), текущая неделя не учитывается)
- year (последний год (365 дней), текущий месяц не учитывается)

#### Тело ответа

```json
[
  {
    "averageValue": 7.5,
    "date": "2021-04-27T07:23:41.560Z"
  }
]
```

### POST http://localhost:8080/api/idea-rating/vote

- Позволяет, только аутентифицированным пользователям, проголосовать за идею.
- Пользователь может голосовать только 1 раз, пользователь не может изменить свой голос.
- Возвращает обновленный рейтинг.
- Повторный запрос от пользователя, который уже проголосовал - не внесет никаких изменений и вернет текущий рейтинг.

#### Допустимые значения полей тела запроса

**rating**:

- 'Верю'
- 'Не верю'

**ideaId** - id идеи

#### Тело запроса

```json
{
  "rating": "Верю",
  "ideaId": "60a4f78edea1a94a603e19b4"
}
```

### Тело ответа

```json
{
  "likes": 1,
  "dislikes": 0
}
```

### GET http://localhost:8080/api/idea-rating/:ideaId

Позволяет получить рейтинг конкретной идеи. Где **likes** - "Верю", **dislikes** - "Не верю".

#### Тело ответа

```json
{
  "likes": 2,
  "dislikes": 1
}
```

#### Тело ответа, если рейтинга нет

```json
{
  "likes": 0,
  "dislikes": 0
}
```
