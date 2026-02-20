export interface FieldProperty {
  name: string;
  type: string;
  description?: string;
}

export interface Contract {
  id?: string;
  schemaMode: 'file' | 'json';
  schemaContent: string;
  baseMode: 'file' | 'json';
  baseContent: string;
  fieldProperties: FieldProperty[];
}
