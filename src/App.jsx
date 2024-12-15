import React, { useState } from "react"; // ReactとuseStateフックをインポート
import "./App.css"; // アプリケーションのスタイルシートをインポート
import ConferenceEvent from "./ConferenceEvent"; // ConferenceEventコンポーネントをインポート
import AboutUs from "./AboutUs"; // AboutUsコンポーネントをインポート

function App() { // アプリケーションのメインコンポーネントを定義
  const [showVenue, setShowVenue] = useState(false); // showVenue状態を初期化し、setShowVenueで状態を更新

  const handleGetStarted = () => { // "Get Started"ボタンがクリックされたときのイベントハンドラー
    setShowVenue(true); // showVenue状態をtrueに設定
  };

  return ( // コンポーネントのJSXを返す
    <>
      <header className="first_page"> {/* 最初のページのヘッダー部分 この部分に対し、App.cssで背景画像を設定している*/}
        <div className="main_event"> {/* メインイベントのコンテナ */}
          <div className="first_page_name_btn"> {/* イベント名とボタンのコンテナ */}
            <h1 className="budget_heading">Conference Expense Planner</h1> {/* イベントタイトル */}
            <p className="budget_sentence"> Plan your next major event with us!</p> {/* サブタイトル */}
            <div className="getstarted_btn"> {/* "Get Started"ボタンのコンテナ */}
              <button onClick={() => handleGetStarted()} className="get-started-btn"> {/* ボタンクリック時にhandleGetStartedを実行 */}
                Get Started
              </button>
            </div>
          </div>

          <div className="aboutus_main"> {/* About Usセクション */}
            <AboutUs /> {/* AboutUsコンポーネントをレンダリング */}
          </div>
        </div>

      </header>

      <div className={`event-list-container ${showVenue ? 'visible' : ''}`}> {/* イベントリストのコンテナ（showVenueがtrueならvisibleクラスを適用） */}
        <ConferenceEvent /> {/* ConferenceEventコンポーネントをレンダリング */}
      </div>
    </>
  );
}

export default App; // Appコンポーネントをエクスポート
