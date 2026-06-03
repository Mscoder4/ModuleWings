export default function Dashboard() {
    return (
        <>
            <link rel="stylesheet" href="/assets/css/dashboard.css" />
            <div className="dashboard-header">
                <h1>Welcome to the Dashboard</h1>
                <p>Manage your business efficiently with our advanced admin tools.</p>
            </div>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
                <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <h3>Total Sales</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a1a2e' }}>$124,500</p>
                </div>
                <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <h3>New Orders</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a1a2e' }}>48</p>
                </div>
                <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <h3>Active Users</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a1a2e' }}>1,200</p>
                </div>
            </div>
        </>
    );
}
