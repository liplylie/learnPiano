import React from "react";
import { Route } from "react-router-dom";

import About from "../components/Home/About";
import Links from "../components/Home/Links";
import PrivacyPolicy from "../components/Home/privacyPolicy";
import NavBar from "../components/NavBar";
import ProfileSettings from "../components/ProfileSettings";
import DefaultHome from "../components/Home/DefaultHome";
import Footer from "../components/Footer";
import Profile from "../components/Home/Profile";
import Contact from "../components/Home/Contact";

// Lessons
import LessonOne from "../components/Lessons/LessonOne";
import LessonTwo from "../components/Lessons/LessonTwo";
import LessonThree from "../components/Lessons/LessonThree";

// Mini Games
import MiniGameOne from "../components/MiniGames/MiniGameOne";
import MiniGameTwo from "../components/MiniGames/MiniGameTwo";

// Intro Songs
import IntroSongList from "../components/IntroSongs/IntroSongList";
import CreateIntroSong from "../components/IntroSongs/CreateIntroSong";
import Alouette from "../components/IntroSongs/Alouette";
import AuClairDeLaLune from "../components/IntroSongs/AuClairDeLaLune";
import AuraLee from "../components/IntroSongs/AuraLee";
import CamptownRaces from "../components/IntroSongs/CamptownRaces";
import Dreydl from "../components/IntroSongs/Dreydl";
import ForHesAJollyGoodFellow from "../components/IntroSongs/ForHesAJollyGoodFellow";
import FrogSong from "../components/IntroSongs/FrogSong";
import GoodKingWenceslas from "../components/IntroSongs/GoodKingWenceslas";
import GoTellAuntRhody from "../components/IntroSongs/GoTellAuntRhody";
import HakyoJung from "../components/IntroSongs/HakyoJung";
import HotCrossBuns from "../components/IntroSongs/HotCrossBuns";
import ItsRaining from "../components/IntroSongs/ItsRaining";
import LightlyRow from "../components/IntroSongs/LightlyRow";
import LongLongAgo from "../components/IntroSongs/LongLongAgo";
import LondonBridges from "../components/IntroSongs/LondonBridges";
import LoveSomebody from "../components/IntroSongs/LoveSomebody";
import JingleBells from "../components/IntroSongs/JingleBells";
import MaryHadLamb from "../components/IntroSongs/MaryHadLamb";
import Musette from "../components/IntroSongs/Musette";
import NewWorldSymphony from "../components/IntroSongs/NewWorldSymphony";
import OatsAndBeans from "../components/IntroSongs/OatsAndBeans";
import OdeToJoy from "../components/IntroSongs/OdeToJoy";
import PopGoesWeasel from "../components/IntroSongs/PopGoesWeasel";
import SaintsGoMarchin from "../components/IntroSongs/SaintsGoMarchin";
import Twinkle from "../components/IntroSongs/Twinkle";

export const PrivateRoutes = ({ loading, authenticated, userID }) => {
  return (
    <>
      <Route
        exact path={["/", "/profile"]}
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
          <ProfileSettings
            authenticated={authenticated}
            loading={loading}
          />
        )}
      />
      <Route
        exact
        path="/lessonOne"
        component={() => <LessonOne authenticated={authenticated} />}
      />
      <Route
        exact
        path="/lessonTwo"
        component={() => <LessonTwo authenticated={authenticated} />}
      />
      <Route
        exact
        path="/lessonThree"
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
        component={() => <AuClairDeLaLune />}
      />
      <Route
        exact
        path="/SongList/intro/AuraLee"
        component={() => <AuraLee />}
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
        path="/SongList/intro/Dreydl"
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
        component={() => <GoodKingWenceslas />}
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
        component={() => <HotCrossBuns />}
      />
      <Route
        exact
        path="/SongList/intro/ItsRaining"
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
        component={() => <JingleBells />}
      />
      <Route
        exact
        path="/SongList/intro/LightlyRow"
        component={() => <LightlyRow />}
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
        component={() => <LoveSomebody />}
      />
      <Route
        exact
        path="/SongList/intro/MaryHadLamb"
        component={() => <MaryHadLamb />}
      />
      <Route
        exact
        path="/SongList/intro/Musette"
        component={() => <Musette />}
      />
      <Route
        exact
        path="/SongList/intro/NewWorldSymphony"
        component={() => <NewWorldSymphony />}
      />
      <Route
        exact
        path="/SongList/intro/OdeToJoy"
        component={() => <OdeToJoy />}
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
        path="/SongList/intro/PopGoesWeasel"
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
        component={() => <SaintsGoMarchin />}
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
        path="/SongList/intro/Twinkle"
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
    </>
  );
};

export default PrivateRoutes;
