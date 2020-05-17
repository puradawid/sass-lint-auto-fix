import BaseResolver from './base-resolver';

export default class MixinsBeforeDeclarations extends BaseResolver {
  public fix() {
    this.ast.traverseByType('include', (_, index, parent) => {
      if (index && parent && this.hasDeclarationAbove(parent, index)) {
        this.moveMixinBeforeTopDeclaration(parent, index);
      }
    });

    return this.ast;
  }

  private hasDeclarationAbove(parent: any, index: number): boolean {
    if (index === 0) {
      return this.isNotAllowedType(parent.get(0));
    } else {
      return (
        this.isNotAllowedType(parent.get(index)) ||
        this.hasDeclarationAbove(parent, index - 1)
      );
    }
  }

  private isNotAllowedType(node: any) {
    return node.is('declaration');
  }

  private moveMixinBeforeTopDeclaration(parent: any, index: any): void {
    const lastIndex = this.findMixinsEnd(parent, index);
    const removedObjects = [];
    const targetIndex = this.findFirstDeclaration(parent);
    const firstIndex = this.findMixinsBeginning(parent, index);

    for (let i = lastIndex; i >= firstIndex; i--) {
      removedObjects.push(parent.removeChild(i)[0]);
    }

    for (const node of removedObjects) {
      parent.insert(targetIndex, node);
    }
  }

  private findFirstDeclaration(node: any): number {
    for (let i = 0; i < node.length; i++) {
      if (node.get(i).is('declaration')) {
        if (node.get(i - 1).is('space')) {
          return i - 1;
        }
        return i;
      }
    }
    return -1;
  }

  private findMixinsBeginning(parent: any, index: number): number {
    for (let i = index - 1; i >= 0; i--) {
      if (!parent.get(i).is('space')) {
        return i + 1;
      }
    }
    return 0;
  }

  private findMixinsEnd(parent: any, index: number): number {
    for (let i = index + 1; i < parent.length; i++) {
      if (!parent.get(i).is('declarationDelimiter')) {
        return i - 1;
      }
    }
    return parent.length - 1;
  }
}
