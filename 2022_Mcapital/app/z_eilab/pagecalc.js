/* EiLAB Publishing Guide | version 5.5.3 | date 2021-06-08 since 2016.12.23 */

/********************************************************************************************************
   페이지옵션
*********************************************************************************************************/
function mobile(){
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

var setting = {
	today: '2022-07-28',
	version: '4.1',
}

$(document).ready(function(){
	if ( mobile() ) $('html').addClass('ismobile')	
	/* 화면목록 부가옵션 */
	$('.btn.navi_ctrl').trigger('click') //화면목록 스크롤네비 열어두기
	$('.new_window').remove();// 화면 새창으로 열기 버튼
	// $('.page .row:first-child .btn_txt_copy').remove(); //화면명 복사 버튼
});