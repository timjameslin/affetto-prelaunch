"use strict";

// content.jsx — v0.8.0
// Single source of truth for all copy on the Affetto pre-launch page.
// Every JSX component reads from window.AFFETTO. Editing any string here is
// a one-line change with no JSX edits required. Visual tokens, animation
// timings, and layout structure are NOT in this file by design.

var AFFETTO = {
  meta: {
    buildVersion: "0.11.1",
    buildSha: "a3f9c2",
    location: {
      city: "Los Angeles",
      region: "California",
      "short": "LAX"
    },
    domain: "affetto.io",
    publicReleaseQuarter: "Q3 2026"
  },
  brand: {
    wordmark: "AFFETTO",
    legalName: "THE AFFETTO GROUP",
    tagline: "Operational Infrastructure - Dentistry",
    contactEmail: "partners@affetto.io",
    founderEmail: "tim.lin@affetto.io",
    copyrightLine: "© 2026 · STEALTH PRELAUNCH"
  },
  topbar: {
    statusLabel: "PRE-LAUNCH",
    rightLabel: "WORK IN PROGRESS"
  },
  masthead: {
    tagline: "OPERATIONAL INFRASTRUCTURE - DENTISTRY",
    location: "LOS ANGELES, CA"
  },
  hero: {
    sectionMarker: "§01 · Thesis",
    headline: "The operational layer for dentistry.",
    subhead: "",
    substanceParagraph: "Affetto is the operating infrastructure between the dental practice and the business that runs it, with specialized agents on a shared data substrate, indifferent to the practice management system underneath. One engine for an independent practice, a multi-site group, or a portfolio. From day-one diligence through steady-state operation, end-to-end.",
    ctaLabel: "Request early access",
    ctaTarget: "#access",
    metadataStrip: ["9 AGENTS", "ANY PMS", "LOS ANGELES", "2026"],
    previewCaption: "FIG. 00 / SYSTEM PREVIEW",
    previewJump: "§02 →"
  },
  system: {
    sectionMarker: "§02 · The system",
    subhead: "One engine. Any practice management system. Any scale.",
    layers: [{
      tag: "L0",
      name: "SOURCE",
      caption: "Wherever the practice already runs its data"
    }, {
      tag: "L1",
      name: "CONNECTORS",
      caption: "One adapter per system — Dentrix, Eaglesoft, Open Dental, Curve"
    }, {
      tag: "L2",
      name: "DATA CONTRACT",
      version: "v0.4.1",
      caption: "The shared schema every agent reads from",
      models: "patient · appointment · claim · production · payer"
    }, {
      tag: "L3",
      name: "ENGINE",
      subtitle: "9 AGENTS",
      caption: "The nonclinical operations team, in software"
    }],
    whatThisMeansBeat: "One contract above. Adapters below. Agents that read the contract, not the source. Replace the practice management system tomorrow — the agents don't notice. This is what indifferent to PMS means in practice.",
    liveCaption: "ENGINE / AFFETTO 0.11.1 · LIVE"
  },
  forces: {
    sectionMarker: "§03 · Operating environment",
    subhead: "Five forces, converging.",
    leadIn: "Five forces are reshaping dental at once — and converging on the same problem: the operational layer between the practice floor and the business that runs it.",
    cards: [{
      number: "01",
      name: "CONSOLIDATION",
      visualType: "stat",
      statValue: "~100,000",
      statCaption: "practices changing hands this decade",
      statSource: "ADA Health Policy Institute, 2024",
      line: "A hundred thousand practices change hands this decade. Integration, not acquisition, is the binding constraint."
    }, {
      number: "02",
      name: "RESTRUCTURING",
      visualType: "stat",
      statValue: "~33%",
      statCaption: "of dentists intend to exit insurance networks",
      statSource: "ADA, dentists exiting PPO networks",
      line: "More than a third of dentists intend to exit insurance networks. Each transition is a six-month operational rebuild."
    }, {
      number: "03",
      name: "LABOR",
      visualType: "comparison-bars",
      comparisonData: {
        care: 100,
        operations: 128,
        careLabel: "CARE COST",
        opsLabel: "OPERATIONS COST"
      },
      statCaption: "operations cost has overtaken care cost",
      line: "The cost of running a practice has outpaced the cost of the care delivered inside it. Coordination is where the pressure lands."
    }, {
      number: "04",
      name: "AUTONOMY",
      visualType: "state-shift",
      stateBefore: {
        label: "INTERFACE",
        description: "describes work"
      },
      stateAfter: {
        label: "ACTOR",
        description: "performs work"
      },
      statCaption: "software has moved from describing to performing",
      line: "Software has moved from interface to actor. Foundation models can now perform the work, not only describe it."
    }, {
      number: "05",
      name: "FRAGMENTATION",
      visualType: "fragmentation",
      scatteredCount: 7,
      statCaption: "the bottleneck is connective tissue",
      line: "The tooling layer has multiplied without unifying. The bottleneck is no longer features. It is connective tissue."
    }]
  },
  outcomes: {
    sectionMarker: "§04 · Outcomes",
    subhead: "What it produces.",
    rows: [{
      number: "01",
      statement: "Run a 12-location group with the nonclinical headcount of a 4-location team.",
      line: "Operational headcount no longer scales linearly with footprint.",
      schematicType: "headcount-divergence",
      schematicCaption: "Operational Headcount as Locations Grow — Traditional vs Affetto"
    }, {
      number: "02",
      statement: "Close an acquisition Friday, run integrated operations Monday.",
      line: "The same engine spans diligence, transition, and steady-state processes.",
      schematicType: "timeline-compression",
      schematicCaption: "Acquisition-to-Integration Timeline — Traditional vs Affetto"
    }, {
      number: "03",
      statement: "Real-time visibility from chair to corporate.",
      line: "Production at chair 4 of practice 7, visible at HQ in real time, on the same data.",
      schematicType: "bidirectional-flow",
      schematicCaption: "Data Substrate Connecting Practice Floor and Corporate Office"
    }]
  },
  agents: {
    sectionMarker: "§05 · Nine specialized agents",
    subhead: "Each agent operates at two altitudes — the practice floor and the business above it.",
    detailHint: "Click any agent for both altitudes.",
    practiceLabel: "PRACTICE ALTITUDE",
    businessLabel: "BUSINESS ALTITUDE",
    closeLabel: "× CLOSE",
    backLabel: "← Back to agents",
    agents: [{
      number: "01",
      code: "TRT",
      domain: "Treatment",
      practiceLine: "Plans, presentations, case acceptance",
      businessTag: "case mix · capacity",
      practiceAltitude: "Plans, presentations, case acceptance",
      businessAltitude: "Treatment velocity, case mix, capacity forecasting",
      sourceIdx: 0
    }, {
      number: "02",
      code: "RCM",
      domain: "Revenue Cycle",
      practiceLine: "Claims, denials, appeals, posting",
      businessTag: "AR aging · payer mix",
      practiceAltitude: "Claims, denials, appeals, posting",
      businessAltitude: "Portfolio AR aging, payer mix, denial pattern detection",
      sourceIdx: 2
    }, {
      number: "03",
      code: "FIN",
      domain: "Finance",
      practiceLine: "Estimates, payment plans, counseling",
      businessTag: "P&L · cash position",
      practiceAltitude: "Estimates, payment plans, counseling",
      businessAltitude: "Cash position, overhead variance, location P&L",
      sourceIdx: 2
    }, {
      number: "04",
      code: "PAT",
      domain: "Patient",
      practiceLine: "Recall, reactivation, communication",
      businessTag: "LTV · retention",
      practiceAltitude: "Recall, reactivation, communication",
      businessAltitude: "Patient lifetime value, retention modeling, churn signals",
      sourceIdx: 0
    }, {
      number: "05",
      code: "SCH",
      domain: "Scheduling",
      practiceLine: "Templates, gap-fill, confirmations",
      businessTag: "production · utilization",
      practiceAltitude: "Templates, gap-fill, confirmations",
      businessAltitude: "Production per chair, provider utilization, cross-location capacity",
      sourceIdx: 0
    }, {
      number: "06",
      code: "CMP",
      domain: "Compliance",
      practiceLine: "Credentialing, renewals, OSHA, HIPAA logs",
      businessTag: "audit · risk surface",
      practiceAltitude: "Credentialing, renewals, OSHA, HIPAA logs",
      businessAltitude: "Multi-state compliance posture, audit readiness, risk surface",
      sourceIdx: 2
    }, {
      number: "07",
      code: "PPL",
      domain: "People",
      practiceLine: "Onboarding, coverage, time tracking",
      businessTag: "labor % · attrition",
      practiceAltitude: "Onboarding, coverage, time tracking",
      businessAltitude: "Cross-location staffing, labor as % of production, attrition signals",
      sourceIdx: 1
    }, {
      number: "08",
      code: "MKT",
      domain: "Marketing",
      practiceLine: "Acquisition, referrals, reviews, reactivation",
      businessTag: "CAC · channel mix",
      practiceAltitude: "Acquisition, referrals, reviews, reactivation",
      businessAltitude: "New patient cost, channel attribution, market share by location",
      sourceIdx: 1
    }, {
      number: "09",
      code: "PRC",
      domain: "Procurement",
      practiceLine: "Orders, vendors, negotiations, inventory",
      businessTag: "GPO · spend leverage",
      practiceAltitude: "Orders, vendors, negotiations, inventory",
      businessAltitude: "Consolidated supply spend, GPO leverage, standardization",
      sourceIdx: 2
    }]
  },
  lifecycle: {
    sectionMarker: "§06 · Embedded across the lifecycle",
    subhead: "One engine, present at every stage of a practice's life.",
    stages: [{
      number: "01",
      name: "DILIGENCE",
      line: "Diligence on acquisition targets in days, not weeks.",
      schematicType: "diligence-compression"
    }, {
      number: "02",
      name: "INTEGRATION",
      line: "Connect to PMS, payers, and corporate systems.",
      schematicType: "integration-hub"
    }, {
      number: "03",
      name: "TRANSITION",
      line: "Six-month PMS conversions, payer mix shifts, team onboarding.",
      schematicType: "transition-phases"
    }, {
      number: "04",
      name: "OPERATION",
      line: "Day-to-day nonclinical operations across every location.",
      schematicType: "operation-grid"
    }]
  },
  access: {
    sectionMarker: "§07 · Access",
    eyebrow: "PRE-LAUNCH WAITLIST",
    headline: "Request early access.",
    subhead: "Open to practice owners, group operators, DSOs, and institutional investors. We are taking on a small number of partners ahead of public release.",
    closingLine: "Founders read every reply.",
    emailLabel: "EMAIL ADDRESS",
    emailPlaceholder: "you@practice.com",
    audienceLabel: "I'M A...",
    audienceOptional: "(optional)",
    audiencePlaceholder: "Select…",
    audienceOptions: [{
      value: "practice",
      label: "Practice owner"
    }, {
      value: "group",
      label: "Group operator (2–10 locations)"
    }, {
      value: "dso",
      label: "DSO operator (10+ locations)"
    }, {
      value: "investor",
      label: "Institutional investor"
    }, {
      value: "other",
      label: "Other"
    }],
    submitLabel: "Request access",
    submittedLabel: "Received — confirmation queued"
  },
  trustStrip: ["SOC 2 TYPE II IN PROGRESS", "HIPAA-COMPLIANT", "BAA AVAILABLE", "ZERO PII IN MODEL CONTEXT", "US-HOSTED INFRASTRUCTURE"],
  // Telemetry strip — thin persistent rail at top of page (below TopBar).
  // Three rotating metric clusters cycle every ~3s. Reads as "the system
  // itself is running while you read the page."
  telemetry: {
    label: "ACTIVE",
    schemaVersion: "v0.4.1",
    clusters: [{
      primary: "9 agents · 4 connectors",
      secondary: "engine · live"
    }, {
      primary: "uptime 99.98% (90d)",
      secondary: "p95 1.2s"
    }, {
      primary: "tasks today: 14,812",
      secondary: "queue: 3"
    }]
  },
  // Live Engine — operational view of the system, between §02 System
  // (architectural view) and §03 Forces. Synthetic data, scrolling stream.
  liveEngine: {
    sectionMarker: "§02b · Live engine",
    subhead: "One engine. Nine agents. One output stream.",
    leftCaption: "Live demonstration · Synthetic data · Cross-agent coordination",
    streamHeader: "Output stream",
    statusLabel: "Streaming",
    agentStatus: "Agents · 9/9 nominal",
    metrics: [{
      label: "Uptime",
      value: "99.98%"
    }, {
      label: "Tasks 24h",
      value: "14,812"
    }, {
      label: "Queue",
      value: "3"
    }, {
      label: "P95 latency",
      value: "1.2 s"
    }],
    // Stream entry pool. Each entry: timestamp seed (added at runtime),
    // agent code, then the action description. Bolded keywords get rendered
    // as ink while supporting fragments stay ink-3.
    // Entries are designed to feel plausible to a DSO operator — real CDT
    // codes, real payer names, real dollar amounts in defensible ranges.
    streamPool: [{
      code: "RCM",
      action: "verified insurance benefits — Delta Dental PPO · $1,500 max"
    }, {
      code: "TRT",
      action: "generated treatment plan presentation — 3 procedures · $4,280"
    }, {
      code: "SCH",
      action: "optimized provider template — Dr. Huang · +1.4 chair hrs/wk"
    }, {
      code: "FIN",
      action: "reconciled daily deposit — $12,418 · 24 transactions · variance 0.00"
    }, {
      code: "PAT",
      action: "rebooked lapsed recall — 14 months inactive · $3,400 remaining benefit"
    }, {
      code: "RCM",
      action: "drafted denial appeal — D4341 · medical necessity · attached narrative"
    }, {
      code: "PRC",
      action: "detected cost anomaly — composite resin +18% vs. network"
    }, {
      code: "MKT",
      action: "launched acquisition campaign — fee-for-service cohort · $0.42 CPC"
    }, {
      code: "PPL",
      action: "drafted coverage schedule — Dec 23–Jan 2 · 4 locations"
    }, {
      code: "CMP",
      action: "flagged credential renewal — hygienist license · 62 days"
    }, {
      code: "TRT",
      action: "closed follow-up sequence — case accepted · routed to SCH"
    }, {
      code: "RCM",
      action: "submitted clean claim — D2391 · pre-validated · 0 errors"
    }, {
      code: "SCH",
      action: "filled schedule gap — Tue 2:40p · Dr. Marin · 60 min"
    }, {
      code: "FIN",
      action: "computed payment plan — 6 months · 0% · $712/mo"
    }, {
      code: "PAT",
      action: "dispatched recall campaign — 142 patients · SMS + email"
    }, {
      code: "RCM",
      action: "posted ERA — Cigna · $8,140 · 18 claims · 2 adjustments"
    }, {
      code: "PRC",
      action: "negotiated supply renewal — Henry Schein · +6.2% margin"
    }, {
      code: "CMP",
      action: "completed OSHA log entry — Q2 sterilization audit · clean"
    }, {
      code: "MKT",
      action: "attributed new patient — Google · referral · LTV $4,820"
    }, {
      code: "TRT",
      action: "presented case acceptance — Dr. Patel · 67% acceptance rate"
    }, {
      code: "PPL",
      action: "balanced coverage — assistant float · location 02 → 04"
    }, {
      code: "RCM",
      action: "verified insurance benefits — Aetna PPO · $2,000 max · waiting period clear"
    }, {
      code: "SCH",
      action: "rerouted cancellation — 3pm slot · same-day fill · production preserved"
    }, {
      code: "FIN",
      action: "generated location P&L — November · 4 locations · variance flagged"
    }, {
      code: "PAT",
      action: "scored churn risk — patient cohort · 8 high-risk flags · routed to MKT"
    }, {
      code: "PRC",
      action: "consolidated order — 4 locations · $2,140 saved · GPO leverage applied"
    }, {
      code: "CMP",
      action: "renewed BAA — clearinghouse · auto-routed for signature"
    }, {
      code: "MKT",
      action: "drafted reactivation copy — 6-month lapsed segment · A/B variants ready"
    }, {
      code: "RCM",
      action: "appealed downcoding — UHC · D2750 → D2740 · clinical narrative attached"
    }, {
      code: "TRT",
      action: "synthesized tx plan — multi-quad scaling · perio classification verified"
    }, {
      code: "SCH",
      action: "matched cancellation — short-call list · Mrs. Okafor · 4:20p"
    }, {
      code: "FIN",
      action: "alerted overhead variance — supplies +4.2% MoM · location 03"
    }, {
      code: "PAT",
      action: "drafted recall message — Spanish + English · 89 patients"
    }, {
      code: "PPL",
      action: "computed labor ratio — 27.4% of production · within target band"
    }]
  },
  inlineCta: {
    label: "Onboarding partners ahead of public release",
    arrow: "→",
    target: "#access"
  },
  footer: {
    wordmarkLine: "AFFETTO",
    organizationLine: "THE AFFETTO GROUP · LOS ANGELES, CA",
    contactLine: "partners@affetto.io",
    copyrightLine: "© 2026 · CONFIDENTIAL PRELAUNCH"
  }
};
window.AFFETTO = AFFETTO;
