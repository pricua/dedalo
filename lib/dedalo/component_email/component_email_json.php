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
			$item = new stdClass();
				$item->section_id 			= $this->get_section_id();
				$item->tipo 				= $this->get_tipo();
				$item->from_component_tipo 	= isset($this->from_component_tipo) ? $this->from_component_tipo : $item->tipo;
				$item->section_tipo 		= $this->get_section_tipo();
				$item->value 				= $this->get_dato();

			$data[] = $item;

	}//end if($options->get_data===true && $permissions>0)



// JSON string
	return common::build_element_json_output($context, $data);