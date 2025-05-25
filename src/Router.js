class Router {
  static #getCurrentPath() {
    return window.location.pathname;
  }
  static #push(path) {
    window.history.pushState(null, "", path);
  }

  constructor() {
    this.routes = new Map();

    const handlePopState = () => {
      const path = Router.#getCurrentPath();
      this.routes.has(path) && this.routes.get(path)();
    };
    window.addEventListener("popstate", handlePopState);
  }

  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  navigate(path) {
    if (this.routes.has(path)) {
      Router.#push(path);
      this.routes.get(path)();
    }
  }
}

module.exports = Router;
