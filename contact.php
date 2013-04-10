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
<script src="content/javascript/FormReset.js" type="text/javascript">
</script>
 <script src="content/javascript/ValidateForm.js" type="text/javascript">
</script>
    	</head>
	<body>
		<div id="bg">
			<div id="outer">
				<div id="header">
					<div id="logo">
						<h1>
							<a href="home.html">Project 1</a>
						</h1>
					</div>
					<div id="nav">
						<ul>
							<li class="first active">
								<a href="home.html">Home</a>
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
				  <h1>Contact Form</h1>
				  <br>
                  <form name="form" action="formHandler.php" method="post" onSubmit="return validateForm();"  id="form">
                    <div align="center">
                      <table width="450px" align="center">
                        </tr>
                        <tr>
                          <td valign="top">
                            <label for="first_name">First Name *</label>
                          </td>
                          <td valign="top">
                            <input  type="text" name="first_name" maxlength="50" size="30">
                          </td>
                        </tr>
                        
                        <tr>
                          <td valign="top">
                            <label for="last_name">Last Name *</label>
                          </td>
                          <td valign="top">
                            <input  type="text" name="last_name" maxlength="50" size="30">
                          </td>
                        </tr>
                        <tr>
                          <td valign="top">
                            <label for="email">Email Address *</label>
                          </td>
                          <td valign="top">
                            <input  type="text" name="email" maxlength="80" size="30">
                          </td>
                          
                        </tr>
                        <tr>
                          <td valign="top">
                            <label for="telephone">Telephone Number</label>
                          </td>
                          <td valign="top">
                            <input  type="text" name="telephone" maxlength="30" size="30">
                          </td>
                        </tr>
                        <tr>
                          <td valign="top">
                            <label for="message">Message *</label>
                          </td>
                          <td valign="top"><textarea  name="message" maxlength="1000" cols="30" rows="7"></textarea></td>
                          
                        </tr>
                        <tr>
                          <td colspan="1" style="text-align:center">
                                  		
                             
                          </td>
                          <td valign="top">
                           <input type="submit" value="Submit">   
                              <input type="button" onClick="formReset()" value="Clean">
                              </td>
                        </tr>
                      </table>
                     <br> 
                     
                    </div>
					*required
                  </form>
                  <?php
						$contactFirstName = $_POST["first_name"];
						$contactLastName = $_POST["last_name"];
						$contactEmail = $_POST["email"];
						$contactPhone = $_POST["telephone"];

						$conn = mysql_connect("localhost","root","");
						mysql_select_db("example",$conn); //connects to a database named "example"
						
						$sql = "INSERT INTO contacts (name,surname,phone,email)  
						VALUES ( '$contactFirstName', '$contactLastName', '$contactPhone', '$contactPhone')";

						if( !mysql_query($sql, $conn) )
						{
							die('Error' . mysql_error())
						}
						
						$query1 = "select * from contacts";

						$result=mysql_query($query1, $conn) or die(mysql_error());
						
						$number=mysql_num_rows($result);


						while($newarray=mysql_fetch_array($result))
						{
						$fname=$newarray['name'];
						$lname=$newarray['surname'];
						$phone=$newarray['phone'];
						$email=$newarray['email'];

						echo "<tr> <td> $fname</td> <td> $lname </td>  <td> $phone </td> <td> $email</td>";
						echo "</tr>";
						}
						echo "</table>";
                  
                  ?>

				    <p><br class="clear" />
			        </p>
					</div>
					<br class="clear" />
				</div>
				<div id="footer">
					<div id="footerContent">
						<h3>
							About</h3>
						<p>
							Αυτό το Project είναι μια ομαδική εργασία του Χαλβατζάκη Ιωάννη 3631 και του Ραγκούση Μανώλη 3554
							για το μάθημα "Θεωρία Προγραματισμού Διαδυκτίου" για το εαρινό εξάμηνο 12-13Ε
						</p>
					</div>
					<br class="clear" />
				</div>
			</div>
			<div id="copyright">
				&copy; Project 1 | Template Designed by <a href="http://www.freecsstemplates.org/">FCT</a>
|			 Edited by Giannis Halvatzakis &amp; Manolis Ragkousis</div>
		</div>
	</body>
</html>
