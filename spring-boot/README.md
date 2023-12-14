# Canteen Management Spring Boot

## Requirements

JAVA 21

## API Examples

### GET: user/info

### GET: user/all-name

### POST: user/signin (no token)

```json
{
  "username": "user",
  "password": "password"
}
```

### POST: user/signup (no token)

```json
{
  "username": "user",
  "password": "password"
}
```

### PUT: user/password

```json
{
  "password": "123"
}
```

### PUT: user/type

```json
{
  "userType": "admin"
}
```

### PUT: user/level

```json
{
  "userLevel": "2"
}
```

### GET: canteen/all-name

### GET: canteen/info?canteenName=一餐厅

### POST: canteen/create

```json
{
  "canteenName": "四餐厅",
  "location": "杨浦区军工路516号上海理工大学内"
}
```

### PUT: canteen/canteen-name

```json
{
  "id": 7,
  "canteenName": "上海理工大学肠胃科"
}
```

### PUT: canteen/intro

```json
{
  "canteenName": "四餐厅",
  "intro": "我才是基础学院学生的唯二选择"
}
```

### PUT: canteen/location

```json
{
  "canteenName": "上海理工大学肠胃科",
  "location": "上海理工大学"
}
```

### PUT: canteen/business-hours

```json
{
  "canteenName": "四餐厅",
  "businessHours": "06:00 - 22:00"
}
```

### PUT: canteen/announcement

```json
{
  "canteenName": "四餐厅",
  "announcement": "基础学院的荣耀就由我来守护"
}
```

### DELETE: canteen/delete

```json
{
  "canteenName": "四餐厅"
}
```
