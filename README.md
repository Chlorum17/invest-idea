# Rest-server Invest Idea

## Важные нюансы

1.  В силу технических ограничений, воспользоваться присланным макетом не представлялось возможным, поэтому было согласовано использовать в качестве макета данную [страницу сайта](https://academybusiness.ru/recommendations/invest-ideas);
2.  Для того, чтобы протестировать функционал голосования из пункта 3 ТЗ. Необходим функционал аутентификации, авторизации и регистрации соотвественно. Так как вышеописанные функционалы, нужны только для реализации функионала голосования - они намеренно упрощены (отсутсвует валидация, хэширование паролей, refresh token), что заранее было обговорено.
3.  Логика графика доходности, отличается от того, что на сайте см. ниже;
4.  Проект можно протестировать, публичная база данных, с готовыми записями и данные для конфигурационного файла прилагаются см. ниже.

## Описание ендпоинтов

### POST http://localhost:8080/api/users/register

### Обязательные поля

name: String,
email: String,
password: String,

#### Возвращает

Cозданный документ пользователя в формате json.

### POST http://localhost:8080/api/auth/login

#### Обязательные поля

email: String,
password: String,

#### Возвращает

Формат json.
Пример:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGE0ZmY1MjA1ZDkwOTUwODg0NWZmZTkiLCJpYXQiOjE2MjE1MTc5MDMsImV4cCI6MTYyMTU1MzkwM30.urloljul0o5MBtPqaOpIxveadE1YINzs5GZvGha0gK0"
}
```

### GET http://localhost:8080/api/invest-idea

#### query

?filter=value
Список ключей см. в примере возвращаемого значения [ниже](#####Пример:)

?currentIncome<=5
?currentIncome>=5&currentIncome<=15
?currentIncome>=15&currentIncome<=30
?currentIncome>=30
?currentIncome>0

Следующие поля принимают только значение указанные ниже:

priceType: $, Р, £, ₣
investType: Покупка, Продажа
status: Открыт, Закрыт

##### ?limit ?skip

?limit=положительное число
?limit=4
Вернет максимум 4 документа.

?skip=положительное число
?skip=3
Пропустит первые 3 найденные документа.

?skip=4?limit=4
Пропустим первые 4 найденных документа, и вернет 4 документа идущие после них

##### ?sort

?sort=value - по возрастанию
?sort=-value - по убыванию

?sort=currentIncome
От меньшего currentIncome к большему.

?sort=-currentIncome
От большего currentIncome к меньшему.

?sort=openingDate
От старых идей к новым.

?sort=-openingDate
От новых идей к старым.

#### Возвращает

Массив из документов invest-idea в формате json. Пустой массив, если документы не найдены по заданным query.

##### Пример:

```json
[
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
    "predictedIncome": "10.00",
    "currentIncome": "3.63",
    "ideaRealization": "36.25"
  },
  {
    "id": "60a4f78edea1a94a603e19b4",
    "company": "Home Depot",
    "status": "Открыт",
    "openingPrice": 332,
    "closingPrice": 360,
    "currentPrice": 317.98,
    "priceType": "$",
    "investType": "Покупка",
    "openingDate": "2021-05-06T00:00:00.000Z",
    "closingDate": "2021-08-06T00:00:00.000Z",
    "description": "description",
    "companyLogo": "companyLogoURI",
    "predictedIncome": "8.43",
    "currentIncome": "-4.22",
    "ideaRealization": 0
  }
]
```
