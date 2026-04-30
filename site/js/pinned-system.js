"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// pinned-system.jsx — v0.10.0
// Cinematic pinned-scroll storytelling for §02 System. Replaces the static
// LivingTopology in the System section with a 5-beat continuous-transformation
// sequence that builds the L0→L1→L2→L3 architecture as the reader scrolls.
//
// Two scroll drivers, one set of beat animations:
//   Desktop (lg):  pinned-scroll. Section locks to viewport; scroll progress
//                  drives beat transformations; section unpins after 1.0.
//   Mobile/tablet: viewport-relative. Section scrolls normally; beats trigger
//                  as the section moves through the viewport.
//
// Same render logic for both — only the progress source differs. The
// component receives a 0.0–1.0 number; how it gets there is the driver's
// problem.
//
// Performance discipline:
//   - rAF-throttled scroll listener (single update per frame, not per event)
//   - transform/opacity only in animation paths (GPU-accelerated)
//   - no layout-thrashing reads inside the render loop
//   - prefers-reduced-motion → renders end-state immediately, no animation

var _React = React,
  useStPS = _React.useState,
  useEfPS = _React.useEffect,
  useRfPS = _React.useRef,
  useCbPS = _React.useCallback;

// ─── Math helpers ───────────────────────────────────────────────────

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

// Linear interpolation between a and b at progress t (0..1).
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Map a value from one range to another, clamped to [0, 1] of the output range.
function mapRange(x, inMin, inMax) {
  var outMin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var outMax = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  if (inMax === inMin) return outMin;
  var t = clamp01((x - inMin) / (inMax - inMin));
  return outMin + (outMax - outMin) * t;
}

// Cubic ease-in-out for natural-feeling transitions.
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── Scroll-progress hooks ──────────────────────────────────────────

// Desktop: pinned-scroll progress. While the wrapper element's top is at or
// above the viewport top AND its bottom is below viewport bottom + pinDistance,
// the inner content is sticky-pinned and progress goes 0 → 1 across the
// pinDistance scroll range.
//
// Implementation: rather than locking via scroll events (janky), we rely on
// CSS sticky-positioning and just measure progress. The wrapper has height
// (1 + pinDistance) viewports; the inner content uses position:sticky and
// stays fixed during the middle of the scroll. Progress = how far the wrapper
// has scrolled through the pin range.
function usePinnedProgress(wrapperRef) {
  var pinViewports = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2.5;
  var _useStPS = useStPS(0),
    _useStPS2 = _slicedToArray(_useStPS, 2),
    progress = _useStPS2[0],
    setProgress = _useStPS2[1];
  var _useStPS3 = useStPS("before"),
    _useStPS4 = _slicedToArray(_useStPS3, 2),
    phase = _useStPS4[0],
    setPhase = _useStPS4[1]; // before | pinned | after
  var rafRef = useRfPS(null);
  var lastScrollY = useRfPS(0);
  var update = useCbPS(function () {
    var el = wrapperRef.current;
    if (!el) return;
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight;
    var wrapperTop = rect.top;
    var wrapperHeight = rect.height;

    // The pin range begins when wrapperTop reaches 0 and ends when it reaches
    // -(wrapperHeight - vh). Scroll progress within that range maps 0→1.
    var pinStart = 0;
    var pinEnd = -(wrapperHeight - vh);
    if (wrapperTop >= pinStart) {
      setProgress(0);
      setPhase("before");
    } else if (wrapperTop <= pinEnd) {
      setProgress(1);
      setPhase("after");
    } else {
      var t = (pinStart - wrapperTop) / (pinStart - pinEnd);
      setProgress(clamp01(t));
      setPhase("pinned");
    }
  }, [wrapperRef]);
  useEfPS(function () {
    var onScroll = function onScroll() {
      lastScrollY.current = window.scrollY;
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(function () {
        rafRef.current = null;
        update();
      });
    };
    update();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", update);
    return function () {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);
  return [progress, phase];
}

// Mobile: viewport-relative progress. Returns 0 when section's top is at the
// viewport bottom, 1 when section's bottom is at the viewport top. Smooth
// linear progress as section moves through viewport.
function useViewportProgress(elRef) {
  var _useStPS5 = useStPS(0),
    _useStPS6 = _slicedToArray(_useStPS5, 2),
    progress = _useStPS6[0],
    setProgress = _useStPS6[1];
  var rafRef = useRfPS(null);
  var update = useCbPS(function () {
    var el = elRef.current;
    if (!el) return;
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight;
    // Section enters viewport when top = vh; fully through when bottom = 0.
    var total = rect.height + vh;
    var traveled = vh - rect.top;
    setProgress(clamp01(traveled / total));
  }, [elRef]);
  useEfPS(function () {
    var onScroll = function onScroll() {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(function () {
        rafRef.current = null;
        update();
      });
    };
    update();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", update);
    return function () {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);
  return progress;
}

// ─── Beat constants ─────────────────────────────────────────────────
// Beat boundaries (global progress 0..1).
var BEAT = {
  L0_START: 0.00,
  L0_END: 0.18,
  L1_START: 0.18,
  L1_END: 0.38,
  L2_START: 0.38,
  L2_END: 0.58,
  L3_START: 0.58,
  L3_END: 0.82,
  PULSE_START: 0.78,
  PULSE_END: 0.88,
  CODA_START: 0.85,
  CODA_END: 1.00
};

// L0 source labels — three boxes that fade in with stagger.
var L0_SOURCES = [{
  label: "DENTRIX",
  revealAt: 0.02
}, {
  label: "EAGLESOFT",
  revealAt: 0.06
}, {
  label: "OPEN DENTAL",
  revealAt: 0.10
}];

// L3 agent grid — 9 cells lighting up sequentially.
var L3_AGENTS_ORDER = ["TRT", "RCM", "FIN", "PAT", "SCH", "CMP", "PPL", "MKT", "PRC"];

// ─── Topology renderer (parameterized by progress) ──────────────────
//
// Coordinate system: a 1200x520 viewBox. Layers occupy horizontal bands.
//
//   L0 column @ x=80,   y=80..360,  width=180
//   L1 box    @ x=340,  y=200..280, width=180
//   L2 band   @ x=580,  y=220..260, full-width to x=1120
//   L3 grid   @ x=620,  y=130..330, 480x200, 3x3 cells

function AssemblingTopology(_ref) {
  var progress = _ref.progress,
    sm = _ref.sm;
  var W = sm ? 360 : 1200;
  var H = sm ? 720 : 520;

  // ── L0 progress + per-box stagger ──
  var l0OuterT = easeInOutCubic(mapRange(progress, BEAT.L0_START, BEAT.L0_END));
  var l0Boxes = L0_SOURCES.map(function (s) {
    return {
      label: s.label,
      t: easeInOutCubic(mapRange(progress, s.revealAt, s.revealAt + 0.06))
    };
  });

  // ── L1 progress + line draws ──
  var l1OuterT = easeInOutCubic(mapRange(progress, BEAT.L1_START, BEAT.L1_END));
  // Three lines from L0 boxes to L1, each with own stagger
  var l1Lines = [easeInOutCubic(mapRange(progress, 0.22, 0.30)), easeInOutCubic(mapRange(progress, 0.26, 0.34)), easeInOutCubic(mapRange(progress, 0.30, 0.38))];

  // ── L2 progress + horizontal band scale + scan line ──
  var l2BandT = easeInOutCubic(mapRange(progress, BEAT.L2_START, 0.50));
  var l2LabelT = easeInOutCubic(mapRange(progress, 0.48, 0.55));
  var l2LineT = easeInOutCubic(mapRange(progress, 0.45, 0.55));
  // Scan-line sweep — single pass across the substrate at progress 0.50–0.58
  var l2ScanT = mapRange(progress, 0.50, 0.58);
  var l2ScanActive = l2ScanT > 0 && l2ScanT < 1;

  // ── L3 progress + per-cell stagger ──
  var l3OuterT = easeInOutCubic(mapRange(progress, BEAT.L3_START, 0.66));
  var l3LineT = easeInOutCubic(mapRange(progress, 0.62, 0.68));
  var l3CellT = L3_AGENTS_ORDER.map(function (_, i) {
    var cellStart = 0.62 + i * 0.018;
    return easeInOutCubic(mapRange(progress, cellStart, cellStart + 0.04));
  });

  // ── End-state pulse animation (after assembly complete) ──
  var pulseT = mapRange(progress, BEAT.PULSE_START, BEAT.PULSE_END);
  var pulseActive = pulseT > 0;

  // ── Layout coordinates (desktop) ──
  // L0 column
  var L0_X = 80,
    L0_W = 180;
  var L0_BOX_H = 56;
  var L0_GAP = 16;
  var L0_TOTAL_H = L0_SOURCES.length * L0_BOX_H + (L0_SOURCES.length - 1) * L0_GAP;
  var L0_Y_START = (H - L0_TOTAL_H) / 2;

  // L1 connector
  var L1_X = 340,
    L1_W = 180;
  var L1_H = 84;
  var L1_Y = (H - L1_H) / 2;

  // L2 contract band
  var L2_X = 580,
    L2_W = 540;
  var L2_H = 56;
  var L2_Y = (H - L2_H) / 2;

  // L3 agent grid
  var L3_X = 620,
    L3_Y = 110;
  var L3_W = 480,
    L3_H = 300;
  var L3_COLS = 3,
    L3_ROWS = 3;
  var L3_CELL_W = L3_W / L3_COLS;
  var L3_CELL_H = L3_H / L3_ROWS;

  // L0 box position — used both for box draw and for line endpoints.
  var l0Pos = function l0Pos(i) {
    return {
      x: L0_X,
      y: L0_Y_START + i * (L0_BOX_H + L0_GAP),
      cx: L0_X + L0_W / 2,
      cy: L0_Y_START + i * (L0_BOX_H + L0_GAP) + L0_BOX_H / 2,
      rightEdge: L0_X + L0_W
    };
  };

  // Mobile uses an entirely different vertical layout
  if (sm) {
    return /*#__PURE__*/React.createElement(AssemblingTopologyMobile, {
      progress: progress
    });
  }
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    preserveAspectRatio: "xMidYMid meet",
    style: {
      display: "block",
      height: "auto",
      maxHeight: "100%"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("g", {
    opacity: l0OuterT
  }, /*#__PURE__*/React.createElement("text", {
    x: L0_X,
    y: L0_Y_START - 24,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)"
  }, "L0 \xB7 SOURCE")), /*#__PURE__*/React.createElement("g", {
    opacity: l1OuterT
  }, /*#__PURE__*/React.createElement("text", {
    x: L1_X,
    y: L1_Y - 24,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)"
  }, "L1 \xB7 CONNECTORS")), /*#__PURE__*/React.createElement("g", {
    opacity: l2BandT
  }, /*#__PURE__*/React.createElement("text", {
    x: L2_X,
    y: L2_Y - 24,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)"
  }, "L2 \xB7 DATA CONTRACT")), /*#__PURE__*/React.createElement("g", {
    opacity: l3OuterT
  }, /*#__PURE__*/React.createElement("text", {
    x: L3_X,
    y: L3_Y - 16,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)"
  }, "L3 \xB7 ENGINE \xB7 9 AGENTS")), /*#__PURE__*/React.createElement("line", {
    x1: L1_X + L1_W,
    y1: L1_Y + L1_H / 2,
    x2: L1_X + L1_W + (L2_X - L1_X - L1_W) * l2LineT,
    y2: L2_Y + L2_H / 2,
    stroke: "var(--ink-2)",
    strokeWidth: "1",
    opacity: l2LineT > 0 ? 1 : 0
  }), /*#__PURE__*/React.createElement("line", {
    x1: L2_X + L2_W,
    y1: L2_Y + L2_H / 2,
    x2: L2_X + L2_W + (L3_X - L2_X - L2_W) * l3LineT,
    y2: L3_Y + L3_H / 2,
    stroke: "var(--ink-2)",
    strokeWidth: "1",
    opacity: l3LineT > 0 ? 1 : 0
  }), l0Boxes.map(function (_, i) {
    var start = l0Pos(i);
    var t = l1Lines[i];
    var endX = start.rightEdge + (L1_X - start.rightEdge) * t;
    var endY = start.cy + (L1_Y + L1_H / 2 - start.cy) * t;
    return /*#__PURE__*/React.createElement("line", {
      key: "l01-".concat(i),
      x1: start.rightEdge,
      y1: start.cy,
      x2: endX,
      y2: endY,
      stroke: "var(--ink-2)",
      strokeWidth: "1",
      opacity: t > 0 ? 1 : 0
    });
  }), l0Boxes.map(function (box, i) {
    var pos = l0Pos(i);
    return /*#__PURE__*/React.createElement("g", {
      key: "l0-".concat(i),
      opacity: box.t,
      transform: "translate(0, ".concat((1 - box.t) * 12, ")")
    }, /*#__PURE__*/React.createElement("rect", {
      x: pos.x,
      y: pos.y,
      width: L0_W,
      height: L0_BOX_H,
      fill: "none",
      stroke: "var(--ink-2)",
      strokeWidth: "1",
      strokeDasharray: "3 3"
    }), /*#__PURE__*/React.createElement("text", {
      x: pos.cx,
      y: pos.cy + 4,
      fontFamily: "var(--sans)",
      fontSize: "13",
      fontWeight: "500",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      fill: "var(--ink)",
      textAnchor: "middle"
    }, box.label));
  }), /*#__PURE__*/React.createElement("g", {
    opacity: l1OuterT,
    transform: "translate(".concat(L1_X + L1_W / 2, ", ").concat(L1_Y + L1_H / 2, ") scale(").concat(lerp(0.95, 1.0, l1OuterT), ") translate(").concat(-(L1_X + L1_W / 2), ", ").concat(-(L1_Y + L1_H / 2), ")")
  }, /*#__PURE__*/React.createElement("rect", {
    x: L1_X,
    y: L1_Y,
    width: L1_W,
    height: L1_H,
    fill: "var(--paper)",
    stroke: "var(--ink)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: L1_X + L1_W / 2,
    y: L1_Y + L1_H / 2 - 4,
    fontFamily: "var(--sans)",
    fontSize: "13",
    fontWeight: "600",
    fill: "var(--ink)",
    textAnchor: "middle"
  }, "Adapter layer"), /*#__PURE__*/React.createElement("text", {
    x: L1_X + L1_W / 2,
    y: L1_Y + L1_H / 2 + 16,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "500",
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    fill: "var(--ink-3)",
    textAnchor: "middle"
  }, "Vendor-agnostic")), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    x: L2_X,
    y: L2_Y,
    width: L2_W * l2BandT,
    height: L2_H,
    fill: "var(--paper-2)",
    stroke: "var(--ink)",
    strokeWidth: "1",
    opacity: l2BandT
  }), l2ScanActive && /*#__PURE__*/React.createElement("rect", {
    x: L2_X + L2_W * l2ScanT - 4,
    y: L2_Y,
    width: "8",
    height: L2_H,
    fill: "var(--accent)",
    opacity: Math.sin(l2ScanT * Math.PI) * 0.6
  }), /*#__PURE__*/React.createElement("g", {
    opacity: l2LabelT
  }, /*#__PURE__*/React.createElement("text", {
    x: L2_X + L2_W / 2,
    y: L2_Y + L2_H / 2 - 2,
    fontFamily: "var(--sans)",
    fontSize: "13",
    fontWeight: "600",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fill: "var(--ink)",
    textAnchor: "middle"
  }, "Schema \xB7 v0.4.1"), /*#__PURE__*/React.createElement("text", {
    x: L2_X + L2_W / 2,
    y: L2_Y + L2_H / 2 + 16,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "400",
    letterSpacing: "0.04em",
    fill: "var(--ink-3)",
    textAnchor: "middle"
  }, "patient \xB7 appointment \xB7 claim \xB7 production \xB7 payer"))), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    x: L3_X,
    y: L3_Y,
    width: L3_W,
    height: L3_H,
    fill: "none",
    stroke: "var(--ink-3)",
    strokeWidth: "0.5",
    strokeDasharray: "2 4",
    opacity: l3OuterT * 0.5
  }), L3_AGENTS_ORDER.map(function (code, i) {
    var r = Math.floor(i / L3_COLS);
    var c = i % L3_COLS;
    var x = L3_X + c * L3_CELL_W;
    var y = L3_Y + r * L3_CELL_H;
    var t = l3CellT[i];
    var cx = x + L3_CELL_W / 2;
    var cy = y + L3_CELL_H / 2;
    // End-state pulse: subtle glow oscillation post-assembly
    var pulseOpacity = pulseActive ? 0.04 + 0.04 * Math.sin(pulseT * Math.PI * 2 + i * 0.4) : 0;
    return /*#__PURE__*/React.createElement("g", {
      key: code,
      opacity: t
    }, /*#__PURE__*/React.createElement("rect", {
      x: x + 4,
      y: y + 4,
      width: L3_CELL_W - 8,
      height: L3_CELL_H - 8,
      fill: "var(--paper)",
      stroke: "var(--ink)",
      strokeWidth: "1"
    }), pulseActive && /*#__PURE__*/React.createElement("rect", {
      x: x + 4,
      y: y + 4,
      width: L3_CELL_W - 8,
      height: L3_CELL_H - 8,
      fill: "var(--accent)",
      opacity: pulseOpacity
    }), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: cy + 5,
      fontFamily: "var(--mono)",
      fontSize: "14",
      fontWeight: "600",
      letterSpacing: "0.04em",
      textAnchor: "middle",
      fill: "var(--ink)"
    }, code));
  })), /*#__PURE__*/React.createElement("g", {
    opacity: easeInOutCubic(mapRange(progress, BEAT.CODA_START, BEAT.CODA_END))
  }, /*#__PURE__*/React.createElement("text", {
    x: W - 80,
    y: H - 20,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "500",
    letterSpacing: "0.10em",
    textAnchor: "end",
    fill: "var(--ink-3)"
  }, "ENGINE / AFFETTO 0.10.0 \xB7 LIVE")));
}

// ─── Mobile-specific layout (vertical) ──────────────────────────────
// Vertical column. Layers stack top-to-bottom: L0 → L1 → L2 → L3.
// Same 5-beat sequence, vertical orientation.

function AssemblingTopologyMobile(_ref2) {
  var progress = _ref2.progress;
  var W = 360,
    H = 720;
  var l0OuterT = easeInOutCubic(mapRange(progress, BEAT.L0_START, BEAT.L0_END));
  var l0Boxes = L0_SOURCES.map(function (s) {
    return {
      label: s.label,
      t: easeInOutCubic(mapRange(progress, s.revealAt, s.revealAt + 0.06))
    };
  });
  var l1OuterT = easeInOutCubic(mapRange(progress, BEAT.L1_START, BEAT.L1_END));
  var l01LineT = easeInOutCubic(mapRange(progress, 0.22, 0.32));
  var l2BandT = easeInOutCubic(mapRange(progress, BEAT.L2_START, 0.50));
  var l2LabelT = easeInOutCubic(mapRange(progress, 0.48, 0.55));
  var l12LineT = easeInOutCubic(mapRange(progress, 0.42, 0.50));
  var l3OuterT = easeInOutCubic(mapRange(progress, BEAT.L3_START, 0.66));
  var l23LineT = easeInOutCubic(mapRange(progress, 0.60, 0.66));
  var l3CellT = L3_AGENTS_ORDER.map(function (_, i) {
    var cellStart = 0.62 + i * 0.018;
    return easeInOutCubic(mapRange(progress, cellStart, cellStart + 0.04));
  });
  var codaT = easeInOutCubic(mapRange(progress, BEAT.CODA_START, BEAT.CODA_END));

  // Vertical layout: each layer is a horizontal band stacked.
  var L0_Y = 60,
    L0_H = 80;
  var L1_Y = 200,
    L1_H = 60;
  var L2_Y = 320,
    L2_H = 50;
  var L3_Y = 420,
    L3_H = 240;
  var COL_X = 40,
    COL_W = W - 80;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    preserveAspectRatio: "xMidYMid meet",
    style: {
      display: "block",
      height: "auto",
      maxHeight: "100%"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("g", {
    opacity: l0OuterT
  }, /*#__PURE__*/React.createElement("text", {
    x: COL_X,
    y: L0_Y - 12,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)"
  }, "L0 \xB7 SOURCE"), /*#__PURE__*/React.createElement("g", null, l0Boxes.map(function (box, i) {
    var boxW = (COL_W - 16) / 3;
    var x = COL_X + i * (boxW + 8);
    return /*#__PURE__*/React.createElement("g", {
      key: i,
      opacity: box.t
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: L0_Y,
      width: boxW,
      height: L0_H,
      fill: "none",
      stroke: "var(--ink-2)",
      strokeWidth: "1",
      strokeDasharray: "3 3"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + boxW / 2,
      y: L0_Y + L0_H / 2 + 4,
      fontFamily: "var(--sans)",
      fontSize: "10",
      fontWeight: "500",
      letterSpacing: "0.04em",
      fill: "var(--ink)",
      textAnchor: "middle"
    }, box.label));
  }))), /*#__PURE__*/React.createElement("line", {
    x1: W / 2,
    y1: L0_Y + L0_H,
    x2: W / 2,
    y2: L0_Y + L0_H + (L1_Y - L0_Y - L0_H) * l01LineT,
    stroke: "var(--ink-2)",
    strokeWidth: "1",
    opacity: l01LineT > 0 ? 1 : 0
  }), /*#__PURE__*/React.createElement("g", {
    opacity: l1OuterT
  }, /*#__PURE__*/React.createElement("text", {
    x: COL_X,
    y: L1_Y - 12,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)"
  }, "L1 \xB7 CONNECTORS"), /*#__PURE__*/React.createElement("rect", {
    x: COL_X,
    y: L1_Y,
    width: COL_W,
    height: L1_H,
    fill: "var(--paper)",
    stroke: "var(--ink)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: W / 2,
    y: L1_Y + L1_H / 2 - 2,
    fontFamily: "var(--sans)",
    fontSize: "12",
    fontWeight: "600",
    fill: "var(--ink)",
    textAnchor: "middle"
  }, "Adapter layer"), /*#__PURE__*/React.createElement("text", {
    x: W / 2,
    y: L1_Y + L1_H / 2 + 14,
    fontFamily: "var(--sans)",
    fontSize: "9",
    fontWeight: "500",
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    fill: "var(--ink-3)",
    textAnchor: "middle"
  }, "Vendor-agnostic")), /*#__PURE__*/React.createElement("line", {
    x1: W / 2,
    y1: L1_Y + L1_H,
    x2: W / 2,
    y2: L1_Y + L1_H + (L2_Y - L1_Y - L1_H) * l12LineT,
    stroke: "var(--ink-2)",
    strokeWidth: "1",
    opacity: l12LineT > 0 ? 1 : 0
  }), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("text", {
    x: COL_X,
    y: L2_Y - 12,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)",
    opacity: l2BandT
  }, "L2 \xB7 DATA CONTRACT"), /*#__PURE__*/React.createElement("rect", {
    x: COL_X,
    y: L2_Y,
    width: COL_W * l2BandT,
    height: L2_H,
    fill: "var(--paper-2)",
    stroke: "var(--ink)",
    strokeWidth: "1",
    opacity: l2BandT
  }), /*#__PURE__*/React.createElement("g", {
    opacity: l2LabelT
  }, /*#__PURE__*/React.createElement("text", {
    x: W / 2,
    y: L2_Y + L2_H / 2 - 2,
    fontFamily: "var(--sans)",
    fontSize: "11",
    fontWeight: "600",
    fill: "var(--ink)",
    textAnchor: "middle"
  }, "Schema \xB7 v0.4.1"), /*#__PURE__*/React.createElement("text", {
    x: W / 2,
    y: L2_Y + L2_H / 2 + 14,
    fontFamily: "var(--sans)",
    fontSize: "8",
    fontWeight: "400",
    fill: "var(--ink-3)",
    textAnchor: "middle"
  }, "patient \xB7 appointment \xB7 claim \xB7 production \xB7 payer"))), /*#__PURE__*/React.createElement("line", {
    x1: W / 2,
    y1: L2_Y + L2_H,
    x2: W / 2,
    y2: L2_Y + L2_H + (L3_Y - L2_Y - L2_H) * l23LineT,
    stroke: "var(--ink-2)",
    strokeWidth: "1",
    opacity: l23LineT > 0 ? 1 : 0
  }), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("text", {
    x: COL_X,
    y: L3_Y - 12,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)",
    opacity: l3OuterT
  }, "L3 \xB7 ENGINE \xB7 9 AGENTS"), L3_AGENTS_ORDER.map(function (code, i) {
    var r = Math.floor(i / 3),
      c = i % 3;
    var cellW = COL_W / 3;
    var cellH = L3_H / 3;
    var x = COL_X + c * cellW;
    var y = L3_Y + r * cellH;
    return /*#__PURE__*/React.createElement("g", {
      key: code,
      opacity: l3CellT[i]
    }, /*#__PURE__*/React.createElement("rect", {
      x: x + 3,
      y: y + 3,
      width: cellW - 6,
      height: cellH - 6,
      fill: "var(--paper)",
      stroke: "var(--ink)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + cellW / 2,
      y: y + cellH / 2 + 4,
      fontFamily: "var(--mono)",
      fontSize: "11",
      fontWeight: "600",
      letterSpacing: "0.04em",
      fill: "var(--ink)",
      textAnchor: "middle"
    }, code));
  })), /*#__PURE__*/React.createElement("text", {
    x: W - 40,
    y: H - 20,
    fontFamily: "var(--sans)",
    fontSize: "9",
    fontWeight: "500",
    letterSpacing: "0.10em",
    textAnchor: "end",
    fill: "var(--ink-3)",
    opacity: codaT
  }, "ENGINE / AFFETTO 0.10.0 \xB7 LIVE"));
}

// ─── Section composition ─────────────────────────────────────────────

function PinnedSystem(_ref3) {
  var bp = _ref3.bp;
  var sm = bp === "sm";
  var md = bp === "md";
  var useMobileFlow = sm || md;
  var reduced = usePrefersReducedMotion();
  var wrapperRef = useRfPS(null);
  var sectionRef = useRfPS(null);

  // Two scroll drivers, picked by viewport.
  // Note: hooks must always be called unconditionally; they internally
  // measure the same wrapperRef but interpret it differently.
  var _usePinnedProgress = usePinnedProgress(wrapperRef, 2.5),
    _usePinnedProgress2 = _slicedToArray(_usePinnedProgress, 1),
    pinnedProgress = _usePinnedProgress2[0];
  var viewportProgress = useViewportProgress(sectionRef);

  // Pick the active progress source based on viewport.
  // If reduced motion is on, jump to end-state immediately.
  var progress;
  if (reduced) {
    progress = 1.0;
  } else if (useMobileFlow) {
    progress = viewportProgress;
  } else {
    progress = pinnedProgress;
  }
  var S = window.AFFETTO && window.AFFETTO.system || {};

  // Pin distance: 2.5 viewport heights of pinned scroll for the desktop
  // experience. Translates to ~2 seconds of scroll at typical reading pace.
  var PIN_VH = 2.5;

  // Mobile: render section normally, viewport-driven progress.
  if (useMobileFlow) {
    return /*#__PURE__*/React.createElement("section", {
      id: "system",
      ref: sectionRef,
      style: {
        borderTop: "1px solid var(--ink)",
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
      text: S.sectionMarker
    }), /*#__PURE__*/React.createElement("h2", {
      className: "t-h1",
      style: {
        margin: "0 0 32px",
        color: "var(--ink)",
        textWrap: "balance",
        maxWidth: "26ch"
      }
    }, S.subhead), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--paper)",
        border: "1px solid var(--rule-soft)",
        padding: 16,
        margin: "0 auto",
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(AssemblingTopology, {
      progress: progress,
      sm: true
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        display: "flex",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "t-micro",
      style: {
        color: "var(--ink-3)"
      }
    }, S.liveCaption)), /*#__PURE__*/React.createElement("blockquote", {
      className: "what-this-means",
      style: {
        margin: sm ? "40px 0 0" : "56px 0 0",
        paddingLeft: sm ? 16 : 20,
        borderLeft: "2px solid var(--accent)",
        maxWidth: 680
      }
    }, /*#__PURE__*/React.createElement("p", {
      className: "t-bodylg",
      style: {
        margin: 0,
        color: "var(--ink)",
        textWrap: "pretty"
      }
    }, S.whatThisMeansBeat))));
  }

  // Desktop: pinned-scroll rendering.
  return /*#__PURE__*/React.createElement("section", {
    id: "system",
    ref: wrapperRef,
    style: {
      borderTop: "1px solid var(--ink)",
      borderBottom: "1px solid var(--ink)",
      background: "var(--paper-2)",
      height: "calc(".concat(PIN_VH * 100, "vh + 100vh)"),
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      paddingTop: 24,
      paddingBottom: 24,
      maxHeight: "100vh",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(SectionMarker, {
    text: S.sectionMarker
  }), /*#__PURE__*/React.createElement("h2", {
    className: "t-h1",
    style: {
      margin: 0,
      color: "var(--ink)",
      textWrap: "balance",
      maxWidth: "26ch"
    }
  }, S.subhead), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 0,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 1200,
      maxHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement(AssemblingTopology, {
    progress: progress,
    sm: false
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: easeInOutCubic(mapRange(progress, BEAT.CODA_START, BEAT.CODA_END)),
      transform: "translateY(".concat((1 - easeInOutCubic(mapRange(progress, BEAT.CODA_START, BEAT.CODA_END))) * 12, "px)"),
      transition: "none"
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    className: "what-this-means",
    style: {
      margin: 0,
      paddingLeft: 20,
      borderLeft: "2px solid var(--accent)",
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "18px",
      lineHeight: 1.5,
      color: "var(--ink)",
      textWrap: "pretty"
    }
  }, S.whatThisMeansBeat))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 16,
      right: 24,
      display: "flex",
      alignItems: "center",
      gap: 12,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, S.liveCaption)))));
}
window.PinnedSystem = PinnedSystem;
