import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/students";

export const fetchStudents = createAsyncThunk(
    "students/fetchStudents",
    async () => {
        const response = await axios.get(API);
        return response.data;
    }
);

export const addStudent = createAsyncThunk(
    "students/addStudent",
    async (student) => {
        const response = await axios.post(API, student);
        return response.data;
    }
);

export const updateStudent = createAsyncThunk(
    "students/updateStudent",
    async (student) => {
        const response = await axios.put(
            `${API}/${student.id}`,
            student
        );
        return response.data;
    }
);

export const deleteStudent = createAsyncThunk(
    "students/deleteStudent",
    async (id) => {
        await axios.delete(`${API}/${id}`);
        return id;
    }
);

const studentSlice = createSlice({
    name: "students",

    initialState: {
        students: [],
        loading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.students.push(action.payload);
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                const index = state.students.findIndex(
                    (student) => student.id === action.payload.id
                );

                if (index !== -1) {
                    state.students[index] = action.payload;
                }
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.students = state.students.filter(
                    (student) => student.id !== action.payload
                );
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export default studentSlice.reducer;