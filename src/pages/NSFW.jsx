import AnimePicture from "../makers/AniemePicture";
import hmtai from "hmtai";
import React from "react";
import { hot } from "react-hot-loader/root";

class NSFW extends React.Component {
  render() {
      return (
        <>
          <AnimePicture source={hmtai.nsfw.ass()} note="ass" />
          <AnimePicture source={hmtai.nsfw.bdsm()} note="bdsm" />
          <AnimePicture source={hmtai.nsfw.cum()} note="cum" />
          <AnimePicture source={hmtai.nsfw.creampie()} note="creampie" />
          <AnimePicture source={hmtai.nsfw.manga()} note="manga" />
          <AnimePicture source={hmtai.nsfw.femdom()} note="femdom" />
          <AnimePicture source={hmtai.nsfw.hentai()} note="hentai" />
          <AnimePicture source={hmtai.nsfw.incest()} note="incest" />
          <AnimePicture
            source={hmtai.nsfw.masturbation()}
            note="masturbation"
          />
          <AnimePicture source={hmtai.nsfw.public()} note="public" />
          <AnimePicture source={hmtai.nsfw.ero()} note="ero" />
          <AnimePicture source={hmtai.nsfw.orgy()} note="orgy" />
          <AnimePicture source={hmtai.nsfw.elves()} note="elves" />
          <AnimePicture source={hmtai.nsfw.yuri()} note="yuri" />
          <AnimePicture source={hmtai.nsfw.pantsu()} note="pantsu" />
          <AnimePicture source={hmtai.nsfw.glasses()} note="glasses" />
          <AnimePicture source={hmtai.nsfw.cuckold()} note="cuckold" />
          <AnimePicture source={hmtai.nsfw.blowjob()} note="blowjob" />
          <AnimePicture source={hmtai.nsfw.boobjob()} note="boobjob" />
          <AnimePicture source={hmtai.nsfw.foot()} note="foot" />
          <AnimePicture source={hmtai.nsfw.thighs()} note="thighs" />
          <AnimePicture source={hmtai.nsfw.ahegao()} note="ahegao" />
          <AnimePicture source={hmtai.nsfw.uniform()} note="uniform" />
          <AnimePicture source={hmtai.nsfw.gangbang()} note="gangbang" />
          <AnimePicture source={hmtai.nsfw.tentacles()} note="tentacles" />
          <AnimePicture source={hmtai.nsfw.gif()} note="gif" />
          <AnimePicture source={hmtai.nsfw.nsfwNeko()} note="nsfwNeko" />
          <AnimePicture
            source={hmtai.nsfw.nsfwMobileWallpaper()}
            note="nsfwMobileWallpaper"
          />
          <AnimePicture
            source={hmtai.nsfw.zettaiRyouiki()}
            note="zettaiRyouiki"
          />
        </>
      );
  }
}

export default hot(NSFW);
