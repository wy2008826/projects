import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);


//state
var state={
  stocksIsPlain:false,
  curStock:undefined,
  stocks:[]
};


//mutations:mutations
var mutations={
    SET_STOCKS:function(state,payload) {
      state.stocks=payload;
    },
    SET_CURSTOCK:function(state,payload){
      state.curStock=payload;
    },
    TOGGLE_STOCKS:function(state,payload){
      state.stocksIsPlain=!state.stocksIsPlain;
    }
};

var actions={
    setStocks:function(context,payload){
      context.commit('SET_STOCKS',payload);
      context.commit('SET_CURSTOCK',payload[0]);
    },
    setCurStock:function(context,payload){
      context.commit('SET_CURSTOCK',payload);
    },
    toggleStocks:function(context,payload){
      context.commit('TOGGLE_STOCKS',!state.stocksIsPlain);
    }
}


//store
var store=new Vuex.Store({
	state:state,
	mutations:mutations,
  actions:actions
});

export default store;
