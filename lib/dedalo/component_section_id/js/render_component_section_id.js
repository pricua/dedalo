/**
* Render_component
* Manages the component's logic and apperance in client side
*/
var render_component_section_id = new function() {


	'use strict'


	this.model = "component_section_id"


	/**
	* LIST
	* Render node for use in list
	* @return DOM node
	*/
	this.list = function(options) {

		// Options vars 
			const context 			= options.context
			const data 				= options.data			
			const node_class_name 	= this.model + "_list"
		
		// Value as string 
			const value = data.value

		const href =  DEDALO_LIB_BASE_URL + "/main/?t="+context.section_tipo +"&id=" + value

		// Node create
			const node = common.create_dom_element({
				element_type	: "a",
				class_name		: node_class_name,
				text_content 	: value				
			})
			node.setAttribute("href",href)
			node.setAttribute("target","_blank")

		return node
	}//end list



	/**
	* EDIT
	* Render node for use in edit
	* @return DOM node
	*/
	this.edit = function(options) {
		
		// Options vars 
			const context 			= options.context
			const data 				= options.data
			const node_type 		= "div"
			const node_class_name 	= this.model + "_edit"
		
		// Value as string 
			const value_string = "Hello world " + this.model

		// Node create
			const node = common.create_dom_element({
				element_type	: node_type,
				class_name		: node_class_name,
				text_content 	: value_string
			})

		// Debug
			//console.log("++ context", context);
			//console.log("++ data:", data);

		return node
	}//end edit



}//end render_component_section_id