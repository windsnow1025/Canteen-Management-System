## GET: dish/all
# RETURN:
    [
        {
            "id": 1,
            "canteen_id": 1,
            "dishName": "�������(����)",
            "price": 200.0,
            "discount_rate": 1.0,
            "cuisine": "�����",
            "picture": null
        },
        {
            "id": 5,
            "canteen_id": 5,
            "dishName": "�������",
            "price": 20.0,
            "discount_rate": 1.5,
            "cuisine": "һʳ�ò�",
            "picture": null
        }
    ]

## GET: dish/all-name
# RETURN:
    "�������(����)",
    "�������",
    "��������",
    "΢�����",
    "�������"

## GET: dish/info?dishName=�������(����)
# RETURN:
    [
        {
            "id": 1,
            "canteen_id": 1,
            "dishName": "�������(����)",
            "price": 200.0,
            "discount_rate": 1.0,
            "cuisine": "�����",
            "picture": null
        }
    ]

## GET: dish/info-id?id=1
# RETURN:
    {
        "id": 1,
        "canteen_id": 1,
        "dishName": "�������(����)",
        "price": 200.0,
        "discount_rate": 1.0,
        "cuisine": "�����",
        "picture": null
    }