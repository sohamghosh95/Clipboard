$(document).ready(function(){
    
    $('form').submit(function(event){
        var $input =  $(event.target).find('input');
        var comment = $input.val();
                
        if(comment != ""){
            
            var regular_expression1 = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
            var regular_expression2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            var regular_expression3 = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

            var comment=comment.replace(regular_expression1,'<a href="$&" target="_blank">$&</a>').replace(regular_expression2, '$1<a href="http://$2" target="_blank">$2</a>').replace(regular_expression3, '<a href="mailto:$&" target="_blank">$&</a>');
            
            var html =$('<li>').html(comment);    
            
            html.append('<a class="delete">Remove</a>').append('<a class="edit">Edit&nbsp;</a>').append('<a class="copy">Copy&nbsp;</a>');
            
            html.prependTo('#comments');            

            //Delete button
            $('.delete').click(function(){
               this.parentNode.parentNode.removeChild(this.parentNode); 
            });
            
            //Edit button
            $('.edit').click(function(){
                comment = this.parentNode.innerText.replace('Edit','').replace('Remove','').replace('Copy','');
                $input.val(comment);
                this.parentNode.parentNode.removeChild(this.parentNode);
            });
            
            //copy button
            $('.copy').click(function(){
                comment = this.parentNode.innerText.replace('Edit','').replace('Remove','').replace('Copy','');
                clipboard(comment);
            });

            //Set initial input value to null
            $input.val("");
        }
        return false;
    });
});

//Function to copy the text
function clipboard(text) {
	var copyElement = document.createElement('input');
	copyElement.setAttribute('type', 'text');
	copyElement.setAttribute('value', text);
	copyElement = document.body.appendChild(copyElement);
	copyElement.select();
	try {
		if(!document.execCommand('copy')) throw 'Not allowed.';
	} catch(e) {
		copyElement.remove();
		console.log("document.execCommand('copy'); is not supported");
		prompt('Copy the text below. (ctrl c, enter)', text);
	} finally {
		if (typeof e == 'undefined') {
			copyElement.remove();
		}
	}
}
