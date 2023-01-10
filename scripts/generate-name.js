function generateName() {
  fetch("prefixes.txt")
    .then(response => response.text())
    .then(text => {
      var prefixes = text.split("\n");
      var prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

      fetch("suffixes.txt")
        .then(response => response.text())
        .then(text => {
          var suffixes = text.split("\n");
          var suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
          var businessName = prefix + " " + suffix;

          document.querySelector("#results").innerHTML = businessName;
        });
    });
}
