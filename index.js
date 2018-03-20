// judge if the browser event support passive mode
let passiveSupported = false;

try {
  const options = Object.defineProperty({}, 'passive', {
    get: function () {
      passiveSupported = true;
    }
  });
  window.addEventListener('test', null, options);
} catch (e) {}

function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

function Guideline(guideOptions, callback) {
  // hint text font-size setting
  this.hintFontSize = 24;
  this.guideOptions = isArray(guideOptions)
    ? guideOptions.filter(it => typeof it === 'object' && typeof it.content === 'string' && it.content.trim().length > 0)
    : [];
  this.callback = callback;
  this.guideElement = null;
  this.cssInjected = false;
  this.htmlInjected = false;
  this.isGuiding = false;
  this.guideIndex = -1;
  this.resizeWindowHandler = this.adjustGuideHintRootElementPosition.bind(this);
  this.clickHandler = this.clickHandler.bind(this);
  this.keyUpHandler = this.keyboardHandler.bind(this);
}

Guideline.prototype = {
  constructor: Guideline,

  // start play the guideline
  play: function play() {
    const length = this.guideOptions.length;
    if (length > 0 && !this.isGuiding) {
      this.isGuiding = true;
    }
    this.guideIndex = -1;

    this.injectCss();
    this.injectHTML();
    this.next();
  },

  // play the previous guide
  prev: function prev() {
    if (!this.isGuiding) return;
    const currentIndex = this.guideIndex - 1;

    if (currentIndex >= 0) {
      this.show(currentIndex);
    }
  },

  // play the next guide
  next: function next() {
    if (!this.isGuiding) return;
    
    const total = this.guideOptions.length;
    const currentIndex = this.guideIndex + 1;

    if (total === 0 || currentIndex >= total) {
      return this.stop();
    }

    this.show(currentIndex);
  },

  // show specific guide
  show: function (guideIndex) {
    const curHintOpt = this.currentHintOption = this.guideOptions[guideIndex];

    if (this.guideElement) {
      this.guideElement.classList.remove('guideline-current-element');
    }
    this.guideElement = curHintOpt.element;
    if (this.guideElement) {
      this.guideElement.classList.add('guideline-current-element');
    }

    // guide hint root element's relative position of current guide element
    this.guideRelativePosition = curHintOpt.position;
    if (this.guideRelativePosition !== 'bottom' && this.guideRelativePosition !== 'top') {
      this.guideRelativePosition = 'bottom';
    }

    if (!this.guideHintRootElement) {
      this.guideHintRootElement = this.guideRootElement.querySelector('.guideline-guide');
    }

    this.adjustGuideHintRootElementPosition();

    // update hint content and style
    const hintElem = this.guideHintRootElement.firstElementChild;
    if (hintElem) {
      hintElem.textContent = curHintOpt.content;
      hintElem.style.cssText = 'style' in curHintOpt ? curHintOpt.style : '';
    }

    this.guideIndex = guideIndex;
  },

  // adjust guide content root element's position
  // according to current guide element's position
  adjustGuideHintRootElementPosition: function () {
    if (this.guideElement) {

      // Making guideElement scroll into view before invoking getBoundingClientRect
      // can cover the case that the guideElement's parent or grandfather has a fixed position which leads to
      // guideline's height equals to window.innerHeight, in the meanwhile the guideElement's computed top is greater than window.innerHeight
      // in which case the guide hint element will be outside of the screen.
      this.guideElement.scrollIntoViewIfNeeded();
      const {
        left,
        right,
        top,
        bottom
      } = this.guideElement.getBoundingClientRect();
      // const winWidth = window.innerWidth;
      // const textPadding = 10;
      // let hintWidth = this.currentHintOption.content.length * this.hintFontSize + textPadding * 2;

      // if (hintWidth > winWidth) {
      //   hintWidth = winWidth;
      // }

      const verticalPosition = this.guideRelativePosition === 'bottom' ? `top: ${bottom + 20}px` : `bottom: ${window.innerHeight - top + 20}px`;
      this.guideHintRootElement.style.cssText = `left: ${(left + right) >> 1}px; ${verticalPosition}; transform: translate(-50%, 0);`;
    } else {
      this.guideHintRootElement.style.cssText = `left: 50%; top: 50%; transform: translate(-50%, -50%);`;
    }
  },

  // inject css into document's head
  injectCss: function injectCss() {
    if (this.cssInjected) {
      return;
    }
    
    const cssId = 'guideline-css-style';
    let elem = document.getElementById(cssId);

    if (!elem) {
      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = cssId;

      const cssText = `
        .guideline-current-element {
          position: relative;
          z-index: 9991;
          box-shadow: 0 0 4px 4px rgba(255, 0, 0, 0.8);
          animation: breathe 2s ease 1s infinite;
        }

        .guideline-wrapper,
        .guideline-bg,
        .guideline-mask {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .guideline-wrapper {
          transition: opacity 0.5s ease;
          opacity: 0;
        }

        .guideline-wrapper.show {
          opacity: 1;
        }

        .guideline-bg {
          background: hsla(0, 0%, 0%, 0.6);
          z-index: 9990;
        }

        .guideline-mask {
          z-index: 9992;
        }

        .guideline-guide {
          position: absolute;
          color: hsl(0, 0%, 100%);
          font-size: ${this.hintFontSize}px;
          z-index: 9993;
          pointer-events: none;
        }

        .guideline-guide > .guideline-hint {
          display: inline-block;
          padding: 10px;
        }

        @keyframes breathe {
          from {
            box-shadow: 0 0 4px 4px rgba(255, 0, 0, 0.8);
          }
          50% {
            box-shadow: 0 0 2px 1px rgba(255, 0, 0, 0.6);
          }
          to {
            box-shadow: 0 0 4px 4px rgba(255, 0, 0, 0.8);
          }
        }
      `;

      // ie8 及之前版本不支持，可使用 cssText 兼容
      elem.textContent = cssText;
      document.head.appendChild(elem);
    }

    this.cssInjected = true;
  },

  // remove css from document's head
  unloadCss: function unloadCss() {
    if (this.cssInjected) {
      const css = document.getElementById('guideline-css-style');
      css.parentNode.removeChild(css);
    }
  },

  // inject guide html fragment into document's body
  injectHTML: function injectHTML() {
    if (this.htmlInjected) {
      return;
    }
    
    // if there already exists a guideline-wrapper, throw error
    if (document.querySelector('.guideline-wrapper')) {
      throw new Error('A guideline already exists, it\'s not allowed to run a guideline until another finishes');
    }

    const html = `
      <div class="guideline-wrapper show">
        <div class="guideline-bg"></div>
        <div class="guideline-mask"></div>
        <div class="guideline-guide">
          <span class="guideline-hint"></span>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);

    this.htmlInjected = true;

    this.guideRootElement = document.querySelector('.guideline-wrapper');
    // bind click listener
    this.guideRootElement.addEventListener('click', this.clickHandler, passiveSupported ? { passive: true } : false);
    // bind keyboard event listener
    window.addEventListener('keyup', this.keyUpHandler, true);
    // listen window resize event
    window.addEventListener('resize', this.resizeWindowHandler, passiveSupported ? { passive: true } : false);
  },

  // remove guide html fragment from document's body
  unloadHTML: function unloadHTML() {
    if (!this.htmlInjected) {
      return;
    }

    if (this.guideRootElement) {
      this.guideRootElement.parentNode.removeChild(this.guideRootElement);
      this.guideRootElement = null;
    }

    // removeEventListener or detachEvent
    // http://www.runoob.com/jsref/met-element-removeeventlistener.html
    // useCapture 是否必须分情况而定
    //
    // bind keyboard event listener
    window.removeEventListener('keyup', this.keyUpHandler);
    // unbind window resize listener
    window.removeEventListener('resize', this.resizeWindowHandler);
    
    this.htmlInjected = false;
  },

  // handle click event to navigate guideline
  clickHandler: function clickHandler(e) {
    e.stopPropagation();
    this.next();
  },

  // handle keyboard event
  keyboardHandler: function keyboardHandler(e) {
    if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
      // 组合键，不是要控制功能指引的前进后退
      return;
    }

    switch (e.keyCode || e.which) {
      // arrow right
      case 39:
      // enter
      case 13:
      // space
      case 32:
        this.next();
        break;
      // arrow left
      case 37:
      // backspace
      case 8:
        this.prev();
        break;
      // esc
      case 27:
        this.stop();
        break;
      default:
    }
  },

  // stop play the guideline
  stop: function stop () {
    if (this.isGuiding) {
      this.isGuiding = false;
      this.guideIndex = -1;

      this.destroy();

      if (this.callback && typeof this.callback === 'function') {
        this.callback();
      }
    }
  },

  destroy: function destroy() {
    if (this.guideElement) {
      this.guideElement.classList.remove('guideline-current-element');
      this.guideElement = null;
    }

    this.unloadHTML();
    this.unloadCss();
  }
};

function guide (guideOptions, callback) {
  const gl = new Guideline(guideOptions, callback);
  gl.play();
};

guide.Guideline = Guideline;

module.exports = guide;
