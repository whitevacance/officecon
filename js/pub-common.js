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

initTopBanner();
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
    // console.error('el-header-sticky 요소를 찾을 수 없습니다.');
  }
};

// 전역 함수로 등록 (웹컴포넌트에서 호출 가능)
window.initHeaderSticky = initHeaderSticky;

initHeaderSticky();
// 종료: header sticky 시 box-shadow 처리

// 시작: el-search-layer 토글
let bsSearchLayerToggleButton = null;
const initSearchLayer = (context = null) => {
  const queryContext = context || document;
  const searchLayer = queryContext.querySelector('el-search-layer');
  const searchLayerToggleButton = queryContext.querySelector(
    '#searchLayerToggleButton'
  );
  const searchLayerInput = queryContext.querySelector(
    'el-search-layer el-search input'
  );

  // 부트스트랩 dropdown 인스턴스 생성
  if (searchLayerToggleButton) {
    bsSearchLayerToggleButton = new bootstrap.Dropdown(searchLayerToggleButton);
  } else {
    // console.error('searchLayerEl 요소를 찾을 수 없습니다.');
  }

  // searchLayerInput에 focus 시 레이어 show
  if (searchLayerInput && bsSearchLayerToggleButton) {
    searchLayerInput.addEventListener('focus', () => {
      bsSearchLayerToggleButton.show();
      searchLayerInput.focus(); // 레이어 show 시 포커스 유지되도록
    });
  }

  // 닫기 버튼 클릭
  if (searchLayer && bsSearchLayerToggleButton) {
    searchLayer.addEventListener('click', (e) => {
      const buttonEl = e.target.closest('el-addon-close button');
      if (buttonEl) {
        e.preventDefault();
        e.stopPropagation();
        bsSearchLayerToggleButton.hide();
      }
    });
  }
};

// 전역 함수로 등록 (웹컴포넌트에서 호출 가능)
window.initSearchLayer = initSearchLayer;

initSearchLayer();
// 종료: el-search-layer 토글
