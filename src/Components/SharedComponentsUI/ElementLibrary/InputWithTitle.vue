<template>
  <div :class="error ? 'error ' + type : type" class="input-wrapper">
    <!-- <p>{{ title }}</p> -->
    <div v-if="title" class="title">
      <div :class="title.length < 25 ? 'hidden' : 'tooltip'">
        <span class="tooltip-text"
          ><p>
            {{ title }}
          </p></span
        >
      </div>
      <p
        v-if="title"
        :class="title.length < 25 ? 'title-text' : 'hoverable title-text'"
      >
        {{ title }}
      </p>
    </div>
    <textarea
      v-if="type === 'textarea'"
      v-model="value"
      :placeholder="placeholder"
      @blur="blur()"
    ></textarea>
    <select v-model="value" v-else-if="type === 'select'">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option"
        :selected="index === 0 ? 'selected' : ''"
      >
        <p>
          {{
            option.display
              ? option.display
              : optionDisplay
              ? option[optionDisplay]
              : option === true
              ? "Yes"
              : option === "00"
              ? option
              : option == false
              ? "No"
              : option
          }}
        </p>
      </option>
    </select>
    <input
      :type="type"
      v-else
      v-model="value"
      :placeholder="placeholder"
      @blur="blur()"
    />
  </div>
</template>
<script>
export default {
  computed: {
    value: {
      get() {
        return this.inputValue;
      },
      set(val) {
        return this.$emit("input", val);
      },
    },
  },
  methods: {
    blur() {
      this.$emit("blur");
    },
  },
  emits: ["input", "blur", "keydown"],
  props: [
    "type",
    "title",
    "error",
    "placeholder",
    "inputValue",
    "options",
    "optionDisplay",
  ],
};
</script>
<style scoped>
.input-wrapper {
  /* width: auto; */
  /* min-width: 125px; */
  max-width: 300px;
  height: fit-content;
  border: 1px solid var(--cardOutline);
  background-color: var(--foregroundColor);
  border-radius: 5px;
  position: relative;
  padding: 10px;
  margin: 10px 10px 10px 10px;
}

.error {
  border: 1px solid red;
}

input,
textarea,
select {
  outline: none;
  border: none;
  width: 100%;
  background: none;
  max-width: 100%;
  height: 100%;
}

.textarea {
  height: 50%;
}

.title {
  margin: 0;
  top: -15px;
  /* padding: 0 5px; */
  position: absolute;
}

p {
  font-family: roboto, sans-serif;
  font-size: 7pt;
  font-weight: 600;
  border-radius: 3px;
  text-transform: uppercase;
  /* position: absolute; */
}

.title-text {
  background-color: var(--foregroundColor);
  max-width: 150px;
  padding: 0 3px;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.hoverable {
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}
.hidden {
  display: none;
}
.title .tooltip {
  visibility: hidden;
  width: 200px;
  background-color: var(--foregroundColor);
  color: var(--textColor);
  border: 1px solid var(--cardOutline);
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  top: -30px;
  z-index: 1;
}

.title:hover .tooltip {
  visibility: visible;
}
</style>
