import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk("job/createJob", createJobThunk);

export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);

export const editJob = createAsyncThunk("jobs/editJob", editJobThunk);

const jobSlice = createSlice({
  name: "job",
  initialState,
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Created");
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteJob.fulfilled]: (state, { payload }) => {
      toast.success(payload);
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success("Job Modiffied");
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    handleClear: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
});
export const { handleChange, handleClear, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
