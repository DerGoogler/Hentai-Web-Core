import React from "react";
import { NavPageContainer, Link } from "react-windows-ui";
import { hot } from "react-hot-loader/root";
import AnimePicture from "../maker/AniemePicture";
import { Col, Row } from "react-onsenui";
import hmtai from "hmtai";

class NSFW extends React.Component {
  render() {
    return (
      <NavPageContainer>
        <Row>
          <Col>
            <AnimePicture source={hmtai.nsfw.ass()} note="ass" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.bdsm()} note="bdsm" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.cum()} note="cum" />
          </Col>
        </Row>

        <Row>
          <Col>
            <AnimePicture source={hmtai.nsfw.creampie()} note="creampie" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.manga()} note="manga" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.femdom()} note="femdom" />
          </Col>
        </Row>

        <Row>
          <Col>
            <AnimePicture source={hmtai.nsfw.hentai()} note="hentai" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.incest()} note="incest" />
          </Col>
          <Col>
            <AnimePicture
              source={hmtai.nsfw.masturbation()}
              note="masturbation"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <AnimePicture source={hmtai.nsfw.public()} note="public" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.ero()} note="ero" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.orgy()} note="orgy" />
          </Col>
        </Row>

        <Row>
          <Col>
            <AnimePicture source={hmtai.nsfw.elves()} note="elves" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.yuri()} note="yuri" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.pantsu()} note="pantsu" />
          </Col>
        </Row>

        <Row>
          <Col>
            <AnimePicture source={hmtai.nsfw.glasses()} note="glasses" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.cuckold()} note="cuckold" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.blowjob()} note="blowjob" />
          </Col>
        </Row>

        <Row>
          <Col>
            <AnimePicture source={hmtai.nsfw.boobjob()} note="boobjob" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.foot()} note="foot" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.thighs()} note="thighs" />
          </Col>
        </Row>

        <Row>
          <Col>
            <AnimePicture source={hmtai.nsfw.ahegao()} note="ahegao" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.uniform()} note="uniform" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.gangbang()} note="gangbang" />
          </Col>
        </Row>

        <Row>
          <Col>
            <AnimePicture source={hmtai.nsfw.tentacles()} note="tentacles" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.gif()} note="gif" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.nsfw.nsfwNeko()} note="nsfwNeko" />
          </Col>
        </Row>

        <Row>
          <Col>
            <AnimePicture
              source={hmtai.nsfw.nsfwMobileWallpaper()}
              note="nsfwMobileWallpaper"
            />
          </Col>
          <Col>
            <AnimePicture
              source={hmtai.nsfw.zettaiRyouiki()}
              note="zettaiRyouiki"
            />
          </Col>
        </Row>
      </NavPageContainer>
    );
  }
}

export default hot(NSFW);

<Row>
  <Col></Col>
  <Col></Col>
  <Col></Col>
</Row>;
