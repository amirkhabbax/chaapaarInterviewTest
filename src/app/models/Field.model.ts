import { DESCRIPTIONSHOW_TYPE, FILED_TYPE } from './types/base.types';

export class Field {
  constructor(
    public _type                : string              ,
    public name                 : string              ,
    public title                : string              ,
    public errorMessage         : string              ,
    public required             : boolean             ,
    public minLength            : number              ,
    public maxLength            : number              ,
    public type                 : FILED_TYPE          ,
    public description         ?: string              ,
    public info                ?: string              ,
    public regex               ?: string              ,
    public descriptionShowType ?: DESCRIPTIONSHOW_TYPE,
    public showConfirmPassword ?: boolean
  ) {}
}
