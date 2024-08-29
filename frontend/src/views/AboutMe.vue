<template>
  <v-row class="about">
    <v-col cols="12"><img src="../../assets/self.png"></v-col>
    <v-col cols="12">
      <TextToSpeech title="About"
        text="My name is Kwan Ho Tako Cheung, and I am a software engineer with a passion for creating meaningful impact in my community and the world around me." />
    </v-col>
    <v-col cols="12">
      <TextToSpeech title="Algorithm"
        text="Life, to me, is like a game. I enjoy the challenge that games provide — the way they compel you to think strategically and creatively. The more a game makes you think, the better it is. While every game eventually comes to an end, algorithms do not. They represent endless possibilities, which is one reason I'm so passionate about coding. It is the ever-evolving nature of algorithms that continuously fuels my curiosity and drive." />
    </v-col>
    <v-col cols="12">
      <TextToSpeech title="Hardware and Software"
        text="I bring a balance of stability and innovation to any team. I am organized and detail-oriented when it comes to execution — understanding that every action needs a well-thought-out plan and every plan requires structured details. At the same time, I am adaptable and creative when innovation is needed. Innovation thrives on flexibility, and flexibility requires an open mind. I embody both qualities, depending on the needs of the moment." />
    </v-col>
    <v-col cols="12">
      <TextToSpeech title="My Skills"
        text="My technical skills were honed through education and sharpened by hands-on practice. I've learned that while programming languages can be mastered with repetition,effective communication requires active listening and empathy. Listening is the key to successful communication, and communication is the foundation of leadership." />
    </v-col>
    <v-col cols="12">
      <TextToSpeech title="Stability and Innovation"
        text="I bring a balance of stability and innovation to any team. I am organized and detail-oriented when it comes to execution — understanding that every action needs a well-thought-out plan and every plan requires structured details. At the same time, I am adaptable and creative when innovation is needed. Innovation thrives on flexibility, and flexibility requires an open mind. I embody both qualities, depending on the needs of the moment." />
    </v-col>
    <v-col cols="12">
      <h3>Why Hire Me?</h3>
      <WordByWord
        text="If you are looking for a passionate, skillful, and persistent employee who is eager to make a difference, I would love to connect." />
      <p>Email me: <a
          href="mailto:tako520cn@gmail.com?Subject=Job&nbspOpportunity&body=I have a great opportunity for you!">tako520cn@gmail.com</a>.
      </p>
      <p>Call me: <a href="tel:919-410-7738">919-410-7738</a>.
      </p>
      <WordByWord
        text="And if you're still unsure about my dedication and versatility, feel free to email and call me at the same time." />
    </v-col>
  </v-row>
</template>
<script>
import WordByWord from '../components/TextAnimation/WordByWord.vue'
import TextToSpeech from '../components/TextAnimation/TextToSpeech.vue'
export default {
  name: 'about-me',
  components: {
    WordByWord,
    TextToSpeech
  }
}
</script>
<style></style>
