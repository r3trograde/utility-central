function generateQRCode() {
  // Get user input URL
  var url = document.getElementById("url").value;

  // Create QR code using QRious library
  var qr = new QRious({
    value: url
  });

  // Create image element to display QR code
  var img = document.createElement("img");
  img.src = qr.toDataURL();

  // Add image to QR code div
  var qrCodeDiv = document.getElementById("qrCode");
  qrCodeDiv.appendChild(img);

  // Update download button with QR code image
  var downloadButton = document.getElementById("downloadButton");
  downloadButton.href = qr.toDataURL();
  downloadButton.download = "qr-code.png";
  downloadButton.style.display = "inline-block";
}

function downloadQRCode() {
  // Get QR code image data
  var qrCodeImg = document.getElementsByTagName("img")[0];
  var qrCodeData = qrCodeImg.src;

  // Create a link to the image data
  var downloadLink = document.createElement("a");
  downloadLink.href = qrCodeData;
  downloadLink.download = "qr-code.png";

  // Simulate clicking the link to download the image
  downloadLink.click();
}
