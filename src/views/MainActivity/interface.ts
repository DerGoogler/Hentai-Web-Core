import { PushPageProps } from "@Types/init";

interface Props {
  pushPage(props: PushPageProps): void;
  popPage: any;
}

interface States {
  isContextOpen: boolean;
  sfw: any[];
  nsfw: any[];
}

export { Props, States };
