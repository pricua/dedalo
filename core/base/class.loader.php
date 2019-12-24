<?php
/*
	LOADER DEDALO COMPONENTS
*/
include(DEDALO_CORE_PATH . '/base/class.Error.php');
include(DEDALO_CORE_PATH . '/db/class.DBi.php');
include(DEDALO_CORE_PATH . '/db/class.RecordObj_matrix.php');
include(DEDALO_CORE_PATH . '/db/class.JSON_RecordObj_matrix.php');
include(DEDALO_CORE_PATH . '/db/class.RecordObj_time_machine.php');
include(DEDALO_CORE_PATH . '/db/class.RecordObj_dd.php');
include(DEDALO_CORE_PATH . '/db/class.RecordObj_descriptors_dd.php');
include(DEDALO_CORE_PATH . '/db/class.json_handler.php');
include(DEDALO_CORE_PATH . '/common/class.common.php');
include(DEDALO_CORE_PATH . '/common/class.lang.php');
include(DEDALO_CORE_PATH . '/common/class.navigator.php');
include(DEDALO_CORE_PATH . '/common/class.filter.php');
include(DEDALO_CORE_PATH . '/common/class.counter.php');
include(DEDALO_CORE_PATH . '/common/class.tools.php');
include(DEDALO_CORE_PATH . '/common/class.label.php');
include(DEDALO_CORE_PATH . '/common/class.TR.php');
#include(DEDALO_CORE_PATH . '/common/class.operator.php');
include(DEDALO_CORE_PATH . '/common/class.locator.php');
include(DEDALO_CORE_PATH . '/common/class.dd_date.php');
include(DEDALO_CORE_PATH . '/common/class.layout_map.php');# new 12-06-2019
include(DEDALO_CORE_PATH . '/common/class.dd_object.php'); # new 12-06-2019
#include(DEDALO_CORE_PATH . '/common/class.relation.php');
include(DEDALO_CORE_PATH . '/component_common/class.component_common.php');
include(DEDALO_CORE_PATH . '/component_relation_common/class.component_relation_common.php');
include(DEDALO_CORE_PATH . '/search/class.search.php');
include(DEDALO_CORE_PATH . '/api/v1/common/class.dd_core_api.php');
include(DEDALO_CORE_PATH . '/api/v1/common/class.dd_utils_api.php');



class class_loader {


	public function __construct() {

		# Check if PHP versiion is supported
		#self::test_php_version_supported();

		spl_autoload_extensions('.php');
		spl_autoload_register(array($this, 'loader'));
	}


	private static function loader($className) {

		switch (true) {

			case ($className==='tools_register'):
				$file_path	= DEDALO_CORE_PATH . '/tool_common/class.tools_register.php';
				break;

			case (strpos($className, 'tool_')!==false):
				$file_path	= DEDALO_CORE_PATH . '/tools/' . $className . '/class.' . $className . '.php';
				break;

			case (strpos($className, 'diffusion_')!==false):
				$file_path	= DEDALO_CORE_PATH . '/diffusion/' . $className . '/class.' . $className . '.php';
				break;

			case (strpos($className, 'Smalot')!==false):
			case (strpos($className, 'Zend')!==false):
				# Nothint to do
				return;
				break;

			case (strpos($className, 'default')!==false):
				if(SHOW_DEBUG===true) {
					$bt = debug_backtrace();
					echo "<pre>";
					print_r($bt);
					echo "</pre>";
					die();
				}
				# Nothint to do
				return;
				break;

			case (strpos($className, 'Error')!==false):
				$file_path	= DEDALO_CONFIG_PATH . '/class.Error.php';
				break;

			default:
				# Folder base dedalo lib
				$file_path	= DEDALO_CORE_PATH . '/' . $className . '/class.' . $className . '.php';
				break;
		}

		if ( !include($file_path) ) {
			if(SHOW_DEBUG===true) {
				$bt = debug_backtrace();
				dump($bt, ' ERROR ON LOADER INCLUDE FILE !! bt ++ '.to_string($file_path));
				die();
			}
			throw new Exception(__METHOD__ . "<hr> A loader call was made to class <b>$className</b><br> File not exits at: <b>$file_path</b><br>
				Please, remember require this file in main class (like component_common) or create standar dedalo lib path folder
				like '/component_input_text/class.component_input_text.php' for loader calls. ");
		}

	}#end loader



	# Test if PHP versiion is supported
	static private function test_php_version_supported() {

		static $php_version_supported;

		if(isset($php_version_supported)) {
			return ($php_version_supported);
		}

		$current_php_version		= phpversion();
		$minimun_php_version		= '7.2.0';


		$ar_current_php_version = explode('.',$current_php_version);
		$ar_minimun_php_version = explode('.',$minimun_php_version);

		if ($ar_current_php_version[1]<4) {
			trigger_error("PHP version $current_php_version is not full compatible with this application. Please update ASAP to PHP 7.2");
		}

		if(	$ar_current_php_version[0] < $ar_minimun_php_version[0] ||
			($ar_current_php_version[0] === $ar_minimun_php_version[0] && $ar_current_php_version[1] < $ar_minimun_php_version[1])
		  )
		  throw new Exception( " This PHP version (".phpversion().") is not supported ! Please update your PHP to $minimun_php_version or higher ASAP ");

		$php_version_supported = true;
	}//end test_php_version_supported



};


# LOAD . Auto Init class
$autoloader	= new class_loader();


# INIT NAVIGATOR
$navigator	= new navigator();

/*
if (!defined('DEDALO_STRUCTURE_LANG')) {
	define('DEDALO_STRUCTURE_LANG', 'lg-spa');
	#error_log("--> WARNING: Constant 'DEDALO_STRUCTURE_LANG' is not defined in config. Please set ASAP");
	debug_log(__METHOD__."Loader: Constant 'DEDALO_STRUCTURE_LANG' is not defined in config. Please set ASAP ()".to_string(), logger::DEBUG);
}
*/
