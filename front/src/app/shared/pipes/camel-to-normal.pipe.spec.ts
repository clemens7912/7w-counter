import { CamelToNormalPipe } from './camel-to-normal.pipe';

describe('CamelToNormalPipe', () => {
  it('create an instance', () => {
    const pipe = new CamelToNormalPipe();
    expect(pipe).toBeTruthy();
  });
});
