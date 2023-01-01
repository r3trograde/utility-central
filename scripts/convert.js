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
