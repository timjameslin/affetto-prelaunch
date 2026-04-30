"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// L0–L3 topology. v0.8.0 carries forward the v0.7.0 living-topology system
// verbatim — pulses, scan line, source ack, validated routes. The only
// substantive change is that LAYER_CAPTIONS now reads from window.AFFETTO
// so layer copy is editable from a single location (content.jsx).
// Orientation switches at the 1100px breakpoint via useBp() in page.jsx.

var _React = React,
  useSt = _React.useState,
  useEf = _React.useEffect,
  useRf = _React.useRef,
  useMm = _React.useMemo,
  useCb = _React.useCallback;
var AGENTS = [{
  code: "TRT",
  name: "Treatment"
}, {
  code: "RCM",
  name: "Revenue"
}, {
  code: "FIN",
  name: "Finance"
}, {
  code: "PAT",
  name: "Patient"
}, {
  code: "SCH",
  name: "Scheduling"
}, {
  code: "CMP",
  name: "Compliance"
}, {
  code: "PPL",
  name: "People"
}, {
  code: "MKT",
  name: "Marketing"
}, {
  code: "PRC",
  name: "Procurement"
}];
var SOURCES = ["PMS", "EHR", "API"];

// Layer captions read from content.jsx (window.AFFETTO.system.layers).
// Module-level eval is safe because content.jsx loads before topology.jsx.
var LAYER_CAPTIONS = function () {
  var out = {
    L0: "",
    L1: "",
    L2: "",
    L3: ""
  };
  var layers = window.AFFETTO && window.AFFETTO.system && window.AFFETTO.system.layers || [];
  layers.forEach(function (l) {
    out[l.tag] = l.caption;
  });
  return out;
}();
var AGENT_SOURCE = {
  TRT: 0,
  RCM: 2,
  FIN: 2,
  PAT: 0,
  SCH: 0,
  CMP: 2,
  PPL: 1,
  MKT: 1,
  PRC: 2
};
var PULSE_SCHEDULE = [{
  t: 0.0,
  agent: "RCM",
  accent: false
}, {
  t: 2.5,
  agent: "PAT",
  accent: false
}, {
  t: 4.0,
  agent: "SCH",
  accent: false
}, {
  t: 6.5,
  agent: "RCM",
  accent: true
}, {
  t: 8.0,
  agent: "TRT",
  accent: false
}, {
  t: 10.5,
  agent: "FIN",
  accent: false
}, {
  t: 12.0,
  agent: "PAT",
  accent: false
}, {
  t: 14.5,
  agent: "RCM",
  accent: false
}, {
  t: 16.0,
  agent: "MKT",
  accent: true
}, {
  t: 18.5,
  agent: "SCH",
  accent: false
}, {
  t: 20.0,
  agent: "PRC",
  accent: false
}, {
  t: 22.5,
  agent: "CMP",
  accent: false
}];
var LOOP_MS = 24000;
var PULSE_DUR_MS = 3000;

// ─── Static vertical (preserved from v0.5.0/v0.6.0) ───────────────────
function Topology() {
  var t = useHeartbeat(6200);
  var phase = (Math.sin(t * Math.PI * 2) + 1) / 2;
  var packetT = t % 1;
  var trackRef = useRf(null);
  var packets = [{
    offset: 0.00,
    color: "var(--ink)"
  }, {
    offset: 0.33,
    color: "var(--ink)"
  }, {
    offset: 0.66,
    color: "var(--accent)"
  }];
  return /*#__PURE__*/React.createElement("div", {
    "data-keep-together": "",
    style: {
      border: "1px solid var(--ink)",
      background: "var(--paper)",
      width: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      gap: 12,
      flexWrap: "wrap",
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Fig. 01 / Topology"), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)",
      display: "inline-flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: "var(--accent)",
      animation: "pulse 2.4s ease-in-out infinite",
      display: "inline-block"
    }
  }), "Live")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 16px 16px",
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement(LayerLabel, {
    tag: "L3",
    name: "Engine \xB7 Nine Agents",
    sub: "9 / 9",
    caption: LAYER_CAPTIONS.L3
  }), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    style: {
      display: "grid",
      gridAutoFlow: "column",
      gridAutoColumns: "minmax(72px, 1fr)",
      gap: 8,
      overflowX: "auto",
      overflowY: "hidden",
      scrollSnapType: "x mandatory",
      paddingBottom: 6,
      marginTop: 12
    }
  }, AGENTS.map(function (a, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: a.code,
      style: {
        border: "1px solid var(--ink)",
        padding: "10px 6px",
        textAlign: "center",
        background: "var(--paper)",
        minWidth: 72,
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "t-caption",
      style: {
        fontWeight: 600,
        letterSpacing: "0.04em"
      }
    }, a.code), /*#__PURE__*/React.createElement("span", {
      className: "t-micro",
      style: {
        color: "var(--ink-3)"
      }
    }, "0", i + 1));
  }))), /*#__PURE__*/React.createElement(Connector, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px",
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement(LayerLabel, {
    tag: "L2",
    name: "Universal Data Contract",
    sub: "v0.4.1",
    caption: LAYER_CAPTIONS.L2
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      height: 48,
      border: "1px solid var(--ink)",
      background: "var(--paper-2)",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: "".concat(phase * 70, "%"),
      width: "30%",
      background: "var(--accent)",
      opacity: 0.10 + 0.18 * phase,
      transition: "left 50ms linear"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      position: "relative",
      color: "var(--ink)",
      letterSpacing: "0.12em",
      fontWeight: 600
    }
  }, "Contract \xB7 v0.4.1"), packets.map(function (p, i) {
    var x = (packetT + p.offset) % 1 * 100;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: "absolute",
        top: "50%",
        left: "".concat(x, "%"),
        transform: "translate(-50%, -50%)",
        width: 6,
        height: 6,
        borderRadius: 99,
        background: p.color,
        boxShadow: "0 0 0 4px ".concat(p.color === "var(--accent)" ? "rgba(194,51,26,0.18)" : "rgba(11,11,9,0.14)")
      }
    });
  }))), /*#__PURE__*/React.createElement(Connector, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px",
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement(LayerLabel, {
    tag: "L1",
    name: "Connectors",
    sub: "Universal",
    caption: LAYER_CAPTIONS.L1
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      border: "1px solid var(--ink)",
      padding: "14px 12px",
      background: "var(--paper)",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      alignItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-caption",
    style: {
      fontWeight: 600
    }
  }, "Sync \xB7 all PMS & EHR systems"), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Adapter layer \xB7 vendor-agnostic"))), /*#__PURE__*/React.createElement(Connector, {
    dashed: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement(LayerLabel, {
    tag: "L0",
    name: "Practice Management Source",
    sub: "Any vendor",
    caption: LAYER_CAPTIONS.L0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 6
    }
  }, SOURCES.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        border: "1px dashed var(--ink-3)",
        padding: "8px 6px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "t-micro",
      style: {
        color: "var(--ink-3)"
      }
    }, "Source / ", String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
      className: "t-caption",
      style: {
        marginTop: 2,
        color: "var(--ink-2)",
        fontWeight: 500
      }
    }, s));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      borderTop: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Topology rendered with synthetic data.")));
}
function LayerLabel(_ref) {
  var tag = _ref.tag,
    name = _ref.name,
    sub = _ref.sub,
    caption = _ref.caption;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink)"
    }
  }, tag), "  ·  ", name), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, sub)), caption && /*#__PURE__*/React.createElement("span", {
    className: "t-caption",
    style: {
      color: "var(--ink-3)",
      lineHeight: 1.4
    }
  }, caption));
}
function Connector(_ref2) {
  var _ref2$dashed = _ref2.dashed,
    dashed = _ref2$dashed === void 0 ? false : _ref2$dashed;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24,
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: dashed ? "repeating-linear-gradient(to bottom, var(--ink) 0 3px, transparent 3px 6px)" : "var(--ink)",
      opacity: dashed ? 0.5 : 0.6
    }
  }));
}

// ─── Static horizontal ────────────────────────────────────────────────
function TopologyHorizontal() {
  var t = useHeartbeat(6200);
  var phase = (Math.sin(t * Math.PI * 2) + 1) / 2;
  var packetT = t % 1;
  var packets = [{
    offset: 0.00,
    color: "var(--ink)"
  }, {
    offset: 0.33,
    color: "var(--ink)"
  }, {
    offset: 0.66,
    color: "var(--accent)"
  }];
  return /*#__PURE__*/React.createElement("div", {
    "data-keep-together": "",
    style: {
      border: "1px solid var(--ink)",
      background: "var(--paper)",
      width: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      gap: 12,
      flexWrap: "wrap",
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Fig. 01 / System Topology \xA0\xB7\xA0 Source \u2192 Engine"), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)",
      display: "inline-flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: "var(--accent)",
      animation: "pulse 2.4s ease-in-out infinite",
      display: "inline-block"
    }
  }), "Live \xB7 Synthetic data")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(150px, 1fr) minmax(180px, 1.1fr) minmax(240px, 1.6fr) minmax(280px, 2.2fr)",
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement(LayerColH, {
    tag: "L0",
    name: "Source",
    sub: "Any vendor",
    caption: LAYER_CAPTIONS.L0,
    flowFwd: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 6,
      height: "100%"
    }
  }, SOURCES.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        border: "1px dashed var(--ink-3)",
        padding: "10px 4px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "t-micro",
      style: {
        color: "var(--ink-3)"
      }
    }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
      className: "t-caption",
      style: {
        color: "var(--ink-2)",
        fontWeight: 500
      }
    }, s));
  }))), /*#__PURE__*/React.createElement(LayerColH, {
    tag: "L1",
    name: "Connectors",
    sub: "Adapter",
    caption: LAYER_CAPTIONS.L1,
    flowFwd: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--ink)",
      padding: "14px 10px",
      background: "var(--paper)",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      alignItems: "center",
      textAlign: "center",
      height: "100%",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-caption",
    style: {
      fontWeight: 600
    }
  }, "Sync \xB7 PMS & EHR"), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Vendor-agnostic"))), /*#__PURE__*/React.createElement(LayerColH, {
    tag: "L2",
    name: "Data Contract",
    sub: "v0.4.1",
    caption: LAYER_CAPTIONS.L2,
    flowFwd: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      minHeight: 72,
      border: "1px solid var(--ink)",
      background: "var(--paper-2)",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: "".concat(phase * 70, "%"),
      width: "30%",
      background: "var(--accent)",
      opacity: 0.10 + 0.18 * phase,
      transition: "left 50ms linear"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      position: "relative",
      color: "var(--ink)",
      letterSpacing: "0.12em",
      fontWeight: 600
    }
  }, "Contract \xB7 v0.4.1"), packets.map(function (p, i) {
    var x = (packetT + p.offset) % 1 * 100;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: "absolute",
        top: "50%",
        left: "".concat(x, "%"),
        transform: "translate(-50%, -50%)",
        width: 6,
        height: 6,
        borderRadius: 99,
        background: p.color,
        boxShadow: "0 0 0 4px ".concat(p.color === "var(--accent)" ? "rgba(194,51,26,0.18)" : "rgba(11,11,9,0.14)")
      }
    });
  }))), /*#__PURE__*/React.createElement(LayerColH, {
    tag: "L3",
    name: "Engine \xB7 9 Agents",
    sub: "9 / 9",
    caption: LAYER_CAPTIONS.L3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: 6,
      height: "100%"
    }
  }, AGENTS.map(function (a, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: a.code,
      style: {
        border: "1px solid var(--ink)",
        padding: "8px 4px",
        textAlign: "center",
        background: "var(--paper)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "t-caption",
      style: {
        fontWeight: 600,
        letterSpacing: "0.04em"
      }
    }, a.code), /*#__PURE__*/React.createElement("span", {
      className: "t-micro",
      style: {
        color: "var(--ink-3)"
      }
    }, "0", i + 1));
  })))));
}
function LayerColH(_ref3) {
  var tag = _ref3.tag,
    name = _ref3.name,
    sub = _ref3.sub,
    caption = _ref3.caption,
    flowFwd = _ref3.flowFwd,
    children = _ref3.children;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 16px",
      borderRight: flowFwd ? "1px solid var(--rule-soft)" : "none",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      minWidth: 0,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 8,
      alignItems: "baseline",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink)"
    }
  }, tag), "  ·  ", name), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, sub)), caption && /*#__PURE__*/React.createElement("span", {
    className: "t-caption",
    style: {
      color: "var(--ink-3)",
      lineHeight: 1.4
    }
  }, caption)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }
  }, children), flowFwd && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: "50%",
      right: -7,
      transform: "translateY(-50%)",
      width: 14,
      height: 14,
      borderRadius: 99,
      background: "var(--paper)",
      border: "1px solid var(--ink)",
      color: "var(--ink)",
      fontSize: 9,
      lineHeight: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--mono)",
      zIndex: 2
    }
  }, "\u2192"));
}

// ─── Living topology ───────────────────────────────────────────────────

function LivingTopology(_ref4) {
  var _ref4$orientation = _ref4.orientation,
    orientation = _ref4$orientation === void 0 ? "horizontal" : _ref4$orientation;
  var reduced = usePrefersReducedMotion();
  var wrapRef = useRf(null);
  var inView = useInViewport(wrapRef, {
    threshold: 0.1
  });
  var tabVisible = useTabVisibility();
  var shouldAnimate = !reduced && inView && tabVisible;
  if (reduced) {
    return orientation === "vertical" ? /*#__PURE__*/React.createElement(Topology, null) : /*#__PURE__*/React.createElement(TopologyHorizontal, null);
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapRef
  }, orientation === "vertical" ? /*#__PURE__*/React.createElement(LivingTopologyVertical, {
    shouldAnimate: shouldAnimate
  }) : /*#__PURE__*/React.createElement(LivingTopologyHorizontal, {
    shouldAnimate: shouldAnimate
  }));
}
function computePulses(nowMs) {
  var out = [];
  for (var i = 0; i < PULSE_SCHEDULE.length; i++) {
    var s = PULSE_SCHEDULE[i];
    var startMs = s.t * 1000;
    var elapsed = nowMs - startMs;
    if (elapsed < 0) elapsed += LOOP_MS;
    if (elapsed >= 0 && elapsed <= PULSE_DUR_MS) {
      var p = elapsed / PULSE_DUR_MS;
      out.push({
        id: i,
        agent: s.agent,
        accent: s.accent,
        progress: p,
        pathPos: Math.sin(p * Math.PI),
        firingAgent: p < 0.06,
        atSource: p > 0.46 && p < 0.54
      });
    }
  }
  return out;
}
function LivingTopologyHorizontal(_ref5) {
  var shouldAnimate = _ref5.shouldAnimate;
  var bandRef = useRf(null);
  var agentRefs = useRf({});
  var sourceRefs = useRf({});
  var l1Ref = useRf(null);
  var l2Ref = useRf(null);
  var overlayRef = useRf(null);
  var pathRefs = useRf({});
  var pulseRefs = useRf({});
  var sourceAckRefs = useRf({});
  var _useSt = useSt(null),
    _useSt2 = _slicedToArray(_useSt, 2),
    geom = _useSt2[0],
    setGeom = _useSt2[1];
  var measure = useCb(function () {
    var band = bandRef.current;
    if (!band) return;
    var bandBox = band.getBoundingClientRect();
    var W = bandBox.width;
    var H = bandBox.height;
    if (W < 10 || H < 10) return;
    var rel = function rel(el) {
      var r = el.getBoundingClientRect();
      return {
        x: r.left - bandBox.left,
        y: r.top - bandBox.top,
        w: r.width,
        h: r.height,
        cx: r.left - bandBox.left + r.width / 2,
        cy: r.top - bandBox.top + r.height / 2
      };
    };
    var l1 = l1Ref.current && rel(l1Ref.current);
    var l2 = l2Ref.current && rel(l2Ref.current);
    if (!l1 || !l2) return;
    var routes = {};
    AGENTS.forEach(function (a) {
      var ag = agentRefs.current[a.code];
      var srcIdx = AGENT_SOURCE[a.code];
      var src = sourceRefs.current[srcIdx];
      if (!ag || !src) return;
      var A = rel(ag);
      var S = rel(src);
      var ax = A.x;
      var ay = A.cy;
      var l2x = l2.x + l2.w;
      var l2y = l2.cy;
      var l1x = l1.x + l1.w;
      var l1y = l1.cy;
      var sx = S.x + S.w;
      var sy = S.cy;
      var d = "M ".concat(ax, " ").concat(ay, " L ").concat(l2x, " ").concat(l2y, " L ").concat(l1x, " ").concat(l1y, " L ").concat(sx, " ").concat(sy);
      routes[a.code] = {
        d: d,
        ay: ay,
        sy: sy
      };
    });
    setGeom({
      W: W,
      H: H,
      routes: routes,
      sources: Object.keys(sourceRefs.current).map(function (k) {
        return rel(sourceRefs.current[k]);
      })
    });
  }, []);
  useEf(function () {
    measure();
    var ro = new ResizeObserver(function () {
      return measure();
    });
    if (bandRef.current) ro.observe(bandRef.current);
    window.addEventListener("resize", measure);
    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        return measure();
      })["catch"](function () {});
    }
    var t1 = setTimeout(measure, 100);
    var t2 = setTimeout(measure, 600);
    return function () {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [measure]);
  useEf(function () {
    if (!shouldAnimate || !geom) return;
    var raf;
    var start = null;
    var lastFiring = {};
    var lastAck = {};
    var _frame = function frame(ts) {
      if (start == null) start = ts;
      var nowMs = (ts - start) % LOOP_MS;
      var active = computePulses(nowMs);
      Object.keys(pulseRefs.current).forEach(function (id) {
        var p = pulseRefs.current[id];
        if (p && p.g) p.g.style.opacity = "0";
      });
      active.forEach(function (pulse) {
        var refs = pulseRefs.current[pulse.id];
        var path = pathRefs.current[pulse.agent];
        if (!refs || !path) return;
        var len = path.getTotalLength();
        if (!len || isNaN(len)) return;
        var pt = path.getPointAtLength(pulse.pathPos * len);
        refs.g.style.transform = "translate(".concat(pt.x, "px, ").concat(pt.y, "px)");
        refs.g.style.opacity = "1";
        if (pulse.firingAgent && lastFiring[pulse.id] !== "fired") {
          var ag = agentRefs.current[pulse.agent];
          if (ag) {
            ag.classList.remove("living-agent--firing");
            void ag.offsetWidth;
            ag.classList.add("living-agent--firing");
          }
          lastFiring[pulse.id] = "fired";
        }
        if (!pulse.firingAgent) lastFiring[pulse.id] = "idle";
        var srcIdx = AGENT_SOURCE[pulse.agent];
        if (pulse.atSource && lastAck[pulse.id] !== "acked") {
          var ack = sourceAckRefs.current[srcIdx];
          if (ack) {
            ack.style.background = pulse.accent ? "var(--accent)" : "var(--ink)";
            ack.classList.remove("living-source--ack");
            void ack.offsetWidth;
            ack.classList.add("living-source--ack");
          }
          lastAck[pulse.id] = "acked";
        }
        if (!pulse.atSource && !pulse.firingAgent) lastAck[pulse.id] = "idle";
      });
      raf = requestAnimationFrame(_frame);
    };
    raf = requestAnimationFrame(_frame);
    return function () {
      return cancelAnimationFrame(raf);
    };
  }, [shouldAnimate, geom]);
  var pulseSlots = PULSE_SCHEDULE.map(function (s, i) {
    return {
      id: i,
      accent: s.accent
    };
  });
  return /*#__PURE__*/React.createElement("div", {
    "data-keep-together": "",
    style: {
      border: "1px solid var(--ink)",
      background: "var(--paper)",
      width: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      gap: 12,
      flexWrap: "wrap",
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Fig. 01 / System Topology \xA0\xB7\xA0 Source \u2192 Engine"), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)",
      display: "inline-flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: "var(--accent)",
      animation: "pulse 2.4s ease-in-out infinite",
      display: "inline-block"
    }
  }), "Live \xB7 Synthetic data")), /*#__PURE__*/React.createElement("div", {
    ref: bandRef,
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "minmax(150px, 1fr) minmax(180px, 1.1fr) minmax(240px, 1.6fr) minmax(280px, 2.2fr)",
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement(LayerColH, {
    tag: "L0",
    name: "Source",
    sub: "Any vendor",
    caption: LAYER_CAPTIONS.L0,
    flowFwd: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 6,
      height: "100%"
    }
  }, SOURCES.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      ref: function ref(el) {
        sourceRefs.current[i] = el;
      },
      style: {
        border: "1px dashed var(--ink-3)",
        padding: "10px 4px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "t-micro",
      style: {
        color: "var(--ink-3)"
      }
    }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
      className: "t-caption",
      style: {
        color: "var(--ink-2)",
        fontWeight: 500
      }
    }, s), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      ref: function ref(el) {
        sourceAckRefs.current[i] = el;
      },
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -1,
        height: 1,
        background: "var(--ink)",
        opacity: 0
      }
    }));
  }))), /*#__PURE__*/React.createElement(LayerColH, {
    tag: "L1",
    name: "Connectors",
    sub: "Adapter",
    caption: LAYER_CAPTIONS.L1,
    flowFwd: true
  }, /*#__PURE__*/React.createElement("div", {
    ref: l1Ref,
    style: {
      border: "1px solid var(--ink)",
      padding: "14px 10px",
      background: "var(--paper)",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      alignItems: "center",
      textAlign: "center",
      height: "100%",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-caption",
    style: {
      fontWeight: 600
    }
  }, "Sync \xB7 PMS & EHR"), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Vendor-agnostic"))), /*#__PURE__*/React.createElement(LayerColH, {
    tag: "L2",
    name: "Data Contract",
    sub: "v0.4.1",
    caption: LAYER_CAPTIONS.L2,
    flowFwd: true
  }, /*#__PURE__*/React.createElement("div", {
    ref: l2Ref,
    style: {
      height: "100%",
      minHeight: 72,
      border: "1px solid var(--ink)",
      background: "var(--paper-2)",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "living-scan-line",
    style: {
      position: "absolute",
      left: 0,
      top: "50%",
      width: "100%",
      height: 1,
      background: "var(--accent)",
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      position: "relative",
      color: "var(--ink)",
      letterSpacing: "0.12em",
      fontWeight: 600
    }
  }, "Contract \xB7 v0.4.1"))), /*#__PURE__*/React.createElement(LayerColH, {
    tag: "L3",
    name: "Engine \xB7 9 Agents",
    sub: "9 / 9",
    caption: LAYER_CAPTIONS.L3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: 6,
      height: "100%"
    }
  }, AGENTS.map(function (a, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: a.code,
      ref: function ref(el) {
        agentRefs.current[a.code] = el;
      },
      style: {
        border: "1px solid var(--ink)",
        padding: "8px 4px",
        textAlign: "center",
        background: "var(--paper)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        transition: "background 240ms ease"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "t-caption",
      style: {
        fontWeight: 600,
        letterSpacing: "0.04em"
      }
    }, a.code), /*#__PURE__*/React.createElement("span", {
      className: "t-micro",
      style: {
        color: "var(--ink-3)"
      }
    }, "0", i + 1));
  }))), geom && /*#__PURE__*/React.createElement("svg", {
    ref: overlayRef,
    "aria-hidden": "true",
    role: "presentation",
    width: geom.W,
    height: geom.H,
    viewBox: "0 0 ".concat(geom.W, " ").concat(geom.H),
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      pointerEvents: "none",
      overflow: "visible"
    }
  }, AGENTS.map(function (a) {
    var r = geom.routes[a.code];
    if (!r) return null;
    return /*#__PURE__*/React.createElement("path", {
      key: "route-".concat(a.code),
      ref: function ref(el) {
        pathRefs.current[a.code] = el;
      },
      d: r.d,
      fill: "none",
      stroke: "var(--ink)",
      strokeOpacity: "0.10",
      strokeWidth: "1",
      className: "living-validated-route"
    });
  }), pulseSlots.map(function (p) {
    return /*#__PURE__*/React.createElement("g", {
      key: "pulse-".concat(p.id),
      ref: function ref(el) {
        pulseRefs.current[p.id] = pulseRefs.current[p.id] || {};
        pulseRefs.current[p.id].g = el;
      },
      style: {
        opacity: 0,
        transform: "translate(-100px, -100px)",
        willChange: "transform, opacity"
      }
    }, /*#__PURE__*/React.createElement("circle", {
      r: "9",
      fill: p.accent ? "var(--accent)" : "var(--ink)",
      fillOpacity: "0.16"
    }), /*#__PURE__*/React.createElement("circle", {
      r: "3.5",
      fill: p.accent ? "var(--accent)" : "var(--ink)"
    }));
  }))));
}
function LivingTopologyVertical(_ref6) {
  var shouldAnimate = _ref6.shouldAnimate;
  var bandRef = useRf(null);
  var agentRefs = useRf({});
  var sourceRefs = useRf({});
  var l1Ref = useRf(null);
  var l2Ref = useRf(null);
  var pathRefs = useRf({});
  var pulseRefs = useRf({});
  var sourceAckRefs = useRf({});
  var _useSt3 = useSt(null),
    _useSt4 = _slicedToArray(_useSt3, 2),
    geom = _useSt4[0],
    setGeom = _useSt4[1];
  var measure = useCb(function () {
    var band = bandRef.current;
    if (!band) return;
    var bandBox = band.getBoundingClientRect();
    var W = bandBox.width,
      H = bandBox.height;
    if (W < 10 || H < 10) return;
    var rel = function rel(el) {
      var r = el.getBoundingClientRect();
      return {
        x: r.left - bandBox.left,
        y: r.top - bandBox.top,
        w: r.width,
        h: r.height,
        cx: r.left - bandBox.left + r.width / 2,
        cy: r.top - bandBox.top + r.height / 2
      };
    };
    var l1 = l1Ref.current && rel(l1Ref.current);
    var l2 = l2Ref.current && rel(l2Ref.current);
    if (!l1 || !l2) return;
    var routes = {};
    AGENTS.forEach(function (a) {
      var ag = agentRefs.current[a.code];
      var srcIdx = AGENT_SOURCE[a.code];
      var src = sourceRefs.current[srcIdx];
      if (!ag || !src) return;
      var A = rel(ag);
      var S = rel(src);
      var ax = A.cx,
        ay = A.y + A.h;
      var l2x = l2.cx,
        l2y = l2.cy;
      var l1x = l1.cx,
        l1y = l1.cy;
      var sx = S.cx,
        sy = S.y;
      var d = "M ".concat(ax, " ").concat(ay, " L ").concat(l2x, " ").concat(l2y, " L ").concat(l1x, " ").concat(l1y, " L ").concat(sx, " ").concat(sy);
      routes[a.code] = {
        d: d
      };
    });
    setGeom({
      W: W,
      H: H,
      routes: routes
    });
  }, []);
  useEf(function () {
    measure();
    var ro = new ResizeObserver(function () {
      return measure();
    });
    if (bandRef.current) ro.observe(bandRef.current);
    window.addEventListener("resize", measure);
    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        return measure();
      })["catch"](function () {});
    }
    var t1 = setTimeout(measure, 100);
    var t2 = setTimeout(measure, 600);
    return function () {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [measure]);
  useEf(function () {
    if (!shouldAnimate || !geom) return;
    var raf;
    var start = null;
    var lastFiring = {},
      lastAck = {};
    var _frame2 = function frame(ts) {
      if (start == null) start = ts;
      var nowMs = (ts - start) % LOOP_MS;
      var active = computePulses(nowMs);
      Object.keys(pulseRefs.current).forEach(function (id) {
        var p = pulseRefs.current[id];
        if (p && p.g) p.g.style.opacity = "0";
      });
      active.forEach(function (pulse) {
        var refs = pulseRefs.current[pulse.id];
        var path = pathRefs.current[pulse.agent];
        if (!refs || !path) return;
        var len = path.getTotalLength();
        if (!len || isNaN(len)) return;
        var pt = path.getPointAtLength(pulse.pathPos * len);
        refs.g.style.transform = "translate(".concat(pt.x, "px, ").concat(pt.y, "px)");
        refs.g.style.opacity = "1";
        if (pulse.firingAgent && lastFiring[pulse.id] !== "fired") {
          var ag = agentRefs.current[pulse.agent];
          if (ag) {
            ag.classList.remove("living-agent--firing");
            void ag.offsetWidth;
            ag.classList.add("living-agent--firing");
          }
          lastFiring[pulse.id] = "fired";
        }
        if (!pulse.firingAgent) lastFiring[pulse.id] = "idle";
        var srcIdx = AGENT_SOURCE[pulse.agent];
        if (pulse.atSource && lastAck[pulse.id] !== "acked") {
          var ack = sourceAckRefs.current[srcIdx];
          if (ack) {
            ack.style.background = pulse.accent ? "var(--accent)" : "var(--ink)";
            ack.classList.remove("living-source--ack");
            void ack.offsetWidth;
            ack.classList.add("living-source--ack");
          }
          lastAck[pulse.id] = "acked";
        }
        if (!pulse.atSource && !pulse.firingAgent) lastAck[pulse.id] = "idle";
      });
      raf = requestAnimationFrame(_frame2);
    };
    raf = requestAnimationFrame(_frame2);
    return function () {
      return cancelAnimationFrame(raf);
    };
  }, [shouldAnimate, geom]);
  var pulseSlots = PULSE_SCHEDULE.map(function (s, i) {
    return {
      id: i,
      accent: s.accent
    };
  });
  return /*#__PURE__*/React.createElement("div", {
    "data-keep-together": "",
    style: {
      border: "1px solid var(--ink)",
      background: "var(--paper)",
      width: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      gap: 12,
      flexWrap: "wrap",
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Fig. 01 / Topology"), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)",
      display: "inline-flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: "var(--accent)",
      animation: "pulse 2.4s ease-in-out infinite",
      display: "inline-block"
    }
  }), "Live")), /*#__PURE__*/React.createElement("div", {
    ref: bandRef,
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 16px 16px",
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement(LayerLabel, {
    tag: "L3",
    name: "Engine \xB7 Nine Agents",
    sub: "9 / 9",
    caption: LAYER_CAPTIONS.L3
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: 6,
      marginTop: 12
    }
  }, AGENTS.map(function (a, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: a.code,
      ref: function ref(el) {
        agentRefs.current[a.code] = el;
      },
      style: {
        border: "1px solid var(--ink)",
        padding: "10px 6px",
        textAlign: "center",
        background: "var(--paper)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        transition: "background 240ms ease"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "t-caption",
      style: {
        fontWeight: 600,
        letterSpacing: "0.04em"
      }
    }, a.code), /*#__PURE__*/React.createElement("span", {
      className: "t-micro",
      style: {
        color: "var(--ink-3)"
      }
    }, "0", i + 1));
  }))), /*#__PURE__*/React.createElement(Connector, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px",
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement(LayerLabel, {
    tag: "L2",
    name: "Universal Data Contract",
    sub: "v0.4.1",
    caption: LAYER_CAPTIONS.L2
  }), /*#__PURE__*/React.createElement("div", {
    ref: l2Ref,
    style: {
      marginTop: 12,
      height: 48,
      border: "1px solid var(--ink)",
      background: "var(--paper-2)",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "living-scan-line",
    style: {
      position: "absolute",
      left: 0,
      top: "50%",
      width: "100%",
      height: 1,
      background: "var(--accent)",
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      position: "relative",
      color: "var(--ink)",
      letterSpacing: "0.12em",
      fontWeight: 600
    }
  }, "Contract \xB7 v0.4.1"))), /*#__PURE__*/React.createElement(Connector, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px",
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement(LayerLabel, {
    tag: "L1",
    name: "Connectors",
    sub: "Universal",
    caption: LAYER_CAPTIONS.L1
  }), /*#__PURE__*/React.createElement("div", {
    ref: l1Ref,
    style: {
      marginTop: 12,
      border: "1px solid var(--ink)",
      padding: "14px 12px",
      background: "var(--paper)",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      alignItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-caption",
    style: {
      fontWeight: 600
    }
  }, "Sync \xB7 all PMS & EHR systems"), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Adapter layer \xB7 vendor-agnostic"))), /*#__PURE__*/React.createElement(Connector, {
    dashed: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement(LayerLabel, {
    tag: "L0",
    name: "Practice Management Source",
    sub: "Any vendor",
    caption: LAYER_CAPTIONS.L0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 6
    }
  }, SOURCES.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      ref: function ref(el) {
        sourceRefs.current[i] = el;
      },
      style: {
        border: "1px dashed var(--ink-3)",
        padding: "8px 6px",
        textAlign: "center",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "t-micro",
      style: {
        color: "var(--ink-3)"
      }
    }, "Source / ", String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
      className: "t-caption",
      style: {
        marginTop: 2,
        color: "var(--ink-2)",
        fontWeight: 500
      }
    }, s), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      ref: function ref(el) {
        sourceAckRefs.current[i] = el;
      },
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -1,
        height: 1,
        background: "var(--ink)",
        opacity: 0
      }
    }));
  }))), geom && /*#__PURE__*/React.createElement("svg", {
    "aria-hidden": "true",
    role: "presentation",
    width: geom.W,
    height: geom.H,
    viewBox: "0 0 ".concat(geom.W, " ").concat(geom.H),
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      pointerEvents: "none",
      overflow: "visible"
    }
  }, AGENTS.map(function (a) {
    var r = geom.routes[a.code];
    if (!r) return null;
    return /*#__PURE__*/React.createElement("path", {
      key: "route-".concat(a.code),
      ref: function ref(el) {
        pathRefs.current[a.code] = el;
      },
      d: r.d,
      fill: "none",
      stroke: "var(--ink)",
      strokeOpacity: "0.08",
      strokeWidth: "1",
      className: "living-validated-route"
    });
  }), pulseSlots.map(function (p) {
    return /*#__PURE__*/React.createElement("g", {
      key: "pulse-".concat(p.id),
      ref: function ref(el) {
        pulseRefs.current[p.id] = pulseRefs.current[p.id] || {};
        pulseRefs.current[p.id].g = el;
      },
      style: {
        opacity: 0,
        transform: "translate(-100px, -100px)",
        willChange: "transform, opacity"
      }
    }, /*#__PURE__*/React.createElement("circle", {
      r: "8",
      fill: p.accent ? "var(--accent)" : "var(--ink)",
      fillOpacity: "0.18"
    }), /*#__PURE__*/React.createElement("circle", {
      r: "3",
      fill: p.accent ? "var(--accent)" : "var(--ink)"
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px",
      borderTop: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "Topology rendered with synthetic data."))));
}
window.Topology = Topology;
window.TopologyHorizontal = TopologyHorizontal;
window.LivingTopology = LivingTopology;
