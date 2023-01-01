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

      // Use docxgen to convert the base64-encoded PDF to a Word document
      var doc = new Docxgen();
      doc.loadFromBase64(base64).then(function() {
        // Create a download link for the converted Word document
        var link = document.createElement("a");
        link.href = doc.getDataUri();
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
