/*!
 * index.js v0.1.1
 * 
 * Author: johvin
 * Date: 2018-03-20T08:51:24.765Z
 */
!function(e){function t(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var i={};t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t){function i(e){return"[object Array]"===Object.prototype.toString.call(e)}function n(e,t){this.hintFontSize=24,this.guideOptions=i(e)?e.filter(function(e){return"object"===(void 0===e?"undefined":o(e))&&"string"==typeof e.content&&e.content.trim().length>0}):[],this.callback=t,this.guideElement=null,this.cssInjected=!1,this.htmlInjected=!1,this.isGuiding=!1,this.guideIndex=-1,this.resizeWindowHandler=this.adjustGuideHintRootElementPosition.bind(this),this.clickHandler=this.clickHandler.bind(this),this.keyUpHandler=this.keyboardHandler.bind(this)}function s(e,t){new n(e,t).play()}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d=!1;try{var l=Object.defineProperty({},"passive",{get:function(){d=!0}});window.addEventListener("test",null,l)}catch(e){}n.prototype={constructor:n,play:function(){this.guideOptions.length>0&&!this.isGuiding&&(this.isGuiding=!0),this.guideIndex=-1,this.injectCss(),this.injectHTML(),this.next()},prev:function(){if(this.isGuiding){var e=this.guideIndex-1;e>=0&&this.show(e)}},next:function(){if(this.isGuiding){var e=this.guideOptions.length,t=this.guideIndex+1;if(0===e||t>=e)return this.stop();this.show(t)}},show:function(e){var t=this.currentHintOption=this.guideOptions[e];this.guideElement&&this.guideElement.classList.remove("guideline-current-element"),this.guideElement=t.element,this.guideElement&&this.guideElement.classList.add("guideline-current-element"),this.guideRelativePosition=t.position,"bottom"!==this.guideRelativePosition&&"top"!==this.guideRelativePosition&&(this.guideRelativePosition="bottom"),this.guideHintRootElement||(this.guideHintRootElement=this.guideRootElement.querySelector(".guideline-guide")),this.adjustGuideHintRootElementPosition();var i=this.guideHintRootElement.firstElementChild;i&&(i.textContent=t.content,i.style.cssText="style"in t?t.style:""),this.guideIndex=e},adjustGuideHintRootElementPosition:function(){if(this.guideElement){this.guideElement.scrollIntoViewIfNeeded();var e=this.guideElement.getBoundingClientRect(),t=e.left,i=e.right,n=e.top,s=e.bottom,o="bottom"===this.guideRelativePosition?"top: "+(s+20)+"px":"bottom: "+(window.innerHeight-n+20)+"px";this.guideHintRootElement.style.cssText="left: "+(t+i>>1)+"px; "+o+"; transform: translate(-50%, 0);"}else this.guideHintRootElement.style.cssText="left: 50%; top: 50%; transform: translate(-50%, -50%);"},injectCss:function(){if(!this.cssInjected){var e="guideline-css-style",t=document.getElementById(e);if(!t){t=document.createElement("style"),t.setAttribute("type","text/css"),t.id=e;var i="\n        .guideline-current-element {\n          position: relative;\n          z-index: 9991;\n          box-shadow: 0 0 4px 4px rgba(255, 0, 0, 0.8);\n          animation: breathe 2s ease 1s infinite;\n        }\n\n        .guideline-wrapper,\n        .guideline-bg,\n        .guideline-mask {\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n        }\n\n        .guideline-wrapper {\n          transition: opacity 0.5s ease;\n          opacity: 0;\n        }\n\n        .guideline-wrapper.show {\n          opacity: 1;\n        }\n\n        .guideline-bg {\n          background: hsla(0, 0%, 0%, 0.6);\n          z-index: 9990;\n        }\n\n        .guideline-mask {\n          z-index: 9992;\n        }\n\n        .guideline-guide {\n          position: absolute;\n          color: hsl(0, 0%, 100%);\n          font-size: "+this.hintFontSize+"px;\n          z-index: 9993;\n          pointer-events: none;\n        }\n\n        .guideline-guide > .guideline-hint {\n          display: inline-block;\n          padding: 10px;\n        }\n\n        @keyframes breathe {\n          from {\n            box-shadow: 0 0 4px 4px rgba(255, 0, 0, 0.8);\n          }\n          50% {\n            box-shadow: 0 0 2px 1px rgba(255, 0, 0, 0.6);\n          }\n          to {\n            box-shadow: 0 0 4px 4px rgba(255, 0, 0, 0.8);\n          }\n        }\n      ";t.textContent=i,document.head.appendChild(t)}this.cssInjected=!0}},unloadCss:function(){if(this.cssInjected){var e=document.getElementById("guideline-css-style");e.parentNode.removeChild(e)}},injectHTML:function(){if(!this.htmlInjected){if(document.querySelector(".guideline-wrapper"))throw new Error("A guideline already exists, it's not allowed to run a guideline until another finishes");document.body.insertAdjacentHTML("beforeend",'\n      <div class="guideline-wrapper show">\n        <div class="guideline-bg"></div>\n        <div class="guideline-mask"></div>\n        <div class="guideline-guide">\n          <span class="guideline-hint"></span>\n        </div>\n      </div>\n    '),this.htmlInjected=!0,this.guideRootElement=document.querySelector(".guideline-wrapper"),this.guideRootElement.addEventListener("click",this.clickHandler,!!d&&{passive:!0}),window.addEventListener("keyup",this.keyUpHandler,!0),window.addEventListener("resize",this.resizeWindowHandler,!!d&&{passive:!0})}},unloadHTML:function(){this.htmlInjected&&(this.guideRootElement&&(this.guideRootElement.parentNode.removeChild(this.guideRootElement),this.guideRootElement=null),window.removeEventListener("keyup",this.keyUpHandler),window.removeEventListener("resize",this.resizeWindowHandler),this.htmlInjected=!1)},clickHandler:function(e){e.stopPropagation(),this.next()},keyboardHandler:function(e){if(!(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey))switch(e.keyCode||e.which){case 39:case 13:case 32:this.next();break;case 37:case 8:this.prev();break;case 27:this.stop()}},stop:function(){this.isGuiding&&(this.isGuiding=!1,this.guideIndex=-1,this.destroy(),this.callback&&"function"==typeof this.callback&&this.callback())},destroy:function(){this.guideElement&&(this.guideElement.classList.remove("guideline-current-element"),this.guideElement=null),this.unloadHTML(),this.unloadCss()}},s.Guideline=n,e.exports=s}]);