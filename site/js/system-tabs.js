"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// system-tabs.jsx — v0.11.0
// Single tabbed §02 section that replaces both the pinned-scroll System
// and the standalone Live Engine sections. Three tabs: Architecture,
// Engine, Output. Persistent metric strip across all tabs. Crossfade
// transition between panels.
//
// Design intent: the user investigates the system on their own terms.
// No scroll lock, no animation choreography. One section's worth of
// vertical space carries three coordinated views.

var _React = React,
  useStST = _React.useState,
  useEfST = _React.useEffect,
  useRfST = _React.useRef;

// ─── Tab definitions ────────────────────────────────────────────────

var TABS = [{
  id: "architecture",
  label: "Architecture",
  sub: "L0 → L3 layered topology"
}, {
  id: "engine",
  label: "Engine",
  sub: "Cross-agent coordination"
}, {
  id: "output",
  label: "Output",
  sub: "Live demonstration stream"
}];

// ─── Tab pill (left column) ─────────────────────────────────────────

function TabPill(_ref) {
  var tab = _ref.tab,
    isActive = _ref.isActive,
    onClick = _ref.onClick;
  var _useStST = useStST(false),
    _useStST2 = _slicedToArray(_useStST, 2),
    hover = _useStST2[0],
    setHover = _useStST2[1];

  // Three visual states:
  //   active:   ink background, paper text, accent dot prefix
  //   hover:    paper-2 background, ink text, + icon prefix (slightly lifted)
  //   inactive: paper-2 background, ink-2 text, + icon prefix
  var bg = isActive ? "var(--ink)" : hover ? "var(--paper)" : "var(--paper-2)";
  var fg = isActive ? "var(--paper)" : "var(--ink)";
  var subFg = isActive ? "rgba(250,250,248,0.65)" : "var(--ink-3)";
  var borderColor = isActive ? "var(--ink)" : "var(--rule-soft)";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
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
    "aria-pressed": isActive,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      width: "100%",
      textAlign: "left",
      padding: "16px 20px",
      background: bg,
      border: "1px solid ".concat(borderColor),
      borderRadius: 999,
      cursor: "pointer",
      transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease",
      font: "inherit",
      color: fg,
      transform: hover && !isActive ? "translateX(2px)" : "translateX(0)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flexShrink: 0,
      width: 22,
      height: 22,
      borderRadius: 99,
      border: isActive ? "none" : "1px solid ".concat(hover ? "var(--ink-2)" : "var(--ink-3)"),
      background: isActive ? "var(--accent)" : "transparent",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 200ms ease, border-color 200ms ease"
    }
  }, !isActive && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1,
      color: hover ? "var(--ink)" : "var(--ink-3)",
      transition: "color 200ms ease"
    }
  }, "+")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      minWidth: 0,
      flex: "1 1 auto"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: "-0.01em",
      color: fg
    }
  }, tab.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: subFg
    }
  }, tab.sub)));
}

// ─── Mobile tab chips (horizontal scrollable) ───────────────────────

function MobileTabChip(_ref2) {
  var tab = _ref2.tab,
    isActive = _ref2.isActive,
    onClick = _ref2.onClick;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-pressed": isActive,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 16px",
      background: isActive ? "var(--ink)" : "var(--paper-2)",
      color: isActive ? "var(--paper)" : "var(--ink)",
      border: "1px solid ".concat(isActive ? "var(--ink)" : "var(--rule-soft)"),
      borderRadius: 999,
      cursor: "pointer",
      whiteSpace: "nowrap",
      font: "inherit",
      fontFamily: "var(--sans)",
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: "-0.01em",
      transition: "background-color 200ms ease, color 200ms ease, border-color 200ms ease",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 8,
      height: 8,
      borderRadius: 99,
      background: isActive ? "var(--accent)" : "transparent",
      border: isActive ? "none" : "1px solid var(--ink-3)"
    }
  }), tab.label);
}

// ─── Architecture panel ─────────────────────────────────────────────

function ArchitecturePanel(_ref3) {
  var bp = _ref3.bp;
  var sm = bp === "sm";
  var md = bp === "md";
  var orientation = sm || md ? "vertical" : "horizontal";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(LivingTopology, {
    orientation: orientation
  }));
}

// ─── Engine panel ───────────────────────────────────────────────────

function EnginePanel(_ref4) {
  var active = _ref4.active,
    bp = _ref4.bp;
  var sm = bp === "sm";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: sm ? 8 : 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 560,
      aspectRatio: "1 / 1"
    }
  }, /*#__PURE__*/React.createElement(OrbitalTopology, {
    active: active
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 16,
      width: "100%",
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
  }, "9 agents \xB7 17 edges")));
}

// ─── Output panel ───────────────────────────────────────────────────

function OutputPanel(_ref5) {
  var _window$AFFETTO;
  var active = _ref5.active,
    bp = _ref5.bp;
  var sm = bp === "sm";
  var data = ((_window$AFFETTO = window.AFFETTO) === null || _window$AFFETTO === void 0 ? void 0 : _window$AFFETTO.liveEngine) || {};
  var pool = data.streamPool || [];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
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
  })));
}

// ─── Section composition ────────────────────────────────────────────

function SystemTabs(_ref6) {
  var _window$AFFETTO2, _window$AFFETTO3;
  var bp = _ref6.bp;
  var sm = bp === "sm";
  var md = bp === "md";
  var stacked = sm || md;
  var wrapRef = useRfST(null);
  var inView = useInViewport(wrapRef, {
    threshold: 0.1
  });
  var tabVisible = useTabVisibility();
  var sectionActive = inView && tabVisible;
  var _useStST3 = useStST("architecture"),
    _useStST4 = _slicedToArray(_useStST3, 2),
    activeTab = _useStST4[0],
    setActiveTab = _useStST4[1];
  var S = ((_window$AFFETTO2 = window.AFFETTO) === null || _window$AFFETTO2 === void 0 ? void 0 : _window$AFFETTO2.system) || {};
  var E = ((_window$AFFETTO3 = window.AFFETTO) === null || _window$AFFETTO3 === void 0 ? void 0 : _window$AFFETTO3.liveEngine) || {};
  var metrics = E.metrics || [];

  // Section marker — bridges both topics now
  var marker = "§02 · The system · Live engine";

  // Engine and Output panels need to know if they should animate. Animation
  // runs only when (a) the section is in view and tab is visible, and (b)
  // the panel's tab is the currently active one.
  var engineActive = sectionActive && activeTab === "engine";
  var outputActive = sectionActive && activeTab === "output";
  return /*#__PURE__*/React.createElement("section", {
    id: "system",
    ref: wrapRef,
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
    text: marker
  }), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-h1",
    style: {
      margin: "0 0 16px",
      color: "var(--ink)",
      textWrap: "balance",
      maxWidth: "26ch"
    }
  }, S.subhead)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-micro",
    style: {
      margin: "0 0 48px",
      color: "var(--ink-3)",
      letterSpacing: "0.10em"
    }
  }, "One engine. Three views. Architecture, operations, output.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: sm ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: 0,
      border: "1px solid var(--ink)",
      borderBottom: "none",
      background: "var(--paper)",
      marginBottom: 0
    }
  }, metrics.map(function (m, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: m.label,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: sm ? "16px 14px" : "20px 22px",
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
        fontSize: sm ? 22 : 26,
        fontWeight: 500,
        letterSpacing: "-0.02em",
        color: "var(--ink)",
        lineHeight: 1.0
      }
    }, m.value));
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 180
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      flexWrap: "wrap",
      padding: sm ? "12px 16px" : "14px 22px",
      background: "var(--ink)",
      color: "var(--paper)",
      borderLeft: "1px solid var(--ink)",
      borderRight: "1px solid var(--ink)"
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
      animation: sectionActive ? "pulse 2.4s ease-in-out infinite" : "none",
      display: "inline-block",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--paper)"
    }
  }, "STREAMING"), !sm && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
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
  }, E.agentStatus || "9/9 nominal"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--ink)",
      background: "var(--paper)",
      display: "grid",
      gridTemplateColumns: stacked ? "1fr" : "minmax(260px, 320px) 1fr",
      minHeight: stacked ? 0 : 540
    }
  }, stacked ?
  /*#__PURE__*/
  // Mobile: horizontal scrollable chip row
  React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      padding: 16,
      overflowX: "auto",
      borderBottom: "1px solid var(--rule-soft)",
      WebkitOverflowScrolling: "touch"
    }
  }, TABS.map(function (tab) {
    return /*#__PURE__*/React.createElement(MobileTabChip, {
      key: tab.id,
      tab: tab,
      isActive: activeTab === tab.id,
      onClick: function onClick() {
        return setActiveTab(tab.id);
      }
    });
  })) :
  /*#__PURE__*/
  // Desktop: vertical pill stack
  React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      padding: 24,
      borderRight: "1px solid var(--rule-soft)",
      background: "var(--paper)"
    }
  }, TABS.map(function (tab) {
    return /*#__PURE__*/React.createElement(TabPill, {
      key: tab.id,
      tab: tab,
      isActive: activeTab === tab.id,
      onClick: function onClick() {
        return setActiveTab(tab.id);
      }
    });
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 16,
      borderTop: "1px solid var(--rule-softer)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, S.liveCaption))), /*#__PURE__*/React.createElement("div", {
    key: activeTab,
    className: "system-tab-panel",
    style: {
      padding: stacked ? 16 : 28,
      display: "flex",
      alignItems: "stretch",
      justifyContent: "center",
      minHeight: stacked ? 360 : 0
    }
  }, activeTab === "architecture" && /*#__PURE__*/React.createElement(ArchitecturePanel, {
    bp: bp
  }), activeTab === "engine" && /*#__PURE__*/React.createElement(EnginePanel, {
    active: engineActive,
    bp: bp
  }), activeTab === "output" && /*#__PURE__*/React.createElement(OutputPanel, {
    active: outputActive,
    bp: bp
  })))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 280
  }, /*#__PURE__*/React.createElement("blockquote", {
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
  }, S.whatThisMeansBeat)))));
}
window.SystemTabs = SystemTabs;
