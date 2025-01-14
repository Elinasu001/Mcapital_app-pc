/* EiLAB Publishg Guide | version 5.3 | date 2020-01-06 since 2016.12.23 */

/********************************************************************************************************
   초기실행
*********************************************************************************************************/
/* document ready */
$(document).ready(function() {
	preLoadFunction(); // 사전로드 스크립트
	// 화면목록옵션지정 :  z_eilab/pagecalc.js 로이동
	iaLayout(); // ia메뉴 레이아웃

	$('.ia').pageMaker({
		manageMode:{ recentDate : ''+setting.today+'' }, //모든페이지완료시 recentDate : 'finishAll'
		version: ''+setting.version+'',
		pageDefault: { pageCallNumber: false }, //화면콜넘버
		pageCalc:{
			addGuideNum : false, // 가이드페이지 진척률에 포함
			percentGage: true // 진척률 퍼센테이지모드
		},
		addTbd : false,
		depthNavi : true, //뎁스네비게이션
		today: ''+setting.today+'', // 금일 작업 페이지 표시
		realDateRemove: true, // 금일 작업 페이지 제거/배포시 true 설정
	});
});

/* window resize */
$(window).resize(function(){
	iaLayout();
})

$(window).load(function(){
	$(window).trigger('resize');
});

// remix added
$(window).on('load', function(){
	lastEdit();
	selectDate();
	totalAmount();
})

/********************************************************************************************************
   사전로드 스크립트
*********************************************************************************************************/
 /* 사전로드모음 */
var preLoadFunction = function(){
	iaMenuCtrl(); // ia메뉴 아코디언
	remoteControll(); // 상단고정리모콘 - (ia목록 새로고침, ia메뉴 전체열고닫기)
};

/* 상단고정리모콘 */
var remoteControll = function(){
	listRefresh(); // ia목록 새로고침
	// iaMenuAll(); // ia메뉴 전체열고닫기
};


/****************************************************************************
  퍼블리싱가이드
****************************************************************************/
/* ia메뉴 레이아웃 */
var iaLayout = function(){
	var layout = $('.layout'),
		header = $('.header'),
		container = $('.container'),
		ia =  $('.ia');

	var windowHeight = $(window).outerHeight(true),
		headerHeight = header.outerHeight(true);

	layout.css({ 'height': windowHeight })
	container.css({ 'height': windowHeight - headerHeight });
	// ia.css({ 'padding-bottom' : windowHeight*.5 })
};

var $lastDateCheck; // remix added

/* pageMaker */
$.fn.pageMaker = function(options){
	var defaults = {
		pageDefault: {
			pageType: null,
			pageCallNumber: false
		},
		pageCalc:{
			addGuideNum : true,
			percentGage : false
		},
		manageMode:{
			recentDate: null
		},
		depthNavi: false,
		version: null,
		today: null,
		realDateRemove: null,
		addTbd: false,
	};
	var o = $.extend(defaults,options);

	var _this = $(this);

	var ia = $('.ia'),
		folder = ia.find('.dir').html(),
		depth = ia.find('.depth'),
		depthTitle = ia.find('.depth').children('.title'),
		page = ia.find('.page'),
		pageTitle = ia.find('a.info.title'),
		pageDate = ia.find('.info.date'),
		totalPageNum = '[data-pageNum="totalPage"]';
		depthCategory = $('.depth.category');
		fileTitle = ia.find('.info.file'); // 2022009 remix added

	depthTop= [];

	// 기본사항
	if( o.pageDefault ){
		var btnNew = '<span class="btn btn_func new_window" title="새창으로 열기"></span>',
			btnMoreInfo = '<span class="btn btn_func more_info" title="화면추가정보"></span>';

		depthTitle.each(function(){
			// 폴더경로있는뎁스 root지정
			var _this = $(this);
			if( _this.find('.dir').length > 0 ){
				_this.parent().attr('data-dir','dirDepth');
			};
		});

		// 20220209 remix added
		fileTitle.each(function(){
			var _this = $(this);
			_this.attr('data-pageid', _this.html() )
		})
		
		page.each(function(){
			var _this = $(this);
			var modifyLeng = _this.find('.row_modify > li').length
			var modifyHtml = '<div class="modify_wrap">'
			 	modifyHtml += '<div class="modify" title="수정 '+ modifyLeng +' 건">'+ modifyLeng +'</div>'
				modifyHtml += '<div class="modify_recent"></div>'
				modifyHtml += '</div>'
			if( modifyLeng > 0 ){
				_this.children('.row_path').find('.info.extention').after(modifyHtml);
				_this.addClass('edited');
			}

			if ( _this.attr('data-date') ){
				_this.find('.info.title').before('<div class="date-box">'+_this.attr('data-date')+'</div>');
				if ( _this.attr('data-date') != o.today ){
					_this.find('.date-box').addClass('dif')
				}
			}
		});
		
		// 뎁스지정
		depthCategory.each(function(){
			var _this = $(this)
			var contsLength = _this.find('.conts').length
			var depth01 = _this,
				depth02 = depth01.children('.conts').children('.depth'),
				depth03 = depth02.children('.conts').children('.depth'),
				depth04 = depth03.children('.conts').children('.depth');
				depth05 = depth04.children('.conts').children('.depth');
				depth06 = depth05.children('.conts').children('.depth');

			depth01.addClass('depth01');
			depth02.addClass('depth02');
			depth03.addClass('depth03');
			depth04.addClass('depth04');
			depth05.addClass('depth05');
			depth06.addClass('depth06');
			depthTop.push(_this.position().top)
		});

		depth.each(function(){
			var _this = $(this);

			if( _this.find('.depth').length == 0 ){
				// _this.addClass('last_depth')
			}
			if ( _this.hasClass('split') && _this.find('> .title > .dir').length != 0 ){

				_this.find('> .conts').prepend('<div class="row row_title">'+_this.find('> .title > .dir').html()+'</div>')
				_this.find('> .title > .dir').hide();
			}
		})
		


		// 화면경로설정
		pageTitle.each(function(){
			var _this = $(this),
				_thisP = _this.parent(),
				page = _this.closest('.page'),
				folder = _this.closest('.depth[data-dir="dirDepth"]').find('> .title > .dir').text(), // remix 20220203 edited
				// folder = _this.closest('.depth[data-dir="dirDepth"]').find('.dir').text(), // 원본
				rootIdxOf = folder.indexOf('/');
				root = folder.substring(0,rootIdxOf),
				file = page.find('.info.file'),
				extention = page.find('.extention');
				fileName = file.text();
				extentionName = extention.text();

			_this.attr('title','더블클릭 시 새탭열기')
			// 폴더경로 다른 파일 불러올 경우 
			var crossdir = page.find('.info.file').attr('data-crossdir');
			

			if( _this.attr('href') == undefined ){
				if( crossdir == 'true' ){
					_this.attr('href', fileName);
				}else{
					// _this.attr('href', folder + '/' + fileName); // 원본

					// 20220208 remix added
					if ( _this.closest('.page').find('.path').text() == '' ){
						_this.closest('.page').find('.path').text(folder);
					} else {
						_this.closest('.page').addClass('pathfalse')
					}
					var _path =  _this.closest('.page').find('.path').text();
					_this.attr('href', _path + fileName + extentionName );
				};
	
				if( _this.attr('target') == undefined ){
					_this.attr('target','frameView');
				};
			};

			// 파일명복사
			// var btnTitleCopyHtml = '<span class="btn btn_txt_copy" title="화면명 복사">copy</span>';

			// _thisP.prepend(btnTitleCopyHtml)
			// file.before(btnTitleCopyHtml)
			// file.before(btnNew); // 새창열기버튼

		});

		// 20220209 remix added
		page.each(function(){
			var _this = $(this);

			if ( _this.attr('data-tag') ){
				var _tag =  _this.attr('data-tag');

				_this.find('.info.title').prepend('<span class="tag">'+_tag+'</span>');
			}

			if ( _this.attr('data-about') ){
				var _id =  _this.attr('data-about');
				var _idTarget = $('.info.file[data-pageid="'+_id+'"]');
				var _idTargetName = _idTarget.html();
				var _idPath = _idTarget.closest('.row').find('.path').html();
				var _idExtention = _idTarget.closest('.row').find('.extention').html();

				_this.find('.row_filename .right').prepend('<span class="about"><a href="'+ _idPath + _idTargetName + _idExtention +'" target="frameView">'+_id+'</a></span>');
			}

		})



		// 화면유형
		if( o.pageDefault.pageType == null ){

			var pageType = function( _this, typeClass, typeName,  ){
				var pageTitle = _this.find('.info.title');
				var typeHtml = '<span class="'+ typeClass +'">'+ typeName +'</span> ';
				pageTitle.prepend(typeHtml);
			};

			page.each(function(){
				var _this = $(this);
				var pageDate = _this.find('.info.date'),
					pageFile = _this.find('.info.file');

				if ( _this.attr('data-tbd') != null ){
					_this.addClass('tbd');
					_this.find('.row_filename a.info.title').append('<span class="doc_tbd">('+_this.attr('data-tbd')+')</span>');
				}

				// 스텝
				if( _this.attr('class').indexOf('step') > -1 ){
					var srch = _this.attr('class').indexOf('step'),
						stepClass = _this.attr('class').substring(srch);
					var typeInfo = { classname: 'page_type page_step', name: '' + stepClass + '' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};

				// [탭]
				if( _this.hasClass('tab') == true ){
					var typeInfo = { classname: 'page_type tab', name: 'tab' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};


				// [레이어]
				if( _this.hasClass('layer') == true ){
					var typeInfo = { classname: 'page_type layer', name: 'L' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				};

				// [풀팝업]
				if( _this.hasClass('full') == true ){
					var typeInfo = { classname: 'page_type full', name: 'FP' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				}

				// [팝업]
				if( _this.hasClass('pop') == true ){
					var typeInfo = { classname: 'page_type pop', name: 'POP' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				}

				// [팝업]
				if( _this.hasClass('slide') == true ){
					var typeInfo = { classname: 'page_type slide', name: 'SP' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				}

				// [얼럿]
				if( _this.hasClass('alert') == true ){
					var typeInfo = { classname: 'page_type alert', name: '얼럿' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				}

				// [유형]
				if( _this.hasClass('case') == true ){
					var typeInfo = { classname: 'page_type case', name: '참고' };
					pageType(_this, typeInfo.classname, typeInfo.name );
				}

				// [반응형]
				if( _this.hasClass('cross') == true ){
					var typeInfo = { classname: 'page_type cross', name: 'cross' };
					pageType(_this, typeInfo.classname, typeInfo.name );

					pageDate.text('연결화면');
					pageDate.addClass('no_calc')
				}

				if( Boolean(pageFile.attr('data-crossdir')) == true ){
					pageDate.text('연결화면');
					pageDate.addClass('no_calc')
				};

			});
		};

		// 화면콜넘버
		if( o.pageDefault.pageCallNumber == true ){
			
			depth.each(function(){ // 뎁스
				var _this  = $(this),
					_thisIdx = _this.index() + 1;
				// if( _thisIdx < 10 ) var _thisIdx = '0' + _thisIdx;

				var callNumberHtml = '<span class="call_number" title="Page Call Number"></span>';

				_this.children('.title').prepend(callNumberHtml);

				if( _this.parent('.conts').parent('.depth').hasClass('depth') == true ){
					var _thisIdx =  _this.parent('.conts').prev('.title').find('.call_number').text() + _thisIdx;
				};

				_this.find('.title > .call_number').text(_thisIdx);
			});

			page.each(function(){ // 페이지
				var _this  = $(this),
					_thisIdx = _this.index() + 1;
				if( _thisIdx < 10 ) var _thisIdx = '0' + _thisIdx;
				
				var callNumberHtml = '<span class="call_number" title="Page Call Number"></span>';
				
				_this.find('.title').before(callNumberHtml);

				if( _this.parent('.conts').parent('.depth').hasClass('depth') == true ){
					var _thisIdx =  _this.parent('.conts').prev('.title').find('.call_number').text() + '_' + _thisIdx;
				};

				_this.find('.call_number').text(_thisIdx);
			});

		};

	};

	if ( o.realDateRemove ){
		$(document).find('.date-box').remove();
		$(document).find('.select_date.realdate').remove();
	}


	// 일정관리
	if( o.manageMode ){
		var recentDate = o.manageMode.recentDate.replace(/-/g,'');
		var recentDateTxt = o.manageMode.recentDate;
		var version = o.version;

		$('.pub-summary .ver').text(version);
		$('.pub-summary .date').text(recentDateTxt);
		$('.pub-notice h1 .date').text(recentDateTxt);

		pageDate.each(function(){
			var _this = $(this),
				releaseDate = _this.text().replace(/-/g,'');

			// remix added
			if ( releaseDate == '화면삭제' || releaseDate == '퍼블리싱X' || releaseDate == '중복화면사용' || releaseDate == '셀렉트팝업' ||  releaseDate == '카메라' || releaseDate == '얼럿' ) {
				_this.addClass('no_calc')
				_this.closest('.page').addClass('dim')
			}

			if ( releaseDate == 'TBD' || releaseDate == '일부TBD' || releaseDate == '스토리보드X' ) {
				if ( o.addTbd ){
					_this.addClass('finish');
				}
			}
			// //remix added

			// 가이드페이지 진척률에 포함 여부
			if( o.pageCalc.addGuideNum == true || o.pageCalc.addGuideNum == undefined ){ // 포함
				if( releaseDate == 'default' ) _this.addClass('default finish');
			}else{ // 미포함
				if( releaseDate == 'default' ) _this.addClass('no_calc');
			};

			// 페이지완료 정의 
			if( recentDate == 'finishAll' ){ // 모두완료
				if( _this.hasClass('no_calc') == false ) _this.addClass('finish');
			}else{ // 최근완료
				
				if( recentDate == releaseDate ){ 
					_this.addClass('recent');
				}else if( recentDate > releaseDate ){
					_this.addClass('finish'); // 이전완료
				}
			}; 

		});
	};
		

	// 진척률산정
	if( o.pageCalc ){
		var pageCalc = function(eClass){
			$(eClass).each(function(){
				var _this = $(this),
					_thisP = _this.parent();

				// 뎁스기준
				var totalLength = _thisP.find('.info.title').length,
					finishLength = _thisP.find('.info.finish').length,
					recentLength = _thisP.find('.info.recent').length,
					nocalcLength = _thisP.find('.no_calc').length;
				var guidePageNum = $('.depth.guide').find('.page').length;


				// 전체기준
				if( _this.attr('data-pageNum') == 'totalPage' ){
					var nocalcLength = ia.find('.no_calc').length;
					var totalLength = ia.find('.info.title').length,
						finishLength = ia.find('.info.finish').length,
						recentLength = ia.find('.info.recent').length;
				};

				// 퍼센테이지모드
				if( o.pageCalc.percentGage == true || o.pageCalc.percentGage == undefined){
					ia.addClass('mode_gage');

					var pagePercent = Math.floor( ((finishLength + recentLength) / (totalLength - nocalcLength)) * 100 );

					_this.append('<div class="gauge_wrap"><div class="gaugebar"></div></div>');

					var gaugeBar = _this.find('.gaugebar');
					gaugeBar.css({ 'width': pagePercent + '%' });
				};

				var pagenumHtml =  '<div class="page_num_wrap">'
					pagenumHtml +=		'<span class="page_num">'
					pagenumHtml += 			'(<span class="finish_num">'+ (finishLength + recentLength) +'</span>'
					pagenumHtml += 			'/'
					pagenumHtml += 			'<span class="total_num">'+ (totalLength - nocalcLength) +'</span>)</span>'
				if ( o.pageCalc.percentGage == true ) pagenumHtml += '<span class="percent">'+ pagePercent + '%</span>'
					pagenumHtml += '</div>';

				if ( _this.attr('data-sb') ) {
					_this.append('<div class="sb">('+_this.attr('data-sb')+')</div>')
				}
				
				// if ( o.pageCalc.percentGage == true ){
				// 	_thisP.children('.title').prepend('<span class="percent">'+ pagePercent + '%</span>')
				// }


				// 가이드페이지 진척률에 추가
				if( o.pageCalc.addGuideNum == false ){
					if( _this.parents('.depth').hasClass('guide') == false ){
						_this.append(pagenumHtml);
					}
				}else{
					_this.append(pagenumHtml);	
				};

				if ( _this.find('.page_num_wrap .percent').text() == 'NaN%'){
					_this.find('.page_num_wrap').hide();
				}
				// console.log(
					// _this.find('.page_num_wrap .percent').text()
				// )

			});
		};

		pageCalc(totalPageNum);
		pageCalc('.depth > .title');
	};


	// 뎁스네비게이션
	if( o.depthNavi == true ){
		if( $('body').find('.navi_wrap').length > 0 ){
			var categoryList =  [];
			var categoryListBgClass =  [];
			depthCategory.each(function(){
				var _this = $(this),
					categoryTitleText = _this.children('.title').html(),
					categoryTitleClass = _this.children('.title').attr('class');

				var categoryTitleBgClassIndexOf = categoryTitleClass.indexOf(''),
					categoryTitleBgClassLastIndexOf = categoryTitleClass.lastIndexOf(''),
					categoryTitleBgClass = categoryTitleClass.substr(categoryTitleBgClassIndexOf,categoryTitleBgClassLastIndexOf);

				categoryListBgClass.push(categoryTitleBgClass);
				categoryList.push(categoryTitleText);
			});


			var containerScr = function(){
				
				var scrTop = $('.container').scrollTop() + 3
				var activeNavBtn = $('.navi_wrap .category_list.active')
				if( $('.navi_wrap .category_list').last().hasClass('active') == false ){
					if( scrTop >= $('.depth.category > .title').eq(activeNavBtn.index() + 1).position().top ){
						activeNavBtn.next().addClass('active').siblings().removeClass('active')
					}
				};
				if( scrTop <= $('.depth.category > .title').eq(activeNavBtn.index()).position().top ){
					activeNavBtn.prev().addClass('active').siblings().removeClass('active')
				};
			}

			$('.navi_wrap').append('<div class="navi_list"></div>')
			
			for ( var i = 0; i < $('.depth.category').length; i++ ){
				var naviListHtml = '<button type="button" class="btn category_list '+ categoryListBgClass[i]+'">' + categoryList[i] + '</button>';
				
				$('.navi_wrap .navi_list').append(naviListHtml);
				$('.navi_wrap').find('.dir').remove()
				$('.navi_wrap').find('.category_list').first().addClass('active')
			};


			// $('.category_list').find('.gauge_wrap').remove();
			$(document).on('click', '.category_list', function(){
				$('.container').off('scroll',containerScr)

				var _this = $(this),
					_thisIdx = _this.index();
				var scrT = $('.depth.category > .title').eq(_thisIdx).position().top - 3;
				$('.container').scrollTop(scrT)
				setTimeout(function(){
					_this.addClass('active').siblings().removeClass('active')
					$('.container').on('scroll',containerScr);
				})
			});

			$('.container').on('scroll',containerScr);

			if ( $('.navi_wrap').find('.sb') ){
				$('.navi_wrap').find('.sb').remove();
			}

		};
		
	}else if( o.depthNavi == false ){
		$('.navi_wrap').hide();
	};

	$lastDateCheck = o.manageMode.recentDate;

};

/* 새탭열기 이벤트 */
$(document).on('click', '.new_window', function(){
	var new_href = $(this).closest('.page').find('a.info.title').attr('href')
	
	window.open(new_href, '', '_blank');// 새창
	
});

// 새창열기
$(document).on('dblclick', '.info.title', function(){
	window.open($(this).attr('href'),'_blank');// 새창
})

// 20220209 remix added
$(document).on('dblclick', '.about a', function(){
	window.open($(this).attr('href'),'_blank');// 새창
})

// 20220209 remix added
$(document).on('click', '.about a', function(){
	var _this = $(this);
	var _thisP = _this.closest('.page');
	var _thisPP = _this.closest('.depth');
	var _thisID = _this.html();
	var _realTarget = _thisPP.find('.info.file[data-pageid="'+_thisID+'"]');

	$(document).find('.page').removeClass('active');
	$(document).find('.info.file[data-pageid="'+_thisID+'"]').closest('.page').addClass('active');
})
$(window).on('load', function(){
	$(document).on('click', '.about a', function(){
		var _this = $(this);
		var _thisID = _this.html();

		$('.container').scrollTop(0);
		$('.container').scrollTop( $('.info.file[data-pageid="'+_thisID+'"]').closest('.page').offset().top - $('.header').outerHeight() - ($('.container').outerHeight() / 2)   )
	})
})


/* ia메뉴 아코디언 */
var iaMenuCtrl = function(){
	var depthTitle = $('.depth').children('.title'),
		pageTitle = $('.info.title');

	

	depthTitle.each(function(){
		if( $(this).next().css('display') != 'none' ){
			$(this).next().addClass('open');
		}
	})

	
	// 복사 - 20220203 remix added
	var	cloneArea = $('.clone-area');

	// 복사 - 20220203 remix added
	cloneArea.each(function(){
		var _this = $(this);
		var _cloneTargetName = $(this).attr('data-clonename');

		var _cloneTarget = $('.clone-target[data-clonename="'+_cloneTargetName+'"]')
		var _doClone = _cloneTarget.clone();

		_this.append(_doClone);
	})

	// ia메뉴 열고닫기
	var menuCtrl = function(){
		var _this = $(this),
			conts = $(this).next();
		var thisHasOn = conts.hasClass('open');
		var speed = 200;

		if( thisHasOn == true ){ //열기
			// conts.removeClass('open').hide();
			if ( !_this.parents('.depth').hasClass('for_bootstrap') ){
				conts.removeClass('open').css({'display':'none'});
			}
			
			// if( conts.closest('.depth').hasClass('last') == true ){
			// 	conts.prev().css({ 'width' : '100%' });
			// 	conts.prev().find('.gauge_wrap').css({ 'width' : '100%' });
			// };
		}else{ //닫기
			if ( !_this.parents('.depth').hasClass('for_bootstrap') ){
				conts.addClass('open').show();
			}
			

			// if( conts.closest('.depth').hasClass('last') == true ){
			// 	conts.prev().css({ 'width' : '30%' });
			// 	conts.prev().find('.gauge_wrap').css({ 'width' : '30%' });
			// }else{
			// }
		};
	};

	// 클릭한 페이지 표시
	var nowPage = function(){
		var wrap = $('.ia')
		wrap.find('.page').removeClass('active');
		$(this).closest('.page').addClass('active');
	};

	$('.depth').children('.title').unbind('click',menuCtrl).bind('click',menuCtrl); // 메뉴열고닫기- 뎁스
	$('.info.title').unbind('click',nowPage).bind('click',nowPage); // 클릭한 페이지 표시
};



/* 상단고정리모콘 - ia메뉴 전체열고닫기 */
// var iaMenuAll = function(){
// 	var btn = $('.btn_ia_ctrl');
// 	btn.parent('.btn_wrap_iactrl').addClass('all_open');

// 	btn.click(function(){
// 		var _this = $(this),
// 			btnWrap = _this.parent('.btn_wrap_iactrl'),
// 			// lastDep = $('.depth').find('.split');
// 			lastDep = $('.depth').find('.last_depth');


// 		if( btnWrap.hasClass('all_open') == true ){
			
// 			if( _this.hasClass('ia_close') == true ){
// 				btnWrap.removeClass('all_open');

// 				btnWrap.addClass('last_hide');
// 				lastDep.find('.conts').removeClass('open').hide();
// 			}

// 		}else if( btnWrap.hasClass('last_hide') == true ){
			
// 			if( _this.hasClass('ia_close') == true ){
// 				btnWrap.removeClass('last_hide');

// 				btnWrap.addClass('last_p_hide');
// 				lastDep.parent().parent('.depth').find('.conts').removeClass('open').hide()

// 			}else if( _this.hasClass('ia_open') == true ){
// 				btnWrap.removeClass('last_hide');
				
// 				btnWrap.addClass('all_open');
// 				$('.ia').find('.conts').addClass('open').show();
// 			}

// 		}else if( btnWrap.hasClass('last_p_hide') == true ){
			
// 			if( _this.hasClass('ia_close') == true ){
// 				btnWrap.removeClass('last_p_hide');

// 				btnWrap.addClass('last_p_p_hide');
// 				lastDep.parent().parent('.depth').parent().parent('.depth').find('.conts').removeClass('open').hide()

// 			}else if( _this.hasClass('ia_open') == true ){
// 				btnWrap.removeClass('last_p_hide');
				
// 				btnWrap.addClass('last_hide');
// 				lastDep.parent().parent('.depth').children('.conts').addClass('open').show()
// 			}

// 		}else if( btnWrap.hasClass('last_p_p_hide') == true ){


// 			if( _this.hasClass('ia_close') == true ){
// 				btnWrap.removeClass('last_p_p_hide');

// 				btnWrap.addClass('last_p_p_p_hide');
// 				lastDep.parent().parent('.depth').parent().parent('.depth').parent().parent('.depth').find('.conts').removeClass('open').hide()

// 			}else if( _this.hasClass('ia_open') == true ){
// 				btnWrap.removeClass('last_p_p_hide');
				
// 				btnWrap.addClass('last_p_hide');
// 				lastDep.parent().parent('.depth').parent().parent('.depth').children('.conts').addClass('open').show()
// 			}
			
			

// 		}else if( btnWrap.hasClass('last_p_p_p_hide') == true ){

// 			if( _this.hasClass('ia_open') == true ){
// 				btnWrap.removeClass('last_p_p_p_hide');
				
// 				btnWrap.addClass('last_p_p_hide');
// 				lastDep.parent().parent('.depth').parent().parent('.depth').parent().parent('.depth').children('.conts').addClass('open').show()
// 			}
// 		}

// 		$(window).trigger('resize')
// 	});
// };

/* 상단고정리모콘 - ia목록 새로고침 */
var listRefresh = function(){
	var btnRefresh = $('.btn.refresh');

	// # ia목록 reload
	var reload = function(){
		window.location.reload();
		$(window).scrollTop(0);
	};

	btnRefresh.unbind('click',reload).bind('click',reload); // ia목록 새로고침
};


/* 상단고정리모콘 - 페이지 부가정보 더 보기 */
// $(document).on('click', '.more_info', function(){
// 	var _this = $(this),
// 		ia = $('.ia');

// 	if( _this.hasClass('active') == true ){
// 		_this.removeClass('active');
// 		ia.find('.row:first-child').show().siblings().hide();

// 	}else{
// 		_this.addClass('active')
// 		ia.find('.row').show();
// 	};

// 	if( ia.find('.page.active').length > 0 ){
// 		setTimeout(function(){
// 			var activePagePos = $('.page.active').position().top;
// 		},50);
// 	};
	
// });


$(document).on('click','.check_modify, .modify_wrap', function(){
	var _this = $(this),
		page = _this.closest('.page');

	var allModifyRow = $('.ia').find('.row_modify'),
		allModifyWrap = $('.ia').find('.modify_wrap');

	if( _this.parents('.page').length > 0  ){
		if( _this.hasClass('active') == true ){
			_this.removeClass('active');
			page.find('.row_modify').hide();
		}else{
			_this.addClass('active')
			page.find('.row_modify').show();
		};
	}else if( _this.parents('.remote_wrap').length > 0 ){
		if( _this.hasClass('active') == true ){
			_this.removeClass('active');
			allModifyWrap.removeClass('active');
			allModifyRow.hide();
		}else{
			_this.addClass('active');
			allModifyWrap.addClass('active');
			allModifyRow.show();
		};
	};
});


$(document).on('click', '.header_ctrl', function(){
	$(this).toggleClass('active')
	$('.info_area').toggleClass('compress');
	$('.container').css({ 'height' : $(window).outerHeight(true) - $('.header').outerHeight(true) });
});

$(document).on('click', '.navi_ctrl', function(){
	$(this).toggleClass('active')
	$('.navi_area').toggleClass('fold');
	$('.container').css({ 'height' : $(window).outerHeight(true) - $('.header').outerHeight(true) });
});

$(document).on('mouseenter','.navi_area',function(){
	$('.navi_area').addClass('view');
	$('.container').css({ 'height' : $(window).outerHeight(true) - $('.header').outerHeight(true) });
})
$(document).on('mouseleave','.navi_area',function(){
	$('.navi_area').removeClass('view');
	$('.container').css({ 'height' : $(window).outerHeight(true) - $('.header').outerHeight(true) });
})


	
/********************************************************************************************************
   20191002 클립보드 저장 - 윤종규 temp
*********************************************************************************************************/
/*----------------------------------------
 # 저장 프로세스
-----------------------------------------*/
$(document).on('click', '.btn_txt_copy, .info.file', function(e){
	var _this = $(this);

	if( _this.parent().find('.info.file').length > 0 ){
		// 텍스트 & 페이크 인풋
		var	_thisText = _this.parent().find('.info.file').text(),
			_fakeInput = "<input class='fake_input' type='text' value=''>";
			// console.log(_thisText)
			
		$('body').prepend(_fakeInput);

		$('.fake_input').css({'position': 'fixed', 'top' : -100, 'left': 0}).val(_thisText);
		$('.fake_input').select();	

		document.execCommand("copy");

		$('.fake_input').remove();

		//안내문
		var infoText = "<div class='info_text'>파일명 복사</div>"

		$('body').append(infoText);
		$('.info_text').css({'top': e.pageY - 5, 'left': e.pageX + 15})
		setTimeout(function(){
			$('.info_text').remove();
		},300)
	}


	if( _this.parent().find('.info.title').length > 0 ){
		// 텍스트 & 페이크 인풋
		var	_thisText = _this.parent().find('.info.title').text(),
			_fakeInput = "<input class='fake_input' type='text' value=''>";
			
		$('body').prepend(_fakeInput);

		$('.fake_input').css({'position': 'fixed', 'top' : -100, 'left': 0}).val(_thisText);
		$('.fake_input').select();	

		document.execCommand("copy");

		$('.fake_input').remove();

		//안내문
		var infoText = "<div class='info_text'>화면명 복사</div>"

		$('body').append(infoText);
		$('.info_text').css({'top': e.pageY - 5, 'left': e.pageX + 15})
		setTimeout(function(){
			$('.info_text').remove();
		},300)
	}
	_this.on('click', function(e){

	})	

})


/*----------------------------------------
	release date select // 20200916 remix
-----------------------------------------*/
function selectDate(){
	getKeyword();	
	if ( $('body').find('.row_modify').length > 0  ){
		$('.select_date.current').css('display', 'inline-block');
	}
	if ( $('body').find('.page[data-date]').length > 0 ){
		$('.select_date.realdate').css('display', 'inline-block');
	}
	selectOption();
}

// 키워드 
var getKeyword = function(){
	var array0 = [];
	var array1 = [];
	var array2 = [];
	var finalArray0 = [];
	var finalArray1 = [];
	var finalArray2 = [];
	var _date = $('.info.date');
	var _realdate = $('.page[data-date]');

	// 키워드 정리, value 밀어넣기
	_date.each(function(){
		var _this = $(this);

		if ( !_this.hasClass('current') ){
			_this.addClass('common')
			array0.push(_this.text())
			_this.data('value', _this.text());
		} else {
			array1.push(_this.text())
			_this.data('value', _this.text());
		}

	})
	$.each(array0, function(i, value){
		if ( finalArray0.indexOf(value) == -1 ) finalArray0.push(value);
	})
	finalArray0.sort();
	for ( var a = 0; a < finalArray0.length; a++ ){
		$('.select_date.release > select').append('<option value="'+finalArray0[a]+'">'+finalArray0[a]+'</option>');
	}

	$.each(array1, function(i, value){
		if ( finalArray1.indexOf(value) == -1 ) finalArray1.push(value);
	})
	finalArray1.sort();
	// function sortFuncB(a, b){
	// 	var dA = new Date(a).getTime()
	// 	var dB = new Date(b).getTime()
	// 	return dA < dB ? 1: -1
	// }
	for ( var a = 0; a < finalArray1.length; a++ ){
		$('.select_date.current > select').append('<option value="'+finalArray1[a]+'">'+finalArray1[a]+'</option>');
	}

	_realdate.each(function(){
		var _this = $(this);
		array2.push(_this.attr('data-date'));
	})
	$.each(array2, function(i, value){
		if ( finalArray2.indexOf(value) == -1 ) finalArray2.push(value);
	})
	finalArray2.sort();
	for ( var a = 0; a < finalArray2.length; a++ ){
		$('.select_date.realdate > select').append('<option value="'+finalArray2[a]+'">'+finalArray2[a]+'</option>');
	}
}

// 옵션 선택
var selectOption = function(){
	var _select = $('.select_date > select');

	_select.each(function(){

		var $this = $(this);

		$this.on('change', function(){
			var _value = this.value;
            var _pageAll = $('.page');
            var _conts = $('.page').parent();
	
			if ( _value == 'alldateview' ){
				_pageAll.addClass('show').removeClass('hide');
			}else{
				_pageAll.removeClass('show').addClass('hide');
				// 부모선택자 옵션
				if( $this.parent().hasClass('release') ){
					var _bigDate = $('.info.date.common');
					clickA();
				}else if( $this.parent().hasClass('current') ){
					var _bigDate = $('.info.date.current');
					clickA();
				} else if( $this.parent().hasClass('realdate') ){
					// var _bigDate = $('.page[data-date]');
					// clickB();
				}

				function clickA(){
					_bigDate.each(function(){
						var _this = $(this);
						var _page = _this.closest('.page');
														
						if ( _this.data('value') == _value ){                   
							_page.removeClass('show hide');
							_page.addClass('show');
						} else {
							_page.removeClass('show hide');
							_page.addClass('hide');
						}
					});
				}
				// function clickB(){
				// 	_bigDate.each(function(){
				// 		var _this = $(this);
														
				// 		if ( _this.data('date') == _value ){                   
				// 			_this.removeClass('show hide');
				// 			_this.addClass('show');
				// 		} else {
				// 			_this.removeClass('show hide');
				// 			_this.addClass('hide');
				// 		}
				// 	});
				// }
			}

			_conts.each(function(){
				var _this = $(this);
				var _page = _this.find('.page');
				var _hidePage = _this.find('.hide');
	
				if ( _page.length == _hidePage.length ){
					_this.parent().hide();
				} else {
					_this.parent().show();
				}
			})
			
		})

	})
}




/*----------------------------------------
	최근 수정일 // 20201007 remix
-----------------------------------------*/
function lastEdit(){
	findDate();
	findLastDate();
	findLastText();
}

var findDate = function(){
	var dateArea = $('.info.date');

	for ( var fd = 0; fd < dateArea.length; fd++ ){
		var _textType = /(\d{4}-\d{2}-\d{2})/g;
		var _temp;
		if ( $('.page').eq(fd).hasClass('edited') ){
			
			dateArea.eq(fd).closest('.row_filename').siblings('.row_path').find('.right').append('<span class="info date current"><span></span></span>');
			_temp = dateArea.eq(fd).closest('.row_filename').siblings('.row_modify').find('> li:last-child').text();

			if ( _temp.match(_textType) ){
				var _tempAfter = _temp.match(_textType);
				dateArea.eq(fd).closest('.row_filename').siblings('.row_path').find('.info.date.current > span').text(_tempAfter);
			} else {
				//임시소스
				dateArea.eq(fd).closest('.page').addClass('another');
				dateArea.eq(fd).closest('.row_filename').siblings('.row_path').find('.info.date.current > span').text('수정예정');
			}
		}

	}

}
// remix added - 20210608
var findLastDate = function(){
	var $page = $('.page');

	for ( var ld = 0; ld < $page.length; ld++ ){
		if ( $page.eq(ld).hasClass('edited') ){
			if ( $page.eq(ld).find('.current').text() != $lastDateCheck ){
				$page.eq(ld).addClass('old')
			} else {
				$page.eq(ld).addClass('now')
			}
		}
	}
}

// remix added - 20210811
var findLastText = function(){
	var $page = $('.page');
	var _temp;
	for ( var lt = 0; lt < $page.length; lt++ ){
		_temp = $page.eq(lt).find('.row_modify > li:last-child').text();
		if ( $page.eq(lt).hasClass('edited') ){
			$page.eq(lt).find('.modify_recent').text(_temp)
		}
	}
}

var totalAmount = function(){
	$('.pub-summary .new').text($('body').find('.info.recent').length)
	$('.pub-summary .edited').text($(document).find('.now .info.date.current').length)
}

$(document).on('click', '.check-storyboard .opener', function(){
	$('.check-storyboard .wrap').addClass('active');
})
$(document).on('click', '.check-storyboard .close', function(){
	$('.check-storyboard .wrap').removeClass('active');
})