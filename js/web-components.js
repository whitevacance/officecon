// 시작: 공통
const loadScript = (target) => {
  // pub-common.js가 이미 로드되어 있다면 전역 함수 호출
  if (window.initTopBanner) {
    window.initTopBanner(target.shadowRoot);
  } else {
    // 스크립트가 아직 로드되지 않았다면 동적 로드
    target.loadScriptDynamically();
  }
};

const loadDynamically = (target) => {
  try {
    // 이미 로드 중인지 확인
    if (target.scriptLoading) return;
    target.scriptLoading = true;

    // 외부 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = './js/pub-common.js';
    script.onload = () => {
      // 로드 완료 후 초기화
      if (window.initTopBanner) {
        window.initTopBanner(target.shadowRoot);
      }
    };
    script.onerror = () => {
      console.error('pub-common.js 로드 실패');
      target.initTopBanner(); // 폴백
    };

    document.head.appendChild(script);
  } catch (error) {
    console.error('외부 스크립트 로드 실패:', error);
    target.initTopBanner(); // 폴백
  }
};
// 종료: 공통

// 시작: 상단 띠배너
class TopBanner extends HTMLElement {
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
customElements.define('component-top-banner', TopBanner);
// 종료: 상단 띠배너

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
