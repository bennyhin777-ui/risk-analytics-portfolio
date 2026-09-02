import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { kriData } from './projectData';

function App() {
  const [period, setPeriod] = useState('30 days');
  const [toast, setToast] = useState('');

  const data = kriData[period];
  const levelClass = data.level.toLowerCase();

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
          <p className="hero-lede">Monitor key risk indicators before a small issue becomes a customer-impacting event. Each indicator has an owner, a level, and a clear next action. Switch between 7, 30, and 90 days to see how indicators evolve.</p>
        </section>

        <section style={{ paddingTop: 20 }}>
          <div className="section-heading">
            <div><p className="kicker">Control room</p><h2>Key risk indicators</h2></div>
            <p className="section-note">Overall operating health with owner-assigned indicators, threshold tracking, and action digest generation. Every value, level, and trend updates with the selected period.</p>
          </div>
          <div className="kri-demo">
            <div className="kri-period-bar">
              <div className="segmented">
                {['7 days','30 days','90 days'].map((item) => <button key={item} className={period === item ? 'selected' : ''} onClick={() => setPeriod(item)}>{item}</button>)}
              </div>
            </div>
            <div className="kri-summary">
              <div>
                <span>Overall operating health</span>
                <strong className={`kri-level-${levelClass}`}>{data.level}</strong>
                <p>{data.summary}</p>
              </div>
              <div className={`health-ring ring-${levelClass}`}><span>{data.health}</span><small>/100</small></div>
            </div>
            <div className="kri-table">
              <div className="card-title">
                <div><span>Control room</span><strong>Key risk indicators — {period}</strong></div>
                <button className="text-link" onClick={() => showToast(`Action digest prepared for the ${period} risk review.`)}>Create action digest →</button>
              </div>
              {data.rows.map((row) => (
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
