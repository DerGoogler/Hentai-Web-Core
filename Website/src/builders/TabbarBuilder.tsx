import { hot } from "react-hot-loader/root";
import { Tab } from "react-onsenui";
import AnimeTab from "./AnimeTab";

/**
 * Builds an Onsen UI Tabbbar in JSON format
 * @param sections
 * @returns {Object}
 */
function TabbbarBuilder(sections: any) {
  return sections.map((item: { label: string; content: any }) => {
    return {
      content: <AnimeTab key={item.label} content={item.content} />,
      tab: <Tab key={item.label} label={item.label} />,
    };
  });
}

export default hot(TabbbarBuilder);
