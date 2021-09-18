import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //音乐ID-Home
        musicID1: [],
        musicID2: [],
        musicID3: [],
        music: '',
        //音乐图片
        musicpic: '',
        //音乐播放栏开关
        musicopen: false,
    },
    mutations: {},
    actions: {},
    modules: {},
});