import { PushPageProps } from "@Types/init";

interface Props {
  pushPage?: (props: PushPageProps) => void | undefined;
  readonly popPage?: boolean | undefined;
}

interface States {}
export { Props, States };
