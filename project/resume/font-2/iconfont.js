;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-biaoqian" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M838.1952 276.7104l-0.3072 0.3072c-9.6768 9.728-9.6768 25.4976 0 35.1744 9.4208 9.4464 25.8048 9.472 35.2 0l64.768-64.7424c44.7232-44.7488 44.7232-117.504 0-162.2016-21.632-21.632-50.432-33.536-81.1008-33.536-30.6688 0-59.4432 11.904-81.0752 33.536l-55.6544 55.6544-275.456 0c-6.656 0-12.9024 2.5856-17.5872 7.296L77.1584 498.0224c-17.408 17.408-27.008 40.5504-27.008 65.2032 0 24.6528 9.6 47.8208 27.008 65.2544l317.5168 317.5168c17.4336 17.3824 40.6016 26.9824 65.2032 26.9824 24.6528 0 47.8208-9.5744 65.2544-26.9824l349.7728-349.7984c4.6848-4.7104 7.296-10.9568 7.296-17.6128l0-159.744c0-13.7216-11.1616-24.9088-24.8832-24.9088-13.7216 0-24.8832 11.1616-24.8832 24.9088l0 149.4528-342.4768 342.528c-8.0128 7.9872-18.6624 12.3904-30.0288 12.3904s-22.0416-4.4032-30.0288-12.3904L112.3584 593.2544C104.3456 585.2416 99.9168 574.5664 99.9168 563.2c0-11.3408 4.4032-21.9904 12.416-30.0032l342.528-342.528 215.3984 0-18.0736 18.0736c-21.6576 21.6576-33.536 50.4832-33.4336 81.1776 0.0768 30.7712 12.2112 59.776 34.4064 81.92l1.2544 1.0496c9.3696 7.936 23.9872 7.7056 33.0496-0.5376 10.0864-9.2928 10.7776-25.0624 1.536-35.1232-0.6144-0.7168-1.536-1.536-2.2528-2.176-24.5504-25.2928-24.2432-66.176 0.6656-91.1104l123.4944-123.4432c12.2368-12.2368 28.5184-18.9696 45.8752-18.9696 17.3568 0 33.664 6.7328 45.9264 18.9696 12.2368 12.2368 18.9952 28.5184 18.9952 45.9008s-6.7328 33.6896-18.9952 45.9264L838.1952 276.7104z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)