import { createStore } from "vuex";
import data from "./modules/data";
import app from "./modules/app";
import user from "./modules/user";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {

  },
  modules: {
    data,
    app,
    user
  },
});
