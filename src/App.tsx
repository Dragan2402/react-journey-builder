import { useContext, useState } from 'react';

import PrefillForm from './components/prefill-form/PrefillForm';
import GraphFlow from './components/react-flow/ReactFlow';
import { Sheet, SheetTrigger, SheetTitle, SheetContent, SheetDescription, SheetHeader } from './components/ui/sheet';
import { BlueprintNode } from './types/internal/blueprintNode';
import { QueryScope } from './types/internal/queryScope';
import { BlueprintContext } from './context/BlueprintContext';
import { parseQueryScopes } from './lib/utils';

function App() {
	const paramsString = window.location.search;
	const searchParams = new URLSearchParams(paramsString);

	const { state } = useContext(BlueprintContext)!;

	const queries = parseQueryScopes(searchParams.get('query'));

	const [selectedNode, setSelectedNode] = useState<BlueprintNode | null>(null);

	const handleNodeSelection = (nodeId?: string) => {
		const node = state.nodes.find((node) => node.id === nodeId);
		if (node) {
			setSelectedNode(node);
		}
	};

	const handleSheetOpenChange = (open: boolean) => {
		if (!open) {
			setSelectedNode(null);
		}
	};

	return (
		<div className="flex bg-white item-center h-full w-full">
			{selectedNode && (
				<PrefillForm queryScopes={queries} selectedNode={selectedNode} handleSheetOpenChange={handleSheetOpenChange} />
			)}
			<GraphFlow selectNode={handleNodeSelection} />
		</div>
	);
}

export default App;
