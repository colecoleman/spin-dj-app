<template>
  <section id="main-wrapper">
    <base-card>
      <div id="section-wrapper">
        <div id="top-wrapper">
          <div id="heading-div">
            <h1>Add new equipment</h1>
          </div>
        </div>
        <div id="input-div">
          <form>
            <div id="form-div-one">
              <label for="Equipment Name">Equipment Name:*</label><br />
              <input
                type="text"
                name="Equipment Name"
                placeholder="ex: Rane 72"
                v-model="equipmentName"
                :class="{ 'incomplete-field': equipmentNameMissing }"
              /><br />
              <div id="side-by-side-number-div">
                <div class="number-div">
                  <label for="# in a set?"># in a set?:</label><br />
                  <div class="number-wrapper">
                    <div
                      class="increment-spinner increment-spinner-left"
                      @click="setIncrement('minus'), resetSetQuantityFromZero()"
                      @mousedown.prevent=""
                    >
                      <h4>-</h4>
                    </div>
                    <input
                      type="number"
                      name="# in a set?"
                      min="1"
                      v-model="setQuantity"
                      class="incremental-number"
                    />
                    <div
                      class="increment-spinner increment-spinner-right"
                      @click="setIncrement('plus'), resetSetQuantityFromZero()"
                      @mousedown.prevent=""
                    >
                      <h4>+</h4>
                    </div>
                  </div>
                </div>
                <div class="number-div">
                  <label for="quantity-owned"># owned?:</label><br />
                  <div class="number-wrapper">
                    <div
                      class="increment-spinner increment-spinner-left"
                      @click="ownedIncrement('minus')"
                      @mousedown.prevent=""
                    >
                      <h4>-</h4>
                    </div>
                    <input
                      type="number"
                      name="quantity-owned"
                      min="1"
                      v-model="quantityOwned"
                      class="incremental-number"
                    />
                    <div
                      class="increment-spinner increment-spinner-right"
                      @click="ownedIncrement('plus')"
                      @mousedown.prevent=""
                    >
                      <h4>+</h4>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <label for="Description">Description:</label><br />
              <input
                type="text"
                name="Description"
                placeholder="Describe your equipment for your clients to see."
                v-model="itemDescription"
              /><br />
              <label for="Serial Number"> Serial Number:</label><br />
              <input
                type="text"
                name="Serial Number"
                placeholder="123456789ASDFGHJKL"
                v-model="serialNumber"
              /><br />
            </div>
            <div id="form-div-two">
              <label for="Notes">Notes:</label><br />
              <textarea
                name="Notes"
                rows="1"
                placeholder="Put something descriptive here!"
                v-model="notes"
              /><br />
              <label for="Representative Image"> Representative Image:</label
              ><br />
              <input
                type="file"
                style="display: none"
                name="Representative Image"
                @change="onFileSelected"
                ref="fileInput"
                accept="image/jpeg image/png"
              />
              <button type="button" @click="chooseFileFromButton">
                Choose File</button
              ><br />
              <p v-if="selectedFile">
                <img :src="selectedFileUrl" />{{ selectedFile.name }}
              </p>
            </div>
          </form>
        </div>
        <h5 v-if="equipmentNameMissing">Please complete the missing fields</h5>
        <h5 v-if="successfullyUploaded">Successfully Uploaded!</h5>
        <div id="button-div">
          <button
            id="submitButton"
            type="button"
            @click="
              validationCheck();
              submitEquipment();
            "
          >
            Submit
          </button>
          <button id="resetButton" type="button" @click="resetInput()">
            Reset
          </button>
        </div>
      </div>
    </base-card>
  </section>
</template>

<script>
import BaseCard from "../../UI/BaseCard.vue";


export default {
  data() {
    return {
      equipmentName: null,
      setQuantity: 1,
      quantityOwned: 1,
      serialNumber: null,
      itemDescription: null,
      selectedFile: null,
      notes: null,
      equipmentNameMissing: false,
      successfullyUploaded: false,
    };
  },
  computed: {
    selectedFileUrl() {
      return URL.createObjectURL(this.selectedFile);
    },
  },
  methods: {
    chooseFileFromButton() {
      this.$refs.fileInput.click();
      console.log("chooseFileFromButton");
    },
    onFileSelected(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
      console.log(event.target.files[0]);
    },

    resetSetQuantityFromZero() {
      if (isNaN(this.setQuantity)) {
        console.log("Not a number, resetting");
        this.setQuantity = 1;
      }
    },
    resetQuantityOwnedFromZero() {
      if (isNaN(this.quantityOwned)) {
        console.log("Not a number, resetting");
        this.quantityOwned = 1;
      }
    },
    setIncrement(direction) {
      if (direction == "plus") {
        this.setQuantity = parseFloat(this.setQuantity) + 1;
      } else if (direction === "minus") {
        this.setQuantity = parseFloat(this.setQuantity) - 1;
      }
    },
    ownedIncrement(direction) {
      if (direction == "plus") {
        this.quantityOwned = this.quantityOwned + 1;
      } else if (direction === "minus") {
        this.quantityOwned--;
      }
    },
    validationCheck() {
      if (
        this.equipmentName === null ||
        this.equipmentName.trim() === "" ||
        this.equipmentName === undefined
      ) {
        this.equipmentNameMissing = true;
      } else {
        this.equipmentNameMissing = false;
      }
    },

    // submitEquipment() {
    //   if (this.equipmentNameMissing) {
    //     return;
    //   } else {
    //     db.collection("equipment")
    //       .add({
    //         equipmentName: this.equipmentName,
    //         setQuantity: this.setQuantity,
    //         quantityOwned: this.quantityOwned,
    //         serialNumber: this.serialNumber,
    //         itemDescription: this.itemDescription,
    //         notes: this.notes,
    //       })
    //       .then((docRef) => {
    //         const docId = docRef.id;
    //         return docId;
    //       })
    //       .then((docId) => {
    //         if (this.selectedFile === null) {
    //           this.resetInput();
    //           this.successfullyUploaded = true;
    //           return;
    //         } else {
    //           const storageRef = firebase.storage().ref();
    //           const equipmentPhotoRef = storageRef.child(
    //             "equipment/" + docId + ".jpeg"
    //           );
    //           equipmentPhotoRef.put(this.selectedFile).then((snapshot) => {
    //             snapshot.ref
    //               .getDownloadURL()
    //               .then((downloadURL) => {
    //                 console.log("Download available at", downloadURL);
    //                 return downloadURL;
    //               })
    //               .then((downloadURL) => {
    //                 console.log(downloadURL);
    //                 db.collection("equipment")
    //                   .doc(docId)
    //                   .update({ photo: downloadURL })
    //                   .then(console.log("successfully updated"));
    //               })
    //               .then(() => {
    //                 this.resetInput();
    //                 this.$data.successfullyUploaded = true;
    //               });
    //           });
    //         }
    //       });
    //   }
    // },
    resetInput() {
      this.equipmentName = null;
      this.setQuantity = 1;
      this.quantityOwned = 1;
      this.serialNumber = null;
      this.itemDescription = null;
      this.notes = null;
      this.selectedFile = null;
      this.successfullyUploaded = false;
      this.equipmentNameMissing = false;
    },
  },
  components: { BaseCard },
};
</script>

<style scoped>
h1 {
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  margin: 10px;
}
#main-wrapper {
  height: calc(100% - 20px);
  margin-top: 10px;
}

.incomplete-field {
  border: 1px solid red;
}

.incremental-number {
  width: 80%;
  border-radius: 0;
  height: 30px;
  border-right: 0;
  border-left: 0;
}
.number-div {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.increment-spinner {
  width: 30px;
  height: 32px;
  border: 1px solid white;
  text-align: center;
  line-height: 0;
  cursor: pointer;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.increment-spinner h4 {
  line-height: 2;
}

.increment-spinner-left {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-right: none;
}
.increment-spinner-right {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-left: none;
}

.number-wrapper {
  display: flex;
  flex-direction: row;
  padding: 0 10px 0 10px;
}
#side-by-side-number-div {
  display: flex;
  flex-direction: row;
  /* justify-items: stretch; */
  justify-content: space-between;
  width: 85%;
  /* padding: 0 10px 0 10px; */
}
#section-wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  height: 100%;
}

#form-div-one {
  display: flex;
  flex-direction: column;
  width: 50%;
}
#form-div-two {
  display: flex;
  flex-direction: column;
  width: 50%;
}
#top-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}

#heading-div {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
}

img {
  height: 60px;
  width: 60px;
}

h3 {
  width: 60%;
  margin: 0px;

  text-align: right;
  align-self: right;
}

input,
textarea {
  color: white;
  font-family: montserrat, helvetica, sans-serif;
  width: 80%;
  background: none;
  border: 1px solid white;
  border-radius: 20px;
  height: 30px;
  padding-left: 20px;
}

input:focus,
textarea:focus {
  outline: inherit;
  border: 1px solid #00f5ff;
}
input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.35);
  font-family: Montserrat, Helvetica, sans-serif;
}

textarea {
  height: 100px;
  width: 95%;
  padding: 10px 0 0 20px;
}

label {
  text-align: left;
  margin-left: 15px;
}
form {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5% 5% 1% 5%;
}

#input-div {
  height: 100%;
  width: 100%;
  padding: 1px;
  display: flex;
}
input[type="file"] {
  background: none;
  border: 0;
}
button {
  height: 40px;
  background: none;
  border-radius: 20px;
  outline: none;
  border: 1px solid white;
  color: white;
  font-family: montserrat, helvetica, sans-serif;
  text-transform: uppercase;
}

button:hover {
  border: 1px solid #00f5ff;
  color: #00f5ff;
  cursor: pointer;
}

button:active {
  background: rgba(255, 255, 255, 1);
  color: black;
}

#button-div {
  display: flex;

  flex-direction: row;
  width: 50%;
  align-items: center;
  align-self: center;
}

#button-div button {
  padding-left: 15px;
  padding-right: 15px;
  margin: auto;
}

h5 {
  color: red;
}
</style>