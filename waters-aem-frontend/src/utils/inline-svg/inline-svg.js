const inLineSVG = (() => {
    // Variables
    const inlineSVG = {};
    const supports = !!document.querySelector && !!document.addEventListener;
    let settings = {};
  
    // Defaults
    const defaults = {
      initClass: "js-inlinesvg",
      svgSelector: "img.svg",
    };
  
    /**
     * Stolen from underscore.js
     * @private
     * @param {Int} times
     * @param {Function} func
     */
    const after = function (times, func) {
      return function () {
        if (--times < 1) {
          return func.apply(this, arguments);
        }
      };
    };
  
    /**
     * Merge two objects together
     * @private
     * @param {Function} fn
     */
    const extend = function () {
      // Variables
      const extended = {};
      let deep = false;
      let i = 0;
      const length = arguments.length;
  
      // Check if a deep merge
      if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
        deep = arguments[0];
        i++;
      }
  
      // Merge the object into the extended object
      const merge = function (obj) {
        for (let prop in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            // If deep merge and property is an object, merge properties
            if (
              deep &&
              Object.prototype.toString.call(obj[prop]) === "[object Object]"
            ) {
              extended[prop] = extend(true, extended[prop], obj[prop]);
            } else {
              extended[prop] = obj[prop];
            }
          }
        }
      };
  
      // Loop through each object and conduct a merge
      for (; i < length; i++) {
        let obj = arguments[i];
        merge(obj);
      }
  
      return extended;
    };
  
    // Methods
  
    /**
     * Grab all the SVGs that match the selector
     * @public
     */
    const getAll = function () {
      const svgs = document.querySelectorAll(settings.svgSelector);
      return svgs;
    };
  
    /**
     * Inline all the SVGs in the array
     * @public
     */
    const inliner = function (cb) {
      const svgs = getAll();
      const callback = after(svgs.length, cb);
  
      Array.prototype.forEach.call(svgs, function (svg, i) {
        // Store some attributes of the image
        const src = svg.src || svg.getAttribute("data-src"),
          attributes = svg.attributes;
  
        // Get the contents of the SVG
        const request = new XMLHttpRequest();
        request.open("GET", src, true);
  
        request.onload = function () {
          if (request.status >= 200 && request.status < 400) {
            // Setup a parser to convert the response to text/xml in order for it
            // to be manipulated and changed
            const parser = new DOMParser();
            const result = parser.parseFromString(
              request.responseText,
              "text/xml"
            );
            const inlinedSVG = result.getElementsByTagName("svg")[0];
  
            // Remove some of the attributes that aren't needed
            inlinedSVG.removeAttribute("xmlns:a");
            inlinedSVG.removeAttribute("width");
            inlinedSVG.removeAttribute("height");
            inlinedSVG.removeAttribute("x");
            inlinedSVG.removeAttribute("y");
            inlinedSVG.removeAttribute("enable-background");
            inlinedSVG.removeAttribute("xmlns:xlink");
            inlinedSVG.removeAttribute("xml:space");
            inlinedSVG.removeAttribute("version");
  
            // Add in the attributes from the original <img> except `src` or
            // `alt`, we don't need either
            Array.prototype.slice.call(attributes).forEach(function (attribute) {
              if (attribute.name !== "src" && attribute.name !== "alt") {
                inlinedSVG.setAttribute(attribute.name, attribute.value);
              }
            });
  
            // Add an additional class to the inlined SVG to imply it was
            // infact inlined, might be useful to know
            if (inlinedSVG.classList) {
              inlinedSVG.classList.add("inlined-svg");
            } else {
              inlinedSVG.className += " " + "inlined-svg";
            }
  
            // Use the `longdesc` attribute if one exists
            if (attributes.longdesc) {
              const description = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "desc"
                ),
                descriptionText = document.createTextNode(
                  attributes.longdesc.value
                );
  
              description.appendChild(descriptionText);
              inlinedSVG.insertBefore(description, inlinedSVG.firstChild);
            }
  
            // Use the `alt` attribute if one exists
            if (attributes.alt) {
              inlinedSVG.setAttribute("aria-label", attributes.alt.value);
            } else {
              inlinedSVG.setAttribute("aria-hidden", "true");
            }
  
            // Replace the image with the SVG
            svg.parentNode &&
              svg.parentNode.replaceChild &&
              svg.parentNode.replaceChild(inlinedSVG, svg);
  
            // Fire the callback
            if (callback) {
              callback(settings.svgSelector);
            }
          } else {
            console.error("There was an error retrieving the source of the SVG.");
          }
        };
  
        request.onerror = function () {
          console.error("There was an error connecting to the origin server.");
        };
  
        request.send();
      });
    };
  
    /**
     * Initialise the inliner
     * @public
     */
    inlineSVG.init = function (options, callback) {
      // Test for support
      if (!supports) return;
  
      // Merge users option with defaults
      settings = extend(defaults, options || {});
  
      // Kick-off the inliner
      inliner(callback || function () {});
  
      // Once inlined and a class to the HTML
      if (document.documentElement.classList) {
        document.documentElement.classList.add(settings.initClass);
      } else {
        document.documentElement.className += " " + settings.initClass;
      }
    };
  
    return inlineSVG;
  })();
  
  export default inLineSVG;