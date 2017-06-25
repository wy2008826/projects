import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);


//state
var state={
  stocksIsPlain:false,
  curStockIndex:0,
  stocks:[]
};


//mutations:mutations
var mutations={
    SET_STOCKS:function(state,payload) {
      state.stocks=payload;
    },
    SET_CURSTOCK_INDEX:function(state,payload){
      state.curStockIndex=payload;
    },
    TOGGLE_STOCKS:function(state,payload){
      state.stocksIsPlain=!state.stocksIsPlain;
    }
};

var actions={
    setStocks:function(context,payload){
      context.commit('SET_STOCKS',payload);
      context.commit('SET_CURSTOCK_INDEX',0);
    },
    setCurStockIndex:function(context,payload){
      context.commit('SET_CURSTOCK_INDEX',payload||0);
    },
    toggleStocks:function(context,payload){
      context.commit('TOGGLE_STOCKS',!state.stocksIsPlain);
    }
}


//store
const store=new Vuex.Store({
	state:state,
	mutations:mutations,
  actions:actions
});

export default store;
