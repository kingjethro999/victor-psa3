<?php
// Set headers to handle CORS and JSON responses
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Check if it's a POST request
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Only POST requests are allowed"]);
    exit;
}

// Get the form data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
$requiredFields = ["firstName", "lastName", "email", "phone", "service", "message"];
$errors = [];

foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        $errors[] = ucfirst($field) . " is required";
    }
}

// Validate email
if (!empty($data["email"]) && !filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email format";
}

// If there are validation errors, return them
if (!empty($errors)) {
    echo json_encode(["success" => false, "errors" => $errors]);
    exit;
}

// Prepare email content
$to = "ibezimvictor05@gmail.com"; // Your email address
$subject = "New Pickup Request from " . $data["firstName"] . " " . $data["lastName"];

$message = "
<html>
<head>
<title>New Pickup Request</title>
</head>
<body>
<h2>New Pickup Request Details</h2>
<p><strong>Name:</strong> " . $data["firstName"] . " " . $data["lastName"] . "</p>
<p><strong>Email:</strong> " . $data["email"] . "</p>
<p><strong>Phone:</strong> " . $data["phone"] . "</p>
<p><strong>Service Needed:</strong> " . $data["service"] . "</p>
<p><strong>Special Instructions:</strong> " . $data["message"] . "</p>
</body>
</html>
";

// Set email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . $data["email"] . "\r\n";

// Send email
$mailSent = mail($to, $subject, $message, $headers);

if ($mailSent) {
    echo json_encode(["success" => true, "message" => "Your pickup request has been sent successfully. We'll contact you shortly."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to send your request. Please try again or contact us directly."]);
}
?>
