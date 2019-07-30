var dbPromised = idb.open("champion-league-apps", 1, function (upgradeDb) {
    var articleObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    })
    articleObjectStore.createIndex("post_title", "post_title", {
        unique: false
    })
})

function saveTeam(team) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite")
            var store = tx.objectStore("teams")
            store.add(team)
            return tx.complete
        })
        .then(function () {
            M.toast({ html: 'Tim berhasil tersimpan ke favorit' })
        })
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly")
                var store = tx.objectStore("teams")
                return store.getAll()
            })
            .then(function (teams) {
                resolve(teams)
            })
    })
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly")
                var store = tx.objectStore("teams")
                return store.get(id)
            })
            .then(function (team) {
                resolve(team)
            })
    })
}

function deleteTeam(id) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite")
            var store = tx.objectStore("teams")
            store.delete(id)
            return tx.complete
        }).then(function () {
            M.toast({ html: 'Tim dihapus dari favorit' })
        })
}

function isFav(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly")
                var store = tx.objectStore("teams")
                return store.get(id)
            }).then(function (team) {
                if (team != undefined) resolve("true")
                else reject("false")
            })
    })
}