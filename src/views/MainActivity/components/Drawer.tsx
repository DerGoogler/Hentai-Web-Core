import { Divider, List, ListItemButton, ListSubheader } from "@mui/material";
import { Page } from "react-onsenui";
import { useStrings } from "../../../hooks/useStrings";
import SettingsActivity from "../../SettingsActivity";
import { StyledListItemText } from "../../SettingsActivity/components/StyledListItemText";

type Props = {
  renderToolbar: () => JSX.Element;
  hideSplitter: () => void;
  pushPage: (props: PushPropsCore) => void;
};

export const Drawer = (props: Props) => {
  const hide = props.hideSplitter;
  const pushPage = props.pushPage;

  const { strings } = useStrings();

  return (
    <Page renderToolbar={props.renderToolbar}>
      <List>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: SettingsActivity,
              props: {
                key: "settings",
                extra: {},
              },
            });
            hide();
          }}
        >
          <StyledListItemText primary={strings.settings} />
        </ListItemButton>
      </List>
      <Divider />
    </Page>
  );
};
