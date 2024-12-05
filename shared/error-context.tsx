import React from "react";

export type ErrorType = 
	| "general"
	| "saveFailed"
	| "publishFailed"
	| "loadFailed"
	| "unknownUser"
	| "suppress";

export type ErrorItem = {
	errorType: ErrorType;
	error: Error;
};

export type Action = 
	| { type: "clear errors" }
	| { type: "add error", payload: ErrorItem }
	| { type: "remove error", payload: ErrorItem };

export type Dispatch =
	(action: Action) => void;

export type State = {
	currentErrors: ErrorItem[];
};

type ErrorProviderProps = {
	children: React.ReactNode;
};

const ErrorStateContext = React.createContext<State | undefined>(undefined);

const ErrorDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function errorReducer(state: State, action: Action): State {
	switch (action.type) {
			case "clear errors": {
					return { ...state, currentErrors: [] };
			}
			case "add error": {
					if (action.payload.errorType !== "suppress") {
							const newErrors = [...state.currentErrors];
							if (
									newErrors.some(
											(errorItem) => errorItem.errorType === action.payload.errorType
									)
							) {
									return state;
							} else {
									newErrors.push(action.payload);
							}

							return {
									...state,
									currentErrors: newErrors,
							};
					}
					return state;
			}
			case "remove error": {
					const newErrors = state.currentErrors.filter(
							(item) => item !== action.payload
					);

					return {
							...state,
							currentErrors: newErrors,
					};
			}
			default: {
					console.error("Invalid reducer action type!");
					return state; // Always return the current state here
			}
	}
};

export function ErrorProvider({ children }: ErrorProviderProps) {
	const initialArg: State = { currentErrors: [] as ErrorItem[] };
	const [state, dispatch] = React.useReducer(errorReducer, initialArg);
	return (
		<ErrorStateContext.Provider value={state}>
			<ErrorDispatchContext.Provider value={dispatch}>
				{children}
			</ErrorDispatchContext.Provider>
		</ErrorStateContext.Provider>
	)
};

export function useErrorState() {
	const context = React.useContext(ErrorStateContext);
	if (context === undefined) {
		throw new Error("useErrorState must be used within a ErrorProvider");
	}
	return context;
};

export function useErrorDispatch() {
	const context = React.useContext(ErrorDispatchContext);
	if (context === undefined) {
		throw new Error("useErrorDispatch must be used within a ErrorProvider");
	}
	return context;
};

export function addErrorItem(errorDispatch: Dispatch, newErrorItem: ErrorItem) {
	errorDispatch( { type: "add error", payload: newErrorItem} );
};

export function removeErrorItem(errorDispatch: Dispatch, errorItemToRemove: ErrorItem) {
	errorDispatch( { type: "remove error", payload: errorItemToRemove} );
};

export function clearErrors(errorDispatch: Dispatch) {
	errorDispatch( { type: "clear errors"});
};