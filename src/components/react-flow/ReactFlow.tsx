import { useCallback, useContext } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';

import 'reactflow/dist/style.css';

interface GraphFlowProps {
	nodes: {
		id: string;
		position: {
			x: number;
			y: number;
		};
		data: { label: string };
	}[];
	edges: {
		id: string;
		source: string;
		target: string;
	}[];
}

const initialNodes = [
	{ id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
	{ id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function GraphFlow({ edges = initialEdges, nodes = initialNodes }: GraphFlowProps) {
	const [flowNodes, setFlowNodes, onFlowNodesChange] = useNodesState(nodes);
	const [flowEdges, setFlowEdges, onFlowEdgesChange] = useEdgesState(edges);

	const onConnect = useCallback((params: any) => setFlowEdges((eds) => addEdge(params, eds)), [setFlowEdges]);

	return (
		<ReactFlow
			nodes={flowNodes}
			edges={flowEdges}
			onNodesChange={onFlowNodesChange}
			onEdgesChange={onFlowEdgesChange}
			onConnect={onConnect}
		>
			<MiniMap />
			<Controls />
			<Background />
		</ReactFlow>
	);
}

export default GraphFlow;
