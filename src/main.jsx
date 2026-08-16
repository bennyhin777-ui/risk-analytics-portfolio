import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './profile.css';
import { periodData, kriData } from './projectData';

const PORTFOLIO_URL = 'https://ad3.org/';

const projects = [
  { id: 'risk', label: 'Payment risk', eyebrow: 'Flagship case study', title: 'Payment Risk Command Center', description: 'A decision workspace for balancing fraud loss, approval rate, and customer friction across payment rails.', metric: '18.4%', metricLabel: 'simulated fraud loss avoided', color: 'teal', repo: 'https://github.com/bennyhin777-ui/payment-risk-command-center', tech: 'React · Vite · Real-time risk scoring · Dashboard design', details: 'Interactive command center simulating a live payment risk operations desk. Monitors portfolio exposure across card, ACH, and real-time rails with searchable transaction decision queues, risk-signal trend charts, and exposure breakdowns. Analysts can filter by time period, triage by risk score, and export reports for case management integration.' },
  { id: 'policy', label: 'Policy lab', eyebrow: 'Risk strategy', title: 'Fraud Policy Simulator', description: 'Test policy changes before they reach production and make the cost of every control visible.', metric: '+3.1%', metricLabel: 'approval lift after tuning', color: 'amber', repo: 'https://github.com/bennyhin777-ui/fraud-policy-simulator', tech: 'React · Vite · Scenario modeling · Tradeoff analysis', details: 'A policy threshold simulator that lets risk teams preview the impact of changing auto-review thresholds before pushing to production. Shows projected legitimate approval rates, fraud loss prevented, and review case volume — making the cost-benefit tradeoff of every control decision visible and quantifiable.' },
  { id: 'requirements', label: 'AI business analysis', eyebrow: 'Human-in-the-loop AI', title: 'Requirements-to-Risk Analyst', description: 'Turn messy stakeholder language into usable requirements, controls, acceptance criteria, and questions.', metric: '42', metricLabel: 'gaps surfaced from a transcript', color: 'blue', repo: 'https://github.com/bennyhin777-ui/requirements-to-risk-analyst', tech: 'React · Vite · AI-assisted analysis · Requirements engineering', details: 'A human-in-the-loop AI tool that transforms stakeholder meeting transcripts into structured deliverables. Detects intents, surfaces risk tensions, and generates user stories, risk controls, and clarification questions — giving business analysts a ready-to-review packet instead of a blank page.' },
  { id: 'kri', label: 'Operational resilience', eyebrow: 'Early warning', title: 'KRI Early-Warning System', description: 'Connect operational signals to owners and actions before a small issue becomes a customer-impacting event.', metric: '7', metricLabel: 'leading indicators monitored', color: 'coral', repo: 'https://github.com/bennyhin777-ui/kri-early-warning-system', tech: 'React · Vite · KRI monitoring · Operational risk', details: 'An early-warning system for operational risk that tracks key risk indicators with threshold-based breach detection. Each indicator is owner-assigned with health-level alerts, trend tracking, and action digest generation — ensuring small issues are routed to the right person before they escalate.' },
];

const experience = [
  { role: 'Strategy & Analytics Business Analyst', company: 'Stripe', dates: 'Nov 2023 — Jul 2024', bullets: ['Drove data-driven strategy initiatives by utilizing SQL and Python to extract actionable insights from complex financial datasets, identifying opportunities to optimize revenue streams and improve payment routing.', 'Designed and deployed interactive dashboards using Tableau and Looker to monitor key performance indicators (KPIs) and track regional product adoption metrics.', 'Integrated enterprise AI strategies and predictive modeling techniques to forecast transaction volumes, detect emerging market trends, and enhance operational efficiency across the platform.', 'Conducted rigorous A/B testing and statistical analysis to evaluate the impact of new feature rollouts, directly informing and guiding technical product strategy decisions.', 'Collaborated with cross-functional engineering teams using Agile/Scrum methodologies to streamline data pipelines, ensuring high-data integrity and reducing manual reporting overhead.', 'Translated complex analytical findings into clear, executive-level presentations, providing leadership with actionable recommendations focused on enhancing user experience.'] },
  { role: 'CAP Analyst — Concession Abuse Prevention', company: 'Amazon', dates: 'May 2023 — Oct 2023', bullets: ['Queried and analyzed complex transactional datasets using SQL and Excel to detect fraudulent patterns and unauthorized access behaviors.', 'Tracked and reported on emerging security risks using Tableau and Power BI visualizations, enabling proactive risk mitigation.', 'Managed high-volume case queues and escalated security tickets utilizing enterprise CRM and ticketing systems (Jira, Zendesk).', 'Applied root cause analysis (RCA) and risk modeling concepts to proactively secure accounts against unauthorized access and social engineering attacks.', 'Collaborated in Agile environments with cross-functional teams to optimize automated fraud-detection workflows and systems.', 'Maintained detailed technical documentation, process maps, and compliance audit logs within internal knowledge bases.'] },
  { role: 'Payment Risk Analyst', company: 'Coinbase', dates: 'Sep 2020 — Apr 2023', bullets: ['Analyzed and mitigated fraudulent risk across high-volume fiat payment rails (ACH, cards, and real-time payments), utilizing SQL to query large datasets and identify anomalous transaction patterns.', 'Designed and tuned risk controls, leading the transition from heuristic-based rules to model-driven mitigation strategies in collaboration with Data Science and Machine Learning teams.', 'Investigated complex fraud vectors utilizing identity-provider data, Python, and blockchain analytics, proactively closing monitoring gaps to minimize financial loss.', 'Evaluated the financial impact of risk strategies by tracking rule precision and recall, synthesizing complex datasets into actionable insights using Looker and Tableau.', 'Optimized end-to-end fraud prevention operations, partnering cross-functionally with Product and Engineering to enforce stringent compliance while maintaining a seamless user experience.'] },
];

const skills = [
  ['Data & Analytics', 'SQL, Python, Advanced Excel, Statistical Analysis, A/B Testing, Data Wrangling, Exploratory Data Analysis, Hypothesis Testing, Data Pipeline Optimization'],
  ['AI & Machine Learning', 'Predictive Modeling, AI-Driven Forecasting, Feature Engineering, Model Evaluation (Precision / Recall / F1), Scikit-learn, Random Forest, Generative AI / LLM Tools, Prompt Engineering, Heuristic-to-Model Migration'],
  ['Risk & Fraud Transaction Monitoring', 'Anomaly Detection, Rule-Based & Model-Driven Risk Controls, Root Cause Analysis (RCA), AML / KYC Awareness, Chargeback & Dispute Analysis, Blockchain Analytics, Identity Verification Data Analysis'],
  ['Visualization & BI', 'Tableau, Power BI, Looker, Lucidchart, Dashboard Design, KRI Reporting, Executive Presentation Design'],
  ['Business Analysis', 'Requirements Gathering, Process Mapping, Stakeholder Management, User Stories, Gap Analysis, Business Process Optimization, Cross-Functional Collaboration, Executive Reporting, Agile / Scrum / Kanban, SDLC, UAT'],
  ['Tools & Platforms', 'Jira, Zendesk, Confluence, Git, Salesforce (CRM), Google Workspace'],
];

const certifications = [
  'Google Project Management: Professional Certificate — Google',
  'IBM Business Analyst Professional Certificate — IBM',
  'Enterprise Risk Management Specialization — University System of Georgia',
  'Forensic Accounting and Fraud Examination Specialization — West Virginia University',
  'Financial Risk Management Specialization — New York Institute of Finance',
];

const CONTACT_PARTS = ['bennyhin777', 'gmail', 'com'];
const contactHref = `mailto:${CONTACT_PARTS[0]}@${CONTACT_PARTS[1]}.${CONTACT_PARTS[2]}`;

function App() {
  const [activeProject, setActiveProject] = useState('risk');
  const [period, setPeriod] = useState('30 days');
  const [policy, setPolicy] = useState(70);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const [requirementsTab, setRequirementsTab] = useState('stories');

  const currentPeriodData = periodData[period];
  const currentKriData = kriData[period];
  const filteredTransactions = useMemo(
    () => currentPeriodData.transactions.filter((row) => `${row.id} ${row.merchant} ${row.rail}`.toLowerCase().includes(query.toLowerCase())),
    [query, currentPeriodData]
  );
  const approvalRate = Math.min(98.7, 95.4 + (policy - 70) * 0.09).toFixed(1);
  const fraudPrevented = Math.max(9.8, 18.4 - (policy - 70) * 0.16).toFixed(1);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }

  function selectProject(id) {
    setActiveProject(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const activeProjectData = projects.find((project) => project.id === activeProject);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" onClick={() => selectProject('risk')}>
          <span className="brand-mark">BB</span>
          <span><strong>Bennyhin Bapanapalli</strong><small>Risk & AI Business Analytics</small></span>
        </a>
        <nav className="topnav" aria-label="Primary navigation">
          <a href="#work">Projects</a><a href="#projects">Source code</a><a href="#experience">Experience</a><a href="#about">About</a><a href="#contact">Contact</a>
        </nav>
        <a className="outline-button" href="/Bennyhin_Bapanapalli_Resume_ATS.pdf" download>Download resume <span>↗</span></a>
      </header>

      <main id="top">
        <section className="hero page-width">
          <div className="hero-copy">
            <p className="kicker"><span className="status-dot" /> Available for risk & business analytics roles</p>
            <h1>Make complex risk decisions <em>clear.</em></h1>
            <p className="hero-lede">I build analytical products that help payment, fraud, and operations teams move from noisy signals to confident action.</p>
            <div className="hero-actions"><button className="primary-button" onClick={() => selectProject('risk')}>Explore the command center <span>↓</span></button><a className="text-link" href={contactHref}>Email me <span>→</span></a></div>
            <div className="proof-row"><div><strong>4+</strong><span>years in risk & analytics</span></div><div><strong>3</strong><span>high-volume payment environments</span></div><div><strong>4</strong><span>open-source projects on GitHub</span></div></div>
          </div>
          <div className="hero-art" aria-label="Analytics overview illustration"><div className="glow" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="signal-card"><div className="signal-head"><span>LIVE SIGNAL MAP</span><i>●</i></div><div className="signal-number">92<span>/100</span></div><div className="signal-label">Portfolio risk index</div><div className="mini-chart"><span style={{height:'35%'}}/><span style={{height:'49%'}}/><span style={{height:'42%'}}/><span style={{height:'66%'}}/><span style={{height:'58%'}}/><span style={{height:'82%'}}/><span style={{height:'71%'}}/><span style={{height:'91%'}}/></div><div className="signal-footer"><span>Signal confidence</span><strong>High</strong></div></div><div className="floating-tag tag-top">+18.4% <small>loss avoided</small></div><div className="floating-tag tag-bottom">2,847 <small>events scored</small></div></div>
        </section>

        <section className="work-section page-width" id="work">
          <div className="section-heading"><div><p className="kicker">Projects</p><h2>Four projects. One point of view.</h2></div><p className="section-note">Built around the questions hiring teams ask: Can you find the signal? Explain the tradeoff? Turn insight into action?</p></div>
          <div className="project-tabs">{projects.map((project) => <button key={project.id} className={`project-tab ${activeProject === project.id ? 'active' : ''}`} onClick={() => setActiveProject(project.id)}><span className={`tab-dot ${project.color}`} /><span><small>{project.eyebrow}</small><strong>{project.label}</strong></span><b>→</b></button>)}</div>
          <div className="demo-panel">
            <div className="demo-intro"><div><p className="kicker">{activeProjectData.eyebrow}</p><h2>{activeProjectData.title}</h2><p>{activeProjectData.description}</p><p className="project-tech">{activeProjectData.tech}</p><a className="repo-link" href={activeProjectData.repo} target="_blank" rel="noreferrer">View source code on GitHub <span>↗</span></a></div><div className="intro-metric"><strong>{activeProjectData.metric}</strong><span>{activeProjectData.metricLabel}</span></div></div>
            <p className="project-details-text">{activeProjectData.details}</p>
            {activeProject === 'risk' && <RiskDemo period={period} setPeriod={setPeriod} query={query} setQuery={setQuery} filteredTransactions={filteredTransactions} periodData={currentPeriodData} showToast={showToast} />}
            {activeProject === 'policy' && <PolicyDemo policy={policy} setPolicy={setPolicy} approvalRate={approvalRate} fraudPrevented={fraudPrevented} showToast={showToast} />}
            {activeProject === 'requirements' && <RequirementsDemo requirementsTab={requirementsTab} setRequirementsTab={setRequirementsTab} showToast={showToast} />}
            {activeProject === 'kri' && <KriDemo period={period} setPeriod={setPeriod} kriData={currentKriData} showToast={showToast} />}
          </div>
        </section>

        <section className="approach-section" id="approach"><div className="page-width approach-grid"><div><p className="kicker">How I work</p><h2>Analysis that earns trust.</h2><p className="approach-copy">The best analytical work is not a black box. It gives operators enough context to make a decision, leaders enough clarity to set direction, and customers a safer experience.</p></div><div className="principles"><div><span>01</span><div><h3>Start with the decision</h3><p>Every metric, model, and alert exists to improve a real business choice.</p></div></div><div><span>02</span><div><h3>Make risk explainable</h3><p>Surface the signal, the tradeoff, and the evidence behind each recommendation.</p></div></div><div><span>03</span><div><h3>Design for the handoff</h3><p>Turn insight into a clear owner, next step, and measurable outcome.</p></div></div></div></div></section>

        <section className="profile-section page-width" id="about"><div className="section-heading"><div><p className="kicker">Background</p><h2>Experience behind the work.</h2></div><p className="section-note">A risk and analytics career spanning payments, fraud prevention, strategy, AI, and cross-functional delivery.</p></div><div className="profile-grid"><div className="skills-card"><p className="kicker">Capabilities</p>{skills.map(([label, details]) => <div className="skill-row" key={label}><strong>{label}</strong><span>{details}</span></div>)}</div><div className="credentials-card"><div><p className="kicker">Education</p><h3>MS in Project Management (IT)</h3><p>Saint Francis College</p><small>Graduated with Honors — 3.9 GPA · Capstone: Agile Methodologies</small></div><div className="credentials-block"><p className="kicker">Certifications</p>{certifications.map((item) => <div className="credential-item" key={item}><span>✓</span>{item}</div>)}</div><div className="publication"><p className="kicker">Publication</p><strong>A Mechanism Used to Predict Diet Consumption and Stress Management in Humans Using IoMT</strong><span>IEEE ICCT 2023 · Co-authored on an IoMT-based framework distinguishing normal eating from stress-induced eating.</span></div></div></div></section>

        <section className="experience-section" id="experience"><div className="page-width"><div className="section-heading"><div><p className="kicker">Professional experience</p><h2>Where insight met scale.</h2></div></div><div className="timeline">{experience.map((item) => <article className="experience-item" key={`${item.company}-${item.role}`}><div className="experience-meta"><span>{item.dates}</span><strong>{item.company}</strong></div><div><h3>{item.role}</h3><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div></div></section>

        <section className="projects-section page-width" id="projects"><div className="section-heading"><div><p className="kicker">Portfolio projects</p><h2>Source code & project details.</h2></div><p className="section-note">All four projects are open source on GitHub with live demos hosted on the portfolio site.</p></div><div className="projects-list">{projects.map((project) => <a className="project-link-card" key={project.id} href={project.repo} target="_blank" rel="noreferrer"><div className="plc-header"><span className={`tab-dot ${project.color}`} /><strong>{project.title}</strong></div><p>{project.details}</p><div className="plc-footer"><span className="plc-tech">{project.tech}</span><span className="plc-link">GitHub <span>↗</span></span></div></a>)}</div><div className="portfolio-link-row"><span>Live portfolio:</span><a href={PORTFOLIO_URL} target="_blank" rel="noreferrer">{PORTFOLIO_URL} ↗</a></div></section>

        <section className="contact-section page-width" id="contact"><div className="contact-card"><div><p className="kicker">Open to the right challenge</p><h2>Let’s build safer, smarter systems.</h2><p>Risk strategy, fraud analytics, AI business analysis, and operational decision support.</p><a className="contact-email" href={PORTFOLIO_URL} target="_blank" rel="noreferrer">{PORTFOLIO_URL} ↗</a></div><a className="primary-button" href={contactHref}>Start a conversation <span>→</span></a></div></section>
      </main>
      <footer className="footer page-width"><span>© 2026 Bennyhin Bapanapalli</span><span>Payments risk · AI business analysis · Operational intelligence</span><span><a href={PORTFOLIO_URL} target="_blank" rel="noreferrer">{PORTFOLIO_URL}</a> · <a href="/Bennyhin_Bapanapalli_Resume_ATS.pdf" download>Download PDF ↗</a></span></footer>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function RiskDemo({ period, setPeriod, query, setQuery, filteredTransactions, periodData, showToast }) {
  const d = periodData;
  return <div className="dashboard"><div className="dashboard-toolbar"><div className="segmented">{['7 days','30 days','90 days'].map((item) => <button key={item} className={period === item ? 'selected' : ''} onClick={() => setPeriod(item)}>{item}</button>)}</div><div className="toolbar-actions"><label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transactions" /></label><button className="icon-button" onClick={() => showToast(`Report exported for the ${period} period.`)}>Export ↗</button></div></div><div className="stat-grid">{d.stats.map((s) => <Stat key={s.label} label={s.label} value={s.value} change={s.change} good={s.good} />)}</div><div className="dashboard-columns"><div className="chart-card"><div className="card-title"><div><span>Risk signal trend</span><strong>Transaction risk by day</strong></div><span className="legend"><i /> {period}</span></div><div className="area-chart"><div className="chart-grid"><span /><span /><span /><span /></div><svg viewBox="0 0 600 190" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#26c7aa" stopOpacity=".38" /><stop offset="1" stopColor="#26c7aa" stopOpacity="0" /></linearGradient></defs><path d={d.chart.fillPath} fill="url(#fill)" /><path d={d.chart.path} fill="none" stroke="#26c7aa" strokeWidth="3" /></svg><div className="chart-labels">{d.chart.labels.map((l) => <span key={l}>{l}</span>)}</div></div></div><div className="exposure-card"><div className="card-title"><div><span>Exposure mix</span><strong>By payment rail</strong></div></div><div className="donut-wrap"><div className="donut" style={{background:`conic-gradient(var(--teal) 0 ${d.donut.card}%,var(--blue) ${d.donut.card}% ${d.donut.card + d.donut.ach}%,var(--amber) ${d.donut.card + d.donut.ach}% 100%)`}}><div><strong>{d.donut.total}</strong><span>Total</span></div></div><div className="donut-legend"><span><i className="teal-fill" /> Card <b>{d.donut.card}%</b></span><span><i className="blue-fill" /> ACH <b>{d.donut.ach}%</b></span><span><i className="amber-fill" /> Real-time <b>{d.donut.realtime}%</b></span></div></div></div></div><div className="table-card"><div className="card-title"><div><span>Decision queue</span><strong>Recent transaction signals — {filteredTransactions.length} shown</strong></div><button className="text-link" onClick={() => showToast('Full queue view is ready for your case-management integration.')}>View all →</button></div><div className="table-wrap"><table><thead><tr><th>Transaction</th><th>Merchant</th><th>Rail</th><th>Amount</th><th>Risk score</th><th>Decision</th></tr></thead><tbody>{filteredTransactions.map((row) => <tr key={row.id}><td><strong>{row.id}</strong><small>{row.reason}</small></td><td>{row.merchant}</td><td>{row.rail}</td><td>{row.amount}</td><td><span className={`score ${row.score > 80 ? 'high' : row.score > 50 ? 'medium' : 'low'}`}>{row.score}</span></td><td><span className={`decision ${row.status.toLowerCase()}`}>{row.status}</span></td></tr>)}</tbody></table></div></div></div>;
}

function PolicyDemo({ policy, setPolicy, approvalRate, fraudPrevented, showToast }) { return <div className="policy-demo"><div className="policy-control"><div className="control-header"><div><span>Policy threshold</span><strong>Auto-review above risk score</strong></div><span className="threshold-value">{policy}</span></div><input type="range" min="40" max="95" value={policy} onChange={(event) => setPolicy(Number(event.target.value))} /><div className="range-labels"><span>More protection</span><span>Less friction</span></div><div className="scenario-note"><span>Scenario</span><p>Increase threshold to reduce manual reviews while keeping high-risk payments blocked.</p></div><button className="primary-button small" onClick={() => showToast(`Scenario saved at threshold ${policy}.`)}>Save scenario <span>→</span></button></div><div className="policy-results"><p className="kicker">Projected impact</p><div className="impact-grid"><div><strong>{approvalRate}%</strong><span>legitimate approvals</span><b className="positive">+{(Number(approvalRate) - 95.4).toFixed(1)}%</b></div><div><strong>{fraudPrevented}%</strong><span>fraud loss prevented</span><b className="neutral">vs. current policy</b></div><div><strong>{Math.round(1284 - (policy - 70) * 18)}</strong><span>review cases per day</span><b className="positive">-{Math.max(0, Math.round((policy - 70) * 1.4))}%</b></div></div><div className="decision-banner"><span className="check">✓</span><div><strong>Recommended operating point</strong><p>At a threshold of 70, the portfolio protects revenue while keeping customer friction within target.</p></div></div></div></div>; }

function RequirementsDemo({ requirementsTab, setRequirementsTab, showToast }) { return <div className="requirements-demo"><div className="transcript"><div className="card-title"><div><span>Input</span><strong>Stakeholder transcript</strong></div><span className="file-badge">meeting_notes.txt</span></div><div className="quote"><span>“</span><p>We need faster payouts for trusted sellers, but compliance wants stronger controls around first-time withdrawals. The operations team also needs visibility into anything that gets held.</p></div><div className="signal-list"><span><i className="signal-blue" /> Intent detected: payout acceleration</span><span><i className="signal-amber" /> Risk tension: first-time withdrawal</span><span><i className="signal-coral" /> Missing: service-level target</span></div></div><div className="requirements-output"><div className="output-tabs">{['stories','controls','questions'].map((tab) => <button key={tab} className={requirementsTab === tab ? 'active' : ''} onClick={() => setRequirementsTab(tab)}>{tab === 'stories' ? 'User stories' : tab === 'controls' ? 'Risk controls' : 'Questions'}</button>)}</div>{requirementsTab === 'stories' && <div className="output-list"><OutputItem title="Trusted seller payout" detail="As a trusted seller, I want faster payouts so that I can access cleared funds sooner." tag="Ready" /><OutputItem title="First withdrawal review" detail="As a risk analyst, I want first-time withdrawals scored against account signals before release." tag="Needs criteria" /><OutputItem title="Held payout visibility" detail="As an operations lead, I want a queue showing held payouts, owner, age, and next action." tag="Ready" /></div>}{requirementsTab === 'controls' && <div className="output-list"><OutputItem title="Velocity control" detail="Compare withdrawal amount and frequency against seller history and peer cohort." tag="High impact" /><OutputItem title="Account trust score" detail="Require a minimum verified account age and identity confidence before acceleration." tag="High impact" /><OutputItem title="Human review fallback" detail="Route ambiguous cases to operations with evidence and an expiry timer." tag="Required" /></div>}{requirementsTab === 'questions' && <div className="output-list"><OutputItem title="Define faster" detail="What payout time should qualify as success: minutes, same-day, or next-day?" tag="Ask stakeholder" /><OutputItem title="Set the boundary" detail="Which seller segments are eligible for accelerated first withdrawals?" tag="Ask compliance" /><OutputItem title="Measure friction" detail="What is the acceptable hold rate and manual-review SLA?" tag="Ask operations" /></div>}<button className="outline-button full" onClick={() => showToast('Review packet exported for stakeholder approval.')}>Export review packet ↗</button></div></div>; }

function KriDemo({ period, setPeriod, kriData, showToast }) {
  const levelClass = kriData.level.toLowerCase();
  return <div className="kri-demo"><div className="kri-period-bar"><div className="segmented">{['7 days','30 days','90 days'].map((item) => <button key={item} className={period === item ? 'selected' : ''} onClick={() => setPeriod(item)}>{item}</button>)}</div></div><div className="kri-summary"><div><span>Overall operating health</span><strong className={`kri-level-${levelClass}`}>{kriData.level}</strong><p>{kriData.summary}</p></div><div className={`health-ring ring-${levelClass}`}><span>{kriData.health}</span><small>/100</small></div></div><div className="kri-table"><div className="card-title"><div><span>Control room</span><strong>Key risk indicators — {period}</strong></div><button className="text-link" onClick={() => showToast(`Action digest prepared for the ${period} risk review.`)}>Create action digest →</button></div>{kriData.rows.map((row) => <div className="kri-row" key={row.name}><span className={`level-dot ${row.level.toLowerCase()}`} /><div className="kri-name"><strong>{row.name}</strong><span>{row.owner}</span></div><strong className="kri-value">{row.value}</strong><span className={`level-pill ${row.level.toLowerCase()}`}>{row.level}</span><span className={`kri-change ${row.change.startsWith('+') && row.level !== 'Healthy' ? 'bad' : 'good'}`}>{row.change}</span><button className="row-action" onClick={() => showToast(`${row.name} action plan opened.`)}>Open →</button></div>)}</div></div>;
}

function Stat({ label, value, change, good }) { return <div className="stat"><span>{label}</span><strong>{value}</strong><b className={good ? 'positive' : 'negative'}>{change}</b><small>vs. previous period</small></div>; }
function OutputItem({ title, detail, tag }) { return <div className="output-item"><div><strong>{title}</strong><p>{detail}</p></div><span>{tag}</span></div>; }

createRoot(document.getElementById('root')).render(<App />);
