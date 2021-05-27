// Makers
import AnimePicture from '../makers/AniemePicture';

// Regular Modules
import hmtai from "hmtai";
import React from "react";
import { hot } from "react-hot-loader/root";


class SFW extends React.Component {
    render() {
        return (
            <>
                <AnimePicture source={hmtai.wallpaper()} note="wallpaper" />
                <AnimePicture source={hmtai.mobileWallpaper()} note="mobileWallpaper" />
                <AnimePicture source={hmtai.neko()} note="neko" />
                <AnimePicture source={hmtai.jahy()} note="jahy" />
            </>
        );
    }
}


export default hot(SFW);