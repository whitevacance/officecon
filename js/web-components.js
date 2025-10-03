// 시작: 공통
const loadScript = (target, scriptName) => {
  // pub-common.js가 이미 로드되어 있다면 전역 함수 호출
  if (window[scriptName]) {
    window[scriptName](target.shadowRoot);
  } else {
    // 스크립트가 아직 로드되지 않았다면 동적 로드
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
      // 로드 완료 후 초기화
      if (window[scriptName]) {
        window[scriptName](target.shadowRoot);
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
    loadScript(this, 'initTopBanner');
  }

  async loadScriptDynamically() {
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
    loadScript(this, 'initHeaderSticky');
  }

  async loadScriptDynamically() {
    loadDynamically(this, 'initHeaderSticky');
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
                <el-search-layer>
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
                  <el-search-addon>레이어</el-search-addon>
                </el-search-layer>
              </el-search-area>
              <el-toggle-button>토글</el-toggle-button>
            </el-center>
          </el-header-content-left>
          <el-header-content-right>오른쪽</el-header-content-right>
        </el-header-content>
      </el-header-sticky>
    `;
  }
}
customElements.define('component-header-sticky', ComponentHeaderSticky);
// 종료: el-header-sticky

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
    // loadScript(this, 'initTopBanner');
  }

  async loadScriptDynamically() {
    // loadDynamically(this, 'initTopBanner');
  }

  render() {
    this.innerHTML = `
      <div>테스트</div>
    `;
  }
}
customElements.define('my-button', MyButton);
// 종료:
