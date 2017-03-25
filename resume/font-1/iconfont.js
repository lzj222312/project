;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-phone" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M736 0 288 0c-52.8 0-96 43.2-96 96l0 832c0 52.8 43.2 96 96 96l448 0c52.8 0 96-43.2 96-96L832 96C832 43.2 788.8 0 736 0zM512 960c-35.346 0-64-28.654-64-64s28.654-64 64-64 64 28.654 64 64S547.346 960 512 960zM768 768 256 768 256 128l512 0L768 768z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-youxiang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M885.514437 207.858048 138.483516 207.858048c-41.377386 0-75.052347 33.67496-75.052347 75.135234l0 458.07381c0 41.484833 33.67496 75.074859 75.052347 75.074859l747.030921 0c41.550325 0 75.05337-33.590026 75.05337-75.074859L960.567807 282.993283C960.566784 241.533009 927.063739 207.858048 885.514437 207.858048L885.514437 207.858048zM867.55439 261.657348 569.65256 525.801331c-26.000164 23.192212-45.255717 34.714639-57.653071 34.714639-12.395308 0-31.652907-11.522428-57.653071-34.714639L156.443563 261.657348 867.55439 261.657348 867.55439 261.657348zM119.257639 724.337059 119.257639 310.459844l232.657874 204.067722L119.257639 724.337059 119.257639 724.337059zM158.382729 762.343675l233.531777-207.390397 38.257326 33.590026c22.233374 19.422352 49.616024 29.40061 81.826634 29.40061 32.380478 0 59.591213-9.978259 81.910545-29.40061l38.254256-33.590026 233.539964 207.390397L158.382729 762.343675 158.382729 762.343675zM904.771013 724.337059 672.111093 514.527566l232.659921-204.067722L904.771013 724.337059 904.771013 724.337059zM904.771013 724.337059"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-zuobiao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512.064 469.248m-94.464 0a1.476 1.476 0 1 0 188.928 0 1.476 1.476 0 1 0-188.928 0Z"  ></path>' +
    '' +
    '<path d="M512 0C229.248 0 0 229.248 0 512c0 282.752 229.248 512 512 512s512-229.248 512-512C1024 229.248 794.752 0 512 0zM714.816 666.048l-202.752 202.752-202.752-202.752C257.28 614.144 225.28 542.464 225.28 463.232c0-158.336 128.448-286.72 286.784-286.72 158.336 0 286.72 128.384 286.72 286.72C798.784 542.464 766.656 614.144 714.816 666.048z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-github" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M950.930286 512q0 143.433143-83.748571 257.974857t-216.283429 158.573714q-15.433143 2.852571-22.601143-4.022857t-7.168-17.115429l0-120.539429q0-55.442286-29.696-81.115429 32.548571-3.437714 58.587429-10.313143t53.686857-22.308571 46.299429-38.034286 30.281143-59.977143 11.702857-86.016q0-69.12-45.129143-117.686857 21.138286-52.004571-4.534857-116.589714-16.018286-5.12-46.299429 6.290286t-52.589714 25.161143l-21.723429 13.677714q-53.174857-14.848-109.714286-14.848t-109.714286 14.848q-9.142857-6.290286-24.283429-15.433143t-47.689143-22.016-49.152-7.68q-25.161143 64.585143-4.022857 116.589714-45.129143 48.566857-45.129143 117.686857 0 48.566857 11.702857 85.723429t29.988571 59.977143 46.006857 38.253714 53.686857 22.308571 58.587429 10.313143q-22.820571 20.553143-28.013714 58.88-11.995429 5.705143-25.746286 8.557714t-32.548571 2.852571-37.449143-12.288-31.744-35.693714q-10.825143-18.285714-27.721143-29.696t-28.306286-13.677714l-11.410286-1.682286q-11.995429 0-16.603429 2.56t-2.852571 6.582857 5.12 7.972571 7.460571 6.875429l4.022857 2.852571q12.580571 5.705143 24.868571 21.723429t17.993143 29.110857l5.705143 13.165714q7.460571 21.723429 25.161143 35.108571t38.253714 17.115429 39.716571 4.022857 31.744-1.974857l13.165714-2.267429q0 21.723429 0.292571 50.834286t0.292571 30.866286q0 10.313143-7.460571 17.115429t-22.820571 4.022857q-132.534857-44.032-216.283429-158.573714t-83.748571-257.974857q0-119.442286 58.88-220.306286t159.744-159.744 220.306286-58.88 220.306286 58.88 159.744 159.744 58.88 220.306286z"  ></path>' +
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