<?php
  // Get the email address and message from the POST request
  $email = $_POST['email'];
  $message = $_POST['message'];

  // Set the recipient email address
  $to = "utilitycentral101@gmail.com";

  // Set the email subject and body
  $subject = "Message from Utility Central";
  $body = "Email: $email\n\nMessage:\n$message";

  // Set the headers
  $headers = "From: Utility Central <noreply@utilitycentral.com>\r\n";
  $headers .= "Reply-To: $email\r\n";

  // Send the email
  if (mail($to, $subject, $body, $headers)) {
    // Return a success response
    http_response_code(200);
  } else {
    // Return an error response
    http_response_code(500);
  }
?>
