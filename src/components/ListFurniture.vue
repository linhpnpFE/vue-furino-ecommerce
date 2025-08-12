<script setup>
import {reactive} from "vue";

const imageFurniture= reactive([
  {
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    image: 'https://images.unsplash.com/photo-1648077793611-1ddf7341fe14?q=80&w=645&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    image: 'https://images.unsplash.com/photo-1648077793611-1ddf7341fe14?q=80&w=645&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    image: 'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1684508638760-72ad80c0055f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    image: 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  }
])
</script>

<template>
<div class="grid image-grid gap-2 xl:gap-4">
  <div v-for="(item, index) in imageFurniture" :key="index" :class="`image-${index + 1}`">
    <img :src="item.image" alt="imageFurniture" class="size-full object-cover">
  </div>
  <div class="img-null-1"></div>
  <div class="img-null-2"></div>
  <div class="img-null-3"></div>
  <div class="img-null-4"></div>
  <div class="img-null-5"></div>
  <div class="img-null-6"></div>
  <div class="img-null-7"></div>
</div>
</template>

<style scoped>
.image-grid {
  grid-template-areas:
      'img1 img05 img05 img0 img06 img06 img7 img7'
      'img1 img3 img3 img0 img06 img06 img7 img7'
      'img1 img3 img3 img0 img6 img6 img7 img7'
      'img1 img3 img3 img5 img6 img6 img7 img7'
      'img2 img2 img4 img5 img8 img9 img9 img03'
      'img2 img2 img4 img5 img8 img9 img9 img03'
      'img2 img2 img4 img02 img8 img9 img9 img03'
      'img2 img2 img07 img02 img8 img04 img04   img03';
  grid-template-columns: 1fr 1fr 2.5fr 3fr 1fr 1fr 1fr 0.5fr;
  grid-template-rows: 20px 5px 10px 60px 60px 5px 20px 15px;
  @media (min-width: 1024px) {
    grid-template-rows: 60px 30px 30px 150px 150px 30px 40px 50px;
  }
}

.image-1 {
  grid-area: img1;
}
.image-2 {
  grid-area: img2;
}
.image-3 {
  grid-area: img3;
}
.image-4 {
  grid-area: img4;
}
.image-5 {
  grid-area: img5;
}
.image-6 {
  grid-area: img6;
}
.image-7 {
  grid-area: img7;
}
.image-8 {
  grid-area: img8;
}
.image-9 {
  grid-area: img9;
}
.img-null-1 {
  grid-area: img0;
}
.img-null-2 {
  grid-area: img02;
}
.img-null-3 {
  grid-area: img03;
}
.img-null-4 {
  grid-area: img04;
}
.img-null-5 {
  grid-area: img05;
}
.img-null-6 {
  grid-area: img06;
}
.img-null-7 {
  grid-area: img07;
}
</style>