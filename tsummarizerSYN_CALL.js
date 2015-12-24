function AJAX_retrieve_file_ListCommonWords(){
	var List_Common_Words="";
	var txtFile;
	if (window.XMLHttpRequest)
					{// code for IE7+, Firefox, Chrome, Opera, Safari
						txtFile = new XMLHttpRequest();
					}
					else
					{// code for IE6, IE5
						txtFile = new ActiveXObject("Microsoft.XMLHTTP");
					}
	txtFile.open("POST", 'list_most_common_words.txt', false);
	txtFile.onreadystatechange = function() {
		if (txtFile.readyState === 4) { 
			if (txtFile.status === 200) {
					List_Common_Words=txtFile.responseText;
			}
		}
	}
	txtFile.send(null);
	return List_Common_Words;
}

function AJAX_retrieveAbbr_list(){
	var List_Abbr="";
	var txtFile;
	if (window.XMLHttpRequest)
					{// code for IE7+, Firefox, Chrome, Opera, Safari
						txtFile = new XMLHttpRequest();
					}
					else
					{// code for IE6, IE5
						txtFile = new ActiveXObject("Microsoft.XMLHTTP");
					}
	txtFile.open("POST", 'Abbr_list_singles.txt', false);
	txtFile.onreadystatechange = function() {
		if (txtFile.readyState === 4) { 
			if (txtFile.status === 200) {
					List_Abbr=txtFile.responseText;
			}
		}
	}
	txtFile.send(null);
	return List_Abbr;
}