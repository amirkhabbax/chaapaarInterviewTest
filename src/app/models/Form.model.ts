import { Field } from './Field.model';
import { DESCRIPTIONSHOW_TYPE, NESTEDFORMSHOW_TYPE } from './types/base.types';

export class Form {
  constructor(
    public name: string,
    public title: string,
    public submitLabel: string,
    public nestedFormShowType: NESTEDFORMSHOW_TYPE,
    public fieldDescriptionShowType: DESCRIPTIONSHOW_TYPE,
    public fields: Field[],
    public forms: Form[]
  ) {}
}
