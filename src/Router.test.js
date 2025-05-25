// @ts-nocheck
const Router = require("./Router");

function createMockWindow() {
  const mockWindow = {
    location: {
      pathname: "/",
    },
    history: {
      pushState: jest.fn(),
    },
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  return mockWindow;
}

describe("Router", () => {
  let mockWindow;
  let router;
  beforeEach(() => {
    mockWindow = createMockWindow();
    router = new Router(mockWindow);
  });

  test("addRoute", () => {
    router.addRoute("/", () => {});
    expect(router.routes.size).toBe(1);
  });
  test("navigate", () => {
    const handler = jest.fn();
    router.addRoute("/test", handler);
    router.navigate("/test");
    expect(mockWindow.history.pushState).toHaveBeenCalledWith(
      null,
      "",
      "/test"
    );
    expect(handler).toHaveBeenCalled();
  });

  test("導航至不存在的路由時應該顯示警告", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

    router.navigate("/不存在的路由");

    expect(consoleSpy).toHaveBeenCalledWith("找不到路由: /不存在的路由");
    expect(mockWindow.history.pushState).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
