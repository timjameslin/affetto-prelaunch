"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// agents.jsx — v0.8.0
// Information-dense card surface restored per spec §6.2:
//   ┌─────────────────────────────────┐
//   │ 01                          TRT │   number / code (mono)
//   │                                 │
//   │ Treatment                       │   domain h3
//   │ Plans, presentations, case      │   practice line (body, ink-2)
//   │ acceptance                      │
//   │ ─────────────────────────────── │   1px rule, var(--rule-soft)
//   │ ↑ CASE MIX · CAPACITY           │   business tag, micro ink-3
//   │                       ↗ DETAIL  │   affordance, ink-3 → accent on hover
//   └─────────────────────────────────┘
//
// Card height 220px (was 180), padding 24px 20px. The ↑ prefix on the
// business tag visually telegraphs "the altitude above the practice."
// Modal continues to expose the full practice + business altitudes at
// body-lg, separated by a thin rule, plus the MiniTopology placement
// schematic from v0.7.0.

var _React = React,
  useStA = _React.useState,
  useEfA = _React.useEffect,
  useRfA = _React.useRef;
var SOURCE_LABELS = ["PMS", "EHR", "API"];

// ── Agent surface card ──────────────────────────────────────────────

function AgentCard(_ref) {
  var a = _ref.a,
    onOpen = _ref.onOpen;
  var _useStA = useStA(false),
    _useStA2 = _slicedToArray(_useStA, 2),
    hover = _useStA2[0],
    setHover = _useStA2[1];
  var _useStA3 = useStA(false),
    _useStA4 = _slicedToArray(_useStA3, 2),
    acking = _useStA4[0],
    setAcking = _useStA4[1];
  var ackTimerRef = useRfA(null);

  // On click: flash the click-ack inversion for 150ms, then open the modal.
  // Per design: the ack is a confirmation gesture — the card visibly
  // "receives" the click before transitioning to the modal.
  var handleClick = function handleClick(e) {
    e.preventDefault();
    if (acking) return; // already in flight
    setAcking(true);
    // Schedule the modal open — gives the user 150ms of visual feedback.
    ackTimerRef.current = setTimeout(function () {
      onOpen(a);
      // Reset the ack state shortly after the modal opens, so when the
      // user closes the modal the card returns to its base appearance.
      setTimeout(function () {
        return setAcking(false);
      }, 50);
    }, 150);
  };

  // Cleanup any pending ack timer on unmount (e.g. modal closing causes
  // re-render before timer fires).
  useEfA(function () {
    return function () {
      if (ackTimerRef.current) clearTimeout(ackTimerRef.current);
    };
  }, []);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleClick,
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    },
    onFocus: function onFocus() {
      return setHover(true);
    },
    onBlur: function onBlur() {
      return setHover(false);
    },
    "aria-haspopup": "dialog",
    "aria-label": "".concat(a.code, " \u2014 ").concat(a.domain, ", view detail"),
    className: "tap agent-card".concat(acking ? " is-acking" : ""),
    style: {
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      minHeight: 220,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, a.number), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: "0.06em",
      color: "var(--ink)"
    }
  }, a.code)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 8px",
      fontFamily: "var(--sans)",
      fontSize: "var(--t-h3)",
      fontWeight: 500,
      letterSpacing: "-0.015em",
      lineHeight: 1.2,
      color: "var(--ink)"
    }
  }, a.domain), /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      margin: 0,
      color: "var(--ink-2)",
      textWrap: "pretty",
      lineHeight: 1.45,
      flex: "1 1 auto"
    }
  }, a.practiceLine), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      height: 1,
      background: "var(--rule-soft)",
      margin: "16px 0 12px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--ink-3)",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--ink-3)"
    }
  }, "\u2191"), a.businessTag), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: "var(--sans)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: hover ? "var(--accent)" : "var(--ink-3)",
      transition: "color 200ms ease"
    }
  }, "\u2197 Detail")));
}

// ── Mini topology inside modal ──────────────────────────────────────

function MiniTopology(_ref2) {
  var agent = _ref2.agent,
    agents = _ref2.agents;
  // 3x3 L3 grid + path down to a single L0 source.
  var W = 480,
    H = 200;
  var COLS = 3,
    ROWS = 3;
  var L3_X = 60,
    L3_Y = 16,
    L3_W = W - 120,
    L3_H = 100;
  var cellW = L3_W / COLS;
  var cellH = L3_H / ROWS;
  var idx = agents.findIndex(function (a) {
    return a.code === agent.code;
  });
  var r = Math.floor(idx / COLS);
  var c = idx % COLS;
  var cellX = L3_X + c * cellW;
  var cellY = L3_Y + r * cellH;
  var cellCx = cellX + cellW / 2;

  // L0 source target along bottom
  var srcLabel = SOURCE_LABELS[agent.sourceIdx];
  var srcX = L3_X + (agent.sourceIdx + 0.5) * (L3_W / 3);
  var srcY = H - 28;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("text", {
    x: 8,
    y: 20,
    fontFamily: "var(--sans)",
    fontSize: "9",
    fontWeight: "500",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)"
  }, "L3 ENGINE"), agents.map(function (a, i) {
    var rr = Math.floor(i / COLS);
    var cc = i % COLS;
    var x = L3_X + cc * cellW;
    var y = L3_Y + rr * cellH;
    var isActive = a.code === agent.code;
    return /*#__PURE__*/React.createElement("g", {
      key: a.code
    }, /*#__PURE__*/React.createElement("rect", {
      x: x + 2,
      y: y + 2,
      width: cellW - 4,
      height: cellH - 4,
      fill: isActive ? "var(--accent)" : "var(--paper)",
      fillOpacity: isActive ? 0.18 : 1,
      stroke: isActive ? "var(--accent)" : "var(--ink-3)",
      strokeWidth: isActive ? 1.5 : 1,
      strokeOpacity: isActive ? 1 : 0.45
    }), /*#__PURE__*/React.createElement("text", {
      x: x + cellW / 2,
      y: y + cellH / 2 + 3.5,
      fontFamily: "var(--mono)",
      fontSize: "10",
      fontWeight: isActive ? "600" : "500",
      letterSpacing: "0.06em",
      fill: isActive ? "var(--ink)" : "var(--ink-3)",
      textAnchor: "middle"
    }, a.code));
  }), /*#__PURE__*/React.createElement("rect", {
    x: L3_X,
    y: L3_Y + L3_H + 16,
    width: L3_W,
    height: 12,
    fill: "var(--accent)",
    fillOpacity: "0.18"
  }), /*#__PURE__*/React.createElement("text", {
    x: L3_X,
    y: L3_Y + L3_H + 12,
    fontFamily: "var(--sans)",
    fontSize: "9",
    fontWeight: "500",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)"
  }, "L2 CONTRACT"), /*#__PURE__*/React.createElement("text", {
    x: L3_X,
    y: L3_Y + L3_H + 50,
    fontFamily: "var(--sans)",
    fontSize: "9",
    fontWeight: "500",
    letterSpacing: "0.10em",
    fill: "var(--ink-3)"
  }, "L1 / L0"), /*#__PURE__*/React.createElement("path", {
    d: "M ".concat(cellCx, " ").concat(cellY + cellH - 2, " L ").concat(cellCx, " ").concat(L3_Y + L3_H + 16, " L ").concat(srcX, " ").concat(L3_Y + L3_H + 28, " L ").concat(srcX, " ").concat(srcY - 14),
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: srcX - 22,
    y: srcY - 14,
    width: 44,
    height: 20,
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "1",
    strokeDasharray: "3 2"
  }), /*#__PURE__*/React.createElement("text", {
    x: srcX,
    y: srcY - 1,
    fontFamily: "var(--sans)",
    fontSize: "10",
    fontWeight: "600",
    letterSpacing: "0.06em",
    fill: "var(--ink)",
    textAnchor: "middle"
  }, srcLabel));
}

// ── Modal detail panel ──────────────────────────────────────────────

function AgentDetailModal(_ref3) {
  var agent = _ref3.agent,
    agents = _ref3.agents,
    copy = _ref3.copy,
    onClose = _ref3.onClose,
    returnRef = _ref3.returnRef;
  var panelRef = useRfA(null);

  // Focus management: trap inside, ESC to close, return focus on close.
  useEfA(function () {
    var previouslyFocused = returnRef && returnRef.current || document.activeElement;
    var panel = panelRef.current;
    if (!panel) return;
    var focusables = function focusables() {
      return Array.from(panel.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")).filter(function (el) {
        return !el.disabled && el.offsetParent !== null;
      });
    };
    var initial = focusables();
    if (initial.length > 0) initial[0].focus({
      preventScroll: true
    });
    var onKey = function onKey(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        var els = focusables();
        if (els.length === 0) return;
        var first = els[0];
        var last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return function () {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus({
          preventScroll: true
        });
      }
    };
  }, [agent, onClose, returnRef]);
  var onOverlayClick = function onOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  };
  var headingId = "agent-modal-".concat(agent.code, "-heading");
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onOverlayClick,
    role: "presentation"
  }, /*#__PURE__*/React.createElement("div", {
    ref: panelRef,
    className: "modal-panel",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": headingId
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
      paddingBottom: 24,
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, agent.number), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: "0.06em",
      color: "var(--ink)"
    }
  }, agent.code)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close detail panel",
    className: "tap",
    style: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "8px 4px",
      color: "var(--ink-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro"
  }, copy.closeLabel))), /*#__PURE__*/React.createElement("h2", {
    id: headingId,
    className: "t-h2",
    style: {
      margin: "32px 0 28px",
      color: "var(--ink)"
    }
  }, agent.domain), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, copy.practiceLabel), /*#__PURE__*/React.createElement("p", {
    className: "t-bodylg",
    style: {
      margin: 0,
      color: "var(--ink)",
      textWrap: "pretty"
    }
  }, agent.practiceAltitude)), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      height: 1,
      background: "var(--rule-soft)",
      margin: "8px 0 24px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, copy.businessLabel), /*#__PURE__*/React.createElement("p", {
    className: "t-bodylg",
    style: {
      margin: 0,
      color: "var(--ink)",
      textWrap: "pretty"
    }
  }, agent.businessAltitude)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--paper-2)",
      border: "1px solid var(--rule-soft)",
      padding: 20,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 200,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(MiniTopology, {
    agent: agent,
    agents: agents
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 20,
      borderTop: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "tap",
    style: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "4px 0",
      color: "var(--ink)",
      letterSpacing: "0.04em",
      fontWeight: 500
    }
  }, copy.backLabel))));
}

// ── Agents section ──────────────────────────────────────────────────

function Agents(_ref4) {
  var bp = _ref4.bp;
  var sm = bp === "sm";
  var A = window.AFFETTO && window.AFFETTO.agents || {
    agents: []
  };
  var agents = A.agents || [];
  var _useStA5 = useStA(null),
    _useStA6 = _slicedToArray(_useStA5, 2),
    selected = _useStA6[0],
    setSelected = _useStA6[1];
  var cardRefs = useRfA({});
  var triggerRef = useRfA(null);
  var onOpen = function onOpen(a) {
    var wrapper = cardRefs.current[a.code];
    triggerRef.current = (wrapper === null || wrapper === void 0 ? void 0 : wrapper.querySelector("button")) || wrapper || null;
    setSelected(a);
  };
  var onClose = function onClose() {
    return setSelected(null);
  };

  // Desktop ≥1100: 3×3. Tablet 768-1099: 3×3. Mobile: 2-col, last spans both.
  var template = sm ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))";
  return /*#__PURE__*/React.createElement("section", {
    id: "agents",
    style: {
      borderBottom: "1px solid var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingTop: sm ? 64 : 96,
      paddingBottom: sm ? 64 : 96
    }
  }, /*#__PURE__*/React.createElement(SectionMarker, {
    text: A.sectionMarker
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    className: "t-h2",
    style: {
      margin: "0 0 24px",
      color: "var(--ink)",
      textWrap: "balance",
      maxWidth: "32ch"
    }
  }, A.subhead)), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      margin: "0 0 56px",
      color: "var(--ink-3)",
      textWrap: "pretty"
    }
  }, A.detailHint)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: template,
      gap: 16
    }
  }, agents.map(function (a, i) {
    var last = i === agents.length - 1;
    var span = sm && last ? {
      gridColumn: "1 / -1"
    } : {};
    return /*#__PURE__*/React.createElement(Reveal, {
      key: a.code,
      delay: i * 40,
      style: span
    }, /*#__PURE__*/React.createElement("div", {
      ref: function ref(el) {
        cardRefs.current[a.code] = el;
      }
    }, /*#__PURE__*/React.createElement(AgentCard, {
      a: a,
      onOpen: onOpen
    })));
  }))), selected && /*#__PURE__*/React.createElement(AgentDetailModal, {
    agent: selected,
    agents: agents,
    copy: {
      practiceLabel: A.practiceLabel,
      businessLabel: A.businessLabel,
      closeLabel: A.closeLabel,
      backLabel: A.backLabel
    },
    onClose: onClose,
    returnRef: triggerRef
  }));
}
window.Agents = Agents;
