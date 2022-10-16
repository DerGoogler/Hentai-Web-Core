import { Searchbar } from "@Components/Searchbar";
import { StyledSection } from "@Components/StyledSection";
import { useStrings } from "@Hooks/useStrings";
import { useState } from "react";
import { Page } from "react-onsenui";
import { ImageLoader } from "./ImageLoader";

export interface PageData {
  data: any[];
  type: string;
}

export const PageData = (props: PageData) => {
  const [search, setSearch] = useState("");
  const { strings } = useStrings();

  const filter = props.data.filter((some) => some.toLowerCase().includes(search.toLowerCase()));

  return (
    <Page>
      <StyledSection>
        <Searchbar
          placeholder={strings.formatString(strings.search, { type: props.type }) as string}
          onSearch={(value) => setSearch(value)}
        />

        {filter.map((item) => (
          <ImageLoader src={item} />
        ))}
      </StyledSection>
    </Page>
  );
};
