<html>
<head>
</head>
<body>

<?php

$m=$_POST["req0"];

$n=$_POST["input1"];

$con=mysql_connect("localhost","root","");



$result = mysql_query("SELECT * FROM contacts WHERE $n ='$m'",$con);

echo "<table border=1>";
while($newarray=mysql_fetch_array($result))
  {
						$id=$newarray['id'];
						$fname=$newarray['name'];
						$lname=$newarray['surname'];
						$phone=$newarray['phone'];
						$email=$newarray['email'];
  echo "<tr><td>ID: $id </td> <td>First Name: $fname </td> <td>Last Name: $lname </td> <td>Telephone: $phone </td> <td>E-Mail: $email </td></tr>";
  echo "<br>";
  }
  echo "</table>";
echo $result;
?> 
</body>
</html>
