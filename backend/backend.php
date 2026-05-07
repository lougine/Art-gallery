<?php
$servername = "localhost";
$username = "root"; // Use your MySQL username
$password = "ramy2002"; // Use your MySQL password
$dbname = "echoes_of_art";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
