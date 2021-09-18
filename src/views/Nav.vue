<template>
  <div>
    <div class="nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item>
          <div class="block">
            <el-image :src="src"></el-image>
          </div>
        </el-menu-item>
        <router-link to="/Home">
          <el-menu-item index="1">发现音乐</el-menu-item>
        </router-link>
        <router-link to="/My">
          <el-menu-item index="2">我的音乐</el-menu-item>
        </router-link>
        <el-menu-item index="3">朋友</el-menu-item>
        <el-menu-item index="4">音乐人</el-menu-item>
        <el-menu-item index="5">客户端</el-menu-item>
        <el-menu-item>登录</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
    <div class="playMusic">
      <div class="player">
        <img src="../assets/img/last.png" alt />
        <img src="../assets/img/play.png" alt class="play" />
        <img src="../assets/img/next.png" alt />
      </div>
      <div class="progress">
        <div class="picture" @click="getmusic()">
          <el-image
            style="width: 40px; height: 40px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="fit"
          ></el-image>
        </div>
        <div class="musicAbout">
          <span class="name">{{musicname}}</span>
          <span class="time">{{end}}</span>
          <span class="time">{{start}}/</span>
          <el-slider v-model="value" :show-tooltip="false" input-size="mini" @change="formatTooltip(value)"></el-slider>
        </div>
      </div>
      <div class="function"></div>
      <audio controls autoplay loop id="play" :src="musicUrl"></audio>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      activeIndex: "1",
      src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      musicname: "hello",
      start: "",
      end: "00:00",
      value: 20,
      musicUrl: "",
    };
  },

  mounted() {
    // this.$router.push("/Home");
    this.timer = setInterval(this.newMusicUrl, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    //点击方法
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //进度条同步音乐
    formatTooltip(val) {
      let a = document.querySelector("#play");
      a.currentTime=Math.floor(a.duration*val/100);
      console.log(val);
      return val / 100;
    },
    // musicplay() {
    //   let a = document.querySelector('#play');
    //   a.play();
    // },
    //获取歌曲信息
    getmusic() {
      let ids = this.$store.state.music;
      this.axios
        .post("http://localhost:3000/song/detail", { ids })
        .then((res) => {
          console.log(res);
        });
    },
    // 更新歌曲
    newMusicUrl() {
      let a = document.querySelector("#play");
      this.musicUrl =
        "https://music.163.com/song/media/outer/url?id=" +
        this.$store.state.music +
        ".mp3";
      //更新总时长
      if (Math.floor(a.currentTime) == 0) {
        let b = Math.floor(a.duration / 60);
        let c = Math.floor(a.duration % 60);
        if (c < 10) {
          c = "0" + c;
        }
        this.end = "0" + b + ":" + c;
      };
      //同步进度条
      this.value =Math.floor((a.currentTime/ a.duration)*100);
      // console.log(this.value)
      // console.log(a.currentTime)
      let time = Math.floor(a.currentTime);
      //规范时间格式
      if (time < 60) {
        if (time < 10) {
          time = "0" + time;
        }
        this.start = "00:" + time;
      } else if (time < 120) {
        time -= 60;
        if (time < 10) {
          time = "0" + time;
        }
        this.start = "01:" + time;
      } else if (time < 180) {
        time -= 120;
        if (time < 10) {
          time = "0" + time;
        }
        this.start = "02:" + time - 60;
      } else if (time < 240) {
        time -= 180;
        if (time < 10) {
          time = "0" + time;
        }
        this.start = "03:" + time - 60;
      } else if (time < 300) {
        time -= 240;
        if (time < 10) {
          time = "0" + time;
        }
        this.start = "04:" + time - 60;
      } else if (time < 360) {
        time -= 300;
        if (time < 10) {
          time = "0" + time;
        }
        this.start = "05:" + time - 60;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.block {
  height: 40px;
  width: 80px;
}
.el-menu-demo {
  padding: 0 30%;
  display: flex;
  justify-content: space-around;
}
.playMusic {
  height: 100px;
  background-color: #313131;
  display: flex;
  .play {
    height: 40px;
    width: 40px;
  }
  .musicAbout {
    width: 300px;
    margin-left: 20px;
    .name {
    }
    .time {
      float: right;
    }
  }
}
.progress {
  display: flex;
  span {
    color: white;
  }
}
</style>