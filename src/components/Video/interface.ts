declare type Type = `video/${string}`;

export default interface VideoInterface {
  src: string;
  type: Type;
  controls?: boolean;
  poster?: string;
  noSupportText?: string;
  style?: React.CSSProperties | string | undefined;
}
