"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// live-engine.jsx — v0.9.0
// New section §02b · Live engine. Sits between §02 System (architecture
// view) and §03 Forces (strategic argument). Shows the system in motion
// as an operational artifact: orbital topology of 9 agents on the left,
// scrolling output stream + metrics on the right.
//
// Design intent: §02 is "how it's built" — layered architecture with L0–L3.
// §02b is "how it runs" — operational view, agents handing off work, output
// streaming, system telemetry. Together they convert the page from "claims
// with proof points" to "credible operational artifact."
//
// All data is synthetic. The section header says so explicitly to preserve
// credibility with sophisticated buyers.

var _React = React,
  useStE = _React.useState,
  useEfE = _React.useEffect,
  useRfE = _React.useRef;

// ─── Utilities ──────────────────────────────────────────────────────

// Format a Date object as HH:MM:SS in 24-hour zero-padded form.
function fmtTime(d) {
  var pad = function pad(n) {
    return String(n).padStart(2, "0");
  };
  return "".concat(pad(d.getHours()), ":").concat(pad(d.getMinutes()), ":").concat(pad(d.getSeconds()));
}

// Pre-built stream entries grow incrementally over time. Each entry needs
// a timestamp that decreases as we scroll back through history.
// Approach: anchor "now" to the current real clock; subtract a few seconds
// per entry to back-date older entries plausibly.
function buildInitialStream(pool) {
  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 14;
  var now = new Date();
  var entries = [];
  for (var i = 0; i < count; i++) {
    var age = i * 2.5 + Math.random() * 1.5; // seconds back
    var t = new Date(now.getTime() - age * 1000);
    var item = pool[Math.floor(Math.random() * pool.length)];
    entries.push({
      id: "init-".concat(i, "-").concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 6)),
      time: fmtTime(t),
      code: item.code,
      action: item.action
    });
  }
  return entries;
}

// ─── Orbital topology (left column) ─────────────────────────────────

function OrbitalTopology(_ref) {
  var _window$AFFETTO;
  var active = _ref.active;
  // 9 agents arranged on a circle around a central engine node.
  // Edges connect every pair of agents (sparse handoff network).
  // Pulses travel along a subset of edges in a slow, deterministic loop.
  var W = 480,
    H = 480;
  var cx = W / 2,
    cy = H / 2;
  var ringR = 175; // distance from center to agent nodes
  var labelRingR = 215; // distance from center to agent name labels
  var reduced = usePrefersReducedMotion();
  var t = useHeartbeat(8000, active && !reduced);
  var agents = ((_window$AFFETTO = window.AFFETTO) === null || _window$AFFETTO === void 0 || (_window$AFFETTO = _window$AFFETTO.agents) === null || _window$AFFETTO === void 0 ? void 0 : _window$AFFETTO.agents) || [];
  // Map each agent to a polar angle, starting at -90° (top) clockwise.
  var placed = agents.slice(0, 9).map(function (a, i) {
    var angle = (-90 + i * (360 / 9)) * Math.PI / 180;
    return _objectSpread(_objectSpread({}, a), {}, {
      angle: angle,
      x: cx + ringR * Math.cos(angle),
      y: cy + ringR * Math.sin(angle),
      labelX: cx + labelRingR * Math.cos(angle),
      labelY: cy + labelRingR * Math.sin(angle)
    });
  });

  // Define a sparse handoff network — not all-to-all (would look like noise).
  // Selected edges represent realistic cross-agent coordination patterns.
  var edges = [[0, 1], [0, 4], [0, 7],
  // TRT → RCM, SCH, MKT
  [1, 2], [1, 3],
  // RCM → FIN, PAT
  [2, 3], [2, 6],
  // FIN → PAT, PPL
  [3, 4], [3, 7],
  // PAT → SCH, MKT
  [4, 6], [4, 8],
  // SCH → PPL, PRC
  [5, 6], [5, 8],
  // CMP → PPL, PRC
  [6, 7],
  // PPL → MKT
  [7, 8],
  // MKT → PRC
  [0, 5], [1, 5] // TRT/RCM → CMP
  ];

  // 3 pulses cycling through the edge set, staggered.
  var pulses = [{
    offset: 0.00,
    edgeIdx: 0
  }, {
    offset: 0.33,
    edgeIdx: 5
  }, {
    offset: 0.66,
    edgeIdx: 11
  }].map(function (p) {
    var phase = (t + p.offset) % 1;
    // Map phase 0..1 over the entire edge set: each edge gets ~1/N of the cycle.
    var totalEdges = edges.length;
    var slot = Math.floor(phase * totalEdges);
    var localPhase = phase * totalEdges - slot;
    var edge = edges[slot];
    if (!edge) return null;
    var a = placed[edge[0]];
    var b = placed[edge[1]];
    if (!a || !b) return null;
    var px = a.x + (b.x - a.x) * localPhase;
    var py = a.y + (b.y - a.y) * localPhase;
    return {
      x: px,
      y: py,
      accent: p.edgeIdx === 11
    };
  }).filter(Boolean);
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
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: ringR,
    fill: "none",
    stroke: "var(--ink-3)",
    strokeWidth: "0.5",
    strokeDasharray: "2 4",
    strokeOpacity: "0.5"
  }), edges.map(function (_ref2, k) {
    var _ref3 = _slicedToArray(_ref2, 2),
      i = _ref3[0],
      j = _ref3[1];
    var a = placed[i];
    var b = placed[j];
    if (!a || !b) return null;
    return /*#__PURE__*/React.createElement("line", {
      key: "e".concat(k),
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      stroke: "var(--ink-3)",
      strokeWidth: "0.5",
      strokeOpacity: "0.4"
    });
  }), placed.map(function (a) {
    return /*#__PURE__*/React.createElement("g", {
      key: a.code
    }, /*#__PURE__*/React.createElement("circle", {
      cx: a.x,
      cy: a.y,
      r: "22",
      fill: "var(--paper)",
      stroke: "var(--ink)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: a.x,
      y: a.y + 4,
      fontFamily: "var(--mono)",
      fontSize: "11",
      fontWeight: "600",
      letterSpacing: "0.04em",
      fill: "var(--ink)",
      textAnchor: "middle"
    }, a.code), /*#__PURE__*/React.createElement("text", {
      x: a.labelX,
      y: a.labelY + 4,
      fontFamily: "var(--sans)",
      fontSize: "9",
      fontWeight: "500",
      letterSpacing: "0.10em",
      fill: "var(--ink-3)",
      textAnchor: "middle",
      textTransform: "uppercase"
    }, a.domain.toUpperCase()));
  }), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "44",
    fill: "var(--paper-2)",
    stroke: "var(--ink)",
    strokeWidth: "1"
  }), active && !reduced && /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "44",
    fill: "var(--accent)",
    fillOpacity: "0.10"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "fill-opacity",
    values: "0.10;0.25;0.10",
    dur: "3.6s",
    repeatCount: "indefinite"
  })), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy - 4,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "600",
    letterSpacing: "0.10em",
    fill: "var(--ink)",
    textAnchor: "middle"
  }, "ENGINE"), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 12,
    fontFamily: "var(--mono)",
    fontSize: "10",
    fill: "var(--ink-3)",
    textAnchor: "middle"
  }, "v0.4.1")), active && !reduced && pulses.map(function (p, i) {
    return /*#__PURE__*/React.createElement("circle", {
      key: "p".concat(i),
      cx: p.x,
      cy: p.y,
      r: "3.5",
      fill: p.accent ? "var(--accent)" : "var(--ink)",
      opacity: "0.85"
    });
  }));
}

// ─── Output stream (right column) ───────────────────────────────────

function StreamEntry(_ref4) {
  var entry = _ref4.entry,
    sm = _ref4.sm;
  // Render: timestamp (mono, ink-3) · code (mono, accent) · action (mixed).
  // The action string contains plain English with a verb and object — we
  // bold the first 1–2 keywords for visual rhythm but keep most ink-3.
  // Implementation: split action into "verb noun..." and bold the noun.
  var parts = entry.action.split(" — ");
  var head = parts[0]; // e.g. "verified insurance benefits"
  var tail = parts.slice(1).join(" — "); // e.g. "Delta Dental PPO · $1,500 max"
  var headTokens = head.split(" ");
  var verb = headTokens[0]; // "verified"
  var rest = headTokens.slice(1).join(" "); // "insurance benefits"

  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: sm ? "auto auto 1fr" : "auto auto 1fr",
      gap: sm ? 10 : 16,
      alignItems: "baseline",
      padding: sm ? "10px 0" : "12px 0",
      borderBottom: "1px solid var(--rule-softer)",
      fontFamily: "var(--mono)",
      fontSize: sm ? 11 : 12,
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-3)",
      whiteSpace: "nowrap"
    }
  }, entry.time), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)",
      fontWeight: 600,
      letterSpacing: "0.02em",
      whiteSpace: "nowrap"
    }
  }, entry.code), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-3)",
      textWrap: "pretty"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-3)"
    }
  }, verb, " "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink)",
      fontWeight: 500
    }
  }, rest), tail && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-3)"
    }
  }, " — "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-3)"
    }
  }, tail))));
}
function OutputStream(_ref5) {
  var active = _ref5.active,
    pool = _ref5.pool,
    sm = _ref5.sm;
  var reduced = usePrefersReducedMotion();
  var _useStE = useStE(function () {
      return buildInitialStream(pool, sm ? 9 : 14);
    }),
    _useStE2 = _slicedToArray(_useStE, 2),
    entries = _useStE2[0],
    setEntries = _useStE2[1];
  var tickRef = useRfE(0);
  useEfE(function () {
    if (!active || reduced) return;
    var interval = setInterval(function () {
      tickRef.current += 1;
      setEntries(function (prev) {
        var item = pool[Math.floor(Math.random() * pool.length)];
        var newEntry = {
          id: "live-".concat(tickRef.current, "-").concat(Date.now()),
          time: fmtTime(new Date()),
          code: item.code,
          action: item.action
        };
        // Drop the oldest entry, prepend the new one.
        return [newEntry].concat(_toConsumableArray(prev.slice(0, prev.length - 1)));
      });
    }, 2500);
    return function () {
      return clearInterval(interval);
    };
  }, [active, reduced, pool]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, entries.map(function (entry, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: entry.id,
      style: {
        opacity: i === 0 && !reduced ? 0 : 1,
        animation: i === 0 && !reduced ? "fadeInDown 320ms ease forwards" : "none"
      }
    }, /*#__PURE__*/React.createElement(StreamEntry, {
      entry: entry,
      sm: sm
    }));
  }));
}

// ─── Section composition ────────────────────────────────────────────

function LiveEngine(_ref6) {
  var _window$AFFETTO2;
  var bp = _ref6.bp;
  var sm = bp === "sm";
  var md = bp === "md";
  var stacked = sm || md;
  var wrapRef = useRfE(null);
  var inView = useInViewport(wrapRef, {
    threshold: 0.1
  });
  var tabVisible = useTabVisibility();
  var active = inView && tabVisible;
  var data = ((_window$AFFETTO2 = window.AFFETTO) === null || _window$AFFETTO2 === void 0 ? void 0 : _window$AFFETTO2.liveEngine) || {};
  var pool = data.streamPool || [];
  return /*#__PURE__*/React.createElement("section", {
    id: "live-engine",
    ref: wrapRef,
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
    text: data.sectionMarker || "§02b · Live engine"
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    className: "t-h2",
    style: {
      margin: "0 0 16px",
      color: "var(--ink)",
      textWrap: "balance",
      maxWidth: "30ch"
    }
  }, data.subhead)), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "t-micro",
    style: {
      margin: "0 0 48px",
      color: "var(--ink-3)",
      letterSpacing: "0.10em"
    }
  }, data.leftCaption)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--ink)",
      background: "var(--paper)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      flexWrap: "wrap",
      padding: sm ? "12px 16px" : "14px 24px",
      background: "var(--ink)",
      color: "var(--paper)",
      borderBottom: "1px solid var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: sm ? 12 : 16,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 7,
      height: 7,
      borderRadius: 99,
      background: "var(--accent)",
      animation: active ? "pulse 2.4s ease-in-out infinite" : "none",
      display: "inline-block",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--paper)"
    }
  }, data.statusLabel || "Streaming"), !sm && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 1,
      height: 12,
      background: "rgba(250,250,248,0.18)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "rgba(250,250,248,0.70)",
      letterSpacing: "0.10em"
    }
  }, "AFFETTO ENGINE / v0.4.1"))), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "rgba(250,250,248,0.70)",
      whiteSpace: "nowrap"
    }
  }, data.agentStatus || "9/9 nominal")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: stacked ? "1fr" : "5fr 7fr",
      gridTemplateRows: stacked ? "auto auto" : "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: sm ? 20 : 28,
      borderRight: stacked ? "none" : "1px solid var(--rule-soft)",
      borderBottom: stacked ? "1px solid var(--rule-soft)" : "none",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      background: "var(--paper)",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: stacked ? 320 : 0,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: stacked ? 420 : "100%",
      aspectRatio: "1 / 1"
    }
  }, /*#__PURE__*/React.createElement(OrbitalTopology, {
    active: active
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 12,
      borderTop: "1px solid var(--rule-softer)",
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Cross-agent coordination"), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "9 agents \xB7 17 edges"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--paper)",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: sm ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: 0,
      background: "var(--paper-2)",
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, (data.metrics || []).map(function (m, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: m.label,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: sm ? "14px 12px" : "16px 18px",
        borderLeft: i > 0 && !sm || sm && i % 2 === 1 ? "1px solid var(--rule-softer)" : "none",
        borderTop: sm && i >= 2 ? "1px solid var(--rule-softer)" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "t-micro",
      style: {
        color: "var(--ink-3)"
      }
    }, m.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--display)",
        fontSize: sm ? 20 : 24,
        fontWeight: 500,
        letterSpacing: "-0.02em",
        color: "var(--ink)",
        lineHeight: 1.0
      }
    }, m.value));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: sm ? "10px 16px" : "10px 22px",
      borderBottom: "1px solid var(--rule-softer)",
      background: "var(--paper-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, data.streamHeader || "Output stream"), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "LIVE \xB7 synthetic data")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: sm ? "0 16px" : "0 22px",
      overflow: "hidden",
      flex: "1 1 auto"
    }
  }, /*#__PURE__*/React.createElement(OutputStream, {
    active: active,
    pool: pool,
    sm: sm
  }))))))));
}
window.LiveEngine = LiveEngine;
