import { ValidatePhonePipe } from './validate-phone.pipe';

describe('ValidatePhonePipe', () => {
  it('create an instance', () => {
    const pipe = new ValidatePhonePipe();
    expect(pipe).toBeTruthy();
  });
});
