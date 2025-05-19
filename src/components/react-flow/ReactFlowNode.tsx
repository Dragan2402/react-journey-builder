import { Handle } from 'reactflow';
import { Position } from 'reactflow';

import formImage from '../../assets/form-image.png';

interface FormNodeProps {
	data: {
		label: string;
	};
}

const ReactFlowNode = ({ data }: FormNodeProps) => {
	return (
		<div className="flex items-center gap-x-2 border border-gray-300 px-2 py-1 rounded-lg w-[150px]">
			<img src={formImage} alt="form" className="w-8 h-8 rounded-lg" />

			<div className="flex flex-col justify-center">
				<p className="text-xs text-gray-500">Form</p>
				<p className="text-sm text-black">{data.label}</p>
			</div>

			<Handle type="target" position={Position.Left} className="w-2 h-2" />
			<Handle type="source" position={Position.Right} className="w-2 h-2" />
		</div>
	);
};

export default ReactFlowNode;
