const loadScript = (target, scriptName) => {
  if (window[scriptName]) {
    window[scriptName]();
  } else {
    // pub-common.js가 로드되지 않았다면 동적 로드
    target.loadScriptDynamically();
  }
};

const loadDynamically = (target, scriptName) => {
  try {
    // 이미 로드 중인지 확인
    if (target.scriptLoading) return;
    target.scriptLoading = true;

    // 외부 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = './js/pub-common.js';
    script.onload = () => {
      // 로드 완료 후 실행
      if (window[scriptName]) {
        window[scriptName]();
      }
    };
    script.onerror = () => {
      console.error('pub-common.js 로드 실패');
      target[scriptName](); // 폴백
    };
    document.head.appendChild(script);
  } catch (error) {
    console.error('외부 스크립트 로드 실패:', error);
    target[scriptName](); // 폴백
  }
};
// 종료: 공통

// 시작: 상단 띠배너
class ComponentTopBanner extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
    loadScript(this, 'initTopBanner');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
    loadDynamically(this, 'initTopBanner');
  }

  render() {
    this.innerHTML = `
      <!-- [DEV] 상단 띠배너 숨김 className: 'hide' -->
      <el-top-banner>
        <!-- [DEV] 상단 띠배너 컬러 커스텀 -->
        <style>
          el-top-banner {
            background-color: rgba(0, 70, 196, 1); /* bg */
            el-icon {
              background-color: #ffffff; /* 닫기 버튼 */
            }
          }
        </style>
        <el-top-banner-content>
          <a href="#">
            <img
              src="./images/temp/top-banner.png"
              alt="한번 더! 다이아몬드 이벤트"
            />
          </a>
          <button type="button">
            <el-icon class="h20-closed">닫기</el-icon>
          </button>
        </el-top-banner-content>
      </el-top-banner>
    `;
  }
}
customElements.define('component-top-banner', ComponentTopBanner);
// 종료: 상단 띠배너

// 시작: el-header-top
class ComponentHeaderTop extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <el-header-top class="typo-label-lg">
        <el-header-top-left>
          <ul class="menu">
            <li>
              <a href="#">대량발송 양식 다운로드</a>
            </li>
            <li>
              <a href="#">판매상품 다운로드</a>
            </li>
            <li>
              <a href="#">오피스콘 특장점</a>
            </li>
          </ul>
        </el-header-top-left>
        <el-header-top-right>
          <ul class="menu">
            <li>
              <a href="#">로그인</a>
            </li>
            <li>
              <a href="#">회원가입</a>
            </li>
            <li>
              <a href="#">로그아웃</a>
            </li>
            <li>
              <el-dropdown-menu class="dropdown-center">
                <button
                  type="button"
                  class="typo-label-lg"
                  data-bs-toggle="dropdown"
                  data-bs-offset="-8,10"
                >
                  고객센터
                  <el-icon class="h16-arrow-down natural-40"></el-icon>
                </button>
                <el-layer-dropdown
                  class="dropdown-menu small"
                >
                  <ul class="typo-label-lg typo-weight-em">
                    <li>
                      <a href="#">공지사항</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                    <li>
                      <a href="#">1:1문의</a>
                    </li>
                  </ul>
                </el-layer-dropdown>
              </el-dropdown-menu>
            </li>
          </ul>
        </el-header-top-right>
      </el-header-top>
    `;
  }
}
customElements.define('component-header-top', ComponentHeaderTop);
// 종료: el-header-top

// 시작: el-header-sticky
class ComponentHeaderSticky extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
    loadScript(this, 'initHeaderSticky');
    loadScript(this, 'initSearchLayer');
    loadScript(this, 'initThemeSwitch');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
    loadDynamically(this, 'initHeaderSticky');
    loadDynamically(this, 'initHeaderSticky');
    loadDynamically(this, 'initSearchLayer');
    loadDynamically(this, 'initThemeSwitch');
  }

  render() {
    this.innerHTML = `
      <el-header-sticky>
        <el-header-content>
          <el-header-content-left>
            <el-logo>
              <a href="#">
                <img src="./images/logo.svg" alt="오피스콘" />
                <el-logo-text>
                  <div>
                    <img
                      src="./images/logo-text-2.svg"
                      alt="이용자수 4년 연속 1위"
                    />
                  </div>
                  <div>
                    <img src="./images/logo-text-1.svg" alt="OFFICECON" />
                  </div>
                </el-logo-text>
              </a>
            </el-logo>
            <el-center>
              <el-search-area>
                <!-- 시작: [DEV] 검색레이어 토글을 위한 숨김 버튼 -->
                <button
                  type="button"
                  id="searchLayerToggleButton"
                  data-bs-toggle="dropdown"
                  data-bs-offset="0,-17"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                </button>
                <!-- 종료: [DEV] 검색레이어 토글을 위한 숨김 버튼 -->
                <el-search-layer class="dropdown-menu">
                  <el-search>
                    <input
                      class="form-control typo-body-lg typo-weight-bold"
                      type="text"
                      name="search"
                      placeholder="기업회원에게만 신세계 백화점 상품권 최대 10%할인"
                      maxlength="30"
                    />
                    <button type="button" aria-label="검색">
                      <el-icon class="h32-search natural-0"></el-icon>
                    </button>
                  </el-search>
                  <el-search-addon>
                    <el-addon-content class="typo-label-lg">
                      <el-recent>
                        <el-addon-title>
                          최근 검색어
                          <button type="button" class="typo-label-md">
                            전체삭제
                          </button>
                        </el-addon-title>
                        <!-- [DEV] >최근 검색어가 없을 경우 노출
                          <el-empty>최근 검색어가 없습니다.</el-empty>
                        -->
                        <ul class="recent-list">
                          <li>
                            <a href="#">스타벅스</a>
                            <button type="button" aria-label="삭제">
                              <el-icon class="h16-closed natural-0"></el-icon>
                            </button>
                          </li>
                          <li>
                            <a href="#">
                              배달의민족 요기요 쿠팡이츠 배달의민족 요기요
                              쿠팡이츠
                            </a>
                            <button type="button" aria-label="삭제">
                              <el-icon class="h16-closed natural-0"></el-icon>
                            </button>
                          </li>
                          <li>
                            <a href="#">스타벅스</a>
                            <button type="button" aria-label="삭제">
                              <el-icon class="h16-closed natural-0"></el-icon>
                            </button>
                          </li>
                        </ul>
                      </el-recent>
                      <el-popular>
                        <el-addon-title>인기 검색어</el-addon-title>
                        <!-- [DEV] 인기 검색어가 없을 경우 노출
                          <el-empty>인기 검색어가 없습니다.</el-empty>
                        -->
                        <ul class="popular-list">
                          <li>
                            <el-rank>1</el-rank>
                            <a href="#">스타벅스</a>
                          </li>
                          <li>
                            <el-rank>2</el-rank>
                            <a href="#">
                              배달의민족 요기요 쿠팡이츠 배달의민족 요기요
                              쿠팡이츠
                            </a>
                          </li>
                          <li>
                            <el-rank>3</el-rank>
                            <a href="#">스타벅스</a>
                          </li>
                          <li>
                            <el-rank>4</el-rank>
                            <a href="#">스타벅스</a>
                          </li>
                          <li>
                            <el-rank>5</el-rank>
                            <a href="#">스타벅스</a>
                          </li>
                          <li>
                            <el-rank>6</el-rank>
                            <a href="#">스타벅스</a>
                          </li>
                          <li>
                            <el-rank>7</el-rank>
                            <a href="#">스타벅스</a>
                          </li>
                          <li>
                            <el-rank>8</el-rank>
                            <a href="#">스타벅스</a>
                          </li>
                          <li>
                            <el-rank>9</el-rank>
                            <a href="#">스타벅스</a>
                          </li>
                          <li>
                            <el-rank>10</el-rank>
                            <a href="#">스타벅스</a>
                          </li>
                        </ul>
                      </el-popular>
                    </el-addon-content>
                    <el-addon-close>
                      <button type="button" class="typo-label-lg">
                        닫기
                      </button>
                    </el-addon-close>
                  </el-search-addon>
                </el-search-layer>
              </el-search-area>
              <el-theme-switch class="typo-body-sm">
                <el-theme-switch-buttons>
                  <input
                    type="radio"
                    id="theme-company-member"
                    name="theme-switch"
                    checked
                  />
                  <label for="theme-company-member">기업</label>
                  <input
                    type="radio"
                    id="theme-personal-member"
                    name="theme-switch"
                  />
                  <label for="theme-personal-member">일반</label>
                </el-theme-switch-buttons>
              </el-theme-switch>
            </el-center>
          </el-header-content-left>
          <el-header-content-right class="typo-label-md">
            <a href="#">
              <el-icon class="h32-cart natural-30"></el-icon>
              <span>장바구니</span>
              <el-badge-count class="typo-label-md">
                99
                <el-more>+</el-more>
              </el-badge-count>
            </a>
            <a href="#">
              <el-icon class="h32-user natural-30"></el-icon>
              <span>마이페이지</span>
            </a>
          </el-header-content-right>
        </el-header-content>
      </el-header-sticky>
    `;
  }
}
customElements.define('component-header-sticky', ComponentHeaderSticky);
// 종료: el-header-sticky

// 시작: el-header-gnb
class ComponentHeaderGnb extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
    // loadScript(this, 'initCategoryTabs');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
    // loadDynamically(this, 'initCategoryTabs');
  }

  render() {
    this.innerHTML = `
      <el-header-gnb>
        <el-gnb-container>
          <nav>
            <ul class="typo-body-md">
              <li>
                <button
                  type="button"
                  class="typo-body-md"
                  data-bs-toggle="dropdown"
                  data-bs-offset="0,-34"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  <el-icon class="h20-menu natural-20"></el-icon>
                  <el-icon class="h20-closed-bold natural-0"></el-icon>
                  전체 카테고리
                </button>
                <el-category-layer class="dropdown-menu">
                  <el-category-tabs>
                    <ul class="typo-body-sm" role="tablist">
                      <li>
                        <a
                          href="#"
                          data-bs-toggle="tab"
                          data-bs-target="#el-category-tab-1"
                          class="active"
                        >
                          전체
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-bs-toggle="tab"
                          data-bs-target="#el-category-tab-2"
                        >
                          커피/음료
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-bs-toggle="tab"
                          data-bs-target="#el-category-tab-3"
                        >
                          베이커리/디저트
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-bs-toggle="tab"
                          data-bs-target="#el-category-tab-4"
                        >
                          아이스크림
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-bs-toggle="tab"
                          data-bs-target="#el-category-tab-5"
                        >
                          치킨/피자/버거
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-bs-toggle="tab"
                          data-bs-target="#el-category-tab-6"
                        >
                          외식
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-bs-toggle="tab"
                          data-bs-target="#el-category-tab-7"
                        >
                          배달이용권
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-bs-toggle="tab"
                          data-bs-target="#el-category-tab-8"
                        >
                          상품권/페이/주유
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-bs-toggle="tab"
                          data-bs-target="#el-category-tab-9"
                        >
                          금액권/통합권
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-bs-toggle="tab"
                          data-bs-target="#el-category-tab-10"
                        >
                          편의점/마트
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-bs-toggle="tab"
                          data-bs-target="#el-category-tab-11"
                        >
                          문화/생활/뷰티
                        </a>
                      </li>
                    </ul>
                  </el-category-tabs>
                  <el-category-tab-content class="tab-content typo-label-md">
                    <el-category-tab-panel
                      role="tabpanel"
                      id="el-category-tab-1"
                      class="tab-pane active"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>일이삼사오육칠팔구십</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250430/20250430110647_2318f45e-fe88-4773-8c53-1f62968291b8.jpg"
                                  alt="컴포즈커피"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250430/20250430110647_2318f45e-fe88-4773-8c53-1f62968291b8.jpg"
                                  alt="컴포즈커피"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250430/20250430110647_2318f45e-fe88-4773-8c53-1f62968291b8.jpg"
                                  alt="컴포즈커피"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250430/20250430110647_2318f45e-fe88-4773-8c53-1f62968291b8.jpg"
                                  alt="컴포즈커피"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250430/20250430110647_2318f45e-fe88-4773-8c53-1f62968291b8.jpg"
                                  alt="컴포즈커피"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>컴포즈커피</el-label>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>투썸플레이스</el-label>
                          </a>
                        </li>
                      </ul>
                    </el-category-tab-panel>
                    <el-category-tab-panel
                      role="tabpanel"
                      id="el-category-tab-2"
                      class="tab-pane"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>커피/음료</el-label>
                          </a>
                        </li>
                      </ul>
                    </el-category-tab-panel>
                    <el-category-tab-panel
                      role="tabpanel"
                      id="el-category-tab-3"
                      class="tab-pane"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>베이커리/디저트</el-label>
                          </a>
                        </li>
                      </ul>
                    </el-category-tab-panel>
                    <el-category-tab-panel
                      role="tabpanel"
                      id="el-category-tab-4"
                      class="tab-pane"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>아이스크림</el-label>
                          </a>
                        </li>
                      </ul>
                    </el-category-tab-panel>
                    <el-category-tab-panel
                      role="tabpanel"
                      id="el-category-tab-5"
                      class="tab-pane"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>치킨/피자/버거</el-label>
                          </a>
                        </li>
                      </ul>
                    </el-category-tab-panel>
                    <el-category-tab-panel
                      role="tabpanel"
                      id="el-category-tab-6"
                      class="tab-pane"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>외식</el-label>
                          </a>
                        </li>
                      </ul>
                    </el-category-tab-panel>
                    <el-category-tab-panel
                      role="tabpanel"
                      id="el-category-tab-7"
                      class="tab-pane"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>배달이용권</el-label>
                          </a>
                        </li>
                      </ul>
                    </el-category-tab-panel>
                    <el-category-tab-panel
                      role="tabpanel"
                      id="el-category-tab-8"
                      class="tab-pane"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>상품권/페이/주유</el-label>
                          </a>
                        </li>
                      </ul>
                    </el-category-tab-panel>
                    <el-category-tab-panel
                      role="tabpanel"
                      id="el-category-tab-9"
                      class="tab-pane"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>금액권/통합권</el-label>
                          </a>
                        </li>
                      </ul>
                    </el-category-tab-panel>
                    <el-category-tab-panel
                      role="tabpanel"
                      id="el-category-tab-10"
                      class="tab-pane"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>편의점/마트</el-label>
                          </a>
                        </li>
                      </ul>
                    </el-category-tab-panel>
                    <el-category-tab-panel
                      role="tabpanel"
                      id="el-category-tab-11"
                      class="tab-pane"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <el-thumbnail>
                              <el-thumbnail-img>
                                <img
                                  src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/brand/20250429/20250429172439_0971764f-bf5e-4981-b466-87595277d8dc.jpg"
                                  alt="투썸플레이스"
                                />
                              </el-thumbnail-img>
                            </el-thumbnail>
                            <el-label>커문화/생활/뷰티</el-label>
                          </a>
                        </li>
                      </ul>
                    </el-category-tab-panel>
                  </el-category-tab-content>
                </el-category-layer>
              </li>
              <li>
                <a href="#">브랜드</a>
              </li>
              <li>
                <a href="#">이벤트</a>
              </li>
              <li>
                <a href="#">리워드관</a>
              </li>
              <li>
                <el-badge-bubble-blue class="typo-label-lg">
                  <el-badge-transition>
                    <span>오피스콘</span>
                    <span>API도</span>
                  </el-badge-transition>
                </el-badge-bubble-blue>
                <a href="#">파트너링크</a>
              </li>
              <li class="dropdown-center">
                <button
                  type="button"
                  class="typo-body-md"
                  data-bs-toggle="dropdown"
                  data-bs-offset="-8,10"
                >
                  서비스 소개
                  <el-icon class="h16-arrow-down natural-40"></el-icon>
                </button>
                <el-layer-dropdown class="dropdown-menu">
                  <ul class="typo-body-sm typo-weight-em">
                    <li>
                      <a href="#">오피스콘 특장점</a>
                    </li>
                    <li>
                      <a href="#">회원등급</a>
                    </li>
                    <li>
                      <a href="#">리워드 혜택</a>
                    </li>
                    <li>
                      <a href="#">발송방법안내</a>
                    </li>
                  </ul>
                </el-layer-dropdown>
              </li>
              <li class="dropdown-center">
                <button
                  type="button"
                  class="typo-body-md"
                  data-bs-toggle="dropdown"
                  data-bs-offset="-8,10"
                >
                  오피스콘 플러스
                  <el-icon class="h16-arrow-down natural-40"></el-icon>
                </button>
                <el-layer-dropdown class="dropdown-menu">
                  <ul class="typo-body-sm typo-weight-em">
                    <li>
                      <a href="#">상품 Pick 발송</a>
                    </li>
                    <li>
                      <a href="#">문자서비스</a>
                    </li>
                    <li>
                      <a href="#">설문등록</a>
                    </li>
                  </ul>
                </el-layer-dropdown>
              </li>
            </ul>
          </nav>

          <el-filter-search>
            <button
              type="button"
              class="typo-label-lg toggle-button"
              data-bs-toggle="dropdown"
              data-bs-offset="0,10"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <span>금액ㆍ예산ㆍ테마별 상품 검색</span>
              <el-icon class="h16-arrow-down purple-30"></el-icon>
            </button>
            <el-filter-search-layer class="dropdown-menu">
              <ul class="typo-body-sm tab-list" role="tablist">
                <li>
                  <button
                    type="button"
                    data-bs-toggle="tab"
                    data-bs-target="#el-filter-search-tab-1"
                    class="active"
                  >
                    금액별
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    data-bs-toggle="tab"
                    data-bs-target="#el-filter-search-tab-2"
                  >
                    예산별
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    data-bs-toggle="tab"
                    data-bs-target="#el-filter-search-tab-3"
                  >
                    테마별
                  </button>
                </li>
              </ul>

              <el-filter-search-tab-content class="tab-content typo-label-lg">
                <el-filter-search-tab-panel
                  id="el-filter-search-tab-1"
                  class="tab-pane active"
                >
                  <el-price-select>
                    <el-checkbox class="form-check">
                      <input
                        type="checkbox"
                        id="priceSelect1"
                        class="form-check-input custom-checkbox"
                        value=""
                        checked
                      />
                      <label
                        class="form-check-label typo-body-sm"
                        for="priceSelect1"
                      >
                        3천원 이하
                      </label>
                    </el-checkbox>
                    <el-checkbox class="form-check">
                      <input
                        type="checkbox"
                        id="priceSelect2"
                        class="form-check-input custom-checkbox"
                        value=""
                      />
                      <label
                        class="form-check-label typo-body-sm"
                        for="priceSelect2"
                      >
                        3~5천원
                      </label>
                    </el-checkbox>
                    <el-checkbox class="form-check">
                      <input
                        type="checkbox"
                        id="priceSelect3"
                        class="form-check-input custom-checkbox"
                        value=""
                      />
                      <label
                        class="form-check-label typo-body-sm"
                        for="priceSelect3"
                      >
                        5천~1만원
                      </label>
                    </el-checkbox>
                    <el-checkbox class="form-check">
                      <input
                        type="checkbox"
                        id="priceSelect4"
                        class="form-check-input custom-checkbox"
                        value=""
                      />
                      <label
                        class="form-check-label typo-body-sm"
                        for="priceSelect4"
                      >
                        1~3만원
                      </label>
                    </el-checkbox>
                    <el-checkbox class="form-check">
                      <input
                        type="checkbox"
                        id="priceSelect5"
                        class="form-check-input custom-checkbox"
                        value=""
                      />
                      <label
                        class="form-check-label typo-body-sm"
                        for="priceSelect5"
                      >
                        3만원 이상
                      </label>
                    </el-checkbox>
                  </el-price-select>
                  <el-price-range>
                    <h3 class="title typo-label-lg">직접입력</h3>
                    <el-price-range-inputs>
                      <el-input>
                        <input
                          class="form-control custom-input"
                          type="number"
                          placeholder="최소가"
                        />
                      </el-input>
                      ~
                      <el-input>
                        <input
                          class="form-control custom-input"
                          type="number"
                          placeholder="최대가"
                        />
                      </el-input>
                    </el-price-range-inputs>
                  </el-price-range>
                  <button type="button" class="cta-button typo-label-lg">
                    상품 검색
                  </button>
                </el-filter-search-tab-panel>

                <el-filter-search-tab-panel
                  id="el-filter-search-tab-2"
                  class="tab-pane"
                >
                  <el-budget-inputs>
                    <el-item>
                      <h3 class="title typo-label-lg">총예산</h3>
                      <el-input>
                        <input
                          class="form-control custom-input"
                          type="text"
                          placeholder="예산"
                        />
                      </el-input>
                    </el-item>
                    <el-item>
                      <h3 class="title typo-label-lg">인원수</h3>
                      <el-input>
                        <input
                          class="form-control custom-input"
                          type="text"
                          placeholder="인원"
                        />
                      </el-input>
                    </el-item>
                  </el-budget-inputs>
                  <dl class="calculator typo-label-lg">
                    <dt>예상단가</dt>
                    <dd>0</dd>
                  </dl>
                  <button type="button" class="cta-button typo-label-lg">
                    상품 검색
                  </button>
                </el-filter-search-tab-panel>

                <el-filter-search-tab-panel
                  id="el-filter-search-tab-3"
                  class="tab-pane"
                >
                  <el-themes class="typo-label-md">
                    <a href="#">
                      <el-image>
                        <img
                          src="./images/theme-present.png"
                          alt="이벤트보상"
                        />
                      </el-image>
                      <el-lable>이벤트보상</el-lable>
                    </a>
                    <a href="#">
                      <el-image>
                        <img src="./images/theme-prize.png" alt="성과보상" />
                      </el-image>
                      <el-lable>성과보상</el-lable>
                    </a>
                    <a href="#">
                      <el-image>
                        <img
                          src="./images/theme-cake.png"
                          alt="기념일 축하"
                        />
                      </el-image>
                      <el-lable>기념일 축하</el-lable>
                    </a>
                    <a href="#">
                      <el-image>
                        <img src="./images/theme-pocket.png" alt="명절선물" />
                      </el-image>
                      <el-lable>명절선물</el-lable>
                    </a>
                  </el-themes>
                </el-filter-search-tab-panel>
              </el-filter-search-tab-content>
            </el-filter-search-layer>
          </el-filter-search>
        </el-gnb-container>
      </el-header-gnb>
    `;
  }
}
customElements.define('component-header-gnb', ComponentHeaderGnb);
// 종료: el-header-gnb

// 시작: el-footer
class ComponentFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <el-footer>
        <footer class="typo-body-sm">
          <address>
            <el-footer-logo>
              <img src="./images/logo-footer.svg" alt="오피스콘" />
            </el-footer-logo>
            <el-address-content>
              <ul>
                <li>주식회사 즐거운</li>
                <li>대표자 임관웅</li>
                <li>사업자등록번호 104-86-33511</li>
                <li>통신판매업신고번호 제2013-서울강남-00994</li>
                <li>서울특별시 강남구 언주로 709, 7층(논현동, 송암빌딩)</li>
              </ul>
              <ul>
                <li>문의전화 1661-8197</li>
                <li>팩스 02-561-1270</li>
                <li>이메일 officecon@zlgoon.co.kr</li>
                <li>개인정보보호 책임자 강상순</li>
              </ul>
              <el-copyright>
                COPYRIGHT© 2020 OFFICECON. ALL Rights Reserved.
              </el-copyright>
            </el-address-content>
          </address>

          <el-footer-menu>
            <ul class="typo-weight-em">
              <li><a href="#" class="privacy-policy">개인정보처리방침</a></li>
              <li><a href="#">서비스 이용약관</a></li>
              <li><a href="#">전자금융거래 이용약관</a></li>
            </ul>
          </el-footer-menu>

          <el-footer-cert-list>
            <ul>
              <li>
                <button type="button">
                  <img
                    src="./images/footer-ISMSP.png"
                    alt="ISMS-P"
                    style="width: 64px; height: auto"
                  />
                  <el-label class="typo-label-sm">
                    <span>[인증범위] 쿠폰 판매 서비스 운영</span>
                    <span>[유효기간] 2025.06.18 ~ 2028.06.17</span>
                  </el-label>
                </button>
                <el-cert-layer>
                  <img
                    src="https://www.officecon.co.kr/images/cert/cert_isms.png"
                    alt="ISMS-P"
                  />
                </el-cert-layer>
              </li>
              <li>
                <button type="button">
                  <img
                    class="footer-korfin"
                    src="./images/footer-Korfin.png"
                    alt="Korfin"
                    style="width: 91px; height: auto"
                  />
                </button>
                <el-cert-layer>
                  <img
                    src="https://www.officecon.co.kr/images/cert/cert_great.jpg"
                    alt="Korfin"
                  />
                </el-cert-layer>
              </li>
              <li>
                <button type="button">
                  <img
                    src="./images/footer-Seoul.png"
                    alt="서울특별시"
                    style="width: 112px; height: auto"
                  />
                </button>
                <el-cert-layer>
                  <img
                    src="https://www.officecon.co.kr/images/cert/cert_venture.jpg"
                    alt="서울형 강소기업 확인서"
                  />
                </el-cert-layer>
              </li>
              <li>
                <button type="button">
                  <img
                    src="./images/footer-Innobiz.png"
                    alt="Innobiz"
                    style="width: 87px; height: auto"
                  />
                </button>
                <el-cert-layer>
                  <img
                    src="https://www.officecon.co.kr/images/cert/cert_technology.jpg"
                    alt="Innobiz"
                  />
                </el-cert-layer>
              </li>
            </ul>
          </el-footer-cert-list>
        </footer>
      </el-footer>
    `;
  }
}
customElements.define('component-footer', ComponentFooter);
// 종료: el-footer

// 시작: el-product-item (1)
class ComponentProductItem1 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <el-product-item>
        <a href="#">
          <el-item-thumbnail>
            <img
              class="thumbnail-image"
              src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/product/20250227/20250227145823_a5b9221d-437d-4b84-b0ac-fbc6f58edf4f.jpg"
              alt=""
            />
            <el-bg></el-bg>
            <el-badge-special>
              <img
                src="./images/badge-event.svg"
                alt="이벤트특가"
              />
            </el-badge-special>
            <el-badge-period class="typo-label-sm">
              30일
            </el-badge-period>
            <el-layer-action>
              <button
                type="button"
                aria-label="add to cart"
                onclick="event.preventDefault(); event.stopPropagation(); alert('add to cart')"
              >
                <el-icon class="h24-cart"></el-icon>
              </button>
              <button type="button" aria-label="buy now">
                <el-icon class="h24-card"></el-icon>
              </button>
            </el-layer-action>
          </el-item-thumbnail>

          <el-item-txt class="typo-body-sm">
            <el-item-name>
              <el-brand>스타벅스</el-brand>
              <el-item-name-txt>떠먹는 스트로베리</el-item-name-txt>
            </el-item-name>
            <el-item-price>
              <el-sale-price class="typo-body-sm">
                <strong class="typo-body-lg"
                  >999,999</strong
                >원
              </el-sale-price>
            </el-item-price>
          </el-item-txt>
        </a>
      </el-product-item>
    `;
  }
}
customElements.define('component-product-item-1', ComponentProductItem1);
// 종료: el-product-item (1)

// 시작: el-product-item (2)
class ComponentProductItem2 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <el-product-item>
        <a href="#">
          <el-item-thumbnail>
            <img
              class="thumbnail-image"
              src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/product/20250227/20250227145823_a5b9221d-437d-4b84-b0ac-fbc6f58edf4f.jpg"
              alt=""
            />
            <el-bg></el-bg>
            <el-badge-special>
              <img
                src="./images/badge-event.svg"
                alt="이벤트특가"
              />
              <img
                src="./images/badge-reward.svg"
                alt="리워드지급"
              />
            </el-badge-special>
            <el-badge-period class="typo-label-sm">
              30일
            </el-badge-period>
            <el-layer-action>
              <button
                type="button"
                aria-label="add to cart"
                onclick="event.preventDefault(); event.stopPropagation(); alert('add to cart')"
              >
                <el-icon class="h24-cart"></el-icon>
              </button>
              <button type="button" aria-label="buy now">
                <el-icon class="h24-card"></el-icon>
              </button>
            </el-layer-action>
            <el-layer-disabled class="typo-subtitle-lg">
              <el-txt>
                판매가능시간
                <br />
                9시 ~ 18시
              </el-txt>
              <el-addon class="typo-body-sm">
                공휴일/주말 제외
              </el-addon>
            </el-layer-disabled>
          </el-item-thumbnail>

          <el-item-txt class="typo-body-sm">
            <el-badge-gift-card>
              <img
                src="./images/badge-gift-card.svg"
                alt="상품권"
              />
            </el-badge-gift-card>
            <el-item-name>
              <el-brand>스타벅스</el-brand>
              <el-item-name-txt>
                떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R초콜릿
                떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R초콜릿
              </el-item-name-txt>
            </el-item-name>
            <el-item-price>
              <el-discount-rate class="typo-body-lg">
                20%
              </el-discount-rate>
              <el-sale-price class="typo-body-sm">
                <strong class="typo-body-lg"
                  >999,999</strong
                >원
              </el-sale-price>
              <el-retail-price class="typo-label-md">
                999,999원
              </el-retail-price>
            </el-item-price>
          </el-item-txt>
        </a>
      </el-product-item>
    `;
  }
}
customElements.define('component-product-item-2', ComponentProductItem2);
// 종료: el-product-item (2)

// 시작: el-product-item (3)
class ComponentProductItem3 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <el-product-item class="disabled">
        <a href="#">
          <el-item-thumbnail>
            <img
              class="thumbnail-image"
              src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/product/20250227/20250227145823_a5b9221d-437d-4b84-b0ac-fbc6f58edf4f.jpg"
              alt=""
            />
            <el-bg></el-bg>
            <el-badge-special>
              <img
                src="./images/badge-event.svg"
                alt="이벤트특가"
              />
              <img
                src="./images/badge-reward.svg"
                alt="리워드지급"
              />
            </el-badge-special>
            <el-badge-period class="typo-label-sm">
              30일
            </el-badge-period>
            <el-layer-action>
              <button
                type="button"
                aria-label="add to cart"
                onclick="event.preventDefault(); event.stopPropagation(); alert('add to cart')"
              >
                <el-icon class="h24-cart"></el-icon>
              </button>
              <button type="button" aria-label="buy now">
                <el-icon class="h24-card"></el-icon>
              </button>
            </el-layer-action>
            <el-layer-disabled class="typo-subtitle-lg">
              <el-txt> 일시품절 </el-txt>
            </el-layer-disabled>
          </el-item-thumbnail>

          <el-item-txt class="typo-body-sm">
            <el-badge-gift-card>
              <img
                src="./images/badge-gift-card.svg"
                alt="상품권"
              />
            </el-badge-gift-card>
            <el-item-name>
              <el-brand>스타벅스</el-brand>
              <el-item-name-txt>
                떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R초콜릿
                떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R초콜릿
              </el-item-name-txt>
            </el-item-name>
            <el-item-price>
              <el-discount-rate class="typo-body-lg">
                20%
              </el-discount-rate>
              <el-sale-price class="typo-body-sm">
                <strong class="typo-body-lg"
                  >999,999</strong
                >원
              </el-sale-price>
              <el-retail-price class="typo-label-md">
                999,999원
              </el-retail-price>
            </el-item-price>
          </el-item-txt>
        </a>
      </el-product-item>
    `;
  }
}
customElements.define('component-product-item-3', ComponentProductItem3);
// 종료: el-product-item (3)

// 시작: el-product-item (4)
class ComponentProductItem4 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <el-product-item class="disabled">
        <a href="#">
          <el-item-thumbnail>
            <img
              class="thumbnail-image"
              src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/product/20250227/20250227145823_a5b9221d-437d-4b84-b0ac-fbc6f58edf4f.jpg"
              alt=""
            />
            <el-bg></el-bg>
            <el-badge-special>
              <img
                src="./images/badge-event.svg"
                alt="이벤트특가"
              />
              <img
                src="./images/badge-reward.svg"
                alt="리워드지급"
              />
            </el-badge-special>
            <el-badge-period class="typo-label-sm">
              30일
            </el-badge-period>
            <el-layer-action>
              <button
                type="button"
                aria-label="add to cart"
                onclick="event.preventDefault(); event.stopPropagation(); alert('add to cart')"
              >
                <el-icon class="h24-cart"></el-icon>
              </button>
              <button type="button" aria-label="buy now">
                <el-icon class="h24-card"></el-icon>
              </button>
            </el-layer-action>
            <el-layer-disabled class="typo-subtitle-lg">
              <el-txt>
                판매가능시간
                <br />
                9시 ~ 18시
              </el-txt>
              <el-addon class="typo-body-sm">
                공휴일/주말 제외
              </el-addon>
            </el-layer-disabled>
          </el-item-thumbnail>

          <el-item-txt class="typo-body-sm">
            <el-badge-gift-card>
              <img
                src="./images/badge-gift-card.svg"
                alt="상품권"
              />
            </el-badge-gift-card>
            <el-item-name>
              <el-brand>스타벅스</el-brand>
              <el-item-name-txt>
                떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R초콜릿
                떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R초콜릿
              </el-item-name-txt>
            </el-item-name>
            <el-item-price>
              <el-discount-rate class="typo-body-lg">
                20%
              </el-discount-rate>
              <el-sale-price class="typo-body-sm">
                <strong class="typo-body-lg"
                  >999,999</strong
                >원
              </el-sale-price>
              <el-retail-price class="typo-label-md">
                999,999원
              </el-retail-price>
            </el-item-price>
          </el-item-txt>
        </a>
      </el-product-item>
    `;
  }
}
customElements.define('component-product-item-4', ComponentProductItem4);
// 종료: el-product-item (4)

// 시작: el-product-item-large (1)
class ComponentProductItemLarge1 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <el-product-item class="size-large">
        <a href="#">
          <el-item-thumbnail>
            <img
              class="thumbnail-image"
              src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/product/20250227/20250227145823_a5b9221d-437d-4b84-b0ac-fbc6f58edf4f.jpg"
              alt=""
            />
            <el-bg></el-bg>
            <el-badge-special>
              <img src="./images/badge-event.svg" alt="이벤트특가" />
            </el-badge-special>
            <el-badge-period class="typo-label-sm">
              30일
            </el-badge-period>
            <el-layer-action>
              <button
                type="button"
                aria-label="add to cart"
                onclick="event.preventDefault(); event.stopPropagation(); alert('add to cart')"
              >
                <el-icon class="h24-cart"></el-icon>
              </button>
              <button type="button" aria-label="buy now">
                <el-icon class="h24-card"></el-icon>
              </button>
            </el-layer-action>
          </el-item-thumbnail>

          <el-item-txt class="typo-body-sm">
            <el-item-name>
              <el-brand>스타벅스</el-brand>
              <el-item-name-txt>떠먹는 스트로베리</el-item-name-txt>
            </el-item-name>
            <el-item-price>
              <el-sale-price class="typo-body-sm">
                <strong class="typo-body-lg">999,999</strong>원
              </el-sale-price>
            </el-item-price>
          </el-item-txt>
        </a>
      </el-product-item>
    `;
  }
}
customElements.define(
  'component-product-item-large-1',
  ComponentProductItemLarge1
);
// 종료: el-product-item-large (1)

// 시작: el-product-item-large (2)
class ComponentProductItemLarge2 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <el-product-item class="size-large">
        <a href="#">
          <el-item-thumbnail>
            <img
              class="thumbnail-image"
              src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/product/20250227/20250227145823_a5b9221d-437d-4b84-b0ac-fbc6f58edf4f.jpg"
              alt=""
            />
            <el-bg></el-bg>
            <el-badge-special>
              <img src="./images/badge-event.svg" alt="이벤트특가" />
              <img src="./images/badge-reward.svg" alt="리워드지급" />
            </el-badge-special>
            <el-badge-period class="typo-label-sm">
              30일
            </el-badge-period>
            <el-layer-action>
              <button
                type="button"
                aria-label="add to cart"
                onclick="event.preventDefault(); event.stopPropagation(); alert('add to cart')"
              >
                <el-icon class="h24-cart"></el-icon>
              </button>
              <button type="button" aria-label="buy now">
                <el-icon class="h24-card"></el-icon>
              </button>
            </el-layer-action>
            <el-layer-disabled class="typo-subtitle-lg">
              <el-txt>
                판매가능시간
                <br />
                9시 ~ 18시
              </el-txt>
              <el-addon class="typo-body-sm">
                공휴일/주말 제외
              </el-addon>
            </el-layer-disabled>
          </el-item-thumbnail>

          <el-item-txt class="typo-body-sm">
            <el-badge-gift-card>
              <img src="./images/badge-gift-card.svg" alt="상품권" />
            </el-badge-gift-card>
            <el-item-name>
              <el-brand>스타벅스</el-brand>
              <el-item-name-txt>
                떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R초콜릿
                떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R초콜릿
              </el-item-name-txt>
            </el-item-name>
            <el-item-price>
              <el-discount-rate class="typo-body-lg">
                20%
              </el-discount-rate>
              <el-sale-price class="typo-body-sm">
                <strong class="typo-body-lg">999,999</strong>원
              </el-sale-price>
              <el-retail-price class="typo-label-md">
                999,999원
              </el-retail-price>
            </el-item-price>
          </el-item-txt>
        </a>
      </el-product-item>
    `;
  }
}
customElements.define(
  'component-product-item-large-2',
  ComponentProductItemLarge2
);
// 종료: el-product-item-large (2)

// 시작: el-product-item-large (3)
class ComponentProductItemLarge3 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <el-product-item class="disabled size-large">
        <a href="#">
          <el-item-thumbnail>
            <img
              class="thumbnail-image"
              src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/product/20250227/20250227145823_a5b9221d-437d-4b84-b0ac-fbc6f58edf4f.jpg"
              alt=""
            />
            <el-bg></el-bg>
            <el-badge-special>
              <img src="./images/badge-event.svg" alt="이벤트특가" />
              <img src="./images/badge-reward.svg" alt="리워드지급" />
            </el-badge-special>
            <el-badge-period class="typo-label-sm">
              30일
            </el-badge-period>
            <el-layer-action>
              <button
                type="button"
                aria-label="add to cart"
                onclick="event.preventDefault(); event.stopPropagation(); alert('add to cart')"
              >
                <el-icon class="h24-cart"></el-icon>
              </button>
              <button type="button" aria-label="buy now">
                <el-icon class="h24-card"></el-icon>
              </button>
            </el-layer-action>
            <el-layer-disabled class="typo-subtitle-lg">
              <el-txt> 일시품절 </el-txt>
            </el-layer-disabled>
          </el-item-thumbnail>

          <el-item-txt class="typo-body-sm">
            <el-badge-gift-card>
              <img src="./images/badge-gift-card.svg" alt="상품권" />
            </el-badge-gift-card>
            <el-item-name>
              <el-brand>스타벅스</el-brand>
              <el-item-name-txt>
                떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R초콜릿
                떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R초콜릿
              </el-item-name-txt>
            </el-item-name>
            <el-item-price>
              <el-discount-rate class="typo-body-lg">
                20%
              </el-discount-rate>
              <el-sale-price class="typo-body-sm">
                <strong class="typo-body-lg">999,999</strong>원
              </el-sale-price>
              <el-retail-price class="typo-label-md">
                999,999원
              </el-retail-price>
            </el-item-price>
          </el-item-txt>
        </a>
      </el-product-item>
    `;
  }
}
customElements.define(
  'component-product-item-large-3',
  ComponentProductItemLarge3
);
// 종료: el-product-item-large (3)

// 시작: el-product-item-large (4)
class ComponentProductItemLarge4 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <el-product-item class="disabled size-large">
        <a href="#">
          <el-item-thumbnail>
            <img
              class="thumbnail-image"
              src="https://www.officecon.co.kr/common/file/download?uploadFullPath=/product/20250227/20250227145823_a5b9221d-437d-4b84-b0ac-fbc6f58edf4f.jpg"
              alt=""
            />
            <el-bg></el-bg>
            <el-badge-special>
              <img src="./images/badge-event.svg" alt="이벤트특가" />
              <img src="./images/badge-reward.svg" alt="리워드지급" />
            </el-badge-special>
            <el-badge-period class="typo-label-sm">
              30일
            </el-badge-period>
            <el-layer-action>
              <button
                type="button"
                aria-label="add to cart"
                onclick="event.preventDefault(); event.stopPropagation(); alert('add to cart')"
              >
                <el-icon class="h24-cart"></el-icon>
              </button>
              <button type="button" aria-label="buy now">
                <el-icon class="h24-card"></el-icon>
              </button>
            </el-layer-action>
            <el-layer-disabled class="typo-subtitle-lg">
              <el-txt>
                판매가능시간
                <br />
                9시 ~ 18시
              </el-txt>
              <el-addon class="typo-body-sm">
                공휴일/주말 제외
              </el-addon>
            </el-layer-disabled>
          </el-item-thumbnail>

          <el-item-txt class="typo-body-sm">
            <el-badge-gift-card>
              <img src="./images/badge-gift-card.svg" alt="상품권" />
            </el-badge-gift-card>
            <el-item-name>
              <el-brand>스타벅스</el-brand>
              <el-item-name-txt>
                떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R초콜릿
                떠먹는 스트로베리 초콜릿 생크림 + 아메리카노 R초콜릿
              </el-item-name-txt>
            </el-item-name>
            <el-item-price>
              <el-discount-rate class="typo-body-lg">
                20%
              </el-discount-rate>
              <el-sale-price class="typo-body-sm">
                <strong class="typo-body-lg">999,999</strong>원
              </el-sale-price>
              <el-retail-price class="typo-label-md">
                999,999원
              </el-retail-price>
            </el-item-price>
          </el-item-txt>
        </a>
      </el-product-item>
    `;
  }
}
customElements.define(
  'component-product-item-large-4',
  ComponentProductItemLarge4
);
// 종료: el-product-item-large (4)

// 시작: el-category-swiper
class ComponentCategorySwiper extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
    loadScript(this, 'initCategorySwiper');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
    loadDynamically(this, 'initCategorySwiper');
  }

  render() {
    this.innerHTML = `
      <el-category-swiper>
        <el-swiper-wrapper>
          <swiper-container init="false">
            <swiper-slide>
              <el-tab-button class="active">
                <button type="button" class="typo-label-lg">
                  커피/음료
                </button>
              </el-tab-button>
            </swiper-slide>
            <swiper-slide>
              <el-tab-button>
                <button type="button" class="typo-label-lg">
                  베이커리/디저트
                </button>
              </el-tab-button>
            </swiper-slide>
            <swiper-slide>
              <el-tab-button>
                <button type="button" class="typo-label-lg">
                  아이스크림
                </button>
              </el-tab-button>
            </swiper-slide>
            <swiper-slide>
              <el-tab-button>
                <button type="button" class="typo-label-lg">
                  치킨/피자/버거
                </button>
              </el-tab-button>
            </swiper-slide>
            <swiper-slide>
              <el-tab-button>
                <button type="button" class="typo-label-lg">
                  외식
                </button>
              </el-tab-button>
            </swiper-slide>
            <swiper-slide>
              <el-tab-button>
                <button type="button" class="typo-label-lg">
                  배달이용권
                </button>
              </el-tab-button>
            </swiper-slide>
            <swiper-slide>
              <el-tab-button>
                <button type="button" class="typo-label-lg">
                  상품권/페이/주유
                </button>
              </el-tab-button>
            </swiper-slide>
            <swiper-slide>
              <el-tab-button>
                <button type="button" class="typo-label-lg">
                  편의점/마트
                </button>
              </el-tab-button>
            </swiper-slide>
            <swiper-slide>
              <el-tab-button>
                <button type="button" class="typo-label-lg">
                  금액권/통합권
                </button>
              </el-tab-button>
            </swiper-slide>
            <swiper-slide>
              <el-tab-button>
                <button type="button" class="typo-label-lg">
                  문화/생활/뷰티
                </button>
              </el-tab-button>
            </swiper-slide>
            <swiper-slide>
              <el-tab-button>
                <button type="button" class="typo-label-lg">
                  리워드관
                </button>
              </el-tab-button>
            </swiper-slide>
          </swiper-container>
        </el-swiper-wrapper>

        <el-swiper-navigation>
          <button
            type="button"
            class="button-prev-circle"
            aria-label="이전"
          >
            <el-icon
              class="h20-arrow-left natural-0"
            ></el-icon>
          </button>
          <button
            type="button"
            class="button-next-circle"
            aria-label="다음"
          >
            <el-icon
              class="h20-arrow-right natural-0"
            ></el-icon>
          </button>
        </el-swiper-navigation>
      </el-category-swiper>
    `;
  }
}
customElements.define('component-category-swiper', ComponentCategorySwiper);
// 종료: el-category-swiper

// 시작: el-breadcrumb
class ComponentBreadcrumb extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <el-breadcrumb>
        <ul class="typo-label-lg">
          <li><a href="#">HOME</a></li>
          <li>
            <button
              type="button"
              class="typo-label-lg"
              data-bs-toggle="dropdown"
              data-bs-offset="-16,8"
            >
              커피/음료
              <el-icon-wrap>
                <el-icon class="h5-arrow-down natural-30"></el-icon>
              </el-icon-wrap>
            </button>
            <el-breadcrumb-layer-dropdown class="dropdown-menu">
              <!-- 시작: [DEV] 컬럼당 21개씩 출력 -->
              <ul class="typo-label-md">
                <li>
                  <a href="#">전체 카테고리</a>
                </li>
                <li class="active">
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
              </ul>
              <!-- 종료: [DEV] 컬럼당 21개씩 출력 -->
            </el-breadcrumb-layer-dropdown>
          </li>
          <li>
            <button
              type="button"
              class="typo-label-lg"
              data-bs-toggle="dropdown"
              data-bs-offset="-16,8"
            >
              스타벅스
              <el-icon-wrap>
                <el-icon class="h5-arrow-down natural-30"></el-icon>
              </el-icon-wrap>
            </button>
            <el-breadcrumb-layer-dropdown class="dropdown-menu">
              <!-- 시작: [DEV] 컬럼당 21개씩 출력 -->
              <ul class="typo-label-md">
                <li>
                  <a href="#">전체 카테고리</a>
                </li>
                <li class="active">
                  <a href="#">상품권/페이/주유/상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
              </ul>
              <!-- 종료: [DEV] 컬럼당 21개씩 출력 -->
              <!-- 시작: [DEV] 컬럼당 21개씩 출력 -->
              <ul class="typo-label-md">
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
              </ul>
              <!-- 종료: [DEV] 컬럼당 21개씩 출력 -->
              <!-- 시작: [DEV] 컬럼당 21개씩 출력 -->
              <ul class="typo-label-md">
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
              </ul>
              <!-- 종료: [DEV] 컬럼당 21개씩 출력 -->
              <!-- 시작: [DEV] 컬럼당 21개씩 출력 -->
              <ul class="typo-label-md">
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
                <li>
                  <a href="#">상품권/페이/주유</a>
                </li>
              </ul>
              <!-- 종료: [DEV] 컬럼당 21개씩 출력 -->
            </el-breadcrumb-layer-dropdown>
          </li>
          <li>상품상세</li>
        </ul>
      </el-breadcrumb>
    `;
  }
}
customElements.define('component-breadcrumb', ComponentBreadcrumb);
// 종료: el-breadcrumb

// 시작: pagination
class Pagination extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <el-pagination>
        <nav aria-label="Page navigation">
          <el-pagination-prev>
            <a href="#" aria-label="처음">
              <el-icon class="h20-chevrons-left natural-0"></el-icon>
            </a>
            <a href="#" aria-label="이전">
              <el-icon class="h20-arrow-left natural-0"></el-icon>
            </a>
          </el-pagination-prev>
          <ul class="typo-body-sm">
            <li class="active">
              <a href="#">1</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>
              <a href="#">4</a>
            </li>
            <li>
              <a href="#">5</a>
            </li>
            <li>
              <a href="#">6</a>
            </li>
            <li>
              <a href="#">7</a>
            </li>
            <li>
              <a href="#">8</a>
            </li>
            <li>
              <a href="#">9</a>
            </li>
            <li>
              <a href="#">10</a>
            </li>
          </ul>
          <el-pagination-next>
            <a href="#" aria-label="다음">
              <el-icon class="h20-arrow-right natural-0"></el-icon>
            </a>
            <a href="#" aria-label="마지막">
              <el-icon class="h20-chevrons-right natural-0"></el-icon>
            </a>
          </el-pagination-next>
        </nav>
      </el-pagination>
    `;
  }
}
customElements.define('component-pagination', Pagination);
// 종료: pagination

// 시작:
class MyButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this, 'initAlert');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
  }

  render() {
    this.innerHTML = `
      <div>테스트</div>
    `;
  }
}
customElements.define('my-button', MyButton);
// 종료:
