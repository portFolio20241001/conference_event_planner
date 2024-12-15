import { createSlice } from "@reduxjs/toolkit"; // Redux ToolkitのcreateSlice関数をインポート

export const avSlice = createSlice({ // Audio Visual（AV）スライスを作成
  name: "av", // スライスの名前を"av"に設定
  initialState: [ // 初期状態を配列として定義
        {
        img: "", // 画像URLのプレースホルダー
        name: "Projectors", // アイテム名: プロジェクター
        cost: 200, // アイテムのコスト
        quantity: 0, // 初期数量
    },
    {
        img: "", // 画像URLのプレースホルダー
        name: "Speaker", // アイテム名: スピーカー
        cost: 35, // アイテムのコスト
        quantity: 0, // 初期数量
    },
    {
        img: "", // 画像URLのプレースホルダー
        name: "Microphones", // アイテム名: マイク
        cost: 45, // アイテムのコスト
        quantity: 0, // 初期数量
    },
    {
        img: "", // 画像URLのプレースホルダー
        name: "Whiteboards", // アイテム名: ホワイトボード
        cost: 80, // アイテムのコスト
        quantity: 0, // 初期数量
    },

    {
        img: "", // 画像URLのプレースホルダー
        name: "Signage", // アイテム名: サイネージ
        cost: 80, // アイテムのコスト
        quantity: 0, // 初期数量
    },

  ],

  reducers: { // ステートを操作するリデューサーを定義
    incrementAvQuantity: (state, action) => { // 数量を増加させるアクション
        const item = state[action.payload]; // 指定されたアイテムを取得
        if (item) { // アイテムが存在する場合
            item.quantity++; // 数量を1増加
        }
    },
    decrementAvQuantity: (state, action) => { // 数量を減少させるアクション
        const item = state[action.payload]; // 指定されたアイテムを取得
        if (item && item.quantity > 0) { // アイテムが存在し、数量が0より大きい場合
            item.quantity--; // 数量を1減少
        }
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions; // アクションをエクスポート

export default avSlice.reducer; // リデューサーをデフォルトエクスポート
