import { ValidateEmailPipe } from './validate-email.pipe';

describe('ValidateEmailPipe', () => {
  it('create an instance', () => {
    const pipe = new ValidateEmailPipe();
    expect(pipe).toBeTruthy();
  });
});
