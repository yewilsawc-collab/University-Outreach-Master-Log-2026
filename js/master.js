import { initNavigation } from './modules/navigation.js';
import { initSearch } from './modules/search.js';
import { initQuickActions } from './modules/quickActions.js';
import { initStatusMonitor } from './modules/statusMonitor.js';
import { initSolarSync } from './modules/solarSync.js';
import { registerSW } from './modules/serviceWorker.js';

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSearch();
  initQuickActions();
  initStatusMonitor();
  initSolarSync();
  registerSW();
});
