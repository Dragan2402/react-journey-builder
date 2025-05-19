import { BlueprintNode } from '@/types/internal/blueprintNode';

import propertyImage from '../../assets/property-icon.png';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';

interface PrefillFormProps {
	selectedNode: BlueprintNode;
	handleSheetOpenChange: (open: boolean) => void;
}

const PrefillForm = ({ selectedNode, handleSheetOpenChange }: PrefillFormProps) => {
	return (
		<Sheet open={true} onOpenChange={handleSheetOpenChange}>
			<SheetContent className="min-w-[40vw]">
				<SheetHeader>
					<SheetTitle>Prefill {selectedNode?.data.label}</SheetTitle>
					<SheetDescription>Prefill fields for this form.</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col gap-4 w-full mt-10">
					{selectedNode.data.properties.map((property) => (
						<button
							key={property.id}
							className="flex items-center w-full h-[50px] !bg-gray-200 !text-sm !text-gray-600 gap-x-4 !border-2 !border-dashed !border-gray-300"
						>
							<img src={propertyImage} className="w-4 h-4" alt="property-icon" />
							<div>{property.id}</div>
						</button>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default PrefillForm;
