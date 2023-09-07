<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
// Variables
$name = trim($_POST['UserName']);
$email = trim($_POST['UserEmail']);
$subject = trim($_POST['subject']);
$message = trim($_POST['message']);
$to = "your_email@example.com"; // Change with your email address

// Email address validation - works with php 5.2+
function is_email_valid($email) {
	return filter_var($email, FILTER_VALIDATE_EMAIL);
}


if( isset($name) && isset($email) && isset($subject) && isset($message) && is_email_valid($email) ) {

	// Avoid Email Injection and Mail Form Script Hijacking
	$pattern = "/(content-type|bcc:|cc:|to:)/i";
	if( preg_match($pattern, $name) || preg_match($pattern, $email) || preg_match($pattern, $message) ) {
		exit;
	}

	// Email will be send

	// HTML Elements for Email Body
	$body = <<<EOD
	<strong>Name:</strong> $name <br>
	<strong>Email:</strong> <a href="mailto:"$email">$email</a> <br> 
	<strong>Subject:</strong> $subject <br><br><br>
	
	<strong>Message:</strong> <br> $message 
EOD;
//Must end on first column
	
	$headers = "From: $name <$email>\r\n";
	$headers .= 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=UTF-8 ' . "\r\n";

	// PHP email sender
	mail($to, $subject, $body, $headers);
}

}

