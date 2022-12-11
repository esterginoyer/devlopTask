import produce from 'immer';
import createReducer from "./reducerUtils";
import { saveClientDB, saveCitiesDB, setClientListDB, setCityListDB } from "../../services/user.service"


const initialState = {
  massage: '',
  bankCode: 0,
  bankJson: [],
  countriesJson: [],
  citiesJson: [],
  bankBranchesJson: [],
  clientList: []
}

const client = {
  saveClient(state, action) {
    saveClientDB(action.payload).then((response) => {
      state.massage = response
    })
  },
  saveCities(cities) {
    saveCitiesDB(cities).then((response) => {console.log(response) })
  },
  setBankList(state, action) {
    state.bankJson = action.payload.Data.Banks
    state.countriesJson = action.payload.Data.Countries
    state.bankBranchesJson = action.payload.Data.BankBranches
  },
  setFilterByBankCode(state, action) {
    state.bankCode = action.payload
  },
  setClientList(state, action) {
    setClientListDB().then((response) => {
      state.clientList = response
    })
  },
  setCityList(state, action) {
    setCityListDB().then((response) => {
      state.citiesJson = response
    })
  }

};


export default produce((state, action) =>
  createReducer(state, action, client), initialState);

