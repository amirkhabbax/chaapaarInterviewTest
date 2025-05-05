
export class PostRequestBody {
  constructor(
    public identifier: string,
    public username: string,
    public first_name: string,
    public last_name: string,
    public display_name: string,
    public newPassword: string
  ) {}
}
