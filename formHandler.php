<?php
	$contactFirstName = $_POST["first_name"];
	$contactLastName = $_POST["last_name"];
	$contactEmail = $_POST["email"];
	$contactPhone = $_POST["telephone"];

	$conn = mysql_connect("localhost","root","");
	mysql_select_db("project",$conn); //connects to a database named "project"
	
	$sql = INSERT INTO contacts (first_name,last_name,email,telephone) 
	VALUES ( '$_POST["first_name"]', '$_POST["last_name"]', '$_POST["email"]', '$_POST["telephone"]' );

	if( !mysql_query($sql, $conn) )
	{
		die('Error' . mysql_error())
	}
	
	$query1 = select * from contacts;

	$result=mysql_query($query1, $conn) or die(mysql_error());
	
	$number=mysql_num_rows($result);


	while($newarray=mysql_fetch_array($result))
	{
	$fname=$newarray['first_name'];
	$lname=$newarray['last_name'];
	$email=$newarray['email'];
	$phone=$newarray['telephone'];

	echo "<tr> <td> $fname</td> <td> $lname </td> <td> $email</td> <td> $phone </td> ";
	echo "</tr>";
	}
	echo "</table>";

	
?>
