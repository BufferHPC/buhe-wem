<template>
  <div class="link-wrapper">
    <div
      class="video-desc"
      ref="text"
      :style="{
        height: computedPix(height),
        lineHeight: computedPix(lineHeight),
        fontSize: computedPix(fontSize),
        fontWeight: fontWeight,
        color: color,
        padding: coputedPadding,
        marginBottom: computedPix(marginBottom),
        justifyContent: justifyContent
      }"
      @click.stop="playVideo"
    >
      {{ videoDesc }}
      <img ref="playimg" class="playimg" src="../assets/summary_play.png" />
    </div>
    <div class="video-wrapper-mask" v-show="visible">
      <div class="video-wrapper" ref="videoWrapper">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
        <i class="close" @click="close"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "linkVideo",
  data() {
    return {
      visible: false,
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: true,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: "16:9",
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            type: "video/mp4",
            //url地址
            src: require("@/assets/videos/flexpai_cpys.mp4")
          }
        ],
        //你的封面地址
        poster: "",
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: true
        }
      }
    };
  },
  props: {
    videoDesc: {
      type: String,
      default: "这是一个纯文本"
    },
    containerWidth: {
      type: Number,
      default: null
    },
    id: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#000000"
    },
    fontSize: {
      type: String,
      default: "12"
    },
    height: {
      type: String,
      default: "30"
    },
    lineHeight: {
      type: String,
      default: "30"
    },
    marginBottom: {
      type: String,
      default: "0"
    },
    fontWeight: {
      type: String,
      default: "30"
    },
    justifyContent: {
      type: String,
      default: "flex-start"
    },
    paddingT: {
      type: String,
      default: "0"
    },
    paddingL: {
      type: String,
      default: "0"
    },
    src: {
      type: String,
      default: require("@/assets/videos/flexpai_cpys.mp4")
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player; //自定义播放
    },
    coputedPadding() {
      return this.paddingT + "px" + " " + this.paddingL + "px";
    }
  },
  mounted: function() {
    this.reSizeVideo();
    this.reSizeFont();
  },
  watch: {
    src(val) {
      // val = '@/assets/videos/flexpai_zssp.mp4'
      this.playerOptions["sources"][0]["src"] = val;
    }
  },
  methods: {
    playVideo() {
      this.visible = true;
      this.player.play();
    },
    close() {
      this.visible = false;
      this.player.pause();
    },
    computedPix(data) {
      return data + "px";
    },
    reSizeVideo() {
      //   let div = document.getElementsByClassName("app-main-center")[0];
      // console.log(div)
      let fullScreenWidth = document.body.clientWidth;
      let containerWidth = this.containerWidth
        ? this.containerWidth
        : fullScreenWidth;
      //   let deviceWidth = parseInt(getComputedStyle(div).width);
      this.$refs.videoWrapper.style.width = containerWidth - 100 + "px";
    },
    reSizeFont() {
      let div = this.$refs.text;
      let fontSize = parseInt(div.style.fontSize);
      let padding = div.style.padding;
      let fullScreenWidth = document.body.clientWidth;
      let containerWidth = this.containerWidth
        ? this.containerWidth
        : fullScreenWidth;
      let scale = containerWidth / fullScreenWidth;
      div.style.fontSize = Math.round(fontSize * scale) + "px";
      div.style.padding = this.reSizePadding(padding, scale);
      if (containerWidth < 768) {
        this.$refs.playimg.style.width = "16px";
        div.style.lineHeight = "16px";
      }
    },
    reSizePadding(padding, scale) {
      let paddingarr = padding.split(" ");
      return (
        Math.round(parseInt(paddingarr[0]) * scale) +
        "px" +
        " " +
        Math.round(parseInt(paddingarr[1]) * scale) +
        "px"
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.link-wrapper {
  position: relative;
  width: 100%;
  .video-desc {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .playimg {
    float: right;
    width: 45px;
    margin-left: 2px;
  }
  @media screen and (max-width: 768px) {
    .playimg {
      width: 16px;
    }
  }
}
.video-wrapper-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  .close {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: url(../assets/fancybox_sprite.png) 0 0 no-repeat;
    background-size: 38px;
  }
  .video-wrapper {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    //   max-width: 800px;
  }
}
</style>
