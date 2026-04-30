"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// outcomes.jsx — v0.8.0
// Three rows. Each schematic redrawn from a clean canvas (480×240) with
// pixel-precise coordinates so the visual point lands within ~2 seconds.
//
// Schematic 01 — headcount divergence: 5x vertical separation by right edge.
// Schematic 02 — timeline compression: Affetto bar is exactly 50% of TRADITIONAL.
// Schematic 03 — bidirectional flow: substrate band as visual anchor with
//                arrows passing through it.

// ── Schematic 01 — Headcount divergence ─────────────────────────────

function OutcomeSchematicHeadcountDivergence() {
  var W = 480,
    H = 240;
  var PAD_L = 56,
    PAD_R = 110,
    PAD_T = 28,
    PAD_B = 40;
  var innerW = W - PAD_L - PAD_R;
  var innerH = H - PAD_T - PAD_B;

  // X axis: locations 1, 5, 10, 15, 20.
  // Y axis: headcount 0, 5, 10, 15, 20.
  var xVals = [1, 5, 10, 15, 20];
  var yVals = [0, 5, 10, 15, 20];

  // Map plot value (1..20 location, 0..20 headcount) to canvas coords.
  var xPx = function xPx(v) {
    return PAD_L + (v - 1) / 19 * innerW;
  };
  var yPx = function yPx(v) {
    return PAD_T + (1 - v / 20) * innerH;
  };

  // Traditional: roughly linear ascending, slight curve.
  var tradPts = [[1, 2], [5, 5], [10, 10], [15, 15], [20, 20]];
  // Affetto: nearly flat with marginal drift (~5x less than traditional at right edge).
  var affPts = [[1, 2], [5, 2.5], [10, 3], [15, 3.5], [20, 4]];
  var tradPath = tradPts.map(function (_ref, i) {
    var _ref2 = _slicedToArray(_ref, 2),
      x = _ref2[0],
      y = _ref2[1];
    return "".concat(i === 0 ? "M" : "L", " ").concat(xPx(x), " ").concat(yPx(y));
  }).join(" ");
  var affPath = affPts.map(function (_ref3, i) {
    var _ref4 = _slicedToArray(_ref3, 2),
      x = _ref4[0],
      y = _ref4[1];
    return "".concat(i === 0 ? "M" : "L", " ").concat(xPx(x), " ").concat(yPx(y));
  }).join(" ");
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true"
  }, yVals.map(function (v) {
    return /*#__PURE__*/React.createElement("line", {
      key: "gy".concat(v),
      x1: PAD_L,
      y1: yPx(v),
      x2: W - PAD_R,
      y2: yPx(v),
      stroke: "var(--rule-softer)",
      strokeWidth: "0.5"
    });
  }), yVals.map(function (v) {
    return /*#__PURE__*/React.createElement("text", {
      key: "yt".concat(v),
      x: PAD_L - 8,
      y: yPx(v) + 3,
      fontFamily: "var(--sans)",
      fontSize: "10",
      fill: "var(--ink-3)",
      textAnchor: "end"
    }, v);
  }), /*#__PURE__*/React.createElement("line", {
    x1: PAD_L,
    y1: H - PAD_B,
    x2: W - PAD_R,
    y2: H - PAD_B,
    stroke: "var(--ink-3)",
    strokeWidth: "1"
  }), xVals.map(function (v) {
    return /*#__PURE__*/React.createElement("g", {
      key: "xt".concat(v)
    }, /*#__PURE__*/React.createElement("line", {
      x1: xPx(v),
      y1: H - PAD_B,
      x2: xPx(v),
      y2: H - PAD_B + 4,
      stroke: "var(--ink-3)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: xPx(v),
      y: H - PAD_B + 16,
      fontFamily: "var(--sans)",
      fontSize: "10",
      fill: "var(--ink-3)",
      textAnchor: "middle"
    }, v));
  }), /*#__PURE__*/React.createElement("text", {
    x: (PAD_L + (W - PAD_R)) / 2,
    y: H - 6,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "500",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)",
    textAnchor: "middle"
  }, "LOCATIONS"), /*#__PURE__*/React.createElement("text", {
    x: 0,
    y: 0,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "500",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)",
    textAnchor: "middle",
    transform: "translate(14, ".concat(PAD_T + (H - PAD_T - PAD_B) / 2, ") rotate(-90)")
  }, "HEADCOUNT (FTEs)"), /*#__PURE__*/React.createElement("path", {
    d: tradPath,
    fill: "none",
    stroke: "var(--ink-3)",
    strokeWidth: "1.5",
    strokeDasharray: "4 4"
  }), tradPts.map(function (_ref5, i) {
    var _ref6 = _slicedToArray(_ref5, 2),
      x = _ref6[0],
      y = _ref6[1];
    return /*#__PURE__*/React.createElement("circle", {
      key: "tp".concat(i),
      cx: xPx(x),
      cy: yPx(y),
      r: "3",
      fill: "var(--ink-3)"
    });
  }), /*#__PURE__*/React.createElement("path", {
    d: affPath,
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "2"
  }), affPts.map(function (_ref7, i) {
    var _ref8 = _slicedToArray(_ref7, 2),
      x = _ref8[0],
      y = _ref8[1];
    return /*#__PURE__*/React.createElement("circle", {
      key: "ap".concat(i),
      cx: xPx(x),
      cy: yPx(y),
      r: "3",
      fill: "var(--ink)"
    });
  }), /*#__PURE__*/React.createElement("text", {
    x: xPx(20) + 8,
    y: yPx(20) + 4,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "500",
    letterSpacing: "0.06em",
    fill: "var(--ink)",
    textAnchor: "start"
  }, "TRADITIONAL"), /*#__PURE__*/React.createElement("text", {
    x: xPx(20) + 8,
    y: yPx(4) + 4,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "500",
    letterSpacing: "0.06em",
    fill: "var(--ink)",
    textAnchor: "start"
  }, "WITH AFFETTO"));
}

// ── Schematic 02 — Timeline compression ─────────────────────────────

function OutcomeSchematicTimelineCompression() {
  // Redrawn: labels live OUTSIDE the bars (above TRADITIONAL, below AFFETTO).
  // Bars become pure visual proportion — no text crammed into 5% segments.
  // Each label has a thin leader line dropping down/rising up to its segment.
  var W = 480,
    H = 240;
  var PAD_L = 24,
    PAD_R = 80;
  var innerW = W - PAD_L - PAD_R;
  var TRAD_LABEL_Y = 28; // labels for traditional, above bar
  var TRAD_BAR_Y = 76; // traditional bar
  var AFF_BAR_Y = 116; // Affetto bar
  var AFF_LABEL_Y = 168; // labels for Affetto, below bar
  var RULER_Y = 198;
  var BAR_H = 22;
  var tradSegments = [{
    label: "DILIGENCE",
    width: 0.10
  }, {
    label: "CLOSE",
    width: 0.05
  }, {
    label: "INTEGRATION",
    width: 0.35
  }, {
    label: "STABILIZE",
    width: 0.35
  }, {
    label: "STEADY",
    width: 0.15
  }];

  // Affetto same phase semantics, half the total duration.
  var affSegments = tradSegments;
  var tradWidthPx = innerW;
  var affWidthPx = innerW * 0.5;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true"
  }, function () {
    var x = PAD_L;
    return tradSegments.map(function (s, i) {
      var w = s.width * tradWidthPx;
      var cx = x + w / 2;
      x += w;
      // Stagger labels vertically so adjacent labels don't collide.
      // Even-indexed phases sit higher; odd-indexed phases sit lower.
      var labelY = i % 2 === 0 ? TRAD_LABEL_Y : TRAD_LABEL_Y + 14;
      var leaderTopY = labelY + 4;
      return /*#__PURE__*/React.createElement("g", {
        key: "tlabel".concat(i)
      }, /*#__PURE__*/React.createElement("text", {
        x: cx,
        y: labelY,
        fontFamily: "var(--sans)",
        fontSize: "9",
        fontWeight: "500",
        letterSpacing: "0.08em",
        fill: "var(--ink-2)",
        textAnchor: "middle"
      }, s.label), /*#__PURE__*/React.createElement("line", {
        x1: cx,
        y1: leaderTopY,
        x2: cx,
        y2: TRAD_BAR_Y - 2,
        stroke: "var(--ink-3)",
        strokeWidth: "0.5",
        strokeOpacity: "0.7"
      }));
    });
  }(), /*#__PURE__*/React.createElement("text", {
    x: PAD_L - 4,
    y: TRAD_BAR_Y + BAR_H / 2 + 4,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--ink)",
    textAnchor: "end"
  }, "TRAD."), function () {
    var x = PAD_L;
    return tradSegments.map(function (s, i) {
      var w = s.width * tradWidthPx;
      var seg = /*#__PURE__*/React.createElement("g", {
        key: "tbar".concat(i)
      }, /*#__PURE__*/React.createElement("rect", {
        x: x,
        y: TRAD_BAR_Y,
        width: w,
        height: BAR_H,
        fill: "var(--ink-3)"
      }), i < tradSegments.length - 1 && /*#__PURE__*/React.createElement("line", {
        x1: x + w,
        y1: TRAD_BAR_Y,
        x2: x + w,
        y2: TRAD_BAR_Y + BAR_H,
        stroke: "var(--paper)",
        strokeWidth: "1"
      }));
      x += w;
      return seg;
    });
  }(), /*#__PURE__*/React.createElement("text", {
    x: PAD_L + tradWidthPx + 8,
    y: TRAD_BAR_Y + BAR_H / 2 + 4,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "600",
    fill: "var(--ink)"
  }, "12 mo"), /*#__PURE__*/React.createElement("text", {
    x: PAD_L - 4,
    y: AFF_BAR_Y + BAR_H / 2 + 4,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--ink)",
    textAnchor: "end"
  }, "AFFETTO"), function () {
    var x = PAD_L;
    return affSegments.map(function (s, i) {
      var w = s.width * affWidthPx;
      var seg = /*#__PURE__*/React.createElement("g", {
        key: "abar".concat(i)
      }, /*#__PURE__*/React.createElement("rect", {
        x: x,
        y: AFF_BAR_Y,
        width: w,
        height: BAR_H,
        fill: "var(--ink)"
      }), i < affSegments.length - 1 && /*#__PURE__*/React.createElement("line", {
        x1: x + w,
        y1: AFF_BAR_Y,
        x2: x + w,
        y2: AFF_BAR_Y + BAR_H,
        stroke: "var(--paper)",
        strokeWidth: "1"
      }));
      x += w;
      return seg;
    });
  }(), /*#__PURE__*/React.createElement("text", {
    x: PAD_L + affWidthPx + 8,
    y: AFF_BAR_Y + BAR_H / 2 + 4,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "600",
    fill: "var(--ink)"
  }, "6 mo"), function () {
    var x = PAD_L;
    return affSegments.map(function (s, i) {
      var w = s.width * affWidthPx;
      var cx = x + w / 2;
      x += w;
      var labelY = i % 2 === 0 ? AFF_LABEL_Y : AFF_LABEL_Y + 14;
      // Hide labels for the smallest segments at this scale (CL at ~12px wide
      // can't be reasonably labeled even outside; we let TRAD row do that work).
      if (w < 18 && i % 2 === 1) return null;
      return /*#__PURE__*/React.createElement("g", {
        key: "alabel".concat(i)
      }, /*#__PURE__*/React.createElement("line", {
        x1: cx,
        y1: AFF_BAR_Y + BAR_H + 2,
        x2: cx,
        y2: labelY - 8,
        stroke: "var(--ink-3)",
        strokeWidth: "0.5",
        strokeOpacity: "0.7"
      }), /*#__PURE__*/React.createElement("text", {
        x: cx,
        y: labelY,
        fontFamily: "var(--sans)",
        fontSize: "8",
        fontWeight: "500",
        letterSpacing: "0.08em",
        fill: "var(--ink-2)",
        textAnchor: "middle"
      }, s.label));
    });
  }(), /*#__PURE__*/React.createElement("text", {
    x: PAD_L,
    y: H - 8,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--accent)"
  }, "\u2500\u2500 50% COMPRESSION \u2500\u2500"), /*#__PURE__*/React.createElement("line", {
    x1: PAD_L,
    y1: RULER_Y,
    x2: PAD_L + innerW,
    y2: RULER_Y,
    stroke: "var(--ink-3)",
    strokeWidth: "1"
  }), Array.from({
    length: 13
  }, function (_, i) {
    return i;
  }).map(function (m) {
    var x = PAD_L + m / 12 * innerW;
    return /*#__PURE__*/React.createElement("g", {
      key: "mr".concat(m)
    }, /*#__PURE__*/React.createElement("line", {
      x1: x,
      y1: RULER_Y,
      x2: x,
      y2: RULER_Y + 4,
      stroke: "var(--ink-3)",
      strokeWidth: "1"
    }), (m === 0 || m === 6 || m === 12) && /*#__PURE__*/React.createElement("text", {
      x: x,
      y: RULER_Y + 16,
      fontFamily: "var(--sans)",
      fontSize: "9",
      fill: "var(--ink-3)",
      textAnchor: "middle"
    }, "M", m));
  }));
}

// ── Schematic 03 — Bidirectional flow ────────────────────────────────

function OutcomeSchematicBidirectionalFlow() {
  var W = 480,
    H = 240;
  var PAD_X = 24;
  var TOP_RULE_Y = 64;
  var BAND_Y = 108,
    BAND_H = 28;
  var BOT_RULE_Y = 180;

  // 4 arrows top set + 4 arrows bottom set, evenly spaced
  var arrowXs = [110, 200, 290, 380];
  var ArrowDown = function ArrowDown(_ref9) {
    var x = _ref9.x,
      y1 = _ref9.y1,
      y2 = _ref9.y2;
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: x,
      y1: y1,
      x2: x,
      y2: y2,
      stroke: "var(--ink)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "".concat(x - 4, ",").concat(y2 - 4, " ").concat(x, ",").concat(y2, " ").concat(x + 4, ",").concat(y2 - 4),
      fill: "none",
      stroke: "var(--ink)",
      strokeWidth: "1"
    }));
  };
  var ArrowUp = function ArrowUp(_ref0) {
    var x = _ref0.x,
      y1 = _ref0.y1,
      y2 = _ref0.y2;
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: x,
      y1: y1,
      x2: x,
      y2: y2,
      stroke: "var(--ink)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "".concat(x - 4, ",").concat(y2 + 4, " ").concat(x, ",").concat(y2, " ").concat(x + 4, ",").concat(y2 + 4),
      fill: "none",
      stroke: "var(--ink)",
      strokeWidth: "1"
    }));
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("text", {
    x: PAD_X,
    y: TOP_RULE_Y - 10,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "500",
    letterSpacing: "0.10em",
    fill: "var(--ink)"
  }, "CORPORATE"), /*#__PURE__*/React.createElement("line", {
    x1: PAD_X,
    y1: TOP_RULE_Y,
    x2: W - PAD_X,
    y2: TOP_RULE_Y,
    stroke: "var(--ink)",
    strokeWidth: "1"
  }), arrowXs.map(function (x, i) {
    return i % 2 === 0 ? /*#__PURE__*/React.createElement(ArrowDown, {
      key: "tu".concat(i),
      x: x,
      y1: TOP_RULE_Y + 2,
      y2: BAND_Y - 2
    }) : /*#__PURE__*/React.createElement(ArrowUp, {
      key: "tu".concat(i),
      x: x,
      y1: BAND_Y - 2,
      y2: TOP_RULE_Y + 2
    });
  }), /*#__PURE__*/React.createElement("rect", {
    x: PAD_X,
    y: BAND_Y,
    width: W - PAD_X * 2,
    height: BAND_H,
    fill: "var(--paper-2)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: PAD_X,
    y1: BAND_Y,
    x2: W - PAD_X,
    y2: BAND_Y,
    stroke: "var(--accent)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: PAD_X,
    y1: BAND_Y + BAND_H,
    x2: W - PAD_X,
    y2: BAND_Y + BAND_H,
    stroke: "var(--accent)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: PAD_X + 12,
    y: BAND_Y + BAND_H / 2 + 4,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--accent)"
  }, "AFFETTO DATA SUBSTRATE"), /*#__PURE__*/React.createElement("text", {
    x: W - PAD_X - 12,
    y: BAND_Y + BAND_H / 2 + 4,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "500",
    letterSpacing: "0.06em",
    fill: "var(--accent)",
    textAnchor: "end"
  }, "v0.4.1"), arrowXs.map(function (x, i) {
    return i % 2 === 0 ? /*#__PURE__*/React.createElement(ArrowUp, {
      key: "bu".concat(i),
      x: x,
      y1: BOT_RULE_Y - 2,
      y2: BAND_Y + BAND_H + 2
    }) : /*#__PURE__*/React.createElement(ArrowDown, {
      key: "bu".concat(i),
      x: x,
      y1: BAND_Y + BAND_H + 2,
      y2: BOT_RULE_Y - 2
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: PAD_X,
    y1: BOT_RULE_Y,
    x2: W - PAD_X,
    y2: BOT_RULE_Y,
    stroke: "var(--ink)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: PAD_X,
    y: BOT_RULE_Y + 18,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "500",
    letterSpacing: "0.10em",
    fill: "var(--ink)"
  }, "PRACTICE FLOOR"));
}
function OutcomeSchematic(_ref1) {
  var type = _ref1.type;
  switch (type) {
    case "headcount-divergence":
      return /*#__PURE__*/React.createElement(OutcomeSchematicHeadcountDivergence, null);
    case "timeline-compression":
      return /*#__PURE__*/React.createElement(OutcomeSchematicTimelineCompression, null);
    case "bidirectional-flow":
      return /*#__PURE__*/React.createElement(OutcomeSchematicBidirectionalFlow, null);
    default:
      return null;
  }
}

// ── Section ─────────────────────────────────────────────────────────

function Outcomes(_ref10) {
  var bp = _ref10.bp;
  var sm = bp === "sm";
  var md = bp === "md";
  var stacked = sm || md;
  var O = window.AFFETTO && window.AFFETTO.outcomes || {
    rows: []
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderBottom: "1px solid var(--ink)",
      background: "var(--paper-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingTop: sm ? 64 : 96,
      paddingBottom: sm ? 64 : 96
    }
  }, /*#__PURE__*/React.createElement(SectionMarker, {
    text: O.sectionMarker
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    className: "t-h2",
    style: {
      margin: "0 0 56px",
      color: "var(--ink)",
      textWrap: "balance",
      maxWidth: "26ch"
    }
  }, O.subhead)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: sm ? 64 : 96
    }
  }, O.rows.map(function (row, i) {
    return /*#__PURE__*/React.createElement(Reveal, {
      key: row.number,
      delay: i * 80
    }, /*#__PURE__*/React.createElement("div", {
      "data-keep-together": "",
      style: {
        display: "grid",
        gridTemplateColumns: stacked ? "1fr" : "5fr 7fr",
        gap: stacked ? 32 : 48,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "t-micro",
      style: {
        color: "var(--ink-3)"
      }
    }, row.number), /*#__PURE__*/React.createElement("h3", {
      className: "t-h2",
      style: {
        margin: 0,
        color: "var(--ink)",
        textWrap: "balance"
      }
    }, row.statement), /*#__PURE__*/React.createElement("p", {
      className: "t-bodylg",
      style: {
        margin: 0,
        color: "var(--ink-2)",
        textWrap: "pretty",
        maxWidth: "44ch"
      }
    }, row.line)), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--paper)",
        border: "1px solid var(--rule-soft)",
        padding: sm ? 16 : 24,
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: sm ? 200 : 240,
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(OutcomeSchematic, {
      type: row.schematicType
    })), /*#__PURE__*/React.createElement("span", {
      className: "t-caption",
      style: {
        color: "var(--ink-3)",
        lineHeight: 1.4
      }
    }, row.schematicCaption))));
  }))));
}
window.Outcomes = Outcomes;
