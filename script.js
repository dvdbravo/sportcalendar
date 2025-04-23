// DOM Elements
const prevMonth = document.querySelector("#prevMonth");
const nextMonth = document.querySelector("#nextMonth");
const titleMonth = document.querySelector("#titleMonth");
const titleYear = document.querySelector("#titleYear");
const sportsScoresList = document.getElementById("sportsScores");

// Date and Calendar Variables
let monthOffset = 0;
const currentDate = new Date();
let currYear, currMonth, currDay;

const monthNames = [
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

// Sports API Configuration
const sportsConfig = [
  { url: "soccer/mex.1", emoji: "⚽️ 🇲🇽", name: "Liga MX", class: "bg-soccer" },
  {
    url: "soccer/mex.2",
    emoji: "⚽️ 🇲🇽",
    name: "Liga Exp",
    class: "bg-soccer",
  },
  { url: "soccer/esp.1", emoji: "⚽️ 🇪🇸", name: "La Liga", class: "bg-soccer" },
  {
    url: "soccer/eng.1",
    emoji: "⚽️ 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    name: "Premier League",
    class: "bg-soccer",
  },
  {
    url: "soccer/ger.1",
    emoji: "⚽️ 🇩🇪",
    name: "Bundesliga",
    class: "bg-soccer",
  },
  { url: "soccer/ita.1", emoji: "⚽️ 🇮🇹", name: "Serie A", class: "bg-soccer" },
  {
    url: "soccer/por.1",
    emoji: "⚽️ 🇵🇹",
    name: "Portugal League",
    class: "bg-soccer",
  },
  {
    url: "soccer/ned.1",
    emoji: "⚽️ 🇳🇱",
    name: "Eredivisie",
    class: "bg-soccer",
  },
  { url: "soccer/fra.1", emoji: "⚽️ 🇫🇷", name: "Ligue 1", class: "bg-soccer" },
  {
    url: "soccer/UEFA.CHAMPIONS",
    emoji: "⚽️ 🏆",
    name: "UEFA Champions",
    class: "bg-soccer",
  },
  {
    url: "soccer/UEFA.EUROPA",
    emoji: "⚽️ 🥈",
    name: "UEFA Europa",
    class: "bg-soccer",
  },
  { url: "football/nfl", emoji: "🏈", name: "NFL", class: "bg-football" },
  { url: "basketball/nba", emoji: "🏀", name: "NBA", class: "bg-basketball" },
  { url: "hockey/nhl", emoji: "🏒", name: "NHL", class: "bg-hockey" },
  { url: "baseball/mlb", emoji: "⚾️", name: "MLB", class: "bg-baseball" },
  {
    url: "soccer/CONMEBOL.AMERICA",
    emoji: "Copa America ⚽️🏆",
    name: "Copa America",
    class: "bg-soccer",
  },
  {
    url: "soccer/UEFA.EURO",
    emoji: "Euro Copa ⚽️🏆",
    name: "Euro Copa",
    class: "bg-soccer",
  },
  { url: "tennis/atp", emoji: "🎾", name: "Tennis ATP", class: "bg-tennis" },
  {
    url: "tennis/wta",
    emoji: "🎾 WTA",
    name: "Tennis WTA",
    class: "bg-tennis",
  },
  { url: "soccer/usa.1", emoji: "⚽️ 🇺🇸", name: "MLS", class: "bg-soccer" },
  { url: "racing/f1", emoji: "🏎️ 🏁", name: "F1", class: "bg-racing" },
];

const sportFiltersConfig = [
  { id: "all", name: "Todos", emoji: "🏆", class: "bg-light" },
  { id: "soccer", name: "Fútbol", emoji: "⚽️", class: "bg-soccer" },
  { id: "football", name: "NFL", emoji: "🏈", class: "bg-football" },
  { id: "basketball", name: "NBA", emoji: "🏀", class: "bg-basketball" },
  { id: "baseball", name: "MLB", emoji: "⚾️", class: "bg-baseball" },
  { id: "hockey", name: "NHL", emoji: "🏒", class: "bg-hockey" },
  { id: "tennis", name: "Tenis", emoji: "🎾", class: "bg-tennis" },
  { id: "racing", name: "F1", emoji: "🏎️", class: "bg-racing" },
];

// Initialize the calendar
function initCalendar() {
  updateCalendarDate();
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  createSportFilters(); // Add this line
  fetchAndDisplayScores(
    currentDate.getFullYear(),
    formatTwoDigits(currentDate.getMonth() + 1),
    formatTwoDigits(currentDate.getDate())
  );
}

// Add these new functions
function createSportFilters() {
  const filtersContainer = document.getElementById('sportFilters');
  filtersContainer.innerHTML = '';
  
  sportFiltersConfig.forEach(filter => {
    const button = document.createElement('button');
    button.className = `btn btn-sm ${filter.class} sport-filter`;
    button.dataset.sport = filter.id;
    button.innerHTML = `${filter.emoji} ${filter.name}`;
    
    if (filter.id === 'all') {
      button.classList.add('active');
    }
    
    button.addEventListener('click', handleSportFilterClick);
    filtersContainer.appendChild(button);
  });
}

function handleSportFilterClick(event) {
  const sport = event.currentTarget.dataset.sport;
  
  // Update active button
  document.querySelectorAll('.sport-filter').forEach(btn => {
    btn.classList.remove('active');
  });
  event.currentTarget.classList.add('active');
  
  // Filter events
  if (sport === 'all') {
    document.querySelectorAll('.list-group-item').forEach(item => {
      item.style.display = 'block';
    });
  } else {
    document.querySelectorAll('.list-group-item').forEach(item => {
      item.style.display = item.classList.contains(`bg-${sport}`) ? 'block' : 'none';
    });
  }
}

// Update calendar date based on current offset
function updateCalendarDate() {
  const tempDate = new Date();
  tempDate.setMonth(tempDate.getMonth() + monthOffset);

  currYear = tempDate.getFullYear();
  currMonth = ("0" + (tempDate.getMonth() + 1)).slice(-2);
  currDay = ("0" + tempDate.getDate()).slice(-2);

  titleMonth.textContent = monthNames[tempDate.getMonth()];
  titleYear.textContent = currYear;
}

// Generate the calendar grid
function generateCalendar(year, month) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const daysInMonth = endDate.getDate();
  const startDay = startDate.getDay();

  let html = "";
  let day = 1;

  for (let i = 0; i < 6; i++) {
    html += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        html += "<td></td>";
      } else if (day > daysInMonth) {
        html += "<td></td>";
      } else {
        const isToday =
          day === parseInt(currDay) && month === currentDate.getMonth();
        const activeClass = isToday ? "day-active" : "";
        html += `<td class='day table-light ${activeClass}' data-day='${day}'>${day}</td>`;
        day++;
      }
    }
    html += "</tr>";
    if (day > daysInMonth) break;
  }

  document.getElementById("calendar-body").innerHTML = html;
}

// Fetch and display sports scores
async function fetchAndDisplayScores(year, month, day) {
  const dateString = `${year}${month}${day}`;
  sportsScoresList.innerHTML =
    "<li class='list-group-item'>Loading scores...</li>";

  try {
    // Create all API requests
    const requests = sportsConfig.map((sport) =>
      fetch(
        `https://site.api.espn.com/apis/site/v2/sports/${sport.url}/scoreboard?dates=${dateString}`
      )
        .then((response) => response.json())
        .catch((error) => ({ error: true, sport }))
    );

    const responses = await Promise.all(requests);

    // Clear loading message
    sportsScoresList.innerHTML = "";

    // Process each response
    responses.forEach((data, index) => {
      if (data.error) {
        console.error(`Error fetching ${sportsConfig[index].name}`);
        return;
      }

      if (data.events && data.events.length > 0) {
        if (sportsConfig[index].url.includes("tennis")) {
          data.events.forEach((event) => {
            const listItem = createTennisListItem(event, sportsConfig[index]);
            sportsScoresList.appendChild(listItem);
          });
        } else if (sportsConfig[index].url.includes("racing")) {
          data.events.forEach((event) => {
            const listItem = createRacingListItem(event, sportsConfig[index]);
            sportsScoresList.appendChild(listItem);
          });
        } else {
          data.events.forEach((event) => {
            const listItem = createSportsListItem(event, sportsConfig[index]);
            sportsScoresList.appendChild(listItem);
          });
        }
      }
    });

    if (sportsScoresList.innerHTML === "") {
      sportsScoresList.innerHTML =
        "<li class='list-group-item'>No games scheduled for this date</li>";
    }
  } catch (error) {
    console.error("Error fetching scores:", error);
    sportsScoresList.innerHTML =
      "<li class='list-group-item'>Error loading scores. Please try again.</li>";
  }
}

// Helper function to create sports list items
function createSportsListItem(event, sport) {
  const listItem = document.createElement("li");
  listItem.className = `list-group-item ${sport.class}`;
  const date = new Date(event.date);

  listItem.innerHTML = `
    <h5>${sport.emoji} ${
    event.competitions[0].competitors[0].team.displayName
  } vs 
    ${event.competitions[0].competitors[1].team.displayName}</h5>
    <p><strong>${date.toLocaleTimeString("en-US", {
      timeStyle: "short",
    })}</strong> | 
    ${date.toLocaleDateString("en-US", { dateStyle: "long" })}</p>
  `;

  return listItem;
}

// Helper function for tennis events
function createTennisListItem(event, sport) {
  const container = document.createElement("div");

  event.groupings[0].competitions.forEach((competition) => {
    const date = new Date(competition.date);
    const listItem = document.createElement("li");
    listItem.className = `list-group-item ${sport.class}`;

    listItem.innerHTML = `
      <h5>${sport.emoji} ${event.name} - ${
      competition.competitors[0].athlete.displayName
    } vs 
      ${competition.competitors[1].athlete.displayName}</h5>
      <p><strong>${date.toLocaleTimeString("en-US", {
        timeStyle: "short",
      })}</strong> | 
      ${date.toLocaleDateString("en-US", { dateStyle: "long" })}</p>
    `;

    container.appendChild(listItem);
  });

  return container;
}

// Helper function for racing events
function createRacingListItem(event, sport) {
  const listItem = document.createElement("li");
  listItem.className = `list-group-item ${sport.class}`;
  const date = new Date(event.date);

  listItem.innerHTML = `
    <h5>${sport.emoji} ${event.shortName}</h5>
    <p><strong>${date.toLocaleTimeString("en-US", {
      timeStyle: "short",
    })}</strong> | 
    ${date.toLocaleDateString("en-US", { dateStyle: "long" })}</p>
  `;

  return listItem;
}

// Event Listeners
prevMonth.addEventListener("click", () => {
  monthOffset--;
  updateCalendarDate();
  generateCalendar(
    currYear,
    new Date(currYear, parseInt(currMonth) - 1, 1).getMonth()
  );
  fetchAndDisplayScores(currYear, currMonth, currDay);
});

nextMonth.addEventListener("click", () => {
  monthOffset++;
  updateCalendarDate();
  generateCalendar(
    currYear,
    new Date(currYear, parseInt(currMonth) - 1, 1).getMonth()
  );
  fetchAndDisplayScores(currYear, currMonth, currDay);
});

// Use event delegation for calendar day clicks
document.getElementById("calendar-body").addEventListener("click", (e) => {
  if (e.target.classList.contains("day")) {
    document
      .querySelectorAll(".day")
      .forEach((day) => day.classList.remove("day-active"));
    e.target.classList.add("day-active");
    const dayNumber = e.target.dataset.day;
    fetchAndDisplayScores(currYear, currMonth, ("0" + dayNumber).slice(-2));
  }
});

// Initialize the application
initCalendar();
