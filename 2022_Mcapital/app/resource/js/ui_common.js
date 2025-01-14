/* v4.1 | 2022-07-28 */
/*---------------------------------------------
	대분류
---------------------------------------------*/
/*
	중분류
*/
/* 소분류 */



/*---------------------------------------------
	ready, load
---------------------------------------------*/
$(document).ready(function(){
	iptFocusScrl();
});


$(window).on('load',function(){
	fnPreload();	
});



/*---------------------------------------------
	preload, init
---------------------------------------------*/
/* preload */
function fnPreload(){
	fnInit();
	fnIframe();
	seLayout.loadInit();
	seSlideToggle.init();
	seTermsDepth.init();
	bodyScrlControl.init();
	tabFix.init();
	seSelect.init();
}

function fnInit(){	
	seInput.init(); 
}







/*---------------------------------------------
	Android 인풋 포커스 스크롤 이슈
---------------------------------------------*/
function iptFocusScrl() {
	if(/Android/i.test(navigator.userAgent) ) {
		window.addEventListener("resize", function(){
			if( document.activeElement.tagName=="INPUT" ){
				window.setTimeout(function(){
					document.activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
				},0);
			}
		});
	}
}



/*---------------------------------------------
	layout #레이아웃
---------------------------------------------*/
/*
	function
*/
var seLayout = (function() {
	var lastY = 0;

	return {
		loadInit : function(){
			$('.contents').each(function(){
				$(this).css('padding-bottom', $(this).find('.contents-bottom').outerHeight() ) 
			});

			$('body').removeClass('has-scroll');

			setTimeout(function() {
                lastY = 0;
                $(window).scrollTop(0);
                $('.header.ty-bg').removeClass('fixed');
            }, 10);
		},
		headerAni : function() {
			if( $('.header').hasClass('ty-bg') ) {
                if( lastY > 55 ) {
                    $('.header').addClass('fixed');
                } else {
                    $('.header').removeClass('fixed');
                }
            }
		},
		scrolling : function(target){
			seLayout.headerAni();

			lastY = $(window).scrollTop();
			
			if( lastY == 0 ){
				$('body').removeClass('has-scroll');
			} else {
				$('body').addClass('has-scroll');
			};			
		},	
	}
})();


/*
	event
*/
$(window).on('scroll',function(){
	seLayout.scrolling();
});




/*---------------------------------------------
	allmenu #전체메뉴
---------------------------------------------*/
/*
    function
*/
var allMenu = (function() {
	return {
		open : function() {
			$('.layout-allmenu').addClass('on');
			$('body').css('overflow', 'hidden');
		},
		close : function() {
			$('.layout-allmenu').removeClass('on');
			$('body').css('overflow', 'auto');
		}
	}
})();
	

/*
	event
*/
$(document).on('click', '.btn-menu-open', function() {
	allMenu.open();
});

$(document).on('click', '.btn-menu.close', function() {
	allMenu.close();
});



/*---------------------------------------------
	input field #인풋 필드
---------------------------------------------*/
/*
	function
*/ 
var seInputIsClear = false;
function seInput(){	
	var method = {	
		base: function(){
			return {
				textfldClass: 'se-textfld',		
				datefldClass: 'se-date',				
				fldFrontClass: 'e-front',
				fldBackClass: 'e-back',
				fldClearBtnClass: 'btn-input-clear',
				fldAlignRClass: 'tar',
				dataWidth: 'data-width',
				dataFldAlign: 'data-fld-align',
				dataFldClear: 'data-fld-clear',
				inputBackHtml: '<div class="e-back"></div>',
				clearBtnHtml: '<button type="button" class="se-btn btn-input-clear">문구삭제</button>'					
			}
		},	
		init: function(){	
			//class
			var textfldClass = method.base().textfldClass,
				datefldClass = method.base().datefldClass,					
				fldFrontClass = method.base().fldFrontClass,
				fldBackClass = method.base().fldBackClass,				
				fldAlignRClass = method.base().fldAlignRClass;
			
			// data
			var dataWidth = method.base().dataWidth,
				dataFldAlign = method.base().dataFldAlign,
				dataFldClear = method.base().dataFldClear;

			// selector
			var $textfld = $('.'+ textfldClass+'');
			var $datefld = $('.'+ datefldClass+'');
			
			for( var i = 0; i < $textfld.length; i++ ){	
				// selector				
				var $this = $textfld.eq(i),
					$input = $textfld.eq(i).find('input'),
					$fldFront = $textfld.eq(i).find('.'+fldFrontClass+''),
					$fldBack = $textfld.eq(i).find('.'+fldBackClass+'');				

				// size
				var fldFrontW = Math.floor($fldFront.outerWidth()),
					fldBackW = Math.floor($fldBack.outerWidth());	

				// textfld size init
				$fldFront.attr(dataWidth,fldFrontW);
				$fldBack.attr(dataWidth,fldBackW);					

				$input.css({							
					'padding-left': Number($fldFront.attr(dataWidth)),
					'padding-right': Number($fldBack.attr(dataWidth)),
				});	

				// textfld align init
				if( $this.attr(dataFldAlign) == 'right'){
					
					if( $input.val() == ''){
						$this.removeClass(fldAlignRClass)
					}else {
						$this.addClass(fldAlignRClass)
					};
				};
			}

			for( var i = 0; i < $datefld.length; i++ ){	
				// selector				
				var $this = $datefld.eq(i),
					$input = $datefld.eq(i).find('input'),
					$fldFront = $datefld.eq(i).find('.'+fldFrontClass+''),
					$fldBack = $datefld.eq(i).find('.'+fldBackClass+'');	

				// size
				var fldFrontW = Math.floor($fldFront.outerWidth()),
					fldBackW = Math.floor($fldBack.outerWidth());	

				// textfld size init
				$fldFront.attr(dataWidth,fldFrontW);
				$fldBack.attr(dataWidth,fldBackW);		

				$input.css({							
					'padding-left': Number($fldFront.attr(dataWidth)),
					'padding-right': Number($fldBack.attr(dataWidth)),
					'background-position': 'right'+' '+Number($fldBack.attr(dataWidth))+'px'+' center',								
				});					
			}
		},
		focusAlign: function(target){	
			var $target = $(target);					

			if( $target.find('input').val() == ''){ // input 값 없을 경우
				$target.removeClass(method.base().fldAlignRClass)
			}else { // input 값 있을 경우
				$target.addClass(method.base().fldAlignRClass)
			};
		},
		clearAppend: function(target){
			var $target = $(target);				
			if( $target.find('input').attr('readonly') != 'readonly' && $target.find('input').attr('disabled') != 'disabled') {
				if( $target.find('input').val() == '' || $target.find('input').attr('disabled')){ // input 값 없을 경우
					$target.find('.'+method.base().fldClearBtnClass+'').remove();
				}else { // input 값 있을 경우
					if( $target.find('.'+method.base().fldClearBtnClass+'').length == 0 ){				
						if($target.find('.'+method.base().fldBackClass+'').length == 0){
							$target.append(method.base().inputBackHtml);
							$target.find('.'+method.base().fldBackClass+'').prepend(method.base().clearBtnHtml);
						}else {
							$target.find('.'+method.base().fldBackClass+'').prepend(method.base().clearBtnHtml);
						};
						
						method.init();	
					};			
				};
			}
		},
		clearRemove: function(target){			
			var $target = $(target);
			if ( !seInputIsClear ){
				$target.find('.'+method.base().fldClearBtnClass+'').remove();			
			}

			method.init();	
		},
	};

	return method;		  
};
var seInput = new seInput();


/*
	event
*/
/* input - clear */
$(document).on('focus', '[data-fld-clear="on"]', function(){
	seInput.clearAppend($(this));		
});	

$(document).on('keyup', '[data-fld-clear="on"]', function(){
	seInput.clearAppend($(this));	
});	

$(document).on('focusout', '[data-fld-clear="on"]', function(){
	seInput.clearRemove($(this));			
});	

/* input - align */
$(document).on('focus', '[data-fld-align="right"]', function(){
	seInput.focusAlign($(this));	
});		

$(document).on('keyup', '[data-fld-align="right"]', function(){	
	seInput.focusAlign($(this));
			
});

$(document).on('focusout', '[data-fld-align="right"]', function(){
	seInput.focusAlign($(this));
});


$(document).on('mousedown', '.btn-input-clear', function(){	
	seInputIsClear = true;
	$(this).closest('.se-textfld').find('input').val('');
	seInputIsClear = false;
});



/*---------------------------------------------
	Custom Select Function #셀렉트
---------------------------------------------*/
/*
	function
*/
var customSelect = function(element) {
	/* Funtion Define */
	var fnName = '[data-stove="select"]'
		$this = $(element).closest(fnName),
		$select = $this.find('select');
		$stage = $('body');

	/* Class Define */
	var	onClass = 'on',
		dimClass = 'stove-dim',
		optionLayerClass = 'stove-option-layer',
		optionLayerScrollClass = 'stove-option-scroll',
		optionLayerCloseClass = 'stove-btn-close',
		optionTitleClass = 'stove-options-title',
		optionListClass= 'stove-options',
		optionClass = 'stove-option';

	/* Extend Define */
	var	nowStatus = $this.attr('data-status'),
		statusDisabled = $select.attr('disabled'),
		statusReadonly = $select.attr('readonly'),		
		uiCase = $this.attr('data-uicase'),
		optionLength = $select.children('option').length;
		

	/* Reset */
	if ( statusDisabled == 'disabled' ||  statusReadonly == 'readonly' ) return;
	$(fnName).find('.'+dimClass+', .'+optionLayerClass+'').remove();	

	/* Option Init */
	$select.before('<div class="'+dimClass+'"></div>');	
	$select.after('<div class="'+optionLayerClass+'" role="dialog"></div>');

	var $dim = $this.find('.'+dimClass),
		$optionLayer = $this.find('.'+optionLayerClass);	
	var $optionScroll = $('<div>', {
			class: optionLayerScrollClass
		}).appendTo($optionLayer);
	var $optionList = $('<div>', {
			class: optionListClass
		}).appendTo($optionScroll);	
	for ( var i = 0; i < optionLength; i++ ) {
		var option = $select.children('option').eq(i);
		if ( option.attr('disabled') && option.attr('selected') && option.attr('hidden') ) {    
			if ( uiCase == 'slide' ) {        
				// $('<div>', {
				// 	class: optionTitleClass,
				// 	text: option.text(),
				// 	rel: option.val()
				// }).appendTo($optionList);
			}     
		} else if ( option.attr('disabled') ) {        
			$('<button>', {
				class: optionClass,
				text: option.text(),
				disabled: 'disabled'
			}).attr('data-value', option.val()).appendTo($optionList);			    
		} else if ( option.attr('hidden') ) {   
			
		} else {
			$('<button>', {
				class: optionClass,
				text: option.text(),
			}).attr('data-value', option.val()).appendTo($optionList);
		}
	}
	
	var $optionBtn = $optionList.find('button');
	var $closeBtn = $('<button>', {
		class: optionLayerCloseClass,
		title: '닫기'
	}).appendTo($optionLayer);

	var $optionTitle = $('<div>', {
		class: optionTitleClass,
		text: $this.find('.e-hidden-title').text()
	}).prependTo($optionLayer);

	setTimeout(function(){
		$optionBtn.each(function(){
			var thisRel = $(this).attr('data-value'),
				thisValue = $select.val();
				
			if ( thisRel == thisValue ) {
				$(this).addClass(onClass);
			}			
			
		})
		// $select.find('option').each(function(){
		// 	var thisOpDis = $(this).attr('disabled');

		// 	if($(this).prop('disabled')){

		// 		if($(this).val() == $optionBtn.attr('rel')){
		// 			$optionBtn.addClass('disabled')
		// 		}
				
		// 	}
		// 	// if( thisRel == thisOpDis ){
		// 	// 	$(this).addClass('disabled')
		// 	// }
		// })
	}, 0);

		
	/* Common Function */	
	function open(){		
		$optionLayer.addClass('va-'+uiCase); 			
		if ( uiCase == 'slide' ) {			
			setTimeout(function(){	
				$dim.addClass(onClass);
				$optionLayer.addClass(onClass)		
				$stage.css({'overflow':'hidden'})	
			}, 0);	
			setTimeout(function(){
				$optionLayer.attr('tabindex', 0).focus();
			},0);		
			$dim.click(function(e) {
				e.stopPropagation();
				close();
			});								
		} else {
			// $optionLayer.attr('tabindex', 0).focus();
			// $stage.on({ 
			// 	click: function(e) { 
			// 		if(!$(e.target).hasClass($this)) { 			
			// 			close();
			// 		};
			// 	}, keydown: function(e) { 
			// 		if ( e.keyCode==27 ) {
			// 			e.stopPropagation();
			// 			close();
			// 		};
			// 	}
			// });
		};
		$this.attr('data-status','open');
	};

	function close(){					
		if ( uiCase == 'slide' ) {		
			setTimeout(function(){				
				$dim.remove();
				$optionLayer.remove();
				$stage.css({'overflow':'auto'})	
				
			}, 0);
		} else {
			// $stage.off('click keydown');		
			// setTimeout(function(){			
			// 	$optionLayer.remove();
			// }, 0);			
		};
		setTimeout(function(){				
			// $select.focus();
			$this.removeAttr('data-status');	
		}, 1);				
		return;
	};

	/* Event Binding */
	$select.on({
		keydown: function(e) {
			if ( e.keyCode==27 ) {
				e.stopPropagation();
				close();
			};
		}
	});

	$optionLayer.on({ 
		click: function(e) { 
			e.stopPropagation();
		}, keydown: function(e) { 
			if ( e.keyCode==27 ) {
				e.stopPropagation();
				close();
			};
		}
	});

	$closeBtn.on({ // 닫기
		click: function(e) {
			e.stopPropagation();
			close();
		}, blur: function(e) { 	
			$optionLayer.addClass(onClass).attr('tabindex', 0).focus();		
		}
	});

	$optionBtn.on({ // 옵션선택
		click: function(e) {
			e.stopPropagation();    
			$select.val($(this).attr('data-value')).trigger('change');
			close();
			
			var $fakeSlt = $this.closest('.se-select').find('.btn-fake-slt'), 
				$fakeSltVal = $fakeSlt.find('.value');
			var sltVal = $(this).text().toString();

			$fakeSlt.focus();
			$fakeSlt.addClass('selected');
			$fakeSltVal.text( sltVal ); 
		}
	});
		
	/* Init */		
	if ( nowStatus == 'open' ) {
		close();		
	} else {
		open();
	}
}



/*
	event
*/
$(document).on('click','.se-select .btn-fake-slt', function() {
	if ( $(this).siblings('select').prop('disabled') ) return;
	customSelect( $(this).closest('.se-select').find('select') );
});



/*---------------------------------------------
	select #셀렉트
---------------------------------------------*/
/*
	function
*/
var seSelect = (function(){ 
	return {
		init : function() { // 초기화
			$('.se-select').each(function() {
				if( $(this).attr('data-stove') == 'select' ) { // 커스텀셀렉트
					if ( $(this).find('.btn-fake-slt').length != 0 ) return;
					$(this).append('<button type="button" class="se-btn btn-fake-slt"><span class="placeholder"></span><span class="value"></span></button>');

					var $select = $(this).find('select'),
						$fakeSlt = $(this).find('.btn-fake-slt'),
						$fakeSltPlaceholder = $fakeSlt.find('.placeholder'),
						$fakeSltVal = $fakeSlt.find('.value');
					
					if( $select.attr('disabled') ) {
						$fakeSlt.addClass('disabled');
					}

					$select.find('option').each(function() {
						if( $(this).attr('hidden') ) {
							$fakeSltPlaceholder.text( $(this).text() ); 
						} 
						if( $(this).attr('selected') ) {
							$fakeSlt.addClass('selected');
							$fakeSltVal.text( $(this).text() );
						} 
					});
				}
			});
		},
		errorChk : function( _target ) { // 에러감지
			var	$slt = $(_target),
				$sltWrap = $slt.closest('.se-select'),
				$fakeSlt = $sltWrap.find('.btn-fake-slt');
			
			if( $slt.hasClass('has-error') ) {
				$fakeSlt.addClass('has-error');
			} else {
				$fakeSlt.removeClass('has-error');
			}
		},
		/**
		 * 값을 자동으로 변경한 경우 헬퍼 fn
		 * @param _target : .se-select 의 특정 ID 
		 */
		valChk : function( _target ) { 
			var $seSlt = $(_target);
			var $select = $seSlt.find('select'),
				$fakeSlt = $seSlt.find('.btn-fake-slt'),
				$fakeSltVal = $fakeSlt.find('.value');
			
			if( $select.attr('disabled') || $select.prop('disabled') == true ) {
				$fakeSlt.addClass('disabled');
			} else {
				$fakeSlt.removeClass('disabled');
			}

			$select.find('option').each(function() {
				if( $(this).prop('selected') == true && $(this).prop('hidden') != true ) {
					$fakeSlt.addClass('selected');
					$fakeSltVal.text( $(this).text() );
				}  
				if( $(this).prop('selected') == true && $(this).prop('hidden') == true && $(this).index() == 0 ) {
					$fakeSlt.removeClass('selected');
					$fakeSltVal.text('');
				}
			});
		}
	}
})();


/*
	event
*/
$(document).on('change', '[data-stove="select"] select', function(){
	seSelect.errorChk( $(this) );
});



/*---------------------------------------------
	slide toggle popup #슬라이드토글 
	* 차량선택확인 팝업 전용
---------------------------------------------*/
/*
	function
*/ 
var seSlideToggle = (function() {
    var slideTg = 'layout-slide-toggle',
		popLayer = 'popup-layer',
		popHeader = 'popup-header',
		popfooter = 'popup-footer',
		optionChoice = 'option-choice-wrap',
		toggleOn = 'toggle-on';

    return {
        init : function() { // 초기화
            var $slideTg = $('.'+ slideTg +''),
				$contsInner = $('.layout').find('.contents-inner');
            
            $slideTg.each(function() {
				var $thisLayer = $(this).find('.' + popLayer + ''),
					$thisOptChoice = $thisLayer.find('.' + optionChoice +''),
					$thisHeader = $thisLayer.find('.' + popfooter +''),
					$thisFooter = $thisLayer.find('.' + popfooter +''),
					$thisBar = $thisFooter.find('.linebar');
				var slideH = 0;

                if( $(this).hasClass('on') ) { // 열림
					$thisOptChoice.addClass( toggleOn );
					$thisFooter.addClass( toggleOn );
					$('body').css('overflow','hidden');	

					slideH = $thisOptChoice.outerHeight(true)+ $thisHeader.outerHeight(true) + $thisFooter.outerHeight(true);

					if( slideH > ($(window).outerHeight() - 55) ) { // 최대높이설정
						slideH = $(window).outerHeight() - 55;
					} 
					$thisLayer.css('height' , Math.round(slideH) );
					$thisBar.css('display', 'block');
                } else { // 닫힘
                    $thisOptChoice.removeClass( toggleOn );
					$thisFooter.removeClass( toggleOn );
					$('body').css('overflow','auto');
					$thisLayer.css('height' , 'auto' );
					slideH = Math.round( $thisLayer.outerHeight());

					$thisLayer.attr('data-offset', slideH);
					$thisLayer.css('height', slideH);
					$thisBar.css('display', 'none');
                }

				$contsInner.css('padding-bottom', slideH + 40 );
            })
        },
        slideUp : function( _target ) { // 열기
            var $targetSlide = $(_target ),
                $targetLayer = $targetSlide.find('.' + popLayer + ''),
                $targetHeader = $targetLayer.find('.' + popHeader +''),
                $targetFooter = $targetLayer.find('.' + popfooter +''),
                $targetOptChoice = $targetLayer.find('.' + optionChoice +''),
				$targetBar = $targetFooter.find('.linebar');
			var slideH = 0;
		
			$targetSlide.addClass('on');
			$targetOptChoice.addClass( toggleOn );
            $targetFooter.addClass( toggleOn );
            $('body').css('overflow','hidden');	
			if( $targetFooter.find('.total-amount-area').length != 0 ) {
				slideH = $targetOptChoice.prop('offsetHeight')+ $targetHeader.prop('offsetHeight') + $targetFooter.prop('offsetHeight') + 21; // 20(linebar 마진값) + 1(linbar높이)
			} else {
				slideH = $targetOptChoice.prop('offsetHeight')+ $targetHeader.prop('offsetHeight') + $targetFooter.prop('offsetHeight');
			}

            if( slideH > ($(window).outerHeight() - 55) ) { // 최대높이설정
                slideH = $(window).outerHeight() - 55;
            } 
			$targetLayer.stop().animate({
				height : Math.round(slideH)
			}, 200, 'linear', function() {
				$targetBar.css('display', 'block');
			});
			
        },
        slideDown : function( _target ) { // 닫기
            var $targetSlide = $(_target ),
                $targetLayer = $targetSlide.find('.' + popLayer + ''),
                $targetFooter = $targetLayer.find('.' + popfooter +''),
				$targetOptChoice = $targetLayer.find('.' + optionChoice +'');
            
            $targetSlide.removeClass('on');
            $targetOptChoice.removeClass( toggleOn );
            $targetFooter.removeClass( toggleOn );
			$('.linebar').css('display', 'none');

			$targetLayer.stop().animate({
                height : $targetLayer.attr('data-offset')
            }, 200, 'linear')
            $('body').css('overflow','auto');	
        },
        toggle : function( _target ) {
            var $targetSlide = $(_target).closest('.' + slideTg +'');

            if( $targetSlide.hasClass('on') ) {
                this.slideDown( $targetSlide );
            } else {
                this.slideUp( $targetSlide );
            }
        }
    }
})();


/*
	event
*/
$(document).on('click', '[data-slide-toggle="on"] .popup-toggle', function() {
    seSlideToggle.toggle( $(this) );
});



/*---------------------------------------------
	terms #약관
---------------------------------------------*/
/*
	function
*/
var seTerms = (function() {
	return {
		show : function( target ){
			var $targetTerms = $(target);

			$targetTerms.addClass('on');
		},
		hide : function( target ){
			var $targetTerms = $(target);
				
			$targetTerms.removeClass('on');
		},
		toggle : function( target ){
			var $target = $(target),
				$targetTerms = $target.closest('.terms-pack');

			if ( $targetTerms.hasClass('on') ){
				seTerms.hide( $targetTerms );
			} else {
				seTerms.show( $targetTerms );
			}
		}
	}
})();

/*
	event
*/
$(document).on('click','.terms-pack .checkbox-box .fold-btn .se-btn', function(){
	seTerms.toggle( $(this) );
});



/*---------------------------------------------
	terms-depth #약관뎁스
---------------------------------------------*/
/*
	function
*/
var seTermsDepth = (function() {
	return {
		init : function(){
			$('.terms-depth > li .fold-btn').each(function(){
				if ( $(this).closest('li').hasClass('on') ){
					$(this).closest('li').find('.terms-depth').show();
				} else {
					$(this).closest('li').find('.terms-depth').hide();
				}
			});
		},
		show : function( target ){
			var $targetTerms = target;

			$targetTerms.addClass('on')
			$targetTerms.find('.terms-depth').show();
		},
		hide : function( target ){
			var $targetTerms = target;
				
			$targetTerms.removeClass('on')
			$targetTerms.find('.terms-depth').hide();
		},
		toggle : function( target ){
			var $target = $(target),
				$targetTerms = $target.closest('li');
				
			if ( $targetTerms.hasClass('on') ){
				seTermsDepth.hide( $targetTerms );
			} else {
				seTermsDepth.show( $targetTerms );
			}
		}
	}
})();


/*
	event
*/
$(document).on('click','.terms-depth > li .fold-btn .se-btn', function(){
	seTermsDepth.toggle( $(this) );
});



/*---------------------------------------------
	tooltip #툴팁
---------------------------------------------*/
/*
	function
*/
function tooltipOpen(e){ // 툴팁 열기
	var $target = $(e.target),
		$tooltip = $target.closest('.se-tooltip'),
		$allTooltipBox = $('.se-tooltip-box'),
		$tooltipBox = $tooltip.find('.se-tooltip-box');

	var clickY = e.clientY + 5, // click + gap
		winH = $(window).outerHeight(),	
		tooltipOffsetL = $target.offset().left,	
		winW = $(window).outerWidth(),
		winH = $(window).outerHeight();

	var paddingX = 30,
		gapY = 15;

	if( $('body').find('.popup-footer').length > 0 ){
		var contsH = winH - ( $('body').find('.popup-footer').outerHeight() );
	} else if ($('body').find('.contents-bottom').length > 0 ) {
		var contsH = winH - ( $('body').find('.contents-bottom').outerHeight() );
	} else {
		var contsH = winH;
	}
	
	$allTooltipBox.removeClass('on top'); // reset
	
	$tooltipBox.css({
		width: winW - paddingX,
		left: (-tooltipOffsetL) + 15		
	});
	
	
	$tooltipBox.attr('tabindex', 0).focus();	
	
	// 툴팁 위치
	if( contsH > clickY + $tooltipBox.outerHeight() + gapY ){
		$tooltipBox.removeClass('top')
		
	} else {
		$tooltipBox.addClass('top')
	}	
	
	$tooltipBox.addClass('on');	
}

function tooltipHide(target){ // 툴팁 닫기
	var $tooltip = $(target);
	var $tooltipBox = $tooltip.find('.se-tooltip-box');

	$tooltipBox.removeClass('on top');
};

function tooltipBodyClick(e){ // 툴팁 외부 영역 닫기
	var $target = e.target;	

	if( $target.closest('.se-tooltip') == null){
		$('.se-tooltip-box').removeClass('on top')
	}
};


/*
	event
*/
$(document).on('click','body',function(e){	
	tooltipBodyClick(e);	
});

$(document).on('click', '.se-tooltip > .se-btn', function(e){	
	tooltipOpen(e)
});

$(document).on('click', '.btn-tooltip-close', function(e){
	e.stopPropagation();	
	
	tooltipHide($(this).closest('.se-tooltip'));
});



/*---------------------------------------------
	range
---------------------------------------------*/
function numberWithCommas(n) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



/*---------------------------------------------
	layout fixed
---------------------------------------------*/
/*
	function
*/
var seFixed = (function(){
	return {
		init : function() {
			setTimeout(function(){
				$(window).scrollTop(0);
			},1);
		},
		scroll : function() {
			var _scrT = $(window).scrollTop();

			if ( _scrT > 20 ){ // step-pack 간격 값
				$('body').addClass('do-fixed');
			} else {
				$('body').removeClass('do-fixed');
			}
		}
	}
})();


/*
	event
*/
$(window).on('load', function(){
	seFixed.init();
})

$(window).on('scroll', function(){
	seFixed.scroll();
})



/*---------------------------------------------
	form check toggle #체크토글
---------------------------------------------*/
/*
	function
*/ 
function chkToggleFunc( _target ){
	var $target = $( _target ),
		$targetWrap = $target.closest('[data-chk-tgl="on"]'),
		$targetChk = $target.find('input')
		$activeTarget = $targetWrap.find('[data-chk-tgl="target"]'),
		$activeFakeSlt = $targetWrap.find('.btn-fake-slt');
		
	if( $targetChk.prop('checked') == true ){
		$activeTarget.removeAttr('disabled');
		$activeFakeSlt.removeClass('disabled');
	} else {
		$activeTarget.attr('disabled','disabled');
		$activeFakeSlt.addClass('disabled');
	}
}


/*
	event
*/
$(document).on('click','[data-chk-tgl="on"] .se-chkbx',function(){
	chkToggleFunc( $(this) );
});



/*---------------------------------------------
	iframe 높이 잡기
---------------------------------------------*/
function fnIframe(){
	$('.pdf-wrap').each(function(){
		$(this).css('height', $(window).outerHeight()/2.5 )
	})
}


/*---------------------------------------------
	tabFx #탭고정
---------------------------------------------*/
/*
	function
*/
var tabFix = (function() {
	var tabTop = null;
	var tabH = null;

	return {
		init : function() {
			setTimeout(function(){
				$(window).scrollTop(0);
			},1);
		},
		fullPopInit : function() { // 풀팝업 비동기 대응(함수호출)
			$('.layout-fullpop .popup-container').on('scroll', function(e) {
				if( $(document).find('[data-fixed="on"]').length ) {
					tabFix.fix( $(e.currentTarget) )
				}
			});			
		},
		fix : function( _target ) {
			var $target = _target;
			var $tab = null;
			var $targetParent = null;
			var $targetHeader = null;
			var $targetContain = null;

			if( $target.closest('.layout-fullpop').length ) { // 풀팝업
				$targetParent = $target.closest('.layout-fullpop');
				$targetHeader = $targetParent.find('.popup-header');
				$targetContain = $targetParent.find('.popup-container');
				$tab = $targetContain.find('.se-tabbtn[data-fixed="on"]');

				if( !$tab.attr('fixed') == 'on' ){ return }

				tabTop = $tab.offset().top;
			} else { // 페이지
				$targetParent = $(document).find('.layout');
				$targetHeader = $targetParent.find('.header');
				$targetContain = $targetParent.find('.container');
				$tab = $targetContain.find('.se-tabbtn[data-fixed="on"]');

				if( !$tab.attr('fixed') == 'on' ){ return }

				tabTop = $tab.offset().top - $target.scrollTop();
			}
			$cloneTab = $tab.clone();
			tabH = $tab.outerHeight();

			if( tabTop < 55 ) {
				if( $targetHeader.find('.se-tabbtn').length == 0 ) {
					$targetParent.addClass('tabFixed');
					$targetHeader.append( $cloneTab );
					$targetHeader.css({
						'height' : 55 + tabH -7,
					});
					if( $targetHeader.hasClass('popup-header') ) {
						$targetHeader.css({
							'padding-bottom' : tabH + 15 -7,
						});
					}
				}
			} else {
				$targetHeader.find('.se-tabbtn').remove();
				$targetParent.removeClass('tabFixed');
				$targetHeader.css({
					'height' : 55,
				});
				if( $targetHeader.hasClass('popup-header') ) {
					$targetHeader.css({
						'padding-bottom' : 15,
					});
				}
			}	
		}
	}
})();


/*
	event
*/
$(window).on('scroll', function(e) {
	if( $(document).find('[data-fixed="on"]').length ) {
		tabFix.fix( $(e.currentTarget) )
	}
});



/*---------------------------------------------
	accordion #아코디언
--------------------------------------------*/
/*
	function
*/
var accord = (function() {
	return {
		open : function( _this ) {
			var $this = _this,
				$thisAccodList = $this.closest('li'),
				$thisAccod = $this.closest('.sp-accord')

			$thisAccod.find('li').removeClass('on');
			$thisAccod.find('.btn-accod-open > span').text('내용열기');

			$thisAccodList.addClass('on');			
			$thisAccodList.find('.btn-accod-open > span').text('내용닫기');
		},
		close : function( _this ) {
			var $this = _this,
				$thisAccod = $this.closest('.sp-accord');
			
			$thisAccod.find('li').removeClass('on');
			$thisAccod.find('.btn-accod-open > span').text('내용열기');
		},
		toggle : function( _this ) {
			var $this = _this,
			$thisAccodList = $this.closest('li');

			if( $thisAccodList.hasClass('on') ) {
				accord.close( $this );
			} else {
				accord.open( $this );
			}
		}
	}
})();


/*
	event
*/
$(document).on('click', '.btn-accod-open', function() {
	accord.toggle( $(this) );
});



/*---------------------------------------------
	접기펼치기(기본기능)
---------------------------------------------*/
$(document).on('click', '[data-fold="on"] .se-btn.btn-fold', function(){
	var $this = $(this);
	var $thisP = $this.closest('[data-fold="on"]');

	if ( $thisP.hasClass('on') ){
		$thisP.removeClass('on');
	} else {
		$thisP.addClass('on');
	}
});



/*---------------------------------------------
    pieChartFunc #차트#파이차트
--------------------------------------------*/
/**
 * function
 * @param {number} _duration 애니메이션시간(단위: ms)
 */
function pieChartFunc( _duration ) {
	var $target = $('.se-chart'),
		$circles = $target.find('circle');

	var r = Number( $circles.css('r').replace(/\px/g,'') ),
		d = 2 * Math.PI * r,
		filled = 0,
		duration = _duration;

	$circles.each(function( _idx ) {
		var $thisCircle = $(this);
		var per = Number($thisCircle.data('percent')) / 100,
			path = per * d,
			rotate = filled * 360,
			currentDuration = duration * per,
			delay = duration * filled;

		if( per == 0 ) return; // 0%인 경우 애니메이션안함 
		$thisCircle.addClass('ani');

		$thisCircle.css({
			'stroke-dasharray' : (path +','+ d),
			'stroke-dashoffset': path,	
			'transform' : 'rotate(' + rotate + 'deg)',	
		});    

		$thisCircle.delay( delay ).animate({
			'stroke-dashoffset': 0,				
		}, currentDuration, 'linear');    

		filled += per;
	});
}



/*---------------------------------------------
    bodyScrlControl #바디스크롤제어
--------------------------------------------*/
var bodyScrlControl = (function(){
	return {
		init : function() {
			// 열린팝업체크
			if( $(document).find('.layout-slide.slide-up').length ) { // 슬라이드팝업 열려있을 경우
				$('body').css('overflow', 'hidden');
			} 
			if( $(document).find('.layout-popup').length && $(document).find('.layout-popup').css('display') != 'none' ) { // 팝업 열려있을 경우
				$('body').css('overflow', 'hidden');
			}
			if( $(document).find('.layout-alert').length && $(document).find('.layout-alert').css('display') != 'none' ) { // 얼럿 열려있을 경우
				$('body').css('overflow', 'hidden');
			} 

			// 닫힌팝업체크
			if( $(document).find('.layout-slide.slide-up').length == 0 ) {
				if( $(document).find('.layout-popup').length == 0 && $(document).find('.layout-alert').length == 0 ) {
					$('body').css('overflow', 'auto');
				} 
				if( $(document).find('.layout-popup').length != 0 && $(document).find('.layout-popup').css('display') == 'none' ) {
					$('body').css('overflow', 'auto');
				} 
				if( $(document).find('.layout-alert').length != 0 && $(document).find('.layout-alert').css('display') == 'none' ) {
					$('body').css('overflow', 'auto');
				} 
			}
			bodyScrlControl.event();
		},
		event : function() {
			$(document).on('click', 'button, a', function() { //  팝업열기
				if( $(this).closest('.layout-fullpop').length ) return;
		
				if( $(document).find('.layout-slide.slide-up').length ) { // 슬라이드팝업 열려있을 경우
					$('body').css('overflow', 'hidden');
				} 
				if( $(document).find('.layout-popup').length && $(document).find('.layout-popup').css('display') != 'none' ) { // 팝업 열려있을 경우
					$('body').css('overflow', 'hidden');
				}
				if( $(document).find('.layout-alert').length && $(document).find('.layout-alert').css('display') != 'none' ) { // 얼럿 열려있을 경우
					$('body').css('overflow', 'hidden');
				} 
			});
		
			$(document).on('click', '.layout-slide .popup-close, .popup-footer .se-btn', function() { // 팝업닫기
				if( $(this).closest('.layout-fullpop').length ) return;
		
				if( $(document).find('.layout-slide.slide-up').length == 0 ) {
					if( $(document).find('.layout-popup').length == 0 && $(document).find('.layout-alert').length == 0 ) {
						$('body').css('overflow', 'auto');
					} 
					if( $(document).find('.layout-popup').length != 0 && $(document).find('.layout-popup').css('display') == 'none' ) {
						$('body').css('overflow', 'auto');
					} 
					if( $(document).find('.layout-alert').length != 0 && $(document).find('.layout-alert').css('display') == 'none' ) {
						$('body').css('overflow', 'auto');
					} 
				}
			});
		}
	}
})();



