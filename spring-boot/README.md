# Canteen Management Spring Boot

## Requirements

JAVA 21

## API Examples

### GET: user/info

none

### GET: user/all-name

none

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

### POST: canteen/all-name
```json
{
  "username": "master"
}
```

### POST: canteen/info

```json
{
  "username": "master",
  "canteenName": "一餐厅"
}
```

### POST: canteen/create

```json
{
  "username": "master",
  "canteenName": "四餐厅",
  "location": "杨浦区军工路516号上海理工大学内"
}
```

### PUT: canteen/canteen-name

```json
{
  "username": "master",
  "id": 7,
  "canteenName": "上海理工大学肠胃科"
}
```

### PUT: canteen/intro

```json
{
  "username": "master",
  "canteenName": "四餐厅",
  "intro": "我才是基础学院学生的唯二选择"
}
```

### PUT: canteen/location

```json
{
  "username": "master",
  "canteenName": "上海理工大学肠胃科",
  "location": "上海理工大学"
}
```

### PUT: canteen/business-hours

```json
{
  "username": "master",
  "canteenName": "四餐厅",
  "businessHours": "06:00 - 22:00"
}
```

### PUT: canteen/announcement

```json
{
  "username": "master",
  "canteenName": "四餐厅",
  "announcement": "基础学院的荣耀就由我来守护"
}
```

### DELETE: canteen/delete

```json
{
  "username": "master",
  "canteenName": "四餐厅"
}
```
