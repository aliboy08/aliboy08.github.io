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

// Detectt element in viewport
/* var isInViewport = function(el) {
	var bounding = el.getBoundingClientRect();
	return (
		bounding.top >= 0 &&
		bounding.left >= 0 &&
		bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}; */

// Check if element has class


/* function animateElements(els){
	els.forEach(function(el, index){
		if( isInViewport(el)) {
			console.log(el);
		}
	});
}

var animate_elements = document.querySelectorAll('.animate');
window.addEventListener('scroll', function (event) {
	animateElements(animate_elements);
}, false); */

var AnimateElements = function(selector, inViewClass, outViewClass, offset = 0){
	
	// Declare variables
	var elements;
	
	var _init = function(){
		
		elements = document.querySelectorAll(selector);
		// document.querySelectorAll doesn't return an array but an object.
		// To turn this object into a loopable array, you can use Array.prototype.slice.call(arrayName)
		elements = Array.prototype.slice.call(elements);
		
		_addEventHandlers();
		_inView();
	}
	
	var _addEventHandlers = function(){
		window.addEventListener('scroll', _inView, false);
		window.addEventListener('resize', _inView, false);
	}
	
	var _inView = function() {
		
		elements.forEach(function(element, index) {
			
			var pos = element.getBoundingClientRect();
			
			//console.log('client height', element.clientHeight);
			//console.log('top', pos.top);
			//console.log('bottom', pos.bottom);
			//console.log('window.innerHeight', window.innerHeight);
			
			if(
				pos.top >= 0 && pos.left >= 0 &&
				pos.bottom <= (window.innerHeight + offset || document.documentElement.clientHeight + offset) &&
				pos.right <= (window.innerWidth + offset || document.documentElement.clientWidth + offset)
			) {
				
				// In view
				if( !element.classList.contains(inViewClass) ) {
					
					element.classList.add(inViewClass);
					
					if( element.classList.contains('animate-once') ) {
						// Remove element in array after animation
						elements.splice(index, 1);
					}
				}
				
			} else if( pos.bottom < 0 || pos.top > window.innerHeight ) {
				
				// Out view
				if( element.classList.contains(inViewClass) ) {
					element.classList.remove(inViewClass);
				}
				
			}
			
		});
	}
	
	return {
		init: _init
	}
}

AnimateElements('.on-screen-blur', 'blur-out-expand', null, 50).init();
