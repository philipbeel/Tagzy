/*
 * tagzy 0.1.2 - jQuery tag field plugin
 *
 * Copyright (c) 2011 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 *
 */
(function ($) {
	$.fn.tagzy = function (options) {
		
		$(this).data('tagzy', {
			settings : {
				"containerClass": "tags",
				"tagClass": "tagged",
				"inputClass": "tagzy_tag"
			},
			current_field : $(Element)
		});
	
		var settings = $.extend($(this).data('tagzy').settings, options);
		
		return this.each(function (index, Element) {
			
			var data = (typeof data !== "undefined") ? data++ : data = 0
			,	tagzy_tag = $('<div/>', {'class': settings.containerClass, 'style': 'cursor:text;'});

			// Search an unique identifier for each hidden input
			tagzy_tag.attr('data-for', data);
			
			// Save the unique identiver as attribute
			$(Element).attr('data-tagzy-identifier',data);
			
			// Create the input
			var tagzy_input = $('<input/>', {'type': 'text', 'class': settings.inputClass})
			,	tagzy_html = tagzy_tag.append(tagzy_input);
	
			// Append the HTML we need for the tag magic
			$(this).after(tagzy_html);
			
			// Parse saved tags
			var tags = $(this).val().split(',');
			if(tags.length >=1 & tags[0].length >=1){
				$.each(tags, function(index, value){
					
					// Create a close button
					close = $('<a/>', { href: '#', title: 'delete'}).append('x');
					 
					// Create the tag courier
					newTag = $('<span/>').addClass(settings.tagClass).append( value );
					
					// Put the tag together with the close button appended
					$(Element).next('.' + settings.containerClass).append(newTag.append(close));
					
					// Wipe the text field and refocus
					$(Element).next().find('.' + settings.inputClass).appendTo($(Element).next('.' + settings.containerClass)).val('').focus();
					
					// Update the hidden field
					updateTagField($(Element).next('.' + settings.containerClass).attr('data-for'));
				});
			}

			// Focus input if container is clicked
			$('.' + settings.containerClass).live('click', function(){
				$(this).find('.' + settings.inputClass).focus();
			});
			
			// Check for commas on each keydown
			$('.' + settings.inputClass).keyup(function(event) {    
				var newTag
				,	close
				,	lastTag
				,   substrVal;
				
				// Check for comma delimeter on keypresses
				if((this.value.substr(-1) === ',' || event.keyCode === 13) && (this.value.length !== 1)) {
					
					// Create a close button
					close = $('<a/>', { href: '#', title: 'delete'}).append('x');
					
					// Create the tag courier
					substrVal = (this.value.substr(-1) === ',') ? 1 : 0;
					newTag = $('<span/>').addClass(settings.tagClass).append(this.value.substr(0, this.value.length - substrVal));
					
					// Put the tag together with the close button appended
					$(this).parent('.' + settings.containerClass).append(newTag.append(close));
					
					// Wipe the text field and refocus
					$(this).appendTo($(this).parent('.' + settings.containerClass)).val('').focus();
					
					// Update the hidden field
					updateTagField($(this).parent('.' + settings.containerClass).attr('data-for'));
				}
			});

			// Close a created tag
			$('.' + settings.containerClass).find('.' + settings.tagClass + ' a').live('click', function(e) {
				e.preventDefault();
				var tagField = $(this).parent().parent().attr('data-for');
				
				$(this).parent().remove(); 
				updateTagField( tagField );
				$(this).parent().parent().find('.' + settings.inputClass).focus();
			});

			// Update the hidden field
			function updateTagField(hidden_input) {
				var definedTags = ''
				,	currentTag;

				$('div[data-for="' + hidden_input + '"]').find('.' + settings.tagClass + ':not(a)').each(function(index) {
					currentTag = $(this).text();
					definedTags += currentTag.substring(0, currentTag.length-1) + ',';
				});

				// Add the specified tags into the field
				$('input[data-tagzy-identifier="' + hidden_input + '"]').val(definedTags.substring(0, definedTags.length-1));
			}
		
			// Check for commas on each keydown
			$('.' + settings.inputClass).keydown(function(event) {

				// Stop default functionality
				if(event.keyCode === 8 || event.keyCode === 13) {
					event.preventDefault();
				}
				
				// Delete last added tag by hitting backspace
				if(event.keyCode === 8) {

					if($(this).val().length === 0) {
						$('.' + settings.tagClass + ':last').remove();
						updateTagField($(this).parent().attr('data-for'));        
					} else {
						$(this).val($(this).val().slice(0, -1));
					}

				}
			});
		});
  }
})(jQuery);