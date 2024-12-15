import React, { useState, useEffect } from 'react'; // Reactと必要なフックをインポート
import "./TotalCost.css"; // CSSファイルをインポート

// TotalCostコンポーネントを定義
const TotalCost = ({ totalCosts, ItemsDisplay }) => {
    // 料金の合計を計算
    const total_amount = totalCosts.venue + totalCosts.av + totalCosts.meals;

    return (
        <div className="pricing-app"> {/* 価格表示のためのコンテナ */}
            <div className="display_box"> {/* 価格表示のボックス */}
                <div className="header"> {/* ヘッダー部分 */}
                    <p className="preheading"><h3>Total cost for the event</h3></p> {/* イベントの合計費用のタイトル */}
                </div>
                <div> {/* 内容部分 */}
                    <h2 id="pre_fee_cost_display" className="price">
                        ${total_amount} {/* 合計金額を表示 */}
                    </h2>
                    <div className="render_items"> {/* アイテムリストを表示する部分 */}
                        {ItemsDisplay ? <ItemsDisplay /> : <p>No items to display</p>} {/* 渡されたItemsDisplayコンポーネントを表示 */}
                    </div>
                </div>
            </div>
        </div>
    );
};

// TotalCostコンポーネントをエクスポート
export default TotalCost;
