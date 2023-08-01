let url = 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeams';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f1567d740cmsh049a54add34c8d4p1d4845jsnbe2204b9d28f',
        'X-RapidAPI-Host': 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
      }
    };

    document.addEventListener("DOMContentLoaded", function () {
      const submitButton = document.getElementById("submit");
      const teamListDiv = document.getElementById("teamList");
      const teamInfoDiv = document.getElementById("stats");
      const clearButton = document.getElementById("clr-btn");


      function clearLocalStorageData() {
        localStorage.removeItem('teamList');
        localStorage.removeItem('teamInfo');
        teamListDiv.innerHTML = '';
        teamInfoDiv.innerHTML = '';
      }


      function displayTeamInfo(teamAbbreviation, teamInfoHTML) {
        teamInfoDiv.innerHTML = teamInfoHTML;
      }

      clearButton.addEventListener("click", function () {
        clearLocalStorageData();
      });

      submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        const teamAbbreviation = document.getElementById("team-name").value.trim();

        if (teamAbbreviation === '') {
          console.log("Please enter a team abbreviation.");
          return;
        }

        
        fetch(mlbUrl, mlbOptions)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            const teams = data?.body ?? [];

            if (teams.length === 0) {
              console.log(`No information found for team "${teamAbbreviation}".`);
            } else {
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
              teamInfoDiv.innerHTML = teamInfoHTML;


              const teamListItem = document.createElement('p');
              teamListItem.innerText = teamAbbreviation;
              teamListDiv.appendChild(teamListItem);
              localStorage.setItem('teamList', teamListDiv.innerHTML);


              teamListItem.addEventListener('click', function () {
  
                displayTeamInfo(teamAbbreviation, teamInfoHTML);
              });
            }
          })
          .catch(function (error) {
            console.error("Error fetching data:", error);
          });
      });


      const teamListFromLocalStorage = localStorage.getItem('teamList');
      if (teamListFromLocalStorage) {
        teamListDiv.innerHTML = teamListFromLocalStorage;
      }


      const teamInfoFromLocalStorage = localStorage.getItem('teamInfo');
      if (teamInfoFromLocalStorage) {
        teamInfoDiv.innerHTML = teamInfoFromLocalStorage;
      }
    });







fetch("https://api.the-odds-api.com/v4/sports/?apiKey=  ").then
(function(response){
    return response.json()
})
    .then(function(data){
        console.log(data)
    }) 
// Hardcoded API Key
const apiKey = "7f64ed751f35c455e1329823fdd99709";

// Function to display data in the HTML container
function displayData(data) {
  const dataContainer = document.getElementById('data-display');

  if (data) {
      let html = '';

      // Modify the data display based on your requirements
      html += '<h2>Sports List</h2>';
      html += '<ul>';

      data.forEach(sport => {
          html += `<li><strong>${sport.title}</strong> (${sport.key})</li>`;
          html += `<ul>`;
          html += `<li>Description: ${sport.description}</li>`;
          html += `<li>Group: ${sport.group}</li>`;
          html += `<li>Active: ${sport.active ? 'Yes' : 'No'}</li>`;
          
          html += `</ul>`;
      });

      html += '</ul>';

      dataContainer.innerHTML = html;
  } else {
      dataContainer.innerHTML = '<p>No data available.</p>';
  }
}



function getSports() {
  const userSport = prompt("Enter the sport title:");

  fetch(`https://api.the-odds-api.com/v4/sports?apiKey=${apiKey}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const filteredSports = data.filter(sport => sport.group.toUpperCase() === userSport.toUpperCase());
          displayData(filteredSports);
          console.log(filteredSports);
      })
      .catch(error => {
          console.error("Error fetching data:", error);
          displayData(null); // Display message for exception
      });
}


// Event Handler function for "Print odds" option

// Function to display data in the HTML container
function displayDataInContainer(data) {
  const dataContainer = document.getElementById('data-display');

  if (Array.isArray(data) && data.length > 0) {
    let html = '';

    // Modify the data display based on your requirements
    html += '<h2>Odds Data</h2>';
    html += '<ul>';

    // Assuming data is an array of odds information
    data.forEach(item => {
      html += '<li>';
      html += `<p>Team: ${item.home_team} vs. ${item.away_team}</p>`;

      // Assuming each item has an array of bookmakers with h2h markets
      if (Array.isArray(item.bookmakers) && item.bookmakers.length > 0) {
        item.bookmakers.forEach(bookmaker => {
          if (bookmaker.markets && bookmaker.markets.length > 0) {
            const h2hMarket = bookmaker.markets.find(market => market.key === 'h2h');
            if (h2hMarket) {
              html += `<p>${bookmaker.title} Odds: ${h2hMarket.outcomes.map(outcome => `${outcome.name}: ${outcome.price}`).join(', ')}</p>`;
            }
          }
        });
      } else {
        html += '<p>No odds data available for this event.</p>';
      }

      html += '</li>';
    });

    html += '</ul>';

    dataContainer.innerHTML = html;
  } else {
    dataContainer.innerHTML = '<p>No odds data available.</p>';
  }
}





function getOdds() {
  const sportsKey = prompt("Enter the sports key:");
  const region = prompt("Enter the region (choices = uk, us, us2, eu, au):");
  const market = prompt("Enter the market (choices = h2h, spreads, totals, outrights):");
 
  fetch(`https://api.the-odds-api.com/v4/sports/${sportsKey}/odds?apiKey=${apiKey}&regions=${region}&markets=${market}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          displayDataInContainer(data);
      })
      .catch(error => {
          console.error("Error fetching data:", error);
          displayDataInContainer(null); // Display message for exception
      });
}


function getOddsHistory() {
  const sportsKey = prompt("Enter the sports key:");
  const region = prompt("Enter the region (choices = uk, us, us2, eu, au):");
  const market = prompt("Enter the market (choices = h2h, spreads, totals, outrights):");
  const dateInput = prompt("Enter Date");

  fetch(`https://api.the-odds-api.com/v4/sports/${sportsKey}/odds-history/?apiKey=${apiKey}&regions=${region}&markets=${market}&date=${dateInput}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayOddsDataInContainer(data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      displayOddsDataInContainer(null); // Display message for exception
    });
}

function displayOddsDataInContainer(data) {
  const dataContainer = document.getElementById('data-display');
  dataContainer.innerHTML = ''; // Clear previous data

  if (data && data.data && data.data.length > 0) {
    // Display each bookmaker's odds data
    data.data.forEach(event => {
      const eventId = event.id;
      const homeTeam = event.home_team;
      const awayTeam = event.away_team;
      const bookmakers = event.bookmakers;

      const eventInfo = document.createElement('p');
      eventInfo.textContent = `${homeTeam} vs. ${awayTeam}`;
      dataContainer.appendChild(eventInfo);

      bookmakers.forEach(bookmaker => {
        const bookmakerName = bookmaker.title;
        const markets = bookmaker.markets;

        const bookmakerInfo = document.createElement('p');
        bookmakerInfo.textContent = `Bookmaker: ${bookmakerName}`;
        dataContainer.appendChild(bookmakerInfo);

        markets.forEach(market => {
          const marketKey = market.key;
          const outcomes = market.outcomes;

          const marketInfo = document.createElement('p');
          marketInfo.textContent = `Market: ${marketKey}`;
          dataContainer.appendChild(marketInfo);

          outcomes.forEach(outcome => {
            const outcomeName = outcome.name;
            const outcomePrice = outcome.price;

            const outcomeInfo = document.createElement('p');
            outcomeInfo.textContent = `${outcomeName} - Price: ${outcomePrice}`;
            dataContainer.appendChild(outcomeInfo);
          });
        });
      });
    });
  } else {
    // Display message if no data is available
    dataContainer.textContent = "No odds data available for the specified parameters.";
  }
}



// Exit function
function exit() {
    alert("Thanks for using our service!");
}

  

