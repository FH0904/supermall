import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

const state =  {
  productList:[],
  all:false,
  isName:true,
  userName:''
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
