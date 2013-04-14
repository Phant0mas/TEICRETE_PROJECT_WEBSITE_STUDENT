<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!--

	Design by Free CSS Templates
	http://www.freecsstemplates.org
	Released for free under a Creative Commons Attribution License

	Name       : Nameless Geometry
	Version    : 1.0
	Released   : 20130222

-->
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
			<meta name="keywords" content="" />
		<meta name="description" content="" />
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>Project 1</title>
		<link href="http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="style.css" />
	</head>
	<body>
	<div id="bg">
			<div id="outer">
				<div id="header">
					<div id="logo">
						<h1>
							<a href="index.html">Project 1</a>
						</h1>
					</div>
					<div id="nav">
						<ul>
							<li class="first active">
								<a href="index.html">Home</a>
							</li>
							<li>
								<a href="music.html">Music</a>
							</li>
							<li>
								<a href="video.html">Video</a>
							</li>
							<li>
								<a href="fun.html">Fun</a>
							</li>
							<li class="last">
								<a href="contact.php">Contact</a>
							</li>
						</ul>
						<br class="clear" />
					</div>
				</div>
				<div id="main">
				  <div id="content">
<h1>Search Results</h1><br>
<?php
	
 mysql_connect ("localhost", "root","")  or die (mysql_error());
 mysql_select_db ("example");
error_reporting(E_ALL ^ E_NOTICE);
 $search_term = $_POST['search_term'];
 
$sql = mysql_query("select * from contacts where id like '%$search_term%' or name like '%$search_term%' or surname like '%$search_term%' or email like '%$search_term%'");
if (mysql_num_rows($sql) <= 0) { // if no results
echo 'No results found.';
}
echo "<table border=1 width='100%'>";
while ($row = mysql_fetch_array($sql)){

    echo "<tr align=left><td>ID: ".$row['id']. " </td> <td>First Name: ".$row['name']." </td> <td>Last Name: ".$row['surname']." </td> <td>Telephone: ".$row['phone']." </td> <td>E-Mail: ".$row['email']." </td></tr>";
	
	}
	echo "</table>";
 ?>
 </div>
 </div

 </body>