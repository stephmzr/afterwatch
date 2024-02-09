declare module "*.sass";

declare module "I18n" {
  let I18n: any;
  export = I18n;
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

