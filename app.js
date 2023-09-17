//test for github traffic github api
const repoName = 'AIProf'; // repository name
//env variable for github access token 
const accessToken = process.env.GH_ACCESS_TOKEN; // GitHub access token
const apiUrl = `https://api.github.com/MeetYourAI/${repoName}/traffic/views`;

// GitHub API headers with your access token
const headers = {
Authorization: `Bearer ${accessToken}`,
};

// Fetch traffic data from GitHub API
fetch(apiUrl, { headers })
.then((response) => response.json())
.then((data) => {
const dates = data.views.map((entry) => new Date(entry.timestamp));
const counts = data.views.map((entry) => entry.count);

// Calculate daily counts
const dailyCounts = [];
for (let i = 1; i < counts.length; i++) {
dailyCounts.push(counts[i] - counts[i - 1]);
}

// Create a chart
const ctx = document.getElementById('trafficChart').getContext('2d');
new Chart(ctx, {
type: 'line',
data: {
labels: dates.slice(1),
datasets: [
  {
    label: 'Daily Visitors/Views',
    data: dailyCounts,
    fill: false,
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 2,
  },
],
},
options: {
scales: {
  x: {
    type: 'time',
    time: {
      unit: 'day',
    },
  },
  y: {
    beginAtZero: true,
    title: {
      display: true,
      text: 'Count',
    },
  },
},
},
});
})
.catch((error) => {
console.error('Failed to fetch data:', error);
});


// for contact form post

var form = document.getElementById("contact-us-form");
let submitButton = document.getElementById("submit-btn");
async function handleSubmit(event) {
event.preventDefault();
var status = document.getElementById("contactStatus");
var data = new FormData(event.target);
fetch(event.target.action, {
method: form.method,
body: data,
headers: {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
}
}).then(response => {
if (response.ok) {
    document.getElementById("successMessage").style.display = "block";
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("contact-us-form").reset();
} else {
    response.json().then(data => {
    if (Object.hasOwn(data, 'errors')) {
    document.getElementById("errorMessage").innerHTML = data["errors"].map(error => error["message"]).join(", ")
    } else {
        document.getElementById("successMessage").style.display = "none";
        document.getElementById("errorMessage").style.display = "block";
    }
})
}
}).catch(error => {
    console.error("Error:", error);
    document.getElementById("successMessage").style.display = "none";
    document.getElementById("errorMessage").style.display = "block";
});
}

form.addEventListener(submitButton, handleSubmit);
