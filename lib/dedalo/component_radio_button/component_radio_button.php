<?php

	# CONTROLLER

	$tipo 					= $this->get_tipo();
	$parent 				= $this->get_parent();
	$section_tipo			= $this->get_section_tipo();
	$propiedades			= $this->get_propiedades();
	$modo					= $this->get_modo();
	$label 					= $this->get_label();
	$required				= $this->get_required();
	$debugger				= $this->get_debugger();
	$permissions			= $this->get_component_permissions();
	$ejemplo				= NULL;
	$html_title				= "Info about $tipo";
	$lang					= $this->get_lang();
	$identificador_unico	= $this->get_identificador_unico();
	$component_name			= get_class($this);
	$relation_type 			= $this->relation_type;

	if($permissions===0) return null;

	# Verify component content record is inside section record filter
	if ($this->get_filter_authorized_record()===false) return NULL ;

	# case is_developer control
	if ($tipo===DEDALO_USER_DEVELOPER_TIPO) {
		if($_SESSION['dedalo4']['auth']['user_id']!=DEDALO_SUPERUSER) {
			$permissions = 1; # Force permissions to read only except for dedalo superuser
		}
	}

	$file_name = $modo;
	$from_modo = $modo;


	switch($modo) {

		case 'edit_in_list':
				$file_name = 'edit';
				$wrap_style 	= '';	// 'width:100%'; // Overwrite possible custon component structure css
				// Dont break here. Continue as modo edit	

		case 'edit' :
				$dato 				= $this->get_dato();
				$dato_json 			= json_encode($dato);
				$value 				= $this->get_valor();
				$referenced_tipo 	= $this->get_referenced_tipo();
				$ar_list_of_values	= $this->get_ar_list_of_values2();
				$id_wrapper 		= 'wrapper_'.$identificador_unico;
				#$input_name 		= "{$tipo}_{$parent}";
				$input_name 		= 'radio_button_'.$identificador_unico;
				$js_code			= $this->generate_js();
				$component_info 	= $this->get_component_info('json');

				$mandatory 			= (isset($propiedades->mandatory) && $propiedades->mandatory===true) ? true : false;
				$mandatory_json 	= json_encode($mandatory);
				break;

		case 'tool_time_machine' :
				$dato 				= $this->get_dato();
				$dato_string		= $this->get_dato_as_string();
				$dato_json 			= json_encode($dato);
				$file_name 			= 'edit';
				$id_wrapper 		= 'wrapper_'.$identificador_unico.'_tm';
				$input_name 		= "{$tipo}_{$parent}_tm";
				break;

		case 'search' :
				# dato is injected by trigger search wen is needed
				$dato = isset($this->dato) ? $this->dato : null;

				$referenced_tipo 	= $this->get_referenced_tipo();
				$ar_list_of_values	= $this->get_ar_list_of_values2();

				# q_operator is injected by trigger search2
				$q_operator = isset($this->q_operator) ? $this->q_operator : null;

				# Search input name (var search_input_name is injected in search -> records_search_list.phtml)
				# and recovered in component_common->get_search_input_name()
				# Normally is section_tipo + component_tipo, but when in portal can be portal_tipo + section_tipo + component_tipo
				$search_input_name = $this->get_search_input_name().'_'.md5(microtime(true));
				break;

		case 'portal_list' :
				$file_name = 'list';

		case 'list_tm' :
				$file_name = 'list';

		case 'list' :
				$dato 				= $this->get_dato();
				$dato_string		= $this->get_dato_as_string();
				$dato_json 			= json_encode($dato);
				$valor  			= $this->get_valor();
				$referenced_tipo 	= $this->get_referenced_tipo();
				$ar_list_of_values	= $this->get_ar_list_of_values2();
				$id_wrapper 		= 'wrapper_'.$identificador_unico;
				$input_name 		= 'radio_button_'.$identificador_unico;
				$js_code			= $this->generate_js();
				$component_info 	= $this->get_component_info('json');
				break;

		case 'print' :
				$valor = $this->get_valor();
				break;

		case 'list_thesaurus':
				$render_vars 	= $this->get_render_vars();
				$icon_label 	= isset($render_vars->icon) ? $render_vars->icon : '';
				break;
	}


	$page_html	= DEDALO_LIB_BASE_PATH .'/'. get_class($this) . '/html/' . get_class($this) . '_' . $file_name . '.phtml';
	if( !include($page_html) ) {
		echo "<div class=\"error\">Invalid mode $this->modo</div>";
	}
