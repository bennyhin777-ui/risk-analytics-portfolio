import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const kriRows = [
  { name: 'Chargeback rate', value: '1.84%', change: '+0.42%', level: 'Breach', owner: 'Payments ops' },
  { name: 'Manual review backlog', value: '1,284', change: '+18.2%', level: 'Watch', owner: 'Risk operations' },
  { name: 'Reconciliation breaks', value: '23', change: '-12.0%', level: 'Healthy', owner: 'Finance controls' },
  { name: 'Failed payment rate', value: '3.26%', change: '+0.08%', level: 'Watch', owner: 'Product' },
];

function App() {
  const [toast, setToast] = useState('');

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">KR</span>
          <span><strong>KRI Early-Warning System</strong><small>Operational resilience</small></span>
        </a>
      </header>

      <main id="top" className="page-width">
        <section className="hero">
          <p className="kicker">Operational resilience</p>
          <h1>Connect operational signals to owners and <em>actions.</em></h1>
          <p className="hero-lede">Monitor key risk indicators before a small issue becomes a customer-impacting event. Each indicator has an owner, a level, and a clear next action.</p>
        </section>

        <section style={{ paddingTop: 20 }}>
          <div className="section-heading">
            <div><p className="kicker">Control room</p><h2>Key risk indicators</h2></div>
            <p className="section-note">Overall operating health with owner-assigned indicators, threshold tracking, and action digest generation.</p>
          </div>
          <div className="kri-demo">
            <div className="kri-summary">
              <div>
                <span>Overall operating health</span>
                <strong>Watch</strong>
                <p>One leading indicator has breached its threshold. Two owners have open actions.</p>
              </div>
              <div className="health-ring"><span>72</span><small>/100</small></div>
            </div>
            <div className="kri-table">
              <div className="card-title">
                <div><span>Control room</span><strong>Key risk indicators</strong></div>
                <button className="text-link" onClick={() => showToast('Action digest prepared for the weekly risk review.')}>Create action digest →</button>
              </div>
              {kriRows.map((row) => (
                <div className="kri-row" key={row.name}>
                  <span className={`level-dot ${row.level.toLowerCase()}`} />
                  <div className="kri-name"><strong>{row.name}</strong><span>{row.owner}</span></div>
                  <strong className="kri-value">{row.value}</strong>
                  <span className={`level-pill ${row.level.toLowerCase()}`}>{row.level}</span>
                  <span className={`kri-change ${row.change.startsWith('+') && row.level !== 'Healthy' ? 'bad' : 'good'}`}>{row.change}</span>
                  <button className="row-action" onClick={() => showToast(`${row.name} action plan opened.`)}>Open →</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="footer page-width">
          <span>© 2026 Bennyhin Bapanapalli</span>
          <span>KRI Early-Warning System</span>
        </footer>
      </main>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
