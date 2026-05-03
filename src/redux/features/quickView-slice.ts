import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

interface QuickViewState {
  value: Product | null;
  isOpen: boolean;
}

const initialState: QuickViewState = {
  value: null,
  isOpen: false,
};

export const quickViewSlice = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    // Esta es la función para abrir y cargar datos
    openQuickView: (state, action: PayloadAction<Product>) => {
      state.value = action.payload;
      state.isOpen = true;
    },
    // ESTA ES LA QUE FALTA: Para limpiar y cerrar
    resetQuickView: (state) => {
      state.value = null;
      state.isOpen = false;
    },
  },
});

// CRUCIAL: Exportar ambas aquí
export const { openQuickView, resetQuickView } = quickViewSlice.actions;
export default quickViewSlice.reducer;
