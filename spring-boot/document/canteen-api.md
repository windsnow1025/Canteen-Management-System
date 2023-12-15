# Canteen API

## GET: canteen/all-name

## GET: canteen/info?canteenName=一餐厅

## GET canteen/info-id?canteenId=1

## POST: canteen/create

```json
{
  "canteenName": "四餐厅",
  "location": "杨浦区军工路516号上海理工大学内"
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
  "businessHours": "06:00 - 22:00"
}
```

## PUT: canteen/announcement

```json
{
  "canteenName": "四餐厅",
  "announcement": "基础学院的荣耀就由我来守护"
}
```

## DELETE: canteen/delete

```
canteen/delete?canteenName="迷你餐厅"
```