## GET: dish/all
# RETURN:
    [
        {
            "id": 1,
            "canteen_id": 1,
            "dishName": "ÂéÀ±Ïã¹ø(ÌðÀ±)",
            "price": 200.0,
            "discount_rate": 1.0,
            "cuisine": "±¾°ï²Ë",
            "picture": null
        },
        {
            "id": 5,
            "canteen_id": 5,
            "dishName": "ÖØÀ±¿à¹ø",
            "price": 20.0,
            "discount_rate": 1.5,
            "cuisine": "Ò»Ê³ÌÃ²Ë",
            "picture": null
        }
    ]

## GET: dish/all-name
# RETURN:
    "ÂéÀ±Ïã¹ø(ÌðÀ±)",
    "ÖØÀ±¿à¹ø",
    "²»À±³ô¹ø",
    "Î¢À±Ëá¹ø",
    "ÖÐÀ±Ìð¹ø"

## GET: dish/info?dishName=ÂéÀ±Ïã¹ø(ÌðÀ±)
# RETURN:
    [
        {
            "id": 1,
            "canteen_id": 1,
            "dishName": "ÂéÀ±Ïã¹ø(ÌðÀ±)",
            "price": 200.0,
            "discount_rate": 1.0,
            "cuisine": "±¾°ï²Ë",
            "picture": null
        }
    ]

## GET: dish/info-id?id=1
# RETURN:
    {
        "id": 1,
        "canteen_id": 1,
        "dishName": "ÂéÀ±Ïã¹ø(ÌðÀ±)",
        "price": 200.0,
        "discount_rate": 1.0,
        "cuisine": "±¾°ï²Ë",
        "picture": null
    }