import { Page, Toolbar } from "react-onsenui";
import { useTheme } from "@mui/system";
import { useDarkmode } from "../../hooks/useDarkmode";
import { AccentColorPickerItem } from "./components/AccentColorPickerItem";
import { useConfirm } from "material-ui-confirm";
import { useActivity } from "../../hooks/useActivity";
import { BackButton } from "../../components/BackButton";
import { useStrings } from "../../hooks/useStrings";

import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { List, ListItem, ListSubheader, Switch } from "@mui/material";
import { StyledListItemText } from "./components/StyledListItemText";

function SettingsActivity() {
  const confirm = useConfirm();
  const { context, extra } = useActivity();
  const { strings, language, setLanguage } = useStrings();

  const theme = useTheme();

  const { darkmode, setDarkmode } = useDarkmode();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage} />
        </div>
        <div className="center">{strings.settings}</div>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <List
        subheader={
          <ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Aussehen</ListSubheader>
        }
      >
        <ListItem>
          <StyledListItemText id="switch-list-label-wifi" primary={strings.dark_mode} />
          <Switch
            edge="end"
            onChange={(e: any) => {
              setDarkmode(e.target.checked);
            }}
            checked={darkmode}
            inputProps={{
              "aria-labelledby": "switch-list-label-wifi",
            }}
          />
        </ListItem>
        <AccentColorPickerItem />
        <ListItem>
          <StyledListItemText id="sts-language" primary={strings.language} />
          <FormControl>
            <NativeSelect
              variant="outlined"
              defaultValue={language}
              inputProps={{
                name: "lang",
                "aria-labelledby": "sts-language",
              }}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            >
              <option value="de">German</option>
              <option value="en">English</option>
            </NativeSelect>
          </FormControl>
        </ListItem>
      </List>
    </Page>
  );
}

export default SettingsActivity;
