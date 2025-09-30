// 시작: 공통 변수
const pubHtmlEl = document.querySelector('html');
const pubBodyEl = document.querySelector('body');
// 종료: 공통 변수

// 시작: 상단 띠배너
const initTopBanner = () => {
  const topBannerEl = document.querySelector('el-top-banner');
  if (topBannerEl) {
    topBannerEl.addEventListener('click', (e) => {
      // 닫기 버튼이나 그 자식 요소가 클릭된 경우 처리
      const buttonEl = e.target.closest('button');
      if (buttonEl) {
        e.preventDefault();
        e.stopPropagation();

        topBannerEl.classList.add('hide'); // 상단 띠배너 숨기기
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
