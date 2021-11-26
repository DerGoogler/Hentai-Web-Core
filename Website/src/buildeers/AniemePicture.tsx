// Regular Modules
import * as React from "react";
import { Card, ListItem } from "react-onsenui";
import { hot } from "react-hot-loader/root";
import { AnimePictureInterface } from "../d/inferface";
import { Giscus } from "@giscus/react";

class AnimePicture extends React.Component<AnimePictureInterface> {
  render() {
    const { note, source } = this.props;
    return (
      <ListItem expandable>
        <img
          id="reload"
          src={source}
          alt={note.charAt(0).toUpperCase() + note.slice(1)}
          style={{ width: "100%" }}
        />
        <div className="title">
          {note.charAt(0).toUpperCase() + note.slice(1)}
        </div>
        <div className="expandable-content">
          <Giscus
            repo="DerGoogler/Hentai-Web"
            repoId="MDEwOlJlcG9zaXRvcnkzNjk5MTkzNzA="
            category="Talk about the HMs"
            categoryId="DIC_kwDOFgyFis4B_--W"
            mapping="specific"
            term={note}
            reactionsEnabled="1"
            emitMetadata="0"
            theme="light"
          />
        </div>
      </ListItem>
    );
  }
}

export default hot(AnimePicture);
