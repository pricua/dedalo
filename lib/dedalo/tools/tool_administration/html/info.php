<?php
require_once( dirname(dirname(dirname(dirname(__FILE__)))).'/config/config4.php');

# LOGIN VERIFICATION
if(login::is_logged()!==true) die("<span class='error'> Auth error: please login </span>");

	
phpinfo();