<?php
// 데이터베이스 연결 정보
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

// 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 데이터베이스 연결 오류 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// POST 방식으로 전달된 데이터 가져오기
$name = $_POST['name'];
$message = $_POST['message'];

// 데이터베이스에 삽입
$sql = "INSERT INTO guestbook (name, message) VALUES ('$name', '$message')";

if ($conn->query($sql) === TRUE) {
    echo "메시지가 저장되었습니다.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>