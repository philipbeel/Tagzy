/*
 * tagzy 0.1 - jQuery tagging field plugin
 *
 * Copyright (c) 2011 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 *
 */
(function ($) {
	$.fn.tagzy = function (options) {
		
		var defaults = {};
    var options = $.extend(defaults, options);
		
    return this.each(function (index, Element, options) {
    	//if plugin is init, set the identifier
    	if(typeof data != "undefined")
				data++;
			else
				data = 0;
				
			//current hidden_field
			current_field = $(Element);
			
    	//create tags container
    	var tagzy_tag = $('<div/>', {'class': 'tags', 'style': 'cursor:text;'});
    	//search an unique identifier for each hidden input
  		tagzy_tag.attr('data-for', data);
  		//save the unique identiver as attribute
  		$(Element).attr('data-tagzy-identifier',data);
    	// create the input
		  var tagzy_input = $('<input/>', {'type': 'text', 'name': 'tagzy_tag', 'class': 'tagzy_tag'});
		  //append the input to the container
			var tagzy_html = tagzy_tag.append(tagzy_input);
    
			//append the HTML we need for the tag magic
			$(this).parent().append(tagzy_html);
			
			//parse saved tags
			var tags = $(this).val().split(',');
			if(tags.length >1){
				$.each(tags, function(index, value){
					//create a close button
					close = $('<a/>', { href: '#', title: 'delete'}).append('x');
					//create the tag courier
					newTag = $('<span/>').addClass('tagged').append( value );
					//put the tag together with the close button appended
					$(current_field).next('.tags').append(newTag.append(close));
					//wipe the text field and refocus
					$(current_field).next().find('.tagzy_tag').appendTo($(current_field).next('.tags')).val('').focus();
					//update the hidden field
					updateTagField($(current_field).next('.tags').attr('data-for'));
				});
			}

			//focus input if container is clicked
			$('.tags').live('click', function(){
				$(this).find('.tagzy_tag').focus();
			});
			
			//check for commas on each keydown
			$('.tagzy_tag').keyup(function(event) {    
				var newTag
				,	close
				,	lastTag;
				//check for comma delimeter on keypresses
				if((this.value.substr(-1) === ',') && (this.value.length !== 1)) {
					//create a close button
					close = $('<a/>', { href: '#', title: 'delete'}).append('x');
					//create the tag courier
					newTag = $('<span/>').addClass('tagged').append(this.value.substr(0, this.value.length -1) );
					//put the tag together with the close button appended
					$(this).parent('.tags').append(newTag.append(close));
					//wipe the text field and refocus
					$(this).appendTo($(this).parent('.tags')).val('').focus();
					//update the hidden field
					updateTagField($(this).parent('.tags').attr('data-for'));
				}
			});

			//close a created tag
			$('.tags').find('.tagged a').live('click', function(e) {
				e.preventDefault();
				var tagField = $(this).parent().parent().attr('data-for');
				$(this).parent().remove(); 
				updateTagField( tagField );
				$(this).parent().parent().find('tagzy_tag').focus();
			});

			//update the hidden field
			function updateTagField(hidden_input) {
				var definedTags = ''
				,	currentTag;
				$('div[data-for="' + hidden_input + '"]').find('.tagged:not(a)').each(function(index) {
					currentTag = $(this).text();
					definedTags += currentTag.substring(0, currentTag.length-1) + ',';
				});
				//add the specified tags into the field
				$('input[data-tagzy-identifier="' + hidden_input + '"]').val(definedTags.substring(0, definedTags.length-1));
			}
		
			//check for commas on each keydown
		  $('.tagzy_tag').keydown(function(event) {    
				//delete last added tag by hitting backspace
				if(event.keyCode === 8) {
					//check the the last character
					event.preventDefault();
					 
					if($(this).val().length === 0) {
						 $('.tagged:last').remove();
						 updateTagField($(this).parent().attr('data-for'));        
					} else {
						$(this).val($(this).val().slice(0, -1));
					}
				}
			});
		});
  }
})(jQuery);
