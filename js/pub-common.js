// 시작: 공통 변수
const pubHtmlEl = document.querySelector('html');
const pubBodyEl = document.querySelector('body');
// 종료: 공통 변수

// 시작: 상단 띠배너 숨기기
const initTopBanner = (context = null) => {
  const queryContext = context || document;
  const topBannerEl = queryContext.querySelector('el-top-banner');
  if (topBannerEl) {
    topBannerEl.addEventListener('click', (e) => {
      // 닫기 버튼이나 그 자식 요소가 클릭된 경우 처리
      const buttonEl = e.target.closest('button');
      if (buttonEl) {
        e.preventDefault();
        e.stopPropagation();

        topBannerEl.classList.add('hide');
      }
    });
  } else {
    // console.error('el-top-banner 요소를 찾을 수 없습니다.');
  }
};

// 전역 함수로 등록 (웹컴포넌트에서 호출 가능)
window.initTopBanner = initTopBanner;

// 실행 (일반 DOM에서만)
if (typeof window !== 'undefined' && !window.isShadowDOM) {
  initTopBanner();
}
// 종료: 상단 띠배너 숨기기

// 시작: header sticky 시 box-shadow 처리
const initHeaderSticky = (context = null) => {
  const queryContext = context || document;
  const headerStickyEl = queryContext.querySelector('el-header-sticky');
  if (headerStickyEl) {
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('is-stuck', e.intersectionRatio < 1),
      { threshold: [1] }
    );
    observer.observe(headerStickyEl);
  } else {
    console.error('el-header-sticky 요소를 찾을 수 없습니다.');
  }
};

// 전역 함수로 등록 (웹컴포넌트에서 호출 가능)
window.initHeaderSticky = initHeaderSticky;

// 실행 (일반 DOM에서만)
if (typeof window !== 'undefined' && !window.isShadowDOM) {
  initHeaderSticky();
}
// 종료: header sticky 시 box-shadow 처리
