"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// forces.jsx — v0.8.0
// Rebuild from a clean canvas per spec §4. All five cards share a single
// anatomy. Each card's 160px visual region renders one of five visual
// types defined in content.jsx via card.visualType. Heights are equalized
// across the row via align-items: stretch — the longest card body sets
// the row height (≥480px floor on desktop).
//
// Card anatomy (top → bottom):
//   1. Number       — 80px region, display weight 500, ink-4
//   2. Visual       — 160px fixed-height region, centered, per visualType
//   3. Caption      — 32px region, micro / ink-3 / uppercase
//   4. Spacer       — 24px gap
//   5. Name         — 32px region, h3 / weight 600 / ink, letter-spaced
//   6. Body         — flex-grow, body / ink-2 / line-height 1.55
//
// All visuals are inline SVG sized to fit exactly the 160px visual region.

// ── Per-card visual sub-components ──────────────────────────────────

function ForceVisualStat(_ref) {
  var statValue = _ref.statValue;
  // Render the stat as SVG with a viewBox so it scales to fit the card width.
  //
  // Sizing strategy:
  //   - width="100%" makes the SVG fill the container's width.
  //   - height="auto" lets browser compute height from the viewBox aspect ratio.
  //   - This way, the stat ALWAYS scales to the card width, never overflows.
  //   - viewBox 280×80 gives ~16% headroom over the natural width of "~100,000"
  //     at fontSize 64 with letterSpacing -0.04em (~240 units), so even with
  //     edge-case font rendering or character variation, the glyphs fit inside
  //     the SVG bounding box.
  //   - Outer flexbox alignment keeps the (now shorter than 160px) SVG centered
  //     vertically within the 160px visual region.
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 280 80",
    width: "100%",
    preserveAspectRatio: "xMinYMid meet",
    "aria-hidden": "true",
    style: {
      display: "block",
      height: "auto",
      maxHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement("text", {
    x: "0",
    y: "64",
    fontFamily: "var(--display)",
    fontSize: "64",
    fontWeight: "500",
    letterSpacing: "-0.04em",
    fill: "var(--ink)"
  }, statValue)));
}
function ForceVisualComparisonBars(_ref2) {
  var comparisonData = _ref2.comparisonData;
  var data = comparisonData || {
    care: 100,
    operations: 128,
    careLabel: "CARE COST",
    opsLabel: "OPERATIONS COST"
  };
  var max = Math.max(data.care, data.operations);
  var carePct = data.care / max * 100;
  var opsPct = data.operations / max * 100;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, data.careLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 14,
      width: "".concat(carePct, "%"),
      background: "var(--ink-3)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink)"
    }
  }, data.opsLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 14,
      width: "".concat(opsPct, "%"),
      background: "var(--ink)"
    }
  })));
}
function ForceVisualStateShift(_ref3) {
  var stateBefore = _ref3.stateBefore,
    stateAfter = _ref3.stateAfter;
  var before = stateBefore || {
    label: "INTERFACE"
  };
  var after = stateAfter || {
    label: "ACTOR"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      border: "1px solid var(--ink)",
      borderRadius: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 7,
      padding: "0 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--ink-3)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--ink-3)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--ink-3)",
      width: "70%"
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, before.label)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: "var(--mono)",
      fontSize: 14,
      color: "var(--ink-3)"
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      border: "1px solid var(--ink)",
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: 99,
      background: "var(--accent)",
      display: "inline-block"
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, after.label)));
}
function ForceVisualFragmentation(_ref4) {
  var _ref4$scatteredCount = _ref4.scatteredCount,
    scatteredCount = _ref4$scatteredCount === void 0 ? 7 : _ref4$scatteredCount;
  // Top half: scattered dots at deterministic coordinates (no randomness).
  // Middle: 1px accent rule.
  // Bottom half: 5 evenly-spaced ink dots connected by an ink line.
  var scatter = [{
    x: 14,
    y: 14
  }, {
    x: 38,
    y: 28
  }, {
    x: 64,
    y: 8
  }, {
    x: 96,
    y: 20
  }, {
    x: 124,
    y: 6
  }, {
    x: 158,
    y: 22
  }, {
    x: 188,
    y: 14
  }].slice(0, scatteredCount);
  var aligned = [10, 55, 100, 145, 190].map(function (x) {
    return {
      x: x,
      y: 110
    };
  });
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 130",
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true"
  }, scatter.map(function (d, i) {
    return /*#__PURE__*/React.createElement("circle", {
      key: "s".concat(i),
      cx: d.x,
      cy: d.y,
      r: "2.5",
      fill: "var(--ink-3)"
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "65",
    x2: "200",
    y2: "65",
    stroke: "var(--accent)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: aligned[0].x,
    y1: aligned[0].y,
    x2: aligned[aligned.length - 1].x,
    y2: aligned[aligned.length - 1].y,
    stroke: "var(--ink)",
    strokeWidth: "1"
  }), aligned.map(function (d, i) {
    return /*#__PURE__*/React.createElement("circle", {
      key: "a".concat(i),
      cx: d.x,
      cy: d.y,
      r: "2.5",
      fill: "var(--ink)"
    });
  }));
}
function pickVisual(card) {
  switch (card.visualType) {
    case "stat":
      return /*#__PURE__*/React.createElement(ForceVisualStat, {
        statValue: card.statValue
      });
    case "comparison-bars":
      return /*#__PURE__*/React.createElement(ForceVisualComparisonBars, {
        comparisonData: card.comparisonData
      });
    case "state-shift":
      return /*#__PURE__*/React.createElement(ForceVisualStateShift, {
        stateBefore: card.stateBefore,
        stateAfter: card.stateAfter
      });
    case "fragmentation":
      return /*#__PURE__*/React.createElement(ForceVisualFragmentation, {
        scatteredCount: card.scatteredCount
      });
    default:
      return null;
  }
}

// ── Card ────────────────────────────────────────────────────────────

function ForceCard(_ref5) {
  var card = _ref5.card,
    sm = _ref5.sm;
  return /*#__PURE__*/React.createElement("article", {
    className: "force-card",
    style: {
      border: "1px solid var(--ink)",
      background: "var(--paper)",
      padding: sm ? "24px 20px" : "32px 28px",
      display: "flex",
      flexDirection: "column",
      minHeight: sm ? 0 : 480,
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 80,
      display: "flex",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--display)",
      fontSize: sm ? 56 : 72,
      fontWeight: 500,
      letterSpacing: "-0.04em",
      lineHeight: 1.0,
      color: "var(--ink-4)"
    }
  }, card.number)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 160,
      width: "100%",
      display: "flex",
      alignItems: "stretch"
    }
  }, pickVisual(card)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 32,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, card.statCaption)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 32,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: "var(--t-h3)",
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--ink)",
      lineHeight: 1.1
    }
  }, card.name)), /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      margin: "8px 0 0",
      color: "var(--ink-2)",
      textWrap: "pretty",
      flex: "1 1 auto",
      lineHeight: 1.55,
      maxWidth: "44ch"
    }
  }, card.line));
}

// ── Section ─────────────────────────────────────────────────────────

function FiveForces(_ref6) {
  var bp = _ref6.bp;
  var sm = bp === "sm";
  var md = bp === "md";
  var F = window.AFFETTO && window.AFFETTO.forces || {
    cards: []
  };

  // Layout strategy:
  //   Mobile (sm):  single column.
  //   Tablet (md):  2 cols. Last card spans full width on its own row.
  //   Desktop (lg): 3+2 asymmetric — first three cards (industry forces:
  //                 Consolidation, Restructuring, Labor) sit in row one;
  //                 last two (technology forces: Autonomy, Fragmentation)
  //                 sit in row two at 1/2 width each. Gives each card
  //                 75–167% more horizontal real estate vs the old 5-across.
  var topCards = F.cards.slice(0, 3);
  var bottomCards = F.cards.slice(3);

  // Per-breakpoint grid templates
  var mobileTemplate = "1fr";
  var tabletTemplate = "repeat(2, minmax(0, 1fr))";
  var topTemplate = "repeat(3, minmax(0, 1fr))";
  var bottomTemplate = "repeat(2, minmax(0, 1fr))";
  var gap = 16;
  var rowGap = 16;
  if (sm) gap = 24;
  return /*#__PURE__*/React.createElement("section", {
    id: "forces",
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
    text: F.sectionMarker
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    className: "t-h2",
    style: {
      margin: "0 0 24px",
      color: "var(--ink)",
      textWrap: "balance",
      maxWidth: "26ch"
    }
  }, F.subhead)), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "t-bodylg",
    style: {
      margin: "0 0 64px",
      color: "var(--ink-2)",
      textWrap: "pretty",
      maxWidth: "70ch"
    }
  }, F.leadIn)), sm && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: mobileTemplate,
      gap: gap,
      alignItems: "stretch"
    }
  }, F.cards.map(function (card, i) {
    return /*#__PURE__*/React.createElement(Reveal, {
      key: card.number,
      delay: i * 60,
      style: {
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement(ForceCard, {
      card: card,
      sm: sm
    }));
  })), md && !sm && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: tabletTemplate,
      gap: gap,
      alignItems: "stretch"
    }
  }, F.cards.map(function (card, i) {
    var last = i === F.cards.length - 1;
    var span = last ? {
      gridColumn: "1 / -1"
    } : {};
    return /*#__PURE__*/React.createElement(Reveal, {
      key: card.number,
      delay: i * 60,
      style: _objectSpread(_objectSpread({}, span), {}, {
        height: "100%"
      })
    }, /*#__PURE__*/React.createElement(ForceCard, {
      card: card,
      sm: sm
    }));
  })), !sm && !md && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: rowGap
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: topTemplate,
      gap: gap,
      alignItems: "stretch"
    }
  }, topCards.map(function (card, i) {
    return /*#__PURE__*/React.createElement(Reveal, {
      key: card.number,
      delay: i * 60,
      style: {
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement(ForceCard, {
      card: card,
      sm: sm
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: bottomTemplate,
      gap: gap,
      alignItems: "stretch"
    }
  }, bottomCards.map(function (card, i) {
    return /*#__PURE__*/React.createElement(Reveal, {
      key: card.number,
      delay: (i + 3) * 60,
      style: {
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement(ForceCard, {
      card: card,
      sm: sm
    }));
  })))));
}
window.FiveForces = FiveForces;
