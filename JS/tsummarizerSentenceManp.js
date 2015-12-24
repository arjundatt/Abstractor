var sentenceLIST=new Object();
var NounsLIST= new Object();
var maxNounScore= 20;
var minNounScore= 5;
var maxVal=-Number.MAX_VALUE; //max frequency of proper noun
var minVal=Number.MAX_VALUE; //min frequency of proper noun
var count_nouns=-1;	
var maxSENTENCE_PRIORITY=-Number.MAX_VALUE;
var minSENTENCE_PRIORITY=Number.MAX_VALUE;


function sentenceSEGMENATION(){
	var sent_list_temp=new Array();
	var y=originalTEXT.replace(reg2," ");	//removed white space characters
	y=y.replace(/\[[\da-zA-Z]+\]/g,"");
	sent_list_temp=y.split(/[\.!\?]+["']*\s+/g);
	sentenceSCORING(sent_list_temp);
}

function sentenceSCORING(sent_list_temp){
	var headingTERMS_reg = new RegExp(headingTERMS);
	var List_Common_Words = AJAX_retrieve_file_ListCommonWords();
	identifyPROPER_NOUNS(List_Common_Words);
	retrieveHEADING_TERMS();
	for(var i=0;i< sent_list_temp.length; i++){
		sentenceLIST[i] = new Object();
		sentenceLIST[i].line=sent_list_temp[i];
		sentenceLIST[i].priorityTERM=0;
		sentenceLIST[i].priorityEMPH_WORD=0;
		sentenceLIST[i].priorityPROPER_NOUN=0;
		sentenceLIST[i].priorityHEADING_TERMS=0;
		sentenceLIST[i].priorityTOTAL=0;
		//priority according to term frequency...begin
		for(var j=0;j<countTERMS;j++){
			var rl1= new RegExp(wordFREQ_LIST[j].term,"ig");
			if((sentenceLIST[i].line).match(rl1)){
				sentenceLIST[i].priorityTERM += parseFloat((((sentenceLIST[i].line).match(rl1).length)*wordFREQ_LIST[j].priority));
			}
		}
		if((sentenceLIST[i].line).match(/\s/g)){
			//sentenceLIST[i].priorityTERM /= ((sentenceLIST[i].line).match(/\s/g).length)/10;
		}
		//end...priority according to term frequency
		//priority according to emphasis words...begin
		for(var k=0;k<emphasis_words.length;k++){
			var rl2= new RegExp(emphasis_words[k]+"[a-z,]*","ig");
			if((sentenceLIST[i].line).match(rl2)){
				sentenceLIST[i].priorityEMPH_WORD += parseFloat(((sentenceLIST[i].line).match(rl2).length)*5);
			}
		}
		//end...priority according to emphasis words
		//priority according to prper noun...begin
		for(var h=0;h<count_nouns;h++){
			var rl4 = new RegExp(NounsLIST[h].term,"g");
			//console.log(NounsLIST[h].term);
			if((sentenceLIST[i].line).match(rl4)){
			
				sentenceLIST[i].priorityPROPER_NOUN += minNounScore + (sentenceLIST[i].line).match(rl4).length * (parseFloat(((maxNounScore - minNounScore)*(parseFloat(NounsLIST[h].freq)-minVal))/(maxVal-minVal)));	
			}
		}		
		//end...priority according to proper noun
		//priority according to heading terms...begin
		if((sentenceLIST[i].line).match(headingTERMS_reg)){
			sentenceLIST[i].priorityHEADING_TERMS = parseFloat(((sentenceLIST[i].line).match(headingTERMS_reg).length)*5);
			//console.log((sentenceLIST[i].line));
		}
		//end...priority according to heading terms
		var total_priority=sentenceLIST[i].priorityTERM + sentenceLIST[i].priorityPROPER_NOUN + sentenceLIST[i].priorityEMPH_WORD + sentenceLIST[i].priorityHEADING_TERMS;
		sentenceLIST[i].priorityTOTAL = total_priority;
		if(total_priority > maxSENTENCE_PRIORITY){
			maxSENTENCE_PRIORITY = total_priority;
		}
		if(total_priority < minSENTENCE_PRIORITY){
			minSENTENCE_PRIORITY = total_priority;
		}
	}
	generateSUMMARY(sent_list_temp.length);
}

function identifyPROPER_NOUNS(List_Common_Words){
	var ProperNouns="";
	var x=new Array();
	var prev_noun=null;
	var count_noun_freq=0;
	var y=originalTEXT.replace(reg2," ");
	var Caps_Words=y.match(/\b[A-Z][a-zA-Z]*\b/g);
	var rl3= new RegExp("^("+List_Common_Words+")(ing|s|ly|d|ed)*","i");
	for(var i=0;i<Caps_Words.length;i++){
		if(!(Caps_Words[i].match(rl3))){
			//console.log("1st  "+Caps_Words[i]);
			ProperNouns += Caps_Words[i] + "|";	
		}
		else if((Caps_Words[i].match(rl3)[0]).toLowerCase() !== Caps_Words[i].toLowerCase()){
			//console.log("2nd  "+Caps_Words[i]);
			ProperNouns += Caps_Words[i] + "|";
		}
	}
	x=ProperNouns.replace(/\|$/,"").split('|');
	x.sort();
	for(var j=0;j< x.length;j++){
		if(prev_noun !== x[j]){
		count_noun_freq=1;
		count_nouns++;
		NounsLIST[count_nouns]=new Object();
		NounsLIST[count_nouns].term = x[j];
		NounsLIST[count_nouns].freq = count_noun_freq;	
		}
		else if(prev_noun === x[j]){
			NounsLIST[count_nouns].freq = ++count_noun_freq;
		}
		prev_noun=x[j];
		if(maxVal < NounsLIST[count_nouns].freq){
			maxVal = NounsLIST[count_nouns].freq;
		}
		if(minVal > NounsLIST[count_nouns].freq){
			minVal = NounsLIST[count_nouns].freq;
		}
	}
}


