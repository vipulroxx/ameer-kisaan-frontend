import React from "react";
import { ErrorProvider } from "../shared/error-context";

function AppProviders({children}) {
	return (
		<ErrorProvider>
			{children}
		</ErrorProvider>
	)
}

export default AppProviders;