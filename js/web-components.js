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
              <el-dropdown-menu>
                <button
                  type="button"
                  class="typo-label-lg"
                  data-bs-toggle="dropdown"
                  data-bs-offset="5,10"
                >
                  고객센터
                  <el-icon class="h16-arrow-down natural-40"></el-icon>
                </button>
                <el-layer-dropdown
                  class="dropdown-menu dropdown-menu-end small"
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
    loadScript(this, 'initCategoryTabs');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initAlert');
    loadDynamically(this, 'initCategoryTabs');
  }

  render() {
    this.innerHTML = `
      <el-header-gnb>
        <el-gnb-container>
          <div>gnb</div>
          <div>gnb</div>
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
                  <img src="./images/footer-ISMSP.svg" alt="ISMS-P" />
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
                  <img src="./images/footer-Korfin.svg" alt="Korfin" />
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
                  <img src="./images/footer-Seoul.svg" alt="서울특별시" />
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
                  <img src="./images/footer-Innobiz.svg" alt="Innobiz" />
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
