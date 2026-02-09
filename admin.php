<?php
session_start();

include('helpers.php');

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header("Location: login.php");
    exit;
}

$page_content = include_template('admin.php');
print($page_content);
?>
