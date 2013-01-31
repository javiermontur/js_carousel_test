function isStart(leftPos) {
	if(leftPos >= 0){
		return true;	
	} 
	return false;
}

function isEnd(carouselWidth, leftPos, listWidth) {
	if((carouselWidth-leftPos) >= listWidth) {
		return true;
	}
	return false;
}

function validatePosition(carouselWidth, leftPos, listWidth) {
	if(isStart(leftPos)) {
		$("#carousel .nav .prev").addClass('off');
	} else if (isEnd(carouselWidth, leftPos, listWidth)) {
		$("#carousel .nav .next").addClass('off');
	} else {
		$("#carousel .nav .prev, #carousel .nav .next").removeClass('off');
	}
}

$('document').ready(function(){
	var visibleElm = 3;
	var itemWidth = $('#carousel .list-wrapper ul > li').outerWidth(true);
	var itemheight = $('#carousel .list-wrapper ul > li').outerHeight(true);
	var carouselWidth = itemWidth*visibleElm;
	var listWidth = 0;
	var pos = $('#carousel .list-wrapper > ul').position();
	var leftPos = pos.left;
	
	//Settings
	$('#carousel .list-wrapper ul > li').each(function() {
		listWidth += $(this).outerWidth(true);
	});
	$('#carousel, #carousel .list-wrapper').css('width', carouselWidth);
	$('#carousel, #carousel .list-wrapper').css('height', itemheight);
	$('#carousel .list-wrapper > ul').css('width', listWidth);
	
	validatePosition(carouselWidth, leftPos, listWidth);
	
	$("#carousel .nav a").click(function(e) {
		e.preventDefault();
		btn = $(this).parent();
		if(btn.hasClass('next')) {
			if(!isEnd(carouselWidth, leftPos, listWidth)){
				leftPos -= carouselWidth;
				$('#carousel .list-wrapper ul').animate({left: '-='+carouselWidth}, 1000, 'swing', 
				function() {
					validatePosition(carouselWidth, leftPos, listWidth);
				});
			} 
		} else if(btn.hasClass('prev')) {
			if(!isStart(leftPos)){
				leftPos += carouselWidth;
				$('#carousel .list-wrapper ul').animate({left: '+='+carouselWidth}, 1000, 'swing', 
				function() {
					validatePosition(carouselWidth, leftPos, listWidth);
				});
			} 
		} 
	});
});