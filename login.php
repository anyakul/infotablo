<?php
session_start();

include('helpers.php');

// Зафиксируйте логин и пароль
$correctLogin = 'admin';
$correctPassword = 'admin';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $_POST['login'];
    $password = $_POST['password'];

    if ($login === $correctLogin && $password === $correctPassword) {
        $_SESSION['logged_in'] = true;
        header('Location: admin.php');
        exit;
    } else {
        echo "Неверный логин или пароль.";
    }
}

// Покажите форму входа
$page_content = include_template('login.php');
print($page_content);
?>
