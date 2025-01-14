/* v4.1 | 2022-07-28 */

/*---------------------------------------------
	slide my #마이슬라이드팝업
---------------------------------------------*/
/*
    function
*/
var slideMy = (function() {
    var afHideH = null;
    var bfHeaderH = null;
    
    return {
        init : function() {
            var $slideMyTg = $('.layout-slide-my');

            $slideMyTg.each(function() {
                var $thisPop = $(this),
                    $thisLayer = $thisPop.find('.popup-layer'),
                    $thisHeader = $thisPop.find('.popup-header');
                var afHideH = $thisPop.find('.after-hide').prop('offsetHeight');

                if( $thisPop.hasClass('on') ) {
                    $('body').css('overflow', 'hidden');

                    $thisLayer.css('height', $(window).height() - 55);
                    if( $thisLayer.find('.swiper').length ) { // 스와이퍼있는경우
                        myLoanSwiper.update();
                    }
                } else {
                    $thisPop.removeClass('fixed');
                    $('body').css('overflow', 'auto');
                    $thisHeader.find('.se-tabbtn').remove();

                    $thisLayer.css('height', $thisHeader.prop('offsetHeight') + afHideH);
                }
            });
        },
        open : function( _slide ) {
            var $target = _slide;
            afHideH = $target.find('.after-hide').prop('offsetHeight');

            $('body').css('overflow', 'hidden');
            
            $target.find('.popup-layer').animate({
                height: $(window).height() - 55
            }, 350);

            $target.addClass('on');
            if( $target.find('.swiper').length ) { // 스와이퍼있는경우
                myLoanSwiper.update();
            }
        },
        close : function( _slide ) {
            var $target = _slide;
            var $slidePopHead = $target.find('.popup-header');

            $('body').css('overflow', 'auto');
            $target.removeClass('on');
            $target.removeClass('fixed');

            $slidePopHead.find('.se-tabbtn').remove();
            bfHeaderH = $target.find('.popup-header').prop('offsetHeight');

            
            $target.find('.popup-layer').animate({
                height: afHideH + bfHeaderH
            }, 350);  
            
        },
        toggle : function( _target ) {
            var $target = _target,
                $targetPop = $target.closest('.layout-slide-my');
                
            if( $targetPop.hasClass('on') ) {
                this.close( $targetPop );
            } else {
                this.open( $targetPop );
            }
        },
    }
})();
        
/*
    event
*/
$(document).on('click', '.layout-slide-my .popup-toggle.log-in', function() { // 로그인후 토글기능 실행
    slideMy.toggle( $(this) );
});
    

/*---------------------------------------------
    MY페이지 탭
---------------------------------------------*/
/*
    function
*/
function myTabFix( _target ) {
    var $target = _target;
    var $slidePop = $('.layout-slide-my');
    var $slidePopHead = $slidePop.find('.popup-header');
    var $myTab = $slidePop.find('.popup-container .se-tabbtn');
    var $myTabClone = $myTab.clone();

    if( $slidePop.hasClass('on') ) {
        if( $myTab.position().top - $target.scrollTop < 20 ) {
            if( $slidePopHead.find('.se-tabbtn').length == 0 ) {
                $slidePop.addClass('fixed');
                $slidePopHead.append( $myTabClone );
            }
        } else {
            $slidePopHead.find('.se-tabbtn').remove();
            $slidePop.removeClass('fixed');
        }
    }
}
    
/*
    event
*/
$('.layout-slide-my .popup-container').on('scroll', function(e) {
    myTabFix( e.target );
});



/*---------------------------------------------
	main #메인
---------------------------------------------*/
var main = (function() {
    return {
        init : function() { // 초기화
            // swiper업데이트
            if( $(document).find('.swiper-container').length ) { 
                mainProdSwiper.update();
                mainRecomendSwiper.update();
            }
            if( $(document).find('.main-intro-ban.swiper-container').length ) { 
                mainIntroSwiper.update();
            }
        },
    }
})();

$(window).on('load', function() {
    main.init();
});
