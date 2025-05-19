export interface BlueprintGraphDto {
	$schema: string;
	blueprint_id: string;
	tenant_id: string;
	name: string;
	description: string;
	category: string;
	nodes: NodeDto[];
	edges: Edge[];
	forms: Form[];
}

export interface NodeDto {
	id: string;
	type: string;
	position: Position;
	data: ComponentData;
}

export interface Position {
	x: number;
	y: number;
}

export interface ComponentData {
	id: string;
	component_key: string;
	component_type: string;
	component_id: string;
	name: string;
	prerequisites: string[];
	permitted_roles: string[];
	input_mapping: Record<string, unknown>;
	sla_duration: Duration;
	approval_required: boolean;
	approval_roles: string[];
}

export interface Duration {
	number: number;
	unit: string;
}

export interface Edge {
	source: string;
	target: string;
}

export interface Form {
	id: string;
	name: string;
	description: string;
	is_reusable: boolean;
	field_schema: FieldSchema;
	ui_schema: UiSchema;
	dynamic_field_config: Record<string, DynamicFieldConfig>;
}

export interface FieldSchema {
	type: string;
	properties: Record<string, FormFieldProperty>;
	required: string[];
}

export interface FormFieldProperty {
	avantos_type: string;
	title?: string;
	type: string;
	format?: string;
	items?: {
		enum: string[];
		type: string;
	};
	enum?: string[] | null;
	uniqueItems?: boolean;
}

export interface UiSchema {
	type: string;
	elements: UiElement[];
}

export interface UiElement {
	type: string;
	scope: string;
	label: string;
	options?: Record<string, unknown>;
}

export interface DynamicFieldConfig {
	selector_field: string;
	payload_fields: Record<string, PayloadField>;
	endpoint_id: string;
}

export interface PayloadField {
	type: string;
	value: string;
}
