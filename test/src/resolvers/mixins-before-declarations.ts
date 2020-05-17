import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

import { dedent } from '@test/helpers/utils';

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

    it('keeps indentation', () => {
      const { ast: postResolve } = resolveFirst(filename, options);

      expect(postResolve.toString()).toContain(
        dedent(`
          .rule-two {
            @include my-new-mixin-two;
            @include my-another-mixin-two;
            display: block;
            font-size: 10px;
            font-style: italic;
          }
      `),
      );
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

    it('keeps indentation', () => {
      const { ast: postResolve } = resolveFirst(filename, options);

      expect(postResolve.toString()).toContain(
        dedent(`
        .rule-with-one
          @include my-new-mixin-one
          display: block
      `),
      );
    });
  });
});
