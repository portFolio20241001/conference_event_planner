// Redux ToolkitからconfigureStoreをインポート
import { configureStore } from '@reduxjs/toolkit';
// venueSliceのリデューサーをインポート
import venueReducer from './venueSlice';
// avSliceのリデューサーをインポート
import avReducer from './avSlice';
// mealsSliceのリデューサーをインポート
import mealsReducer from './mealsSlice';

// Reduxストアを作成してエクスポート
export default configureStore({
  // ストアのリデューサー設定
  reducer: {
    // venueの状態を管理するvenueReducerを設定
    venue: venueReducer,
    // avの状態を管理するavReducerを設定
    av: avReducer,
    // mealsの状態を管理するmealsReducerを設定
    meals: mealsReducer,
  },
});
