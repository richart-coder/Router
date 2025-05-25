# Router 測試文件

## 測試環境

- Jest 作為測試框架
- jsdom 作為測試環境
- 使用 Jest 的 mock 功能模擬瀏覽器 API

## 測試策略

### 單元測試

所有核心功能都有對應的單元測試，確保：

- 路由註冊功能正常運作
- 路由導航功能正常運作
- 錯誤處理機制正常運作

### 模擬策略

使用 `createMockWindow` 函數模擬瀏覽器環境：

```javascript
function createMockWindow() {
  return {
    location: { pathname: "/" },
    history: { pushState: jest.fn() },
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
}
```

## 測試案例說明

### 1. 路由註冊測試 (#1-addRoute)

- 目的：確保路由可以正確註冊
- 驗證：`routes` Map 的大小是否正確增加
- 測試檔案：`src/Router.test.js`

### 2. 路由導航測試 (#2-navigate)

- 目的：確保路由導航功能正常
- 驗證：
  - URL 是否正確更新
  - 對應的處理函數是否被調用
- 測試檔案：`src/Router.test.js`

### 3. 錯誤處理測試 (#3-導航至不存在的路由時應該顯示警告)

- 目的：確保導航至不存在的路由時有適當的錯誤處理
- 驗證：
  - 是否顯示警告訊息
  - 是否不執行 URL 更新
- 測試檔案：`src/Router.test.js`

## 執行測試

```bash

npm test


npm test src/Router.test.js


npm test -- --watch
```

## 測試覆蓋率

- 所有核心功能都有對應的測試案例
- 測試覆蓋率目標：100%

## 持續整合

- 每次提交都會觸發測試
- 所有測試必須通過才能合併 PR

## 注意事項

1. 新增功能時必須同時新增對應的測試
2. 修改現有功能時必須確保所有測試仍然通過
3. 測試案例應該包含正常情況和錯誤情況
4. 使用 `beforeEach` 確保每個測試都有乾淨的環境
