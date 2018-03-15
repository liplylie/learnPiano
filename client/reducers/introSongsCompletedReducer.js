const initialState = {
  AuClairDeLaLune: false,
  AuraLee: false,
  GoodKingWenceslas: false,
  HotCrossBuns: false,
  LightlyRow: false,
  LoveSomebody: false,
  MaryHadLamb: false,
  Musette: false,
  NewWorldSymphony: false,
  OdeToJoy: false, 
  SaintsGoMarchin: false
}

const introSongsCompletedReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'USER_INTROSONGS_COMPLETED': {
      return Object.assign({}, state, {
        AuClairDeLaLune: action.payload.AuClairDeLaLune,
        AuraLee: action.payload.AuraLee,
        GoodKingWenceslas: action.payload.GoodKingWenceslas,
        HotCrossBuns: action.payload.HotCrossBuns,
        LightlyRow: action.payload.LightlyRow,
        LoveSomebody: action.payload.LoveSomebody,
        MaryHadLamb: action.payload.MaryHadLamb,
        Musette: action.payload.Musette,
        NewWorldSymphony: action.payload.NewWorldSymphony,
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