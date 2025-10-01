// 시작: 공통 변수
const pubHtmlEl = document.querySelector('html');
const pubBodyEl = document.querySelector('body');
// 종료: 공통 변수

// 시작: 상단 띠배너 숨기기
const initTopBanner = () => {
  const topBannerEl = document.querySelector('el-top-banner');
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
initTopBanner();
// 종료: 상단 띠배너 숨기기

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

// 시작: el-dropdown-menu 외부 클릭 시 닫기
const initDropdownMenu = () => {
  const dropdownEls = document.querySelectorAll('el-dropdown-menu');

  if (dropdownEls.length) {
    document.addEventListener('click', (e) => {
      const detailsEl = e.target.closest('details');
      const summaryEl = e.target.closest('summary');

      [...dropdownEls].map((el) => {
        const targetDetailsEl = el.querySelector('details');

        if (!summaryEl || targetDetailsEl !== detailsEl) {
          targetDetailsEl.removeAttribute('open');
        }
        return () => {};
      });
    });
  } else {
    console.error('el-dropdown-menu 요소를 찾을 수 없습니다.');
  }
};
initDropdownMenu();
// 종료: el-dropdown-menu  외부 클릭 시 닫기
