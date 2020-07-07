/**
* TOOL_IMPORT_FILES_DCNAV CLASS
*
*
*
*/
var tool_import_files_dcnav = new function() {

	// LOCAL VARS
	this.url_trigger = DEDALO_LIB_BASE_URL + '/tools/tool_import_files_dcnav/trigger.tool_import_files_dcnav.php'


	/**
	* IMPORT_FILES
	* On click button 'ok' exec trigger call by ajax to process uploaded files
	* @param dom object button_obj
	* @reuturl promise jsPromise
	*/
	this.import_files = function(button_obj) {

		const self = this

		// Files form
		const files_form					= document.getElementById("fileupload")
		const name_control_to_section_id	= document.getElementById("name_control_to_section_id")
		const same_name_same_section		= document.getElementById("same_name_same_section")
		const ar_file_name					= files_form.querySelectorAll("input.file_name_input_row")
		// const ar_file_processor			= files_form.querySelectorAll("select.file_processor")
		// const ar_target_portal_tipo		= files_form.querySelectorAll("select.target_portal_tipo")		
		
		const ar_data 	= []
		const len 		= ar_file_name.length
		for (let i = 0; i < len; i++) {
		
			const file_type = ar_file_name[i].value.split('.').pop()==='xml' ? 'xml' : 'image'

			ar_data.push({
				file_name				: ar_file_name[i].value,
				file_type				: file_type
				// file_processor		: ar_file_processor[i].value,
				// target_portal_tipo	: ar_target_portal_tipo[i].value
			})
		}

		// data sort. first all xml and later all images
			// function compare(a, b) {
			// 	const item_a = a.file_type + a.file_name
			// 	const item_b = b.file_type + b.file_name

			// 	let comparison = 0;
			// 	if (item_a < item_b) {
			// 		comparison = 1;
			// 	} else if (item_a > item_b) {
			// 		comparison = -1;
			// 	}
			// 	return comparison;
			// }
			// ar_data.sort(compare);
			// 	console.log("ar_data:",ar_data); return

		let import_file_name_mode_value = 'free' // Default
		// if (name_control_to_section_id && name_control_to_section_id.checked === true) {
		// 	import_file_name_mode_value = 'numbered'
		// }
		// if (same_name_same_section && same_name_same_section.checked === true) {
		// 	import_file_name_mode_value = 'namered'
		// }

		const trigger_vars = {
			mode						: 'import_files',
			tipo						: button_obj.dataset.tipo,
			// parent					: button_obj.dataset.parent,
			section_tipo				: button_obj.dataset.section_tipo,
			import_mode					: button_obj.dataset.import_mode,
			top_tipo					: page_globals.top_tipo,
			top_id						: page_globals.top_id,
			ar_data						: ar_data,
			import_file_name_mode		: import_file_name_mode_value, // Global
			file_processor_properties	: file_processor_properties, // Global var defined in tool page phtml
			copy_all_filenames_to		: copy_all_filenames_to,
			optional_copy_filename		: optional_copy_filename
		} // ; console.log("[tool_diffusion.export_record] trigger_vars",trigger_vars); return
				
		// Add overlay to all page
		const wrap_section = document.getElementById('html_page_wrap')
			html_page.loading_content(wrap_section,1)

		// Hide ok button
		button_obj.style.display = 'none';

		// Add msg processing..
		const msg = document.createElement("div")
			  msg.classList.add("msg_wait", "blink")
			  msg.innerHTML = get_label.por_favor_espere
			  wrap_section.parentNode.appendChild(msg)


		// Return a promise of XMLHttpRequest
		const js_promise = common.get_json_data(this.url_trigger, trigger_vars).then(function(response) {
				if(SHOW_DEBUG===true) {
					console.log("[tool_diffusion.export_record] response",response)
				}

				if (response && response.result && response.result===true) {
					if (button_obj.dataset.import_mode==='section' && window.opener) {
						window.opener.location.reload();
					}
					html_page.loading_content(wrap_section,0)
					
					msg.remove()
					//window.close()
					// Reload tool page
					//location.reload();

					// Reset tool
					self.reset()

				}else{
					msg.innerHTML = "<span class=\"error\">Error on import</span>"
					msg.classList.remove("blink")
					if (response && response.msg) {
						msg.innerHTML += " : " + response.msg
					}							
				}													
		}, function(error) {
			console.log("[tool_diffusion.export_record] error",error)
		});


		return js_promise		
	}//end import_files



	/**
	* RESET
	* @return bool
	*/
	this.reset = function() {

		// Select and clean current files list table
		const form_table_body = document.querySelector("table[role=\"presentation\"]>tbody")
		while (form_table_body.hasChildNodes()) {
			form_table_body.removeChild(form_table_body.lastChild);
		}

		// Hide button_import_images
		const button_import_images = document.getElementById("button_import_images")
			button_import_images.style.display = "none"

	
		window.location.reload(true);
		

		return true
	};//end reset



	/**
	* FIX_TARGET_PORTAL_TIPO
	* @return 
	*/
	this.fix_target_portal_tipo = function(file_name, select_id, apply) {

		const self = this

		let select_obj = document.getElementById(select_id)

		if (!select_obj) {

			return setTimeout(function(e){
				self.fix_target_portal_tipo(file_name, select_id)
			},350)

		}else{

			if(apply===true){
				select_obj = document.getElementById(select_id)
				//console.log("file_name:",file_name, select_id, select_obj);
				//console.log("target_portal_map_name:",target_portal_map_name);

				const regex	= /^(.+)-([a-zA-Z])\.([a-zA-Z]{3,4})$/;
				const str	= file_name; //`123 85-456 fd-a.jpg`;
				let m;
				if ((m = regex.exec(str)) !== null) {
					//console.log("m:",m);
					if (m[2]!==null) {
						//console.log("m[2]:",m[2]);
						if (typeof target_portal_map_name[m[2].toUpperCase()]!=="undefined") {
							select_obj.value = target_portal_map_name[m[2].toUpperCase()]
						}
					}
				}

			}else{
				let select_obj = document.getElementById(select_id)
				let global_target_portal_tipo = document.getElementById('global_target_portal_tipo')

				let sel = global_target_portal_tipo.querySelectorAll("select.target_portal_tipo")
				select_obj.value = sel[0].value
			}
			
		}

		return true
	}//end fix_target_portal_tipo




}//end class