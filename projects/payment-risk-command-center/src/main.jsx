import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { periodData } from './projectData';

function App() {
  const [period, setPeriod] = useState('30 days');
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');

  const d = periodData[period];
  const filteredTransactions = useMemo(
    () => d.transactions.filter((row) => `${row.id} ${row.merchant} ${row.rail}`.toLowerCase().includes(query.toLowerCase())),
    [query, d]
  );

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">PR</span>
          <span><strong>Payment Risk Command Center</strong><small>Fraud loss · Approval rate · Customer friction</small></span>
        </a>
      </header>

      <main id="top" className="page-width" style={{ paddingTop: 40 }}>
        <section className="hero">
          <div className="hero-copy">
            <p className="kicker"><span className="status-dot" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 12px var(--teal)', marginRight: 7 }} /> Live decision workspace</p>
            <h1>Balance fraud loss, approval rate, and <em>customer friction.</em></h1>
            <p className="hero-lede">A command center for monitoring portfolio exposure across payment rails, triaging transaction risk signals, and acting before loss compounds.</p>
          </div>
          <div className="hero-art" aria-label="Analytics overview illustration">
            <div className="glow" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="signal-card">
              <div className="signal-head"><span>LIVE SIGNAL MAP</span><i>●</i></div>
              <div className="signal-number">92<span>/100</span></div>
              <div className="signal-label">Portfolio risk index</div>
              <div className="mini-chart"><span style={{height:'35%'}}/><span style={{height:'49%'}}/><span style={{height:'42%'}}/><span style={{height:'66%'}}/><span style={{height:'58%'}}/><span style={{height:'82%'}}/><span style={{height:'71%'}}/><span style={{height:'91%'}}/></div>
              <div className="signal-footer"><span>Signal confidence</span><strong>High</strong></div>
            </div>
            <div className="floating-tag tag-top">+18.4% <small>loss avoided</small></div>
            <div className="floating-tag tag-bottom">2,847 <small>events scored</small></div>
          </div>
        </section>

        <section style={{ paddingTop: 60 }}>
          <div className="section-heading">
            <div><p className="kicker">Command center</p><h2>Transaction risk dashboard</h2></div>
            <p className="section-note">Searchable decision queue, portfolio exposure by rail, and risk-signal trend over the selected period. Switch between 7, 30, and 90 days to see how every metric, chart, and queue changes.</p>
          </div>
          <div className="dashboard">
            <div className="dashboard-toolbar">
              <div className="segmented">
                {['7 days','30 days','90 days'].map((item) => <button key={item} className={period === item ? 'selected' : ''} onClick={() => setPeriod(item)}>{item}</button>)}
              </div>
              <div className="toolbar-actions">
                <label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transactions" /></label>
                <button className="icon-button" onClick={() => showToast(`Report exported for the ${period} period.`)}>Export ↗</button>
              </div>
            </div>
            <div className="stat-grid">
              {d.stats.map((s) => <Stat key={s.label} label={s.label} value={s.value} change={s.change} good={s.good} />)}
            </div>
            <div className="dashboard-columns">
              <div className="chart-card">
                <div className="card-title">
                  <div><span>Risk signal trend</span><strong>Transaction risk by day</strong></div>
                  <span className="legend"><i /> {period}</span>
                </div>
                <div className="area-chart">
                  <div className="chart-grid"><span /><span /><span /><span /></div>
                  <svg viewBox="0 0 600 190" preserveAspectRatio="none">
                    <defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#26c7aa" stopOpacity=".38" /><stop offset="1" stopColor="#26c7aa" stopOpacity="0" /></linearGradient></defs>
                    <path d={d.chart.fillPath} fill="url(#fill)" />
                    <path d={d.chart.path} fill="none" stroke="#26c7aa" strokeWidth="3" />
                  </svg>
                  <div className="chart-labels">{d.chart.labels.map((l) => <span key={l}>{l}</span>)}</div>
                </div>
              </div>
              <div className="exposure-card">
                <div className="card-title"><div><span>Exposure mix</span><strong>By payment rail</strong></div></div>
                <div className="donut-wrap">
                  <div className="donut" style={{background:`conic-gradient(var(--teal) 0 ${d.donut.card}%,var(--blue) ${d.donut.card}% ${d.donut.card + d.donut.ach}%,var(--amber) ${d.donut.card + d.donut.ach}% 100%)`}}>
                    <div><strong>{d.donut.total}</strong><span>Total</span></div>
                  </div>
                  <div className="donut-legend">
                    <span><i className="teal-fill" /> Card <b>{d.donut.card}%</b></span>
                    <span><i className="blue-fill" /> ACH <b>{d.donut.ach}%</b></span>
                    <span><i className="amber-fill" /> Real-time <b>{d.donut.realtime}%</b></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-card">
              <div className="card-title">
                <div><span>Decision queue</span><strong>Recent transaction signals — {filteredTransactions.length} shown</strong></div>
                <button className="text-link" onClick={() => showToast('Full queue view is ready for your case-management integration.')}>View all →</button>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Transaction</th><th>Merchant</th><th>Rail</th><th>Amount</th><th>Risk score</th><th>Decision</th></tr></thead>
                  <tbody>
                    {filteredTransactions.map((row) => (
                      <tr key={row.id}>
                        <td><strong>{row.id}</strong><small>{row.reason}</small></td>
                        <td>{row.merchant}</td>
                        <td>{row.rail}</td>
                        <td>{row.amount}</td>
                        <td><span className={`score ${row.score > 80 ? 'high' : row.score > 50 ? 'medium' : 'low'}`}>{row.score}</span></td>
                        <td><span className={`decision ${row.status.toLowerCase()}`}>{row.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer page-width">
          <span>© 2026 Bennyhin Bapanapalli</span>
          <span>Payment Risk Command Center</span>
        </footer>
      </main>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function Stat({ label, value, change, good }) {
  return <div className="stat"><span>{label}</span><strong>{value}</strong><b className={good ? 'positive' : 'negative'}>{change}</b><small>vs. previous period</small></div>;
}

createRoot(document.getElementById('root')).render(<App />);
