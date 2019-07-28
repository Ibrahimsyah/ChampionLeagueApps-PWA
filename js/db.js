var dbPromised = idb.open("champion-league-apps", 1, function (upgradeDb) {
    var articleObjectStore = upgradeDb.createObjectStore("articles", {
        keyPath: "ID"
    })
    articleObjectStore.createIndex("post_title", "post_title", {
        unique: false
    })
})