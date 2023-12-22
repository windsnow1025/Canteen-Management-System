# COMMENT API

## GET: comment/infos/{postId}

### RETURN:
    [
        {
            "id": 1,
            "userId": 3,
            "postId": 1,
            "content": "hhhh"
        },
        {
            "id": 2,
            "userId": 3,
            "postId": 1,
            "content": "hhhh"
        },
        {
            "id": 3,
            "userId": 3,
            "postId": 1,
            "content": "hhhh"
        }
    ]

## POST:  comment

```json
    {
        "postId": "1",
        "content": "hhhh"
    }
```

### RETURN:
    {
        "status": "Success",
        "message": "Add successful"
    }

## DELETE: comment/{id}

### RETURN:
    {
        "status": "Success",
        "message": "Delete successful"
    }