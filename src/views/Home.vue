<template>
  <div>
    <div class="picture">
      <el-carousel :interval="4000" height="400px">
        <el-carousel-item v-for="item in 6" :key="item">
          <img :src="pic[item]" class="image" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="recommend">
      <!-- 热门歌单 -->
      <div class="title">
        <span class="left">热门歌单</span>
        <span class="right">更多</span>
      </div>
      <div class="song-sheet">
        <el-carousel
          height="260px"
          :interval="500000"
          :autoplay="false"
          class="song-window"
          indicator-position="outside"
        >
          <el-carousel-item v-for="i in 2" :key="i" class="song-list">
            <div class="song-picture" v-for="item in 5" :key="item">
              <img :src="musicPic[item + 5 * i - 5]" alt="#" />
              <span>{{message[item+5*i-5]}}</span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="singer">
      <!-- 热门歌手 -->
      <div class="title">
        <span class="left">热门歌手</span>
        <span class="right">更多</span>
      </div>
      <div class="singer-list">
        <div class="host-singer" v-for="i in 5" :key="i">
          <img :src="singerPic[i]" alt />
          <span>{{singer[i]}}</span>
        </div>
      </div>
    </div>
    <!-- 音乐榜单 -->
    <div class="music-list">
      <div class="title">
        <span class="left">热门歌手</span>
        <span class="right">更多</span>
      </div>
      <div class="flex">
        <!-- 飙升榜 -->
        <div class="music-list-all">
          <dl class="music-list-type">
            <dt class="music-list-tap">
              <div class="music-list-pic">
                <img
                  src="https://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100"
                />
              </div>
              <div class="music-list-about">
                <h3>飙升榜</h3>
                <div class="music-list-about-i">
                  <i class="el-icon-star-off"></i>
                  <i class="el-icon-video-play"></i>
                </div>
              </div>
            </dt>
            <dd v-for="item in 10" :key="item">
              <span>{{item}}</span> &nbsp;&nbsp;
              <span>
                <a @click="playMusic1(item)">{{musicName1[item-1]}}</a>
              </span>
            </dd>
          </dl>
        </div>
        <!-- 新歌榜 -->
        <div class="music-list-all">
          <dl class="music-list-type">
            <dt class="music-list-tap">
              <div class="music-list-pic">
                <img src="https://p4.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg" />
              </div>
              <div class="music-list-about">
                <h3>新歌榜</h3>
                <div class="music-list-about-i">
                  <i class="el-icon-star-off"></i>
                  <i class="el-icon-video-play"></i>
                </div>
              </div>
            </dt>
            <dd v-for="item in 10" :key="item">
              <span>{{item}}</span> &nbsp;&nbsp;
              <span @click="playMusic2(item)">
                <a >{{musicName2[item-1]}}</a>
              </span>
            </dd>
          </dl>
        </div>
        <!-- 新歌榜 -->
        <div class="music-list-all">
          <dl class="music-list-type">
            <dt class="music-list-tap">
              <div class="music-list-pic">
                <img src="https://p3.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg" />
              </div>
              <div class="music-list-about">
                <h3>原创榜</h3>
                <div class="music-list-about-i">
                  <i class="el-icon-star-off"></i>
                  <i class="el-icon-video-play"></i>
                </div>
              </div>
            </dt>
            <dd v-for="item in 10" :key="item">
              <span>{{item}}</span> &nbsp;&nbsp;
              <span @click="playMusic3(item)">
                <a>{{musicName3[item-1]}}</a>
              </span>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      activeIndex: "1",
      src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      pic: "",
      musicPic: "",
      message: [],
      singer: [],
      singerPic: [],
      musicName1: [],
      musicName2: [],
      musicName3: [],
      url1: [],
      url2: [],
      url3: [],
      musicUrl: [],
    };
  },
  mounted() {
    //调用获取轮播图方法
    this.getNewsPicture();
    //获取热门歌单
    this.getRecommend();
    this.getHostSinger();
    this.getToplist1();
    this.getToplist2();
    this.getToplist3();
    //获取音乐地址
    // this.getmusicUrl();
  },
  methods: {
    //点击方法
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //获取轮播图片
    getNewsPicture() {
      this.axios
        .post("http://localhost:3000/homepage/block/page")
        .then((response) => {
          // console.log(response.data.data.blocks[0].extInfo.banners[1].pic);
          let pictrues = [];
          for (var i = 1; i < 8; i++) {
            pictrues.push(response.data.data.blocks[0].extInfo.banners[i].pic);
          }
          // console.log(pictrues);
          this.pic = pictrues;
        })
        .catch(() => {});
    },
    //获取热门歌单
    getRecommend() {
      var limit = 10;
      this.axios
        .post("http://localhost:3000/personalized", limit)
        .then((res) => {
          // console.log(res.data.result);
          let picture = [];
          let pic = [];
          for (let i = 0; i < 11; i++) {
            picture.push(res.data.result[i].picUrl);
          }
          for (let i = 0; i < 11; i++) {
            pic.push(res.data.result[i].name);
          }
          // console.log(pic);
          this.musicPic = picture;
          this.message = pic;
        })
        .catch(() => {
          console.log("获取热门歌单失败");
        });
    },
    //获取热门歌手
    getHostSinger() {
      var type = 1;
      this.axios
        .post("http://localhost:3000/toplist/artist", type)
        .then((res) => {
          // console.log(res.data.list.artists[0].img1v1Url);
          let singer = [];
          let singerName = [];
          // let singerName = [];
          for (let i = 0; i < 6; i++) {
            singer.push(res.data.list.artists[i].img1v1Url);
          }
          for (let i = 0; i < 6; i++) {
            singerName.push(res.data.list.artists[i].name);
          }
          // console.log(pic);
          // this.musicPic = picture;
          this.singerPic = singer;
          this.singer = singerName;
        })
        .catch(() => {});
    },
    //获取榜单
    //飙升榜
    getToplist1() {
      this.axios
        .post("http://localhost:3000/top/list", { id: 19723756 })
        .then((res) => {
          // console.log(res.data.playlist.tracks[0].name);
          let name = [];
          let url = [];
          for (let i = 0; i < 10; i++) {
            name.push(res.data.playlist.tracks[i].name);
          }
          for (let i = 0; i < 11; i++) {
            url.push(res.data.playlist.tracks[i].id);
          }
          this.musicName1 = name;
          this.$store.state.musicID1=url;
        });
    },
    //新歌榜
    getToplist2() {
      this.axios
        .post("http://localhost:3000/top/list", { id: 3779629 })
        .then((res) => {
          // console.log(res.data.playlist.tracks[0]);
          let name = [];
          let url = [];
          for (let i = 0; i < 10; i++) {
            name.push(res.data.playlist.tracks[i].name);
          };
          for (let i = 0; i < 10; i++) {
            url.push(res.data.playlist.tracks[i].id);
          };
          this.musicName2 = name;
          this.$store.state.musicID2=url;
        });
    },
    //原创榜
    getToplist3() {
      this.axios
        .post("http://localhost:3000/top/list", { id: 2884035 })
        .then((res) => {
          // console.log(res.data.playlist.tracks[0].name);
          let name = [];
          let url = [];
          for (let i = 0; i < 10; i++) {
            name.push(res.data.playlist.tracks[i].name);
            url.push(res.data.playlist.tracks[i].id);
          }
          this.musicName3 = name;
          this.$store.state.musicID3=url;
        });
    },
    //确认并传递点击音乐ID
    playMusic1(i) {
      this.$store.state.music=this.$store.state.musicID1[i];
    },
    playMusic2(i) {
      this.$store.state.music=this.$store.state.musicID1[i];
    },
    playMusic3(i) {
      this.$store.state.music=this.$store.state.musicID1[i];
    },
    
  },
};
</script>
<style scoped lang='scss'>
* {
  margin: 0;
  padding: 0;
}

.picture {
  width: 1200px;
  margin: 40px auto;
  text-align: center;
  // background-color: aquamarine;
}
.image {
  max-width: 100%;
  max-height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: transparent;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: transparent;
}
// 热门推荐
.recommend {
  width: 1200px;

  margin: 0 auto;
  // background-color: aquamarine;
}
.title {
  height: 60px;
  position: relative;
}
.title .left {
  line-height: 60px;
  font-size: 32px;
}
.title .right {
  font-size: 14px;
  line-height: 60px;
  color: #ccc;
  position: absolute;
  right: 5px;
}
.song-sheet {
  width: 1200px;
}
.recommend .song-sheet {
  .song-list {
    display: flex;
    justify-content: space-between;
  }
  .song-picture {
    width: 220px;
    height: 220px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .song-picture span {
    padding: 0 1px;
    display: block;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
//热门歌手
.singer {
  width: 1200px;
  margin: 0 auto;
}
.singer-list {
  display: flex;
  justify-content: space-between;
}

.singer .host-singer {
  width: 200px;
  margin: 10px 0;
}
.singer .host-singer img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.singer .host-singer span {
  display: block;
  text-align: center;
}
// 音乐榜单
.flex {
  display: flex;
  justify-content: center;
}
.music-list {
  width: 1200px;
  height: 800px;
  margin: 0 auto;
}
.music-list-pic {
  width: 150px;
  position: relative;
  // background-color: aqua;
  img {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 30px;
    left: 40px;
  }
}
.music-list-about {
  width: 200px;
  position: relative;
  // background-color: chartreuse;
  h3 {
    position: absolute;
    top: 50px;
    left: 10px;
  }
  .music-list-about-i {
    position: absolute;
    top: 50px;
    left: 10px;
    i {
      display: block;
      margin: 30px 5px 0 0;
    }
  }
}
.music-list-type {
  width: 350px;
  position: relative;
  border: 1px solid #ccc;
  // background-color: red;
  dd {
    height: 40px;
    padding-left: 30px;
    line-height: 40px;
    // background-color: #475669;
  }
}
.music-list-type::-webkit-scrollbar {
  display: none;
}
.music-list-type dd:nth-child(2n) {
  background-color: #e8e8e8;
}
.music-list-type dd:nth-child(2n + 1) {
  background-color: #f4f4f4;
}
.music-list-tap {
  height: 160px;
  display: flex;
  top: 0;
  left: 0;
  background-color: #f4f4f4;
  .music-list-about-i {
    display: flex;
  }
}
</style>