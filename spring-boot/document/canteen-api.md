# Canteen API

## GET: canteen/infos

## GET canteen/info/{id}

## DELETE: canteen/{id}

## POST: canteen

```json
{
  "canteenName": "四餐厅",
  "intro": "我才是基础学院学生的唯二选择",
  "location": "杨浦区军工路516号上海理工大学内",
  "businessHour": "06:00 - 22:00",
  "announcement": "基础学院的荣耀就由我来守护"
}
```

## PUT: canteen/canteen-name

```json
{
  "id": 7,
  "canteenName": "上海理工大学肠胃科"
}
```

## PUT: canteen/intro

```json
{
  "canteenName": "四餐厅",
  "intro": "我才是基础学院学生的唯二选择"
}
```

## PUT: canteen/location

```json
{
  "canteenName": "上海理工大学肠胃科",
  "location": "上海理工大学"
}
```

## PUT: canteen/business-hours

```json
{
  "canteenName": "四餐厅",
  "businessHour": "06:00 - 22:00"
}
```

## PUT: canteen/announcement

```json
{
  "canteenName": "四餐厅",
  "announcement": "基础学院的荣耀就由我来守护"
}
```