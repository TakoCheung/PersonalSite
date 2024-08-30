<template>
  <div class="App-header">
    <div class="center-con">
      <h3 class="h3">{{props.title}}</h3>
      <div :class="['round', isMute ? 'on' : '']" @click="handleMuteUnmute">
        <div :class="['speaker', isMute ? 'on' : '']">
          <div id="mute" class="mute"></div>
          <span></span>
        </div>
      </div>
    </div>
    <WordByWord
      :text="text"
      :animationDuration="0.5"
      :delayBetweenWords="0.2"
    />
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import WordByWord from './WordByWord.vue';
const props = defineProps({
  text: String,
  title: String,
  animationDuration: {
    type: Number,
    default: 0.5,
  },
  delayBetweenWords: {
    type: Number,
    default: 0.2,
  },
});
const isMute = ref(true);
const text = ref(props.text);

const handleMuteUnmute = (e) => {
  e.preventDefault();
  e.stopPropagation();
  isMute.value = !isMute.value;
  handleSpeak(text.value);
};

const handleSpeak = (text) => {
  if (!window.speechSynthesis) {
    return; // Browser does not support speech synthesis
  }
  if (!isMute.value) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = window.speechSynthesis.getVoices().filter(v=>v.lang=='en-US'&&v.name.match(/Eddy/))[0];
    window.speechSynthesis.speak(utterance);
  } else {
    window.speechSynthesis.cancel();
  }
};
</script>

<style scoped>
body {
  background: #000;
}

.center-con {
  display: flex;
  /* float: ; */
  /* margin-right:10px; */
  /* position: sticky; */
  /* top:2px; */
  align-items: left;
  justify-content: left;
}

.center-con .h3{
  float:left;
  margin-right:10px;
  position: relative;
  top:5px;
}

.round {
  position: relative;
  border: 2px solid rgba(77, 67, 32, 50%);
  width: 38px;
  height: 38px;
  border-radius: 100%;
}

.round.on {
  border-color: rgba(77, 32, 37, 50%);
}

/* ---- */
.speaker {
  height: 38px;
  width: 38px;
  position: absolute;
  overflow: hidden;
  margin: 2px;
}
.speaker span {
  display: block;
  width: 7px;
  height: 8px;
  background: rgba(77, 67, 32, 50%);
  margin: 11px 0 0 2px;
}
.speaker span:after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent rgba(77, 67, 32, 50%) transparent transparent;
  border-width: 10px 12px 10px 15px;
  left: -13px;
  top: 5px;
}
.speaker span:before {
  transform: rotate(45deg);
  border-radius: 0 50px 0 0;
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  border-style: double;
  border-color: rgba(77, 67, 32, 50%);
  border-width: 7px 7px 0 0;
  left: 18px;
  top: 11px;
  transition: all 0.2s ease-out;
}

.speaker:hover span:before {
  transform: scale(0.8) translate(-17px, 0) rotate(42deg);
}
.speaker:hover .mute {
  opacity: 1;
  transform: scale(1);
}

.speaker.on .mute {
  opacity: 1;
  transform: scale(1);
}
.speaker.on span:before {
  transform: scale(0.8) translate(-17px, 0) rotate(42deg);
}
.speaker.on:hover .mute {
  transform: rotate(180deg);
}

.speaker.on:hover span:before {
  transform: scale(1) translate(0px, 0) rotate(42deg);
  border-color: rgba(77, 67, 32, 50%);
}
.speaker.on:hover .mute {/*rgba(77, 32, 37, 50%)*/
  opacity: 0;
  transform: scale(0.3);
}

.mute {
  position: absolute;
  width: 15px;
  height: 15px;
  opacity: 0;
  left: 15px;
  top: 7px;
  transform: scale(0.3);
  transition: all 0.2s ease-out;
}

.mute:before,
.mute:after {
  position: absolute;
  margin-left: 5px;
  content: " ";
  height: 15px;
  width: 2px;
  background-color: rgba(77, 32, 37, 50%);
}
.on .mute:before,
.on .mute:after {
  position: absolute;
  margin-left: 5px;
  content: " ";
  height: 15px;
  width: 2px;
  background-color: rgba(77, 32, 37, 50%);
}
.mute:before {
  transform: rotate(45deg);
}
.mute:after {
  transform: rotate(-45deg);
}

/* ----- */
footer {
  position: fixed;
  bottom: 20px;
  font-family: Arial, Helvetica;
  font-size: 12px;
  color: rgba(220, 220, 220, 100%);
}

footer img {
  margin-left: 20px;
}
footer span {
  position: relative;
  bottom: 4px;
}
a {
  text-decoration: none;
  color: rgba(220, 220, 220, 100%);
}
</style>
