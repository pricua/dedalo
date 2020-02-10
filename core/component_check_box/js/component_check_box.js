// imports
	import {component_common} from '../../component_common/js/component_common.js'
	import {render_component_check_box} from '../../component_check_box/js/render_component_check_box.js'
	import {common} from '../../common/js/common.js'



export const component_check_box = function(){

	// element properties declare
		this.model
		this.tipo
		this.section_tipo
		this.section_id
		this.mode
		this.lang

		this.section_lang
		this.context
		this.data
		this.parent
		this.node
		this.id

	return true
}//end component_check_box



/**
* COMMON FUNCTIONS
* extend component functions from component common
*/
// prototypes assign
	component_check_box.prototype.init 	 			= component_common.prototype.init
	component_check_box.prototype.destroy 	 		= common.prototype.destroy
	component_check_box.prototype.save 	 			= component_common.prototype.save
	component_check_box.prototype.load_data 		= component_common.prototype.load_data
	component_check_box.prototype.get_value 		= component_common.prototype.get_value
	component_check_box.prototype.set_value 		= component_common.prototype.set_value
	component_check_box.prototype.update_data_value = component_common.prototype.update_data_value
	component_check_box.prototype.update_datum		= component_common.prototype.update_datum
	component_check_box.prototype.change_value 		= component_common.prototype.change_value

	// render
	component_check_box.prototype.build 		= component_common.prototype.build
	component_check_box.prototype.render 		= common.prototype.render
	component_check_box.prototype.refresh 		= common.prototype.refresh
	component_check_box.prototype.list 			= render_component_check_box.prototype.list
	component_check_box.prototype.edit 			= render_component_check_box.prototype.edit
	component_check_box.prototype.edit_in_list	= render_component_check_box.prototype.edit
	component_check_box.prototype.rebuild_nodes = component_common.prototype.rebuild_nodes
	component_check_box.prototype.change_mode 	= component_common.prototype.change_mode




/**
* GET_CHANGED_KEY
*/
component_check_box.prototype.get_changed_key = function(action, value) {

	const self = this

	if (action==='insert') {
		// insert value

		// check if value already exists
		const ar_found = self.data.value.filter(item => item.section_id===value.section_id && item.section_tipo===value.section_tipo)
		if (ar_found.length>0) {
			console.warn("Ignored to add value because already exists:", value);
			return false
		}

		// component common add value and save (without refresh)
			return self.data.value.length || 0

	}else{
		// remove value

		const value_key = self.data.value.findIndex( (item) => {
			return (item.section_id===value.section_id && item.section_tipo===value.section_tipo)
		})
		if (value_key===-1) {
			console.warn("Error. item not found in values:", value);
			return false
		}

		return value_key
	}

	return false
}//end get_changed_key



/**
* ADD_VALUE
* @param object value (locator)
* @return bool
*//*
component_check_box.prototype.add_value = function(value) {

	const self = this

	const ar_found = self.data.value.filter(item => item.section_id===value.section_id && item.section_tipo===value.section_tipo)
	if (ar_found.length>0) {
		console.log("Ignored to add value because already exists:", value);
		return false
	}

	// add to instance value
	//self.data.value.push(value)

	// changed_data update
	self.data.changed_data = {
		key	  : self.data.value.length,
		value : value
	}
	self.update_datum()

	return true
}//end add_value
*/



/**
* REMOVE_VALUE
* @param object value (locator)
* @return bool
*//*
component_check_box.prototype.remove_value = function(value) {

	const self = this

	let deleted = false

	const key = self.data.value.findIndex( (item) => {
		return (item.section_id===value.section_id && item.section_tipo===value.section_tipo)
	})

	if (key===-1) {
		console.error("Error. item not found in values:", value);
	}else{
		// changed_data update
		self.data.changed_data = {
			key	  : key,
			value : null //value
		}
		//self.data.value.splice(key, 1)
		self.update_datum()
		deleted = true
	}


	return deleted
}//end remove_value
*/




