var flag_note=false;

$('#original_text').html('<p id="tsummarizer_note">Insert your document-text here.</p>');

$('#original_text').click(function(){
if(!flag_note){
$('#tsummarizer_note').remove();
flag_note=true;
}
else if(flag_note && $('#original_text').html() == ''){
$('#original_text').html('<p id="tsummarizer_note">Insert your document-text here.</p>');
flag_note=false;
}

});
