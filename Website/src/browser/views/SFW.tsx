import * as React from "react";
import { NavPageContainer } from "react-windows-ui";
import { hot } from "react-hot-loader/root";
import AnimePicture from "../builders/AnimePicture";
import { Col, Row } from "react-onsenui";
import hmtai from "hmtai";
import style from "./../builders/Styles";

class SFW extends React.Component {
  render() {
    return (
      <NavPageContainer>
        <div style={style.view_component_style}>
          <Row>
            <Col>
              <AnimePicture source={hmtai.wallpaper()} note="wallpaper" />
            </Col>
            <Col>
              <AnimePicture source={hmtai.mobileWallpaper()} note="mobileWallpaper" />
            </Col>
            <Col>
              <AnimePicture source={hmtai.neko()} note="neko" />
            </Col>
          </Row>

          <Row>
            <Col>
              <AnimePicture source={hmtai.jahy()} note="jahy" />
            </Col>
            <Col>
              <AnimePicture source={hmtai.lick()} note="lick" />
            </Col>
            <Col>
              <AnimePicture source={hmtai.slap()} note="slap" />
            </Col>
          </Row>

          <Row>
            <Col>
              <AnimePicture source={hmtai.depression()} note="depression" />
            </Col>
          </Row>
        </div>
      </NavPageContainer>
    );
  }
}

export default hot(SFW);
