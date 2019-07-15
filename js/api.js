const teamlist_api = "https://api.football-data.org/v2/competitions/2001/teams"
const schedule_api = "https://api.football-data.org/v2/competitions/2001/matches"
const api_key = "07e2f287bafe413b815b0c33c87f66fa"

function status(response){
    if(response.status !== 200){
        console.log("Error ", response.status)
        return Promise.reject(new Error(response.statusText))
    }else{
        return Promise.resolve(response)
    }
}

//JSON to Array Parser
function json(response){
    return response.json()
}

//Exception Handler
function error(err){ //from Promise Reject
    console.log("Error: ",  err)
}

//Request Data
function getTeamList(){
    fetch(teamlist_api, {
        headers : {
            'X-Auth-Token' : api_key
        }
    })
    .then(status)
    .then(json)
    .then(function(data){
        var articleHTML = ""
        data.teams.forEach(function(team){
            console.log("Team: ", team)

            articleHTML += `
            <div class="card" style="width=300px">
            <div class="card-image waves-effect waves-block waves-light">
            <img src="${team.crestUrl}">
            </div>
            <div class="card-content center">
            ${team.name}
            </div>
            </div>
            `
            document.getElementById("teamlist").innerHTML = articleHTML
        })
    })
}