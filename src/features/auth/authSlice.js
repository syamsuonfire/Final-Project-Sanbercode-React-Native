import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const initialState = {
	isSignedIn: false,
	token: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			const { token } = action.payload;

			state.isSignedIn = true;
			state.token = token;
			SecureStore.setItemAsync("token", token);
		},
		logout: (state) => {
			state.isSignedIn = false;
			state.token = "";

			SecureStore.deleteItemAsync("token");
		},
	},
});

export const { login, logout } = authSlice.actions;
