import { injectLoader } from './modules/loader.js';
import { injectBaseLayout, handleActiveState } from './modules/layout.js';
import { setupInteractions } from './modules/interactions.js';
import { initStatusMonitor } from './modules/status.js';
import { initSolarSync } from './modules/solar.js';
import './modules/search.js'; // attaches global functions
import { registerServiceWorker } from './modules/serviceWorker.js';

export function initNavigation() {
  injectLoader();
  injectBaseLayout();
  initSolarSync();
  initStatusMonitor();
  setupInteractions();
  handleActiveState();
  registerServiceWorker();
}
