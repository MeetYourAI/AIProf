// //test for github traffic github api
// const repoName = 'AIProf'; // repository name
// //env variable for github access token 
//  //const accessToken = GH_ACCESS_TOKEN; GitHub access token
// const apiUrl = `https://api.github.com/repos/MeetYourAI/${repoName}/traffic/views`;

// // GitHub API headers with your access token
// const headers = {
//   Accept: 'application/vnd.github.v3+json',
//   Authorization:'Basic ' + btoa('MeetYourAI' + ':' + accessToken),
// };

// // Fetch traffic data from GitHub API
// fetch(apiUrl, { headers })
// .then((response) => response.json())
// .then((data) => {
// const dates = data.views.map((entry) => new Date(entry.timestamp).getDate() + " / " + (new Date(entry.timestamp).getMonth() + 1) + " / " + new Date(entry.timestamp).getFullYear());
// const counts = data.views.map((entry) => entry.count);

// // Create a chart
// const ctx = document.getElementById('trafficChart').getContext('2d');
// new Chart(ctx, {
// type: 'line',
// data: {
// labels: dates,
// datasets: [
//   {
//     label: 'Daily Visitors/Views',
//     data: counts,
//     fill: false,
//     borderColor: 'rgba(75, 192, 192, 1)',
//     borderWidth: 2,
//   },
// ],
// },
// options: {
//   scales: {
//     x: {
//       title: {
//         display: true,
//         text: 'Dates'
//       },
//     },
//     y: {
//       title: {
//         display: true,
//         text: 'Counts'
//       },
//     },
//   },
// },
// });
// })
// .catch((error) => {
// console.error('Failed to fetch data:', error);
// });


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


