import Router from "./src/Router.js";

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
console.log(1);
window.location.replace("file:///Users/liuduofeng/Desktop/Router/about.html");
