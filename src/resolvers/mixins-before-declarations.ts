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
    return node.type === 'declaration';
  }

  private moveMixinBeforeTopDeclaration(parent: any, index: any): void {
    const [child] = parent.removeChild(index);
    parent.insert(this.findFirstDeclaration(parent) - 1, child);
  }

  private findFirstDeclaration(node: any): number {
    for (let i = 0; i < node.length; i++) {
      if (node.get(i).type === 'declaration') {
        return i;
      }
    }
    return -1;
  }
}
