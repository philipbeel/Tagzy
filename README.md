# Tagzy - A jQuery plugin for adding tags to an input

Website : [http://theodin.co.uk](https://twitter.com/philipbeel)  
Twitter : [@philipbeel](https://twitter.com/philipbeel)

### Descrpition
Tagzy is a jQuery plugin which enables you to add a highly visual tag input to any web page quickly and easily. If you have ever signed up for soundcloud or forrst you may have already encountered this approach.

### Usage
Call in the jQuery framework and jquery.tagzy.js in your webpage.

	<script type="text/javascript" src="jquery.tweetable.js"></script>

Create a hidden input which will serve to hold your comma seperated list of tags.

	<form id='myForm' name='myForm' method='get' action='#'>
		<input type='hidden' name='tagged' id='tagged' />
	</form>

Initiate the plugin, call tagzy on your specified element.

	$('#tagged').tagzy();

### Plugin parameters

```
containerClass{String},     // Name of the tagzy container class 
tagClass: {String},     	 // Name of the class appended to each tagged item 
inputClass: {String},       // Name of the class appended to the input 
```
