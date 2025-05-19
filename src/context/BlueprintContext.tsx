import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

import { BlueprintAction, BlueprintState } from '../types/state/blueprintState';
import { getBlueprint } from '../api/api';
import { blueprintReducer } from '../state/blueprintReducer';

export const BlueprintContext = createContext<
	{ state: BlueprintState; dispatch: React.Dispatch<BlueprintAction> } | undefined
>(undefined);

const initialState: BlueprintState = {
	counter: 1,
	nodes: [],
};

export const BlueprintProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(blueprintReducer, initialState);

	useEffect(() => {
		const loadBlueprint = async () => {
			try {
				const blueprint = await getBlueprint();
				debugger;
			} catch (error) {
				console.error('Failed to setup blueprint context', error);
			}
		};

		loadBlueprint();
	}, []);

	return <BlueprintContext.Provider value={{ state, dispatch }}>{children}</BlueprintContext.Provider>;
};

// export const useBlueprint = () => {
// 	const context = useContext(BlueprintContext);

// 	return context!;
// };
