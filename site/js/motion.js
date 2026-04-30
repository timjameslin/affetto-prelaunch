"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// motion.jsx — v0.8.0
// Carried forward verbatim from v0.7.0. Same primitives — Reveal, RevealWords,
// useHeartbeat, useLiveClock, usePrefersReducedMotion, useInViewport,
// useTabVisibility — power the §02 living topology, the rebuilt §01 hero
// preview, and any reveal-on-enter animation across the page.

var _React = React,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useState = _React.useState;
function Reveal(_ref) {
  var children = _ref.children,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 0 : _ref$delay,
    _ref$as = _ref.as,
    Tag = _ref$as === void 0 ? "div" : _ref$as,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style;
  var ref = useRef(null);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    shown = _useState2[0],
    setShown = _useState2[1];
  useEffect(function () {
    var el = ref.current;
    if (!el || shown) return;
    var io = new IntersectionObserver(function (entries) {
      return entries.forEach(function (e) {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      });
    }, {
      threshold: 0.15
    });
    io.observe(el);
    return function () {
      return io.disconnect();
    };
  }, [shown]);
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    className: className,
    "data-reveal": "",
    style: _objectSpread(_objectSpread({}, style), {}, {
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : "translateY(6px)",
      transition: "opacity 700ms cubic-bezier(.2,.7,.2,1) ".concat(delay, "ms, transform 800ms cubic-bezier(.2,.7,.2,1) ").concat(delay, "ms")
    })
  }, children);
}
function RevealWords(_ref2) {
  var text = _ref2.text,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "" : _ref2$className,
    _ref2$style = _ref2.style,
    style = _ref2$style === void 0 ? {} : _ref2$style,
    _ref2$as = _ref2.as,
    Tag = _ref2$as === void 0 ? "span" : _ref2$as,
    _ref2$baseDelay = _ref2.baseDelay,
    baseDelay = _ref2$baseDelay === void 0 ? 0 : _ref2$baseDelay,
    _ref2$step = _ref2.step,
    step = _ref2$step === void 0 ? 30 : _ref2$step;
  var ref = useRef(null);
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    shown = _useState4[0],
    setShown = _useState4[1];
  useEffect(function () {
    var el = ref.current;
    if (!el || shown) return;
    var io = new IntersectionObserver(function (entries) {
      return entries.forEach(function (e) {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      });
    }, {
      threshold: 0.2
    });
    io.observe(el);
    return function () {
      return io.disconnect();
    };
  }, [shown]);
  var words = text.split(" ");
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    className: className,
    "data-reveal": "",
    style: style
  }, words.map(function (w, i) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(0.4em)",
        transition: "opacity 700ms cubic-bezier(.2,.7,.2,1) ".concat(baseDelay + i * step, "ms, transform 800ms cubic-bezier(.2,.7,.2,1) ").concat(baseDelay + i * step, "ms")
      }
    }, w), i < words.length - 1 ? " " : "");
  }));
}
function useHeartbeat() {
  var period = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4200;
  var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    t = _useState6[0],
    setT = _useState6[1];
  useEffect(function () {
    if (!active) return;
    var raf, start;
    var _loop = function loop(ts) {
      if (start == null) start = ts;
      setT((ts - start) % period / period);
      raf = requestAnimationFrame(_loop);
    };
    raf = requestAnimationFrame(_loop);
    return function () {
      return cancelAnimationFrame(raf);
    };
  }, [period, active]);
  return t;
}
function useLiveClock() {
  var zone = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "America/Los_Angeles";
  var withSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var _useState7 = useState(""),
    _useState8 = _slicedToArray(_useState7, 2),
    s = _useState8[0],
    setS = _useState8[1];
  useEffect(function () {
    var tick = function tick() {
      try {
        var f = new Intl.DateTimeFormat("en-GB", _objectSpread(_objectSpread({
          hour: "2-digit",
          minute: "2-digit"
        }, withSeconds ? {
          second: "2-digit"
        } : {}), {}, {
          hour12: false,
          timeZone: zone
        }));
        setS(f.format(new Date()));
      } catch (e) {
        setS("");
      }
    };
    tick();
    var id = setInterval(tick, 1000);
    return function () {
      return clearInterval(id);
    };
  }, [zone, withSeconds]);
  return s;
}
function usePrefersReducedMotion() {
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    reduced = _useState0[0],
    setReduced = _useState0[1];
  useEffect(function () {
    if (typeof window === "undefined" || !window.matchMedia) return;
    var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    var handler = function handler(e) {
      return setReduced(e.matches);
    };
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return function () {
        return mq.removeEventListener("change", handler);
      };
    } else {
      mq.addListener(handler);
      return function () {
        return mq.removeListener(handler);
      };
    }
  }, []);
  return reduced;
}
function useInViewport(ref) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    threshold: 0.1
  };
  var _useState1 = useState(false),
    _useState10 = _slicedToArray(_useState1, 2),
    inView = _useState10[0],
    setInView = _useState10[1];
  useEffect(function () {
    var el = ref && ref.current;
    if (!el) return;
    var io = new IntersectionObserver(function (entries) {
      return entries.forEach(function (e) {
        return setInView(e.isIntersecting);
      });
    }, options);
    io.observe(el);
    return function () {
      return io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
  return inView;
}
function useTabVisibility() {
  var _useState11 = useState(typeof document !== "undefined" ? !document.hidden : true),
    _useState12 = _slicedToArray(_useState11, 2),
    visible = _useState12[0],
    setVisible = _useState12[1];
  useEffect(function () {
    if (typeof document === "undefined") return;
    var handler = function handler() {
      return setVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handler);
    return function () {
      return document.removeEventListener("visibilitychange", handler);
    };
  }, []);
  return visible;
}
window.Reveal = Reveal;
window.RevealWords = RevealWords;
window.useHeartbeat = useHeartbeat;
window.useLiveClock = useLiveClock;
window.usePrefersReducedMotion = usePrefersReducedMotion;
window.useInViewport = useInViewport;
window.useTabVisibility = useTabVisibility;
