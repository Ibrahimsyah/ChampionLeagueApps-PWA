const teamlist_api = "https://api.football-data.org/v2/competitions/2001/teams"
const schedule_api = "https://api.football-data.org/v2/competitions/2001/matches"
const api_key = "07e2f287bafe413b815b0c33c87f66fa"

function status(response) {
  if (response.status !== 200) {
    console.log("Error ", response.status)
    return Promise.reject(new Error(response.statusText))
  } else {
    return Promise.resolve(response)
  }
}

//JSON to Array Parser
function json(response) {
  return response.json()
}

//Exception Handler
function error(err) { //from Promise Reject
  console.log("Error: ", err)
}

//Request Data
function getTeamList() {
  fetch(teamlist_api, {
    headers: {
      'X-Auth-Token': api_key
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      var teamItem = ""
      data.teams.forEach(function (team) {

        teamItem += `
            <div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s4">
              <img src="${team.crestUrl}" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
            </div>
            <div class="col s8">
              <span class="black-text">
                ${team.name}
              </span>
            </div>
          </div>
        </div>
      </div>
            `
        document.getElementById("teamlist").innerHTML = teamItem
      })
    })
}
function getSchedule() {
  if ('caches' in window) {
    caches.match(schedule_api).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var scheduleItem = ""
          data.matches.forEach(function (match) {
            scheduleItem += `
            <div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row center"><b>${match.homeTeam.name} VS ${match.awayTeam.name}</b></div>
          <div class="row center">${match.utcDate.split("T")[0]} ${match.utcDate.split("T")[1].slice(0, 8)}</div>
          <div class="row valign-wrapper">
            <div class="col s4">
              <p class="center">${match.homeTeam.name}</p>
            </div>
            <div class="col s1">
              <p class="center">${match.score.fullTime.homeTeam || 0}
            </div>
            <div class="col s2">
              <p class="center"><b>:</b>
            </div>
            <div class="col s1">
              <p class="center">${match.score.fullTime.awayTeam || 0}
            </div>
            <div class="col s4">
            <p class="center">${match.awayTeam.name}</p>
          </div>
          </div>
        </div>
      </div>
            `
            document.getElementById("schedulelist").innerHTML = scheduleItem
          })
        })
      }
    })
  }
  fetch(schedule_api, {
    headers: {
      'X-Auth-Token': api_key
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      var scheduleItem = ""
      console.log(data.matches)
      data.matches.forEach(function (match) {
        scheduleItem += `
            <div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row center"><b>${match.homeTeam.name} VS ${match.awayTeam.name}</b></div>
          <div class="row center">${match.utcDate.split("T")[0]} ${match.utcDate.split("T")[1].slice(0, 8)}</div>
          <div class="row valign-wrapper">
            <div class="col s4">
              <p class="center">${match.homeTeam.name}</p>
            </div>
            <div class="col s1">
              <p class="center">${match.score.fullTime.homeTeam || 0}
            </div>
            <div class="col s2">
              <p class="center"><b>:</b>
            </div>
            <div class="col s1">
              <p class="center">${match.score.fullTime.awayTeam || 0}
            </div>
            <div class="col s4">
            <p class="center">${match.awayTeam.name}</p>
          </div>
          </div>
        </div>
      </div>
            `
        document.getElementById("schedulelist").innerHTML = scheduleItem
      })
    })
}