import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const [policy, setPolicy] = useState(70);
  const [toast, setToast] = useState('');

  const approvalRate = Math.min(98.7, 95.4 + (policy - 70) * 0.09).toFixed(1);
  const fraudPrevented = Math.max(9.8, 18.4 - (policy - 70) * 0.16).toFixed(1);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">FP</span>
          <span><strong>Fraud Policy Simulator</strong><small>Test policy changes before production</small></span>
        </a>
      </header>

      <main id="top" className="page-width">
        <section className="hero">
          <p className="kicker">Risk strategy lab</p>
          <h1>Make the cost of every control <em>visible.</em></h1>
          <p className="hero-lede">Adjust the auto-review threshold and see the projected impact on legitimate approvals, fraud loss prevented, and review volume before any change reaches production.</p>
        </section>

        <section style={{ paddingTop: 20 }}>
          <div className="section-heading">
            <div><p className="kicker">Policy lab</p><h2>Threshold simulator</h2></div>
            <p className="section-note">Move the slider to explore the tradeoff between protection and friction. The recommended operating point balances both.</p>
          </div>
          <div className="policy-demo">
            <div className="policy-control">
              <div className="control-header">
                <div><span>Policy threshold</span><strong>Auto-review above risk score</strong></div>
                <span className="threshold-value">{policy}</span>
              </div>
              <input type="range" min="40" max="95" value={policy} onChange={(event) => setPolicy(Number(event.target.value))} />
              <div className="range-labels"><span>More protection</span><span>Less friction</span></div>
              <div className="scenario-note">
                <span>Scenario</span>
                <p>Increase threshold to reduce manual reviews while keeping high-risk payments blocked.</p>
              </div>
              <button className="primary-button small" onClick={() => showToast(`Scenario saved at threshold ${policy}.`)}>Save scenario <span>→</span></button>
            </div>
            <div className="policy-results">
              <p className="kicker">Projected impact</p>
              <div className="impact-grid">
                <div>
                  <strong>{approvalRate}%</strong>
                  <span>legitimate approvals</span>
                  <b className="positive">+{(Number(approvalRate) - 95.4).toFixed(1)}%</b>
                </div>
                <div>
                  <strong>{fraudPrevented}%</strong>
                  <span>fraud loss prevented</span>
                  <b className="neutral">vs. current policy</b>
                </div>
                <div>
                  <strong>{Math.round(1284 - (policy - 70) * 18)}</strong>
                  <span>review cases per day</span>
                  <b className="positive">-{Math.max(0, Math.round((policy - 70) * 1.4))}%</b>
                </div>
              </div>
              <div className="decision-banner">
                <span className="check">✓</span>
                <div>
                  <strong>Recommended operating point</strong>
                  <p>At a threshold of 70, the portfolio protects revenue while keeping customer friction within target.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer page-width">
          <span>© 2026 Bennyhin Bapanapalli</span>
          <span>Fraud Policy Simulator</span>
        </footer>
      </main>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
