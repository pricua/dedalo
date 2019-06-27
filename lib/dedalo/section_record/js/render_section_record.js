/**
* Render_component
* Manages the component's logic and apperance in client side
*/
export const render_section_record = function(options) {

	this.model = "section_record"

	this.context 			= options.context
	this.data 				= options.data

}//end render_section_record


/**
* LIST
* Render node for use in list
* @return DOM node
*/
render_section_record.prototype.list = function(options) {

	const self = this

	// Options vars 
		const context 			= self.context
		const data 				= self.data
		const node_type 		= "div"
		const node_class_name 	= this.model + "_list"
	
	// Value as string 
		const value_string = data.value.join(' | ')

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
}//end list



/**
* EDIT
* Render node for use in edit
* @return DOM node
*/
render_section_record.prototype.edit = function(options) {
	
	const self = this
	//console.log("context:",self);
	// Options vars 
		const context 			= self.context
		const data 				= self.data || []
		const value 			= data.value
		const label 			= context.label
		const node_type 		= "div"
		const model 			= context.model
		const mode 				= 'edit'
		const node_class_name 	= model + "_" + mode
		const tipo 				= context.tipo
		const section_id 		= data.section_id

	// Value as string 
		const value_string = data.value.join(' | ')

	// wrapper
		const wrapper = common.create_dom_element({
				element_type	: 'div',
				class_name		: 'wrapper_component ' + model + ' ' + tipo + ' ' + mode + ' ' + section_id
			})

	// label 
		const component_label = common.create_dom_element({
				element_type	: 'div',
				class_name		: 'label',
				text_content 	: label,
				parent 			: wrapper
			})

	// content_data 
		const content_data = common.create_dom_element({
				element_type	: 'div',
				class_name		: 'content_data',
				parent 			: wrapper
			})

	// inputs
		const value_length = value.length
		for (var i = 0; i < value_length; i++) {
						
			const input = common.create_dom_element({
				element_type	: 'input',
				type 			: 'text',				
				value 			: value[i],
				parent 			: content_data
			})
			//input.setAttribute('value', value[i]);
		}

	// Debug
		//console.log("++ context", context);
		//console.log("++ data:", data);

	return wrapper
}//end edit