import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usePostDataToke } from "../../hooks/usePostData";
import toast from "react-hot-toast";

interface Iprops {
  AddCategor: {};
  IsLoadingCategory: boolean;
  error: any;
}

const initialState: Iprops = {
  AddCategor: {},
  IsLoadingCategory: true,
  error: null,
};

interface IAddCategory {
  name: string;
}
export const AddCategorAction = createAsyncThunk(
  "adminCategory",
  async (data: IAddCategory, thunkAPI) => {
    try {
      const res = await usePostDataToke("/Category/Create", data);

      if (res.status === 201) {
        toast.success("Done");
      }

      return res.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;

      return rejectWithValue(error);
    }
  }
);

const AdminSlice = createSlice({
  name: "AdminSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(AddCategorAction.pending, (state) => {
        state.IsLoadingCategory = true;
      })
      .addCase(AddCategorAction.fulfilled, (state, action) => {
        state.IsLoadingCategory = false;
        state.error = null;
        state.AddCategor = action.payload;
      })
      .addCase(AddCategorAction.rejected, (state, action) => {
        state.IsLoadingCategory = false;
        state.AddCategor = {};
        state.error = action.payload;
      });
  },
});

export default AdminSlice.reducer;
