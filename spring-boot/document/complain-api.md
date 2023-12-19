# complaint API

## GET: complaint/infos

### RETURN:
    [
        {
            "id": 1,
            "canteenId": 2,
            "detail": "nice",
            "complaintResult": "ok"
        }
    ]

## GET: complaint/infos/{id}

### RETURN:
    {
    "id": 1,
    "canteenId": 2,
    "detail": "nice",
    "complaintResult": "ok"
    }

## GET: complaint/infos/{canteenId}

### RETURN:
    [
        {
            "id": 1,
            "canteenId": 2,
            "detail": "nice",
            "complaintResult": "ok"
        }
    ]


## POST: complaint

```json
    {
        "canteenId": "2",
        "detail": "nice !!!"
    }
```

### RETURN:
    {
        "message": "Add successful",
        "status": "Success"
    }


## PUT: complaint/result

```json
    {
      "id": "2",
      "complaintResult": "ok"
    }
```

### RETURN:
    {
        "message": "Update successful",
        "status": "Success"
    }

## DELETE: complaint/{id}

### RETURN:
    {
        "message": "Delete successful",
        "status": "Success"
    }