// @flow strict

declare module "tiny-ansi-colors" {
  declare type Color =
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'white';

  declare type Options = {
    color?: Color,
    background?: Color,
    bold?: boolean,
    dim?: boolean,
    underline?: boolean,
    reverse?: boolean,
  };
  declare export function colors(text: string, options: Options): string
}