import { BLUEPRINT_ACTION, BlueprintAction, BlueprintState } from '../types/state/blueprintState';

const handleInitAction = (state: BlueprintState, action: BlueprintAction): BlueprintState => {
	if (action.type !== BLUEPRINT_ACTION.INIT) {
		return state;
	}

	const payload = action.payload;

	return { ...state, nodes: payload.nodes, edges: payload.edges, globalProperties: payload.globalProperties };
};

const handleUpdatePropertyAction = (state: BlueprintState, action: BlueprintAction): BlueprintState => {
	if (action.type !== BLUEPRINT_ACTION.UPDATE_PROPERTY) {
		return state;
	}

	const payload = action.payload;
	const node = state.nodes.find((node) => node.id === payload.property.nodeId);

	if (node) {
		const property = node.data.properties.find((property) => property.id === payload.property.id);

		if (property) {
			property.inheritingProperty = payload.inheritingProperty;
		}
	}

	return { ...state, nodes: state.nodes };
};

const handleDeletePropertyAction = (state: BlueprintState, action: BlueprintAction): BlueprintState => {
	if (action.type !== BLUEPRINT_ACTION.DELETE_PROPERTY_INHERITANCE) {
		return state;
	}

	const payload = action.payload;

	const node = state.nodes.find((node) => node.id === payload.property.nodeId);

	if (node) {
		const property = node.data.properties.find((property) => property.id === payload.property.id);

		if (property) {
			property.inheritingProperty = undefined;
		}
	}

	return { ...state, nodes: state.nodes };
};

export const blueprintReducer = (state: BlueprintState, action: BlueprintAction): BlueprintState => {
	switch (action.type) {
		case BLUEPRINT_ACTION.INIT:
			return handleInitAction(state, action);
		case BLUEPRINT_ACTION.UPDATE_PROPERTY:
			return handleUpdatePropertyAction(state, action);
		case BLUEPRINT_ACTION.DELETE_PROPERTY_INHERITANCE:
			return handleDeletePropertyAction(state, action);
		default:
			throw new Error('Unsupported action');
	}
};
