import { RequiredFieldPipe } from './required-field.pipe';

describe('RequiredFieldPipe', () => {
  it('create an instance', () => {
    const pipe = new RequiredFieldPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms "anything" to "anything*"', () => {
    const pipe = new RequiredFieldPipe();
    expect(pipe.transform('anything')).toBe('anything*');
  });
});
