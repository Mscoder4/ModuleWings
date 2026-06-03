/**
 * No-reload navigation logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

    // Function to load content
    const loadPage = async (url, pushState = true) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract the new main content
            const newContent = doc.querySelector('#main-content');
            const newTitle = doc.querySelector('title');

            if (newContent) {
                // Sync stylesheets
                const currentLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
                const newLinks = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));

                newLinks.forEach(newLink => {
                    const href = newLink.getAttribute('href');
                    if (href && !currentLinks.find(link => link.getAttribute('href') === href)) {
                        const linkNode = document.createElement('link');
                        linkNode.rel = 'stylesheet';
                        linkNode.href = href;
                        document.head.appendChild(linkNode);
                    }
                });

                currentLinks.forEach(currentLink => {
                    const href = currentLink.getAttribute('href');
                    if (href && !newLinks.find(link => link.getAttribute('href') === href)) {
                        currentLink.remove();
                    }
                });

                // Sync inline styles in head
                const currentStyles = Array.from(document.querySelectorAll('head style'));
                const newStyles = Array.from(doc.querySelectorAll('head style'));
                currentStyles.forEach(style => style.remove());
                newStyles.forEach(style => document.head.appendChild(style.cloneNode(true)));

                // Sync external scripts
                const currentScripts = Array.from(document.querySelectorAll('script[src]'));
                const newDocScripts = Array.from(doc.querySelectorAll('script[src]'));
                newDocScripts.forEach(newScript => {
                    const src = newScript.getAttribute('src');
                    if (src && !currentScripts.find(s => s.getAttribute('src') === src)) {
                        const scriptNode = document.createElement('script');
                        scriptNode.src = src;
                        if (newScript.defer) scriptNode.defer = true;
                        if (newScript.async) scriptNode.async = true;
                        document.body.appendChild(scriptNode);
                    }
                });

                // Update main content
                mainContent.innerHTML = newContent.innerHTML;
                document.title = newTitle ? newTitle.innerText : 'Admin Panel';
                
                if (pushState) {
                    window.history.pushState({ url }, '', url);
                }

                // Update active link in sidebar
                updateActiveLink(url);
                
                // Re-run scripts inside newContent
                executeScripts(mainContent);
            } else {
                // Fallback: if #main-content is not found, just reload
                window.location.href = url;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            window.location.href = url; // Fallback to normal load
        }
    };

    const updateActiveLink = (url) => {
        const path = new URL(url, window.location.origin).pathname;
        sidebarLinks.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            if (path === linkPath || (path === '/admin/' && linkPath === '/admin/dashboard')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    const executeScripts = (element) => {
        const scripts = element.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    };

    // Intercept sidebar link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.sidebar-nav a');
        if (link && link.href && link.origin === window.location.origin) {
            e.preventDefault();
            loadPage(link.href);
        }
    });

    // Handle back/forward buttons
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.url) {
            loadPage(e.state.url, false);
        } else {
            // Default to current URL if no state (initial load)
            loadPage(window.location.href, false);
        }
    });
});
