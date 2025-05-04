import { Form } from "./Form.model";

export class ParentEntity {
  constructor(
    public id: string,
    public form: Form,
    public steps: number,
    public current: number,
    public fieldErrors: object,
    public errors: any[]
  ) {}
}
