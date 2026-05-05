/* ============================================================
   AFFETTO — content.js  (v9 / production port of synthesis HTML)
   ============================================================
   Single source of truth for dynamic copy + data. Edit any value
   here, save, and the site updates. No CSS / JS changes required
   for content edits.

   This file exposes window.AFFETTO. Loaded BEFORE main.js so the
   behavior code can read it.

   Conventions:
   - Use <code>...</code> tags inside data strings to render
     monospace technical values (numbers, dollar amounts, codes).
   - Time strings in floor/agent streams are dynamically generated;
     do NOT include timestamps in the strings here.
   - Static copy in the page (hero headline, section titles, etc.)
     lives in the HTML markup. Dynamic / repeating data lives here.
   ============================================================ */

window.AFFETTO = {

  /* ============================================================
     PMS list — chips in §03 source selector
     ============================================================ */
  pmsList: [
    'Dentrix','Eaglesoft','Open Dental','Curve Dental',
    'Carestream','Practice-Web','ABELDent','SoftDent',
    'Easy Dental','Denticon','MOGO Cloud','iDentalSoft',
    'tab32','Dolphin','Athenahealth','Epic','Custom'
  ],

  /* ============================================================
     §02 / Agents — featured panel + 9-tile grid
     Each agent: ix, code, name, desc, tagline, bridgeIn,
     bridgeOut, triggers (downstream codes that pulse), and
     activities (5 strings that loop in the activity log).
     ============================================================ */
  agents: [
    { ix:'01', code:'TRT', name:'Treatment',   desc:'Plans treatment, presents cases, tracks acceptance, sequences care across providers and visits.', tagline:'TREATMENT AGENT', bridgeIn:'consent signed · case routed', bridgeOut:'case acceptance · <code>72%</code>', triggers:['SCH','RCM','FIN'], activities:['sequencing case · <code>D2740</code> · 4 visits','presenting plan · <code>$8,420</code> · 3 alternatives','routing referral · <code>perio</code> · in-network','updating treatment · post-op <code>14-day</code>','closing case · acceptance <code>recorded</code>'] },
    { ix:'02', code:'RCM', name:'Revenue',     desc:'Drafts and submits clean claims, posts payments, works denials, recovers AR across payers.', tagline:'REVENUE CYCLE AGENT', bridgeIn:'completed procedure · <code>D6065</code>', bridgeOut:'AR aging · <code>-18%</code> · 30d', triggers:['FIN','TRT'], activities:['posting <code>ERA</code> · Cigna · $8,140','verifying benefits · <code>Delta PPO</code>','appealing denial · <code>D2740</code> · narrative','submitting claim · MetLife · <code>$2,420</code>','recovering aged AR · <code>$4,180</code> · cycle 3'] },
    { ix:'03', code:'FIN', name:'Finance',     desc:'Reconciles ledgers, generates statements, models cash and forecasts, owns the canonical book of record.', tagline:'FINANCE AGENT', bridgeIn:'payment posted · <code>$1,136</code>', bridgeOut:'monthly EBITDA · <code>22.4%</code>', triggers:['MKT','PRC'], activities:['generating <code>P&L</code> · 4 locations','reconciling AR · <code>89 accounts</code>','forecasting cash · <code>Q1</code> · +18%','closing month · auto-reconciled','flagging variance · <code>location #3</code>'] },
    { ix:'04', code:'PAT', name:'Patient',     desc:'Owns recall, reactivation, post-op, and patient-facing communication across SMS, voice, and email.', tagline:'PATIENT AGENT', bridgeIn:'recall window · <code>14mo</code> opened', bridgeOut:'reactivation rate · <code>+11pp</code>', triggers:['SCH','TRT'], activities:['rebooking lapsed recall · <code>14mo</code>','sending reactivation · <code>142 patients</code>','delivering post-op · <code>12 patients</code>','confirming appointment · <code>tomorrow 9am</code>','flagging at-risk · <code>6mo</code> no-show'] },
    { ix:'05', code:'SCH', name:'Schedule',    desc:'Optimizes templates, fills cancellation gaps, runs confirmations, tunes provider productivity.', tagline:'SCHEDULE AGENT', bridgeIn:'gap detected · <code>14:30</code>', bridgeOut:'production preserved · <code>$1,180</code>', triggers:['PAT','TRT'], activities:['filling gap · <code>14:00</code> · Dr. Chen','optimizing template · <code>+1.4 hrs/wk</code>','rescheduling cancellation · <code>48hr</code>','auto-confirming · <code>47 slots</code>','rebalancing chairs · 3 providers'] },
    { ix:'06', code:'CMP', name:'Compliance',  desc:'Tracks credentials, OSHA, HIPAA training, BAA renewals; audits access logs and runs renewals on time.', tagline:'COMPLIANCE AGENT', bridgeIn:'license expiry · <code>30d</code>', bridgeOut:'audit-ready · <code>0 deficiencies</code>', triggers:['PPL','RCM'], activities:['renewing credentials · <code>Dr. Patel</code>','completing OSHA audit · <code>0 deficiencies</code>','tracking HIPAA training · <code>47 staff</code>','auditing access logs · clean','filing BAA renewal · <code>Aetna</code>'] },
    { ix:'07', code:'PPL', name:'People',      desc:'Onboards new hires, drafts coverage, processes timesheets, handles PTO, and runs payroll syncs.', tagline:'PEOPLE AGENT', bridgeIn:'new hire · <code>Dr. Martinez</code>', bridgeOut:'time-to-productive · <code>D-0</code>', triggers:['CMP','SCH','FIN'], activities:['onboarding new hire · <code>Dr. Martinez</code>','drafting coverage · <code>Dec 23-Jan 2</code>','processing timesheet · <code>47 staff</code>','approving PTO · <code>Dr. Huang</code> · 5 days','auto-syncing payroll · current cycle'] },
    { ix:'08', code:'MKT', name:'Marketing',   desc:'Acquires, attributes, retains; runs lifetime-value loops, syncs reviews, manages campaign spend.', tagline:'MARKETING AGENT', bridgeIn:'new patient · <code>$120</code> CAC', bridgeOut:'pipeline · <code>+18%</code> MoM', triggers:['PAT','FIN'], activities:['attributing new patient · LTV <code>$4,820</code>','updating campaign · <code>-15%</code> CPA','syncing reviews · <code>12 new</code> · 4.8 avg','forecasting pipeline · <code>+18%</code> MoM','launching A/B · variant B leading'] },
    { ix:'09', code:'PRC', name:'Procurement', desc:'Consolidates orders, negotiates contracts, detects price anomalies, manages vendors and assets.', tagline:'PROCUREMENT AGENT', bridgeIn:'low-stock detected · <code>3 sites</code>', bridgeOut:'spend saved · <code>$2,140</code>', triggers:['FIN'], activities:['consolidating order · saved <code>$2,140</code>','negotiating contract · <code>3M</code> · -7.2%','detecting anomaly · resin <code>+18%</code>','auto-restocking · low items','scheduling service · <code>4 sites</code>'] }
  ],

  /* ============================================================
     Hero stream — practice floor signals (left column)
     ============================================================ */
  heroFloor: [
    'patient arrived · check-in <code>9:42</code>',
    'X-ray uploaded · <code>BWX-4</code> · ready',
    'cancellation · <code>14:30</code> · gap created',
    'consent signed · <code>ortho case</code>',
    'card scanned · <code>Delta PPO</code> · verified',
    'recall due · <code>18mo</code> window opens',
    'staff clock-in · 14 of 18 · <code>7:58</code>',
    'checkout · payment <code>$846</code> received',
    'treatment complete · <code>D6065</code> placed',
    'walk-in intake · forms started',
    'license expiring · <code>30d</code> · Dr. Patel',
    'new hire · <code>Dr. Martinez</code>',
    'review posted · <code>5 stars</code>'
  ],

  /* ============================================================
     Hero stream — agent actions (right column)
     ============================================================ */
  heroAgents: [
    { agent:'PAT', text:'rebooked recall · <code>14mo</code>' },
    { agent:'SCH', text:'gap filled · <code>14:30</code> · $1,180' },
    { agent:'RCM', text:'claim submitted · <code>$2,420</code>' },
    { agent:'FIN', text:'ledger reconciled · 89 accounts' },
    { agent:'TRT', text:'plan presented · <code>D2740</code>' },
    { agent:'CMP', text:'BAA filed · 5 payers' },
    { agent:'PPL', text:'timesheet processed · 47 staff' },
    { agent:'MKT', text:'review synced · <code>4.8</code> avg' },
    { agent:'PRC', text:'order placed · <code>$2,140</code> saved' },
    { agent:'PAT', text:'SMS sent · 142 reactivations' },
    { agent:'TRT', text:'sequenced · <code>3 visits</code>' },
    { agent:'FIN', text:'posted · ledger updated' },
    { agent:'CMP', text:'renewal filed · <code>Dr. Patel</code>' }
  ],

  /* ============================================================
     §03 / Schema entity rewrite variants — once on viewport entry
     ============================================================ */
  schemaVariants: {
    patient:     ['patient','subject','patient'],
    appointment: ['appointment','visit','appointment'],
    claim:       ['claim','submission','claim'],
    production:  ['production','output','production'],
    payer:       ['payer','carrier','payer']
  },

  /* ============================================================
     Live trace — 5 traces, 6 stations each, auto-rotates
     6th step is always 'COMPLETE' (agent='✓')
     ============================================================ */
  traces: [
    { key:'patient', label:'PATIENT', title:'Mrs. Okafor · 14 month recall · re-engagement', steps:[
      { agent:'PAT', label:'PATIENT',  action:'recall sent · <code>14mo</code>' },
      { agent:'SCH', label:'SCHEDULE', action:'gap-fill · Tue <code>14:30</code>' },
      { agent:'TRT', label:'TREATMENT',action:'plan · <code>D2740</code> · $1,420' },
      { agent:'RCM', label:'REVENUE',  action:'benefits · <code>Delta PPO</code>' },
      { agent:'FIN', label:'FINANCE',  action:'plan · <code>$237/mo</code> · 6mo' },
      { agent:'✓',   label:'COMPLETE', action:'booked &amp; paid · routed' }
    ]},
    { key:'claim', label:'CLAIM', title:'D2740 crown · $1,420 · Cigna PPO', steps:[
      { agent:'TRT', label:'TREATMENT',action:'sequenced · <code>D2740</code>' },
      { agent:'RCM', label:'REVENUE',  action:'claim drafted · narrative' },
      { agent:'RCM', label:'REVENUE',  action:'submitted · <code>0 errors</code>' },
      { agent:'RCM', label:'REVENUE',  action:'ERA posted · <code>$1,136</code>' },
      { agent:'FIN', label:'FINANCE',  action:'reconciled · ledger' },
      { agent:'✓',   label:'COMPLETE', action:'paid in full · 3-day cycle' }
    ]},
    { key:'schedule', label:'SCHEDULE', title:'Tue 14:30 cancellation · gap recovery', steps:[
      { agent:'SCH', label:'SCHEDULE', action:'cancelled · <code>14:30</code>' },
      { agent:'PAT', label:'PATIENT',  action:'short-list · <code>14 patients</code>' },
      { agent:'PAT', label:'PATIENT',  action:'SMS dispatched' },
      { agent:'SCH', label:'SCHEDULE', action:'filled · <code>$1,180</code>' },
      { agent:'PAT', label:'PATIENT',  action:'confirmed · <code>15:30</code>' },
      { agent:'✓',   label:'COMPLETE', action:'production preserved' }
    ]},
    { key:'provider', label:'PROVIDER', title:'Dr. Martinez · onboarding · day-1 productive', steps:[
      { agent:'PPL', label:'PEOPLE',     action:'hire · <code>I-9</code> · payroll' },
      { agent:'CMP', label:'COMPLIANCE', action:'creds · <code>DEA</code> · NPI' },
      { agent:'CMP', label:'COMPLIANCE', action:'BAA · <code>5 payers</code>' },
      { agent:'SCH', label:'SCHEDULE',   action:'template · <code>3 chairs</code>' },
      { agent:'TRT', label:'TREATMENT',  action:'pipeline · <code>12 plans</code>' },
      { agent:'✓',   label:'COMPLETE',   action:'producing day one' }
    ]},
    { key:'procurement', label:'PROCUREMENT', title:'Composite resin · 4-site reorder', steps:[
      { agent:'PRC', label:'PROCUREMENT', action:'low stock · <code>3 sites</code>' },
      { agent:'PRC', label:'PROCUREMENT', action:'demand · <code>4 locations</code>' },
      { agent:'PRC', label:'PROCUREMENT', action:'GPO · vendor quoted' },
      { agent:'FIN', label:'FINANCE',     action:'spend approved' },
      { agent:'PRC', label:'PROCUREMENT', action:'placed · <code>3-day</code> ship' },
      { agent:'✓',   label:'COMPLETE',    action:'$2,140 saved' }
    ]}
  ]
};
