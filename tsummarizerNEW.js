var originalTEXT="";
var fontHASH_MAP=new Object();
var countFONT_HASH=0;
var length_of_summary=3;
var reg1=/\W+/g;	//for matching not word characters --> [^A-Za-z0-9_]
var reg2=/\s+/g;	//for matching white space characters --> [\t\r\n]
var wordFREQ_LIST = new Object();
var maxFREQ=-Number.MAX_VALUE;
var minFREQ=Number.MAX_VALUE;
var maxSCORE=100.0;
var countTERMS=-1;
var finalSUMMARY="";
var headingTERMS="";
var avgFONT_SIZE=0;
var Abbr_list = "";	
var regABBR;
var max_fontSize=-1;
var prevFONT_SIZE=0;

function cleanUP(){
	$('#summary_div').html("<h2>SUMMARY</h2>");
	originalTEXT="";
	fontHASH_MAP={};
	countFONT_HASH=0;
	wordFREQ_LIST = {};
	maxFREQ=-Number.MAX_VALUE;
	minFREQ=Number.MAX_VALUE;
	maxSCORE=100.0;
	countTERMS=-1;
	finalSUMMARY="";
	sentenceLIST={};
	NounsLIST= {};
	maxNounScore= 100;
	minNounScore= 50;
	maxVal=-Number.MAX_VALUE;
	minVal=Number.MAX_VALUE;
	max_fontSize=-1;
	count_nouns=-1;
	headingTERMS="";
	avgFONT_SIZE=0;
	prevFONT_SIZE=0;	
	maxSENTENCE_PRIORITY=-Number.MAX_VALUE;
	minSENTENCE_PRIORITY=Number.MAX_VALUE;
	Abbr_list = (AJAX_retrieveAbbr_list()).replace(/\./g,"\\.").replace(/\n/g,"|");
	regABBR= new RegExp("("+Abbr_list+")","g");
	//console.log(regABBR);
	set_defaultLENGTH();
	retrieve_divCONTENT();
}

function set_defaultLENGTH(){
length_of_summary=10-($("#slider-range").slider("value"));
}

function retrieve_divCONTENT(){
	var org_div=document.getElementById('original_text');
	retrieveTEXT(org_div);
	originalTEXT = originalTEXT.replace(/(<br\/>)+/ig,"<br/>");
	//console.log(originalTEXT);
	dotHandler();
	wordSCORING();
}

function wordSCORING(){
	var prev_word = null;
	var freqEACH_TERM=0;
	var x=originalTEXT.replace(reg1," ");	//removed non word characters
	x=x.replace(stop_words,"");
	x=x.replace(reg2," ");
	var list_edited_words=x.toUpperCase().split(" ");
	list_edited_words.sort();
	for(var i=0;i<list_edited_words.length;i++){
		if(!(list_edited_words[i].match(/(#tsummarizer\w*beg|#tsummarizer\w*end)/g))){
			if(prev_word !== list_edited_words[i]){
				freqEACH_TERM=0;
				countTERMS++;
				prev_word = list_edited_words[i];
				wordFREQ_LIST[countTERMS] = new Object();
				wordFREQ_LIST[countTERMS].term = list_edited_words[i];
				wordFREQ_LIST[countTERMS].frequency = parseInt(++freqEACH_TERM);
			
			}
			else if(prev_word === list_edited_words[i]){
				if(maxFREQ < freqEACH_TERM){
				maxFREQ = freqEACH_TERM;
				}
				if(minFREQ > freqEACH_TERM){
				minFREQ = freqEACH_TERM;
				}
				wordFREQ_LIST[countTERMS].frequency = parseInt(++freqEACH_TERM);
			}
		}
	}
	for(var j=0;j<=countTERMS;j++){
	wordFREQ_LIST[j].priority=parseFloat((maxSCORE*(parseFloat(wordFREQ_LIST[j].frequency)-minFREQ))/(maxFREQ-minFREQ));
	}
	sentenceSEGMENATION();
}

function retrieveTEXT(node){
	if (node.hasChildNodes){
		var localCOUNTER;
		for (localCOUNTER=0;localCOUNTER<node.childNodes.length;localCOUNTER++) {
			retrieveTEXT(node.childNodes[localCOUNTER]);
		}
	}
	if(node.nodeName.toUpperCase() === 'LI' || node.nodeName.toUpperCase() === 'BR'){
		originalTEXT += '<br/>';
	}
	if ((node.nodeType == 3)&&(node.nodeType!==8)) { // text node
		//font semantic evaluation...begin
		var tempNodeVal = stripVowelAccent(node.nodeValue);
		tempNodeVal = dotHandler(tempNodeVal);
		var tempNodeVal_arr = tempNodeVal.split(/[\.!\?]+["']*\s+/g);
		var font_sizeCurrent=0;
		var font_weightCurrent=0;
		var tag_name="";
		if(node.parentNode){
		font_sizeCurrent = $(node.parentNode).css("font-size");
		font_weigthCurrent = $(node.parentNode).css("font-weight");
		tag_name = node.parentNode.nodeName;
		fontHASH_MAP[countFONT_HASH] = new Object();
		fontHASH_MAP[countFONT_HASH].value= tempNodeVal;
		fontHASH_MAP[countFONT_HASH].fontSize= font_sizeCurrent;
		fontHASH_MAP[countFONT_HASH].fontWeight= font_weigthCurrent;
		fontHASH_MAP[countFONT_HASH].tagName= tag_name;
		countFONT_HASH++;
		if(prevFONT_SIZE !== 0 && returnPIXEL_SIZE(font_sizeCurrent) !== prevFONT_SIZE){
			originalTEXT = originalTEXT + "<br/>";
		}
		prevFONT_SIZE = returnPIXEL_SIZE(font_sizeCurrent);
		}
		//console.log("fontsize - "+font_sizeCurrent+"tag name - "+tag_name+" font_weigthCurrent - "+font_weigthCurrent);
				
		
		for(var i=0;i < tempNodeVal_arr.length ; i++){
			if(tempNodeVal.match(/[\.!\?]+['"]*\s+/g) && tempNodeVal.match(/[\.!\?]+["']*\s+/g)[i] && tempNodeVal.match(/[a-zA-Z\]\[\d\)\(]+/g)) {
				if(tag_name.toUpperCase() === 'B'){
					originalTEXT=originalTEXT + " #tsummarizerbold_"+font_sizeCurrent+"_"+font_weigthCurrent+"_beg " + tempNodeVal_arr[i] + " #tsummarizerbold__end. ";
				}
				else if(tag_name.toUpperCase() === 'I'){
					originalTEXT=originalTEXT + " #tsummarizeritalic_"+font_sizeCurrent+"_"+font_weigthCurrent+"_beg " + tempNodeVal_arr[i] + " #tsummarizeritalic__end. ";
				}
				else if(tag_name.toUpperCase() !== 'B' || tag_name.toUpperCase() !== 'I' || tag_name.toUpperCase() !== 'IMG' || tag_name.toUpperCase()!== 'FORM' || tag_name.toUpperCase() !== 'BUTTON' || tag_name.toUpperCase() !== 'INPUT' || tag_name.toUpperCase() !== 'VIDEO'){
					originalTEXT=originalTEXT + " #tsummarizer_"+font_sizeCurrent+"_"+font_weigthCurrent+"_beg " + tempNodeVal_arr[i] + " #tsummarizer__end. ";
				}
			}
			else if(tempNodeVal.match(/[a-zA-Z\]\[\)\(\d]+/g)){
				if(tag_name.toUpperCase() === 'B'){
					originalTEXT=originalTEXT + " #tsummarizerbold_"+font_sizeCurrent+"_"+font_weigthCurrent+"_beg " + tempNodeVal_arr[i] + " #tsummarizerbold__end ";
				}
				else if(tag_name.toUpperCase() === 'I'){
					originalTEXT=originalTEXT + " #tsummarizeritalic_"+font_sizeCurrent+"_"+font_weigthCurrent+"_beg " + tempNodeVal_arr[i] + " #tsummarizeritalic__end ";
				}
				else if(tag_name.toUpperCase() !== 'B' || tag_name.toUpperCase() !== 'I' || tag_name.toUpperCase() !== 'IMG' || tag_name.toUpperCase()!== 'FORM' || tag_name.toUpperCase() !== 'BUTTON' || tag_name.toUpperCase() !== 'INPUT' || tag_name.toUpperCase() === 'VIDEO'){
					originalTEXT=originalTEXT + " #tsummarizer_"+font_sizeCurrent+"_"+font_weigthCurrent+"_beg " + tempNodeVal_arr[i] + " #tsummarizer__end ";
				}
			}
		
		}
		
		
		//font semantic evaluation...end
	}
}
function stripVowelAccent(str)
{
	var rExps=[ /[\xC0-\xC2]/g, /[\xE0-\xE2]/g,
		/[\xC8-\xCA]/g, /[\xE8-\xEB]/g,
		/[\xCC-\xCE]/g, /[\xEC-\xEE]/g,
		/[\xD2-\xD4]/g, /[\xF2-\xF4]/g,
		/[\xD9-\xDB]/g, /[\xF9-\xFB]/g ];

	var repChar=['A','a','E','e','I','i','O','o','U','u'];

	for(var i=0; i<rExps.length; ++i)
		str=str.replace(rExps[i],repChar[i]);

	return str;
}

function retrieveHEADING_TERMS(){
	var temp_val="";
	var get_fontSizes = originalTEXT.match(/#tsummarizer\w*beg/g);
	for(var i=0;i< get_fontSizes.length;i++){
		var x_local = returnPIXEL_SIZE(get_fontSizes[i].split("_")[1])
		avgFONT_SIZE += x_local;
		if(max_fontSize< x_local){
			max_fontSize = x_local;
		}
	}
	avgFONT_SIZE = parseFloat(avgFONT_SIZE/get_fontSizes.length);
	if(max_fontSize === avgFONT_SIZE){
		max_fontSize = -1;
	}
	for(var j=0;j< countFONT_HASH;j++){
		if(returnPIXEL_SIZE(fontHASH_MAP[j].fontSize) > avgFONT_SIZE){
			temp_val = fontHASH_MAP[j].value.replace(/[^0-9a-zA-Z\s-]+/g,"").replace(/\s+/g,"\n");
			headingTERMS += temp_val;
		}
	}
	headingTERMS = headingTERMS.replace(stop_words,"");
	headingTERMS = headingTERMS.replace(/\n+/g,"|");
	headingTERMS = "/\\b(" + headingTERMS + ")\\b/gi"
	//console.log(headingTERMS);
	console.log(avgFONT_SIZE);
	
}

function returnPIXEL_SIZE(size){
	if(size.match(/[a-zA-Z]+/g)){
		if(size.match(/[a-zA-Z]+/g)[0].toUpperCase() === 'EM'){
		return parseFloat(size)*10;
		}
		else if(size.match(/[a-zA-Z]+/g)[0].toUpperCase() === 'PX'){
		return parseFloat(size);
		}
	}
	else{
	return 0;
	}
}
