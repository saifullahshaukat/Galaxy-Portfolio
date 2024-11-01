// main.js
import { renderAboutSection } from './AboutSection.js';
import { renderBackground } from './BackgroundRender.js';
import { renderPortfolioSection } from './PortfolioSec.js';
import { renderPreloader } from './PreLoader.js';
import { renderSearchButton } from './SearchButton.js';
import { RenderStyles } from './styles.js';

// Initialize the application
function init() {
    renderAboutSection();
    renderBackground();
    renderPortfolioSection();
    renderPreloader();
    renderSearchButton();
    RenderStyles();
}

// Call the init function to run the app
init();
