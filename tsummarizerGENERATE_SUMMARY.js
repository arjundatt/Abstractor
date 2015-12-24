function generateSUMMARY(no_OFsentences){
//console.log(fontHASH_MAP);
//console.log(avgFONT_SIZE);
	finalSUMMARY += "<ul>"; 
	var optimum_val=(parseFloat)(length_of_summary*(maxSENTENCE_PRIORITY-minSENTENCE_PRIORITY)/10);
	for(var i=0,j=0;i<no_OFsentences;i++){
		if(i===0 || sentenceLIST[i].priorityTOTAL>optimum_val && sentenceLIST[i].line.match(/[a-zA-Z]+/g) || (sentenceLIST[i].line.match(/tsummarizer\w*beg/g) && parseInt(sentenceLIST[i].line.match(/tsummarizer\w*beg/g)[0].split('_')[1]) === max_fontSize)){
			finalSUMMARY += "<li>";
			//sentenceLIST[i].line = sentenceLIST[i].line.replace(/^(\s*<br)+/g,"");
			if(sentenceLIST[i].line.match(/tsummarizerbold\w*beg/g)){
				sentenceLIST[i].line = sentenceLIST[i].line.replace(/#tsummarizerbold\w*beg/g,"<b style='font-size:"+sentenceLIST[i].line.match(/#tsummarizerbold\w*beg/g)[0].split('_')[1]+";font-weight:"+sentenceLIST[i].line.match(/#tsummarizerbold\w*beg/g)[0].split('_')[2]+"'>");
				if(sentenceLIST[i].line.match(/#tsummarizerbold\w*end/g)){
					sentenceLIST[i].line = sentenceLIST[i].line.replace(/#tsummarizerbold\w*end/g,"</b>");
					//finalSUMMARY += parseInt(++j)+". "+sentenceLIST[i].line+ ".<br/>";
				}
				//else
				//	finalSUMMARY += parseInt(++j)+". "+sentenceLIST[i].line+ "</b>.<br/>";
				//console.log("bold");
			}
			if(sentenceLIST[i].line.match(/#tsummarizeritalic\w*beg/g)){
				sentenceLIST[i].line = sentenceLIST[i].line.replace(/#tsummarizeritalic\w*beg/g,"<i style='font-size:"+sentenceLIST[i].line.match(/#tsummarizeritalic\w*beg/g)[0].split('_')[1]+";font-weight:"+sentenceLIST[i].line.match(/#tsummarizeritalic\w*beg/g)[0].split('_')[2]+"'>");
					if(sentenceLIST[i].line.match(/#tsummarizeritalic\w*end/g)){
						sentenceLIST[i].line = sentenceLIST[i].line.replace(/#tsummarizeritalic\w*end/g,"</i>");
				//		finalSUMMARY += parseInt(++j)+". "+sentenceLIST[i].line+ ".<br/>";
					}
				//	else
				//		finalSUMMARY += parseInt(++j)+". "+sentenceLIST[i].line+ "</i>.<br/>";
					//console.log("italic");
			}
			if(sentenceLIST[i].line.match(/#tsummarizer\w*beg/g)){
				var len_local=(sentenceLIST[i].line.match(/#tsummarizer\w*beg/g)).length;
				for(q=0;q < len_local;q++){
					var font_size_local = parseInt(sentenceLIST[i].line.match(/#tsummarizer\w*beg/g)[0].split('_')[1]);
					sentenceLIST[i].line = sentenceLIST[i].line.replace(sentenceLIST[i].line.match(/#tsummarizer\w*beg/g)[0],"<span style='font-size:"+sentenceLIST[i].line.match(/#tsummarizer\w*beg/g)[0].split('_')[1]+";font-weight:"+sentenceLIST[i].line.match(/#tsummarizer\w*beg/g)[0].split('_')[2]+"'>");
				/*if(sentenceLIST[i].line.match(/#tsummarizer\w*end/g) && font_size_local <= avgFONT_SIZE){
					sentenceLIST[i].line = sentenceLIST[i].line.replace(sentenceLIST[i].line.match(/#tsummarizer\w*end/g)[0],"</span>");
			//		finalSUMMARY += parseInt(++j)+". "+sentenceLIST[i].line+ ".<br/>";
				}
				else if(sentenceLIST[i].line.match(/#tsummarizer\w*end/g) && font_size_local > avgFONT_SIZE){
					sentenceLIST[i].line = sentenceLIST[i].line.replace(sentenceLIST[i].line.match(/#tsummarizer\w*end/g)[0],"</span><br/>");
			//		finalSUMMARY += parseInt(++j)+". "+sentenceLIST[i].line+ ".<br/>";
				}*/
				}
				if(sentenceLIST[i].line.match(/#tsummarizer\w*end/g)){
					sentenceLIST[i].line = sentenceLIST[i].line.replace(/#tsummarizer\w*end/g,"</span>");
			//		finalSUMMARY += parseInt(++j)+". "+sentenceLIST[i].line+ ".<br/>";
				}
			//	else
					//		finalSUMMARY += parseInt(++j)+". "+sentenceLIST[i].line+ "</span>.<br/>";
				//console.log("bold");
			}
			if(sentenceLIST[i].line.match(/#tsummarizerbold\w*end/g)){
				sentenceLIST[i].line.replace(/#tsummarizerbold\w*end/g,"</b>");
			}
			if(sentenceLIST[i].line.match(/#tsummarizeritalic\w*end/g)){
				sentenceLIST[i].line.replace(/#tsummarizeritalic\w*end/g,"</i>");
			}
			if(sentenceLIST[i].line.match(/#tsummarizer\w*end/g)){
				sentenceLIST[i].line.replace(/#tsummarizer\w*end/g,"</span>");
			}
			finalSUMMARY += sentenceLIST[i].line+ ".<br/></li>";
		} 
	}
	finalSUMMARY += "</ul>";
	finalSUMMARY=finalSUMMARY.replace(/(<br\/?>)+/g,"<br/>");
	finalSUMMARY=finalSUMMARY.replace(/\[((citation needed)|cite|edit|\d+)\]/g,"");
	finalSUMMARY=finalSUMMARY.replace(/tsummarizerDotHandler/g,".");
	
	$('#summary_div').append(finalSUMMARY);
	
}
