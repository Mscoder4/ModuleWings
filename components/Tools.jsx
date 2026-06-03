export default function Tools() {
    return (
        <div className="tools-container">
            <div className="search-bar">
                <input name="search" type="text" placeholder="Search for anything..." />
                <button className="search-btn">
                    <img src="/assets/icons/search.svg" alt="Search" />
                </button>
            </div>

            <button className="new-btn">
                <span>New</span>
            </button>

            <div className="divider"></div>

            <div className="tool-actions">
                <div className="action-item">
                    <img src="/assets/icons/notification.svg" alt="Notifications" />
                </div>
                <div className="action-item">
                    <span>Settings</span>
                </div>
                <div className="action-item">
                    <span>Menu</span>
                </div>
            </div>
        </div>
    );
}
