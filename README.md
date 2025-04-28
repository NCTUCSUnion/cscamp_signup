# 交大資訊逐夢營報名網站

## 專案簡介
本網站為「交大資訊逐夢營」的官方報名網站，提供營隊相關資訊、報名流程、各組介紹、課程簡介及常見問答等內容。

## 技術堆疊
- Vue 3 + Vite
- TailwindCSS
- Swiper.js (輪播功能)
- Vue Router (路由管理)

## 功能說明
此網站共有五大主要頁面：
1. **首頁**：營隊主視覺、重點資訊和快速導覽
2. **報名資訊**：報名流程時間軸、費用說明與退款政策
3. **各組介紹**：六個組別（行政、活動、美宣、生活、進修、場器）的詳細介紹
4. **課程簡介**：課程時間表與特色說明
5. **常見 QA**：常見問題與答案

## 開發指南

### 環境需求
- Node.js 14.x 或更高版本
- npm 6.x 或更高版本

### 安裝與運行
```bash
# 安裝依賴
npm install

# 本地開發
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

### 目錄結構
```
├── public/            # 靜態資源 (圖片等)
├── src/
│   ├── assets/        # 樣式表與其他資源
│   │   ├── layout/    # 布局相關組件
│   │   └── ui/        # UI 組件
│   ├── data/          # JSON 資料檔案
│   ├── router/        # Vue Router 配置
│   ├── views/         # 頁面組件
│   │   └── teams/     # 各組介紹子頁面
│   ├── App.vue        # 主要 App 組件
│   └── main.js        # 應用程式入口點
└── index.html         # HTML 模板
```

## 部署說明
本網站設計為靜態網站，建置後可部署於 GitHub Pages、Netlify、Vercel 等靜態網站托管服務。

```bash
# 建置生產版本
npm run build

# 部署前測試
npm run preview
```

建置後的檔案將位於 `dist` 目錄，可直接上傳至托管服務。

## 自訂內容
所有營隊相關資訊存儲於 `src/data/camp-info.json`，可直接編輯此檔案修改網站內容，無需更改程式碼。

## 樣式自訂
網站使用 TailwindCSS，主要色彩與樣式定義於 `tailwind.config.js` 檔案中，可依需求調整。

## 圖片資源
請將所需的圖片放置於 `public/images/` 目錄下，具體需要哪些圖片請參考 `public/images/README.md`。

## 開發者
- I-TING CHU (111550093) - 國立陽明交通大學資訊工程學系
