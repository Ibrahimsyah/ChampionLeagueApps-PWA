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