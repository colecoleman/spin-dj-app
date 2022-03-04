<template>
  <base-card :skeleton="['title']" svg="icon">
    <template v-slot:content>
      <div id="contact-card">
        <div class="contact-card-half">
          <div class="indented-item">
            <p class="skeleton"></p>
          </div>
          <div class="indented-item">
            <p class="skeleton"></p>
          </div>
          <div class="indented-item">
            <p class="skeleton"></p>
          </div>
          <div class="indented-item">
            <p class="skeleton"></p>
          </div>
        </div>
        <div class="contact-card-half">
          <div class="indented-item">
            <p class="skeleton"></p>
          </div>
          <div class="indented-item">
            <p class="skeleton"></p>
          </div>
          <div class="indented-item">
            <p class="skeleton"></p>
          </div>
          <div class="indented-item">
            <p class="skeleton"></p>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<style scoped>
p,
h5 {
  margin: 5px;
}

.indented-item {
  text-align: left;
  margin: 20px 4px;
}

.skeleton .indented {
  text-align: right;
}

.skeleton {
  height: 9pt;
  width: 100px;
  background-color: var(--textColor);
}

#contact-card {
  display: flex;
  flex-direction: row;
}
.contact-card-half {
  width: 45%;
}
</style>
