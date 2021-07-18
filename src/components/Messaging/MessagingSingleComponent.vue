<template>
  <div id="messaging-wrapper">
    <div id="contact-identification">
      <p @click="navigateToEventPage(contact.id)">
        {{ contact.firstName + " " + contact.lastName }}
      </p>
    </div>
    <div class="messages-container">
      <div class="message received">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          temporibus unde illum. Molestiae inventore a quasi cumque quaerat
          voluptate eos amet delectus similique, ducimus libero dolorum
          doloribus ratione? Blanditiis, aut?
        </p>
      </div>
      <div class="message sent">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sequi
          exercitationem, perferendis dolorem voluptatem alias? Qui est deleniti
          temporibus libero exercitationem perferendis dolorum ea ipsum. Illo
          molestias temporibus qui animi.
        </p>
      </div>
      <div class="message sent">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          alias earum sapiente provident adipisci quae expedita eos mollitia,
          illo natus debitis magni atque eligendi ducimus odit omnis optio
          accusamus totam!
        </p>
      </div>
      <div class="message received">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quaerat
          rerum dignissimos repudiandae necessitatibus cupiditate fuga, labore
          veniam, dolores eligendi voluptas odio quasi. Nam tempore molestias
          hic necessitatibus praesentium nulla!
        </p>
      </div>
      <div class="message sent">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          aliquam accusantium sunt fugiat odit error libero ea aspernatur ipsam
          voluptas, eaque aliquid accusamus a consequatur dolore asperiores
          nostrum reprehenderit quis.
        </p>
      </div>
    </div>
    <div class="input-field">
      <input type="text" placeholder="Start typing..." />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
      >
        <path
          id="Icon_awesome-arrow-alt-circle-down"
          data-name="Icon awesome-arrow-alt-circle-down"
          d="M28,14A14,14,0,1,1,14,0,14,14,0,0,1,28,14ZM11.516,7.452V14h-4a.678.678,0,0,0-.48,1.157L13.52,21.61a.671.671,0,0,0,.954,0l6.486-6.452A.677.677,0,0,0,20.481,14h-4V7.452a.679.679,0,0,0-.677-.677H12.194A.679.679,0,0,0,11.516,7.452Z"
          transform="translate(28 28) rotate(180)"
          fill="#fff"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToEventPage(id) {
      this.$router.push("/clients/" + id);
    },
  },
  props: ["contact", "id", "icon"],
};
</script>

<style scoped>
#messaging-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
}
#contact-identification {
  position: absolute;
  background-color: black;
  z-index: 5;
  padding-right: 10px;
  top: -10px;
  border-radius: 0 0 10px 0;
  font-weight: 600;
  cursor: pointer;
}

.messages-container {
  height: 85%;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column-reverse;
}

.message {
  max-width: 60%;
  padding: 0px 15px;
  margin: 10px;
  text-align: left;
  font-size: 10pt;
}

.received {
  align-self: flex-start;
  background-color: aquamarine;
  color: black;
  border-radius: 15px 15px 15px 2px;
}

.sent {
  align-self: flex-end;
  background-color: white;
  color: black;
  border-radius: 15px 15px 2px 15px;
}

.input-field {
  height: 15%;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  display: flex;
  flex-direction: row;
}

input {
  width: 95%;
  border-radius: 10px;
  height: 20px;
  font-family: Montserrat, sans-serif;
  padding-left: 20px;
}

input:focus {
  outline: none;
}

svg {
  margin-left: 10px;
}
</style>