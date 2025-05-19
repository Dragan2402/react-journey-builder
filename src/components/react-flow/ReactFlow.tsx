import { useContext, useMemo } from 'react';
import ReactFlow, { Background, Node } from 'reactflow';

import { BlueprintContext } from '../../context/BlueprintContext';
import ReactFlowNode from './ReactFlowNode';

import 'reactflow/dist/style.css';

interface GraphFlowProps {
	selectNode: (nodeId: string) => void;
}

function GraphFlow({ selectNode }: GraphFlowProps) {
	const nodeTypes = useMemo(() => ({ form: ReactFlowNode }), []);
	const { state } = useContext(BlueprintContext)!;

	const onNodeClick = (_: React.MouseEvent, node: Node) => {
		selectNode(node.id);
	};

	return (
		<ReactFlow nodes={state.nodes} edges={state.edges} nodeTypes={nodeTypes} onNodeClick={onNodeClick} fitView>
			<Background />
		</ReactFlow>
	);
}

export default GraphFlow;
