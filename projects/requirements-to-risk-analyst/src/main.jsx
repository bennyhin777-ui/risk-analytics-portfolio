import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const [requirementsTab, setRequirementsTab] = useState('stories');
  const [toast, setToast] = useState('');

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">RA</span>
          <span><strong>Requirements-to-Risk Analyst</strong><small>Human-in-the-loop AI</small></span>
        </a>
      </header>

      <main id="top" className="page-width">
        <section className="hero">
          <p className="kicker">Human-in-the-loop AI</p>
          <h1>Turn messy stakeholder language into <em>usable requirements.</em></h1>
          <p className="hero-lede">Feed in a stakeholder transcript and get structured user stories, risk controls, and clarification questions — with detected intents and risk tensions surfaced for review.</p>
        </section>

        <section style={{ paddingTop: 20 }}>
          <div className="section-heading">
            <div><p className="kicker">AI business analysis</p><h2>Transcript to requirements</h2></div>
            <p className="section-note">The left panel shows the stakeholder input with detected signals. The right panel shows the structured output ready for review.</p>
          </div>
          <div className="requirements-demo">
            <div className="transcript">
              <div className="card-title">
                <div><span>Input</span><strong>Stakeholder transcript</strong></div>
                <span className="file-badge">meeting_notes.txt</span>
              </div>
              <div className="quote">
                <span>“</span>
                <p>We need faster payouts for trusted sellers, but compliance wants stronger controls around first-time withdrawals. The operations team also needs visibility into anything that gets held.</p>
              </div>
              <div className="signal-list">
                <span><i className="signal-blue" /> Intent detected: payout acceleration</span>
                <span><i className="signal-amber" /> Risk tension: first-time withdrawal</span>
                <span><i className="signal-coral" /> Missing: service-level target</span>
              </div>
            </div>
            <div className="requirements-output">
              <div className="output-tabs">
                {['stories','controls','questions'].map((tab) => (
                  <button key={tab} className={requirementsTab === tab ? 'active' : ''} onClick={() => setRequirementsTab(tab)}>
                    {tab === 'stories' ? 'User stories' : tab === 'controls' ? 'Risk controls' : 'Questions'}
                  </button>
                ))}
              </div>
              {requirementsTab === 'stories' && (
                <div className="output-list">
                  <OutputItem title="Trusted seller payout" detail="As a trusted seller, I want faster payouts so that I can access cleared funds sooner." tag="Ready" />
                  <OutputItem title="First withdrawal review" detail="As a risk analyst, I want first-time withdrawals scored against account signals before release." tag="Needs criteria" />
                  <OutputItem title="Held payout visibility" detail="As an operations lead, I want a queue showing held payouts, owner, age, and next action." tag="Ready" />
                </div>
              )}
              {requirementsTab === 'controls' && (
                <div className="output-list">
                  <OutputItem title="Velocity control" detail="Compare withdrawal amount and frequency against seller history and peer cohort." tag="High impact" />
                  <OutputItem title="Account trust score" detail="Require a minimum verified account age and identity confidence before acceleration." tag="High impact" />
                  <OutputItem title="Human review fallback" detail="Route ambiguous cases to operations with evidence and an expiry timer." tag="Required" />
                </div>
              )}
              {requirementsTab === 'questions' && (
                <div className="output-list">
                  <OutputItem title="Define faster" detail="What payout time should qualify as success: minutes, same-day, or next-day?" tag="Ask stakeholder" />
                  <OutputItem title="Set the boundary" detail="Which seller segments are eligible for accelerated first withdrawals?" tag="Ask compliance" />
                  <OutputItem title="Measure friction" detail="What is the acceptable hold rate and manual-review SLA?" tag="Ask operations" />
                </div>
              )}
              <button className="outline-button full" onClick={() => showToast('Review packet exported for stakeholder approval.')}>Export review packet ↗</button>
            </div>
          </div>
        </section>

        <footer className="footer page-width">
          <span>© 2026 Bennyhin Bapanapalli</span>
          <span>Requirements-to-Risk Analyst</span>
        </footer>
      </main>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function OutputItem({ title, detail, tag }) {
  return <div className="output-item"><div><strong>{title}</strong><p>{detail}</p></div><span>{tag}</span></div>;
}

createRoot(document.getElementById('root')).render(<App />);
