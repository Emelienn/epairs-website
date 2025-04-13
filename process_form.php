<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Формируем текст письма
    $message = "Новая заявка на ремонт:\n\n";
    $message .= "Имя: " . $data['name'] . "\n";
    $message .= "Телефон: " . $data['phone'] . "\n";
    $message .= "Email: " . $data['email'] . "\n";
    $message .= "Производитель: " . $data['device'] . "\n";
    $message .= "Модель: " . $data['device-model'] . "\n";
    $message .= "Тип ремонта: " . $data['repair'] . "\n";
    $message .= "Описание проблемы: " . $data['description'] . "\n";
    
    // Email для получения заявок (замените на свой)
    $to = "your-email@example.com";
    
    // Тема письма
    $subject = "Новая заявка на ремонт от " . $data['name'];
    
    // Заголовки письма
    $headers = "From: " . $data['email'] . "\r\n";
    $headers .= "Reply-To: " . $data['email'] . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Отправляем письмо
    $mail_sent = mail($to, $subject, $message, $headers);
    
    if ($mail_sent) {
        echo json_encode(['success' => true, 'message' => 'Заявка успешно отправлена']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка при отправке заявки']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса']);
}
?> 