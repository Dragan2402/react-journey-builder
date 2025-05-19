import { useContext, useState } from 'react';

import PrefillForm from './components/prefill-form/PrefillForm';
import GraphFlow from './components/react-flow/ReactFlow';
import { Sheet, SheetTrigger, SheetTitle, SheetContent, SheetDescription, SheetHeader } from './components/ui/sheet';
import { BlueprintNode } from './types/internal/blueprintNode';
import { BlueprintContext } from './context/BlueprintContext';

function App() {	
	const { state } = useContext(BlueprintContext)!;

	const [selectedNode, setSelectedNode] = useState<BlueprintNode | null>(null);
	
	const handleNodeSelection = (nodeId?: string) => {
		const node = state.nodes.find(node => node.id === nodeId);
		if (node) {
			setSelectedNode(node);
		}
	}

	const handleSheetOpenChange = (open: boolean) => {
		if (!open) {
			setSelectedNode(null);
		}
	}

	return (
		<div className="flex bg-white item-center h-full w-full">
			{selectedNode && (
				<PrefillForm
					selectedNode={selectedNode}
					handleSheetOpenChange={handleSheetOpenChange}
				/>
			)}
			<GraphFlow selectNode={handleNodeSelection}/>
		</div>
	);
}

export default App;
