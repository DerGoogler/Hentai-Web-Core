import AnimePicture from "../buildeers/AniemePicture";
import hmtai from "hmtai";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { List } from "react-onsenui";

class SFW extends React.Component {
  render() {
    return (
      <List>
        <AnimePicture source={hmtai.wallpaper()} note="wallpaper" />
        <AnimePicture source={hmtai.mobileWallpaper()} note="mobileWallpaper" />
        <AnimePicture source={hmtai.neko()} note="neko" />
        <AnimePicture source={hmtai.jahy()} note="jahy" />
        <AnimePicture source={hmtai.lick()} note="lick" />
        <AnimePicture source={hmtai.slap()} note="slap" />
        <AnimePicture source={hmtai.depression()} note="depression" />
      </List>
    );
  }
}

export default hot(SFW);
