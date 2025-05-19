import { Trash2 } from 'lucide-react';
import { useContext, useState } from 'react';

import { BlueprintNode, NodeProperty } from '@/types/internal/blueprintNode';
import { BlueprintContext } from '@/context/BlueprintContext';
import { BLUEPRINT_ACTION } from '@/types/state/blueprintState';

import propertyImage from '../../assets/property-icon.png';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import PropertySelection from './PropertySelection';

interface PrefillFormProps {
	selectedNode: BlueprintNode;
	handleSheetOpenChange: (open: boolean) => void;
}

const PrefillForm = ({ selectedNode, handleSheetOpenChange }: PrefillFormProps) => {
	const { state, dispatch } = useContext(BlueprintContext)!;
	const [selectedProperty, setSelectedProperty] = useState<NodeProperty | null>(null);

	const handlePropertySelection = (inheritingProperty?: NodeProperty) => {
		if (!selectedProperty) {
			return;
		}

		if (inheritingProperty) {
			dispatch({
				payload: {
					property: selectedProperty,
					inheritingProperty: inheritingProperty,
				},
				type: BLUEPRINT_ACTION.UPDATE_PROPERTY,
			});
		}

		setSelectedProperty(null);
	};

	const handleDeleteProperty = (property: NodeProperty) => {
		dispatch({
			payload: { property: property },
			type: BLUEPRINT_ACTION.DELETE_PROPERTY_INHERITANCE,
		});
	};

	return (
		<Sheet open={true} onOpenChange={handleSheetOpenChange}>
			<SheetContent className="min-w-[40vw]">
				<SheetHeader>
					<SheetTitle>Prefill {selectedNode?.data.label}</SheetTitle>
					<SheetDescription>Prefill fields for this form.</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col w-full mt-10 h-full">
					{!selectedProperty && (
						<div className="flex flex-col gap-4 w-full">
							{selectedNode.data.properties.map((property) => (
								<div>
									{property.inheritingProperty ? (
										<div className="flex items-center w-full h-[50px] !bg-gray-200 !text-sm text-gray-600 gap-x-4 border-2 border-dashed border-gray-300 rounded-xl px-4">
											<div>
												{property.id}: {property.inheritingProperty.nodeName}.{property.inheritingProperty.id}
											</div>
											<button className="ml-auto" onClick={() => handleDeleteProperty(property)}>
												<Trash2 className="w-4 h-4" />
											</button>
										</div>
									) : (
										<button
											key={property.id}
											className="flex items-center w-full h-[50px] !bg-gray-200 !text-sm text-gray-600 gap-x-4 border-2 border-dashed border-gray-300 rounded-xl px-4"
											onClick={() => setSelectedProperty(property)}
										>
											<img src={propertyImage} className="w-6 h-6" alt="property-icon" />
											<div>{property.id}</div>
										</button>
									)}
								</div>
							))}
						</div>
					)}

					{selectedProperty && <PropertySelection node={selectedNode} selectProperty={handlePropertySelection} />}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default PrefillForm;
