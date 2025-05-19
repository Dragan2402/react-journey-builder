import { useContext } from 'react';

import GraphFlow from './components/react-flow/ReactFlow';
import { BLUEPRINT_ACTION } from './types/state/blueprintState';
import { BlueprintContext } from './context/BlueprintContext';

function App() {
	const { state, dispatch } = useContext(BlueprintContext)!;

	return (
		<div className="flex bg-white item-center h-full w-full">
			<button
				onClick={() =>
					dispatch({
						payload: { nodes: [] },
						type: BLUEPRINT_ACTION.INIT,
					})
				}
				className="absolute z-[99] bg-red-500 px-10"
			>
				Counter: {state.counter}
			</button>
			<GraphFlow />
		</div>
	);
}

export default App;
