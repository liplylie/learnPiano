import React from "react";
import { Route, Switch } from "react-router-dom";

import About from "../pages/Home/About";
import Links from "../pages/Home/Links";
import PrivacyPolicy from "../pages/Home/privacyPolicy";
import ProfileSettings from "../components/ProfileSettings";
import Profile from "../pages/Profile";
import Contact from "../pages/Home/Contact";

// Lessons
import LessonOne from "../pages/Lessons/LessonOne";
import LessonTwo from "../pages/Lessons/LessonTwo";
import LessonThree from "../pages/Lessons/LessonThree";

// Mini Games
import MiniGameOne from "../pages/MiniGames/MiniGameOne";
import MiniGameTwo from "../pages/MiniGames/MiniGameTwo";

// Intro Songs
import IntroSongList from "../pages/IntroSongs/IntroSongList";
import CreateIntroSong from "../pages/IntroSongs/CreateIntroSong";
import Alouette from "../pages/IntroSongs/Alouette";
import AuClairDeLaLune from "../pages/IntroSongs/AuClairDeLaLune";
import AuraLee from "../pages/IntroSongs/AuraLee";
import CamptownRaces from "../pages/IntroSongs/CamptownRaces";
import Dreydl from "../pages/IntroSongs/Dreydl";
import ForHesAJollyGoodFellow from "../pages/IntroSongs/ForHesAJollyGoodFellow";
import FrogSong from "../pages/IntroSongs/FrogSong";
import GoodKingWenceslas from "../pages/IntroSongs/GoodKingWenceslas";
import GoTellAuntRhody from "../pages/IntroSongs/GoTellAuntRhody";
import HakyoJung from "../pages/IntroSongs/HakyoJung";
import HotCrossBuns from "../pages/IntroSongs/HotCrossBuns";
import ItsRaining from "../pages/IntroSongs/ItsRaining";
import LightlyRow from "../pages/IntroSongs/LightlyRow";
import LongLongAgo from "../pages/IntroSongs/LongLongAgo";
import LondonBridges from "../pages/IntroSongs/LondonBridges";
import LoveSomebody from "../pages/IntroSongs/LoveSomebody";
import JingleBells from "../pages/IntroSongs/JingleBells";
import MaryHadLamb from "../pages/IntroSongs/MaryHadLamb";
import Musette from "../pages/IntroSongs/Musette";
import NewWorldSymphony from "../pages/IntroSongs/NewWorldSymphony";
import OatsAndBeans from "../pages/IntroSongs/OatsAndBeans";
import OdeToJoy from "../pages/IntroSongs/OdeToJoy";
import PopGoesWeasel from "../pages/IntroSongs/PopGoesWeasel";
import SaintsGoMarchin from "../pages/IntroSongs/SaintsGoMarchin";
import Twinkle from "../pages/IntroSongs/Twinkle";

import Page404 from '../pages/Page404/Page404'

export const PrivateRoutes = ({ loading, authenticated, userID }) => {
  return (
    <Switch>
      <Route
        exact
        path={["/", "/profile"]}
        component={() => (
          <Profile
            authenticated={authenticated}
            loading={loading}
            userID={userID}
          />
        )}
      />
      <Route
        exact
        path="/settings"
        component={() => (
          <ProfileSettings authenticated={authenticated} loading={loading} />
        )}
      />
      <Route
        exact
        path="/lesson1"
        component={() => <LessonOne authenticated={authenticated} />}
      />
      <Route
        exact
        path="/lesson2"
        component={() => <LessonTwo authenticated={authenticated} />}
      />
      <Route
        exact
        path="/lesson3"
        component={() => <LessonThree authenticated={authenticated} />}
      />
      <Route
        exact
        path="/miniGame1"
        component={() => <MiniGameOne authenticated={authenticated} />}
      />
      <Route
        exact
        path="/miniGame2"
        component={() => <MiniGameTwo authenticated={authenticated} />}
      />
      <Route
        exact
        path="/SongList/intro"
        component={() => <IntroSongList authenticated={authenticated} />}
      />
      <Route
        exact
        path="/SongList/intro/Alouette"
        component={() => (
          <CreateIntroSong
            songName={Alouette.songName}
            lessonNotes={Alouette.lessonNotes}
            songHeading={Alouette.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/AuClairDeLaLune"
        component={() => (
          <CreateIntroSong
            songName={AuClairDeLaLune.songName}
            lessonNotes={AuClairDeLaLune.lessonNotes}
            songHeading={AuClairDeLaLune.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/AuraLee"
        component={() => (
          <CreateIntroSong
            songName={AuraLee.songName}
            lessonNotes={AuraLee.lessonNotes}
            songHeading={AuraLee.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/CamptownRaces"
        component={() => (
          <CreateIntroSong
            songName={CamptownRaces.songName}
            lessonNotes={CamptownRaces.lessonNotes}
            songHeading={CamptownRaces.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/DreydlDreydl"
        component={() => (
          <CreateIntroSong
            songName={Dreydl.songName}
            lessonNotes={Dreydl.lessonNotes}
            songHeading={Dreydl.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/FrogSong"
        component={() => (
          <CreateIntroSong
            songName={FrogSong.songName}
            lessonNotes={FrogSong.lessonNotes}
            songHeading={FrogSong.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/ForHesAJollyGoodFellow"
        component={() => (
          <CreateIntroSong
            songName={ForHesAJollyGoodFellow.songName}
            lessonNotes={ForHesAJollyGoodFellow.lessonNotes}
            songHeading={ForHesAJollyGoodFellow.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/GoodKingWenceslas"
        component={() => (
          <CreateIntroSong
            songName={GoodKingWenceslas.songName}
            lessonNotes={GoodKingWenceslas.lessonNotes}
            songHeading={GoodKingWenceslas.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/GoTellAuntRhody"
        component={() => (
          <CreateIntroSong
            songName={GoTellAuntRhody.songName}
            lessonNotes={GoTellAuntRhody.lessonNotes}
            songHeading={GoTellAuntRhody.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/HakyoJung"
        component={() => (
          <CreateIntroSong
            songName={HakyoJung.songName}
            lessonNotes={HakyoJung.lessonNotes}
            songHeading={HakyoJung.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/HotCrossBuns"
        component={() => (
          <CreateIntroSong
            songName={HotCrossBuns.songName}
            lessonNotes={HotCrossBuns.lessonNotes}
            songHeading={HotCrossBuns.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/ItsRainingItsPouring"
        component={() => (
          <CreateIntroSong
            songName={ItsRaining.songName}
            lessonNotes={ItsRaining.lessonNotes}
            songHeading={ItsRaining.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/JingleBells"
        component={() => (
          <CreateIntroSong
            songName={JingleBells.songName}
            lessonNotes={JingleBells.lessonNotes}
            songHeading={JingleBells.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/LightlyRow"
        component={() => (
          <CreateIntroSong
            songName={LightlyRow.songName}
            lessonNotes={LightlyRow.lessonNotes}
            songHeading={LightlyRow.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/LongLongAgo"
        component={() => (
          <CreateIntroSong
            songName={LongLongAgo.songName}
            lessonNotes={LongLongAgo.lessonNotes}
            songHeading={LongLongAgo.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/LondonBridges"
        component={() => (
          <CreateIntroSong
            songName={LondonBridges.songName}
            lessonNotes={LondonBridges.lessonNotes}
            songHeading={LondonBridges.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/LoveSomebody"
        component={() => (
          <CreateIntroSong
            songName={LoveSomebody.songName}
            lessonNotes={LoveSomebody.lessonNotes}
            songHeading={LoveSomebody.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/MaryHad"
        component={() => (
          <CreateIntroSong
            songName={MaryHadLamb.songName}
            lessonNotes={MaryHadLamb.lessonNotes}
            songHeading={MaryHadLamb.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/Musette"
        component={() => (
          <CreateIntroSong
            songName={Musette.songName}
            lessonNotes={Musette.lessonNotes}
            songHeading={Musette.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/NewWorldSymphony"
        component={() => (
          <CreateIntroSong
            songName={NewWorldSymphony.songName}
            lessonNotes={NewWorldSymphony.lessonNotes}
            songHeading={NewWorldSymphony.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/OdeToJoy"
        component={() => (
          <CreateIntroSong
            songName={OdeToJoy.songName}
            lessonNotes={OdeToJoy.lessonNotes}
            songHeading={OdeToJoy.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/OatsAndBeans"
        component={() => (
          <CreateIntroSong
            songName={OatsAndBeans.songName}
            lessonNotes={OatsAndBeans.lessonNotes}
            songHeading={OatsAndBeans.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/PopGoesTheWeasel"
        component={() => (
          <CreateIntroSong
            songName={PopGoesWeasel.songName}
            lessonNotes={PopGoesWeasel.lessonNotes}
            songHeading={PopGoesWeasel.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/SaintsGoMarchin"
        component={() => (
          <CreateIntroSong
            songName={SaintsGoMarchin.songName}
            lessonNotes={SaintsGoMarchin.lessonNotes}
            songHeading={SaintsGoMarchin.songHeading}
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/Sample"
        component={() => (
          <CreateIntroSong
            songName="Sample"
            lessonNotes={"C4 C4 D4 E4".split(" ")}
            songHeading="Sample"
          />
        )}
      />
      <Route
        exact
        path="/SongList/intro/TwinkleTwinkle"
        component={() => (
          <CreateIntroSong
            songName={Twinkle.songName}
            lessonNotes={Twinkle.lessonNotes}
            songHeading={Twinkle.songHeading}
          />
        )}
      />
      <Route exact path="/about" component={() => <About />} />
      <Route exact path="/links" component={() => <Links />} />
      <Route exact path="/privacyPolicy" component={() => <PrivacyPolicy />} />
      <Route exact path="/contact" component={() => <Contact />} />
      <Route component={Page404} />
    </Switch>
  );
};

export default PrivateRoutes;
