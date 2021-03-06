/**
* TOOL_UPLOAD CLASS
*
*
*
*/
var tool_export = new function() {

	this.url_trigger 	= DEDALO_LIB_BASE_URL + '/tools/tool_export/trigger.tool_export.php?top_tipo='+page_globals.top_tipo ;
	this.source_columns = {};
	this.target_columns = {};
	this.target_ul 		= null;
	this.section_tipo 	= null;



	/**
	* INIT
	* Activate drag and drop behaviour for two columns of elements
	*/
	this.init = function() {


		// Keydown listener
			window.addEventListener("keydown", function (e) {

				// enter key
					if (e.keyCode===13) {
						const button_export = document.getElementById("button_export")
						if (button_export) {
							button_export.click()
						}
					}
			})

		// Select ul target_list and store
			tool_export.target_ul 	 = document.getElementById('target_list');
			tool_export.section_tipo = tool_export.target_ul.dataset.section_tipo;

		// Read and parse cookie export_stored_columns if esits
			const export_stored_columns = JSON.parse(readCookie('export_stored_columns'));
			if (export_stored_columns) {

				var i=0;for(var tipo in export_stored_columns) {
			        //console.log(tipo);
			        // Select element from left column
			        var li = document.querySelectorAll('[data-tipo="'+tipo+'"]')[0];
			        	//console.log(li);
			        // Move li element from source to target ul
			        if(li) {
			        	tool_export.target_ul.appendChild(li); i++;
			        }
			    }
			   	if(SHOW_DEBUG===true) console.log("Moved li elements: "+i);

			    // Set var tool_export.target_columns with cookie value
				tool_export.target_columns = export_stored_columns;
			}

		// Start sortable
			$(function() {
				$( "#source_list, #target_list" ).sortable({
				  connectWith : ".connectedSortable",
				  	stop 	  : function( event, ui ) {
				  					// Update var target_columns
				  					tool_export.update_export_stored_columns_cookie(event, ui);
				  				},
				  	receive   : function(event, ui) {
				  					$('.col').equalHeight();
				  					//console.log("equalHeight receive");
				  				},
				  	create    : function(event, ui) {
				  					$('.col').equalHeight();
				  					//console.log("equalHeight create");
				  				},
				}).disableSelection();
			});


		const ar_section_list_selector = document.querySelectorAll('.section_list_selector')
		for (var i = ar_section_list_selector.length - 1; i >= 0; i--) {
			ar_section_list_selector[i].addEventListener("click",function(e){
				//e.preventDefault()
				e.stopPropagation()
			})
		}

		return true
	}//end init



	/**
	* UPDATE_EXPORT_STORED_COLUMNS_COOKIE
	* Iterate all target ul childNodes and update cookie value
	* Triggered on drag elements and on sort elements
	*/
	this.update_export_stored_columns_cookie = function( event, ui ) {

		// TARGET : Read all target container and store elements ordered as vieweved now
			tool_export.target_columns = {}; // Reset always
			const len = tool_export.target_ul.childNodes.length
			for (var i = 0; i < len; i++) {

				const tipo = tool_export.target_ul.childNodes[i].dataset.tipo;
				tool_export.target_columns[tipo] = 1;
			}

		createCookie( 'export_stored_columns', JSON.stringify(tool_export.target_columns), 365 );

		return true
	}//end update_export_stored_columns_cookie



	/**
	* EXPORT_DATA
	*/
	this.export_data = function(button) {

		const table_data_preview  		= document.getElementById('table_data_preview')
		const download_file 			= document.getElementById('download_file')
		const download_file_link 		= document.getElementById('download_file_link')
		const select_encoding 			= document.getElementById('select_encoding_export')
		const select_data_format 		= document.getElementById('select_data_format_export')
		const wrap_div 					= document.getElementById('wrap_tool_export')

		const columns = JSON.parse(readCookie('export_stored_columns'))

		// section list custom
			const section_list_custom = {}
			for(const key in columns) {

				// column
				const name = "checklist_" + key
				const checked_list = document.querySelectorAll("input[name^='"+name+"']:checked")
				const ar_values  = []
				for (let i = 0; i < checked_list.length; i++) {
					const item = checked_list[i]
					ar_values.push(item.value)
				}
				section_list_custom[key] = ar_values
			}

		// trigger vars
			const trigger_url  = tool_export.url_trigger
			const trigger_vars = {
				mode 				: 'export_data',
				columns 			: columns,
				section_list_custom : section_list_custom,
				section_tipo 		: tool_export.section_tipo,
				encoding  	 		: 'UTF-8',// select_encoding.value,
				data_format 		: select_data_format.value,
			}
			//console.log(trigger_vars)

		// Add overlay
			html_page.loading_content( wrap_div, 1 );

		// AJAX request
			const js_promise = common.get_json_data(trigger_url, trigger_vars).then(function(response) {
					if(SHOW_DEBUG===true) {
						//console.log("[tool_export.export_data] response",response);
					}

					if (response && response.result) {
						if (response.result===true) {

							// Download link
								download_file_link.setAttribute('href', response.url);
								download_file.style.display = 'block'

							// Download link excel
								const download_file_link_excel = document.getElementById('download_file_link_excel')
								const download_file_link_html = document.getElementById('download_file_link_html')
								if (response.data_format==="dedalo") {
									// hide button link excel
									download_file_link_excel.classList.add("hide")
									download_file_link_html.classList.add("hide")

								}else{
									download_file_link_excel.classList.remove("hide")
									download_file_link_excel.setAttribute('href', response.url_excel);

									download_file_link_html.classList.remove("hide")
									download_file_link_html.setAttribute('href', response.url_html);
								}

							// Table preview
							table_data_preview.innerHTML = response.table;

						}else{
							table_data_preview.innerHTML = "Error on export data. \n"+response.msg;
						}
					}else{
						if (response) {
							table_data_preview.innerHTML = "Error on export data. \n"+response.msg;
						}else{
							table_data_preview.innerHTML = "Null response is received !"
							console.warn("[tool_export.export_data] response",response);
						}
					}

					// Remove overlay
					html_page.loading_content( wrap_div, 0 );

					// Scrool to preview table
					$('html, body').animate({
									        scrollTop: $(table_data_preview).offset().top -0
									    }, 400);

			}, function(error) {
					console.log("[tool_export.export_data] Error",error)
					// Remove overlay
					html_page.loading_content( wrap_div, 0 );
			});


		return js_promise;
	}//end export_data



	/**
	* ACTIVE_ALL_COLUMNS
	* @return bool
	*/
	this.active_all_columns = function(button) {

		const self = this

		const ul_source_list = document.getElementById("source_list")
		const ul_target_list = document.getElementById("target_list")


   		// Get all source list nodes
   			const source_ar_li = ul_source_list.querySelectorAll("li")
   			const source_ar_li_length = source_ar_li.length
   			if (source_ar_li_length>0) {

   				const js_promise = new Promise(function(resolve) {
			   		// Move element from source to target ul
			   			for (var i = 0; i < source_ar_li_length; i++) {
			   				ul_target_list.appendChild(source_ar_li[i])
			   			}

			   		resolve(true)
			   	})

			   	js_promise.then(function(){
					// Update cookie state
						self.update_export_stored_columns_cookie()
				})
   			}

   		return true
	};//end active_all_columns



	/**
	* UNACTIVE_ALL_COLUMNS
	* @return
	*/
	this.unactive_all_columns = function() {

		const self = this

		const ul_source_list = document.getElementById("source_list")
		const ul_target_list = document.getElementById("target_list")

		// Get all source list nodes
   			const target_ar_li 		  = ul_target_list.querySelectorAll("li")
   			const target_ar_li_length = target_ar_li.length
   			if (target_ar_li_length>0) {

   				const js_promise = new Promise(function(resolve) {

					// Move element from source to target ul
			   			for (var i = 0; i < target_ar_li_length; i++) {
			   				ul_source_list.appendChild(target_ar_li[i])
			   			}

			   		resolve(true)
				})

				js_promise.then(function(){
					// Update cookie state
						self.update_export_stored_columns_cookie()
				})

   			}

   		return true
	};//end unactive_all_columns



	/**
	* TOGGLE_SECTION_LIST_SELECTOR
	* @return
	*/
	this.toggle_section_list_selector = function(button, e) {
		e.stopPropagation()

		const selection_list = button.parentNode.querySelector(".section_list_selector")

		if (selection_list.classList.contains("active")) {

			selection_list.classList.remove("active")
			button.classList.remove("active")

		}else{
			selection_list.classList.add("active")
			button.classList.add("active")
		}

		return true
	};//end toggle_section_list_selector



}//end class
