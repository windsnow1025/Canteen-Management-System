# vote API

## GET: vote/infos

### RETURN:
    [
        {
            "id": 1,
            "canteenId": 1,
            "title": "最难吃的菜",
            "voteResult": null
        },
        {
            "id": 2,
            "canteenId": 2,
            "title": "最难吃的菜",
            "voteResult": null
        },
        {
            "id": 3,
            "canteenId": 2,
            "title": "最好吃的菜",
            "voteResult": null
        }
    ]

## GET: vote/infos/{canteenId}

### RETURN:
    [
        {
            "id": 2,
            "canteenId": 2,
            "title": "最难吃的菜",
            "voteResult": null
        },
        {
            "id": 3,
            "canteenId": 2,
            "title": "最好吃的菜",
            "voteResult": null
        }
    ]

## GET: vote/info/{id}

### RETURN:
    {   
        "id": 1,
        "canteenId": 1,
        "title": "最难吃的菜",
        "voteResult": null
    }

## POST: vote

```json
    {
      "canteenId": "2",
      "title": "最好吃的菜"
    }
```

### RETURN: 
    {
        "message": "Add successful",
        "status": "Success"
    }

## PUT: vote/vote-result

```json
  {
      "id": "1",
      "voteResult": "一餐厅"
  }
```

### RETURN:
    
    {
        "message": "Update successful",
        "status": "Success"
    }

## DELETE: vote/{id}

### RETURN:
    {
        "message": "Delete successful",
        "status": "Success"
    }