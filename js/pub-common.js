// [시작] 공통 변수
const styleHtmlEl = document.querySelector('html');
const styleBodyEl = document.querySelector('body');
// [종료] 공통 변수

// [시작] alert
const styleAlertEl = document.getElementById('style-alert');
const styleAlert2El = document.getElementById('style-alert2');
const styleAlert = styleAlertEl ? new bootstrap.Modal('#style-alert') : null;
const styleAlert2 = styleAlert2El ? new bootstrap.Modal('#style-alert2') : null;
// [DEV] 얼럿창 호출 함수: styleAlert.show();
// [종료] alert

// [시작] toastPopup
const toastPopup = document.getElementById('toastPopup');
let toastBootstrap = null;

if (bootstrap && toastPopup) {
  toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastPopup);
}

let toastPopupTimeout;
const showToastPopup = () => {
  if (toastPopupTimeout) {
    clearTimeout(toastPopupTimeout);
  }

  if (toastBootstrap) {
    toastBootstrap.show();
    toastPopupTimeout = setTimeout(() => {
      toastBootstrap.hide();
    }, 3000);
  } else {
    console.error('bootstrap 인스턴스를 찾을 수 없습니다.');
  }
};
// [종료] toastPopup

// [시작] offcanvas 수동 닫기
let bsOffcanvas = null;
let bsOffcanvasNoRadius = null;
const bsOffcanvasEl = document.getElementById('offcanvasBottom');
const bsOffcanvasNoRadiusEl = document.getElementById(
  'offcanvasBottomNoRadius'
);

if (bootstrap && bsOffcanvasEl) {
  bsOffcanvas = new bootstrap.Offcanvas('#offcanvasBottom');
}
if (bootstrap && bsOffcanvasNoRadiusEl) {
  bsOffcanvasNoRadius = new bootstrap.Offcanvas('#offcanvasBottomNoRadius');
}

const hideOffcanvas = () => {
  if (bsOffcanvas) {
    bsOffcanvas.hide();
  } else if (bsOffcanvasNoRadius) {
    bsOffcanvasNoRadius.hide();
  } else {
    console.error('bootstrap 인스턴스를 찾을 수 없습니다.');
  }
};
// [종료] offcanvas 수동 닫기

// [시작] 더보기
const viewMoreButtonList = document.querySelectorAll('.style-button-moreView');
const expandViewMore = (e) => {
  e.target.parentNode.parentNode.classList.add('style-viewMore-expand');
};
if (viewMoreButtonList.length) {
  [...viewMoreButtonList].map((viewMoreButton) => {
    viewMoreButton.addEventListener('click', expandViewMore);
    return () => {};
  });
}
// [종료] 더보기

// [시작] imageUploader
const loaderModalEl = document.querySelector('#loaderModal');
const imageUploaderSwiperEl = document.querySelector('#imageUploaderSwiper');
const imageUploaderSwiperParams = {
  freeMode: true,
  spaceBetween: 8,
  slidesPerView: 'auto',
  slidesOffsetBefore: 16,
  slidesOffsetAfter: 16,
};

if (imageUploaderSwiperEl && imageUploaderSwiperParams) {
  Object.assign(imageUploaderSwiperEl, imageUploaderSwiperParams);
}
if (imageUploaderSwiperEl) {
  imageUploaderSwiperEl.initialize();
}
const imageUploaderSwiper = imageUploaderSwiperEl?.swiper || null;

// [DEV] swiper-slide의 삭제/추가 이벤트 발생 시, imageUploaderSwiper.update() 함수 실행

// [DEV] 이미지 업로드 api호출하여 응답 대기중 일 때, showLoaderModal() 함수 실행
const showLoaderModal = () => {
  if (loaderModalEl) {
    loaderModalEl.classList.add('show');
  }
};

// [DEV] 이미지 업로드 api호출하여 응답 완료 시, hideLoaderModal() 함수 실행
const hideLoaderModal = () => {
  if (loaderModalEl) {
    loaderModalEl.classList.remove('show');
  }
};
// [종료] imageUploader

// [시작] chips메뉴 스와이퍼
const chipsMenuSwiperEl = document.querySelector('#chipsMenuSwiper');
const chipsMenuSwiperParams = {
  freeMode: true,
  spaceBetween: 6,
  slidesPerView: 'auto',
  slidesOffsetBefore: 16,
  slidesOffsetAfter: 16,
};

if (chipsMenuSwiperEl && chipsMenuSwiperParams) {
  Object.assign(chipsMenuSwiperEl, chipsMenuSwiperParams);
}
if (chipsMenuSwiperEl) {
  chipsMenuSwiperEl.initialize();
}

const chipsMenuSwiper = chipsMenuSwiperEl?.swiper || null;

if (chipsMenuSwiper) {
  setTimeout(() => {
    chipsMenuSwiper.update();
  }, 800);
}

// [DEV] swiper-slide의 삭제/추가 이벤트 발생 시, chipsMenuSwiper.update() 함수 실행

// [종료] chips메뉴 스와이퍼

// [시작] 필터 메뉴
const filterMenuButtons = document.querySelectorAll(
  '.style-filterMenus .style-filterMenu-button'
);
const handleFilterMenuButtons = (targetEl) => {
  if (filterMenuButtons.length) {
    [...filterMenuButtons].map((button) => {
      button.classList.remove('style-filterMenu-button-active');
      return () => {};
    });
    if (targetEl) {
      targetEl.classList.add('style-filterMenu-button-active');
    }
  }
};

// offcanvas와 같이 사용 시 클릭한 slide가 자동으로 포커싱 되어 슬라이딩 되는 버그 fix
let chipsMenuTimeout;
const preventSwiperBug = (e) => {
  if (chipsMenuSwiperEl) {
    const chipsMenuBackdropEl = document.querySelector('.offcanvas-backdrop');
    if (chipsMenuTimeout) {
      chipsMenuSwiperEl.swiper.enable();
      clearTimeout(chipsMenuTimeout);
    }
    if (chipsMenuBackdropEl) {
      chipsMenuSwiperEl.swiper.disable();
      chipsMenuTimeout = setTimeout(() => {
        chipsMenuSwiperEl.swiper.enable();
        chipsMenuSwiperEl.swiper.update();
      }, 350);
    }
  }
};
if (chipsMenuSwiperEl && styleHtmlEl) {
  styleHtmlEl.addEventListener('click', preventSwiperBug);
} else {
  styleHtmlEl.removeEventListener('click', preventSwiperBug);
}
// [종료] 필터 메뉴

// [시작] tooltip
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
if (bootstrap && tooltipTriggerList.length) {
  [...tooltipTriggerList].map(
    (tooltipTriggerEl) =>
      new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: 'click',
        fallbackPlacements: ['bottom'],
      })
  );
}
// [종료] tooltip

// [시작] 선생님 상세 > 헤더 스크롤
const masterDetailHeaderObserver = document.querySelector(
  '#style-detail-observer'
);
const masterDetailHeaderEl = document.querySelector('.style-layout-header');
const masterDetailCallback = (entries) => {
  if (masterDetailHeaderEl) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        masterDetailHeaderEl.classList.add('style-layout-header-transparent');
      } else {
        masterDetailHeaderEl.classList.remove(
          'style-layout-header-transparent'
        );
      }
    });
  }
};
if (masterDetailHeaderObserver) {
  const masterDetailObserver = new IntersectionObserver(masterDetailCallback);
  masterDetailObserver.observe(masterDetailHeaderObserver);
}
// [종료] 선생님 상세 > 헤더 스크롤

// [시작] 강제업데이트 alert
const styleUpdateAlertEl = document.getElementById('style-alert-update');
const styleUpdateAlert = styleUpdateAlertEl
  ? new bootstrap.Modal('#style-alert-update')
  : null;
const showStyleUpdateAlert = () => {
  if (styleUpdateAlertEl) {
    styleUpdateAlert.show();
    setTimeout(() => {
      styleUpdateAlert.show();
    }, 1000);
    setTimeout(() => {
      styleUpdateAlert.show();
    }, 2000);
  } else {
    console.error('강제업데이트 alert 엘리먼트가 없습니다');
  }
};

// [종료] 강제업데이트 alert

// [시작] 알림 설정/해제 모달 메뉴
const styleNotiListButtons = document.querySelectorAll(
  '#styleNotiList .style-notiMenu-button'
);
const handleNotiListButtons = (targetEl) => {
  if (styleNotiListButtons.length) {
    [...styleNotiListButtons].map((button) => {
      button.classList.remove('style-notiMenu-button-active');
      return () => {};
    });
    if (targetEl) {
      targetEl.classList.add('style-notiMenu-button-active');
    }
  }
};
// [종료] 알림 설정/해제 모달 메뉴

// [시작] 약력 더 보기
const detailProfileContentWrap =
  document.querySelector('.style-detail-summary-profile') || null;
const detailProfileContentItems =
  document.querySelectorAll('.style-detail-summary-profile ul li') || null;

if (detailProfileContentWrap && detailProfileContentItems.length > 3) {
  const handleProfileContent = () => {
    detailProfileContentWrap.classList.toggle('collapsed');
    detailProfileContentWrap.classList.toggle('expanded');
  };

  detailProfileContentWrap.classList.add('collapsed');

  // 3번째 li에 expand 버튼 추가
  detailProfileContentItems[2].insertAdjacentHTML(
    'beforeend',
    `<button class="style-button-removeStyle style-detail-summaryMoreExpand">
        <svg
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5498 5.8125L8.57125 11.8339C8.76651 12.0292 9.0831 12.0292 9.27836 11.8339L15.2998 5.8125"
            stroke="#4D5159"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>`
  );

  // expand 버튼에 클릭 이벤트 바인딩
  const detailProfileContentMoreExpand =
    document.querySelector('.style-detail-summaryMoreExpand') || null;
  if (detailProfileContentMoreExpand) {
    detailProfileContentMoreExpand.addEventListener(
      'click',
      handleProfileContent
    );
  }

  // 마지막 li에 collapse 버튼 추가
  detailProfileContentItems[
    detailProfileContentItems.length - 1
  ].insertAdjacentHTML(
    'beforeend',
    `<button class="style-button-removeStyle style-detail-summaryMoreCollapse">
        <svg
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5498 5.8125L8.57125 11.8339C8.76651 12.0292 9.0831 12.0292 9.27836 11.8339L15.2998 5.8125"
            stroke="#4D5159"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>`
  );

  // collapse 버튼에 클릭 이벤트 바인딩
  const detailProfileContentMoreCollapse =
    document.querySelector('.style-detail-summaryMoreCollapse') || null;
  if (detailProfileContentMoreCollapse) {
    detailProfileContentMoreCollapse.addEventListener(
      'click',
      handleProfileContent
    );
  }
}
// [종료] 약력 더 보기

// [시작] 소식 > 사진 스와이퍼
const initReviewItemPhotoSwiper = () => {
  const reviewItemPhotoSwiperElList = document.querySelectorAll(
    '.reviewItemPhotoSwiper'
  );

  [...reviewItemPhotoSwiperElList].map((reviewItemPhotoSwiperEl) => {
    const reviewItemPhotoSwiperParams = {
      loop: true,
      pagination: {
        type: 'fraction',
      },
    };

    if (reviewItemPhotoSwiperEl) {
      Object.assign(reviewItemPhotoSwiperEl, reviewItemPhotoSwiperParams);
      reviewItemPhotoSwiperEl.initialize();
    }
  });
};
initReviewItemPhotoSwiper();
// [종료] 소식 > 사진 스와이퍼

window.addEventListener('load', () => {
  // [시작] 선생님 상세 > 소식 - floating button 스크롤
  const newsFloatingButton =
    document.querySelector('.style-addNews-button') || null;
  const newsFloatingButtonObserver =
    document.querySelector('#style-floatButton-observer') || null;
  let handleNewsFloatingButton = () => {};

  if (newsFloatingButton && newsFloatingButtonObserver) {
    const headerHeightForNewsFloating = 45;
    const tabsHeightForNewsFloating = 41;
    const newsFloatingThreashold =
      window.pageYOffset +
      newsFloatingButtonObserver.getBoundingClientRect().top -
      headerHeightForNewsFloating -
      tabsHeightForNewsFloating;

    handleNewsFloatingButton = () => {
      if (window.scrollY > newsFloatingThreashold + 6) {
        newsFloatingButton.classList.add('style-addNews-button-collapsed');
      } else {
        newsFloatingButton.classList.remove('style-addNews-button-collapsed');
      }
    };

    if (window.scrollY > newsFloatingThreashold + 6) {
      newsFloatingButton.classList.add('style-addNews-button-collapsed');
    } else {
      newsFloatingButton.classList.remove('style-addNews-button-collapsed');
    }

    window.addEventListener('scroll', handleNewsFloatingButton);
  } else {
    window.removeEventListener('scroll', handleNewsFloatingButton);
  }
  // [종료] 선생님 상세 > 소식 - floating button 스크롤
});
