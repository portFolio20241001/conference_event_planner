import React from 'react' // Reactライブラリをインポート
import ReactDOM from 'react-dom/client' // ReactDOMライブラリをインポート（React 18+の新しいエントリポイント）
import App from './App.jsx' // アプリケーションのメインコンポーネントをインポート
import './index.css' // グローバルなスタイルシートをインポート
import { Provider } from 'react-redux' // ReduxのProviderコンポーネントをインポート
import store from './store.js' // Reduxストアをインポート

ReactDOM.createRoot(document.getElementById('root')).render( // Reactアプリケーションを"root"要素にレンダリング
  <React.StrictMode> // StrictModeは開発時に潜在的な問題を検出するためのツール
    <Provider store={store}> // Reduxストアをアプリケーション全体に提供
    <App /> // アプリケーションのメインコンポーネントをレンダリング
    </Provider> // Providerの終了タグ
  </React.StrictMode>, // StrictModeの終了タグ
)
