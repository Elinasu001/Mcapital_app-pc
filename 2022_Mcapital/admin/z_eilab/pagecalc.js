/* EiLAB Publishing Guide | version 5.5.3 | date 2021-06-08 since 2016.12.23 */

/********************************************************************************************************
   페이지옵션
*********************************************************************************************************/
function mobile(){
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


$(document).ready(function(){
	if ( mobile() ) $('html').addClass('ismobile')
	$('.ia').pageMaker({
		manageMode:{ recentDate : '2022-04-29' }, //모든페이지완료시 recentDate : 'finishAll'
		version: '0.2',
		pageDefault: { pageCallNumber: false }, //화면콜넘버
		pageCalc:{
			addGuideNum : false, // 가이드페이지 진척률에 포함
			percentGage: true // 진척률 퍼센테이지모드
		},
		addTbd : false,
		depthNavi : true, //뎁스네비게이션
		today: '2022-04-29', // 금일 작업 페이지 표시
		realDateRemove: true, // 금일 작업 페이지 제거/배포시 true 설정
	});
	
	/* 화면목록 부가옵션 */
	$('.btn.navi_ctrl').trigger('click') //화면목록 스크롤네비 열어두기
	$('.new_window').remove();// 화면 새창으로 열기 버튼
	// $('.page .row:first-child .btn_txt_copy').remove(); //화면명 복사 버튼
});

// remix added
$(window).on('load', function(){
	lastEdit(); //  remix added
	selectDate();
})