import { BLUEPRINT_ACTION, BlueprintAction, BlueprintState } from '../types/state/blueprintState';

const handleInitAction = (state: BlueprintState, action: BlueprintAction): BlueprintState => {
	return { ...state, 
		nodes: action.payload.nodes,
		edges: action.payload.edges,
		counter: state.counter + 1 };
};

export const blueprintReducer = (state: BlueprintState, action: BlueprintAction): BlueprintState => {
	switch (action.type) {
		case BLUEPRINT_ACTION.INIT:
			return handleInitAction(state, action);
		default:
			throw new Error('Unsupported action');
	}
};
