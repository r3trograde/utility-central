function generateQRCode() {
  var url = document.getElementById("url").value;
  var qr = new QRious({
    value: url
  });
  var img = document.createElement("img");
  img.src = qr.toDataURL();

  var qrCodeDiv = document.getElementById("qrCode");
  qrCodeDiv.appendChild(img);

  var downloadButton = document.getElementById("downloadButton");
  downloadButton.href = qr.toDataURL();
  downloadButton.download = "qr-code.png";
  downloadButton.style.display = "inline-block";
}

function downloadQRCode() {
  var qrCodeImg = document.getElementsByTagName("img")[0];
  var qrCodeData = qrCodeImg.src;

  var downloadLink = document.createElement("a");
  downloadLink.href = qrCodeData;
  downloadLink.download = "qr-code.png";
  downloadLink.click();
}
