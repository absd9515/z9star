<?php
// 데이터베이스에서 글 목록 가져오기
$sql = "SELECT * FROM guestbook ORDER BY id DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<   
p><strong>" . $row["name"] . "</strong>: " . $row["message"] . "</p>";
    }
} else   
 {
    echo "아직 작성된 글이 없습니다.";
}
?>