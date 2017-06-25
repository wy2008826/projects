import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);


//state
const state={
  stocksIsPlain:false,
  curStockIndex:0,
  stocks:[]
};


//mutations
const mutations={
    SET_STOCKS(state,payload) {
      state.stocks=payload;
    },
    SET_CURSTOCK_INDEX(state,payload){
      state.curStockIndex=payload;
    },
    TOGGLE_STOCKS(state,payload){
      state.stocksIsPlain=!state.stocksIsPlain;
    }
};

const actions={
    setStocks(context,payload){
      context.commit('SET_STOCKS',payload);
      context.commit('SET_CURSTOCK_INDEX',0);
    },
    setCurStockIndex(context,payload){
      context.commit('SET_CURSTOCK_INDEX',payload||0);
    },
    toggleStocks(context,payload){
      context.commit('TOGGLE_STOCKS',payload||0);
    }
}


//store
const store=new Vuex.Store({
	state,
	mutations,
  actions
});

export default store;
