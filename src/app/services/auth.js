import { client } from "./client";

export const loginUser = ({ email, password }) =>
	client.post("/auth", { email, password });

// Validasi token dengan cara request
// profile user dari token yang dimiliki
export const me = async ({ token }) =>
	client.get("/users/me", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

export const registerUser = ({ email, name, password }) =>
	client.post("/users", { email, name, password });
