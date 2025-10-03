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
    this.attachShadow({ mode: 'open' });
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
    this.shadowRoot.innerHTML = `
      <link type="text/css" rel="stylesheet" href="./css/bootstrap.min.css" />
      <link type="text/css" rel="stylesheet" href="./css/swiper.min.css" />
      <link type="text/css" rel="stylesheet" href="./css/style.css" />

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
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    // loadScript(this, 'initHeaderSticky');
  }

  async loadScriptDynamically() {
    // loadDynamically(this, 'initHeaderSticky');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link type="text/css" rel="stylesheet" href="./css/bootstrap.min.css" />
      <link type="text/css" rel="stylesheet" href="./css/swiper.min.css" />
      <link type="text/css" rel="stylesheet" href="./css/style.css" />
      <script src="./js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
      <script
        src="./js/swiper-element-bundleswiper.min.js"
        crossorigin="anonymous"
      ></script>

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

// 시작:
class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.loadExternalScript();
  }

  loadExternalScript() {
    loadScript(this);
  }

  async loadScriptDynamically() {
    loadDynamically(this);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link type="text/css" rel="stylesheet" href="./css/bootstrap.min.css" />
      <link type="text/css" rel="stylesheet" href="./css/swiper.min.css" />
      <link type="text/css" rel="stylesheet" href="./css/style.css" />

      <div>테스트</div>
    `;
  }
}
customElements.define('my-button', MyButton);
// 종료:
