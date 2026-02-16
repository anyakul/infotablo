<?php
session_start();

include('helpers.php');

$page_content = include_template('main.php');
print($page_content);
