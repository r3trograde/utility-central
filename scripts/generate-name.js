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
