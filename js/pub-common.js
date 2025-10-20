// 시작: global 변수
let pubWrapperEl = document.querySelector('el-wrapper');
let bsAlert = null;
let bsSearchLayerToggleButton = null;
let homeMainSwiperInstance = null;
let categoryImageCarouselInstance = null;
let homeBrandCarouselInstance = null;
let modalNoticeSwiperInstance = null;
// 종료: global 변수

// 시작: el-alert
const initAlert = () => {
  const alertEl = document.querySelector('el-alert');

  // 이미 초기화된 경우 건너뛰기
  if (alertEl?.dataset?.initialized === 'true') {
    return;
  }

  // 부트스트랩 인스턴스 생성
  if (!bootstrap) {
    // console.error('bootstrap을 찾을 수 없습니다.');
    return;
  }

  if (alertEl) {
    bsAlert = new bootstrap.Modal(alertEl);

    // 초기화 완료 전환
    alertEl.dataset.initialized = 'true';
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initAlert = initAlert;
}

initAlert();
// 종료: el-alert

// 시작: 상단 띠배너 숨기기
let topBannerInitialized = false;
const initTopBanner = () => {
  // 이미 초기화된 경우 건너뛰기
  if (topBannerInitialized) {
    return;
  }

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

    // 초기화 완료 전환
    topBannerInitialized = true;
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

  // 이미 초기화된 경우 건너뛰기
  if (headerStickyEl?.dataset?.initialized === 'true') {
    return;
  }

  if (headerStickyEl) {
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('is-stuck', e.intersectionRatio < 1),
      { threshold: [1] }
    );
    observer.observe(headerStickyEl);

    // 초기화 완료 전환
    headerStickyEl.dataset.initialized = 'true';
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

  // 이미 초기화된 경우 건너뛰기
  if (searchLayer?.dataset?.initialized === 'true') {
    return;
  }

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

  if (bsSearchLayerToggleButton && searchLayerInput && searchLayer) {
    // 초기화 완료 전환
    searchLayer.dataset.initialized = 'true';
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

  // 이미 초기화된 경우 건너뛰기
  if (themeSwitchEl?.dataset?.initialized === 'true') {
    return;
  }

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

    // 초기화 완료 전환
    themeSwitchEl.dataset.initialized = 'true';
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
      // 이미 초기화된 경우 건너뛰기
      if (triggerEl?.dataset?.initialized === 'true') {
        return;
      }

      const tabTrigger = new bootstrap.Tab(triggerEl);

      triggerEl.addEventListener('mouseenter', () => {
        tabTrigger.show();
      });

      triggerEl.addEventListener('click', (e) => {
        if (e.target?.href) {
          window.location.href = e.target.href;
        }
      });

      // 초기화 완료 전환
      triggerEl.dataset.initialized = 'true';
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
let customInputInitialized = false;
const initCustomInput = () => {
  // 이미 초기화된 경우 건너뛰기
  if (customInputInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      const inputClearButtonEl = e.target.closest(
        'el-input > el-input-addon > .input-clear-button'
      );
      const inputEyeButtonEl = e.target.closest(
        'el-input > el-input-addon > .input-eye-button'
      );

      if (inputClearButtonEl) {
        e.preventDefault();
        e.stopPropagation();

        const inputEl = inputClearButtonEl.closest('el-input');
        inputEl.querySelector('input').value = '';
        inputEl.querySelector('input').focus();
      }

      if (inputEyeButtonEl) {
        e.preventDefault();
        e.stopPropagation();

        const inputEl = inputEyeButtonEl.closest('el-input');

        if (inputEl.classList.contains('show-password')) {
          inputEl.classList.remove('show-password');
          inputEl.querySelector('input').type = 'password';
        } else {
          inputEl.classList.add('show-password');
          inputEl.querySelector('input').type = 'text';
        }
      }
    });

    // 초기화 완료 전환
    customInputInitialized = true;
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initCustomInput = initCustomInput;
}

initCustomInput();
// 종료: el-input

// 시작: el-home-main-swiper
const initHomeMainSwiper = () => {
  const homeMainSwiperEl = document.querySelector('#homeMainSwiper');

  // 이미 초기화된 경우 건너뛰기
  if (homeMainSwiperEl?.dataset?.initialized === 'true') {
    return;
  }

  const homeMainSwiperPrevEl = document.querySelector('#homeMainSwiperPrev');
  const homeMainSwiperNextEl = document.querySelector('#homeMainSwiperNext');
  const homeMainSwiperPauseEl = document.querySelector('#homeMainSwiperPause');
  const homeMainSwiperPlayEl = document.querySelector('#homeMainSwiperPlay');

  const homeMainSwiperParams = {
    speed: 600,
    rewind: true,
    effect: 'cards',
    cardsEffect: {
      perSlideOffset: 7,
      perSlideRotate: 1.8,
    },
    pagination: {
      el: '#homeMainSwiperPagination',
      type: 'fraction',
    },
    autoplay: {
      delay: 3500,
    },
  };

  if (homeMainSwiperEl && homeMainSwiperParams) {
    Object.assign(homeMainSwiperEl, homeMainSwiperParams);
    homeMainSwiperEl.initialize();
    homeMainSwiperInstance = homeMainSwiperEl?.swiper || null;
  }

  if (
    homeMainSwiperInstance &&
    homeMainSwiperPauseEl &&
    homeMainSwiperPlayEl &&
    homeMainSwiperPrevEl &&
    homeMainSwiperNextEl
  ) {
    homeMainSwiperPrevEl.addEventListener('click', () => {
      homeMainSwiperInstance.slidePrev();
    });

    homeMainSwiperNextEl.addEventListener('click', () => {
      homeMainSwiperInstance.slideNext();
    });

    homeMainSwiperPauseEl.addEventListener('click', () => {
      homeMainSwiperInstance.autoplay.stop();
      homeMainSwiperPlayEl.style.display = 'block';
      homeMainSwiperPauseEl.style.display = 'none';
    });

    homeMainSwiperPlayEl.addEventListener('click', () => {
      homeMainSwiperInstance.autoplay.start();
      homeMainSwiperPlayEl.style.display = 'none';
      homeMainSwiperPauseEl.style.display = 'block';
    });

    // 초기화 완료 전환
    homeMainSwiperEl.dataset.initialized = 'true';
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initHomeMainSwiper = initHomeMainSwiper;
}

initHomeMainSwiper();
// 종료: el-home-main-swiper

// 시작: el-category-image-carousel
const initCategoryImageCarousel = () => {
  const categoryImageCarouselEl = document.querySelector(
    'el-category-image-carousel swiper-container'
  );

  // 이미 초기화된 경우 건너뛰기
  if (categoryImageCarouselEl?.dataset?.initialized === 'true') {
    return;
  }

  const categoryImageCarouselPrevEl = document.querySelector(
    'el-category-image-carousel .button-prev-circle'
  );
  const categoryImageCarouselNextEl = document.querySelector(
    'el-category-image-carousel .button-next-circle'
  );
  const categoryImageCarouselParams = {
    slidesPerGroup: 7,
    slidesPerView: 7,
  };

  if (categoryImageCarouselEl && categoryImageCarouselParams) {
    Object.assign(categoryImageCarouselEl, categoryImageCarouselParams);
    categoryImageCarouselEl.initialize();
    categoryImageCarouselInstance = categoryImageCarouselEl?.swiper || null;
  }

  if (
    categoryImageCarouselInstance &&
    categoryImageCarouselPrevEl &&
    categoryImageCarouselNextEl
  ) {
    const handleButtonDisabled = () => {
      if (categoryImageCarouselInstance.isBeginning) {
        categoryImageCarouselPrevEl.disabled = true;
      } else {
        categoryImageCarouselPrevEl.disabled = false;
      }

      if (categoryImageCarouselInstance.isEnd) {
        categoryImageCarouselNextEl.disabled = true;
      } else {
        categoryImageCarouselNextEl.disabled = false;
      }
    };
    handleButtonDisabled();

    categoryImageCarouselPrevEl.addEventListener('click', () => {
      categoryImageCarouselInstance.slidePrev();
    });

    categoryImageCarouselNextEl.addEventListener('click', () => {
      categoryImageCarouselInstance.slideNext();
    });

    categoryImageCarouselInstance.on('slideChange', () => {
      handleButtonDisabled();
    });

    // 초기화 완료 전환
    categoryImageCarouselEl.dataset.initialized = 'true';
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initCategoryImageCarousel = initCategoryImageCarousel;
}

initCategoryImageCarousel();
// 종료: el-category-image-carousel

// 시작: el-category-swiper
const initCategorySwiper = () => {
  const categorySwiperEls = document.querySelectorAll('el-category-swiper');

  if (categorySwiperEls?.length > 0) {
    const swiperParams = {
      slidesPerView: 'auto',
      spaceBetween: 4,
      slidesOffsetBefore: 1,
      slidesOffsetAfter: 18,
      focusableElements: 'select',
    };

    [...categorySwiperEls].forEach((categorySwiperEl) => {
      // 이미 초기화된 경우 건너뛰기
      if (categorySwiperEl?.dataset?.initialized === 'true') {
        return;
      }

      if (categorySwiperEl?.querySelector('swiper-container')) {
        const targetSwiperContainer =
          categorySwiperEl.querySelector('swiper-container');

        Object.assign(targetSwiperContainer, swiperParams);
        targetSwiperContainer.initialize();
        const targetSwiperInstance = targetSwiperContainer?.swiper || null;

        const targetSwiperPrevEl = categorySwiperEl.querySelector(
          '.button-prev-circle'
        );

        const targetSwiperNextEl = categorySwiperEl.querySelector(
          '.button-next-circle'
        );

        if (targetSwiperInstance && targetSwiperPrevEl && targetSwiperNextEl) {
          const handleButtonDisabled = () => {
            if (targetSwiperInstance.isBeginning) {
              targetSwiperPrevEl.disabled = true;
            } else {
              targetSwiperPrevEl.disabled = false;
            }

            if (targetSwiperInstance.isEnd) {
              targetSwiperNextEl.disabled = true;
            } else {
              targetSwiperNextEl.disabled = false;
            }
          };
          handleButtonDisabled();

          // 이벤트 핸들러 함수 정의
          const handlePrevClick = () => {
            targetSwiperInstance.slidePrev();
          };

          const handleNextClick = () => {
            targetSwiperInstance.slideNext();
          };

          const handleSlideChange = () => {
            handleButtonDisabled();
          };

          // 이벤트 리스너 추가
          targetSwiperPrevEl.addEventListener('click', handlePrevClick);
          targetSwiperNextEl.addEventListener('click', handleNextClick);
          targetSwiperInstance.on('slideChange', handleSlideChange);

          // 초기화 완료 전환
          categorySwiperEl.dataset.initialized = 'true';
        }
      }
    });
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initCategorySwiper = initCategorySwiper;
}

initCategorySwiper();
// 종료: el-category-swiper

// 시작: el-home-brand-carousel
const initHomeBrandCarousel = () => {
  const homeBrandCarouselEl = document.querySelector(
    'el-home-brand-carousel swiper-container'
  );

  // 이미 초기화된 경우 건너뛰기
  if (homeBrandCarouselEl?.dataset?.initialized === 'true') {
    return;
  }

  const homeBrandCarouselPrevEl = document.querySelector(
    'el-home-brand-carousel .button-prev-circle'
  );
  const homeBrandCarouselNextEl = document.querySelector(
    'el-home-brand-carousel .button-next-circle'
  );
  const homeBrandCarouselParams = {
    loop: true,
    speed: 500,
    slidesPerView: 6,
    autoplay: {
      delay: 2000,
      pauseOnMouseEnter: true,
    },
  };

  if (homeBrandCarouselEl && homeBrandCarouselParams) {
    Object.assign(homeBrandCarouselEl, homeBrandCarouselParams);
    homeBrandCarouselEl.initialize();
    homeBrandCarouselInstance = homeBrandCarouselEl?.swiper || null;
  }

  if (
    homeBrandCarouselInstance &&
    homeBrandCarouselPrevEl &&
    homeBrandCarouselNextEl
  ) {
    homeBrandCarouselPrevEl.addEventListener('click', () => {
      homeBrandCarouselInstance.slidePrev();
    });

    homeBrandCarouselNextEl.addEventListener('click', () => {
      homeBrandCarouselInstance.slideNext();
    });

    // 초기화 완료 전환
    homeBrandCarouselEl.dataset.initialized = 'true';
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initHomeBrandCarousel = initHomeBrandCarousel;
}

initHomeBrandCarousel();
// 종료: el-home-brand-carousel

// 시작: el-modal-notice-swiper
const initModalNoticeSwiper = () => {
  const modalNoticeSwiperEl = document.querySelector(
    'el-modal-notice-swiper swiper-container'
  );

  // 이미 초기화된 경우 건너뛰기
  if (modalNoticeSwiperEl?.dataset?.initialized === 'true') {
    return;
  }

  const modalNoticeSwiperPrevEl = document.querySelector(
    '#modalNoticeSwiperPrev'
  );
  const modalNoticeSwiperNextEl = document.querySelector(
    '#modalNoticeSwiperNext'
  );
  const modalNoticeSwiperParams = {
    loop: true,
    pagination: {
      el: '#modalNoticeSwiperPagination',
      type: 'fraction',
    },
  };

  if (modalNoticeSwiperEl && modalNoticeSwiperParams) {
    Object.assign(modalNoticeSwiperEl, modalNoticeSwiperParams);
    modalNoticeSwiperEl.initialize();
    modalNoticeSwiperInstance = modalNoticeSwiperEl?.swiper || null;
  }

  if (
    modalNoticeSwiperInstance &&
    modalNoticeSwiperPrevEl &&
    modalNoticeSwiperNextEl
  ) {
    modalNoticeSwiperPrevEl.addEventListener('click', () => {
      modalNoticeSwiperInstance.slidePrev();
    });

    modalNoticeSwiperNextEl.addEventListener('click', () => {
      modalNoticeSwiperInstance.slideNext();
    });

    // 초기화 완료 전환
    modalNoticeSwiperEl.dataset.initialized = 'true';
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initModalNoticeSwiper = initModalNoticeSwiper;
}

initModalNoticeSwiper();
// 종료: el-modal-notice-swiper

// 시작: scrollToTopButton
const initScrollToTopButton = () => {
  const scrollToTopButtonEl = document.querySelector('#scrollToTopButton');

  // 이미 초기화된 경우 건너뛰기
  if (scrollToTopButtonEl?.dataset?.initialized === 'true') {
    return;
  }

  if (scrollToTopButtonEl) {
    // 클릭 이벤트: 상단으로 스크롤
    scrollToTopButtonEl.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });

    // 스크롤 이벤트: 버튼 위치 조정
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY > 100) {
        scrollToTopButtonEl.style.bottom = '24px';
      } else {
        scrollToTopButtonEl.style.bottom = '-70px';
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 초기 상태 설정
    handleScroll();

    // 초기화 완료 전환
    scrollToTopButtonEl.dataset.initialized = 'true';
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initScrollToTopButton = initScrollToTopButton;
}

initScrollToTopButton();
// 종료: el-top-button
