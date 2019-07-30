var webPush = require('web-push')

var PushSubscription = {
    "endpoint" : "https://android.googleapis.com/gcm/send/doBCWg55fis:APA91bEBZi5VN99SfRJp4bA5iYvL-076lJ60wTP7sZxHaTl5RjvWass_O4pYRvXpv5NhmMn6kLNzG2jc0LwedIZB1_YD5zajn1Etic-8l5FEwcvsn7fWERARIP-XImFyvuslGHuTL_7C",
    "keys": {
        "p256dh" : "BIslWtbhL2MgxWdm83JyhAVBdnQng8QnBSEbgOYCRvqfqA7mo3itd2DlyBYoU7jGldpssokBAGS0YqHdy1etvUM=",
        "auth" : "xaCQeLtg4J4rML26ghqqXA=="
    }
}

var payload = "ini adalah payload!"

var options = {
    gcmAPIKey : 'AAAAhT9qlRU:APA91bFTYhYgw9WJOGekLmBRtQadfWX7Cjr-VrHI7IYW_aje6tuIB6JOjYXjCps98z7HJmBYK8HqEdESA5fZctD3cXacSCO8QMRpQUStu2p4FMM7zWli-8vgWvkCcXzxiecMXsmjFL3O',
    TTL: 60
}

webPush.sendNotification(
    PushSubscription,
    payload,
    options
)