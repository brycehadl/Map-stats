
const url = 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeams';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f1567d740cmsh049a54add34c8d4p1d4845jsnbe2204b9d28f',
        'X-RapidAPI-Host': 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
      }
    };

    document.addEventListener("DOMContentLoaded", function () {
      const submitButton = document.getElementById("submit");

      submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        
        const teamAbbreviation = document.getElementById("team-name").value.trim();
        
        if (teamAbbreviation === '') {
          console.log("Please enter a team abbreviation.");
          return;
        }

        fetch(url, options)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            const teams = data?.body ?? [];

            if (teams.length === 0) {
              console.log(`No information found for team "${teamAbbreviation}".`);
            } else {
              const teamListDiv = document.getElementById("teamList");
              teamListDiv.innerHTML = "";

              const selectedTeam = teams.find(team => team.teamAbv === teamAbbreviation.toUpperCase());

              if (!selectedTeam) {
                console.log(`No information found for team "${teamAbbreviation}".`);
                return;
              }

              const teamCity = selectedTeam?.teamCity ?? "N/A";
              const runsScored = selectedTeam?.RS ?? "N/A";
              const teamLosses = selectedTeam?.loss ?? "N/A";
              const teamName = selectedTeam?.teamName ?? "N/A";
              const teamLeague = selectedTeam?.teamLeague ?? "N/A";
              const teamLogo = selectedTeam?.logo ?? "N/A";

              console.log(`Team Abbreviation: ${teamAbbreviation}`);
              console.log(`City: ${teamCity}`);
              console.log(`League: ${teamLeague}`);
              console.log(`Runs Scored: ${runsScored}`);
              console.log(`Losses: ${teamLosses}`);
              console.log(`Team Name: ${teamName}`);
              console.log("------");

              // Displayed team info
              const teamInfoHTML = `
                <h2>${teamName}</h2>
                <p>Team Abbreviation: ${teamAbbreviation}</p>
                <p>City: ${teamCity}</p>
                <p>League: ${teamLeague}</p>
                <p>Runs Scored: ${runsScored}</p>
                <p>Losses: ${teamLosses}</p>
              `;
              teamListDiv.innerHTML = teamInfoHTML;
            }
          })
          .catch(function (error) {
            console.error("Error fetching data:", error);
          });
      });
    });
  

fetch("https://api.the-odds-api.com/v4/sports/?apiKey=d272dd2fc8c59ce6fb029378e95778ad").then
(function(response){
    return response.json()
})
    .then(function(data){
        console.log(data)
    }) 


