<?php
// JSON data component controller



// component configuration vars
	$permissions		= $this->get_component_permissions();
	$modo				= $this->get_modo();



// context
	$context = [];

	if($options->get_context===true){

		// Component structure context (tipo, relations, properties, etc.)
			$context[] = $this->get_structure_context($permissions);

	}//end if($options->get_context===true)



// data
	$data = [];
	
	if($options->get_data===true && $permissions>0){
	
		// Value
		$value = component_common::extract_component_value_fallback($this, $lang=DEDALO_DATA_LANG, $mark=false, $main_lang=DEDALO_DATA_LANG_DEFAULT);

		// data item
		$item  = $this->get_data_item($value);

		$data[] = $item;
		
	}//end if($options->get_data===true && $permissions>0)
	


// JSON string
	return common::build_element_json_output($context, $data);