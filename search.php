<html>
<head>
</head>
<body>

<?php

$m=$_POST["req0"];

$n=$_POST["input1"];

$con=mysql_connect("localhost","root","");



$result = mysql_query("SELECT * FROM contacts WHERE $n ='$m'",$con);
$number=mysql_num_rows($result);

while($row = mysql_fetch_array($number))
  {
  echo $row['id'] ." ". $row['name']." ".$row['surname']." ".$row['phone']." ". $row['email'];
  echo "<br>";
  }
echo $result;
?> 
</body>
</html>
