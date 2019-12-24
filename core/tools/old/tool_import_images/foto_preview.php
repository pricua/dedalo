<?php
$TOP_TIPO=false;
require_once( DEDALO_CONFIG_PATH .'/config.php');
require_once( DEDALO_CORE_PATH . '/media_engine/class.ImageObj.php');

$photo = safe_xss($_REQUEST['f']);

# Accept images with get vars
$ar = explode('?', $photo);
if (isset($ar[0])) {
	$photo = $ar[0];
}

# Imagemagick path
/*
echo "<pre>";
system("type convert"); 
echo "</pre>";
*/


/*
$cmd = MAGICK_PATH . 
"convert '$photo' ".
#"-background black -layers -flatten ".
"-strip ".
"-thumbnail 260x400 " .
#"-unsharp 0.2x0.6+1.0 ".
"-quality 100 JPG:-";
*/
#echo ImageMagick::test_image_magick($info=true);
#echo $cmd;die();



# IDENTIFY : Get info aboout source file Colorspace
$colorspace_info  = shell_exec( MAGICK_PATH . "identify -format '%[colorspace]' " .$photo. "[0]" );
	#dump($colorspace_info,'colorspace_info');

#
# FLAGS : Command flags
#
$flags='';
switch (true) {
	
	# CMYK to RGB
	# Si la imagen orgiginal es CMYK, la convertimos a RGB aignándole un perfil de salida para la conversión. Una vez convertida (y flateada en caso de psd)
	# le eliminamos el perfil orginal (cmyk) para evitar incoherencia con el nuevo espacio de color (rgb)
	case ( strpos($colorspace_info, 'CMYK')!==false ):

		# Profile full path
		$profile_file = COLOR_PROFILES_PATH.'sRGB_Profile.icc';

		# Test profile exists
		if(!file_exists($profile_file)) throw new Exception("Error Processing Request. Color profile not found in: $profile_file", 1);				

		# Command flags				
		$flags 			.= "-profile \"$profile_file\" "; #-negate.
		break;
	
	# RBG TO RBG
	default:
		$flags 			.= " ";
		break;
}


#$cmd = MAGICK_PATH . "convert \"$photo\" $flags -flatten -strip -thumbnail 260x400 -quality 100 JPG:-";	# -negate -profile Profiles/sRGB.icc -colorspace sRGB -colorspace sRGB 
$cmd = MAGICK_PATH . "convert \"$photo\" $flags -flatten -strip -thumbnail 400x260 -quality 100 JPG:-";
	#if(SHOW_DEBUG) dump($cmd,'ImageMagick cmd');




header("Content-type: image/jpeg");
passthru($cmd, $retval);
?>