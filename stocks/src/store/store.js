import Vue from "vue";
import Vuex from "vuex";
import getYMD from 'utils/getYMDHMS.js';
Vue.use(Vuex);


//state
var state={
    user:localStorage.getItem('user')||'',
    stocksIsPlain:false,
    curStock:undefined,
    zixuan:JSON.parse(localStorage.getItem('zixuan'))||{lists:[]},
    stocks:[]
};

const getters = {
    user: (state) => state.user,
    stocksIsPlain: (state) => state.stocksIsPlain,
    curStock: (state) => state.curStock,
    zixuan:(state) => state.zixuan,
    stocks:(state) => state.stocks,
}

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
    },
    ADD_ZIXUAN(state,payload){
        let {code,comment='',name}=payload;

        if(!code){
            return false;
        }
        let {year,month,date,hour,minute,second}=getYMD(new Date());
        month=fullNum(month);
        date=fullNum(date);
        hour=fullNum(hour);
        minute=fullNum(minute);
        second=fullNum(second);
        let time=`${year}-${month}-${date} ${hour}:${minute}:${second}`;

        if(!state.zixuan[code]){
            state.zixuan.lists.push(code);
            state.zixuan[code]={comments:[],time,name};
        }
        comment && state.zixuan[code].comments.push(comment);
        let zixuan_Str=JSON.stringify(state.zixuan);
        localStorage.setItem('zixuan',zixuan_Str);
        Vue.http({
            url:'/api/addZixuan',
            method: 'get',
            params:{
                code,
                name,
                time,
                comment,
                user:state.user
            }
        }).then((res)=>{

        });

    },
    DO_LOGIN(state,payload){
        state.user=payload||'';
        localStorage.setItem('user',payload||'')
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
    },
    addZixuan(context,payload){
        context.commit('ADD_ZIXUAN',payload);
    },
    login(context,payload){
        context.commit('DO_LOGIN',payload);
    }
}

function fullNum(num){
    return num<10?'0'+num:num;
}



//store
var store=new Vuex.Store({
	state,
	mutations,
    actions,
    getters
});

export default store;
