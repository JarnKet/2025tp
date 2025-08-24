<?php
// Initialize counts
$totalLetters = 0;
$uppercaseCount = 0;
$lowercaseCount = 0;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $inputText = $_POST["inputText"];

    // Iterate through the input text to count letters
    for ($i = 0; $i < strlen($inputText); $i++) {
        $char = $inputText[$i];

        // Check if the character is a letter
        if (ctype_alpha($char)) {
            $totalLetters++;

            // Check if it's uppercase
            if (ctype_upper($char)) {
                $uppercaseCount++;
            }
            // Check if it's lowercase
            if (ctype_lower($char)) {
                $lowercaseCount++;
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Letter Count</title>
</head>
<body>
    <h1>Count Letters and Case Count</h1>
    <form method="POST" action="c1.php">
        <label for="inputText">Enter text:</label><br>
        <textarea name="inputText" id="inputText" rows="4" cols="50"><?php echo isset($inputText) ? htmlspecialchars($inputText) : ''; ?></textarea><br><br>
        <input type="submit" value="Submit">
    </form>

    <?php if ($_SERVER["REQUEST_METHOD"] == "POST"): ?>
        <h2>Results:</h2>
        <p>Total letters: <?php echo $totalLetters; ?></p>
        <p>Uppercase letters: <?php echo $uppercaseCount; ?></p>
        <p>Lowercase letters: <?php echo $lowercaseCount; ?></p>
    <?php endif; ?>
</body>
</html>
