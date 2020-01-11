


// import
	import {event_manager} from '../../common/js/event_manager.js'
	import {ui} from '../../common/js/ui.js'
	import {data_manager} from '../../common/js/data_manager.js'




/**
* render_menu
* Manages the component's logic and apperance in client side
*/
export const render_menu = function() {

	return true
}//end render_menu



/**
* EDIT
* Render node for use in edit
* @return DOM node wrapper
*/
render_menu.prototype.edit = async function() {

	const self = this

	const fragment = new DocumentFragment()

	// menu_wrapper
		self.menu_active = false
		const menu_wrapper = document.createElement("div")
			  menu_wrapper.classList.add("menu_wrapper")
			  // click do global click action on the menu items
				menu_wrapper.addEventListener("click", e => {
					// first menu items only (when the ul is menu)
						if (self.menu_active===true) {
							close_all_drop_menu(self);
							self.menu_active = false

						}else{
							close_all_drop_menu(self);
							const main_li 	= e.target.parentNode
							const nodes_li 	= self.li_nodes
							const len		= nodes_li.length

							const open_id =  main_li.dataset.children
							const open_ul = document.getElementById(open_id)
							open_ul.classList.remove("menu_ul_hidden");
							open_ul.classList.add("menu_ul_displayed");
							open_ul.style.left = (main_li.getBoundingClientRect().left+'px')

							for (let i = len - 1; i >= 0; i--) {
								nodes_li[i].classList.add("menu_li_inactive");
								nodes_li[i].classList.remove("menu_li_active");

								if(nodes_li[i] == main_li){
									
									nodes_li[i].classList.add("menu_li_active");
									nodes_li[i].classList.remove("menu_li_inactive");
								}
							}
							event.stopPropagation();
							self.menu_active = true
						}
					})


	// Quit
		const quit = ui.create_dom_element({
			element_type	: 'div',
			id 				: 'quit',
			parent 			: fragment
		})
		quit.addEventListener("click", () =>{
			login.quit()
		})


	// Logo
		const dedalo_icon = ui.create_dom_element({
			element_type	: 'div',
			id 				: 'dedalo_icon_top',
			parent 			: fragment
		})


	// Hierarchy

		const hierarchy = ui.create_dom_element({
				element_type	: 'div',
				id 				: 'menu_hierarchy',
				parent 			: fragment,

			})

		level_hierarchy({	self			: self,
							datalist 		: self.data.tree_datalist,
							root_ul			: hierarchy,
							current_tipo	: 'dd1',
							parent_tipo 	: 'dd1'
						})

		// document. do global click action on the document body
			document.addEventListener('mousedown', function(event) {
				event.stopPropagation();
				if(self.menu_active===false) {
					return false
				}
			    if (event.target.tagName.toLowerCase()!=='a') {
					close_all_drop_menu(self);
			    }
			});

			document.addEventListener('keydown', (event) => {
				if(self.menu_active===false) {
					return false
				}
			    if (event.key==='Escape') {
					close_all_drop_menu(self);
			    }
			});


	// User name(go to list)
		const logged_user_name = ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'logged_user_name',
			parent 			: fragment,
			text_content	: page_globals['username']
		})


	// Application_langs_selector
		const lang_datalist = self.data.langs_datalist
		const dedalo_aplication_langs_selector = ui.build_select_lang({
			id 			: 'dd_app_lang',
			langs 		: lang_datalist,
			action 		: change_lang,
			selected	: page_globals['dedalo_application_lang'],
			class_name 	: 'dedalo_aplication_langs_selector'
		})

		fragment.appendChild(dedalo_aplication_langs_selector)


	// menu dedalo_data_langs_selector(go to list)
		const lang_datalist_data = lang_datalist.map(item =>{
			const label =  get_label['data'] || 'data'
			return {label: label+': '+item.label,
								value: item.value}
		})
		const dedalo_data_langs_selector = ui.build_select_lang({
			id 			: 'dd_data_lang',
			langs 		: lang_datalist_data,
			action 		: change_lang,
			selected	: page_globals['dedalo_data_lang'],
			class_name	: 'dedalo_aplication_langs_selector'
		})

		fragment.appendChild(dedalo_data_langs_selector)


	// spacer
		const menu_spacer = ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'menu_spacer',
			parent 			: fragment
		})


	// section label button (go to list)
		const section_label = ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'section_label',
			parent 			: fragment,
		})
		// update value, subscription to the changes: if the section or area was changed, observers dom elements will be changed own value with the observable value
			let current_instance
			self.events_tokens.push(
				event_manager.subscribe('render_instance', update_section_label)
			)
			function update_section_label (instance) {
				if(instance.model === 'section'|| instance.model === 'area'){
					// change the value of the current dom element
					section_label.innerHTML = instance.label
					current_instance = instance
				}
			}
			section_label.addEventListener("click", e => {
					event.stopPropagation();
					//event_manager
					if (current_instance.mode === 'edit'){
						event_manager.publish('user_action', {tipo : current_instance.tipo, mode : 'list'})
					}
					self.menu_active = false
			})


	// menu button_toggle_inspector
		const toggle_inspector = ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'button_toggle_inspector',
			parent 			: fragment
		})


	menu_wrapper.appendChild(fragment)

	return menu_wrapper
}


/**
* LEVEL HIERARCHY
* @return dom element li
*/
const level_hierarchy = async (options) => {

	const self			= options.self
	const datalist 		= options.datalist
	const root_ul 		= options.root_ul
	const current_tipo	= options.current_tipo

	const root_areas = datalist.filter(item => item.parent === current_tipo)

	// inputs container
		const ul = ui.create_dom_element({
			element_type	: 'ul',
			parent 			: root_ul,
			id 				: current_tipo 
		})
		
	self.ul_nodes.push(ul)


	// values (inputs)
		const root_areas_length = root_areas.length
		for (let i = 0; i < root_areas_length; i++) {
			item_hierarchy({
							self			: self,
							datalist 		: datalist,
							root_ul 		: root_ul,
							ul_container 	: ul,
							item 			: root_areas[i],
							current_tipo	: current_tipo
							})
		}
}


/**
* ITEM_HIERARCHY
* @return dom element li
*/
const item_hierarchy = async (options) => {

	const self			= options.self
	const datalist 		= options.datalist
	const ul_container 	= options.ul_container
	const root_ul 		= options.root_ul
	const item 			= options.item
	const children_item = datalist.find(children_item => children_item.parent === item.tipo)
	const current_tipo  = options.current_tipo

	// li
		const li = ui.create_dom_element({
			element_type 	: 'li',
			class_name 		: 'menu_li_inactive',
			parent 		 	: ul_container,
		})

		self.li_nodes.push(li)

	//events

		li.addEventListener("mouseover", e => {
			//e.stopPropagation();
			if(self.menu_active===false) {
				return false
			}//end if self.menu_active

				// get current node mouse is over
				const active_li = e.target.nodeName === 'A' ? e.target.parentNode : e.target
				// get all nodes inside ul
				const nodes_li = ul_container.getElementsByTagName('li')
				const len		= nodes_li.length
				for (let i = len - 1; i >= 0; i--) {
					//desactive all nodes
					nodes_li[i].classList.add("menu_li_inactive");
					nodes_li[i].classList.remove("menu_li_active");
					const close_id = nodes_li[i].dataset.children
					// close all ul nodes dependent of the current li
					close_all_childrens(close_id)
					// check if the active li is the current loop node.
					if(nodes_li[i] == active_li){
						// active the current li
						nodes_li[i].classList.add("menu_li_active");
						nodes_li[i].classList.remove("menu_li_inactive");
						// if the active li has childrens
						const open_id = active_li.dataset.children
						if(open_id){
							//get the ul node and active it
							const open_ul = document.getElementById(open_id)

							open_ul.classList.remove("menu_ul_hidden");
							open_ul.classList.add("menu_ul_displayed");
							
							//first menu li nodes has parent 'dd1' and the position in the screen is calculated by the end of the parent li node
							if(active_li.parentNode.id === 'dd1'){
								open_ul.style.left = (active_li.getBoundingClientRect().left -1 )+'px'
							}else{
								// the node is totally visible and don't need move to the top
								open_ul.style.top = active_li.getBoundingClientRect().top+'px'
								// normal calculation for the hierarchy menus
								// get the botton positon of the ul and remove the height of the window
								const ul_bottom_dif = open_ul.getBoundingClientRect().bottom - window.innerHeight//document.documentElement.clientHeight
								// if the position is outside of the window (>0)
									console.log("ul_bottom_dif :               ",ul_bottom_dif);
								if (ul_bottom_dif>0) {
										// get the top of the current li and remove the oversize outsize of the window
										const total_top = active_li.getBoundingClientRect().top - ul_bottom_dif
										open_ul.style.top = total_top +'px'	
								}
								// move the node to the right position of the selected li
								open_ul.style.left = active_li.getBoundingClientRect().right+'px'
								
							}//end if(active_li.parentNode.id === 'dd1')
							
							

						}//end if(open_id)
					}//end if(nodes_li[i] == active_li)
				}//end for
		})// end mouseover

		li.addEventListener("mouseout", e => {
			// e.stopPropagation();
			if (e.clientY<0 || e.srcElement.id==='menu_wrapper') {
				close_all_drop_menu(self);
			}
			
			// if(self.menu_active){
			// 	li.classList.add ('menu_li_inactive')
			// 	li.classList.remove ('menu_li_active')
			// }//end if self.menu_active

			return true
		})


	// link
		const is_fallback = item.label.indexOf('<mark>')
		const text_fallback = is_fallback === -1 ? '' : 'mark'
		const label_text = item.label.replace(/(<([^>]+)>)/ig,"");
		
		const link = ui.create_dom_element({
			element_type	: 'a',
			class_name		: 'area_label ' + text_fallback,
			inner_html 		: label_text,
			parent 			: li
		})

		link.addEventListener("click", e => {

			if(self.menu_active===false) {
				return false
			}//end if self.menu_active
			//event_manager
			event_manager.publish('user_action', {tipo : item.tipo, mode : 'list'})

		})


		if (children_item) {
			li.classList.add ('has-sub')
			li.dataset.children		= item.tipo
			//li.dataset.parent 	= current_tipo
			level_hierarchy({		self			: self,
									datalist 		: datalist,
									root_ul 		: root_ul,
									current_tipo	: item.tipo,
									parent_tipo 	: current_tipo
								})

		}// end children_item
}//end item_hierarchy



/**
* CLOSE_ALL_DROP_MENU
*/
const close_all_drop_menu = async function(self) {

	self.menu_active = false

		console.log("close menu:");

	if (typeof self.ul_nodes!=="undefined") {

		const len = self.ul_nodes.length
		for (let i = len - 1; i >= 0; i--) {
			const ul = self.ul_nodes[i]
			ul.classList.add("menu_ul_hidden");
			ul.classList.remove("menu_ul_displayed");
			 // ul.removeAttribute("style")
			//ul.style.removeProperty('top')
			// ul.style.top = 'auto'
			// ul.style.bottom = null
		}
	}

	if (typeof self.li_nodes!=="undefined") {

		const len = self.li_nodes.length
		for (let i = len - 1; i >= 0; i--) {
			const li = self.li_nodes[i]
			li.classList.add("menu_li_inactive");
			li.classList.remove("menu_li_active");
		}
	}

	return true
}//end close_all_drop_menu


const close_all_childrens = async function(tipo){

	

	if(tipo){
		const close_ul = document.getElementById(tipo)
			close_ul.classList.remove("menu_ul_displayed");
			close_ul.classList.add("menu_ul_hidden");
	
		const ar_children_nodes = close_ul.childNodes
		const child_len = ar_children_nodes.length

		for (let i = child_len - 1; i >= 0; i--) {
			const new_tipo = ar_children_nodes[i].dataset.children
			close_all_childrens(new_tipo)
		}
	}

	return true
}


/**
* CHANGE_LANG
*/
const change_lang = async function(event) {

	const current_lang 	= event.target.value

	const api_response = await data_manager.prototype.request({
			body : {
				action 	 : 'change_lang',
				dd_api 	 : 'dd_utils_api',
				options  : {
					dedalo_data_lang 		: current_lang,
					dedalo_application_lang : event.target.id==='dd_data_lang' ? null : current_lang
				}
			}
		})
		window.location.reload(false);


	//event_manager.publish('user_action', {lang: current_lang})
		
		
}
