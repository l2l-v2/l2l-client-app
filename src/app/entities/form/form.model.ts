export interface FormFieldModel {
    id: string;
    name: string;
    type: string;
    value: string;
    required?: string;
    readOnly?: string;
}

export interface FormDefinitionModel {
  fields: FormFieldModel[];
}
