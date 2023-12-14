# User API

## GET: user/info

## GET: user/all-name

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
  "userType": "admin"
}
```

## PUT: user/level

```json
{
  "userLevel": "2"
}
```
