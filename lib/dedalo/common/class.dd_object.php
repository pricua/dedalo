<?php


/**
* CLASS DD_OBJECT
*/
class dd_object extends stdClass {

	// Format
		# typo				: "ddo"  (ddo | sqo)
		# type				: "component"  (section | component | groupper | button)
		# tipo 				: 'oh14',
		# section_tipo 		: 'oh1',		
		# parent 			: 'oh2', // structure parent
		# ddo_parent 		: 'oh1'
		# lang 				: 'lg-eng',	
		# label 			: 'Title'	
		# mode 				: "list",
		# model				: 'component_input_text',		
		# properties 		: {}
		# permissions 		: 1
		# translatable 		: true


	/**
	* __CONSTRUCT
	* @param object $data 
	*	optional . Default is null
	*/
	public function __construct( $data=null ) {

		if (is_null($data)) return;

		# Nothing to do on construct (for now)
		if (!is_object($data)) {
			trigger_error("wrong data format. Object expected. Given: ".gettype($data));
			return false;
		}
		foreach ($data as $key => $value) {			
			$method = 'set_'.$key;
			$this->{$method}($value);
		}

		// set typo always
			$this->set_typo('ddo');
	
		// resolve type
			$model = $this->model;
			if (strpos($model, 'component_')===0) {
				$type = 'component';
			}elseif ($model==='section') {
				$type = 'section';
			}elseif (in_array($model, section::get_ar_grouper_models())) {
				$type = 'grouper';			
			}elseif (strpos($model, 'button_')===0) {
				$type = 'button';
			}else{
				debug_log(__METHOD__." UNDEFINED model: $model - ".$this->get_tipo(), logger::ERROR);
				throw new Exception("Error Processing Request", 1);				
				return false;
			}
			$this->set_type($type);

		return true;
	}//end __construct



	/**
	* SET  METHODDS
	* Verify values and set property to current object
	*/
	
	/**
	* SET_TIPO
	*/
	public function set_tipo(string $value) {
		if(!RecordObj_dd::get_prefix_from_tipo($value)) {
			throw new Exception("Error Processing Request. Invalid tipo: $value", 1);
		}
		$this->tipo = $value;
	}
	/**
	* SET_SECTION_TIPO
	*/
	public function set_section_tipo(string $value) {
		if(!RecordObj_dd::get_prefix_from_tipo($value)) {
			throw new Exception("Error Processing Request. Invalid section_tipo: $value", 1);
		}
		$this->section_tipo = $value;
	}	
	/**
	* SET_PARENT
	*/
	public function set_parent(string $value) {
		if(!RecordObj_dd::get_prefix_from_tipo($value)) {
			throw new Exception("Error Processing Request. Invalid parent: $value", 1);
		}
		$this->parent = $value;
	}
	/**
	* SET_LANG
	*/
	public function set_lang(string $value) {
		if(strpos($value, 'lg-')!==0) {
			throw new Exception("Error Processing Request. Invalid lang: $value", 1);
		}
		$this->lang = $value;
	}
	/**
	* SET_MODE
	*/
	public function set_mode(string $value) {

		$this->mode = $value;
	}
	/**
	* SET_MODEL
	*/
	public function set_model(string $value) {
		
		$this->model = $value;
	}
	/**
	* SET_TYPO
	*/
	public function set_typo(string $value) {
		if($value!=='ddo') {
			debug_log(__METHOD__." Error. Fixed invalid typo ".to_string($value), logger::DEBUG);
			$value = 'ddo';
		}
		$this->typo = $value;
	}	
	/**
	* SET_TYPE
	* Only allow 'section','component','groupper','button'
	*/
	public function set_type(string $value) {
		$ar_allowed = ['section','component','groupper','button'];
		if( !in_array($value, $ar_allowed) ) {
			throw new Exception("Error Processing Request. Invalid locator type: $value. Only are allowed: ".to_string($ar_allowed), 1);
		}
		$this->type = $value;
	}
	/**
	* SET_PROPERTIES
	* Note hint parameter 'object' is not supported bellow php 7.2
	* @see https://php.net/manual/en/functions.arguments.php#functions.arguments.type-declaration
	*/
	public function set_properties($value) {
		
		$this->properties = $value;
	}
	/**
	* SET_PERMISSIONS
	*/
	public function set_permissions(int $value) {
		
		$this->permissions = $value;
	}
	/**
	* SET_LABEL
	*/
	public function set_label(string $value) {
		
		$this->label = $value;
	}
	/**
	* SET_TRANSLATABLE
	*/
	public function set_translatable(bool $value) {
		
		$this->translatable = $value;
	}
	/**
	* SET_DDO_PARENT
	*/
	public function set_ddo_parent(string $value) {
		
		$this->ddo_parent = $value;
	}


}
?>