import "./scss/app.scss";
import Application from "./js/Application";

window.addEventListener("DOMContentLoaded", () => {
  // This block will be executed once the page is loaded and ready
  const url = 'https://swapi.boom.dev/api/planets';
  const app = new Application(url);
  // Used to access the app instance by the automated tests
  // app._load();
  window.__JS_APP = app;
});
