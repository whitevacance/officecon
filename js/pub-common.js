// 시작: 공통 변수
const pubHtmlEl = document.querySelector('html');
const pubBodyEl = document.querySelector('body');
// 종료: 공통 변수

// 시작: 상단 띠배너
const initTopBanner = () => {
  const topBannerEl = document.querySelector('el-top-banner');
  if (topBannerEl) {
    topBannerEl.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        // 상단 띠배너 숨기기
        topBannerEl.classList.add('hide');
      }
    });
  } else {
    console.error('el-top-banner 요소를 찾을 수 없습니다.');
  }
};
initTopBanner();
// 종료: 상단 띠배너

// 시작: header sticky 시 box-shadow 처리
const initHeaderSticky = () => {
  const headerStickyEl = document.querySelector('el-header-sticky');
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
initHeaderSticky();
// 종료: header sticky 시 box-shadow 처리
