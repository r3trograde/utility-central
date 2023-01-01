document.querySelector('.active').style.fontWeight = 'bold';

function generateName() {
  // Read the prefix values from the prefixes.txt file
  fetch("prefixes.txt")
    .then(response => response.text())
    .then(text => {
      // Split the file contents into an array
      var prefixes = text.split("\n");

      // Select a random prefix
      var prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

      // Read the suffix values from the suffixes.txt file
      fetch("suffixes.txt")
        .then(response => response.text())
        .then(text => {
          // Split the file contents into an array
          var suffixes = text.split("\n");

          // Select a random suffix
          var suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

          // Create the business name
          var businessName = prefix + " " + suffix;

          // Display the business name in the results div
          document.querySelector("#results").innerHTML = businessName;
        });
    });
}

function convert() {
  // Get the selected PDF file from the input element
  var file = document.querySelector("#file").files[0];

  // Check if a file was selected
  if (file) {
    // Display a loading message
    document.querySelector("#results").innerHTML = "Converting... Please wait.";

    // Use the FileReader API to read the file as a binary string
    var reader = new FileReader();
    reader.onload = function() {
      // Convert the binary string to a base64-encoded string
      var base64 = btoa(reader.result);

      // Send the base64-encoded string to the server-side conversion script
      fetch("convert.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "base64=" + encodeURIComponent(base64)
      })
      .then(function(response) {
        return response.text();
      })
      .then(function(responseText) {
        // Display the download link for the converted Word document
        document.querySelector("#results").innerHTML = "<a href='" + responseText + "' download>Download Converted Word Document</a>";
      });
    };
    reader.readAsBinaryString(file);
  } else {
    // Display an error message if no file was selected
    document.querySelector("#results").innerHTML = "No file selected.";
  }
}

function sendEmail() {
  // Get the email address and message from the form fields
  var email = document.querySelector("#email").value;
  var message = document.querySelector("#message").value;

  // Send the email using the Fetch API
  fetch("/send-email.php", {
    method: "POST",
    body: JSON.stringify({ email: email, message: message }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function(response) {
    // Display a success message
    document.querySelector("#results").innerHTML = "Email sent successfully!";
  })
  .catch(function(error) {
    // Display an error message
    document.querySelector("#results").innerHTML = "Error: Email could not be sent.";
  });
}

