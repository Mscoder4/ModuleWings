import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({ children }) {
    return (
        <>
            <link rel="stylesheet" href="/assets/css/sidebar.css" />
            <link rel="stylesheet" href="/assets/css/tools.css" />
            <Sidebar />
            <main id="main-content">
                {children}
            </main>
        </>
    );
}
