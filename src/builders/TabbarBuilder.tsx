import { Tab } from "react-onsenuix";
import AnimeTab from "@Components/AnimeTab";

/**
 * Builds an Onsen UI Tabbbar in JSON format
 * @param sections
 * @returns {Object}
 */
function TabbbarBuilder(sections: any): any {
  return sections.map((item: { label: string; content: JSX.Element }) => {
    return {
      content: <AnimeTab key={item.label} content={item.content} />,
      tab: <Tab key={item.label} label={item.label} />,
    };
  });
}

export default TabbbarBuilder;
