"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// lifecycle.jsx — v0.8.0
// Vertical four-stage sequence with schematics, carried forward from v0.7.0
// with two refinements: (1) data is sourced from window.AFFETTO.lifecycle,
// (2) section header replaced by SectionMarker.
//
// Schematics are preserved verbatim — they already pass the "dramatic"
// bar set by §05 outcomes redrawn schematics.

// ── Schematics ──────────────────────────────────────────────────────

function StageCompressedTimeline() {
  // Two parallel timelines — long (traditional, weeks) vs short (Affetto, days).
  var W = 480,
    H = 180;
  var PAD_L = 56,
    PAD_R = 24,
    PAD_B = 36;
  var innerW = W - PAD_L - PAD_R;
  var TRAD_Y = 50;
  var AFF_Y = 100;
  var BAR_H = 18;
  var tradEnd = innerW;
  var affEnd = innerW * 0.18;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("text", {
    x: 8,
    y: TRAD_Y - 4,
    fontFamily: "var(--sans)",
    fontSize: "9",
    fontWeight: "500",
    letterSpacing: "0.08em",
    fill: "var(--ink-3)"
  }, "TRADITIONAL"), /*#__PURE__*/React.createElement("rect", {
    x: PAD_L,
    y: TRAD_Y,
    width: tradEnd,
    height: BAR_H,
    fill: "none",
    stroke: "var(--ink-3)",
    strokeWidth: "1"
  }), [0, 0.25, 0.5, 0.75].map(function (p, i) {
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: PAD_L + p * tradEnd,
      y1: TRAD_Y,
      x2: PAD_L + p * tradEnd,
      y2: TRAD_Y + BAR_H,
      stroke: "var(--ink-3)",
      strokeWidth: "0.5",
      strokeOpacity: "0.7"
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: PAD_L + tradEnd + 4,
    y: TRAD_Y + 13,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fill: "var(--ink-3)"
  }, "~weeks"), /*#__PURE__*/React.createElement("text", {
    x: 8,
    y: AFF_Y - 4,
    fontFamily: "var(--sans)",
    fontSize: "9",
    fontWeight: "500",
    letterSpacing: "0.08em",
    fill: "var(--ink)"
  }, "WITH AFFETTO"), /*#__PURE__*/React.createElement("rect", {
    x: PAD_L,
    y: AFF_Y,
    width: affEnd,
    height: BAR_H,
    fill: "var(--ink)"
  }), /*#__PURE__*/React.createElement("text", {
    x: PAD_L + affEnd + 8,
    y: AFF_Y + 13,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "600",
    fill: "var(--ink)"
  }, "~days"), /*#__PURE__*/React.createElement("line", {
    x1: PAD_L,
    y1: H - PAD_B + 6,
    x2: W - PAD_R,
    y2: H - PAD_B + 6,
    stroke: "var(--ink-3)",
    strokeWidth: "1",
    strokeOpacity: "0.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: PAD_L,
    y: H - PAD_B + 22,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fill: "var(--ink-3)"
  }, "start"), /*#__PURE__*/React.createElement("text", {
    x: W - PAD_R,
    y: H - PAD_B + 22,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fill: "var(--ink-3)",
    textAnchor: "end"
  }, "finish"));
}
function StageHubDiagram() {
  // Center node: AFFETTO. Six radial connections to labeled targets.
  var W = 480,
    H = 200;
  var cx = W / 2,
    cy = H / 2;
  var targets = [{
    angle: -150,
    label: "DENTRIX",
    active: true
  }, {
    angle: -90,
    label: "EAGLESOFT",
    active: true
  }, {
    angle: -30,
    label: "OPEN DENTAL",
    active: false
  }, {
    angle: 30,
    label: "CURVE",
    active: false
  }, {
    angle: 90,
    label: "PAYERS",
    active: true
  }, {
    angle: 150,
    label: "CORPORATE",
    active: false
  }];
  var RADIUS = 72;
  var pos = function pos(deg) {
    var r = deg * Math.PI / 180;
    return {
      x: cx + RADIUS * Math.cos(r),
      y: cy + RADIUS * Math.sin(r)
    };
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true"
  }, targets.map(function (t, i) {
    var p = pos(t.angle);
    return /*#__PURE__*/React.createElement("line", {
      key: "l".concat(i),
      x1: cx,
      y1: cy,
      x2: p.x,
      y2: p.y,
      stroke: "var(--ink-2)",
      strokeWidth: "1",
      strokeDasharray: t.active ? "0" : "3 3",
      strokeOpacity: t.active ? 0.85 : 0.55
    });
  }), /*#__PURE__*/React.createElement("rect", {
    x: cx - 38,
    y: cy - 14,
    width: 76,
    height: 28,
    fill: "var(--ink)"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 4,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "600",
    letterSpacing: "0.12em",
    fill: "var(--paper)",
    textAnchor: "middle"
  }, "AFFETTO"), targets.map(function (t, i) {
    var p = pos(t.angle);
    var labelX = p.x + (Math.cos(t.angle * Math.PI / 180) >= 0 ? 12 : -12);
    var anchor = Math.cos(t.angle * Math.PI / 180) >= 0 ? "start" : "end";
    return /*#__PURE__*/React.createElement("g", {
      key: "n".concat(i)
    }, /*#__PURE__*/React.createElement("circle", {
      cx: p.x,
      cy: p.y,
      r: "4",
      fill: t.active ? "var(--ink)" : "var(--paper)",
      stroke: "var(--ink)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: labelX,
      y: p.y + 3.5,
      fontFamily: "var(--sans)",
      fontSize: "9",
      fontWeight: "500",
      letterSpacing: "0.06em",
      fill: "var(--ink-2)",
      textAnchor: anchor
    }, t.label));
  }));
}
function StagePhaseBar() {
  // 6-month period split into three phases, with continuous AFFETTO ACTIVE line.
  var W = 480,
    H = 180;
  var PAD_L = 24,
    PAD_R = 24;
  var innerW = W - PAD_L - PAD_R;
  var phases = [{
    from: 0,
    to: 1 / 3,
    label: "MONTHS 1–2",
    sub: "DATA MIGRATION",
    color: "var(--ink)"
  }, {
    from: 1 / 3,
    to: 2 / 3,
    label: "MONTHS 3–4",
    sub: "WORKFLOW SHIFT",
    color: "var(--ink-2)"
  }, {
    from: 2 / 3,
    to: 1,
    label: "MONTHS 5–6",
    sub: "STABILIZATION",
    color: "var(--ink-3)"
  }];
  var BAR_Y = 44;
  var BAR_H = 30;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true"
  }, phases.map(function (p, i) {
    var x = PAD_L + p.from * innerW;
    var w = (p.to - p.from) * innerW;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: BAR_Y,
      width: w - 2,
      height: BAR_H,
      fill: p.color,
      fillOpacity: "0.85"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 8,
      y: BAR_Y + 13,
      fontFamily: "var(--sans)",
      fontSize: "9",
      fontWeight: "600",
      letterSpacing: "0.10em",
      fill: "var(--paper)"
    }, p.label), /*#__PURE__*/React.createElement("text", {
      x: x + 8,
      y: BAR_Y + 25,
      fontFamily: "var(--sans)",
      fontSize: "9",
      fontWeight: "500",
      letterSpacing: "0.06em",
      fill: "var(--paper)",
      fillOpacity: "0.85"
    }, p.sub));
  }), /*#__PURE__*/React.createElement("line", {
    x1: PAD_L,
    y1: BAR_Y + BAR_H + 22,
    x2: W - PAD_R,
    y2: BAR_Y + BAR_H + 22,
    stroke: "var(--accent)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: PAD_L,
    y: BAR_Y + BAR_H + 40,
    fontFamily: "var(--sans)",
    fontSize: "9",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--accent)"
  }, "AFFETTO ACTIVE \u2014 CONTINUOUS"), [0, 1, 2, 3, 4, 5, 6].map(function (m) {
    var x = PAD_L + m / 6 * innerW;
    return /*#__PURE__*/React.createElement("g", {
      key: m
    }, /*#__PURE__*/React.createElement("line", {
      x1: x,
      y1: BAR_Y - 4,
      x2: x,
      y2: BAR_Y - 1,
      stroke: "var(--ink-3)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: x,
      y: BAR_Y - 8,
      fontFamily: "var(--sans)",
      fontSize: "9",
      fill: "var(--ink-3)",
      textAnchor: "middle"
    }, m));
  }));
}
function StageGridDiagram() {
  // 3x3 grid of locations.
  // Per marketing feedback: this grid is the page's strongest visual proof
  // ("this is what 9 locations on Affetto looks like"). Add a first-illumination
  // stagger — dots fade in sequentially when the grid enters viewport, then
  // settle into their existing pulse cadence. Reads as "lighting up."
  var W = 480,
    H = 200;
  var COLS = 3,
    ROWS = 3;
  var PAD = 32;
  var cellW = (W - PAD * 2) / COLS;
  var cellH = (H - PAD * 2 - 24) / ROWS;
  var wrapRef = React.useRef(null);
  var inView = useInViewport(wrapRef, {
    threshold: 0.4
  });
  var reduced = usePrefersReducedMotion();
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    illuminated = _React$useState2[0],
    setIlluminated = _React$useState2[1];
  React.useEffect(function () {
    if (inView && !illuminated) {
      // 9 dots × 120ms stagger ≈ 1.1s for full illumination, then pulse takes over.
      var total = reduced ? 0 : 9 * 120 + 200;
      var t = setTimeout(function () {
        return setIlluminated(true);
      }, total);
      return function () {
        return clearTimeout(t);
      };
    }
  }, [inView, illuminated, reduced]);
  var cells = [];
  for (var r = 0; r < ROWS; r++) {
    for (var c = 0; c < COLS; c++) {
      cells.push({
        r: r,
        c: c,
        idx: r * COLS + c
      });
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    style: {
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true"
  }, cells.map(function (cell) {
    var x = PAD + cell.c * cellW;
    var y = PAD + cell.r * cellH;
    // Each dot fades in at idx * 120ms after viewport entry.
    // Once all 9 are illuminated, they settle into the perpetual pulse.
    var fadeInDelay = cell.idx * 0.12; // seconds
    return /*#__PURE__*/React.createElement("g", {
      key: cell.idx
    }, /*#__PURE__*/React.createElement("rect", {
      x: x + 4,
      y: y + 4,
      width: cellW - 8,
      height: cellH - 8,
      fill: "none",
      stroke: "var(--ink-2)",
      strokeWidth: "1",
      strokeOpacity: "0.6"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: x + cellW / 2,
      cy: y + cellH / 2,
      r: "6",
      fill: "var(--accent)",
      fillOpacity: inView ? 0.18 : 0
    }, inView && !reduced && /*#__PURE__*/React.createElement("animate", {
      attributeName: "fill-opacity",
      values: "0;0.18",
      dur: "0.4s",
      begin: "".concat(fadeInDelay, "s"),
      fill: "freeze"
    })), /*#__PURE__*/React.createElement("circle", {
      cx: x + cellW / 2,
      cy: y + cellH / 2,
      r: "2.5",
      fill: "var(--accent)",
      opacity: inView ? 1 : 0
    }, inView && !reduced && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("animate", {
      attributeName: "opacity",
      values: "0;1",
      dur: "0.4s",
      begin: "".concat(fadeInDelay, "s"),
      fill: "freeze"
    }), illuminated && /*#__PURE__*/React.createElement("animate", {
      attributeName: "opacity",
      values: "1;0.4;1",
      dur: "2.4s",
      begin: "".concat(cell.idx * 0.18, "s"),
      repeatCount: "indefinite"
    }))), /*#__PURE__*/React.createElement("text", {
      x: x + cellW / 2,
      y: y + cellH / 2 - 14,
      fontFamily: "var(--sans)",
      fontSize: "9",
      fontWeight: "600",
      letterSpacing: "0.06em",
      fill: "var(--ink-3)",
      textAnchor: "middle",
      opacity: inView ? 1 : 0.3
    }, "0", cell.idx + 1));
  }), /*#__PURE__*/React.createElement("text", {
    x: W / 2,
    y: H - 12,
    fontFamily: "var(--sans)",
    fontSize: "9",
    fontWeight: "500",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)",
    textAnchor: "middle"
  }, "NINE-LOCATION EXAMPLE \u2014 ALL LIVE")));
}
function StageSchematic(_ref) {
  var kind = _ref.kind;
  switch (kind) {
    case "diligence-compression":
      return /*#__PURE__*/React.createElement(StageCompressedTimeline, null);
    case "integration-hub":
      return /*#__PURE__*/React.createElement(StageHubDiagram, null);
    case "transition-phases":
      return /*#__PURE__*/React.createElement(StagePhaseBar, null);
    case "operation-grid":
      return /*#__PURE__*/React.createElement(StageGridDiagram, null);
    default:
      return null;
  }
}

// ── Section ─────────────────────────────────────────────────────────

function Lifecycle(_ref2) {
  var bp = _ref2.bp;
  var sm = bp === "sm";
  var L = window.AFFETTO && window.AFFETTO.lifecycle || {
    stages: []
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "lifecycle",
    style: {
      borderBottom: "1px solid var(--ink)",
      background: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingTop: sm ? 64 : 96,
      paddingBottom: sm ? 64 : 96
    }
  }, /*#__PURE__*/React.createElement(SectionMarker, {
    text: L.sectionMarker
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    className: "t-h2",
    style: {
      margin: "0 0 56px",
      color: "var(--ink)",
      textWrap: "balance",
      maxWidth: "30ch"
    }
  }, L.subhead)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      paddingLeft: sm ? 24 : 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: sm ? 8 : 16,
      top: 0,
      bottom: 0,
      width: 1,
      background: "var(--rule-soft)"
    }
  }), L.stages.map(function (s, i) {
    return /*#__PURE__*/React.createElement(Reveal, {
      key: s.number,
      delay: i * 80
    }, /*#__PURE__*/React.createElement("div", {
      "data-keep-together": "",
      style: {
        position: "relative",
        paddingTop: i === 0 ? 0 : sm ? 56 : 80,
        paddingBottom: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        left: sm ? -16 : -32,
        top: i === 0 ? 16 : sm ? 72 : 96,
        width: sm ? 16 : 32,
        height: 1,
        background: "var(--ink-3)",
        opacity: 0.6
      }
    }), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        left: sm ? -17 : -33,
        top: i === 0 ? 12 : sm ? 68 : 92,
        width: 8,
        height: 8,
        borderRadius: 99,
        background: "var(--ink)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: sm ? "1fr" : "5fr 7fr",
        gap: sm ? 24 : 48,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--display)",
        fontSize: sm ? 40 : 56,
        fontWeight: 500,
        letterSpacing: "-0.04em",
        lineHeight: 1.0,
        color: "var(--ink-3)"
      }
    }, s.number), /*#__PURE__*/React.createElement("h3", {
      className: "t-h2",
      style: {
        margin: 0,
        color: "var(--ink)",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        fontWeight: 500
      }
    }, s.name), /*#__PURE__*/React.createElement("p", {
      className: "t-bodylg",
      style: {
        margin: 0,
        color: "var(--ink-2)",
        textWrap: "pretty",
        maxWidth: "42ch"
      }
    }, s.line)), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--paper-2)",
        border: "1px solid var(--rule-soft)",
        padding: sm ? 16 : 20,
        height: sm ? 200 : 240,
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(StageSchematic, {
      kind: s.schematicType
    })))));
  }))));
}
window.Lifecycle = Lifecycle;
