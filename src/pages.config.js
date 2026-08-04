/**
 * pages.config.js - Page routing configuration
 * 
 * mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import ClaimForm from './pages/ClaimForm';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Configuration from './pages/Configuration';
import Approvals from './pages/Approvals'
import ApprovalMessages from './pages/ApprovalMessages';
import __Layout from './Layout.jsx';

export const PAGES = {
    "ClaimForm": ClaimForm,
    "Dashboard": Dashboard,
    "Home": Home,
    "Messages": Messages,
    "Configuration": Configuration,
    "Approvals": Approvals,
    "ApprovalMessages": ApprovalMessages,
}

export const pagesConfig = {
    mainPage: "ClaimForm",
    Pages: PAGES,
    Layout: __Layout,
};