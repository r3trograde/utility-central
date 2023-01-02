function checkPlagiarism() {
  // Get user input text
  var text = document.getElementById("textInput").value;

  // Send text to plagiarism checking service and display results
  fetch("https://plagiarism-checking-service.com/check", {
    method: "POST",
    body: JSON.stringify({text: text})
  })
  .then(response => response.json())
  .then(data => {
    var resultsDiv = document.getElementById("results");
    if (data.plagiarismScore > 0) {
      resultsDiv.innerHTML = "Plagiarism detected! Score: " + data.plagiarismScore + "%";
    } else {
      resultsDiv.innerHTML = "No plagiarism detected.";
    }
  })
  .catch(error => {
    console.error(error);
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "Error checking for plagiarism.";
  });
}
