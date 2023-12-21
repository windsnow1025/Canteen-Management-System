# User API

## GET: user/info

## GET: user/info/{id}

### RETURN: 
    master

## GET: user/infos

## DELETE: user/{id}

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
