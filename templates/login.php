<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Вход</title>
  <link rel="stylesheet" href="/deploy/css/style.min.css">
</head>

<body class="container">
  <div class="login-container">
    <h2 class="login-header">Войти в панель администратора</h2>
    <form class="login-form" action="login.php" method="post">
      <div class="login-group">
        <label for="login" class="visually-hidden">Email</label>
        <input type="text" id="login" name="login" required placeholder="Логин">
      </div>
      <div class="login-group">
        <label for="password" class="visually-hidden">Пароль</label>
        <input type="password" id="password" name="password" required placeholder="Ваш пароль">
      </div>
      <div class="login-buttons">
        <button type="submit" class="btn login-submit-btn">Войти</button>
        <a class="login-link" href="register.php">Зарегистрироваться</a>
      </div>
    </form>
  </div>
  <script src="/deploy/js/flatpickr.js"></script>
  <script src="/deploy/js/flatpickru.js"></script>
  <script src="/deploy/js/main.min.js"></script>
</body>

</html>
