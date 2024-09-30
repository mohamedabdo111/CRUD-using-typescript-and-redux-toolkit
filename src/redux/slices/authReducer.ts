import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usePostData } from "../../hooks/usePostData";
import { IFormInput } from "../../components/auth/register";
import { IFormInputLogin } from "../../components/auth/login";

interface Iprops {
  login: [];
  registers: {
    data: {};
    status: number;
  };
  isLoading: boolean;
  error: any;
}

const initialState: Iprops = {
  login: [],
  registers: {
    data: {},
    status: 0,
  },
  isLoading: true,
  error: null,
};

export const PostAuth = createAsyncThunk(
  "post/Auth",
  async (data: IFormInputLogin, thunkAPI) => {
    try {
      const res = await usePostData("/Authentication/Login", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const PostRegister = createAsyncThunk(
  "post/register",
  async (dataRegister: IFormInput, thunkAPI) => {
    try {
      const res = await usePostData("/Authentication/Register", dataRegister);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(PostAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.login = action.payload;
        state.error = null;
      })
      .addCase(PostAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.login = [];
        state.error = action.payload;
      })

      //   regiseter
      .addCase(PostRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(PostRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.registers = action.payload;
      })
      .addCase(PostRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default AuthSlice.reducer;
