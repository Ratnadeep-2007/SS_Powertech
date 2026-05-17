<?php
header('Content-Type: application/json');

// 1. Load PHPMailer files manually (since we didn't use Composer)
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Simple .env loader
if (file_exists(__DIR__ . '/.env')) {
    $lines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
        putenv(trim($name) . '=' . trim($value));
    }
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// 2. Get the JSON payload
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request data.']);
    exit;
}

// 3. Initialize PHPMailer
$mail = new PHPMailer(true);

try {
    // --- SERVER SETTINGS ---
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;         // Uncomment for detailed debug info
    $mail->isSMTP();                                  // Send using SMTP
    $mail->Host = getenv('SMTP_HOST') ?: 'smtp.gmail.com';             // Set the SMTP server to send through
    $mail->SMTPAuth = true;                         // Enable SMTP authentication
    $mail->Username = getenv('SMTP_USER');   // Your Gmail address
    $mail->Password = getenv('SMTP_PASS'); // Your 16-character Gmail App Password
    
    $encryption = strtolower(getenv('SMTP_ENCRYPTION') ?: 'tls');
    if ($encryption === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } else {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }
    
    $mail->Port = getenv('SMTP_PORT') ?: 587;

    // --- RECIPIENTS ---
    $mail->setFrom(getenv('SMTP_USER'), 'Website Contact Form');
    $mail->addAddress(getenv('CONTACT_RECEIVER') ?: 'vijay_patil1980@yahoo.com');    // Add recipient

    // Reply-To user who filled the form
    if (!empty($data['email'])) {
        $mail->addReplyTo($data['email'], $data['name'] ?? 'Customer');
    }

    // --- CONTENT ---
    $mail->isHTML(true);                              // Set email format to HTML

    // Sanitize data
    $name = htmlspecialchars($data['name'] ?? 'N/A');
    $email = htmlspecialchars($data['email'] ?? 'N/A');
    $phone = htmlspecialchars($data['phone'] ?? 'N/A');
    $service = htmlspecialchars($data['service_type'] ?? 'General Inquiry');
    $message = nl2br(htmlspecialchars($data['message'] ?? 'No message provided'));

    // Construct Details HTML
    $detailsHtml = '';
    if (!empty($data['details'])) {
        foreach ($data['details'] as $key => $value) {
            $detailsHtml .= "<tr><td><strong>" . htmlspecialchars($key) . ":</strong></td><td>" . htmlspecialchars($value) . "</td></tr>";
        }
    }

    $mail->Subject = "New Website Inquiry from $name";
    $mail->Body = "
    <div style='font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;'>
        <h2 style='color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px;'>New Lead from Website</h2>
        <table border='0' cellpadding='10' style='width: 100%; border-collapse: collapse;'>
            <tr style='background: #f9f9f9;'><td><strong>Name:</strong></td><td>$name</td></tr>
            <tr><td><strong>Email:</strong></td><td>$email</td></tr>
            <tr style='background: #f9f9f9;'><td><strong>Phone:</strong></td><td>$phone</td></tr>
            <tr><td><strong>Service Category:</strong></td><td>$service</td></tr>
            $detailsHtml
        </table>
        <div style='margin-top: 20px; padding: 15px; background: #f0f7ff; border-radius: 5px;'>
            <strong>Message:</strong><br>$message
        </div>
    </div>";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Transmission Successful. Our technicians will contact you shortly.']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
?>