import introSongs from "../helpers/introSongs"

const initialState = introSongs

const introSongsCompletedReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'USER_INTROSONGS_COMPLETED': {
      return Object.assign({}, state, {
        AuClairDeLaLune: action.payload.AuClairDeLaLune,
        AuraLee: action.payload.AuraLee,
        FrogSong: action.payload.FrogSong,
        GoodKingWenceslas: action.payload.GoodKingWenceslas,
        GoTellAuntRhody: action.payload.GoTellAuntRhody,
        HotCrossBuns: action.payload.HotCrossBuns,
        JingleBells: action.payload. JingleBells,
        LightlyRow: action.payload.LightlyRow,
        LoveSomebody: action.payload.LoveSomebody,
        MaryHadLamb: action.payload.MaryHadLamb,
        Musette: action.payload.Musette,
        NewWorldSymphony: action.payload.NewWorldSymphony,
        OatsAndBeans: action.payload.OatsAndBeans,
        OdeToJoy: action.payload.OdeToJoy, 
        SaintsGoMarchin: action.payload.SaintsGoMarchin
      })
    }
     default: {
      return state
    }
  }
}

export default introSongsCompletedReducer