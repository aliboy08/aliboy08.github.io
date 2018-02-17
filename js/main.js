document.onreadystatechange = function(){
	// Load complete
	if( document.readyState === 'complete' ) {
		var loader = document.getElementById('loading');
		loader.style.opacity = 0;
		setTimeout(function(){
			loader.parentNode.removeChild(loader);
		}, 510)
	}
}
