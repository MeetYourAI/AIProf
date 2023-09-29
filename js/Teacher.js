function toggleInput() {
    const inputContainer = document.getElementById("input-container");
    if (inputContainer.style.display === "none" || inputContainer.style.display === "") {
        inputContainer.style.display = "block";
        chooseTeacherBtn.style.display = "none"; // Hide the button

    } else {
        inputContainer.style.display = "none";
    }
}

// function changeTeacher() {
//     const teacherName = document.getElementById("inputText").value.trim();
//     if (teacherName !== "") {
//         // Replace the placeholder avatar with the selected teacher's avatar (API call).
//         // For demonstration purposes, we're just displaying a message here.
//         alert(`Teacher changed to: ${teacherName}`);
//     } else {
//         alert("Please enter a teacher's name.");
//     }
// }