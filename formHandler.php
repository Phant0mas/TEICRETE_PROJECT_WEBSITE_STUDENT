<?php
	$contactFirstName = $_POST["first_name"];
	$contactLastName = $_POST["last_name"];
	$contactEmail = $_POST["email"];
	$contactPhone = $_POST["telephone"];

	$conn = mysql_connect("localhost","root","");
	mysql_select_db("project",$conn); //connects to a database named "project"
	
	$sql = INSERT INTO contacts (first_name,last_name,email,telephone) 
	VALUES ( '$_POST["first_name"]', '$_POST["last_name"]', '$_POST["email"]', '$_POST["telephone"]' );

	$result=mysql_query($sql, $conn) or die(mysql_error());
	
	
	
?>
