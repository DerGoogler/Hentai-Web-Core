import { ToolbarButton } from "@Components/ToolbarButton";
import { useActivity } from "@Hooks/useActivity";
import Menu from "@mui/icons-material/Menu";
import images from "@Util/images";
import { Page, Tab, Tabbar, Toolbar } from "react-onsenui";
import { useStrings } from "@Hooks/useStrings";
import { PageData } from "./components/PageData";

export const MainActivity = () => {
  const { context } = useActivity();
  const { strings } = useStrings();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <ToolbarButton
            icon={Menu}
            onClick={() => {
              context.splitter.show();
            }}
          />
        </div>
        <div className="center">{strings.app_name} | New begins</div>
      </Toolbar>
    );
  };

  const renderTabs = () => {
    return [
      {
        content: <PageData type="sfw" data={images.sfw} />,
        tab: <Tab label="SFW" />,
      },
      {
        content: <PageData type="nsfw" data={images.nsfw} />,
        tab: <Tab label="NSFW" />,
      },
    ];
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <Tabbar swipeable={false} position="auto" index={0} renderTabs={renderTabs} />
    </Page>
  );
};
