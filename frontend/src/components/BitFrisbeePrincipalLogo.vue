<template>
  <div class="this">
    <div class="h1">
      <a href="/" class="hook">
        <img src="../assets/logo.png" class="logo" alt="bit frisbee logo" />
        <span class="title">Bit Frisbee</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subtitle: String,
  },
};
</script>

<style scoped>
.this img {
  width: 200px;
}
.title {
  margin-left: 10px;
  color: #ff3700;
  font-size: 50px;
}
.hook {
  text-decoration: none;
}
.subtitle{
  color:black;
  font-size: 14px;
  font-weight: 400;
  position: fixed;
  transform: translate(-85px,110px);
  width: 100%;
}
@media only screen and (max-width: 470px) {
  .this img{
    width: 150px;
  }
  .title{
    font-size: 40px;
  }
  .subtitle{
    transform: translate(-85px,90px);
  }
}

@media only screen and (max-width: 373px) {
  .this img{
    width: 80px;
  }
  .title{
    font-size: 28px;
    margin-left: 5px;
  }
  .subtitle{
    transform: translate(-60px,50px);
    font-size: 11px;
  }
}
</style>