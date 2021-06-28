<template>
  <section id="main-wrapper">
    <base-card>
      <div id="section-wrapper">
        <div id="top-wrapper">
          <div id="heading-div">
            <h1>Edit Equipment</h1>
            <h4>Click Field To Edit</h4>
          </div>
        </div>
        <div id="input-div">
          <form>
            <div id="form-div-one">
              <h4>Equipment Name:</h4>
              <p @click="editEquipmentName()" v-if="!equipmentNameEditing">
                {{ equipmentName }}
              </p>
              <input
                v-if="equipmentNameEditing"
                type="text"
                v-model="equipmentName"
                ref="equipmentNameInput"
              />
              <div id="side-by-side-number-div">
                <div class="number-div">
                  <h4># in a set?:</h4>
                  <p v-if="!setQuantityEditing" @click="editSetQuantity()">
                    {{ setQuantity }}
                  </p>
                  <div class="number-wrapper" v-if="setQuantityEditing">
                    <div
                      class="increment-spinner increment-spinner-left"
                      @click="setIncrement('minus'), resetSetQuantityFromZero()"
                      @mousedown.prevent=""
                    >
                      <p>-</p>
                    </div>
                    <input
                      type="number"
                      name="# in a set?"
                      min="1"
                      v-model="setQuantity"
                      class="incremental-number"
                      ref="setQuantityInput"
                    />
                    <div
                      class="increment-spinner increment-spinner-right"
                      @click="setIncrement('plus'), resetSetQuantityFromZero()"
                      @mousedown.prevent=""
                    >
                      <p>+</p>
                    </div>
                  </div>
                  <br />
                </div>
                <div class="number-div">
                  <h4># owned?:</h4>
                  <p v-if="!quantityOwnedEditing" @click="editQuantityOwned">
                    {{ quantityOwned }}
                  </p>
                  <div class="number-wrapper" v-if="quantityOwnedEditing">
                    <div
                      class="increment-spinner increment-spinner-left"
                      @click="ownedIncrement('minus')"
                      @mousedown.prevent=""
                    >
                      <p>-</p>
                    </div>
                    <input
                      type="number"
                      name="quantity-owned"
                      min="1"
                      v-model="quantityOwned"
                      class="incremental-number"
                      ref="quantityOwnedInput"
                    />
                    <div
                      class="increment-spinner increment-spinner-right"
                      @click="ownedIncrement('plus')"
                      @mousedown.prevent=""
                    >
                      <p>+</p>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
              <br />
              <h4 for="Description">Description:</h4>
              <br />
              <p
                v-if="itemDescription && !itemDescriptionEditing"
                @click="editItemDescription()"
              >
                {{ itemDescription }}
              </p>
              <p
                v-if="!itemDescription && !itemDescriptionEditing"
                @click="editItemDescription()"
              >
                No Description Added. Click to add one
              </p>
              <input
                v-if="itemDescriptionEditing"
                type="text"
                name="Description"
                v-model="itemDescription"
                ref="itemDescriptionInput"
              />
              <br />
              <h4 for="Serial Number">Serial Number:</h4>
              <p
                v-if="serialNumber && !serialNumberEditing"
                @click="editSerialNumber()"
              >
                {{ serialNumber }}
              </p>
              <p
                v-if="!serialNumber && !serialNumberEditing"
                @click="editSerialNumber()"
              >
                No serial numbers added. <br />Click to add one.
              </p>
              <input
                type="text"
                name="Serial Number"
                placeholder="123456789ASDFGHJKL"
                v-model="serialNumber"
                v-if="serialNumberEditing"
                ref="serialNumberInput"
              /><br />
              <br />
            </div>
            <div id="form-div-two">
              <h4 for="Notes">Notes:</h4>

              <p v-if="notes && !notesEditing" @click="editNotes()">
                {{ notes }}
              </p>
              <p v-if="!notes && !notesEditing" @click="editNotes()">
                No notes added. <br />Click to add one.
              </p>
              <textarea
                name="Notes"
                rows="1"
                placeholder="Put something descriptive here!"
                v-model="notes"
                v-if="notesEditing"
                ref="notesInput"
              />
              <br />
              <h4 for="Representative Image">Representative Image:</h4>
              <br />

              <input
                type="file"
                style="display: none"
                name="Representative Image"
                @change="onFileSelected"
                ref="fileInput"
                accept="image/jpeg image/png"
              />
              <button
                type="button"
                id="choose-file-button"
                @click="chooseFileFromButton"
              >
                Choose File</button
              ><br />
              <img name="photo" v-if="photo" :src="photo" />
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
              this.router.push('/addons');
            "
          >
            Submit
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
      equipmentId: undefined,
      //   equipmentIdEditing: false,
      equipmentName: null,
      equipmentNameEditing: false,
      setQuantity: 1,
      setQuantityEditing: false,
      quantityOwned: 1,
      quantityOwnedEditing: false,
      serialNumber: null,
      serialNumberEditing: false,
      itemDescription: null,
      itemDescriptionEditing: false,
      notes: null,
      notesEditing: false,
      selectedFile: null,
      photo: undefined,
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
    editEquipmentName() {
      this.equipmentNameEditing = true;
      this.$nextTick(() => {
        this.$refs.equipmentNameInput.focus();
      });
    },
    editSetQuantity() {
      this.setQuantityEditing = true;
      this.$nextTick(() => {
        this.$refs.setQuantityInput.focus();
      });
    },
    editQuantityOwned() {
      this.quantityOwnedEditing = true;
      this.$nextTick(() => {
        this.$refs.quantityOwnedInput.focus();
      });
    },
    editItemDescription() {
      this.itemDescriptionEditing = true;
      this.$nextTick(() => {
        this.$refs.itemDescriptionInput.focus();
      });
    },
    editSerialNumber() {
      this.serialNumberEditing = true;
      this.$nextTick(() => {
        this.$refs.serialNumberInput.focus();
      });
    },
    editNotes() {
      this.notesEditing = true;
      this.$nextTick(() => {
        this.$refs.notesInput.focus();
      });
    },
    chooseFileFromButton() {
      this.$refs.fileInput.click();
      console.log("chooseFileFromButton");
    },
    onFileSelected(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
      this.photo = this.selectedFileUrl;
      console.log(event.target.files[0]);
    },

    resetSetQuantityFromZero() {
      if (isNaN(this.setQuantity)) {
        console.log("Not p number, resetting");
        this.setQuantity = 1;
      }
    },
    resetQuantityOwnedFromZero() {
      if (isNaN(this.quantityOwned)) {
        console.log("Not p number, resetting");
        this.quantityOwned = 1;
      }
    },
    setIncrement(direction) {
      this.$nextTick(() => {
        this.$refs.setQuantityInput.focus();
      });
      if (direction == "plus") {
        this.setQuantity = parseFloat(this.setQuantity) + 1;
      } else if (direction === "minus") {
        this.setQuantity = parseFloat(this.setQuantity) - 1;
      }
    },
    ownedIncrement(direction) {
      this.$nextTick(() => {
        this.$refs.quantityOwnedInput.focus();
      });
      if (direction == "plus") {
        this.quantityOwned = parseFloat(this.quantityOwned) + 1;
      } else if (direction === "minus") {
        this.quantityOwned = parseFloat(this.quantityOwned) - 1;
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
    //       .doc(this.equipmentId)
    //       .update({
    //         equipmentName: this.equipmentName,
    //         itemDescription: this.itemDescription,
    //         notes: this.notes,
    //         quantityOwned: this.quantityOwned,
    //         setQuantity: this.setQuantity,
    //         serialNumber: this.serialNumber,
    //       })
    //       .then(() => {
    //         if (this.selectedFile === null) {
    //           return;
    //         } else {
    //           const storageRef = firebase.storage().ref();
    //           const equipmentPhotoRef = storageRef.child(
    //             "equipment/" + this.equipmentId + ".jpeg"
    //           );
    //           equipmentPhotoRef.delete().then(() =>
    //             equipmentPhotoRef.put(this.selectedFile).then((snapshot) => {
    //               snapshot.ref
    //                 .getDownloadURL()
    //                 .then((downloadURL) => {
    //                   console.log("Download available at", downloadURL);
    //                   return downloadURL;
    //                 })
    //                 .then((downloadURL) => {
    //                   console.log(downloadURL);
    //                   db.collection("equipment")
    //                     .doc(this.equipmentId)
    //                     .update({ photo: downloadURL })
    //                     .then(console.log("successfully updated"));
    //                 })
    //                 .then(() => {
    //                   this.$router.push("/addOns");
    //                 });
    //             })
    //           );
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
      this.photo = null;
    },
  },
  // created() {
  //   this.equipmentId = this.$route.params.equipmentid;
  //   console.log(this.$route.params);
  //   console.log(this.equipmentId);
  //   db.collection("equipment")
  //     .doc(this.equipmentId)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.log("here", doc.data());
  //         this.equipmentName = doc.data().equipmentName;
  //         console.log(this.equipmentName);
  //         this.itemDescription = doc.data().itemDescription;
  //         this.notes = doc.data().notes;
  //         this.photo = doc.data().photo;
  //         this.quantityOwned = doc.data().quantityOwned;
  //         this.serialNumber = doc.data().serialNumber;
  //         this.setQuantity = doc.data().setQuantity;
  //       } else {
  //         console.log(doc);
  //       }
  //     });
  // },
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

h3 {
  width: 60%;
  margin: 0px;

  text-align: right;
  align-self: right;
}

h4 {
  text-align: left;
  margin-bottom: 10px;
}

h5 {
  color: red;
}

#main-wrapper {
  height: calc(100% - 20px);
  margin-top: 10px;
}

#choose-file-button {
  width: 40%;
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

.increment-spinner p {
  margin-top: 0px;
  margin-left: 6px;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.increment-spinner p {
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
  overflow: scroll;
  overflow-x: hidden;
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

p {
  width: 60%;
  text-align: left;
  margin-left: 15px;
  cursor: pointer;
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

form {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0% 5% 1% 5%;
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
</style>