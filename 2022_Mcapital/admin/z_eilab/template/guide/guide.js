/* EiLAB Publishing Guide | version 5.5.3 | date 2021-06-08 since 2016.12.23 */

////////////////////////////////////////////////////////////////////////////////////////////////////
////// 함수 실행
////////////////////////////////////////////////////////////////////////////////////////////////////
copyCode('.source_code');

/****************************************************************************
  소스보기 팝업
****************************************************************************/

/*----------------------------------------
 # popupSource		소스보기 팝업
----------------------------------------*/

function copyCode(target){
	var _target = $(target);

	var _this = _target;
	_this.parents('.ex_type').append('<div class="sourceWindow"><div class="sourceWindow_close">X</div><pre class="sourceView"></pre></div>');

	for ( var i = 0; i <_this.length; i++ ){
		var getText = String(_this[i].innerHTML);	
		// var replaceText = getText.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
		$('.sourceWindow .sourceView')[i].append(getText);
	}

	$(document).on('click','.source', function(){
		$('body').append('<div class="sourceDim"></div>');
		var _this = $(this);

		_this.parents('.ex_type').find('.sourceWindow').addClass('active')
	});

	$(document).on('click','.sourceWindow .sourceWindow_close', function(){
		$('.sourceDim').remove();
		var _this = $(this);

		_this.parents('.ex_type').find('.sourceWindow').removeClass('active')
	});
	
	$('.copy').on('click', function(){
		var _this = $(this);
		_this.addClass('on');
		_this.text('✓');
		_this.attr('disabled', '')
	
		var step1 = _this.closest('.ex_type').find('.sourceView').text();
		var step2 = step1.replace('\n', '');
		var pos = step2.lastIndexOf('\n			');
		
		navigator.clipboard.writeText(step2.substring(0,pos));
	
		setTimeout(function(){
			_this.removeClass('on');
			_this.text('copy');
			_this.removeAttr('disabled');
		},750)
	})

}