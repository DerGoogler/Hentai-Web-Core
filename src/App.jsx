import hmtai from "hmtai";
import React from "react";
import {
 Page,
 Toolbar,
 Tab,
 Tabbar,
 Card,
 Fab,
 Button,
 SpeedDial,
 SpeedDialItem,
 ToolbarButton,
 Icon
} from "react-onsenui";
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
    <AnimePicture source={hmtai.nsfw.masturbation()} note="masturbation" />
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
    <AnimePicture source={hmtai.nsfw.nsfwMobileWallpaper()} note="nsfwMobileWallpaper" />
    <AnimePicture source={hmtai.nsfw.zettaiRyouiki()} note="zettaiRyouiki" />
   </>
  );
 }
}

class AnimePicture extends React.Component {
 render() {
  const { note, source } = this.props;
  return (
   <Card>
    <img onDoubleClick={() => {this.setAttribute("src", source)}} src={source} alt={note} style={{ width: "100%" }} />
    <div className="title right">{note.charAt(0).toUpperCase() + note.slice(1)}</div>
   </Card>
  );
 }
}

class AnimeTab extends React.Component {
 render() {
  return (
   <Page>
    <section style={{ margin: "8px" }}>
     <p>{this.props.content}</p>
    </section>
   </Page>
  );
 }
}

class App extends React.Component {
 renderToolbar() {
  return (
   <Toolbar>
    <div className="center">Hentai Web</div>
    <div className="right">
     <ToolbarButton
      onClick={() => {
       location.reload();
      }}
     >
      <Icon icon="md-refresh"></Icon>
     </ToolbarButton>
    </div>
   </Toolbar>
  );
 }

 renderTabs() {
  return [
   {
    content: <AnimeTab content={<SFW />} />,
    tab: <Tab label="SFW" />
   },
   {
    content: <AnimeTab content={<NSFW />} />,
    tab: <Tab label="NSFW" />
   }
  ];
 }

 renderFixed() {
    return (
      <SpeedDial position='bottom right'>
        <Fab>
          <Icon icon='md-more' />
        </Fab>
        <SpeedDialItem onClick={() => {window.open('https://github.com/DerGoogler/Hentai-Web/blob/master/src/App.jsx')}}>
          <Icon icon='md-github' />
        </SpeedDialItem>
      </SpeedDial>
    );
  }

 render() {
  return (
   <Page 
   renderToolbar={this.renderToolbar}
   renderFixed={this.renderFixed}>
    <Tabbar 
    swipeable={true} 
    position="auto" 
    renderTabs={this.renderTabs}
    />
   </Page>
  );
 }
}

export default hot(App);
