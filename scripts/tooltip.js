class Tooltip {
  constructor(ttButton) {
    this.ttButton = ttButton;
  }
  
  /* 스타트 */
  init() {
    for(const element of this.ttButton) {
      element.addEventListener('mouseover', this.makeTT.bind(this), false);
      element.addEventListener('mouseleave', this.removeTT.bind(this), false);
    }
  }
  
  /* TT element 생성 */
  makeTT(event) {
    let ttBtn = event.currentTarget;
    // 툴팁 Division 생성
    let tt = document.createElement("div");
    tt.classList.add("gt-tooltip");
    tt.innerHTML = ttBtn.getAttribute("data-tooltip");

    if (document.querySelector(".gt-tooltip")) {
      document.body.removeChild(document.querySelector(".gt-tooltip"));
    }

    // 툴팁 Append
    document.body.appendChild(tt);
    tt.classList.add("gt-tooltip-show");

    // Caret(꼬다리) Division 생성
    let caret = document.createElement("div");
    caret.classList.add("gt-tooltip-caret");
    tt.appendChild(caret);

    // 툴팁 위치
    this.setPosition(ttBtn, tt);
  }
  
  /* 방향에 따라 툴팁 위치 변경 */
  setPosition(ttBtn, tt) {
    let placement;
    let bg;
    let fontColor;
    let fontSize;
    let ttBtnW;
    let ttBtnH;
    let ttBtnL;
    let ttBtnT;
    let ttW;
    let ttH;
    let caret;
    let caretW;
    let caretH;
    let offset = 10;

    // 툴팁 방향 가져오기
    placement = ttBtn.getAttribute("data-tooltip-placement");

    // 툴팁 배경 컬러 변경
    bg = ttBtn.getAttribute('data-tooltip-background');
    if (bg === null || bg === undefined) bg = "#575757";
    tt.style.background = bg;

    // Caret(꼬다리)
    caret = this.makeCaret(
      tt.querySelector(".gt-tooltip-caret"),
      placement,
      bg
    );

    // 툴팁 폰트 컬러 변경
    fontColor = ttBtn.getAttribute('data-tooltip-color');
    tt.style.color = fontColor;

    // 툴팁 폰트 크기 변경
    fontSize = ttBtn.getAttribute('data-tooltip-fontSize');
    tt.style.fontSize = fontSize;

    // 툴팁 요소: 너비, 높이, 좌표
    ttBtnW = Math.ceil(ttBtn.offsetWidth);
    ttBtnH = Math.ceil(ttBtn.offsetHeight);
    ttBtnL = Math.ceil(ttBtn.getBoundingClientRect().left);
    ttBtnT = Math.ceil(
      window.pageYOffset + ttBtn.getBoundingClientRect().top
    );
    ttW = Math.ceil(tt.offsetWidth);
    ttH = Math.ceil(tt.offsetHeight);
    // ttL = Math.ceil(tt.getBoundingClientRect().left);
    // ttT = Math.ceil(tt.getBoundingClientRect().top);
    caretW = Math.ceil(caret.offsetWidth);
    caretH = Math.ceil(caret.offsetHeight);

    // 방향에 따른 툴팁 위치 조정
    switch(placement) {
      case "left":
        tt.style.left = ttBtnL - ttW - offset + "px";
        tt.style.top = ttBtnT + (ttBtnH - ttH) / 2 + "px";
        caret.style.left = ttW + "px";
        caret.style.top = ttH / 2 - caretH / 2 + "px";
        tt.classList.add("gt-transform-origin-center-right"); // The transform-origin CSS property sets the origin for an element's transformations.(https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)
        break;

      case "right":
        tt.style.left = ttBtnL + ttBtnW + offset + "px";
        tt.style.top = ttBtnT + (ttBtnH - ttH) / 2 + "px";
        caret.style.left = -caretW + "px";
        caret.style.top = ttH / 2 - caretH / 2 + "px";
        tt.classList.add("gt-transform-origin-center-left");
        break;

      case "bottom":
        tt.style.left = ttBtnL + (ttBtnW - ttW) / 2 + "px";
        tt.style.top = ttBtnT + ttBtnH + offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = -caretH + "px";
        tt.classList.add("gt-transform-origin-top-center");
        break;

      case "top-left":
        tt.style.left = ttBtnL + "px";
        tt.style.top = ttBtnT - ttH - offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = ttH + "px";
        tt.classList.add("gt-transform-origin-bottom-left");
        break;

      case "top-right":
        tt.style.left = ttBtnL + Math.abs(ttBtnW - ttW) + "px";
        tt.style.top = ttBtnT - ttH - offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = ttH + "px";
        tt.classList.add("gt-transform-origin-bottom-right");
        break;

      case "bottom-left":
        tt.style.left = ttBtnL + "px";
        tt.style.top = ttBtnT + ttBtnH + offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = -caretH + "px";
        tt.classList.add("gt-transform-origin-top-left");
        break;

      case "bottom-right":
        tt.style.left = ttBtnL + Math.abs(ttBtnW - ttW) + "px";
        tt.style.top = ttBtnT + ttBtnH + offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = -caretH + "px";
        tt.classList.add("gt-transform-origin-top-right");
        break;

      case "top":
        tt.style.left = ttBtnL + (ttBtnW - ttW) / 2 + "px";
        tt.style.top = ttBtnT - ttH - offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = ttH + "px";
        tt.classList.add("gt-transform-origin-bottom-center");
        break;

      default:
        tt.style.left = ttBtnL + (ttBtnW - ttW) / 2 + "px";
        tt.style.top = ttBtnT - ttH - offset + "px";
        caret.style.left = ttW / 2 - caretW / 2 + "px";
        caret.style.top = ttH + "px";
        tt.classList.add("gt-transform-origin-bottom-center");
        break;
    }
  }
  
  /* 꼬다리 만들기 */
  makeCaret(caret, placement, bgColor) {
    switch(placement) {
      case "left":
        caret.style.borderWidth = "6px 0px 6px 6px";
        caret.style.borderLeftColor = bgColor;
        break;

      case "right":
        caret.style.borderWidth = "6px 6px 6px 0px";
        caret.style.borderRightColor = bgColor;
        break;

      case "top":
        caret.style.borderWidth = "6px 6px 0px 6px";
        caret.style.borderTopColor = bgColor;
        break;

      case "top-left":
        caret.style.borderWidth = "6px 6px 0px 6px";
        caret.style.borderTopColor = bgColor;
        break;

      case "top-right":
        caret.style.borderWidth = "6px 6px 0px 6px";
        caret.style.borderTopColor = bgColor;
        break;

      case "bottom":
        caret.style.borderWidth = "0px 6px 6px 6px";
        caret.style.borderBottomColor = bgColor;
        break;

      case "bottom-left":
        caret.style.borderWidth = "0px 6px 6px 6px";
        caret.style.borderBottomColor = bgColor;
        break;

      case "bottom-right":
        caret.style.borderWidth = "0px 6px 6px 6px";
        caret.style.borderBottomColor = bgColor;
        break;

      default:
        caret.style.borderWidth = "6px 6px 0px 6px";
        caret.style.borderTopColor = bgColor;
        break;
    }
    return caret;
  }
  
  /* TT 제거 */
  removeTT() {
    if(document.querySelector(".gt-tooltip")) {
      let tt = document.body.querySelector(".gt-tooltip");
      tt.classList.add("gt-tooltip-hide");
      tt.addEventListener("animationend", () => {
        document.body.removeChild(document.body.querySelector(".gt-tooltip"));
      });
    }
  }
}

export default Tooltip;