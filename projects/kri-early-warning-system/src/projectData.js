export const PERIODS = ['7 days', '30 days', '90 days'];

export const periodData = {
  '7 days': {
    stats: [
      { label: 'Portfolio exposure', value: '$2.18M', change: '+3.1%', good: false },
      { label: 'Approval rate', value: '95.2%', change: '+0.8%', good: true },
      { label: 'Fraud loss avoided', value: '$47K', change: '+12.6%', good: true },
      { label: 'Review queue', value: '312', change: '-4.3%', good: true },
    ],
    chart: {
      points: [40, 52, 38, 61, 48, 73, 65, 88],
      labels: ['Aug 10', 'Aug 11', 'Aug 12', 'Aug 13', 'Aug 14', 'Aug 15', 'Aug 16', 'Aug 17'],
      path: 'M0 155 C40 140,55 95,75 118 S120 50,150 78 S190 62,225 38 S270 80,300 52 S345 28,380 48 S430 12,460 30 S510 58,540 22 S580 48,600 20',
      fillPath: 'M0 155 C40 140,55 95,75 118 S120 50,150 78 S190 62,225 38 S270 80,300 52 S345 28,380 48 S430 12,460 30 S510 58,540 22 S580 48,600 20 L600 190 L0 190 Z',
    },
    donut: { total: '$2.2M', card: 62, ach: 24, realtime: 14 },
    transactions: [
      { id: 'TX-91304', merchant: 'Northstar Travel', rail: 'Card', amount: '$1,284', score: 92, status: 'Review', reason: 'Velocity + new device' },
      { id: 'TX-91301', merchant: 'Pine & Parcel', rail: 'ACH', amount: '$4,820', score: 81, status: 'Review', reason: 'Account age + geo mismatch' },
      { id: 'TX-91288', merchant: 'Morrow Digital', rail: 'Real-time', amount: '$228', score: 64, status: 'Monitor', reason: 'Unusual hour' },
      { id: 'TX-91275', merchant: 'Aster Market', rail: 'Card', amount: '$86', score: 18, status: 'Approve', reason: 'Low behavioral risk' },
      { id: 'TX-91261', merchant: 'Cobalt Goods', rail: 'Card', amount: '$3,650', score: 88, status: 'Review', reason: 'First-time high-value' },
      { id: 'TX-91244', merchant: 'Driftwave Labs', rail: 'Real-time', amount: '$940', score: 45, status: 'Monitor', reason: 'New merchant category' },
    ],
  },
  '30 days': {
    stats: [
      { label: 'Portfolio exposure', value: '$8.42M', change: '+6.2%', good: false },
      { label: 'Approval rate', value: '96.8%', change: '+1.4%', good: true },
      { label: 'Fraud loss avoided', value: '$184K', change: '+18.4%', good: true },
      { label: 'Review queue', value: '1,284', change: '-8.1%', good: true },
    ],
    chart: {
      points: [35, 49, 42, 66, 58, 82, 71, 91],
      labels: ['Jul 18', 'Jul 23', 'Jul 28', 'Aug 02', 'Aug 07', 'Aug 12', 'Aug 15', 'Aug 17'],
      path: 'M0 150 C44 145,55 120,92 132 S139 90,178 108 S220 68,254 88 S293 36,330 72 S378 93,414 59 S463 68,490 42 S548 52,600 18',
      fillPath: 'M0 150 C44 145,55 120,92 132 S139 90,178 108 S220 68,254 88 S293 36,330 72 S378 93,414 59 S463 68,490 42 S548 52,600 18 L600 190 L0 190 Z',
    },
    donut: { total: '$8.4M', card: 58, ach: 27, realtime: 15 },
    transactions: [
      { id: 'TX-84291', merchant: 'Northstar Travel', rail: 'Card', amount: '$1,284', score: 92, status: 'Review', reason: 'Velocity + new device' },
      { id: 'TX-84277', merchant: 'Pine & Parcel', rail: 'ACH', amount: '$4,820', score: 81, status: 'Review', reason: 'Account age + geo mismatch' },
      { id: 'TX-84266', merchant: 'Morrow Digital', rail: 'Real-time', amount: '$228', score: 64, status: 'Monitor', reason: 'Unusual hour' },
      { id: 'TX-84244', merchant: 'Aster Market', rail: 'Card', amount: '$86', score: 18, status: 'Approve', reason: 'Low behavioral risk' },
      { id: 'TX-84221', merchant: 'Cobalt Goods', rail: 'Card', amount: '$3,650', score: 88, status: 'Review', reason: 'First-time high-value' },
      { id: 'TX-84208', merchant: 'Driftwave Labs', rail: 'Real-time', amount: '$940', score: 45, status: 'Monitor', reason: 'New merchant category' },
      { id: 'TX-84195', merchant: 'Halcyon Books', rail: 'ACH', amount: '$2,100', score: 34, status: 'Approve', reason: 'Repeat merchant' },
      { id: 'TX-84172', merchant: 'Quartz Apparel', rail: 'Card', amount: '$672', score: 76, status: 'Review', reason: 'Address mismatch' },
    ],
  },
  '90 days': {
    stats: [
      { label: 'Portfolio exposure', value: '$24.7M', change: '+9.8%', good: false },
      { label: 'Approval rate', value: '97.4%', change: '+2.1%', good: true },
      { label: 'Fraud loss avoided', value: '$612K', change: '+22.7%', good: true },
      { label: 'Review queue', value: '3,840', change: '-11.5%', good: true },
    ],
    chart: {
      points: [28, 38, 52, 45, 61, 55, 72, 68, 80, 76, 88, 95],
      labels: ['May 20', 'May 27', 'Jun 03', 'Jun 10', 'Jun 17', 'Jun 24', 'Jul 01', 'Jul 08', 'Jul 15', 'Jul 22', 'Jul 29', 'Aug 05'],
      path: 'M0 170 C30 160,50 130,75 145 S120 100,150 118 S190 85,225 95 S270 70,300 82 S345 50,380 62 S425 45,460 52 S510 30,540 38 S580 20,600 10',
      fillPath: 'M0 170 C30 160,50 130,75 145 S120 100,150 118 S190 85,225 95 S270 70,300 82 S345 50,380 62 S425 45,460 52 S510 30,540 38 S580 20,600 10 L600 190 L0 190 Z',
    },
    donut: { total: '$24.7M', card: 54, ach: 30, realtime: 16 },
    transactions: [
      { id: 'TX-71044', merchant: 'Northstar Travel', rail: 'Card', amount: '$4,820', score: 94, status: 'Review', reason: 'Velocity + new device' },
      { id: 'TX-70981', merchant: 'Pine & Parcel', rail: 'ACH', amount: '$12,400', score: 86, status: 'Review', reason: 'Account age + geo mismatch' },
      { id: 'TX-70922', merchant: 'Morrow Digital', rail: 'Real-time', amount: '$1,850', score: 71, status: 'Monitor', reason: 'Unusual hour' },
      { id: 'TX-70855', merchant: 'Aster Market', rail: 'Card', amount: '$312', score: 22, status: 'Approve', reason: 'Low behavioral risk' },
      { id: 'TX-70801', merchant: 'Cobalt Goods', rail: 'Card', amount: '$8,200', score: 91, status: 'Review', reason: 'First-time high-value' },
      { id: 'TX-70744', merchant: 'Driftwave Labs', rail: 'Real-time', amount: '$3,400', score: 52, status: 'Monitor', reason: 'New merchant category' },
      { id: 'TX-70688', merchant: 'Halcyon Books', rail: 'ACH', amount: '$5,600', score: 38, status: 'Approve', reason: 'Repeat merchant' },
      { id: 'TX-70621', merchant: 'Quartz Apparel', rail: 'Card', amount: '$2,140', score: 79, status: 'Review', reason: 'Address mismatch' },
      { id: 'TX-70554', merchant: 'Sable & Stone', rail: 'Card', amount: '$7,900', score: 85, status: 'Review', reason: 'Bulk order anomaly' },
      { id: 'TX-70488', merchant: 'Brightform', rail: 'ACH', amount: '$18,200', score: 67, status: 'Monitor', reason: 'Large ACH + new payee' },
    ],
  },
};

export const kriData = {
  '7 days': {
    health: 78,
    level: 'Healthy',
    summary: 'All leading indicators within threshold. No open breaches in the last 7 days.',
    rows: [
      { name: 'Chargeback rate', value: '1.42%', change: '-0.18%', level: 'Healthy', owner: 'Payments ops' },
      { name: 'Manual review backlog', value: '312', change: '-4.3%', level: 'Healthy', owner: 'Risk operations' },
      { name: 'Reconciliation breaks', value: '8', change: '-6.1%', level: 'Healthy', owner: 'Finance controls' },
      { name: 'Failed payment rate', value: '2.91%', change: '-0.12%', level: 'Healthy', owner: 'Product' },
    ],
  },
  '30 days': {
    health: 72,
    level: 'Watch',
    summary: 'One leading indicator has breached its threshold. Two owners have open actions.',
    rows: [
      { name: 'Chargeback rate', value: '1.84%', change: '+0.42%', level: 'Breach', owner: 'Payments ops' },
      { name: 'Manual review backlog', value: '1,284', change: '+18.2%', level: 'Watch', owner: 'Risk operations' },
      { name: 'Reconciliation breaks', value: '23', change: '-12.0%', level: 'Healthy', owner: 'Finance controls' },
      { name: 'Failed payment rate', value: '3.26%', change: '+0.08%', level: 'Watch', owner: 'Product' },
    ],
  },
  '90 days': {
    health: 64,
    level: 'Watch',
    summary: 'Two indicators in breach over the quarter. Backlog trending up with seasonal volume.',
    rows: [
      { name: 'Chargeback rate', value: '2.12%', change: '+0.70%', level: 'Breach', owner: 'Payments ops' },
      { name: 'Manual review backlog', value: '3,840', change: '+24.5%', level: 'Breach', owner: 'Risk operations' },
      { name: 'Reconciliation breaks', value: '41', change: '+5.2%', level: 'Watch', owner: 'Finance controls' },
      { name: 'Failed payment rate', value: '3.61%', change: '+0.43%', level: 'Watch', owner: 'Product' },
    ],
  },
};
