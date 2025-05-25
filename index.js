// @ts-nocheck
const { JSDOM } = require("jsdom");

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost:3000/",
  pretendToBeVisual: true,
  resources: "usable",
});

global.document = dom.window.document;
global.window = dom.window;
global.history = dom.window.history;
global.location = dom.window.location;
const Router = require("./src/Router.js");
const router = new Router();

router.addRoute("/", () => {
  const home = document.createElement("div");
  home.innerHTML = "Home";
  document.body.appendChild(home);
});

router.addRoute("/about", () => {
  const about = document.createElement("div");
  about.innerHTML = "About";
  document.body.appendChild(about);
});

router.navigate("/about");

console.log("Current URL:", window.location.href);
console.log("Page content:", document.body.innerHTML);
