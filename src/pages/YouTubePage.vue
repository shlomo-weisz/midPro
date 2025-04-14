<template>
  <div>
    <h1>תחליף אלטרנטיבי לשיבושים הזמניים ביוטיוב בנטפרי</h1>
    <div class="input-container">
      <input
        type="text"
        v-model="youtubeLink"
        placeholder="הכנס קישור לסרטון YouTube או פלייליסט"
      />
      <button @click="loadVideo">הפעל סרטון</button>
    </div>
    <div v-if="videoId" class="video-container">
      <iframe
        :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=1`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YouTubePage',
  data() {
    return {
      youtubeLink: '',
      videoId: null,
      playlistId: null,
    };
  },
  methods: {
    loadVideo() {
      const videoIdMatch = this.youtubeLink.match(
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/
      );
      const playlistIdMatch = this.youtubeLink.match(/(?:list=)([^&]+)/);

      this.videoId = videoIdMatch ? videoIdMatch[1] || videoIdMatch[2] : null;
      this.playlistId = playlistIdMatch ? playlistIdMatch[1] : null;

      if (!this.videoId) {
        alert('קישור לא תקין. אנא נסה שוב.');
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #ff0000;
  text-align: center;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

input {
  width: 60%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 150px);
}

iframe {
  width: 800px; /* רוחב סטנדרטי של יוטיוב */
  height: 450px; /* גובה סטנדרטי של יוטיוב */
  border: none;
}
</style>