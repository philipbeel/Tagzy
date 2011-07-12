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
        var tagzy_tag = $('<div/>', {id: 'tags'});
        var tagzy_input = $('<input/>', {type: 'text', name: 'tagzy_tag', id: 'tagzy_tag'});
		var tagzy_html = tagzy_tag.append(tagzy_input);
		
        return this.each(function (options) {
			//append the HTML we need for the tag magic
			$(this).parent().append(tagzy_html);

			$('#tagzy_tag').focus();
			//check for commas on each keydown
			$('#tagzy_tag').keyup(function(event) {    
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
					$('#tags').append(newTag.append(close));
					//wipe the text field and refocus
					$('#tagzy_tag').appendTo($('#tags')).val('').focus();
					//update the hidden field
					updateTagField();
			    }
			});
	
			//close a created tag
			$('#tags').find('.tagged a').live('click', function(e) {
			    e.preventDefault();
				$(this).parent().remove(); 
				updateTagField();
			    $('input').focus();
			});
	
			//update the hidden field
			function updateTagField() {
				var definedTags = ''
				,	currentTag;
				$('#tags').find('.tagged:not(a)').each(function(index) {
					currentTag = $(this).text();
					definedTags += currentTag.substring(0, currentTag.length-1) + ',';
				});
				//add the specified tags into the field
				$('#hiddenTag').val(definedTags.substring(0, definedTags.length-1));
			}
			
			//check for commas on each keydown
            $('#tagzy_tag').keydown(function(event) {    
               //delete last added tag by hitting backspace
               if(event.keyCode === 8) {
                   //check the the last character
                   event.preventDefault();
                   
                   if($(this).val().length === 0) {
                       $('.tagged:last').remove();
                       updateTagField();        
                   } else {
                      $(this).val($(this).val().slice(0, -1));
                   }
               }
           });
        });
    }
})(jQuery);