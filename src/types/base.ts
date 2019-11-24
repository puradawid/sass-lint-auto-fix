import { ILogger } from '@src/helpers';
import { Node } from 'gonzales-pe-sl';
import { Ruleset, SlRule } from 'sass-lint';

export enum ValidFileType {
  scss = 'scss',
  sass = 'sass',
}

export interface SlfParserOptions {
  include?: string;
  ignore?: string[];
  syntax?: SlfParserSyntaxOptions;
  resolvers?: any;
}

export interface SlfParserSyntaxOptions {
  include: string[];
}

export interface Resolution {
  filename: string;
  rule: SlRule;
  ast: Node;
}

export interface ConfigOpts {
  logger: ILogger;
  slRules?: any;
  slConfig?: any;
  files: {
    include: string;
    ignore?: string;
  };
  syntax: {
    include: (keyof typeof ValidFileType)[];
  };
  resolvers: Ruleset;
  options: {
    optOut: boolean;
  };
}

export interface CreateModuleConfig {
  ast: Node;
  name: string;
  rule: SlRule;
}