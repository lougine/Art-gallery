<?php
session_start();
include('db.php');

if (!isset($_SESSION['user_id'])) {
    echo "You must be logged in to view the cart.";
    exit;
}

$user_id = $_SESSION['user_id'];
$sql = "
    SELECT p.name, p.price, c.quantity 
    FROM cart_items c 
    JOIN products p ON c.product_id = p.id 
    WHERE c.user_id = ?
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($name, $price, $quantity);

echo "<h2>Your Cart</h2>";
echo "<ul>";
$total = 0;

while ($stmt->fetch()) {
    echo "<li>$name - $quantity x $$price</li>";
    $total += $price * $quantity;
}

echo "</ul>";
echo "<p>Total: $$total</p>";

$stmt->close();
$conn->close();
?>
