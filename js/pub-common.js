// 시작: global 변수
let pubWrapperEl = document.querySelector('el-wrapper');
let bsAlert = null;
let bsSearchLayerToggleButton = null;
// 종료: global 변수

// 시작: el-alert
const initAlert = () => {
  const alertEl = document.querySelector('el-alert');

  // 부트스트랩 인스턴스 생성
  if (!bootstrap) {
    // console.error('bootstrap을 찾을 수 없습니다.');
    return;
  }

  if (alertEl) {
    bsAlert = new bootstrap.Modal(alertEl);
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initAlert = initAlert;
}

initAlert();
// 종료: el-alert

// 시작: 상단 띠배너 숨기기
const initTopBanner = () => {
  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      const topBannerCloseButtonEl = e.target.closest(
        'el-top-banner el-top-banner-content button'
      );

      if (topBannerCloseButtonEl) {
        e.preventDefault();
        e.stopPropagation();

        const topBannerEl = topBannerCloseButtonEl.closest('el-top-banner');
        topBannerEl.classList.add('hide');
      }
    });
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initTopBanner = initTopBanner;
}

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
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initHeaderSticky = initHeaderSticky;
}

initHeaderSticky();
// 종료: header sticky 시 box-shadow 처리

// 시작: el-search-layer
const initSearchLayer = () => {
  const searchLayer = document.querySelector('el-search-layer');
  const searchLayerToggleButton = document.querySelector(
    '#searchLayerToggleButton'
  );
  const searchLayerInput = document.querySelector(
    'el-search-layer el-search input'
  );

  // 부트스트랩 인스턴스 생성
  if (!bootstrap) {
    // console.error('bootstrap을 찾을 수 없습니다.');
    return;
  }

  if (searchLayerToggleButton) {
    bsSearchLayerToggleButton = new bootstrap.Dropdown(searchLayerToggleButton);
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

// 전역 함수로 등록
if (window !== undefined) {
  window.initSearchLayer = initSearchLayer;
}

initSearchLayer();
// 종료: el-search-layer

// 시작: el-theme-switch
const initThemeSwitch = () => {
  const themeSwitchEl = document.querySelector('el-theme-switch');
  const themeRadioButtons = document.querySelectorAll(
    'input[name="theme-switch"]'
  );
  pubWrapperEl = document.querySelector('el-wrapper');

  if (themeSwitchEl && themeRadioButtons.length > 0) {
    // 테마 클래스 적용 함수
    const applyThemeClass = (checkedRadio) => {
      const isCompanyMember = checkedRadio.id === 'theme-company-member';
      const isPersonalMember = checkedRadio.id === 'theme-personal-member';

      // 테마 변경에 따른 추가 로직 처리
      if (isCompanyMember) {
        // 기업 회원 테마 관련 로직
        pubWrapperEl.classList.remove('personal-member');
      } else if (isPersonalMember) {
        // 일반 회원 테마 관련 로직
        pubWrapperEl.classList.add('personal-member');
      }
    };

    // 페이지 로드 시 체크된 radio 버튼에 따라 초기 클래스 적용
    const checkedRadio = document.querySelector(
      'input[name="theme-switch"]:checked'
    );
    if (checkedRadio) {
      applyThemeClass(checkedRadio);
    }

    // 각 radio 버튼에 변경 이벤트 리스너 추가
    themeRadioButtons.forEach((radio) => {
      radio.addEventListener('change', (e) => {
        applyThemeClass(e.target);

        if (bsAlert) {
          bsAlert.show();
        } else {
          initAlert();
          if (initAlert) {
            bsAlert.show();
          } else {
            console.error('bsAlert 인스턴스를 찾을 수 없습니다.');
          }
        }
      });
    });
  } else {
    // console.error('el-theme-switch 또는 theme-switch radio 버튼을 찾을 수 없습니다.');
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initThemeSwitch = initThemeSwitch;
}

initThemeSwitch();
// 종료: el-theme-switch

// 시작: el-category-tabs
const initCategoryTabs = () => {
  const triggerTabList = document.querySelectorAll(
    'el-category-tabs > ul > li > a'
  );

  // 부트스트랩 인스턴스 생성
  if (!bootstrap) {
    // console.error('bootstrap을 찾을 수 없습니다.');
    return;
  }

  if (triggerTabList?.length > 0) {
    triggerTabList.forEach((triggerEl) => {
      const tabTrigger = new bootstrap.Tab(triggerEl);

      triggerEl.addEventListener('mouseenter', () => {
        tabTrigger.show();
      });

      triggerEl.addEventListener('click', (e) => {
        if (e.target?.href) {
          window.location.href = e.target.href;
        }
      });
    });
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initCategoryTabs = initCategoryTabs;
}

initCategoryTabs();
// 종료: el-category-tabs

// 시작: el-input
const initCustomInput = () => {
  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      const inputClearButtonEl = e.target.closest(
        'el-input > el-input-addon > .input-clear-button'
      );

      if (inputClearButtonEl) {
        e.preventDefault();
        e.stopPropagation();

        const inputEl = inputClearButtonEl.closest('el-input');
        inputEl.querySelector('input').value = '';
        inputEl.querySelector('input').focus();
      }
    });
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initCustomInput = initCustomInput;
}

initCustomInput();
// 종료: el-input
