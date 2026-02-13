<?php
// Подключаем библиотеку Simple HTML DOM
include 'simple_html_dom.php';

// URL страницы Gismeteo
$url = 'https://www.gismeteo.ru/weather-moscow-4368/';

// Получаем HTML-код страницы
$html = file_get_html($url);

// Проверяем успешность загрузки страницы
if ($html !== false) {
    // Парсим интересующую информацию
    $temperature = trim($html->find('.tab-weather__value_l', 0)->plaintext); // температура
    $condition = trim($html->find('.tooltip__text', 0)->plaintext); // описание погоды
    $humidity = trim($html->find('span.tab-weather__value_m', 0)->plaintext); // влажность
    $windSpeed = trim($html->find('span.tab-weather__value_m', 1)->plaintext); // скорость ветра

    // Выводим результат
    echo 'Температура: ', $temperature, "\n";
    echo 'Погода: ', $condition, "\n";
    echo 'Влажность: ', $humidity, "\n";
    echo 'Скорость ветра: ', $windSpeed, "\n";

    // Освобождаем память
    $html->clear();
    unset($html);
} else {
    echo 'Ошибка при загрузке страницы.';
}