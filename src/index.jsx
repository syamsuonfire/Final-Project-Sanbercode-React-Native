import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";

import { RootStack } from "./navigator/RootStack";

const Tugas15 = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<RootStack />
			</NavigationContainer>
		</Provider>
	);
};

export default Tugas15;
