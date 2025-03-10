<template>
  <ProgressIndicator />
  <v-container>
    <ChatWindow />
    <div id="app">
      <nav class="main-nav">
        <Burger />
        <router-view />
        <Sidebar>
          <ul class="sidebar-panel-nav">
            <li @click="toggle">
              <router-link to="/About">About</router-link>
            </li>
            <li @click="toggle">
              <router-link to="/Education">Education</router-link>
            </li>
            <li @click="toggle">
              <router-link to="/Exprience">Exprience</router-link>
            </li>
            <li>
              <ul class="demo-menu" @click="toggleDemoMenu">
                <span v-if="!demoExpanded">Demo▼</span>
                <span v-else>Demo▲</span>
              </ul>
              <ul v-if="demoExpanded" class="sub-menu">
                <li @click="toggle">
                  <router-link to="/Demo">Movment AI</router-link>
                </li>
                <li @click="toggle">
                  <router-link to="/QRcode">QR Code</router-link>
                </li>
                <li @click="toggle">
                  <router-link to="/Converter">Converter</router-link>
                </li>
                <li @click="toggle">
                  <router-link to="/SolarSystem">Solar System</router-link>
                </li>
              </ul>
            </li>
            <li @click="toggle">
              <router-link to="/Certs">Certificates</router-link>
            </li>
            <li @click="toggle">
              <router-link to="/Resume">Resume</router-link>
            </li>
          </ul>
        </Sidebar>
      </nav>
    </div>
  </v-container>
</template>

<script>
import Burger from '@/components/Menu/burger-bar.vue';
import Sidebar from '@/components/Menu/side-bar.vue';
import ProgressIndicator from "@/components/ProgressIndicator";
import ChatWindow from '@/components/Chat/ChatWindow.vue';

export default {
  name: 'app',
  components: {
    Sidebar,
    Burger,
    ProgressIndicator,
    ChatWindow
  },
  data() {
    return {
      demoExpanded: false,
    }
  },
  methods: {
    toggle() {
      this.$store.commit('toggleNav');
    },
    toggleDemoMenu() {
      this.demoExpanded = !this.demoExpanded;
    },
    visited() {
      fetch("https://api.ipify.org?format=json", {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          fetch(`https://ipinfo.io/${data.ip}/json?token=${process.env.IP_TOKEN}`, {
            method: 'GET'
          })
          .then(response => response.json())
          .then(data => { this.$store.commit('sendMessage', data); })
        })
    }
  },
  beforeMount() {
    this.visited()
  }
}
</script>

<style>
html {
  height: 100%;
  overflow: auto;
}

/* Sub-menu styling */
.sub-menu {
  list-style-type: none;
  padding-left: 1rem;
  margin-top: 0.5rem;
  color: #fff;
}

/* Ensure sub-menu links are white */
.sub-menu li a {
  color: #fff;
  text-decoration: none;
  font-size: 1.3rem;
}

.demo-menu {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  padding-bottom: 0.5em;
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* Styling for caret icons */
.caret {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  user-select: none;
}

body {
  border: 0;
  margin: 0;
  padding: 0;
  font-family: 'Lato';
  height: 100%;
  background: rgba(32, 77, 72, 50%)
    /* linear-gradient(45deg, rgba(101,31,87,1) 0%, rgba(225,113,87,5) 48%, rgba(249,248,113,1) 100%); */
}

.logo {
  align-self: center;
  color: #fff;
  font-weight: bold;
  font-family: 'Lato'
}

.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}

ul.sidebar-panel-nav {
  list-style-type: none;
}

ul.sidebar-panel-nav>li>a {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  display: block;
  padding-bottom: 0.5em;
}

li:hover,
li.router-link-active,
li.router-link-exact-active {
  background-color: #000000;
  text-decoration: underline;
}

/* play with some lines below */
#progress-container-el {
  /* background */
  background-color: transparent !important;
}

#progress-el {
  /* progress bar */
  background-color: #4285f4 !important;
}

.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;
}

/* remove blue outline */
button:focus {
  outline: 0;
}

.burger-button {
  position: relative;
  height: 30px;
  width: 32px;
  display: block;
  z-index: 9;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform .6s cubic-bezier(.165, .84, .44, 1);
}

.burger-bar {
  background-color: #130f40;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 2px;
  width: auto;
  margin-top: -1px;
  transition: transform .6s cubic-bezier(.165, .84, .44, 1), opacity .3s cubic-bezier(.165, .84, .44, 1), background-color .6s cubic-bezier(.165, .84, .44, 1);
}

.burger-bar--1 {
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
}

.burger-bar--2 {
  transform-origin: 100% 50%;
  transform: scaleX(.8);
}

.burger-button:hover .burger-bar--2 {
  transform: scaleX(1);
}

.no-touchevents .burger-bar--2:hover {
  transform: scaleX(1);
}

.burger-bar--3 {
  transform: translateY(6px);
}

#burger.active .burger-button {
  transform: rotate(-180deg);
}

#burger.active .burger-bar {
  background-color: #fff;
}

#burger.active .burger-bar--1 {
  transform: rotate(45deg)
}

#burger.active .burger-bar--2 {
  opacity: 0;
}

#burger.active .burger-bar--3 {
  transform: rotate(-45deg)
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s
}

.sidebar-backdrop {
  background-color: rgba(0, 0, 0, .5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}

.sidebar-panel {
  overflow-y: auto;
  background-color: #130f40;
  opacity: .5;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 8;
  padding: 3rem 20px 2rem 20px;
  width: 300px;
}

.chat-panel {
  overflow-y: auto;
  background-color: white;
  /* opacity: .9; */
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 7;
  padding: 3rem 20px 2rem 20px;
  width: 300px;
}

.chatButton {
  display: block;
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;

}

.progress-indicator {
  height: 5px;
  background: #42b983;
}

.progress-indicator-wrapper {
  position: fixed;
  height: 5px;
  background-color: #eee;
  width: 100%;
  top: 0px;
  z-index: 100;
}

.sc-chat-window.opened {
  z-index: 999;
}
</style>
