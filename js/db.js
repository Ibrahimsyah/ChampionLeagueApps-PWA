var dbPromised = idb.open("champion-league-apps", 1, function (upgradeDb) {
    var articleObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "ID"
    })
    articleObjectStore.createIndex("post_title", "post_title", {
        unique: false
    })
})

function saveTeam(team){
    dbPromised
    .then(function(db){
        var tx = db.transaction("teams", "readwrite")
        var store = tx.objectStore("teams")
        console.log(team)
        store.add(article.result)
        return tx.complete
    })
    .then(function(){
        console.log("team berhasil tersimpan ke favorit")
    })
}

function getAll(){
    return new Promise(function(resolve, reject){
        dbPromised
        .then(function(db){
            var tx = db.transaction("teams", "readonly")
            var store = tx.objectStore("teams")
            return store.getAll()
        })
        .then(function(teams){
            resolve(teams)
        })
    })
}

function getById(id){
    return new Promise(function(resolve, reject){
        dbPromised
        .then(function(db){
            var tx = db.transaction("teams", "readonly")
            var store = tx.objectStore("teams")
            return store.get(id)
        })
        .then(function(team){
            resolve(team)
        })
    })
}