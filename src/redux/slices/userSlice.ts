import { IformData } from "./../../interFaces/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useGetData } from "../../hooks/useGetData";
import { usePostDataToke, usePostDataWithImage } from "../../hooks/usePostData";
import { usePutData, usePutDatawhitoutimg } from "../../hooks/usePutData";
import toast from "react-hot-toast";
import { uesDeleteData } from "../../hooks/useDeleteData";

interface Iprops {
  isLoading: boolean;
  isLoadingDelete: boolean;
  AllPosts: {
    items: [];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  error: any;
  AllCategories: {
    categoryId: number;
    name: string;
  }[];

  AddPost: IformData;
  EditPost: IformData;
  DeletePost: {};

  isLoadingComment: boolean;
  AddComment: IformData;

  DeleteComment: {};
  EditComment: IformData;
}

const initialState: Iprops = {
  isLoading: true,
  isLoadingDelete: true,
  AllPosts: {
    items: [],
    pageNumber: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
  },
  error: null,
  AllCategories: [],
  AddPost: {
    config: {},
    data: {},
    status: 0,
  },

  EditPost: { config: {}, data: {}, status: 0 },
  DeletePost: {},

  //   add comment
  isLoadingComment: true,
  AddComment: { config: {}, data: {}, status: 0 },

  //   DeleteComment
  DeleteComment: {},
  //   edit comment
  EditComment: { data: {}, config: {}, status: 0 },
};

export const GetAllPosts = createAsyncThunk(
  "get/Posts",
  async (params: { num: number | string; word: string | null }, thunkAPI) => {
    try {
      const res = await useGetData(
        `/Post/Serach?pageNumber=${params.num}&words=${params.word}`
      );
      return res.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error);
    }
  }
);

export const GetAllCategories = createAsyncThunk(
  "get/AllCategories",
  async (_, thunkAPI) => {
    try {
      const res = await useGetData("/Category/List");

      return res.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error);
    }
  }
);

export const AddPostAction = createAsyncThunk(
  "Post/Posts",
  async (formdata: {}, thunkAPI) => {
    try {
      const res = await usePostDataWithImage("/Post", formdata);
      if (res.status === 200) {
        toast.success("Your post has been added");
      }
      return res.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error);
    }
  }
);

export const EditPostAction = createAsyncThunk(
  "Edit/Post",
  async (formdata: {}, thunkAPI) => {
    try {
      const res = await usePutData("/Post/Update", formdata);
      if (res.status === 200) {
        toast.success("done");
        thunkAPI.dispatch(GetAllPosts({ num: 1, word: "" }));
      }
      return res.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error);
    }
  }
);

export const DeletePostAction = createAsyncThunk(
  "Edit/Posts",
  async (id: number, thunkAPI) => {
    try {
      const res = await uesDeleteData(`/Post/${id}`);
      if (res.status === 200) {
        toast.success(res.data);

        thunkAPI.dispatch(GetAllPosts({ num: 1, word: "" }));
      }
      return res.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;

      return rejectWithValue(error);
    }
  }
);

export const DeleteCommentAction = createAsyncThunk(
  "Delete/comment",
  async (id: number, thunkAPI) => {
    try {
      const res = await uesDeleteData(`/Comments/${id}`);

      if (res.status === 200) {
        toast.success("Your comment has been deleted");

        // thunkAPI.dispatch(GetAllPosts({ num: 1, word: "" }));
      }

      return res.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error);
    }
  }
);

// add comment
interface Icomment {
  content: string;
  postID: number;
}

export const AddCommentAction = createAsyncThunk(
  "post/comment",
  async (data: Icomment, thunkAPI) => {
    try {
      const res = await usePostDataToke("/Comments/Create", data);
      if (res.status === 200) {
        toast.success("Your comment has been added");

        // thunkAPI.dispatch(GetAllPosts({ num: 1, word: "" }));
      }
      return res;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;

      return rejectWithValue(error);
    }
  }
);

interface IeditComment {
  id: number;
  content: string;
}
export const EditCommentAction = createAsyncThunk(
  "Edit/comment",
  async (data: IeditComment, thunkAPI) => {
    try {
      const res = await usePutDatawhitoutimg("/Comments/Update", data);

      if (res.status === 200) {
        toast.success("Your comment has been updated");

        // thunkAPI.dispatch(GetAllPosts({ num: 1, word: "" }));
      }

      return res;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;

      return rejectWithValue(error);
    }
  }
);

const UserPermisions = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetAddPostStatus: (state) => {
      state.AddPost.status = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AllPosts = action.payload;
        state.error = null;
      })
      .addCase(GetAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.AllPosts = {
          items: [],
          pageNumber: 0,
          pageSize: 0,
          totalCount: 0,
          totalPages: 0,
        };
        state.error = action.payload;
      })

      //   get All Categories
      .addCase(GetAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.AllCategories = action.payload;
      })
      .addCase(GetAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.AllCategories = [];
      })

      //   addPost

      .addCase(AddPostAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddPostAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.AddPost = action.payload;
      })
      .addCase(AddPostAction.rejected, (state, action) => {
        state.isLoading = false;
        state.AddPost = {
          data: {},
          config: {},
          status: 0,
        };
        state.error = action.payload;
      })

      //   editPost

      .addCase(EditPostAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(EditPostAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.EditPost = action.payload;
        state.error = null;
      })
      .addCase(EditPostAction.rejected, (state, action) => {
        state.isLoading = false;
        state.EditPost = {
          data: {},
          config: {},
          status: 0,
        };
        state.error = action.payload;
      })

      //   delete Post
      .addCase(DeletePostAction.pending, (state) => {
        state.isLoadingDelete = true;
      })
      .addCase(DeletePostAction.fulfilled, (state, action) => {
        state.isLoadingDelete = false;
        state.DeletePost = action.payload;
        state.error = null;
      })
      .addCase(DeletePostAction.rejected, (state, action) => {
        state.isLoadingDelete = false;
        state.DeletePost = {};
        state.error = action.payload;
      })
      //add comment
      .addCase(AddCommentAction.pending, (state) => {
        state.isLoadingComment = true;
      })
      .addCase(AddCommentAction.fulfilled, (state, action) => {
        state.isLoadingComment = false;
        state.AddComment = action.payload;
        state.error = null;
      })
      .addCase(AddCommentAction.rejected, (state, action) => {
        state.isLoadingComment = false;
        state.AddComment = {
          data: {},
          config: {},
          status: 0,
        };
        state.error = action.payload;
      })

      //   delete comment
      .addCase(DeleteCommentAction.pending, (state) => {
        state.isLoadingComment = true;
      })
      .addCase(DeleteCommentAction.fulfilled, (state, action) => {
        state.isLoadingComment = false;
        state.DeleteComment = action.payload;
        state.error = null;
      })
      .addCase(DeleteCommentAction.rejected, (state, action) => {
        state.isLoadingComment = false;
        state.DeleteComment = {};
        state.error = action.payload;
      })

      //   EditCommentAction

      .addCase(EditCommentAction.pending, (state) => {
        state.isLoadingComment = true;
      })
      .addCase(EditCommentAction.fulfilled, (state, action) => {
        state.isLoadingComment = false;
        state.EditComment = action.payload;
        state.error = null;
      })
      .addCase(EditCommentAction.rejected, (state, action) => {
        state.isLoadingComment = false;
        state.EditComment = { data: {}, config: {}, status: 0 };
        state.error = action.payload;
      });
  },
});

export const { resetAddPostStatus } = UserPermisions.actions;

export default UserPermisions.reducer;
