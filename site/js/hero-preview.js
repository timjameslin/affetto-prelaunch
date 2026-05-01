"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// hero-preview.jsx — v0.8.0
// Stage 2 of the hero band. Expanded from v0.7.0's quiet hairline to a
// four-column architectural preview that visually anticipates §02.
//
// Layout: 4 labeled columns (L0 → L1 → L2 → L3) sitting on a horizontal
// spine. Each column shows a stylized rendering of its layer:
//   L0 — three dashed boxes (PMS / EHR / API)
//   L1 — single rectangle "Adapter layer" with vendor-agnostic sub-caption
//   L2 — wide rectangle "Schema · v0.4.1" — the visual spine of the diagram
//   L3 — 3×3 mini-grid of agent codes
// Between columns: ink-3 → arrow glyphs.
//
// Animation: 3 pulses traveling along the spine staggered at 0 / 0.33 / 0.66
// of a 4s loop. Honors prefers-reduced-motion, viewport visibility, tab
// visibility — same primitives as the full §02 living topology.

var _React = React,
  useRfH = _React.useRef;
function HeroPreview(_ref) {
  var _data$, _data$2, _data$3, _data$4, _data$5, _data$6, _data$7, _data$8, _data$9, _data$0, _data$1;
  var _ref$animate = _ref.animate,
    animate = _ref$animate === void 0 ? true : _ref$animate,
    _ref$bp = _ref.bp,
    bp = _ref$bp === void 0 ? "lg" : _ref$bp;
  var reduced = usePrefersReducedMotion();
  var wrapRef = useRfH(null);
  var inView = useInViewport(wrapRef, {
    threshold: 0.1
  });
  var tabVisible = useTabVisibility();
  var shouldAnimate = animate && !reduced && inView && tabVisible;
  var t = useHeartbeat(4000, shouldAnimate);
  var sm = bp === "sm";
  var data = window.AFFETTO && window.AFFETTO.system && window.AFFETTO.system.layers || [];
  var heroData = window.AFFETTO && window.AFFETTO.hero || {};
  var agents = window.AFFETTO && window.AFFETTO.agents && window.AFFETTO.agents.agents || [];
  var onJump = function onJump(e) {
    e.preventDefault();
    var el = document.getElementById("system");
    if (el && el.scrollIntoView) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else {
      window.location.hash = "system";
    }
  };

  // 3 pulses staggered at 0 / 0.33 / 0.66 phase. Each pulse traverses 0→1
  // (left edge of L0 column → right edge of L3 column), accent on the third.
  var pulses = [{
    offset: 0.00,
    accent: false
  }, {
    offset: 0.33,
    accent: false
  }, {
    offset: 0.66,
    accent: true
  }].map(function (p) {
    return _objectSpread(_objectSpread({}, p), {}, {
      pos: (t + p.offset) % 1
    });
  });

  // Mobile (sm) renders only label + animated spine — no internal column contents.
  if (sm) {
    return /*#__PURE__*/React.createElement("div", {
      ref: wrapRef,
      "aria-hidden": "false",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(".concat(data.length, ", 1fr)"),
        gap: 0
      }
    }, data.map(function (l, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: l.tag,
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: i === 0 ? "flex-start" : i === data.length - 1 ? "flex-end" : "center",
          textAlign: i === 0 ? "left" : i === data.length - 1 ? "right" : "center"
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "t-micro",
        style: {
          color: "var(--ink)"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink)"
        }
      }, l.tag), "  ", /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--ink-3)"
        }
      }, l.name)));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        height: 1,
        background: "var(--ink)",
        opacity: 0.65,
        transform: "translateY(-0.5px)"
      }
    }), data.map(function (l, i) {
      var pct = i / (data.length - 1) * 100;
      return /*#__PURE__*/React.createElement("span", {
        key: l.tag,
        "aria-hidden": "true",
        style: {
          position: "absolute",
          left: "".concat(pct, "%"),
          top: "50%",
          width: 4,
          height: 4,
          borderRadius: 99,
          background: "var(--ink-3)",
          transform: "translate(-50%, -50%)"
        }
      });
    }), pulses.map(function (p, i) {
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        "aria-hidden": "true",
        style: {
          position: "absolute",
          left: "".concat(p.pos * 100, "%"),
          top: "50%",
          width: 6,
          height: 6,
          borderRadius: 99,
          background: p.accent ? "var(--accent)" : "var(--ink)",
          transform: "translate(-50%, -50%)",
          boxShadow: p.accent ? "0 0 0 3px rgba(194,51,26,0.18)" : "0 0 0 3px rgba(11,11,9,0.10)",
          opacity: shouldAnimate ? 1 : 0.6
        }
      });
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        alignItems: "baseline",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "t-micro",
      style: {
        color: "var(--ink-3)"
      }
    }, heroData.previewCaption || "FIG. 00 / SYSTEM PREVIEW"), /*#__PURE__*/React.createElement("a", {
      href: "#system",
      onClick: onJump,
      className: "t-micro",
      style: {
        color: "var(--ink)",
        borderBottom: "1px solid var(--rule-soft)",
        paddingBottom: 1
      }
    }, heroData.previewJump || "§02 →")));
  }

  // Desktop / tablet: full four-column layered preview.
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    "aria-hidden": "false",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-preview-frame",
    style: {
      position: "relative",
      border: "1px solid var(--ink)",
      background: "var(--paper)",
      height: 280,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateAreas: "'l0 l1 l2 l3'"
    }
  }, /*#__PURE__*/React.createElement(PreviewColumn, {
    area: "l0",
    tag: (_data$ = data[0]) === null || _data$ === void 0 ? void 0 : _data$.tag,
    name: (_data$2 = data[0]) === null || _data$2 === void 0 ? void 0 : _data$2.name
  }, /*#__PURE__*/React.createElement(PreviewL0, {
    sources: ["DENTRIX", "EAGLESOFT", "OPEN DENTAL"]
  })), /*#__PURE__*/React.createElement(PreviewColumn, {
    area: "l1",
    tag: (_data$3 = data[1]) === null || _data$3 === void 0 ? void 0 : _data$3.tag,
    name: (_data$4 = data[1]) === null || _data$4 === void 0 ? void 0 : _data$4.name
  }, /*#__PURE__*/React.createElement(PreviewL1, null)), /*#__PURE__*/React.createElement(PreviewColumn, {
    area: "l2",
    tag: (_data$5 = data[2]) === null || _data$5 === void 0 ? void 0 : _data$5.tag,
    name: (_data$6 = data[2]) === null || _data$6 === void 0 ? void 0 : _data$6.name,
    version: (_data$7 = data[2]) === null || _data$7 === void 0 ? void 0 : _data$7.version
  }, /*#__PURE__*/React.createElement(PreviewL2, {
    version: ((_data$8 = data[2]) === null || _data$8 === void 0 ? void 0 : _data$8.version) || "v0.4.1"
  })), /*#__PURE__*/React.createElement(PreviewColumn, {
    area: "l3",
    tag: (_data$9 = data[3]) === null || _data$9 === void 0 ? void 0 : _data$9.tag,
    name: (_data$0 = data[3]) === null || _data$0 === void 0 ? void 0 : _data$0.name,
    subtitle: (_data$1 = data[3]) === null || _data$1 === void 0 ? void 0 : _data$1.subtitle,
    last: true
  }, /*#__PURE__*/React.createElement(PreviewL3, {
    agents: agents
  })), /*#__PURE__*/React.createElement(PreviewSpineOverlay, {
    pulses: pulses,
    shouldAnimate: shouldAnimate
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      alignItems: "baseline",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, heroData.previewCaption || "FIG. 00 / SYSTEM PREVIEW"), /*#__PURE__*/React.createElement("a", {
    href: "#system",
    onClick: onJump,
    className: "t-micro",
    style: {
      color: "var(--ink)",
      borderBottom: "1px solid var(--rule-soft)",
      paddingBottom: 1
    }
  }, heroData.previewJump || "§02 →")));
}
function PreviewColumn(_ref2) {
  var area = _ref2.area,
    tag = _ref2.tag,
    name = _ref2.name,
    subtitle = _ref2.subtitle,
    version = _ref2.version,
    children = _ref2.children,
    _ref2$last = _ref2.last,
    last = _ref2$last === void 0 ? false : _ref2$last;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      gridArea: area,
      borderRight: last ? "none" : "1px solid var(--rule-softer)",
      padding: "20px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      minWidth: 0,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 8,
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink)"
    }
  }, tag), "  ·  ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-3)"
    }
  }, name)), subtitle && /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, subtitle), version && /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, version)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, children));
}
function PreviewL0(_ref3) {
  var sources = _ref3.sources;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, sources.map(function (s) {
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        border: "1px dashed var(--ink-3)",
        padding: "8px 10px",
        fontFamily: "var(--sans)",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--ink-2)",
        textAlign: "center"
      }
    }, s);
  }));
}
function PreviewL1() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--ink)",
      background: "var(--paper)",
      padding: "16px 12px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      alignItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: "-0.005em",
      color: "var(--ink)"
    }
  }, "Adapter layer"), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Vendor-agnostic"));
}
function PreviewL2(_ref4) {
  var version = _ref4.version;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--ink)",
      background: "var(--paper-2)",
      padding: "18px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      alignItems: "center",
      textAlign: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: "var(--ink)"
    }
  }, "Schema \xB7 ", version), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Universal data contract"));
}
function PreviewL3(_ref5) {
  var agents = _ref5.agents;
  // 3×3 mini-grid of agent codes at 11px
  var codes = (agents || []).slice(0, 9).map(function (a) {
    return a.code;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 4
    }
  }, codes.map(function (c) {
    return /*#__PURE__*/React.createElement("div", {
      key: c,
      style: {
        border: "1px solid var(--ink)",
        padding: "6px 2px",
        textAlign: "center",
        fontFamily: "var(--mono)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        color: "var(--ink)"
      }
    }, c);
  }));
}
function PreviewSpineOverlay(_ref6) {
  var pulses = _ref6.pulses,
    shouldAnimate = _ref6.shouldAnimate;
  // Three → arrows at the column boundaries (25%, 50%, 75%) and three
  // traveling pulses tracking pulses[].pos (0–1 left→right).
  return /*#__PURE__*/React.createElement(React.Fragment, null, [0.25, 0.5, 0.75].map(function (x, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      "aria-hidden": "true",
      style: {
        position: "absolute",
        left: "".concat(x * 100, "%"),
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 18,
        height: 18,
        background: "var(--paper)",
        border: "1px solid var(--ink)",
        color: "var(--ink)",
        fontSize: 10,
        fontFamily: "var(--mono)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        pointerEvents: "none"
      }
    }, "\u2192");
  }), pulses.map(function (p, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      "aria-hidden": "true",
      style: {
        position: "absolute",
        left: "".concat(p.pos * 100, "%"),
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 6,
        height: 6,
        borderRadius: 99,
        background: p.accent ? "var(--accent)" : "var(--ink)",
        boxShadow: p.accent ? "0 0 0 4px rgba(194,51,26,0.18)" : "0 0 0 4px rgba(11,11,9,0.10)",
        opacity: shouldAnimate ? 1 : 0,
        zIndex: 3,
        pointerEvents: "none"
      }
    });
  }));
}
window.HeroPreview = HeroPreview;
