class Router {
  constructor(windowObj = window) {
    this.window = windowObj;
    this.routes = new Map();

    const handlePopState = () => {
      const path = this.window.location.pathname;
      this.routes.has(path) && this.routes.get(path)();
    };
    const cleanupPopstate = () => {
      this.window.removeEventListener("popstate", handlePopState);
    };
    this.window.addEventListener("popstate", handlePopState);
    this.window.addEventListener("beforeunload", cleanupPopstate);
  }

  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  navigate(path) {
    if (this.routes.has(path)) {
      this.window.history.pushState(null, "", path);
      this.routes.get(path)();
    } else {
      console.warn(`找不到路由: ${path}`);
    }
  }
}

module.exports = Router;
