import Vue from "vue";
import Vuex from "vuex";
import {
  getCompañias,
  createUser,
  loginUser,
  proyectsByCompanie,
  getHistoryData,
} from "@/api/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: "",
    userToken: "",
    userData: "",
    companieProyects: "",
    companieInfo: "",
    historyData: "",
  },
  mutations: {
    companiesList(state, payload) {
      state.companies = payload;
    },
    addToken(state, payload) {
      state.userToken = payload.token;
      state.userData = payload.user;
    },
    addProyects(state, payload) {
      state.companieProyects = payload;
    },
    addCompanieInfo(state, payload) {
      state.companieInfo = payload;
    },
    addHistoryData(state, payload) {
      state.historyData = payload;
    },
  },
  actions: {
    async getCompanies(context, payload?) {
      try {
        if (!payload) {
          const compañias = await getCompañias();
          context.commit("companiesList", compañias.data);
        } else {
          const compañias = await getCompañias(payload.id);
          context.commit("addCompanieInfo", compañias.data);
        }
      } catch (err) {
        console.table(err);
        throw new Error("Error api en vuex");
      }
    },
    async signup(context, payload) {
      try {
        const agregarUsario = await createUser(payload);
        return agregarUsario;
      } catch (err: any) {
        throw new Error(`${err.response.data}`);
      }
    },
    async login(context, payload) {
      try {
        const login = await loginUser(payload);
        context.commit("addToken", login.data);
        return login;
      } catch (err: any) {
        throw new Error(`${err.response.data}`);
      }
    },
    async getProyects(context, payload) {
      try {
        const proyects = await proyectsByCompanie(payload);
        context.commit("addProyects", proyects.data);
        return proyects;
      } catch (err: any) {
        throw new Error(`${err.response.data}`);
      }
    },
    async getHistoryData(context, payload) {
      try {
        const history = await getHistoryData(payload);
        context.commit("addHistoryData", history.data);
        return history;
      } catch (err) {
        throw new Error(`${err}`);
      }
    },
  },
  modules: {},
});
