function dotHandler(fragment){
	var return_val="";
	if(fragment){
		var Abbr_match_arr = fragment.match(regABBR);
		if(Abbr_match_arr){
			for(var i=0;i<Abbr_match_arr.length;i++){
				fragment = fragment.replace(Abbr_match_arr[i],Abbr_match_arr[i].replace(/\./g,"tsummarizerDotHandler"));
			}
		}
		return fragment;
	}
}
