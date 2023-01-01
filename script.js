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

      // Use jsPDF to convert the base64-encoded PDF to a Word document
      var doc = new jsPDF();
      doc.output("datauri").then(function(uri) {
        // Create a download link for the converted Word document
        var link = document.createElement("a");
        link.href = uri;
        link.download = "file.docx";
        link.innerHTML = "Download Converted Word Document";

        // Display the download link
        document.querySelector("#results").innerHTML = "";
        document.querySelector("#results").appendChild(link);
      });
    };
    reader.readAsBinaryString(file);
  } else {
    // Display an error message if no file was selected
    document.querySelector("#results").innerHTML = "No file selected.";
  }
}
