<?php
// JSON data controller



// configuration vars
	$tipo				= $this->get_tipo();
	$permissions		= common::get_permissions($tipo, $tipo);
	$modo				= $this->get_modo();



// context
	$context = [];


	if($options->get_context===true){
		switch ($options->context_type) {
			case 'simple':
				// Component structure context_simple (tipo, relations, properties, etc.)
				$context[] = $this->get_structure_context_simple($permissions);
				break;

			default:
				// Component structure context (tipo, relations, properties, etc.)
					$context[] = $this->get_structure_context($permissions, $sqo_context=false);

				// subcontext from element layout_map items
					$ar_subcontext = $this->get_ar_subcontext();
					foreach ($ar_subcontext as $current_context) {
						$context[] = $current_context;
					}
				break;
		}
	}//end if($options->get_context===true)



// data
	$data = [];

	if($options->get_data===true && $permissions>0){



		// subdata
		// default locator build with this section params
			 $section_id 	= $this->get_section_id();
			 $section_tipo 	= $this->get_tipo();

			 $locator = new locator();
			 	$locator->set_section_tipo($section_tipo);
			 	$locator->set_section_id($section_id);

			 $value = [$locator];

		// subdata add
			 $data = $this->get_ar_subdata($value);

	}// end if $permissions > 0



// JSON string
	return common::build_element_json_output($context, $data);
