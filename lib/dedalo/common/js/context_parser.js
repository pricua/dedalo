import * as instances from '/dedalo/lib/dedalo/common/js/instances.js'



export const context_parser = function(options){

	this.childrens 		= options.childrens
	this.section_id		= options.section_id
	this.root_tipo		= options.root_tipo
	this.root_node		= options.root_node
	this.section_lang 	= options.section_lang
}


//main render
context_parser.prototype.render = function(){

	const self = this

	const childrens 		= self.childrens
	const childrens_length 	= childrens.length
	const render_promises = []

	//iterate elements
	const parsed = new Promise(function(resolve){

		
		for (let i = 0; i < childrens_length; i++) {	
			
			const current_children = childrens[i]

			// init item
				const item_options = {
					model 			: current_children.model,
					tipo 			: current_children.tipo,
					section_tipo	: current_children.section_tipo,
					section_id		: self.section_id,
					mode			: current_children.mode,
					lang			: current_children.lang,
					section_lang	: self.section_lang,
				}

			// intance element
				const current_instance = instances.get_instance(item_options).then(function(item_instance){

					// render
						return item_instance.render().then(function(current_node){							
							if (current_node) {
								self.root_node.appendChild(current_node)
							}
							resolve(true)					
						
						})// end render

				})// end instance

				render_promises.push(current_instance)
		}//end for


		return Promise.all(render_promises)

	})//end Promise

	return parsed
}

