import { createSlice } from '@reduxjs/toolkit'; // Redux ToolkitからcreateSlice関数をインポート

// mealsSliceを作成
export const mealsSlice = createSlice({
  name: 'meals', // スライスの名前を'meals'に設定
  initialState: [ // 初期状態を配列として定義
    { name: 'Breakfast', cost: 50, selected: false }, // 朝食の初期設定（名前、コスト、選択状態）
    { name: 'High Tea', cost: 25, selected: false }, // ハイティーの初期設定（名前、コスト、選択状態）
    { name: 'Lunch', cost: 65, selected: false }, // 昼食の初期設定（名前、コスト、選択状態）
    { name: 'Dinner', cost: 70, selected: false }, // 夕食の初期設定（名前、コスト、選択状態）
  ],
  reducers: { // 状態を変更するリデューサーを定義
    toggleMealSelection: (state, action) => { // 食事の選択状態を切り替えるアクション
        state[action.payload].selected = !state[action.payload].selected; // 選択状態を反転させる
    },
  },
});

// アクションをエクスポート
export const { toggleMealSelection } = mealsSlice.actions; // toggleMealSelectionアクションをエクスポート
// mealsSliceのリデューサーをデフォルトエクスポート
export default mealsSlice.reducer; // mealsSliceのリデューサーをデフォルトエクスポート
