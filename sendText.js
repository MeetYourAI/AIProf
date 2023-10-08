document.addEventListener("DOMContentLoaded", () => {
    const askButton = document.getElementById("ask");
    const questionInput = document.getElementById("question");
  
    askButton.addEventListener("click", () => {
      const text = questionInput.value;
      if (text.trim() !== "") {
        // Send the user's input to the server
        sendTextToServer(text);
      } else {
        alert("Please enter a question.");
      }
    });
  
    function sendTextToServer(text) {
      fetch("/synthesize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data); // Log the server's response
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
  