function validateForm()
{
var a=document.forms["form"]["email"].value;
var b=document.forms["form"]["first_name"].value;
var c=document.forms["form"]["last_name"].value;
var d=document.forms["form"]["message"].value;
var atpos=a.indexOf("@");
var dotpos=a.lastIndexOf(".");
if ((atpos<1 || dotpos<atpos+2 || dotpos+2>=a.length) && a.length>0)
  {
  alert("Not a valid e-mail address");
  return false;
  }
if (b.length==0||c.length==0||d.length==0)
{
	alert("Please complete all the required fields");
	return false;
	
}

}
