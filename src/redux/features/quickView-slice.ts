import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definimos qué datos de cotillón guardará el modal al abrirse
interface QuickViewState {
  productId: string | null;
  isOpen: boolean;
  productData: any; // Aquí vendrán las dimensiones, SKU y fotos limpias
}

const initialState: QuickViewState = {
  productId: null,
  isOpen: false,
  productData: null,
};

export const quickViewSlice = createSlice({
  name: 'quickView',
  initialState,
  reducers: {
    openQuickView: (state, action: PayloadAction<any>) => {
      state.isOpen = true;
      state.productData = action.payload; // Cargamos la info del producto
    },
    closeQuickView: (state) => {
      state.isOpen = false;
      state.productData = null;
    },
  },
});

export const { openQuickView, closeQuickView } = quickViewSlice.actions;
export default quickViewSlice.reducer;
