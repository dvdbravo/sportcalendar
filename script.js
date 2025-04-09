

async function loadEvents() {
  const res = await fetch("https://cyxhkictiiyuaenyfcfo.supabase.co", {
    headers: {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGhraWN0aWl5dWFlbnlmY2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxODMxOTIsImV4cCI6MjA1ODc1OTE5Mn0.hYLW52auUD5u3SbW5L8wKxR45hvYIAfwAzRbDl2TugA",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5eGhraWN0aWl5dWFlbnlmY2ZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzE4MzE5MiwiZXhwIjoyMDU4NzU5MTkyfQ.7OlnDg-Q4hB1hsa07DkE7eZhMy_Hd0E6Jgzd3fkIYao",
    },
  });
  const data = await res.json();
  console.log(data);

}
loadEvents();
const d = new Date();
let currYear, currMonth, currDay;
currYear = d.getFullYear();
currMonth = ("0" + (d.getMonth() + 1)).slice(-2);
currDay = ("0" + d.getDate()).slice(-2);
nameDay = d.getDay();
let titleMonth = document.querySelector("#titleMonth");
let titleYear = document.querySelector("#titleYear");
console.log(currDay, currMonth);

let monthName = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

titleMonth.innerHTML = monthName[parseInt(currMonth) - 1];
titleYear.innerHTML = currYear;


// Function to generate the calendar
function generateCalendar(year, month) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const daysInMonth = endDate.getDate();
  const startDay = startDate.getDay();
  let html = "";
  console.log("Start day: " + startDay + " startDate: " + startDate);

  let day = 1;
  for (let i = 0; i < 6; i++) {
    html += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        html += "<td></td>";
      } else if (day > daysInMonth) {
        break;
      } else {
        html += `<td class='day table-light' value='${day}' data-day='${day}'>${day}</td>`;
        day++;
      }
    }
    html += "</tr>";
  }

  $("#calendar-body").html(html);
}

// Generate calendar for current month - currentDate.getMonth()
const currentDate = new Date();
generateCalendar(currentDate.getFullYear(), currMonth - 1);

// Add click event listener to each day
$(".day").click(function () {
  $(".day").removeClass("day-active");
  const dayNumber = $(this).data("day");
  $(this).addClass("day-active");
  // Here you can perform any action you want with the clicked day numbers
  // Function Call
  fetchAndDisplayScores(currYear, currMonth, ("0" + dayNumber).slice(-2));
});
// Function to fetch scores from the API and display them in the list
function fetchAndDisplayScores(Year, Month, Day) {
  // Fetch data from different sports
  //LigaMX🇲🇽
  const mexSoccerPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/mex.1/scoreboard?dates=${Year}${Month}${Day}`
  );
  // Liga Exp🇲🇽
  const mexExpSoccerPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/mex.2/scoreboard?dates=${Year}${Month}${Day}`
  );
  //LaLiga🇪🇸
  const espSoccerPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard?dates=${Year}${Month}${Day}`
  );
  //Premier League🏴󠁧󠁢󠁥󠁮󠁧󠁿
  const engSoccerPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?dates=${Year}${Month}${Day}`
  );
  //Bundesliga 1🇩🇪
  const gerSoccerPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard?dates=${Year}${Month}${Day}`
  );
  //Serie A🇮🇹
  const itaSoccerPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard?dates=${Year}${Month}${Day}`
  );
  //Portugal League 🇵🇹
  const porSoccerPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/por.1/scoreboard?dates=${Year}${Month}${Day}`
  );
  //Eredivisie 🇳🇱
  const nedSoccerPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/ned.1/scoreboard?dates=${Year}${Month}${Day}`
  );
  //Ligue 1 🇫🇷
  const fraSoccerPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/fra.1/scoreboard?dates=${Year}${Month}${Day}`
  );
  //UEFA Champions League
  const uefaChampionsSoccerPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/UEFA.CHAMPIONS/scoreboard?dates=${Year}${Month}${Day}`
  );
  //UEFA Europa League
  const uefaEuropaSoccerPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/UEFA.EUROPA/scoreboard?dates=${Year}${Month}${Day}`
  );
  //NFL
  const footballPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=${Year}${Month}${Day}`
  );
  //NBA
  const basketPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${Year}${Month}${Day}`
  );
  //NHL
  const hockeyPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard?dates=${Year}${Month}${Day}`
  );
  //MLB
  const baseballPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=${Year}${Month}${Day}`
  );
  // Copa America🇲🇽
  const copaAmericaPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/CONMEBOL.AMERICA/scoreboard?dates=${Year}${Month}${Day}`
  );
  // Euro Copa🇲🇽
  const euroCopaPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/UEFA.EURO/scoreboard?dates=${Year}${Month}${Day}`
  );
  // Tennis ATP
  const tennisAtpPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/tennis/atp/scoreboard?dates=${Year}${Month}${Day}`
  );
  // Tennis WTA
  const tennisWtaPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/tennis/wta/scoreboard?dates=${Year}${Month}${Day}`
  );
  // MLS
  const mlsPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/scoreboard?dates=${Year}${Month}${Day}`
  );
  // F1
  const funoPromise = fetch(
    `https://site.api.espn.com/apis/site/v2/sports/racing/f1/scoreboard?dates=${Year}${Month}${Day}`
  );

  // Wait for both promises to resolve
  Promise.all([
    mexSoccerPromise,
    mexExpSoccerPromise,
    espSoccerPromise,
    engSoccerPromise,
    gerSoccerPromise,
    itaSoccerPromise,
    porSoccerPromise,
    nedSoccerPromise,
    fraSoccerPromise,
    uefaChampionsSoccerPromise,
    uefaEuropaSoccerPromise,
    footballPromise,
    basketPromise,
    hockeyPromise,
    baseballPromise,
    copaAmericaPromise,
    euroCopaPromise,
    tennisAtpPromise,
    tennisWtaPromise,
    mlsPromise,
    funoPromise,
  ])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((data) => {
      const sportsScoresList = document.getElementById("sportsScores");

      // Clear
      sportsScoresList.innerHTML = "";

      // F1
      data[20].events.forEach((event) => {
        const listItem = createListItemFuno(event, "🏎️ 🏁");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // Copa America
      data[16].events.forEach((event) => {
        const listItem = createListItem(event, "Euro Copa ⚽️🏆");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // Copa America
      data[15].events.forEach((event) => {
        const listItem = createListItem(event, "Copa America⚽️🏆");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // LigaMX
      data[0].events.forEach((event) => {
        const listItem = createListItem(event, "⚽️ 🇲🇽");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // LigaMX
      data[1].events.forEach((event) => {
        const listItem = createListItem(event, "⚽️ 🇲🇽");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // La Liga
      data[2].events.forEach((event) => {
        const listItem = createListItem(event, "⚽️ 🇪🇸");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
        console.log(data[2].events.length);
      });
      // Premier League
      data[3].events.forEach((event) => {
        const listItem = createListItem(event, "⚽️ 🏴󠁧󠁢󠁥󠁮󠁧󠁿");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // MLS
      data[19].events.forEach((event) => {
        const listItem = createListItem(event, "⚽️ 🇺🇸");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // Bundesliga 1🇩🇪
      data[4].events.forEach((event) => {
        const listItem = createListItem(event, "⚽️ 🇩🇪");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // Serie A🇮🇹
      data[5].events.forEach((event) => {
        const listItem = createListItem(event, "⚽️ 🇮🇹");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // Portugal 🇵🇹
      data[6].events.forEach((event) => {
        const listItem = createListItem(event, "⚽️ 🇵🇹");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // Eredivisie 🇳🇱
      data[7].events.forEach((event) => {
        const listItem = createListItem(event, "⚽️ 🇳🇱");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      //Ligue 1 🇫🇷
      data[8].events.forEach((event) => {
        const listItem = createListItem(event, "⚽️ 🇫🇷");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // UEFA Champions League 🏆
      data[9].events.forEach((event) => {
        const listItem = createListItem(event, "⚽️ 🏆");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // UEFA Europa League 🥈
      data[10].events.forEach((event) => {
        const listItem = createListItem(event, "⚽️ 🥈");
        listItem.classList.add("bg-soccer");
        sportsScoresList.appendChild(listItem);
      });
      // NFL
      data[11].events.forEach((event) => {
        const listItem = createListItem(event, "🏈");
        listItem.classList.add("bg-baseball");
        sportsScoresList.appendChild(listItem);
      });
      // NBA
      data[12].events.forEach((event) => {
        const listItem = createListItem(event, "🏀");
        listItem.classList.add("bg-baseball");
        sportsScoresList.appendChild(listItem);
      });
      // Basket
      data[13].events.forEach((event) => {
        const listItem = createListItem(event, "🏒");
        listItem.classList.add("bg-basketball");
        sportsScoresList.appendChild(listItem);
      });
      // MLB
      data[14].events.forEach((event) => {
        const listItem = createListItem(event, "⚾️");
        sportsScoresList.appendChild(listItem);
      });
      // Tennis ATP
      data[17].events.forEach((event) => {
        const listItem = createListItemTennisNew(event, "🎾");
        sportsScoresList.appendChild(listItem);
      });
      // Tennis WTA
      data[18].events.forEach((event) => {
        const listItem = createListItemTennisNew(event, "🎾 WTA - ");
        sportsScoresList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// List items
function createListItem(event, emoji) {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item";
  const date = new Date(event.date);
  const formattedTime = date.toLocaleString("en-UK", { timeStyle: "short" });
  const formattedDate = date.toLocaleString("en-UK", { dateStyle: "long" });
  listItem.innerHTML = `
    <h5>${emoji} ${event.competitions[0].competitors[0].team.displayName} vs ${event.competitions[0].competitors[1].team.displayName}</h5>
      <p><strong>${formattedTime}</strong> | ${formattedDate}</p>
    `;
  return listItem;
}
// List items
function createListItemTennisNew(event, emoji) {
  const listItem = document.createElement("div");
  let eventNum = event.groupings[0].competitions.length;
  const fecha = new Date(event.date);
  for (let i = 0; i < eventNum; i++) {
    const date = new Date(event.groupings[0].competitions[i].date);
    let formattedTime = date.toLocaleString("es-MX", { timeStyle: "short" });
    let formattedDate = date.toLocaleString("es-MX", { dateStyle: "long" });
    let DayNew = date.getDate();
    if (DayNew === parseInt(currDay)) {
      console.log(formattedDate);
      listItem.innerHTML += `<li class="list-group-item">
      <h5>${emoji} ${event.name} - ${event.groupings[0].competitions[i].competitors[0].athlete.displayName} vs ${event.groupings[0].competitions[i].competitors[1].athlete.displayName}</h5>
    <strong>${formattedTime}</strong> | ${formattedDate}</li>`;
    }
  }
  return listItem;
}
// List items
function createListItemFuno(event, emoji) {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item";
  const date = new Date(event.date);
  const formattedTime = date.toLocaleString("es-MX", { timeStyle: "short" });
  const formattedDate = date.toLocaleString("es-MX", { dateStyle: "long" });
  listItem.innerHTML = `
      <h5>${emoji} ${event.shortName} </h5>
      <p><strong>${formattedTime}</strong> | ${formattedDate}</p>
    `;
  return listItem;
}

function sportVal() {
  let buttonValue = target.value;
  console.log(buttonValue);
}

// Function Call
fetchAndDisplayScores(currYear, currMonth, currDay);
