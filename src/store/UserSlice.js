import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PdfAPI, userAPI } from "../api/api";
import { setFulfilled, setPending, setRejected } from "../hooks/axiosStatus";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async function (params, { rejectWithValue }) {
    const { userId, token } = params;
    try {
      const response = await userAPI.fetchUser(userId, token);
      if (response.status !== 200) {
        throw new Error();
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const putUser = createAsyncThunk(
  "user/putUser",
  async function (props, { rejectWithValue }) {
    const {
      userId,
      nam,
      fam,
      otch,
      snils,
      polis_n,
      male,
      ser_doc,
      nom_doc,
      type_doc,
      born,
      token,
    } = props;
    try {
      const response = await userAPI.putUser(
        userId,
        nam,
        fam,
        otch,
        snils,
        polis_n,
        male,
        ser_doc,
        nom_doc,
        type_doc,
        born,
        token
      );
      console.log(response.data);
      if (response.status !== 200) {
        throw new Error();
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserList = createAsyncThunk(
  "user/fetchUserList",
  async function (token, { rejectWithValue }) {
    try {
      const response = await userAPI.fetchUserList(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async function ([id, token, data], { rejectWithValue }) {
    try {
      const response = await userAPI.updateUser(id, token, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPdfUser = createAsyncThunk(
  "employee/fetchPdfEmployee",
  async function ([data, token], { rejectWithValue }) {
    try {
      const response = await PdfAPI.fetchPdf(data, token);
      if (response.status === 200) {
        const downloadUrl = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `password.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    // id: null,
    nam: null,
    fam: null,
    otch: null,
    snils: null,
    polis_n: null,
    male: null,
    ser_doc: null,
    nom_doc: null,
    type_doc: null,
    email: null,
    role: null,
    demo: false, //не хранить в localStorage
    externalId: 0,
    born: null,
    error: null,
    status: null,
    putStatus: null, //не хранить в localStorage
  },
  reducers: {
    clearUser: (state) => {
      state.nam = null;
      state.fam = null;
      state.otch = null;
      state.snils = null;
      state.polis_n = null;
      state.male = null;
      state.ser_doc = null;
      state.nom_doc = null;
      state.type_doc = null;
      state.email = null;
      state.role = null;
      state.demo = null;
      state.externalId = 0;
      state.born = null;
      state.status = null;
      state.putStatus = null;
    },

    clearUserStatus: (state) => {
      state.status = null;
    },
    clearPutUserStatus: (state) => {
      state.putStatus = null;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.status = "pending";
      state.isFetchSuccess = false;
      state.error = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.nam = action.payload.nam;
      state.fam = action.payload.fam;
      state.otch = action.payload.otch;
      state.snils = action.payload.snils;
      state.polis_n = action.payload.polis_n;
      state.male = action.payload.male;
      state.ser_doc = action.payload.ser_doc;
      state.nom_doc = action.payload.nom_doc;
      state.type_doc = action.payload.type_doc;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.demo = action.payload.demo; //не хранить в localStorage
      state.externalId = action.payload.externalId;
      state.born = action.payload.born;
      state.error = action.payload.error;
      state.status = "resolved";
      state.isFetchSuccess = true;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [putUser.pending]: (state) => {
      state.putStatus = "pending";
      state.error = null;
    },
    [putUser.fulfilled]: (state) => {
      state.putStatus = "resolved";
      state.error = null;
    },
    [putUser.rejected]: (state, action) => {
      state.putStatus = "rejected";
      state.error = action.payload;
    },

    [fetchUserList.pending]: setPending,
    [fetchUserList.fulfilled]: (state, action) => {
      state.userList = action.payload;
      state.status = "resolved";
    },
    [fetchUserList.rejected]: setRejected,
    [updateUser.pending]: setPending,
    [updateUser.fulfilled]: (state, action) => {
      state.userList = state.userList.map((user) =>
        user.id === action.payload.id ? (user = action.payload) : user
      );
    },
    [updateUser.rejected]: setRejected,
    [fetchPdfUser.pending]: setPending,
    [fetchPdfUser.fulfilled]: setFulfilled,
    [fetchPdfUser.rejected]: setRejected,
  },
});

export default UserSlice.reducer;
export const { clearUser, clearIsFetchSuccess, clearUserStatus } =
  UserSlice.actions;
