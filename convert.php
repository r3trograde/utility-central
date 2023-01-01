<?php

// Include the PHPWord library
require_once 'PHPWord/PHPWord.php';

// Check if the base64 parameter was provided
if (isset($_POST["base64"])) {
  // Get the base64-encoded PDF string
  $base64 = $_POST["base64"];

  // Decode the base64 string and save the PDF file
  $pdf = base64_decode($base64);
  file_put_contents("file.pdf", $pdf);

  // Create a new PHPWord object
  $phpWord = new PHPWord();

  // Load the PDF file into PHPWord
  $section = $phpWord->loadTemplate("file.pdf");

  // Save the Word file
  $objWriter = PHPWord_IOFactory::createWriter($phpWord, 'Word2007');
  $objWriter->save("file.docx");

  // Return the download URL for the converted Word file
  echo "http://utilitycentral/pdf-to-word/downloads/file.docx";
}
