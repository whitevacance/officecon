// 시작: global 변수
let pubWrapperEl = document.querySelector('el-wrapper');
let bsModalLoader = null;
let bsModalDefault = null;
let bsModalEstimateDownload = null;
let bsAlert = null;
let bsSearchLayerToggleButton = null;
let homeMainSwiperInstance = null;
let categoryImageCarouselInstance = null;
let homeBrandCarouselInstance = null;
let modalNoticeSwiperInstance = null;
let representativeBrandSwiperInstance = null;
// 종료: global 변수

// 시작: el-modal-loader
const initModalLoader = () => {
  const modalLoaderEl = document.querySelector('el-modal-loader');

  // 이미 초기화된 경우 건너뛰기
  if (modalLoaderEl?.dataset?.initialized === 'true') {
    return;
  }

  // 부트스트랩 인스턴스 생성
  if (!bootstrap) {
    // console.error('bootstrap을 찾을 수 없습니다.');
    return;
  }

  if (modalLoaderEl) {
    bsModalLoader = new bootstrap.Modal(modalLoaderEl, {
      keyboard: false,
      backdrop: 'static',
    });

    // 초기화 완료 전환
    modalLoaderEl.dataset.initialized = 'true';
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initModalLoader = initModalLoader;
}

initModalLoader();
// 종료: el-modal-loader

// 시작: el-modal-default
const initModalDefault = () => {
  const modalDefaultEl = document.querySelector('#el-modal-default');

  // 이미 초기화된 경우 건너뛰기
  if (modalDefaultEl?.dataset?.initialized === 'true') {
    return;
  }

  // 부트스트랩 인스턴스 생성
  if (!bootstrap) {
    // console.error('bootstrap을 찾을 수 없습니다.');
    return;
  }

  if (modalDefaultEl) {
    bsModalDefault = new bootstrap.Modal(modalDefaultEl);

    // 초기화 완료 전환
    modalDefaultEl.dataset.initialized = 'true';
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initModalDefault = initModalDefault;
}

initModalDefault();
// 종료: el-modal-default

// 시작: el-modal-estimate-download
const initModalEstimateDownload = () => {
  const modalEstimateDownloadEl = document.querySelector(
    '#el-modal-estimate-download'
  );

  // 이미 초기화된 경우 건너뛰기
  if (modalEstimateDownloadEl?.dataset?.initialized === 'true') {
    return;
  }

  // 부트스트랩 인스턴스 생성
  if (!bootstrap) {
    // console.error('bootstrap을 찾을 수 없습니다.');
    return;
  }

  if (modalEstimateDownloadEl) {
    bsModalEstimateDownload = new bootstrap.Modal(modalEstimateDownloadEl);

    // 초기화 완료 전환
    modalEstimateDownloadEl.dataset.initialized = 'true';
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initModalEstimateDownload = initModalEstimateDownload;
}

initModalEstimateDownload();
// 종료: el-modal-estimate-download

// 시작: handel modal scroll
const hasModalInnerScroll = (targetEl) => {
  if (!targetEl) {
    return false;
  }
  return targetEl.scrollHeight > targetEl.clientHeight;
};

const initHandleModalScroll = () => {
  const modalEls = document.querySelectorAll('el-modal');

  if (modalEls?.length > 0) {
    [...modalEls].forEach((modalEl) => {
      // 이미 초기화된 경우 건너뛰기
      if (modalEl?.dataset?.initializedScroll === 'true') {
        return;
      }

      const targetModalHeaderEl = modalEl.querySelector(
        'el-modal-header.modal-header'
      );
      const targetModalBodyEl = modalEl.querySelector(
        'el-modal-body.modal-body'
      );
      const targetModalScrollableListContentEl = modalEl.querySelector(
        'el-modal-scrollable-list-content'
      );
      const targetModalFooterEl = modalEl.querySelector(
        'el-modal-footer.modal-footer'
      );

      // 스크롤 이벤트 핸들러
      let scrollHandler = null;
      let scrollHandlerForScrollableList = null;
      let isScrollListenerAttached = false;
      let isScrollListenerAttachedForScrollableList = false;

      // 스크롤 여부 확인 및 이벤트 리스너 등록 함수
      const checkScroll = () => {
        // 모달 body 스크롤 여부 확인
        if (targetModalBodyEl) {
          if (hasModalInnerScroll(targetModalBodyEl)) {
            // 스크롤 이벤트 리스너가 아직 등록되지 않았을 때만 등록
            if (!isScrollListenerAttached) {
              scrollHandler = () => {
                // 스크롤 이벤트 처리 로직
                if (targetModalBodyEl.scrollTop > 0) {
                  targetModalHeaderEl.classList.add('shadow-bottom');
                } else {
                  targetModalHeaderEl.classList.remove('shadow-bottom');
                }
              };

              targetModalBodyEl.addEventListener('scroll', scrollHandler);
              isScrollListenerAttached = true;
            }
          } else {
            // 스크롤이 없을 때는 이벤트 리스너 제거
            if (isScrollListenerAttached && scrollHandler) {
              targetModalBodyEl.removeEventListener('scroll', scrollHandler);
              isScrollListenerAttached = false;
              scrollHandler = null;
            }
          }
        }

        // 모달 내부 스크롤리스트 컨텐츠 스크롤 여부 확인
        if (targetModalScrollableListContentEl) {
          if (hasModalInnerScroll(targetModalScrollableListContentEl)) {
            targetModalFooterEl.classList.add('shadow-top');

            // 스크롤 이벤트 리스너가 아직 등록되지 않았을 때만 등록
            if (!isScrollListenerAttachedForScrollableList) {
              scrollHandlerForScrollableList = () => {
                // 스크롤 이벤트 처리 로직
                const isScrollBottom =
                  targetModalScrollableListContentEl.scrollTop +
                    targetModalScrollableListContentEl.clientHeight >=
                  targetModalScrollableListContentEl.scrollHeight;

                if (isScrollBottom) {
                  targetModalFooterEl.classList.remove('shadow-top');
                } else {
                  targetModalFooterEl.classList.add('shadow-top');
                }
              };

              targetModalScrollableListContentEl.addEventListener(
                'scroll',
                scrollHandlerForScrollableList
              );
              isScrollListenerAttachedForScrollableList = true;
            }
          } else {
            // 스크롤이 없을 때는 이벤트 리스너 제거
            if (
              isScrollListenerAttachedForScrollableList &&
              scrollHandlerForScrollableList
            ) {
              targetModalScrollableListContentEl.removeEventListener(
                'scroll',
                scrollHandlerForScrollableList
              );
              isScrollListenerAttachedForScrollableList = false;
              scrollHandlerForScrollableList = null;
            }
          }
        }
      };

      // 창 크기 조절 이벤트 리스너
      const handleResize = () => {
        checkScroll();
      };

      // resize 이벤트 리스너 등록
      window.addEventListener('resize', handleResize);

      // 모달이 열릴 때도 스크롤 여부 확인
      if (modalEl) {
        // 이미 생성된 인스턴스가 없어도 이벤트는 등록하여 여러 모달에 동일하게 적용
        if (bootstrap?.Modal) {
          bootstrap.Modal.getOrCreateInstance(modalEl);
        }

        modalEl.addEventListener('shown.bs.modal', () => {
          // 모달이 완전히 표시된 후 스크롤 여부 확인
          setTimeout(() => {
            checkScroll();
          }, 0);
        });

        // 모달이 닫힐 때 스크롤 이벤트 리스너 정리
        modalEl.addEventListener('hidden.bs.modal', () => {
          // 모달 body 스크롤 이벤트 리스너 정리
          if (isScrollListenerAttached && scrollHandler && targetModalBodyEl) {
            targetModalBodyEl.removeEventListener('scroll', scrollHandler);
            isScrollListenerAttached = false;
            scrollHandler = null;
          }

          // 모달 내부 스크롤리스트 컨텐츠 스크롤 이벤트 리스너 정리
          if (
            isScrollListenerAttachedForScrollableList &&
            scrollHandlerForScrollableList &&
            targetModalScrollableListContentEl
          ) {
            targetModalScrollableListContentEl.removeEventListener(
              'scroll',
              scrollHandlerForScrollableList
            );
            isScrollListenerAttachedForScrollableList = false;
            scrollHandlerForScrollableList = null;
          }
        });

        // 초기화 완료 전환
        modalEl.dataset.initializedScroll = 'true';
      }
    });
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initHandleModalScroll = initHandleModalScroll;
}

initHandleModalScroll();
// 종료: el-modal-default

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

// 시작: el-tab-button
let tabButtonActiveInitialized = false;
const initTabButtonActive = () => {
  // 이미 초기화된 경우 건너뛰기
  if (tabButtonActiveInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      // 클릭 시 active 처리
      const tabButtonActiveEl = e.target.closest(
        'el-tab-button > button:first-child'
      );

      if (
        tabButtonActiveEl &&
        !tabButtonActiveEl.classList.contains('disable-click-active')
      ) {
        const tabButtonEl = tabButtonActiveEl.closest('el-tab-button');
        if (!tabButtonEl.classList.contains('active')) {
          tabButtonEl.classList.add('active');
        }
      }

      // 제거 버튼 클릭 시 active 제거 처리
      const tabButtonRemoveEl = e.target.closest(
        'el-tab-button > button.remove'
      );

      if (tabButtonRemoveEl) {
        const tabButtonEl = tabButtonRemoveEl.closest('el-tab-button');
        tabButtonEl.classList.remove('active');
      }
    });

    // 초기화 완료 전환
    tabButtonActiveInitialized = true;
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initTabButtonActive = initTabButtonActive;
}

initTabButtonActive();
// 종료: el-tab-button

// 시작: el-filter-brand 내 브랜드 클릭 시 active 처리
let filterBrandActiveInitialized = false;
const initFilterBrandActive = () => {
  // 이미 초기화된 경우 건너뛰기
  if (filterBrandActiveInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      // 클릭 시 active 처리
      const filterBrandActiveEl = e.target.closest(
        'el-filter-brand el-filter-content > ul > li > button'
      );

      if (filterBrandActiveEl) {
        const filterBrandEl = filterBrandActiveEl.closest(
          'el-filter-brand el-filter-content > ul > li'
        );
        if (!filterBrandEl.classList.contains('active')) {
          filterBrandEl.classList.add('active');
        }
      }

      // 제거 버튼 클릭 시 active 제거 처리
      const filterBrandRemoveEl = e.target.closest(
        'el-filter-brand el-filter-content > ul > li > button.remove'
      );

      if (filterBrandRemoveEl) {
        const filterBrandEl = filterBrandRemoveEl.closest(
          'el-filter-brand el-filter-content > ul > li'
        );
        filterBrandEl.classList.remove('active');
      }
    });

    // 초기화 완료 전환
    filterBrandActiveInitialized = true;
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initFilterBrandActive = initFilterBrandActive;
}

initFilterBrandActive();
// 종료: el-filter-brand 내 브랜드 클릭 시 active 처리

// 시작: el-filter-detail-layer-dropdown 내 버튼 클릭 시 active 토글 처리
let filterDetailLayerDropdownActiveInitialized = false;
const initFilterDetailLayerDropdownActive = () => {
  // 이미 초기화된 경우 건너뛰기
  if (filterDetailLayerDropdownActiveInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      const filterDetailListActiveEl = e.target.closest(
        'el-filter-detail-layer-dropdown el-filter-detail-list > ul > li > button'
      );

      if (filterDetailListActiveEl) {
        if (!filterDetailListActiveEl.classList.contains('active')) {
          filterDetailListActiveEl.classList.add('active');
        } else {
          filterDetailListActiveEl.classList.remove('active');
        }
      }
    });

    // 초기화 완료 전환
    filterDetailLayerDropdownActiveInitialized = true;
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initFilterDetailLayerDropdownActive =
    initFilterDetailLayerDropdownActive;
}

initFilterDetailLayerDropdownActive();
// 종료: el-filter-brand 내 브랜드 클릭 시 active 토글 처리

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
// const initCategoryTabs = () => {
//   const triggerTabList = document.querySelectorAll(
//     'el-category-tabs > ul > li > a'
//   );

//   // 부트스트랩 인스턴스 생성
//   if (!bootstrap) {
//     // console.error('bootstrap을 찾을 수 없습니다.');
//     return;
//   }

//   if (triggerTabList?.length > 0) {
//     triggerTabList.forEach((triggerEl) => {
//       // 이미 초기화된 경우 건너뛰기
//       if (triggerEl?.dataset?.initialized === 'true') {
//         return;
//       }

//       const tabTrigger = new bootstrap.Tab(triggerEl);

//       triggerEl.addEventListener('mouseenter', () => {
//         tabTrigger.show();
//       });

//       triggerEl.addEventListener('click', (e) => {
//         if (e.target?.href) {
//           window.location.href = e.target.href;
//         }
//       });

//       // 초기화 완료 전환
//       triggerEl.dataset.initialized = 'true';
//     });
//   }
// };

// // 전역 함수로 등록
// if (window !== undefined) {
//   window.initCategoryTabs = initCategoryTabs;
// }

// initCategoryTabs();
// 종료: el-category-tabs

// 시작: el-input
let customInputInitialized = false;
const initCustomInput = () => {
  // 이미 초기화된 경우 건너뛰기
  if (customInputInitialized) {
    return;
  }

  if (document?.body) {
    // mousedown에서 preventDefault()를 호출하여 blur 이벤트 발생 방지
    document.body.addEventListener('mousedown', (e) => {
      const inputClearButtonEl = e.target.closest(
        'el-input > el-input-addon > .input-clear-button'
      );
      const inputEyeButtonEl = e.target.closest(
        'el-input > el-input-addon > .input-eye-button'
      );

      // input 관련 버튼 클릭 시 blur 방지
      if (inputClearButtonEl || inputEyeButtonEl) {
        e.preventDefault();
      }
    });

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

  // 슬라이드 개수 확인 (loop 모드가 제대로 작동하려면 최소 8개 이상 필요)
  // 원본 슬라이드 개수를 먼저 저장 (복제 전)
  const originalSlidesCount =
    homeMainSwiperEl?.querySelectorAll('swiper-slide')?.length || 0;
  let slidesCount = originalSlidesCount;
  let isCloned = false; // 복제 여부 플래그

  // slidesCount가 1 이하인 경우 초기화하지 않음
  if (slidesCount <= 1) {
    return;
  }

  // slidesCount가 8 미만인 경우 복제 로직 실행
  if (slidesCount < 8) {
    isCloned = true; // 복제가 진행됨
    const originalSlides = Array.from(
      homeMainSwiperEl.querySelectorAll('swiper-slide')
    );

    let multiplier = 1;

    if (slidesCount === 2) {
      // 2개인 경우: 4배수로 복제 (최종 8개)
      multiplier = 4;
    } else if (slidesCount === 3) {
      // 3개인 경우: 3배수로 복제 (최종 9개)
      multiplier = 3;
    } else if (slidesCount >= 4 && slidesCount <= 7) {
      // 4~7개인 경우: 2배수로 복제
      multiplier = 2;
    }

    // 전체 슬라이드 그룹을 순서대로 반복 복제
    // 예: [1번, 2번] → [1번, 2번, 1번, 2번, 1번, 2번, 1번, 2번]
    for (let i = 1; i < multiplier; i++) {
      originalSlides.forEach((slide) => {
        const clonedSlide = slide.cloneNode(true);
        homeMainSwiperEl.appendChild(clonedSlide);
      });
    }

    // 복제 후 슬라이드 개수 재확인
    slidesCount =
      homeMainSwiperEl?.querySelectorAll('swiper-slide')?.length || 0;
  }

  const homeMainSwiperParams = {
    effect: 'cards',
    loop: true,
    speed: 600,
    cardsEffect: {
      perSlideOffset: 7,
      perSlideRotate: 1.8,
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

    // 스와이퍼 페이지네이션 수동으로 카운팅
    const homeMainSwiperPaginationEl = document.querySelector(
      '#homeMainSwiperPagination'
    );

    if (homeMainSwiperPaginationEl) {
      const getOriginalSlideIndex = () => {
        // loop 모드에서는 항상 realIndex를 사용해야 함 (activeIndex는 클론 슬라이드 때문에 부정확할 수 있음)
        const realIndex = homeMainSwiperInstance.realIndex;

        if (isCloned) {
          // 복제된 경우: realIndex를 원본 슬라이드 개수로 나눈 나머지를 사용
          return (realIndex % originalSlidesCount) + 1;
        } else {
          // 복제되지 않은 경우: realIndex를 그대로 사용
          return realIndex + 1;
        }
      };

      // 페이지네이션 업데이트 함수
      const updatePagination = () => {
        const currentSlide = getOriginalSlideIndex();
        const currentSpan = homeMainSwiperPaginationEl.querySelector(
          '.swiper-pagination-current'
        );
        const totalSpan = homeMainSwiperPaginationEl.querySelector(
          '.swiper-pagination-total'
        );

        if (currentSpan) {
          currentSpan.textContent = currentSlide;
        }
        if (totalSpan) {
          totalSpan.textContent = originalSlidesCount;
        }
      };

      // Swiper 초기화 완료 후 초기 페이지네이션 설정
      homeMainSwiperInstance.on('init', () => {
        updatePagination();
      });

      // 슬라이드 변경 시 페이지네이션 업데이트
      homeMainSwiperInstance.on('slideChange', () => {
        updatePagination();
      });

      // 초기 페이지네이션 설정 (이미 초기화된 경우를 대비)
      // setTimeout을 사용하여 Swiper가 완전히 초기화된 후 실행
      setTimeout(() => {
        updatePagination();
      }, 0);
    }

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
      watchSlidesProgress: true,
    };

    [...categorySwiperEls].forEach((categorySwiperEl) => {
      // 이미 초기화된 경우 건너뛰기
      if (categorySwiperEl?.dataset?.initialized === 'true') {
        return;
      }

      if (categorySwiperEl?.querySelector('swiper-container')) {
        const targetSwiperContainer =
          categorySwiperEl.querySelector('swiper-container');

        // 시작: [251106 1차 검수 반영]
        // 맨 마지막 칩메뉴이동 시 맨 앞 칩메뉴가 짤리지 않고 다음 칩메뉴를 첫 번쨰로 원형 모두 나오도록 위치 수정
        const swiperSlide = document.createElement('swiper-slide');
        swiperSlide.textContent = ' ';
        swiperSlide.style.width = '200px';
        targetSwiperContainer.appendChild(swiperSlide);
        // 종료: [251106 1차 검수 반영]

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
          const handleButtonDisabled = ({ isNextElDisabled = false }) => {
            if (targetSwiperInstance.isBeginning) {
              targetSwiperPrevEl.disabled = true;
            } else {
              targetSwiperPrevEl.disabled = false;
            }

            if (isNextElDisabled || targetSwiperInstance.isEnd) {
              targetSwiperNextEl.disabled = true;
            } else {
              targetSwiperNextEl.disabled = false;
            }
          };
          handleButtonDisabled({ isNextElDisabled: false });

          // 이벤트 핸들러 함수 정의
          const handlePrevClick = () => {
            targetSwiperInstance.slidePrev();
          };

          const handleNextClick = () => {
            targetSwiperInstance.slideNext();
          };

          const handleSlideChange = (swiper) => {
            // 시작: [251106 1차 검수 반영]
            // 맨 마지막 칩메뉴이동 시 맨 앞 칩메뉴가 짤리지 않고 다음 칩메뉴를 첫 번쨰로 원형 모두 나오도록 위치 수정
            const lastSlide = swiper.slides[swiper.slides.length - 1];
            if (lastSlide.classList.contains('swiper-slide-visible')) {
              handleButtonDisabled({ isNextElDisabled: true });
            } else {
              handleButtonDisabled({ isNextElDisabled: false });
            }
            // 종료: [251106 1차 검수 반영]
          };

          // 이벤트 리스너 추가
          targetSwiperPrevEl.addEventListener('click', handlePrevClick);
          targetSwiperNextEl.addEventListener('click', handleNextClick);
          targetSwiperInstance.on('slideChange', handleSlideChange);

          // 탭 버튼 클릭 이벤트 처리
          // el-category-swiper에 disable-siblings-inactive 클래스가 없을 때만 실행
          if (
            !categorySwiperEl.classList.contains('disable-siblings-inactive')
          ) {
            const tabButtons = targetSwiperContainer.querySelectorAll(
              'swiper-slide el-tab-button > button:first-child'
            );
            tabButtons.forEach((button) => {
              button.addEventListener('click', (e) => {
                // 클릭된 버튼의 부모 el-tab-button
                const clickedTabButton = button.closest('el-tab-button');

                if (clickedTabButton) {
                  // 같은 swiper-container 내의 모든 el-tab-button에서 active 제거
                  const allTabButtons = targetSwiperContainer.querySelectorAll(
                    'swiper-slide el-tab-button'
                  );
                  allTabButtons.forEach((tabButton) => {
                    tabButton.classList.remove('active');
                  });

                  // 클릭된 el-tab-button에 active 추가 (이미 있으면 추가 안함)
                  if (!clickedTabButton.classList.contains('active')) {
                    clickedTabButton.classList.add('active');
                  }
                }
              });
            });
          }

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
    slidesPerView: 1,
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

// 시작: date picker
const initDatePicker = () => {
  const datePickerEls = document.querySelectorAll('el-datepicker');

  if (datePickerEls?.length > 0) {
    [...datePickerEls].forEach((datePickerEl) => {
      // 이미 초기화된 경우 건너뛰기
      if (datePickerEl?.dataset?.initialized === 'true') {
        return;
      }

      // tui.DatePicker 확인
      if (!tui?.DatePicker) {
        // console.error('tui?.DatePicker을 찾을 수 없습니다.');
        return;
      }

      const targetInputEl = datePickerEl.querySelector('.datepicker-input');
      const targetButtonEl = datePickerEl.querySelector('.button-calendar');
      const targetLayerEl = datePickerEl.querySelector('el-datepicker-layer');

      if (targetInputEl && targetButtonEl && targetLayerEl) {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();

        const datepicker = new tui.DatePicker(targetLayerEl, {
          // date: new Date(),
          input: {
            element: targetInputEl,
            format: 'yyyy.MM.dd HH:mm',
          },
          timePicker: {
            format: 'HH:mm',
            showMeridiem: false,
            minuteStep: 10,
            // initialHour: currentHour,
            // initialMinute: currentMinute,
          },
        });

        datepicker.on('open', () => {
          const updatedTime = new Date();
          const updatedTimestamp = updatedTime.getTime();

          // endDate 기준: 오늘 기준 16일 후 날짜
          // const endDate = new Date(updatedTimestamp + 16 * 24 * 60 * 60 * 1000);

          const endDate = new Date(
            updatedTimestamp + 99999 * 24 * 60 * 60 * 1000
          );
          datepicker.setRanges([[updatedTime, endDate]]);
        });

        targetButtonEl.addEventListener('click', () => {
          targetInputEl.focus();
          datepicker.open();
        });

        // 초기화 완료 전환
        datePickerEl.dataset.initialized = 'true';
      }
    });
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initDatePicker = initDatePicker;
}

initDatePicker();
// 종료: date picker

// 시작: 탭 el-tabs
let tabsInitialized = false;
const initTabs = () => {
  // 이미 초기화된 경우 건너뛰기
  if (tabsInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      // 클릭 시 active 처리
      const tabsNavButtonEl = e.target.closest('el-tabs-nav > button');

      if (tabsNavButtonEl) {
        const tabsEl = tabsNavButtonEl.closest('el-tabs');
        const tabsNavEl = tabsEl.querySelector('el-tabs-nav');
        const tabsContentEl = tabsEl.querySelector('el-tabs-content');
        const tabsNavButtonEls =
          tabsNavEl.querySelectorAll('button[role="tab"]');
        const tabsPanelEls = tabsContentEl.querySelectorAll('el-tab-panel');

        // 클릭된 탭 버튼의 인덱스 찾기
        const clickedIndex =
          Array.from(tabsNavButtonEls).indexOf(tabsNavButtonEl);

        // 모든 탭 버튼에서 active 클래스 제거
        tabsNavButtonEls.forEach((button) => {
          button.classList.remove('active');
        });

        // 클릭된 탭 버튼에 active 클래스 추가
        tabsNavButtonEl.classList.add('active');

        // 모든 탭 패널에서 active 클래스 제거
        tabsPanelEls.forEach((panel) => {
          panel.classList.remove('active');
        });

        // 해당 인덱스의 탭 패널에 active 클래스 추가
        if (tabsPanelEls[clickedIndex]) {
          tabsPanelEls[clickedIndex].classList.add('active');
        }
      }
    });
  }

  // 초기화 완료 전환
  tabsInitialized = true;
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initTabs = initTabs;
}

initTabs();
// 종료: 탭 el-tabs

// 시작: 탭 el-service-tabs
let serviceTabsInitialized = false;
const initServiceTabs = () => {
  // 이미 초기화된 경우 건너뛰기
  if (serviceTabsInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      // 클릭 시 active 처리
      const serviceTabsButtonEl = e.target.closest('el-service-tabs > button');
      const serviceTabsContentEl = document.querySelector(
        'el-service-tabs-content'
      );

      if (serviceTabsButtonEl && serviceTabsContentEl) {
        const serviceTabsEl = serviceTabsButtonEl.closest('el-service-tabs');
        const serviceTabsButtonEls =
          serviceTabsEl.querySelectorAll('button[role="tab"]');
        const serviceTabsPanelEls = serviceTabsContentEl.querySelectorAll(
          'el-service-tab-panel'
        );

        // 클릭된 탭 버튼의 인덱스 찾기
        const clickedIndex =
          Array.from(serviceTabsButtonEls).indexOf(serviceTabsButtonEl);

        // 모든 탭 버튼에서 active 클래스 제거
        serviceTabsButtonEls.forEach((button) => {
          button.classList.remove('active');
        });

        // 클릭된 탭 버튼에 active 클래스 추가
        serviceTabsButtonEl.classList.add('active');

        // 모든 탭 패널에서 active 클래스 제거
        serviceTabsPanelEls.forEach((panel) => {
          panel.classList.remove('active');
        });

        // 해당 인덱스의 탭 패널에 active 클래스 추가
        if (serviceTabsPanelEls[clickedIndex]) {
          serviceTabsPanelEls[clickedIndex].classList.add('active');
        }
      }
    });
  }

  // 초기화 완료 전환
  serviceTabsInitialized = true;
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initServiceTabs = initServiceTabs;
}

initServiceTabs();
// 종료: 탭 el-service-tabs

// 시작: 전화번호 입력 시 자동 하이픈 처리 - 일반전화와 핸드폰 번호 모두 처리
let phoneNumberInputInitialized = false;
const initPhoneNumberInput = () => {
  // 이미 초기화된 경우 건너뛰기
  if (phoneNumberInputInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('input', (e) => {
      const targetInputEl = e.target.closest(
        'el-input > input.input-type-phone'
      );

      // 전화번호 입력 시 자동 하이픈 처리 로직
      if (targetInputEl) {
        // 숫자만 추출
        let phoneNumber = targetInputEl.value.replace(/[^0-9]/g, '');

        // '010'으로 시작하는 경우에만 처리
        if (phoneNumber.startsWith('010')) {
          // 최대 11자리 제한
          if (phoneNumber.length > 11) {
            phoneNumber = phoneNumber.substring(0, 11);
          }

          // 3-4-4 형식으로 하이픈 추가
          let formattedNumber = '';
          if (phoneNumber.length > 0) {
            if (phoneNumber.length <= 3) {
              formattedNumber = phoneNumber;
            } else if (phoneNumber.length <= 7) {
              formattedNumber =
                phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3);
            } else {
              formattedNumber =
                phoneNumber.substring(0, 3) +
                '-' +
                phoneNumber.substring(3, 7) +
                '-' +
                phoneNumber.substring(7, 11);
            }
          }

          // 포맷된 번호를 입력 필드에 적용
          targetInputEl.value = formattedNumber;
        } else {
          // '010'으로 시작하지 않으면 숫자만 입력 가능하도록 처리 (하이픈 제거)
          targetInputEl.value = phoneNumber;
        }
      }
    });

    // 초기화 완료 전환
    phoneNumberInputInitialized = true;
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initPhoneNumberInput = initPhoneNumberInput;
}

initPhoneNumberInput();
// 종료: 전화번호 입력 시 자동 하이픈 처리 - 일반전화와 핸드폰 번호 모두 처리

// 시작: 핸드폰 번호 입력 시 자동 하이픈 처리 - 핸드폰 번호만 처리
let mobileNumberInputInitialized = false;
const initMobileNumberInput = () => {
  // 이미 초기화된 경우 건너뛰기
  if (mobileNumberInputInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('input', (e) => {
      const targetInputEl = e.target.closest(
        'el-input > input.input-type-mobile'
      );

      // 핸드폰 번호 입력 시 자동 하이픈 처리 로직
      if (targetInputEl) {
        // 숫자만 추출
        let mobileNumber = targetInputEl.value.replace(/[^0-9]/g, '');

        // 최대 11자리 제한
        if (mobileNumber.length > 11) {
          mobileNumber = mobileNumber.substring(0, 11);
        }

        // 3-4-4 형식으로 하이픈 추가
        let formattedNumber = '';
        if (mobileNumber.length > 0) {
          if (mobileNumber.length <= 3) {
            formattedNumber = mobileNumber;
          } else if (mobileNumber.length <= 7) {
            formattedNumber =
              mobileNumber.substring(0, 3) + '-' + mobileNumber.substring(3);
          } else {
            formattedNumber =
              mobileNumber.substring(0, 3) +
              '-' +
              mobileNumber.substring(3, 7) +
              '-' +
              mobileNumber.substring(7, 11);
          }
        }

        // 포맷된 번호를 입력 필드에 적용
        targetInputEl.value = formattedNumber;
      }
    });

    // 초기화 완료 전환
    mobileNumberInputInitialized = true;
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initMobileNumberInput = initMobileNumberInput;
}

initMobileNumberInput();
// 종료: 핸드폰 번호 입력 시 자동 하이픈 처리 - 핸드폰 번호만 처리

// 시작: 주문결제 > 수신자 목록 remove 처리
let orderAddresseeListRemoveInitialized = false;
const initOrderAddresseeListRemove = () => {
  // 이미 초기화된 경우 건너뛰기
  if (orderAddresseeListRemoveInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      const closeButtonEl = e.target.closest(
        'el-order-addressee-list-content > ul button.remove'
      );

      if (closeButtonEl) {
        const targetEl = closeButtonEl.closest(
          'el-order-addressee-list-content > ul > li'
        );

        if (targetEl) {
          targetEl.remove();
        }
      }
    });

    // 초기화 완료 전환
    orderAddresseeListRemoveInitialized = true;
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initOrderAddresseeListRemove = initOrderAddresseeListRemove;
}

initOrderAddresseeListRemove();
// 종료: 주문결제 > 수신자 목록 remove 처리

// 시작: 주문결제 > 이미지 추가 > 나의 이미지 - remove 처리
let orderMyImageRemoveInitialized = false;
const initOrderMyImageRemove = () => {
  // 이미 초기화된 경우 건너뛰기
  if (orderMyImageRemoveInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      const closeButtonEl = e.target.closest(
        'el-order-add-image-box-content el-add-image-item-preview button.remove-item'
      );

      if (closeButtonEl) {
        const targetEl = closeButtonEl.closest(
          'el-order-add-image-box-content > el-box-content-inner > ul > li'
        );
        if (targetEl) {
          targetEl.remove();
        }
      }
    });

    // 초기화 완료 전환
    orderMyImageRemoveInitialized = true;
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initOrderMyImageRemove = initOrderMyImageRemove;
}

initOrderMyImageRemove();
// 종료: 주문결제 > 이미지 추가 > 나의 이미지 - remove 처리

// 시작: el-representative-brand-swiper
const initRepresentativeBrandSwiper = () => {
  const representativeBrandSwiperEl = document.querySelector(
    'el-representative-brand-swiper swiper-container'
  );
  const representativeBrandSlideEls = document.querySelectorAll(
    'el-representative-brand-swiper swiper-slide'
  );
  const representativeBrandSwiperPrevEl = document.querySelector(
    'el-representative-brand-swiper .nav-button.prev'
  );
  const representativeBrandSwiperNextEl = document.querySelector(
    'el-representative-brand-swiper .nav-button.next'
  );

  // 이미 초기화된 경우 건너뛰기
  if (representativeBrandSwiperEl?.dataset?.initialized === 'true') {
    return;
  }

  const handleVideoPlay = (slideEls) => {
    [...slideEls].forEach((slide) => {
      if (slide.classList.contains('swiper-slide-visible')) {
        const videoEl = slide.querySelector('el-representative-brand-bg video');

        if (videoEl && !videoEl.classList.contains('video-played')) {
          videoEl.play();
          videoEl.classList.add('video-played');
        }
      }
    });
  };

  const representativeBrandSwiperParams = {
    slidesPerGroup: 4,
    slidesPerView: 4,
    spaceBetween: 14,
    watchSlidesProgress: true,
    navigation: {
      nextEl: representativeBrandSwiperNextEl,
      prevEl: representativeBrandSwiperPrevEl,
    },
  };

  if (representativeBrandSwiperEl && representativeBrandSwiperParams) {
    Object.assign(representativeBrandSwiperEl, representativeBrandSwiperParams);
    representativeBrandSwiperEl.initialize();
    representativeBrandSwiperInstance =
      representativeBrandSwiperEl?.swiper || null;
  }

  if (representativeBrandSwiperInstance) {
    // 스와이퍼 update 완료 시
    representativeBrandSwiperInstance.on('update', () => {
      handleVideoPlay(representativeBrandSlideEls);
    });

    // 슬라이드 변경 시
    representativeBrandSwiperInstance.on('slideChangeTransitionEnd', () => {
      handleVideoPlay(representativeBrandSlideEls);
    });

    // 초기화 완료 전환
    representativeBrandSwiperEl.dataset.initialized = 'true';

    representativeBrandSwiperInstance.update();
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initRepresentativeBrandSwiper = initRepresentativeBrandSwiper;
}

initRepresentativeBrandSwiper();
// 종료: el-representative-brand-swiper

// 시작: 브랜드 > 브랜드 검색 > 탭 처리
let brandSearchTabInitialized = false;
const initBrandSearchTab = () => {
  // 이미 초기화된 경우 건너뛰기
  if (brandSearchTabInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      const closeButtonEl = e.target.closest(
        'el-brand-search-bar el-brand-search-tabs button'
      );

      if (closeButtonEl) {
        if (!closeButtonEl.classList.contains('active')) {
          const parentEl = closeButtonEl.closest(
            'el-brand-search-bar el-brand-search-tabs'
          );

          if (parentEl) {
            [...parentEl.querySelectorAll('button')].forEach((button) => {
              if (button.classList.contains('active')) {
                button.classList.remove('active');
              }
            });
          }
          closeButtonEl.classList.add('active');
        }
      }
    });

    // 초기화 완료 전환
    orderMyImageRemoveInitialized = true;
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initBrandSearchTab = initBrandSearchTab;
}

initBrandSearchTab();
// 종료: 브랜드 > 브랜드 검색 > 탭 처리

// 시작: FAQ > 탭 처리
let faqTabInitialized = false;
const initFaqTab = () => {
  // 이미 초기화된 경우 건너뛰기
  if (faqTabInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      const closeButtonEl = e.target.closest('el-faq-tabs button');

      if (closeButtonEl) {
        if (!closeButtonEl.classList.contains('active')) {
          const parentEl = closeButtonEl.closest('el-faq-tabs');

          if (parentEl) {
            [...parentEl.querySelectorAll('button')].forEach((button) => {
              if (button.classList.contains('active')) {
                button.classList.remove('active');
              }
            });
          }
          closeButtonEl.classList.add('active');
        }
      }
    });

    // 초기화 완료 전환
    faqTabInitialized = true;
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initFaqTab = initFaqTab;
}

initFaqTab();
// 종료: FAQ > 탭 처리

// 시작: 공통 > custom select
let customSelectInitialized = false;
const initCustomSelect = () => {
  // 이미 초기화된 경우 건너뛰기
  if (customSelectInitialized) {
    return;
  }

  if (document?.body) {
    document.body.addEventListener('click', (e) => {
      const targetOptionEl = e.target.closest(
        'el-select.dropdown .dropdown-menu li button.dropdown-item'
      );

      // 셀렉트 옵션 클릭 시
      if (targetOptionEl) {
        const targetSelectEl = targetOptionEl.closest('el-select.dropdown');
        const targetInputEl = targetSelectEl.querySelector(
          'input[type="hidden"]'
        );
        const selectedLabelEl = targetSelectEl.querySelector(
          'button.dropdown-toggle el-label'
        );
        const targetLabelEl = targetOptionEl.querySelector('el-label');
        const targetValue = targetOptionEl.dataset.value || '';
        const optionEls = targetSelectEl.querySelectorAll(
          '.dropdown-menu li button.dropdown-item'
        );

        if (
          targetSelectEl &&
          targetInputEl &&
          selectedLabelEl &&
          targetLabelEl
        ) {
          selectedLabelEl.innerHTML = targetLabelEl.innerHTML;
          targetInputEl.value = targetValue;

          [...optionEls].forEach((optionEl) => {
            optionEl.classList.remove('active');
          });

          targetOptionEl.classList.add('active');
        }
      }
    });

    // 초기화 완료 전환
    customSelectInitialized = true;
  }
};

// 전역 함수로 등록
if (window !== undefined) {
  window.initCustomSelect = initCustomSelect;
}

initCustomSelect();
// 종료: 공통 > custom select
