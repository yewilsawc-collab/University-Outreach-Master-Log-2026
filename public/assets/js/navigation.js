// navigation.js
// Elementa v2.0 — SPA Router with caching

const viewContainer = document.getElementById("view-container");

// Cache for loaded views
const viewCache = new Map();

// Load a view into the container
export async function loadView(viewName) {
    try {
        // Use cached version if available
        if (viewCache.has(viewName)) {
            viewContainer.innerHTML = viewCache.get(viewName);
            runViewScript(viewName);
            return;
        }

        // Fetch the view HTML
        const response = await fetch(`/views/${viewName}.html`, { cache: "force-cache" });

        if (!response.ok) {
            viewContainer.innerHTML = `<p>View not found: ${viewName}</p>`;
            return;
        }

        const html = await response.text();

        // Cache it
        viewCache.set(viewName, html);

        // Inject into DOM
        viewContainer.innerHTML = html;

        // Run optional JS module for this view
        runViewScript(viewName);

    } catch (err) {
        viewContainer.innerHTML = `<p>Failed to load view.</p>`;
    }
}

// Load matching JS module if it exists
async function runViewScript(viewName) {
    const scriptPath = `/js/views/${viewName}.js`;

    try {
        await import(scriptPath);
    } catch {
        // View has no script — that's fine
    }
}

// Bind navigation buttons
function bindNavigation() {
    document.querySelectorAll("[data-view]").forEach(btn => {
        btn.addEventListener("click", () => {
            const view = btn.dataset.view;
            loadView(view);
        });
    });
}

// Initialize router
export function initRouter() {
    bindNavigation();
    loadView("feed"); // default view
    }
          
