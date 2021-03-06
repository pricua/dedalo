<?php
	
	# CONTROLLER

	$tipo 					= $this->get_tipo();
	$parent 				= $this->get_parent();
	$modo					= $this->get_modo();
	$lang					= $this->get_lang();
	$section_tipo 			= $this->get_section_tipo();
	$propiedades			= $this->get_propiedades();	
	$dato 					= $this->get_dato();
	$valor					= $this->get_valor();
	$dato_reference_lang 	= null;
	$traducible 			= $this->get_traducible();
	$label 					= $this->get_label();
	$required				= $this->get_required();
	$debugger				= $this->get_debugger();
	$permissions			= $this->get_component_permissions();
	$ejemplo				= $this->get_ejemplo();
	$html_title				= "Info about $tipo";
	$identificador_unico	= $this->get_identificador_unico();
	$component_name			= get_class($this);
	$visible				= $this->get_visible();
	$file_name				= $modo;
	
	if($permissions===0) return null;
	
	# Verify component content record is inside section record filter
	if ($this->get_filter_authorized_record()===false) return null ;
	
echo "123"; return "123";

	switch($modo) {		
		
		case 'edit_in_list':
				// Fix always edit as modo / filename				
				$file_name	= 'edit';

				$wrap_style = '';	// 'width:100%'; // Overwrite possible custon component structure css
				// Dont break here. Continue as modo edit		
		case 'tool_lang':
				$file_name = 'edit';

				// Role .
				$source_lang = DEDALO_DATA_LANG;
				if ($lang===$source_lang) {
					$role = "source_lang";
				}else{
					$role = "tranlation_lang";
				}			
				
		case 'edit'	:
				$id_wrapper 	= 'wrapper_'.$identificador_unico;
				$input_name 	= "{$tipo}_{$parent}";
				$dato_json 		= json_handler::encode($dato);				
				$component_info = $this->get_component_info('json');
				
				# DATO_REFERENCE_LANG
				$default_component = null;
				
				# Check if the compoment is mandatory
				$mandatory 		= (isset($propiedades->mandatory) && $propiedades->mandatory===true) ? true : false;
				$mandatory_json = json_encode($mandatory);

				#Check unique value
				$unique 					= (isset($propiedades->unique->check) && $propiedades->unique->check===true) ? true : false;
				$unique_json				= json_encode($unique);
				$unique_disable_save 		= (isset($propiedades->unique->disable_save) && $propiedades->unique->disable_save===true) ? true : false;
				$unique_disable_save_json	= json_encode($unique_disable_save);
				
				$propiedades_json 	= json_encode($propiedades);
				$context 			= $this->get_context();
				$context_name 		= isset($context->context_name) ? $context->context_name : 'default';

				$with_lang_versions = isset($propiedades->with_lang_versions) ? $propiedades->with_lang_versions : false;			
				
				/*
				* JSON version of the component
				*/
				$json_context = '@context';
				$json_component = new stdClass();
				$json_component->$json_context	= new stdClass();
				$json_component->data			= new stdClass();
				$json_component->data->dato 		= $dato;
				$json_component->data->value 		= $valor;
				$json_component->$json_context->tipo 			= $tipo;
				$json_component->$json_context->translated 		= $traducible;
				$json_component->$json_context->model 			= $component_name;
				$json_component->$json_context->properties		= $propiedades;
				$json_component->$json_context->label			= $label;
				$json_component->$json_context->section_id		= $parent;
				$json_component->$json_context->lang			= $lang;
				$json_component->$json_context->section_tipo	= $section_tipo;
				break;

		case 'print' :
				#$dato = htmlentities($dato);
				break;
				
		case 'portal_list':
				if(empty($valor)) return null;

		case 'list_tm' :
				$file_name = 'list';
				# use list file to render value
										
		case 'list'	:
				if(empty($valor)) return null;	
				break;
						
		case 'list_of_values':
				break;

		case 'relation':
				$file_name  = 'list';
				break;
						
		case 'lang'	:
				break;
		
		case 'search':
				# dato is injected by trigger search wen is needed
				$dato 				= isset($this->dato) ? $this->dato : [''];
				$search_input_name 	= $this->get_search_input_name();
				break;
						
		case 'list_thesaurus':
				$render_vars = $this->get_render_vars();
					#dump($render_vars, ' render_vars ++ '.to_string());
				$icon_label = isset($render_vars->icon) ? $render_vars->icon : '';
				break;						
	}
	

	$page_html	= dirname(__FILE__) . '/html/' . $component_name . '_' . $file_name . '.phtml';
	if( !include($page_html) ) {
		echo "<div class=\"error\">Invalid mode $this->modo</div>";
	}
