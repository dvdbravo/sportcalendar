// DOM Elements
const prevMonth = document.querySelector("#prevMonth");
const nextMonth = document.querySelector("#nextMonth");
const titleMonth = document.querySelector("#titleMonth");
const titleYear = document.querySelector("#titleYear");
const sportsScoresList = document.getElementById("sportsScores");
const exportBtn = document.querySelector("#exportMonth");

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
  createSportFilters();

  // Set current day with proper formatting
  currDay = formatTwoDigits(currentDate.getDate());

  // Fetch current day's events
  fetchAndDisplayScores(
    currentDate.getFullYear(),
    formatTwoDigits(currentDate.getMonth() + 1),
    currDay
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
          if (data.events) {
            data.events.forEach((event) => {
              try {
                const tennisItem = createTennisListItem(
                  event,
                  sportsConfig[index]
                );
                if (tennisItem) {
                  sportsScoresList.appendChild(tennisItem);
                }
              } catch (error) {
                console.error("Error processing tennis event:", error);
              }
            });
          }
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

// Helper function for tennis events - NOW FILTERED BY CURRENT DAY
function createTennisListItem(event, sport) {
  const container = document.createElement("div");

  // Check if event has no groupings or empty groupings array
  if (!event.groupings || event.groupings.length === 0) {
    // Create a list item showing just the tournament info
    const listItem = document.createElement("li");
    listItem.className = `list-group-item ${sport.class}`;

    const startDate = new Date(event.date);
    const endDate = new Date(event.endDate);

    listItem.innerHTML = `
      <div class="tennis-tournament">
        <h5>${sport.emoji} ${event.name || "Tennis Tournament"}</h5>
        <div class="tournament-details">
          <p>Tournament Dates: 
            ${startDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })} - 
            ${endDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p class="no-matches">No matches scheduled yet</p>
        </div>
      </div>
    `;

    container.appendChild(listItem);
    return container;
  }

  const selectedDate = new Date();
  const selectedDay = selectedDate.getDate();
  const selectedMonth = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();

  event.groupings[0].competitions.forEach((competition) => {
    try {
      const matchDate = new Date(competition.date);
      const matchDay = matchDate.getDate();
      const matchMonth = matchDate.getMonth();
      const matchYear = matchDate.getFullYear();

      // Only process matches for selected day
      if (
        matchDay === selectedDay &&
        matchMonth === selectedMonth &&
        matchYear === selectedYear
      ) {
        const listItem = document.createElement("li");
        listItem.className = `list-group-item ${sport.class}`;

        // Safely get player data with fallbacks
        const player1 = competition.competitors?.[0]?.athlete || {};
        const player2 = competition.competitors?.[1]?.athlete || {};

        const player1Flag = player1.flag?.href || "";
        const player2Flag = player2.flag?.href || "";
        const player1FlagAlt = player1.flag?.alt || "";
        const player2FlagAlt = player2.flag?.alt || "";

        // Get round information with fallback
        const round = competition.round?.displayName || "Match";

        listItem.innerHTML = `
          <div class="tennis-match">
            <h5>${sport.emoji} ${event.name || "Tennis Match"} - ${round}</h5>
            <div class="match-details">
              <p class="players">
                <img src="${player1Flag}" alt="${player1FlagAlt}" class="player-flag">
                ${player1.displayName || "Player 1"} 
                vs 
                <img src="${player2Flag}" alt="${player2FlagAlt}" class="player-flag">
                ${player2.displayName || "Player 2"}
              </p>
              <p class="time-date">
                <strong>${matchDate.toLocaleTimeString("en-US", {
                  timeStyle: "short",
                })}</strong>
              </p>
            </div>
          </div>
        `;

        container.appendChild(listItem);
      }
    } catch (error) {
      console.error("Error processing tennis competition:", error);
    }
  });

  return container.children.length > 0 ? container : null;
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

// Add this with your other utility functions
function formatTwoDigits(number) {
  return number.toString().padStart(2, '0');
}

// Month to CSV export

async function exportMonthToCSV() {
  try {
    // Show loading state
    exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Export...';
    
    // Get all days in the current month view
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // Collect all events for the month
    let allEvents = [];
    
    // Fetch data for each day
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}${formatTwoDigits(month)}${formatTwoDigits(
        day
      )}`;
      
      // Fetch data for each sport for this day
      for (const sport of sportsConfig) {
        const response = await fetch(
          `https://site.api.espn.com/apis/site/v2/sports/${sport.url}/scoreboard?dates=${dateString}`
        );
        const data = await response.json();
        
        if (data.events) {
          data.events.forEach(event => {
            // Process tennis events differently
            if (sport.url.includes("tennis")) {
              if (event.groupings && event.groupings.length > 0) {
                event.groupings[0].competitions?.forEach(competition => {
                  allEvents.push(processEventForCSV(event, competition, sport));
                });
              }
            } else {
              // Process other sports
              event.competitions?.forEach(competition => {
                allEvents.push(processEventForCSV(event, competition, sport));
              });
            }
          });
        }
      }
    }
    
    // Convert to CSV
    const csv = convertToCSV(allEvents);
    
    // Download the file
    downloadCSV(csv, `sports-events-${year}-${month}.csv`);
    
    // Reset button
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Export Month to CSV';
    
  } catch (error) {
    console.error("Export failed:", error);
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Export Failed - Try Again';
  }
}

function processEventForCSV(event, competition, sport) {
  const date = new Date(competition.date || event.date);
  const time = date.toLocaleTimeString("en-US", {timeStyle: "short"});
  const dateStr = date.toLocaleDateString("en-US");
  
  // Handle tennis differently
  if (sport.url.includes("tennis")) {
    return {
      Sport: sport.name,
      Tournament: event.name,
      Round: competition.round?.displayName || "",
      Player1: competition.competitors?.[0]?.athlete?.displayName || "",
      Player2: competition.competitors?.[1]?.athlete?.displayName || "",
      Time: time,
      Date: dateStr,
      Venue: competition.venue?.fullName || "",
      Status: competition.status?.type?.detail || "Scheduled"
    };
  }
  
  // Handle other sports
  return {
    Sport: sport.name,
    Event: event.name,
    Team1: competition.competitors?.[0]?.team?.displayName || "",
    Team2: competition.competitors?.[1]?.team?.displayName || "",
    Time: time,
    Date: dateStr,
    Venue: competition.venue?.fullName || "",
    Status: competition.status?.type?.detail || "Scheduled"
  };
}

function convertToCSV(data) {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(obj => 
    Object.values(obj).map(value => 
      `"${String(value).replace(/"/g, '""')}"`
    ).join(",")
  );
  return [headers, ...rows].join("\n");
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
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

exportBtn.addEventListener("click", exportMonthToCSV);

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
