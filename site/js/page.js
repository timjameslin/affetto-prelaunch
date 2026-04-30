"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// page.jsx — v0.8.0
// Page composition. Reads every string from window.AFFETTO. Rebuilds:
//   • TopBar         — 36px chrome rail, HH:MM clock pair, COMING SOON badge
//   • Masthead       — 64px wordmark band, square tile + AFFETTO + tagline
//   • SectionMarker  — replaces v7 SectionHeader; thin marker over content
//   • Hero           — 88vh stage with text stage 1 centered, preview pinned
//                      to the bottom of the viewport (HeroPreview from v8)
//   • System         — living topology + "what this means" left-ruled beat
//   • Access         — refined form, larger CTA, audience selector
//
// Forces, Outcomes, Agents, Lifecycle, TrustStrip, FooterBar are composed
// here from their own modules.

var _React = React,
  useStP = _React.useState,
  useEfP = _React.useEffect;
function useBp() {
  var get = function get() {
    if (typeof window === "undefined") return "lg";
    var w = window.innerWidth;
    if (w < 768) return "sm";
    if (w < 1100) return "md";
    return "lg";
  };
  var _useStP = useStP(get),
    _useStP2 = _slicedToArray(_useStP, 2),
    bp = _useStP2[0],
    setBp = _useStP2[1];
  useEfP(function () {
    var r = function r() {
      return setBp(get());
    };
    window.addEventListener("resize", r);
    return function () {
      return window.removeEventListener("resize", r);
    };
  }, []);
  return bp;
}

// ─── Top bar ───────────────────────────────────────────────────────────
// 36px tall chrome rail. All text 11px (sub-token chrome floor). Status
// dot pulses with the page heartbeat. Clocks at HH:MM (no seconds — would
// be too kinetic for chrome).

function TopBar(_ref) {
  var bp = _ref.bp;
  var time = useLiveClock("America/Los_Angeles", false);
  var utc = useLiveClock("UTC", false);
  var T = window.AFFETTO && window.AFFETTO.topbar || {};
  var meta = window.AFFETTO && window.AFFETTO.meta || {};
  return /*#__PURE__*/React.createElement("header", {
    className: "topbar",
    "data-print-static": "",
    style: {
      borderBottom: "1px solid var(--ink)",
      background: "var(--paper)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      height: 36,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: "var(--accent)",
      display: "inline-block",
      animation: "pulse 2.4s ease-in-out infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      color: "var(--ink)"
    }
  }, T.statusLabel), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 1,
      height: 12,
      background: "var(--rule-soft)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      color: "var(--ink-3)"
    }
  }, "BUILD ", meta.buildVersion || "0.8.0")), bp !== "sm" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      fontFamily: "var(--mono)",
      fontSize: 11,
      color: "var(--ink-3)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "LAX ", time || "—"), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "UTC ", utc || "—")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      color: "var(--ink-3)"
    }
  }, T.rightLabel)));
}

// ─── Masthead ──────────────────────────────────────────────────────────
// 64px tall band sitting under the TopBar.
//   ▣  AFFETTO   |  Operational infrastructure / Dentistry      LOS ANGELES, CA

function Masthead(_ref2) {
  var bp = _ref2.bp;
  var M = window.AFFETTO && window.AFFETTO.masthead || {};
  var brand = window.AFFETTO && window.AFFETTO.brand || {};
  var sm = bp === "sm";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "1px solid var(--rule-soft)",
      height: 64,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 12,
      height: 12,
      background: "var(--ink)",
      display: "inline-block"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--display)",
      fontWeight: 600,
      fontSize: 18,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--ink)"
    }
  }, brand.wordmark || "AFFETTO"), !sm && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 1,
      height: 14,
      background: "var(--rule-soft)",
      marginLeft: 6
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      color: "var(--ink-3)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, M.tagline))), !sm && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      color: "var(--ink-3)"
    }
  }, M.location)));
}

// ─── Section marker ────────────────────────────────────────────────────
// One-line marker that sits above section content. No rule below — the
// section itself carries the structural rule. text format: "§01 · Thesis".

function SectionMarker(_ref3) {
  var text = _ref3.text;
  if (!text) return null;
  // Split into "§NN" prefix and remainder so the prefix can carry accent.
  var m = String(text).match(/^(§\s*\d+)\s*·?\s*(.*)$/);
  var prefix = m ? m[1] : text;
  var rest = m ? m[2] : "";
  return /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "baseline",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--accent)"
    }
  }, prefix), rest && /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)"
    }
  }, "\xB7"), rest && /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink)"
    }
  }, rest)));
}

// ─── Hero ──────────────────────────────────────────────────────────────
// 88vh band with two stages:
//   Stage 1 (text)     — vertically centered in the upper portion
//   Stage 2 (preview)  — anchored to the bottom of the band
// Container width is 1080px (narrower than the main 1280px) for hero focus.

function Hero(_ref4) {
  var bp = _ref4.bp;
  var sm = bp === "sm";
  var H = window.AFFETTO && window.AFFETTO.hero || {};
  var onCta = function onCta(e) {
    e.preventDefault();
    var target = document.getElementById("access");
    if (target && target.scrollIntoView) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      setTimeout(function () {
        var input = target.querySelector("input[type=email]");
        if (input) input.focus({
          preventScroll: true
        });
      }, 600);
    } else if (target) {
      window.location.hash = "access";
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderBottom: "1px solid var(--ink)",
      minHeight: sm ? "auto" : "88vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-container",
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: sm ? "flex-start" : "space-between",
      paddingTop: sm ? 56 : 80,
      paddingBottom: sm ? 56 : 56,
      paddingLeft: "var(--margin)",
      paddingRight: "var(--margin)",
      maxWidth: 1280,
      margin: "0 auto",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flex: sm ? "none" : "1 1 auto",
      paddingTop: sm ? 0 : 24,
      width: "100%",
      maxWidth: sm ? "100%" : "min(720px, 62%)"
    }
  }, /*#__PURE__*/React.createElement(SectionMarker, {
    text: H.sectionMarker
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h1", {
    className: "t-display",
    style: {
      margin: 0,
      color: "var(--ink)",
      textWrap: "balance",
      maxWidth: "18ch"
    }
  }, H.headline)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-bodylg",
    style: {
      margin: sm ? "20px 0 0" : "28px 0 0",
      color: "var(--ink-2)",
      textWrap: "pretty",
      maxWidth: "60ch"
    }
  }, H.subhead)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      margin: sm ? "20px 0 0" : "24px 0 0",
      color: "var(--ink-2)",
      textWrap: "pretty",
      maxWidth: "62ch"
    }
  }, H.substanceParagraph)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: sm ? 32 : 44,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: H.ctaTarget || "#access",
    onClick: onCta,
    className: "cta-primary tap"
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", null, H.ctaLabel)), H.metadataStrip && H.metadataStrip.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 12,
      letterSpacing: "0.10em",
      color: "var(--ink-3)",
      textTransform: "uppercase"
    }
  }, H.metadataStrip.join("  ·  ")))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 420
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: sm ? 56 : 64,
      paddingTop: sm ? 28 : 40,
      borderTop: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement(HeroPreview, {
    bp: bp,
    animate: true
  })))));
}

// ─── System ────────────────────────────────────────────────────────────
function System(_ref5) {
  var bp = _ref5.bp;
  var sm = bp === "sm";
  var md = bp === "md";
  var orientation = sm || md ? "vertical" : "horizontal";
  var S = window.AFFETTO && window.AFFETTO.system || {};
  return /*#__PURE__*/React.createElement("section", {
    id: "system",
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
  }), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-h1",
    style: {
      margin: 0,
      color: "var(--ink)",
      textWrap: "balance",
      maxWidth: "26ch"
    }
  }, S.subhead)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: sm ? 32 : 56
    }
  }, /*#__PURE__*/React.createElement(LivingTopology, {
    orientation: orientation
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
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
  }, S.liveCaption))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 400
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

// ─── Access ────────────────────────────────────────────────────────────
function Access(_ref6) {
  var bp = _ref6.bp;
  var sm = bp === "sm";
  var A = window.AFFETTO && window.AFFETTO.access || {};
  var _useStP3 = useStP(""),
    _useStP4 = _slicedToArray(_useStP3, 2),
    email = _useStP4[0],
    setEmail = _useStP4[1];
  var _useStP5 = useStP(""),
    _useStP6 = _slicedToArray(_useStP5, 2),
    audience = _useStP6[0],
    setAudience = _useStP6[1];
  var _useStP7 = useStP(false),
    _useStP8 = _slicedToArray(_useStP7, 2),
    submitted = _useStP8[0],
    setSubmitted = _useStP8[1];
  return /*#__PURE__*/React.createElement("section", {
    id: "access",
    style: {
      borderBottom: "1px solid var(--rule-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingTop: sm ? 64 : 96,
      paddingBottom: sm ? 64 : 96
    }
  }, /*#__PURE__*/React.createElement(SectionMarker, {
    text: A.sectionMarker
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: bp === "lg" ? "minmax(0, 5fr) minmax(0, 7fr)" : "1fr",
      gap: bp === "lg" ? 64 : 40,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)",
      display: "inline-block",
      marginBottom: 16
    }
  }, A.eyebrow)), /*#__PURE__*/React.createElement(RevealWords, {
    as: "h2",
    text: A.headline || "Request early access.",
    className: "t-h1",
    style: {
      margin: 0,
      color: "var(--ink)"
    }
  }), /*#__PURE__*/React.createElement(Reveal, {
    delay: 300
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-bodylg",
    style: {
      margin: "24px 0 0",
      color: "var(--ink-2)",
      textWrap: "pretty",
      maxWidth: "44ch"
    }
  }, A.subhead)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 420
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      margin: "20px 0 0",
      color: "var(--ink-2)"
    }
  }, A.closingLine))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, {
    delay: 400
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      if (email) setSubmitted(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      color: "var(--ink-3)"
    }
  }, A.emailLabel), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    },
    placeholder: A.emailPlaceholder,
    disabled: submitted,
    required: true,
    className: "tap form-input"
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--sans)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      color: "var(--ink-3)",
      display: "inline-flex",
      gap: 6,
      alignItems: "baseline"
    }
  }, A.audienceLabel, /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "none",
      letterSpacing: 0,
      color: "var(--ink-3)"
    }
  }, A.audienceOptional)), /*#__PURE__*/React.createElement("select", {
    value: audience,
    onChange: function onChange(e) {
      return setAudience(e.target.value);
    },
    disabled: submitted,
    className: "tap form-select",
    style: {
      color: audience ? "var(--ink)" : "var(--ink-3)"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, A.audiencePlaceholder), (A.audienceOptions || []).map(function (o) {
    return /*#__PURE__*/React.createElement("option", {
      key: o.value,
      value: o.value
    }, o.label);
  }))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: submitted,
    className: "tap form-submit",
    "data-submitted": submitted ? "true" : "false"
  }, submitted ? A.submittedLabel : A.submitLabel, !submitted && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192"))))))));
}

// ─── Trust strip ───────────────────────────────────────────────────────
function TrustStrip() {
  var items = window.AFFETTO && window.AFFETTO.trustStrip || [];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--rule-soft)",
      borderBottom: "1px solid var(--ink)",
      background: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingTop: 20,
      paddingBottom: 20,
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "var(--ink-3)",
      letterSpacing: "0.10em"
    }
  }, items.join(" · "))));
}

// ─── Footer ────────────────────────────────────────────────────────────
function FooterBar(_ref7) {
  var bp = _ref7.bp;
  var sm = bp === "sm";
  var F = window.AFFETTO && window.AFFETTO.footer || {};
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--ink)",
      color: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingTop: 28,
      paddingBottom: 28,
      display: "grid",
      gridTemplateColumns: sm ? "1fr" : "2fr 2fr 2fr 1fr",
      gap: sm ? 12 : 24,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--display)",
      fontWeight: 600,
      fontSize: 16,
      letterSpacing: "0.06em",
      textTransform: "uppercase"
    }
  }, F.wordmarkLine)), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "rgba(250,250,248,0.55)"
    }
  }, F.organizationLine), /*#__PURE__*/React.createElement("a", {
    href: "mailto:".concat(F.contactLine),
    className: "t-caption",
    style: {
      color: "var(--paper)",
      borderBottom: "1px solid rgba(250,250,248,0.4)",
      paddingBottom: 1,
      justifySelf: "start"
    }
  }, F.contactLine), /*#__PURE__*/React.createElement("span", {
    className: "t-micro",
    style: {
      color: "rgba(250,250,248,0.55)",
      textAlign: sm ? "left" : "right"
    }
  }, F.copyrightLine)));
}

// ─── Page ──────────────────────────────────────────────────────────────
function InlineCta(_ref8) {
  var bp = _ref8.bp;
  // Quiet typographic mid-page affordance. Per marketing feedback: capture
  // the buyer at peak interest after they've seen the Outcomes proof points,
  // before they have to scroll all the way down. Restraint: typographic line,
  // not a button. Arrow shifts on hover.
  var sm = bp === "sm";
  var data = window.AFFETTO && window.AFFETTO.inlineCta || {};
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderBottom: "1px solid var(--ink)",
      background: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingTop: sm ? 48 : 72,
      paddingBottom: sm ? 48 : 72,
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: data.target || "#access",
    className: "inline-cta",
    style: {
      fontFamily: "var(--sans)",
      fontSize: sm ? 18 : 22,
      fontWeight: 500,
      letterSpacing: "-0.015em",
      color: "var(--ink)",
      textAlign: "center",
      display: "inline-flex",
      alignItems: "baseline",
      gap: 14,
      textDecoration: "none",
      borderBottom: "1px solid var(--rule-soft)",
      paddingBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, data.label), /*#__PURE__*/React.createElement("span", {
    className: "inline-cta-arrow",
    style: {
      display: "inline-block",
      transition: "transform 200ms ease"
    }
  }, data.arrow || "→"))));
}
window.InlineCta = InlineCta;
function Page() {
  var bp = useBp();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopBar, {
    bp: bp
  }), /*#__PURE__*/React.createElement(Masthead, {
    bp: bp
  }), /*#__PURE__*/React.createElement(Hero, {
    bp: bp
  }), /*#__PURE__*/React.createElement(System, {
    bp: bp
  }), /*#__PURE__*/React.createElement(FiveForces, {
    bp: bp
  }), /*#__PURE__*/React.createElement(Outcomes, {
    bp: bp
  }), /*#__PURE__*/React.createElement(InlineCta, {
    bp: bp
  }), /*#__PURE__*/React.createElement(Agents, {
    bp: bp
  }), /*#__PURE__*/React.createElement(Lifecycle, {
    bp: bp
  }), /*#__PURE__*/React.createElement(Access, {
    bp: bp
  }), /*#__PURE__*/React.createElement(TrustStrip, null), /*#__PURE__*/React.createElement(FooterBar, {
    bp: bp
  }));
}
window.SectionMarker = SectionMarker;
window.Page = Page;
