/*global get_label, page_globals, SHOW_DEBUG, DEDALO_CORE_URL*/
/*eslint no-undef: "error"*/



// imports
	import {common} from '../../common/js/common.js'
	import {component_common} from '../../component_common/js/component_common.js'
	import {render_component_image} from '../../component_image/js/render_component_image.js'



export const component_image = function(){

	this.id

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


	return true
}//end component_image



/**
* COMMON FUNCTIONS
* extend component functions from component common
*/
// prototypes assign
	component_image.prototype.init 	 		= component_common.prototype.init
	component_image.prototype.build 	 	= component_common.prototype.build
	component_image.prototype.destroy 	 	= common.prototype.destroy
	component_image.prototype.save 	 		= component_common.prototype.save
	component_image.prototype.load_data 	= component_common.prototype.load_data
	component_image.prototype.load_datum 	= component_common.prototype.load_datum
	component_image.prototype.get_value 	= component_common.prototype.get_value
	component_image.prototype.set_value 	= component_common.prototype.set_value

	// render
	component_image.prototype.render 	= common.prototype.render
	component_image.prototype.list 		= render_component_image.prototype.list
	component_image.prototype.edit 		= render_component_image.prototype.edit

