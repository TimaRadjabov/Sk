import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appointmentAPI } from "../api/api";
import { setPending, setFulfilled, setRejected } from "../hooks/axiosStatus";

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async function ({data, token}, { rejectWithValue }) {
    try {
      const response = await appointmentAPI.createAppointment(data, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchUnpaidAppointment = createAsyncThunk(
  "appointments/fetchUnpaidAppointment",
  async function ({token, userId}, { rejectWithValue }) {
    try {
      const response = await appointmentAPI.fetchUnpaidAppointment(token, userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const AppointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    id: null,
    startDate: null,
    endDate: null,
    employee_id: null,
    user_id: null,
    medical_service_id: null,
    unpaidAppointments: [],
  },
  reducers: {
    clearAppointment(state) {
      state.appointments = {
        id: 0,
        startDate: null,
        endDate: null,
        employee_id: null,
        user_id: null,
        medical_service_id: null,
      };
    },
  },
  extraReducers: {
    [createAppointment.pending]: setPending,
    [createAppointment.fulfilled]: setFulfilled,
    [createAppointment.rejected]: setRejected,

    [fetchUnpaidAppointment.pending]: setPending,
    [fetchUnpaidAppointment.fulfilled]: (state, action) => {
      state.unpaidAppointments = action.payload;
    },
    [fetchUnpaidAppointment.rejected]: setRejected,
  },
});

export const { clearAppointment } = AppointmentSlice.actions;

export default AppointmentSlice.reducer;
