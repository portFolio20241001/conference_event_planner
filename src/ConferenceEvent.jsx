import React, { useState } from "react"; // ReactとuseStateフックをインポート
import "./ConferenceEvent.css"; // スタイルシートをインポート
import TotalCost from "./TotalCost"; // TotalCostコンポーネントをインポート
import { toggleMealSelection } from "./mealsSlice"; // mealsSliceからtoggleMealSelectionアクションをインポート
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice"; // avSliceから数量を増減させるアクションをインポート
import { useSelector, useDispatch } from "react-redux"; // ReduxのuseSelectorとuseDispatchフックをインポート
import { incrementQuantity, decrementQuantity } from "./venueSlice"; // venueSliceから数量を増減させるアクションをインポート

const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false); // アイテムの表示状態を管理するステート
    const [numberOfPeople, setNumberOfPeople] = useState(1); // 参加人数を管理するステート
    const venueItems = useSelector((state) => state.venue); // Reduxストアからvenueのアイテムを取得
    const avItems = useSelector((state) => state.av); // ReduxストアからAVのアイテムを取得
    const mealsItems = useSelector((state) => state.meals); // Reduxストアから食事のアイテムを取得
    const dispatch = useDispatch(); // Reduxのdispatch関数を取得
    const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity; // 残りのAuditoriumホールの数量を計算

    // アイテムの表示/非表示を切り替える関数
    const handleToggleItems = () => {
        console.log("handleToggleItems called"); // 関数が呼ばれたことをログに記録
        setShowItems(!showItems); // 現在の状態を反転させて表示/非表示を切り替える
    };

    // カートにアイテムを追加する関数
    const handleAddToCart = (index) => {
        // Auditoriumホールの数量が3以上の場合、追加しない
        if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
          return; // 追加しない
        }
        dispatch(incrementQuantity(index)); // Reduxアクションで数量を増やす
    };

    // カートからアイテムを削除する関数
    const handleRemoveFromCart = (index) => {
        // 数量が0より大きい場合にのみ減らす
        if (venueItems[index].quantity > 0) {
          dispatch(decrementQuantity(index)); // Reduxアクションで数量を減らす
        }
    };

    // AVアイテムの数量を増やす関数
    const handleIncrementAvQuantity = (index) => {
        dispatch(incrementAvQuantity(index)); // ReduxアクションでAVの数量を増やす
    };

    // AVアイテムの数量を減らす関数
    const handleDecrementAvQuantity = (index) => {
        dispatch(decrementAvQuantity(index)); // ReduxアクションでAVの数量を減らす
    };

    // 食事アイテムの選択状態を変更する関数
    const handleMealSelection = (index) => {
        const item = mealsItems[index]; // 選択された食事アイテムを取得
        // 食事タイプが"mealForPeople"の場合、人数を設定して選択状態を変更
        if (item.selected && item.type === "mealForPeople") {
            const newNumberOfPeople = item.selected ? numberOfPeople : 0; // 選択されている場合は人数を、そうでない場合は0に設定
            dispatch(toggleMealSelection(index, newNumberOfPeople)); // Reduxアクションで食事の選択状態を変更
        }
        else {
            dispatch(toggleMealSelection(index)); // 通常の食事アイテムの選択状態を変更
        }
    };

    // TotalCost用のアイテムリストを作成する関数
    const getItemsFromTotalCost = () => {
        const items = []; // アイテムを格納する配列

        venueItems.forEach((item) => {
          if (item.quantity > 0) {
            items.push({ ...item, type: "venue" }); // quantityが1以上のvenueアイテムを追加
          }
        });
        avItems.forEach((item) => {
          if (
            item.quantity > 0 &&
            !items.some((i) => i.name === item.name && i.type === "av") // 重複を避ける
          ) {
            items.push({ ...item, type: "av" }); // quantityが1以上のAVアイテムを追加
          }
        });
        mealsItems.forEach((item) => {
          if (item.selected) {
            const itemForDisplay = { ...item, type: "meals" }; // 選択された食事アイテムを追加
            if (item.numberOfPeople) {
              itemForDisplay.numberOfPeople = numberOfPeople; // 食事アイテムが人数を持っている場合、その人数を追加
            }
            items.push(itemForDisplay); // 食事アイテムをアイテムリストに追加
          }
        });
        return items; // 最終的なアイテムリストを返す
    };

    const items = getItemsFromTotalCost(); // TotalCost用のアイテムリストを取得
    console.log(items)

    // アイテムを表示するためのコンポーネント
    const ItemsDisplay = ({ items }) => {
        console.log(items); // アイテムをコンソールに表示

        return <>
            <div className="display_box1">
                {items.length === 0 && <p>No items selected</p>} {/* アイテムが選択されていない場合、メッセージを表示 */}
                <table className="table_item_data">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit Cost</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td> {/* アイテム名を表示 */}
                                <td>${item.cost}</td> {/* アイテムの単価を表示 */}
                                <td>
                                    {item.type === "meals" || item.numberOfPeople
                                    ? ` For ${numberOfPeople} people` // 食事アイテムの場合、人数を表示
                                    : item.quantity} {/* その他のアイテムは数量を表示 */}
                                </td>
                                <td>{item.type === "meals" || item.numberOfPeople
                                    ? `${item.cost * numberOfPeople}` // 食事アイテムは人数分の合計を表示
                                    : `${item.cost * item.quantity}`} {/* その他のアイテムは数量に基づいた合計を表示 */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    };

    // 総費用を計算する関数
    const calculateTotalCost = (section) => {
      let totalCost = 0;  // 初期値として総費用を0に設定

      // 引数に基づいてセクションを判断
      if (section === "venue") {  // もしセクションが'venue'なら
          venueItems.forEach((item) => {  // 会場のアイテムを一つずつ処理
              totalCost += item.cost * item.quantity;  // 各アイテムの費用を加算
          });
      } else if (section === "av") {  // もしセクションが'av'なら
          avItems.forEach((item) => {  // AVアイテムを一つずつ処理
              totalCost += item.cost * item.quantity;  // 各アイテムの費用を加算
          });
      } else if (section === "meals") {  // もしセクションが'meals'なら
          mealsItems.forEach((item) => {  // 食事のアイテムを一つずつ処理
              if (item.selected) {  // アイテムが選択されていれば
                  totalCost += item.cost * numberOfPeople;  // 食事の費用を人数分加算
              }
          });
      }
      return totalCost;  // 計算された総費用を返す
    };

    // 各セクションごとの総費用を計算
    const venueTotalCost = calculateTotalCost("venue");  // 会場の総費用
    const avTotalCost = calculateTotalCost("av");  // AVの総費用
    const mealsTotalCost = calculateTotalCost("meals");  // 食事の総費用

    // 商品セクションに遷移するための関数
    const navigateToProducts = (idType) => {
      if (idType == '#venue' || idType == '#addons' || idType == '#meals') {  // もし指定されたIDが'venue'、'addons'、または'meals'なら
          if (showItems) {  // 'showItems'がtrueの場合
              setShowItems(!showItems);  // 'showItems'を反転させる（falseにする）
          }
      }
    }

    // 総費用を格納するオブジェクト
    const totalCosts = {
      venue: venueTotalCost,  // 会場の総費用
      av: avTotalCost,  // AVの総費用
      meals: mealsTotalCost,  // 食事の総費用
    };

    return (
      <>
          {/* ナビゲーションバー */}
          <navbar className="navbar_event_conference">
              {/* ヘッダーロゴ */}
              <div className="company_logo">Conference Expense Planner</div>
              {/* ナビゲーションリンクと詳細ボタン */}
              <div className="left_navbar">
                  <div className="nav_links">
                      <a href="#venue" onClick={() => navigateToProducts("#venue")}>Venue</a>
                      <a href="#addons" onClick={() => navigateToProducts('#addons')}>Add-ons</a>
                      <a href="#meals" onClick={() => navigateToProducts('#meals')}>Meals</a>
                  </div>
                  {/* 詳細表示ボタン */}
                  <button className="details_button" onClick={() => setShowItems(!showItems)}>
                      Show Details
                  </button>
              </div>
          </navbar>

          {/* メインコンテナ */}
          <div className="main_container">
              {/* アイテムの詳細が非表示の場合 */}
              {!showItems ? (
                  <div className="items-information">
                      {/* 会場セクション */}
                      <div id="venue" className="venue_container container_main">
                          {/* 会場セクションタイトル */}
                          <div className="text">
                              <h1>Venue Room Selection</h1>
                          </div>
                          {/* 会場選択リスト */}
                          <div className="venue_selection">
                              {venueItems.map((item, index) => (
                                  <div className="venue_main" key={index}>
                                      {/* 会場の画像 */}
                                      <div className="img">
                                          <img src={item.img} alt={item.name} />
                                      </div>
                                      {/* 会場名 */}
                                      <div className="text">{item.name}</div>
                                      {/* 会場のコスト */}
                                      <div>${item.cost}</div>
                                      {/* ボタンコンテナ */}
                                      <div className="button_container">
                                          {/* オーディトリウムホールの場合の処理 */}
                                          {venueItems[index].name === "Auditorium Hall (Capacity:200)" ? (
                                              <>
                                                  {/* 減少ボタン */}
                                                  <button
                                                      className={venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
                                                      onClick={venueItems[index].quantity === 0 ? null : () => handleRemoveFromCart(index)}
                                                      disabled={venueItems[index].quantity === 0}
                                                  >
                                                      &#8211;
                                                  </button>
                                                  {/* 選択済みの数量 */}
                                                  <span className="selected_count">
                                                      {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                                                  </span>
                                                  {/* 増加ボタン */}
                                                  <button
                                                      className={remainingAuditoriumQuantity === 0 ? "btn-success btn-disabled" : "btn-success btn-plus"}
                                                      onClick={remainingAuditoriumQuantity === 0 ? null : () => handleAddToCart(index)}
                                                      disabled={remainingAuditoriumQuantity === 0}
                                                  >
                                                      &#43;
                                                  </button>
                                              </>
                                          ) : (
                                              <div className="button_container">
                                                  {/* 減少ボタン */}
                                                  <button
                                                      className={venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-warning btn-plus"}
                                                      onClick={venueItems[index].quantity === 0 ? null : () => handleRemoveFromCart(index)}
                                                      disabled={venueItems[index].quantity === 0}   
                                                  >
                                                      &#8211; {/*&#8211; は – として表示されます。*/}
                                                  </button>
                                                  {/* 選択済みの数量 */}
                                                  <span className="selected_count">
                                                      {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                                                  </span>
                                                  {/* 増加ボタン */}
                                                  <button
                                                      className={venueItems[index].quantity === 10 ? "btn-success btn-disabled" : "btn-success btn-plus"}
                                                      onClick={() => handleAddToCart(index)}
                                                      disabled={venueItems[index].quantity === 10}
                                                  >
                                                      &#43;  {/*&#43; は + として表示されます。*/}
                                                  </button>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              ))}
                          </div>
                          {/* 会場の合計コスト */}
                          <div className="total_cost">Total Cost: ${venueTotalCost}</div>
                      </div>
  



                      {/* 必要な追加機能セクション */}
                      <div id="addons" className="venue_container container_main">
                          {/* 追加機能セクションタイトル */}
                          <div className="text">
                              <h1> Add-ons Selection</h1>
                          </div>
                          {/* 追加機能選択リスト */}
                          <div className="addons_selection">
                              {avItems.map((item, index) => (
                                  <div className="av_data venue_main" key={index}>
                                      {/* 追加機能の画像 */}
                                      <div className="img">
                                          <img src={item.img} alt={item.name} />
                                      </div>
                                      {/* 追加機能名 */}
                                      <div className="text">{item.name}</div>
                                      {/* 追加機能のコスト */}
                                      <div> ${item.cost} </div>
                                      {/* 数量変更ボタン */}
                                      <div className="addons_btn">
                                          {/* 減少ボタン */}
                                          <button className="btn-warning" onClick={() => handleDecrementAvQuantity(index)}>&ndash;</button>
                                          {/* 数量表示 */}
                                          <span className="quantity-value">{item.quantity}</span>
                                          {/* 増加ボタン */}
                                          <button className="btn-success" onClick={() => handleIncrementAvQuantity(index)}> &#43; </button>
                                      </div>
                                  </div>
                              ))}
                          </div>
                          {/* 追加機能の合計コスト */}
                          <div className="total_cost">Total Cost: {avTotalCost}</div>
                      </div>
  





  
                      {/* 食事セクション */}
                      <div id="meals" className="venue_container container_main">
                          {/* 食事セクションタイトル */}
                          <div className="text">
                              <h1>Meals Selection</h1>
                          </div>
                          {/* 人数入力フィールド */}
                          <div className="input-container venue_selection">
                              <div className="input-container venue_selection">
                                  <label htmlFor="numberOfPeople"><h3>Number of People:</h3></label>
                                  <input
                                      type="number"
                                      className="input_box5"
                                      id="numberOfPeople"
                                      value={numberOfPeople}
                                      onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                                      min="1"
                                  />
                              </div>
                          </div>
                          {/* 食事選択リスト */}
                          <div className="meal_selection">
                              {mealsItems.map((item, index) => (
                                  <div className="meal_item" key={index} style={{ padding: 15 }}>
                                      {/* 食事選択チェックボックス */}
                                      <div className="inner">
                                          <input
                                              type="checkbox"
                                              id={`meal_${index}`}
                                              checked={item.selected}
                                              onChange={() => handleMealSelection(index)}
                                          />
                                          <label htmlFor={`meal_${index}`}> {item.name} </label>
                                      </div>
                                      {/* 食事のコスト */}
                                      <div className="meal_cost">${item.cost}</div>
                                  </div>
                              ))}
                          </div>
                          {/* 食事の合計コスト */}
                          <div className="total_cost">Total Cost: {mealsTotalCost}</div>
                      </div>
                  </div>
              ) : (
                  // 詳細表示の場合
                  <div className="total_amount_detail">
                      <TotalCost totalCosts={totalCosts} ItemsDisplay={() => <ItemsDisplay items={items} />} />
                  </div>
              )}
          </div>    
      </>
  );
  

};

export default ConferenceEvent;
