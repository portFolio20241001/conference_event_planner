// venueSlice.js

import { createSlice } from "@reduxjs/toolkit"; // Redux ToolkitからcreateSlice関数をインポート

// venueSliceを作成
export const venueSlice = createSlice({
  name: "venue", // スライスの名前を"venue"に設定
  initialState: [ // 初期状態を配列として定義
    {
      img: "", // 画像URLのプレースホルダー
      name: "Conference Room (Capacity:15)", // 会議室（定員:15）の名前
      cost: 3500, // 会議室のコスト
      quantity: 0, // 会議室の初期数量
    },
    {
      img: "", // 画像URLのプレースホルダー
      name: "Auditorium Hall (Capacity:200)", // 大ホール（定員:200）の名前
      cost: 5500, // 大ホールのコスト
      quantity: 0, // 大ホールの初期数量
    },
    {
      img: "", // 画像URLのプレースホルダー
      name: "Presentation Room (Capacity:50)", // プレゼンテーションルーム（定員:50）の名前
      cost: 700, // プレゼンテーションルームのコスト
      quantity: 0, // プレゼンテーションルームの初期数量
    },
    {
      img: "", // 画像URLのプレースホルダー
      name: "Large Meeting Room (Capacity:10)", // 大規模会議室（定員:10）の名前
      cost: 900, // 大規模会議室のコスト
      quantity: 0, // 大規模会議室の初期数量
    },
    {
      img: "", // 画像URLのプレースホルダー
      name: "Small Meeting Room (Capacity:5)", // 小規模会議室（定員:5）の名前
      cost: 1100, // 小規模会議室のコスト
      quantity: 0, // 小規模会議室の初期数量
    },
  ],
  reducers: { // 状態を変更するリデューサーを定義
    incrementQuantity: (state, action) => { // 数量を増加させるアクション
      const { payload: index } = action; // actionからインデックスを取得
      if (state[index]) { // 指定されたインデックスが状態内に存在する場合
        // 大ホールの数量が3以上の場合、増加させない
        if (state[index].name === "Auditorium Hall (Capacity:200)" && state[index].quantity >= 3) {
          return; // 何もしない
        }
        state[index].quantity++; // 数量を1増加
      }
    },
    decrementQuantity: (state, action) => { // 数量を減少させるアクション
      const { payload: index } = action; // actionからインデックスを取得
      if (state[index] && state[index].quantity > 0) { // 指定されたインデックスが存在し、数量が0より大きい場合
        state[index].quantity--; // 数量を1減少
      }
    },
  },
});

// アクションをエクスポート
export const { incrementQuantity, decrementQuantity } = venueSlice.actions; // incrementQuantity と decrementQuantity アクションをエクスポート

// venueSliceのリデューサーをデフォルトエクスポート
export default venueSlice.reducer; // venueSliceのリデューサーをデフォルトエクスポート
