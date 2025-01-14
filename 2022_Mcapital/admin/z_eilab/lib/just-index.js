var fw = 0;
var fh = 0;
var vw = 0;
var vh = 0;

function getSize(){	
	fw = $('#frameView').innerWidth();
	fh = $('#frameView').innerHeight();
	vw = $('.list-frameview').innerWidth();
	vh = $('.list-frameview').innerHeight();
}

$('.frame-header .after .right .row button').each(function(){
	$(this).find('.w').text( $(this).attr('data-w') )
	$(this).find('.h').text( $(this).attr('data-h') )
})

$(window).on('load', function(){
	getSize();
	$('.frame-header .iw').val( fw )
	$('.frame-header .ih').val( fh )
})

$(window).on('resize', function(){
	getSize();
})

$(document).on('click', '.mode-on', function(){
	$('.eilab-frame').addClass('resize-mode')
	$('.frame-wrapper').css('width', '375px')
	getSize();
	$('.frame-header .iw').val( fw )
	$('.frame-header .ih').val( fh )
})

$(document).on('click', '.mode-off', function(){
	$('.eilab-frame').removeClass('resize-mode column scrl-off')
	$('.frame-wrapper').attr('style', '')
	$('.frame-header .iw').val( fw )
	$('.frame-header .ih').val( fh )
	$('input').val('');
	$('.direction').text('화면목록 아래로')
	$('.btn-scrl-off').text('스크롤바숨기기');
	$('button').removeClass('on')
	$('input').removeClass('on')
})

$(document).on('click', '.fixsize', function(){
	if ( $(this).attr('data-w') > vw - 20 - 17 ){
		callAlert('too_big_w', vw - 20 - 17 )
		return;
	} else {
		$('.fixsize').removeClass('on');
		$('input').removeClass('on');
		$(this).addClass('on')
		$('.frame-wrapper').css({
			'width' : $(this).attr('data-w'),
			'height' : $(this).attr('data-h'),
		})
		$('.frame-header .iw').val( $(this).attr('data-w') )
		$('.frame-header .ih').val( $(this).attr('data-h') )
	}
})

var minW = 250;
var minH = 400;
var maxH = 3000;

function inputInit(type){
	if ( type == 'iw' ){
		setTimeout(function(){
			$('.frame-header .ih').blur();
			$('.frame-header .iw').focus();
		},10)
	}
	if ( type == 'ih' ) {
		setTimeout(function(){
			$('.frame-header .iw').blur();
			$('.frame-header .ih').focus();
		},10)
	}
}
$(document).on('keydown', '.frame-header .iw', function(event){
	var v = $(this).val();
	if ( event.which == 13 || event.which == 9 ){
		$('.fixsize').removeClass('on')
		if ( v < minW ) {
			callAlert('too_small', minW);
			inputInit('iw')
		} else if ( v > vw - 20 - 17 ) { 
			callAlert('too_big_w', vw - 20 - 17 )
			inputInit('iw')
		} else {
			$('.frame-wrapper').css('width', v )
			$(this).addClass('on');
		}
	}
})

$(document).on('keydown', '.frame-header .ih', function(event){
	var v = $(this).val();
	if ( event.which == 13 || event.which == 9 ){
		$('.fixsize').removeClass('on')
		if ( v < minH ) {
			callAlert('too_small', minH);
			inputInit('ih');
		} else if ( v > maxH ) {
			callAlert('too_big_h', maxH );
			inputInit('ih');
		} else {
			$('.frame-wrapper').css('height', v)
			$(this).addClass('on');
		}
	}
})

function callAlert(type, msg1){
	if ( type == 'too_small' ) {
		alert('입력한 해상도가 너무 작습니다. '+msg1+' 이상 설정하세요.');
	} else if ( type == 'too_big_w' ){
		alert('입력한 해상도가 브라우저 가용 범위보다 큽니다. '+msg1+' 이하로 설정하세요.')
	} else if ( type == 'too_big_h' ){
		alert('입력한 해상도가 너무 큽니다. '+msg1+' 이하로 설정하세요.')
	}
}

$(document).on('click', '.direction', function(){
	if ( $('.eilab-frame').hasClass('column') ){
		$('.eilab-frame').removeClass('column')
		$(this).text('화면목록 아래로').removeClass('on');
		getSize();
	} else {
		$('.eilab-frame').addClass('column')
		$(this).text('화면목록 옆으로').addClass('on');
		getSize();
	}
})



/*
	스크롤바 숨기기, 보이기
*/
$(document).on('click', '.btn-scrl-off', function(){
	if( $('.eilab-frame').hasClass('scrl-off') ) { //show
		$('.eilab-frame').removeClass('scrl-off');
		$(this).text('스크롤바숨기기').removeClass('on')
	} else { // hide
		$('.eilab-frame').addClass('scrl-off');
		$(this).text('스크롤바보이기').addClass('on')
	}
})