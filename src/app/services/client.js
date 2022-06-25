import axios from "axios";
import { store } from "../store";

export const baseURL = "https://sanbers-news-api.herokuapp.com/api";

export const client = axios.create({
	baseURL: baseURL,
});

// Intercept akan dijalankan setiap kali ada request
// Otomatis mengambil data token dari storage dan menempelkannya
// ke header, sehingga saat request kita tidak perlu menempelkan
// token berulang kali
client.interceptors.request.use(async (config) => {
	const token = store.getState().auth.token;

	if (token) {
		// eslint-disable-next-line no-param-reassign
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});
