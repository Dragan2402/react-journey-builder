import { useContext, useState } from 'react';

import { BlueprintNode, NodeProperty } from '@/types/internal/blueprintNode';
import { BlueprintContext } from '@/context/BlueprintContext';
import { QueryScope } from '@/types/internal/queryScope';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface PropertySelectionProps {
	node: BlueprintNode;
	queryScopes: QueryScope[];
	selectProperty: (property?: NodeProperty) => void;
}

const PropertySelection = ({ node, queryScopes, selectProperty }: PropertySelectionProps) => {
	const { state } = useContext(BlueprintContext)!;
	const [selectedMappingProperty, setSelectedMappingProperty] = useState<NodeProperty | null>(null);

	const handleMappingPropertySelection = (property: NodeProperty) => {
		if (selectedMappingProperty?.id === property.id) {
			setSelectedMappingProperty(null);
		} else {
			setSelectedMappingProperty(property);
		}
	};

	return (
		<div className="flex flex-col gap-4 w-full ">
			<Accordion type="single" collapsible>
				{queryScopes.includes(QueryScope.GLOBAL) &&
					state.globalProperties.map((globalProvider) => {
						return (
							<AccordionItem value={globalProvider.id}>
								<AccordionTrigger>{globalProvider.name}</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col gap-3 pl-10">
										{globalProvider.properties.map((property) => (
											<button
												key={property.id}
												className={`text-left px-4 py-1 w-[50%] rounded-sm  ${
													selectedMappingProperty?.id === property.id ? 'bg-gray-500 text-white' : ''
												}`}
												onClick={() => handleMappingPropertySelection(property)}
											>
												{property.id}
											</button>
										))}
									</div>
								</AccordionContent>
							</AccordionItem>
						);
					})}
				{node.data.predecessors
					.filter(
						(e) =>
							(e.direct && queryScopes.includes(QueryScope.DIRECT)) ||
							(!e.direct && queryScopes.includes(QueryScope.TRANSITIVE))
					)
					.map((predecessor) => {
						const predecessorNode = state.nodes.find((n) => n.id === predecessor.id);
						return (
							<AccordionItem value={predecessorNode?.id!}>
								<AccordionTrigger>{predecessorNode?.data.label}</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col gap-3 pl-10">
										{predecessorNode?.data.properties.map((property) => (
											<button
												key={property.id}
												className={`text-left px-4 py-1 w-[50%] rounded-sm  ${
													selectedMappingProperty?.id === property.id ? 'bg-gray-500 text-white' : ''
												}`}
												onClick={() => handleMappingPropertySelection(property)}
											>
												{property.id}
											</button>
										))}
									</div>
								</AccordionContent>
							</AccordionItem>
						);
					})}
			</Accordion>

			<div className="flex items-center justify-end w-full gap-x-4 border-t pt-4">
				<button
					className="border-blue-500 text-blue-500 border px-4 py-2 rounded-md"
					onClick={() => selectProperty(undefined)}
				>
					Cancel
				</button>
				<button
					className="bg-white border border-black text-black disabled:bg-gray-400 disabled:!cursor-not-allowed disabled:opacity-50 px-4 py-2 rounded-md"
					disabled={!selectedMappingProperty}
					onClick={() => selectProperty(selectedMappingProperty ?? undefined)}
				>
					Select
				</button>
			</div>
		</div>
	);
};

export default PropertySelection;
