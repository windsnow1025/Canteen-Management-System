# Canteen Management Spring Boot

## Requirements

JAVA 21

## API Examples

### user/info

none

### user/all-name

none

### user/signup

```json
{
  "username": "user",
  "password": "password",
  "userType": "consumer",
  "userLevel": "ordinary",
  "canteenId": 0
}
```

### user/signin

```json
{
  "username": "user"
}
```

### canteen/all-name
```json
{
  "username": "master"
}
```

### canteen/info

```json
{
  "username": "master",
  "canteenName": "一餐厅"
}
```

### canteen/create

```json
{
  "username": "master",
  "canteenName": "四餐厅",
  "location": "杨浦区军工路516号上海理工大学内"
}
```

### canteen/canteen-name

```json
{
  "username": "master",
  "id": 7,
  "canteenName": "上海理工大学肠胃科"
}
```

### canteen/intro

```json
{
  "username": "master",
  "canteenName": "四餐厅",
  "intro": "我才是基础学院学生的唯二选择"
}
```

### canteen/location

```json
{
  "username": "master",
  "canteenName": "上海理工大学肠胃科",
  "location": "上海理工大学"
}
```

### canteen/business-hours

```json
{
  "username": "master",
  "canteenName": "四餐厅",
  "businessHours": "06:00 - 22:00"
}
```

### canteen/announcement

```json
{
  "username": "master",
  "canteenName": "四餐厅",
  "announcement": "基础学院的荣耀就由我来守护"
}
```

### canteen/delete

```json
{
  "username": "master",
  "canteenName": "四餐厅"
}
```
