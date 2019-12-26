// import
	import {ui} from '../../common/js/ui.js'



/**
* RENDER_inspector
* Manages the component's logic and apperance in client side
*/
export const render_inspector = function() {

	return true
}//end render_inspector



/**
* EDIT
* Render node for use in edit
* @return DOM node wrapper
*/
render_inspector.prototype.edit = async function(options={render_level : 'full'}) {

	const self = this

	const render_level = options.render_level

	// content data
		const current_content_data = await content_data(self)
		if (render_level==='content') {
			return current_content_data
		}

	// wrapper
		const wrapper = ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'wrapper_inspector text_unselectable',
		})

	// label
		const label = ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'label',
			inner_html 		: 'Inspector',
			parent 			: wrapper
		})

	// add paginator_content
		wrapper.appendChild(current_content_data)

	// events
	//	add_wrapper_events(wrapper, self)


		// console.log("self.caller:",self);

		// event_manager.subscribe('render_'+self.caller.id, function(node){
		// 	alert("2");
		// })

		// 	const time_info = "" +
		// 	"Total time: " + response.debug.exec_time +
		// 	"<br>Context exec_time: " + response.result.debug.context_exec_time +
		// 	"<br>Data exec_time: " + response.result.debug.data_exec_time  + "<br>"

		// const time_info_pre = ui.create_dom_element({
		// 	element_type : "pre",
		// 	class_name   : "total_time",
		// 	id   		 : "total_time",
		// 	inner_html   : time_info,
		// 	parent 		 : debug
		// })


	return wrapper
}//end edit



/**
* ADD_WRAPPER_EVENTS
* Attach element generic events to wrapper
*/
const add_wrapper_events = (wrapper, self) => {

	// mousedown
		wrapper.addEventListener("mousedown", function(e){
			e.stopPropagation()
			//e.preventDefault()
			// prevent buble event to container element
			return false
		})


	return true
}//end add_wrapper_events



/**
* CONTENT_DATA
* @return DOM node content_data
*/
const content_data = async function(self) {

	// content_data
		const content_data = ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'content_data inspector_content_data',
		})

	// paginator container
		const paginator_container = ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'paginator_container',
			parent 			: content_data
		})

	// project container
		const project_container = ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'project_container',
			parent 			: content_data
		})



	return content_data
}// end content_data

