import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('mixins-before-declarations', () => {
  describe('- scss', () => {
    const options = { 'mixins-before-declarations': 1 };
    const filename = 'test/sass/mixins-before-declarations.scss';

    it('resolves', () => {
      const { ast } = resolveFirst(filename, options);

      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.scss, options);

      expect(preResolve.warningCount).toBe(2);
      expect(postResolve.warningCount).toBe(0);
    });
  });

  describe('- sass', () => {
    const filename = 'test/sass/mixins-before-declarations.sass';
    const options = { 'mixins-before-declarations': 1 };

    it('resolves', () => {
      const { ast } = resolveFirst(filename, options);

      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.sass, options);

      expect(preResolve.warningCount).toBe(3);
      expect(postResolve.warningCount).toBe(0);
    });
  });
});
