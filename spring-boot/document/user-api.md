# User API

## GET: user/info

## GET: user/all

## DELETE user/delete?username="consumer"

## POST: user/signin (no token)

```json
{
  "username": "user",
  "password": "password"
}
```

## POST: user/signup (no token)

```json
{
  "username": "user",
  "password": "password"
}
```

## PUT: user/password

```json
{
  "password": "123"
}
```

## PUT: user/type

```json
{
  "username": "consumer",
  "userType": "admin",
  "canteenId": "1"
}
```

## PUT: user/level

```json
{
  "userLevel": "2"
}
```
