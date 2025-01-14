/* v0.2 | 2022-04-29 */
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
$(document).ready(function() {

});

$(window).on('load', function() {
	layout.init(); // 레이아웃초기화
	tblScrl.init(); // 테이블스크롤초기화
	datepicker.init(); // 데이트피커초기화
}); 


/*---------------------------------------------
	layout #레이아웃
---------------------------------------------*/
var layout = (function() {
	var lastScrlLeft = 0;

	return {
		init : function() {
			setTimeout(function() {
				lastScrlLeft = 0;
				$(window).scrollTop(0);
				$(window).scrollLeft(0);
				$('.layout .sidenav-area').css({'margin-left' : 0 });
				$('.layout .conts-head').css({'margin-left' : 0 });
				$('.layout .footer').css({'margin-left' : 0 });
			}, 50);
		},
		scrl : function() {
			
			if( lastScrlLeft != $(window).scrollLeft() ) {
				$('.layout .sidenav-area').css({'margin-left' : -$(window).scrollLeft() });
				$('.layout .conts-head').css({'margin-left' : -$(window).scrollLeft() });
				$('.layout .footer').css({'margin-left' : -$(window).scrollLeft() });
	
				lastScrlLeft = $(window).scrollLeft();
			}
		}
	}
})();

/*
	이벤트
*/
$(window).on('scroll', function() {
	layout.scrl();
});

/*---------------------------------------------
	gnb #메뉴
---------------------------------------------*/
var gnb = (function() {
	return {
		open : function( _target ) {
			var $target = $(_target),
				$targetLi = $target.closest('li'),
				$targetUl = $targetLi.closest('ul');
			
			$targetUl.find('li').removeClass('on');
			$targetLi.addClass('on');
		},
		close : function( _target ) {
			var $target = $(_target),
				$targetLi = $target.closest('li'),
				$targetUl = $targetLi.closest('ul');

			if( $targetUl.hasClass('depth1') ) {
				$targetLi.removeClass('on');
				$targetLi.find('.depth2 li').removeClass('on');
			} else {
				$targetLi.removeClass('on');
			}
				
		},
		toggle : function( _target ) {
			var $target = $(_target);

			if( $target.closest('li').hasClass('on') ) {
				gnb.close( $target );
			} else {
				gnb.open( $target );
			}
		}
	}
})();

/*
	event
*/
$(document).on('click', '.btn-gnb-open', function() {
	gnb.toggle( $(this) );
});

/*---------------------------------------------
	tblScrl #반응형테이블
---------------------------------------------*/
var tblScrl = (function() {
	return {
		init : function() {
			$('.tbl-scrl-box').each(function() {
				var $target = $(this),
					$tblBody =$target.find('.tbl-body');
				var minW = 0;

				if( $target.find('colgroup').length ) { // colgroup있을때 
					$target.addClass('with-col')
					$target.find('colgroup col').each(function() {
						minW += Number($(this).css('width').slice(0, -2));
					});
					$target.find('.sp-tbl').css('min-width', minW);
				}

				if( $tblBody.find('thead').length ) { // thead있는 경우
					$target.prepend('<div class="tbl-head"><div class="sp-tbl ty-list"><table></table></div></div>');
					var tblHeadClone = $tblBody.find('thead').clone(),
						$tblHead = $target.find('.tbl-head'),
						$tblBodyTh = $tblBody.find('thead tr th');

					$tblHead.find('table').append( tblHeadClone );
					var $tblHeadTh = $tblHead.find('thead tr th');
					

					if( $target.hasClass('with-col') ) { // colgroup있을때 
						$tblBodyTh.each( function( idx ) {
							$tblHeadTh.eq( idx ).css('width' , $target.find('colgroup col').eq(idx).css('width') );
						});
					} else {
						$tblBodyTh.each( function( idx ) {
							$tblHeadTh.eq( idx ).css('min-width' , $(this).outerWidth() );
						});
					}

					tblScrl.scrl(); // 돔로드후이벤트바인딩
				} else {
					$target.addClass('ty-nohead');
				}
			});
		
		},
		scrl : function() {
			$('.tbl-scrl-box .tbl-body').scroll(function() {
				var $target = $(this),
					$tblHead = $target.closest('.tbl-scrl-box').find('.tbl-head');
	
				$tblHead.css('margin-left', -$target.scrollLeft() );
			})
		}
	}
})();


/*---------------------------------------------
	loading #로딩
---------------------------------------------*/
function loadingInit() { 
	var $loadingImg = $(document).find('.layout-loading .loading-img img');

	$loadingImg.attr('src', function(){ return $(this).attr('src')+"?a="+Math.random()} );
}



/*---------------------------------------------
	datepicker #데이트피커
---------------------------------------------*/
var datepicker = (function(){
	return {
		init : function() {
			// 날짜선택
			$('[data-datepicker="el"] input').each(function() { 
				var $iptDate = $(this);

				$iptDate.datepicker({
					showMonthAfterYear : true, // 년도 먼저 나오고, 뒤에 월 표시
					dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'], // 요일텍스트
					monthNames : ['1','2','3','4','5','6','7','8','9','10','11','12'], // 월 텍스트
					dateFormat : 'yy-mm-dd', // 텍스트 필드 입력날짜 형식		
					closeText : '닫기', // 닫기 버튼 패널
					showOtherMonths: true, // 현재 '월' 이전, 이후 빈칸에 이전달, 다음달 날짜 출력 여부	
					beforeShow : function(){	// 달력생성 전
						datepicker.setting( $iptDate );		
						
						$(document).find('.ui-datepicker').removeClass('ui-range');							
					}, 							
					onChangeMonthYear: function(){ // 년 또는 월 변경시						
						datepicker.setting( $iptDate );	
					},			
					onSelect : function(){ // 달력 선택될때					
						datepicker.setting( $iptDate );											
					}, 
				});
			});

			// 기간선택
			$('[data-dateRange="el"]').each(function() {
				var $dateRange = $(this),
					$fromDate = $dateRange.find('.se-datepicker.from input'),
					$toDate = $dateRange.find('.se-datepicker.to input');
				var fromDate = null,
					toDate = null;

				$fromDate.datepicker({
					showMonthAfterYear : true, 
					dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
					monthNames : ['1','2','3','4','5','6','7','8','9','10','11','12'],
					dateFormat : 'yy-mm-dd', 	
					closeText : '닫기', 
					showOtherMonths: true, 
					beforeShowDay : function( date ) {
						if( date.getTime() == Number($toDate.datepicker('option', 'minDate')) && date.getTime() == Number($fromDate.datepicker('option', 'maxDate')) ) {
							return [true, ''];
						}

						if( date.getTime() >= Number($toDate.datepicker('option', 'minDate')) && date.getTime() <= Number($fromDate.datepicker('option', 'maxDate')) ) {
							if( date.getTime() == Number($toDate.datepicker('option', 'minDate')) ) {
								return [true, 'ui-state-range-from'];
							} else if ( date.getTime() == Number($fromDate.datepicker('option', 'maxDate')) ) {
								if( $toDate.datepicker('option', 'minDate') == undefined ) {
									return [true, ''];
								}
								return [true, 'ui-state-range-to'];
							} else {
								if( $toDate.datepicker('option', 'minDate') == undefined ) {
									return [true, ''];
								}
								return [true, 'ui-state-range'];
							}
						} else {
							return [true, ''];
						}
					},
					beforeShow : function(){	
						datepicker.setting( $fromDate );	
						$(document).find('.ui-datepicker').addClass('ui-range');
				
						if( !$fromDate.hasClass('uiAct') && toDate != null ) {
							$fromDate.datepicker('setDate', toDate)
						}
						if( $dateRange.hasClass('ty-min') ) {
							$fromDate.datepicker('option', 'minDate', new Date());
						}
					}, 			
					onChangeMonthYear: function(){ 				
						datepicker.setting( $fromDate );	
					},			
					onSelect : function(){ 		
						$fromDate.addClass('uiAct');
						datepicker.setting( $fromDate );	
						$toDate.datepicker('option', 'minDate', datepicker.getDate(this));
						$('.ui-datepicker').hide();
					}, 
					onClose : function() {
						fromDate = datepicker.getDate(this);
					},
				});
				$toDate.datepicker({
					showMonthAfterYear : true, 
					dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'], 
					monthNames : ['1','2','3','4','5','6','7','8','9','10','11','12'], 
					dateFormat : 'yy-mm-dd', 
					closeText : '닫기',
					showOtherMonths: true, 
					beforeShowDay : function( date ) {
						if( date.getTime() == Number($toDate.datepicker('option', 'minDate')) && date.getTime() == Number($fromDate.datepicker('option', 'maxDate')) ) {
							return [true, ''];
						}
						if( date.getTime() >= Number($toDate.datepicker('option', 'minDate')) && date.getTime() <= Number($fromDate.datepicker('option', 'maxDate')) ) {

							if( date.getTime() == Number($toDate.datepicker('option', 'minDate')) ) {
								return [true, 'ui-state-range-from'];
							} else if ( date.getTime() == Number($fromDate.datepicker('option', 'maxDate')) ) {
								if( $toDate.datepicker('option', 'minDate') == undefined ) {
									return [true, ''];
								}
								return [true, 'ui-state-range-to'];
							} else {
								if( $toDate.datepicker('option', 'minDate') == undefined ) {
									return [true, ''];
								}
								return [true, 'ui-state-range'];
							}
						} else {
							return [true, ''];
						}
					},
					beforeShow : function() {	
						datepicker.setting( $toDate );		
						$(document).find('.ui-datepicker').addClass('ui-range');
						
						if( !$toDate.hasClass('uiAct') && fromDate != null ) {
							$toDate.datepicker('setDate', fromDate);
					
						}
						
					}, 							
					onChangeMonthYear: function() { 			
						datepicker.setting( $toDate );	
					},			
					onSelect : function() { 	
						$toDate.addClass('uiAct');
						datepicker.setting( $toDate );	
						$fromDate.datepicker('option', 'maxDate', datepicker.getDate(this));	
						$('.ui-datepicker').hide();
					}, 
					onClose :function() {
						toDate = datepicker.getDate(this);
						
					}
				});	
			})

			// 기간선택(시작날짜 오늘날짜 이전 선택안됨)
			$('[data-dateRange="el"]').each(function() {
				var $dateRange = $(this),
					$fromDate = $dateRange.find('.se-datepicker.from input'),
					$toDate = $dateRange.find('.se-datepicker.to input');
				var fromDate = null,
					toDate = null;

				$fromDate.datepicker({
					showMonthAfterYear : true, 
					dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
					monthNames : ['1','2','3','4','5','6','7','8','9','10','11','12'],
					dateFormat : 'yy-mm-dd', 	
					closeText : '닫기', 
					showOtherMonths: true, 
					beforeShowDay : function( date ) {
						
						if( date.getTime() == Number($toDate.datepicker('option', 'minDate')) && date.getTime() == Number($fromDate.datepicker('option', 'maxDate')) ) {
							return [true, ''];
						}

						if( date.getTime() >= Number($toDate.datepicker('option', 'minDate')) && date.getTime() <= Number($fromDate.datepicker('option', 'maxDate')) ) {
							if( date.getTime() == Number($toDate.datepicker('option', 'minDate')) ) {
								return [true, 'ui-state-range-from'];
							} else if ( date.getTime() == Number($fromDate.datepicker('option', 'maxDate')) ) {
								if( $toDate.datepicker('option', 'minDate') == undefined ) {
									return [true, ''];
								}
								return [true, 'ui-state-range-to'];
							} else {
								if( $toDate.datepicker('option', 'minDate') == undefined ) {
									return [true, ''];
								}
								return [true, 'ui-state-range'];
							}
						} else {
							return [true, ''];
						}
					},
					beforeShow : function(){	
						datepicker.setting( $fromDate );
						
						$(document).find('.ui-datepicker').addClass('ui-range');
						
						if( !$fromDate.hasClass('uiAct') && toDate != null ) {
							$fromDate.datepicker('setDate', toDate)
						}
					
					}, 			
					onChangeMonthYear: function(){ 				
						datepicker.setting( $fromDate );	
					},			
					onSelect : function(){ 		
						$fromDate.addClass('uiAct');
						datepicker.setting( $fromDate );	
						$toDate.datepicker('option', 'minDate', datepicker.getDate(this));
					
						$('.ui-datepicker').hide();

					}, 
					onClose : function() {
						fromDate = datepicker.getDate(this);
					},
				});
				$toDate.datepicker({
					showMonthAfterYear : true, 
					dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'], 
					monthNames : ['1','2','3','4','5','6','7','8','9','10','11','12'], 
					dateFormat : 'yy-mm-dd', 
					closeText : '닫기',
					showOtherMonths: true, 
					beforeShowDay : function( date ) {
						if( date.getTime() == Number($toDate.datepicker('option', 'minDate')) && date.getTime() == Number($fromDate.datepicker('option', 'maxDate')) ) {
							return [true, ''];
						}
						if( date.getTime() >= Number($toDate.datepicker('option', 'minDate')) && date.getTime() <= Number($fromDate.datepicker('option', 'maxDate')) ) {

							if( date.getTime() == Number($toDate.datepicker('option', 'minDate')) ) {
								return [true, 'ui-state-range-from'];
							} else if ( date.getTime() == Number($fromDate.datepicker('option', 'maxDate')) ) {
								if( $toDate.datepicker('option', 'minDate') == undefined ) {
									return [true, ''];
								}
								return [true, 'ui-state-range-to'];
							} else {
								if( $toDate.datepicker('option', 'minDate') == undefined ) {
									return [true, ''];
								}
								return [true, 'ui-state-range'];
							}
						} else {
							return [true, ''];
						}
					},
					beforeShow : function() {	
						datepicker.setting( $toDate );		
						$(document).find('.ui-datepicker').addClass('ui-range');
						
						if( !$toDate.hasClass('uiAct') && fromDate != null ) {
							$toDate.datepicker('setDate', fromDate);
					
						}
						
					}, 							
					onChangeMonthYear: function() { 			
						datepicker.setting( $toDate );	
					},			
					onSelect : function() { 	
						$toDate.addClass('uiAct');
						datepicker.setting( $toDate );	
						$fromDate.datepicker('option', 'maxDate', datepicker.getDate(this));	
						$('.ui-datepicker').hide();
					}, 
					onClose :function() {
						toDate = datepicker.getDate(this);
						
					}
				});	
			})

		},
		setting : function( $this  ) {

			// 년도 변경 버튼 
			setTimeout(function() {	
				var tagName = $this.prop('tagName');
				var preYearBtn = $('<a class="prevYear" title="prevYear">Prev Year</a>');
				var nextYearBtn = $('<a class="nextYear" title="nextYear">Next year</a>');
	
				if(tagName === 'INPUT'){ // $this -> input 태그인 경우
					var $datepickerHeader = $this.datepicker("widget").find('.ui-datepicker-header');	
				} else if(tagName === 'DIV'){ // $this -> div 태그인 경우
					var $datepickerHeader = $this.find('.ui-datepicker-header');
				};										
				
				if( $datepickerHeader.find('.prevYear').length == 0 || $datepickerHeader.find('.nextYear').length == 0){		
					$datepickerHeader.append(preYearBtn).append(nextYearBtn);
				};					

				preYearBtn.off("click").on("click", function(){						
					$.datepicker._adjustDate($this, -1, 'Y');						
				});		
				nextYearBtn.off("click").on("click", function(){					
					$.datepicker._adjustDate($this, +1, 'Y');						
				});	
			}, 1);
		},
		getDate : function( _target ) {
			var date;
			try {
			  	date = $.datepicker.parseDate( 'yy-mm-dd', _target.value );
			} catch( error ) {
			  	date = null;
			}
			return date;
		},
	}
})();



/*---------------------------------------------
	modal-popup #모달팝업
---------------------------------------------*/
var modalPop = (function() {
	var popArr = [];
	var zIdx = 1000;

	return {
		nestingChk : function() {
			if( popArr.length == 0 ) {
				$('html, body').css('overflow', 'auto');
				popArr = [];
				zIdx = 1000;
			} 
		},
		open : function( _target ) {
			var $target = $(_target);
			
			$target.addClass('on');
			$('html, body').css('overflow', 'hidden');
			$target.css({
				'z-index' : zIdx
			});
			popArr.push(zIdx);
			zIdx++;
		},
		close : function( _target ) {
			var $target = $(_target),
				$targetPop = $target.closest('.layout-popup');

			$targetPop.removeClass('on');
			popArr.pop(zIdx);
			zIdx--;

			modalPop.nestingChk();
		}
	}
})();

$(document).on('click', '.se-btn.btn-popup-close', function() {
	modalPop.close( $(this) )
})




/*********************************************************************
	SELECT #셀렉트
	made by MSKANG 
*********************************************************************/
/*---------------------------------------------
	Custom Select Functionn
---------------------------------------------*/
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
		
	if ( uiCase == 'slide' ) {        
		$('<div>', {
			class: optionTitleClass,
			text: $select.attr('title')
		}).appendTo($optionLayer);
	}  

	var $closeBtn = $('<button>', {
		class: optionLayerCloseClass,
		title: '닫기'
	}).appendTo($optionLayer);

	for ( var i = 0; i < optionLength; i++ ) {
		var option = $select.children('option').eq(i);
		if ( option.attr('hidden') ) {    
 
		} else if ( option.attr('disabled') ) {       
			$('<button>', {
				class: optionClass,
				text: option.text(),
				rel: option.val(),
				disabled: 'disabled'
			}).appendTo($optionList);
		} else {
			$('<button>', {
				class: optionClass,
				text: option.text(),
				rel: option.val()
			}).appendTo($optionList);
		}
	}

	var $optionBtn = $optionList.find('button');
	setTimeout(function(){
		$optionBtn.each(function(){
			var thisRel = $(this).attr('rel'),
				thisValue = $select.val();
			if ( thisRel == thisValue ) {
				$(this).addClass(onClass);
			}
		})			
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
			}, 0);		
			$dim.click(function(e) {
				e.stopPropagation();
				close();
			});								
		} else {
			$optionLayer.attr('tabindex', 0).focus();
			$stage.on({ 
				click: function(e) { 
					if(!$(e.target).hasClass($this)) { 			
						close();
					};
				}, keydown: function(e) { 
					if ( e.keyCode==27 ) {
						e.stopPropagation();
						close();
					};
				}
			});
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
			$stage.off('click keydown');		
			setTimeout(function(){			
				$optionLayer.remove();
			}, 0);			
		};
		setTimeout(function(){				
			$select.focus();
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

	$closeBtn.on({
		click: function(e) {
			e.stopPropagation();
			close();
		}, blur: function(e) { 	
			$optionLayer.addClass(onClass).attr('tabindex', 0).focus();		
		}
	});

	$optionBtn.on({
		click: function(e) {
			e.stopPropagation();    
			$select.val($(this).attr('rel'));
			close();
		}		
	});
		
	/* Init */		
	if ( nowStatus == 'open' ) {
		close();		
	} else {
		open();
	}
	
}


/*---------------------------------------------
	커스텀 셀렉트 Event
---------------------------------------------*/
/* 셀렉트박스 이벤트바인딩*/
$(document).on('mousedown','.se-select[data-stove="select"] select',function(e){
	e.preventDefault();
});
$(document).on('keydown','.se-select[data-stove="select"] select',function(e){
	if ( e.keyCode==13 || e.keyCode==32 ) {
		e.preventDefault();
		customSelect($(this));
	}
});
$(document).on('click','.se-select[data-stove="select"] select',function(e){
	e.preventDefault();
	customSelect($(this));
});