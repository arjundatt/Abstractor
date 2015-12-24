var word_list=new Array();
var word_freq_list=new Array();
var word_list_count=0;
var original_text="";
var max=0,min=99999999;
var max_sen_pri=0,min_sen_pri=9999999;
var word_priority_list=new Array();
var sentence_list=new Array();
var sentence_pri_list=new Array();
var final_summary="";
var font_size= new Array();
var arr_size=0;
var last=0;
var font_sum=0, font_avg;
var max_font;
var max_font_a;
var length_of_summary=3;
var count=0;
var abbr_text="";

function cleanup(){
$('#summary_div').html("<h2>SUMMARY</h2>");
word_list=[];
word_freq_list=[];
word_list_count=0;
original_text="";
max=0;
min=99999999;
max_sen_pri=0;
min_sen_pri=9999999;
word_priority_list=[];
sentence_list=[];
sentence_pri_list=[];
final_summary="";
font_sum=0;
font_avg=0;
length_of_summary=3;
count=0;
}
function ajax_call(){
if (window.XMLHttpRequest)
                {// code for IE7+, Firefox, Chrome, Opera, Safari
                    txtFile = new XMLHttpRequest();
                }
                else
                {// code for IE6, IE5
                    txtFile = new ActiveXObject("Microsoft.XMLHTTP");
                }
txtFile.open("GET", "abbreviations_list.txt", false);
txtFile.onreadystatechange = function() {
if (txtFile.readyState === 4) { 
if (txtFile.status === 200) { 
abbr_text = txtFile.responseText;
}
}
}
txtFile.send(null);

}

function summarize(){
//ajax_call();
cleanup();
length_of_summary=10-($("#slider-range").slider("value"));
var or_div=document.getElementById('original_text');
get_text(or_div);

//for(var q=0;q<arr_size;q++){
//alert(font_size[q][1]+" "+font_size[q][2]+" "+font_size[q][0]);
//}


font_avg=font_sum/count;
//alert("font_avg="+font_avg);

var no_h=0;

for(var q=0;q<arr_size;q++){
if(font_size[q][1]>font_avg)
no_h++;
}


var temps;
for(var q=0;q<arr_size-1;q++)
for(var j=0;j<(arr_size-q-1);j++){
if(font_size[j+1][1]>font_size[j][1])
{

temps=font_size[j+1][0];
font_size[j+1][0]=font_size[j][0];
font_size[j][0]=temps;

temps=font_size[j+1][1];
font_size[j+1][1]=font_size[j][1];
font_size[j][1]=temps;

temps=font_size[j+1][2];
font_size[j+1][2]=font_size[j][2];
font_size[j][2]=temps;

}
else if(font_size[j+1][1]==font_size[j][1])
{
if(font_size[j+1][2]=="bold"){
temps=font_size[j+1][0];
font_size[j+1][0]=font_size[j][0];
font_size[j][0]=temps;

temps=font_size[j+1][1];
font_size[j+1][1]=font_size[j][1];
font_size[j][1]=temps;

temps=font_size[j+1][2];
font_size[j+1][2]=font_size[j][2];
font_size[j][2]=temps;

}}




}





alert("The summary is being generated\nplease wait...")

var reg1=/\W+/g;
var reg2=/\s+/g;
/*var y1=original_text.replace(reg2," ");

var z=y1.split(" ");
for(var loc=0;loc<z.length;loc++){
if(z[loc]==="."){continue;}
if(z[loc].charAt(z[loc].length-1)==='.'){
//alert(z[loc]);
var nan;var loc1,loc2;
var regz=new RegExp(z[loc],"i");
if((nan=regz.exec(abbr_text))!==null){
//for(var q=regz.lastIndex;;q++)
//alert(abbr_text.charAt(nan.index)+"  "+z[loc]);
var abbr_space=0;
var abbr_newline=0;
var flag=0;
for( loc1=nan.index;;loc1++){
if(flag==1)
break;
if(abbr_text.charAt(loc1)==" "){
for( loc2=loc1+1;;loc2++){
if(abbr_text.charAt(loc2)=='\n'){
flag=1;
break;}

}

}

}

alert(z[loc]+" "+abbr_text.substring(loc1+1,loc2-1));
original_text.replace(z[loc],abbr_text.substring(loc1+1,loc2-1));

}
}
}
alert(original_text);*/
/*original_text=original_text.replace(/U.S./i,"united states");
original_text=original_text.replace(/U.K./i,"united kingdom");
original_text=original_text.replace(/U.N./i,"united nations");
*/
var x=original_text.replace(reg1," ");
var y=original_text.replace(reg2," ");

var stop_words = /\b(the|that|they|also|it|or|he|had|this|at|was|his|from|for|by|with|is|and|of|a|are|in|as|to|by|which|on|only|into|has|all|their|an|be|then|being|we|have|not|if|these|were|a|about|above|across|after|again|against|all|almost|alone|along|already|also|although|always|among|an|and|another|any|anybody|anyone|anything|anywhere|are|area|areas|around|as|ask|asked|asking|asks|at|away|b|back|backed|backing|backs|be|became|because|become|becomes|been|before|began|behind|being|beings|better|between|big|both|but|by|c|came|can|cannot|clear|clearly|come|could|d|did|differ|different|differently|do|does|done|down|down|downed|downing|downs|during|e|each|early|either|enough|even|evenly|ever|every|everybody|everyone|everything|everywhere|f|face|faces|fact|facts|far|felt|few|find|finds|first|for|four|from|full|fully|further|furthered|furthering|furthers|g|gave|general|generally|get|gets|give|given|gives|go|going|good|goods|got|great|greater|greatest|group|grouped|grouping|groups|h|had|has|have|having|he|her|here|herself|high|high|high|higher|highest|him|himself|his|how|however|i|if|in|interest|interested|interesting|interests|into|is|it|its|itself|j|just|k|keep|keeps|kind|knew|know|known|knows|l|large|largely|last|later|latest|least|less|let|lets|like|likely|long|longer|longest|m|made|make|making|man|many|may|me|member|members|men|might|more|most|mostly|mr|mrs|much|must|my|myself|n|necessary|need|needed|needing|needs|never|new|new|newer|newest|next|no|nobody|non|noone|not|nothing|now|nowhere|number|numbers|o|of|off|often|old|older|oldest|on|once|one|only|open|opened|opening|opens|or|order|ordered|ordering|orders|other|others|our|out|over|p|page|part|parted|parting|parts|per|perhaps|place|places|present|presented|presenting|presents|put|puts|q|quite|r|rather|really|related|right|right|room|rooms|s|said|same|saw|say|says|second|seconds|see|seem|seemed|seeming|seems|sees|several|shall|she|should|show|showed|showing|shows|side|sides|simple|since|small|smaller|smallest|so|some|somebody|someone|something|somewhere|still|still|such|sure|t|take|taken|than|that|the|their|them|then|there|therefore|these|they|thing|things|think|thinks|this|those|though|thought|thoughts|three|through|thus|to|today|together|too|took|toward|turn|turned|turning|turns|two|u|under|until|up|upon|us|use|used|uses|v|very|w|want|wanted|wanting|wants|was|way|ways|we|well|wells|went|were|what|when|where|whether|which|while|who|whole|whose|why|will|with|within|without|work|worked|working|works|would|x|y|year|years|yet|you|young|younger|youngest|your|yours|z|\[edit\]|edit|called|(\d+))\b/gi
x=x.replace(stop_words,"");
x=x.replace(reg2," ");
var list_edited_words=x.toUpperCase().split(" ");
//for(var f=0;f<list_edited_words.length;f++)
//alert(list_edited_words[f]);
//alert(list_edited_words[4]);
list_edited_words.sort();
//for(var f=0;f<list_edited_words.length;f++)
//alert("++"+list_edited_words[f]+"++");
//alert(list_edited_words[2]);
var prev=null;
var j=1;

for(i=0;i<list_edited_words.length;i++){
  if(prev===list_edited_words[i]){
   j++;
  }
  else{
   if(i!==0)
    word_list[word_list_count]=prev;
   else
    word_list[word_list_count]=list_edited_words[i];
   word_freq_list[word_list_count++]=j;
   if(j>max)
    max=j;
   if(j<min)
    min=j;
   j=1;
  }
  prev=list_edited_words[i];
}
var f=100;

for(j=0;j<word_list_count;j++){
word_priority_list[j]=Math.floor((f*(word_freq_list[j]-min))/(max-min));
if(word_list[j]!=""){
var w= word_list[j].toUpperCase(); 
for(var q=0;q<arr_size;q++){
var xx=font_size[q][0].toUpperCase();
if(font_size[q][1]>font_avg && xx.indexOf(w)!=-1){
word_priority_list[j]+=(f/no_h)*(no_h-q);
//alert("no_h="+no_h+"q="+q+" "+word_list[j]+"= "+word_priority_list[j]);
}
}
}}

y=y.replace(/\[\d+\]/g,"");
sentence_list=y.split(/[\.!\?]+\s+/g);
for(i=0;i<sentence_list.length;i++){
  sentence_pri_list[i]=0;
  for(j=0;j<word_list_count;j++){
reg= new RegExp(word_list[j],"ig");
    if(sentence_list[i].match(reg))
       sentence_pri_list[i] += word_priority_list[j];	
  }



  if(sentence_pri_list[i]>max_sen_pri)
    max_sen_pri=sentence_pri_list[i];
  if(sentence_pri_list[i]<min_sen_pri)
    min_sen_pri=sentence_pri_list[i];
}
var optimum_val=(parseInt)(length_of_summary*(max_sen_pri-min_sen_pri)/10);
j=0;temp="";

for(i=0;i<sentence_list.length;i++){
var type_h=-1;
  if(sentence_list[i].match(/conclusion|conclude|significant|important|infer|inference|importantly|concluding|defined|definition/ig)){
  sentence_pri_list[i] += optimum_val;
  }
//alert("yes it is "+sentence_list[i]+"||"+sentence_list[i].charAt(sentence_list[i].length)+"||");
for(var q=0;q<arr_size;q++){
if(font_size[q][1]>font_avg){

var f=font_size[q][0].toUpperCase();
if(sentence_list[i].charAt(sentence_list[i].length-1)==" "){
for(var z=sentence_list[i].length-1;sentence_list[i].charAt(z)==" ";z--);
 sentence_list[i]=sentence_list[i].substr(0,z+1);
}
var s=sentence_list[i].toUpperCase();
//alert(f+"||"+s+"||"+f.indexOf(s));
if(f.indexOf(s) !== -1){
//alert("here");
type_h=q;
break;}
}
}

 if(type_h==-1) {
if(sentence_pri_list[i]>optimum_val)
final_summary += (++j)+". "+sentence_list[i]+ "<br/>";
}     

else
{
//alert("yoyo");
final_summary+= "<span style='font-size:"+ font_size[type_h][1] +"px'><b>"+sentence_list[i]+"</b></span><br/>"

}



}
$('#summary_div').append(final_summary);
//$('#temp').append(temp);

}




function get_text(node){ // Using DOM properties it retrieves text from a web page in the same domain.
//alert("initial= "+original_text);
var temp,check=0,temp1="";
if (node.hasChildNodes) {
var local_counter;
		for (local_counter=0;local_counter<node.childNodes.length;local_counter++) {
			get_text(node.childNodes[local_counter]);
		}
	}
if ((node.nodeType == 3)&&(node.nodeType!==8)) { // text node
var tempNodeVal = stripVowelAccent(node.nodeValue);
//alert("tempNodeVal= "+tempNodeVal);     
//here
//alert($(node.parentNode).css("font-size")+"  "+node.nodeValue);
//alert(node.parentNode.nodeName+" "+tempNodeVal);
temp=$(node.parentNode).css("font-size");
temp1=$(node.parentNode).css("font-weight");
temp=temp.replace("px","");
temp=parseInt(temp);
if(tempNodeVal.match(/\w/)!==null){
font_sum+= temp;
count++;
if(arr_size==0)
{
font_size[0]=new Array();
font_size[0][0]=tempNodeVal;
font_size[0][1]=temp;
font_size[0][2]=temp1;
max_font=temp;
max_font_a=0;
arr_size++;
}
else
{
for(var a=0;a<arr_size;a++){
if(temp==font_size[a][1]&& temp1==font_size[a][2]){
if(a!=last){
font_size[last][0]= font_size[last][0]+"|||";
original_text=original_text+". ";
}
font_size[a][0]= font_size[a][0]+" "+tempNodeVal;
check=1;
last=a;
if(temp>max_font)
{
max_font=temp;
max_font_a=a;
}
}
}

if(check==0)
{
if(temp>max_font)
{
max_font=temp;
max_font_a=arr_size;
}

font_size[last][0]= font_size[last][0]+"|||";
original_text=original_text+". ";
font_size[arr_size++]=new Array();
font_size[arr_size-1][0]=tempNodeVal;
font_size[arr_size-1][1]= temp;
font_size[arr_size-1][2]= temp1;

last=a;
}}

}
//alert("original_text= "+original_text);
original_text=original_text+tempNodeVal+" ";//here
//alert(original_text);
}
return;
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
