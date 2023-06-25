    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import Cookies from 'js-cookie';
    import store from './store';

    export interface RootState {
    auth: {
        email: string | null;
        password: string | null;
        roles: string | null;
        userId: string | null;
        lastLogin: string | null;
        userNick: string | null;
        token: string | null;
        isLoading: boolean;
    };
    language: string;
    subscription: string;
    }

    export type AppDispatch = typeof store.dispatch;

    const initialState = {
    email: null,
    password: null,
    roles: null,
    userId: null,
    lastLogin: null,
    userNick: null,
    token: Cookies.get('token') || null,
    isLoading: false
    };

    export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState() as RootState;
        const { token } = state.auth;
        const response = await fetch(`${process.env.VITE_APP_API_BASE_URL}users/users/1`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
        if (!response.ok) {
        throw new Error('User not found');
        }
        return await response.json();
    } catch (error) {
        return rejectWithValue(error);
    }
    });

    const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
        Object.assign(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.email = action.payload.email;
            state.lastLogin = action.payload.lastLogin;
            state.userNick = action.payload.displayName;
            state.roles = action.payload.roles;
            state.userId = action.payload.id;
        })
        .addCase(fetchUser.rejected, (state) => {
            state.isLoading = false;
        });
    }
    });

    export const { setAuth } = authSlice.actions;
    export default authSlice.reducer;
