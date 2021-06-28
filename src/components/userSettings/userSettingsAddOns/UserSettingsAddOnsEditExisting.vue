<template>
  <section id="main-wrapper">
    <base-card>
      <div id="section-wrapper">
        <div id="top-wrapper">
          <div id="heading-div">
            <h1>Need to make some changes?</h1>
          </div>
        </div>
        <div id="input-div">
          <form>
            <div id="form-div-one">
              <label for="Add-On Name">Add-On Name:*</label>
              <input
                type="text"
                name="Add-On Name"
                placeholder="Sparkers, Casino Table, Photo Booth"
                v-model="addOnName"
                :class="{ 'incomplete-field': addOnNameMissing }"
              />
              <label for="Description">Description:*</label>
              <input
                type="text"
                name="Description"
                placeholder="Describe your Add-On for your clients to see."
                v-model="addOnDescription"
                :class="{ 'incomplete-field': addOnDescriptionMissing }"
              />
              <label>Price Options:*</label>
              <select v-model="priceOption">
                <option value="hourly">Hourly Charge</option>
                <option value="unit">Unit Charge</option>
                <option value="set">Per Set Charge</option>
                <option value="flat">Flat Charge</option>
              </select>

              <div class="pricing-option-div" v-if="priceOption === `hourly`">
                <label for="hourly-rate">Charge Per Hour:</label>
                <input type="number" placeholder="$100" v-model="rate" />
              </div>
              <div class="pricing-option-div" v-if="priceOption === `set`">
                <label for="set-rate">Charge Per Set:</label>
                <input type="number" placeholder="$40" v-model="rate" />
              </div>
              <div class="pricing-option-div" v-if="priceOption === `unit`">
                <label for="unit-rate">Charge Per Unit:</label>
                <input type="number" placeholder="$1" v-model="rate" />
              </div>
              <div class="pricing-option-div" v-if="priceOption === `flat`">
                <label for="flat-rate">Flat Charge:</label>
                <input type="number" placeholder="$500" v-model="rate" />
              </div>
              <label for="Notes">Notes:</label>
              <textarea
                name="Notes"
                rows="1"
                placeholder="Put something descriptive here!"
                v-model="notes"
              />
            </div>
            <div id="form-div-two">
              <label for="additional-employees">Additional Staff?:</label><br />
              <div class="number-wrapper">
                <div
                  class="increment-spinner increment-spinner-left"
                  @click="
                    additionalEmployeesIncrement('minus'),
                      resetAdditionalEmployeesFromZero()
                  "
                  @mousedown.prevent=""
                >
                  <h4>-</h4>
                </div>
                <input
                  type="number"
                  name="additional-employees"
                  min="1"
                  v-model="additionalEmployees"
                  class="incremental-number"
                />
                <div
                  class="increment-spinner increment-spinner-right"
                  @click="
                    additionalEmployeesIncrement('plus'),
                      resetAdditionalEmployeesFromZero()
                  "
                  @mousedown.prevent=""
                >
                  <h4>+</h4>
                </div>
              </div>
              <label for="equipment-window"> Necessary Equipment: </label>
              <div class="equipment-window">
                <div
                  v-for="item in equipment"
                  :key="item.id"
                  class="equipment-list-item"
                  @click="selectEquipment(item)"
                >
                  <h5>{{ item.equipmentName }}</h5>
                </div>
              </div>
              <h5 v-if="selectedEquipment[0] === undefined">
                No equipment has been added to this add-on
              </h5>
              <label v-if="selectedEquipment[0] !== undefined"
                >Chosen Equipment:</label
              >
              <div
                class="equipment-window"
                v-if="selectedEquipment[0] !== undefined"
              >
                <div
                  v-for="(item, index) in selectedEquipment"
                  :key="item.id"
                  class="equipment-list-item"
                >
                  <h5
                    class="equipment-list-item-heading"
                    @click="removeEquipment(item)"
                  >
                    {{ item.equipmentName }}
                  </h5>
                  <h5>Units required:</h5>
                  <input
                    type="number"
                    class="equipment-list-item-quantity-needed"
                    placeholder="1"
                    v-model="selectedEquipment[index].unitsRequired"
                  />
                </div>
              </div>
              <h5
                v-if="selectedEquipment[0] !== undefined"
                class="selected-equipment-explanation"
              >
                Click title to remove
              </h5>
              <label for="Representative Image">Image:</label>
              <input
                type="file"
                style="display: none"
                name="Representative Image"
                @change="onFileSelected"
                ref="fileInput"
                accept="image/jpeg image/png"
              />
              <button type="button" @click="chooseFileFromButton">
                Choose File
              </button>
              <p v-if="selectedFile">
                <img :src="selectedFileUrl" />{{ selectedFile.name }}
              </p>
            </div>
          </form>
        </div>
        <h5 v-if="fieldsMissing">Please complete the missing fields</h5>
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
          <button
            @click="
              validationCheck();
              submitEquipment();
            "
          >
            Submit and Add Another
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
      addOnName: null,
      addOnDescription: null,
      addOnId: undefined,
      priceOption: "hourly",
      rate: null,
      notes: null,
      additionalEmployees: 0,
      equipment: [],
      selectedEquipment: [],
      selectedFile: null,
      addOnNameMissing: false,
      rateMissing: false,
      addOnDescriptionMissing: false,
      successfullyUploaded: false,
      fieldsMissing: false,
    };
  },
  computed: {
    selectedFileUrl() {
      return URL.createObjectURL(this.selectedFile);
    },
  },
  // methods: {
  //   chooseFileFromButton() {
  //     this.$refs.fileInput.click();
  //     console.log("chooseFileFromButton");
  //   },
  //   onFileSelected(event) {
  //     console.log(event);
  //     this.selectedFile = event.target.files[0];
  //     console.log(event.target.files[0]);
  //   },
  //   selectEquipment(equipment) {
  //     this.selectedEquipment.push(equipment);
  //     console.log(this.selectedEquipment);
  //   },

  //   removeEquipment(item) {
  //     let indexToBeRemoved = this.selectedEquipment.findIndex(
  //       (x) => x.id === item.id
  //     );
  //     this.selectedEquipment.splice(indexToBeRemoved, 1);
  //     console.log(this.selectedEquipment);
  //   },

  //   resetAdditionalEmployeesFromZero() {
  //     if (isNaN(this.additionalEmployees)) {
  //       console.log("Not a number, resetting");
  //       this.setQuantity = 0;
  //     }
  //   },

  //   additionalEmployeesIncrement(direction) {
  //     if (direction == "plus") {
  //       this.additionalEmployees = parseFloat(this.additionalEmployees) + 1;
  //     } else if (direction === "minus") {
  //       this.additionalEmployees = parseFloat(this.additionalEmployees) - 1;
  //     }
  //   },
  //   validationCheck() {
  //     this.validateName() || this.validateRate() || this.validateDescription()
  //       ? true
  //       : false;
  //   },

  //   validateName() {
  //     return this.addOnName === null ? true : false;
  //   },

  //   validateRate() {
  //     return this.rate === null ? true : false;
  //   },
  //   validateDescription() {
  //     return this.addOnDescription === null ? true : false;
  //   },

  //   submitEquipment() {
  //     if (this.fieldsMissing) {
  //       return;
  //     } else {
  //       console.log(this.equipmentNeeded);
  //       db.collection("addOns")
  //         .doc(this.addOnId)
  //         .update({
  //           addOnName: this.addOnName,
  //           addOnDescription: this.addOnDescription,
  //           priceOption: this.priceOption,
  //           rate: this.rate,
  //           notes: this.notes,
  //           additionalEmployees: this.additionalEmployees,
  //           selectedEquipment: this.selectedEquipment,
  //         })
  //         .then(() => {
  //           if (this.selectedFile === null) {
  //             this.resetInput();
  //             this.successfullyUploaded = true;
  //             this.$router.push({ path: "/addons" });

  //             return;
  //           } else {
  //             const storageRef = firebase.storage().ref();
  //             const AddOnPhotoRef = storageRef.child(
  //               "addOns/" + this.addOnId + ".jpeg"
  //             );
  //             AddOnPhotoRef.put(this.selectedFile).then((snapshot) => {
  //               snapshot.ref
  //                 .getDownloadURL()
  //                 .then((downloadURL) => {
  //                   console.log("Download available at", downloadURL);
  //                   return downloadURL;
  //                 })
  //                 .then((downloadURL) => {
  //                   console.log(downloadURL);
  //                   db.collection("addOns")
  //                     .doc(this.addOnId)
  //                     .update({ photo: downloadURL })
  //                     .then(console.log("successfully updated"));
  //                 })
  //                 .then(() => {
  //                   this.resetInput();
  //                   this.$data.successfullyUploaded = true;
  //                   this.$router.push({ path: "/addons" });
  //                 });
  //             });
  //           }
  //         });
  //     }
  //   },
  //   resetInput() {
  //     this.addOnName = null;
  //     this.addOnDescription = null;
  //     this.priceOption = "hourly";
  //     this.rate = null;
  //     this.notes = null;
  //     this.additionalEmployees = 0;
  //     this.equipment = [];
  //     this.selectedEquipment = [];
  //     this.selectedFile = null;
  //     this.addOnNameMissing = false;
  //     this.rateMissing = false;
  //     this.addOnDescriptionMissing = false;
  //     this.successfullyUploaded = false;
  //     this.fieldsMissing = false;
  //   },
  // },
  components: { BaseCard },
  // created() {
  //   this.addOnId = this.$route.params.addonid;
  //   console.log(this.addOnId);

  //   db.collection("equipment")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         let item = doc.data();
  //         item.id = doc.id;
  //         this.equipment.push(item);
  //         // console.log(doc.id);
  //         console.log(this.equipment);
  //       });
  //     });
  //   db.collection("addOns")
  //     .doc(this.addOnId)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.log("here", doc.data());
  //         this.addOnName = doc.data().addOnName;
  //         this.addOnDescription = doc.data().addOnDescription;
  //         this.priceOption = doc.data().priceOption;
  //         this.rate = doc.data().rate;
  //         this.notes = doc.data().notes;
  //         this.additionalEmployees = doc.data().additionalEmployees;
  //         this.selectedEquipment = doc.data().selectedEquipment;
  //       } else {
  //         console.log(doc);
  //       }
  //     });
  // },
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

select {
  width: 85%;
  height: 30px;
  padding-left: 20px;
  margin-top: 10px;
  font-family: montserrat, helvetica, sans-serif;
  color: white;
  background: black;
  border: 1px solid white;
  border-radius: 20px;
}
select:focus {
  outline: inherit;
  border: 1px solid #00f5ff;
}

.pricing-option-div {
  width: 80%;
  margin-left: 15%;
  justify-items: left;
  justify-content: left;
  display: flex;
  flex-direction: column;
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
  margin-top: 10px;
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
  padding: 0 65% 0 10%;
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

.equipment-window {
  width: 100%;
  height: 15%;
  border: 1px solid white;
  border-radius: 20px;
  margin-top: 10px;
  overflow: scroll;
}

.equipment-list-item h5,
.selected-equipment-explanation {
  color: white;
  text-align: left;
}

.equipment-list-item-heading {
  flex: 5;
}

.equipment-list-item {
  height: 30px;
  padding: 5px;
  border-bottom: 0.5px solid white;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.equipment-list-item-quantity-needed {
  width: 20%;
  justify-self: flex-end;
  flex: 1;
  margin: 0;
}

#form-div-one {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
}
#form-div-two {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
}
#top-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}

#heading-div {
  width: 100%;
  height: 40px;
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
  margin-top: 10px;
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
  width: 80%;
  padding: 10px 0 0 20px;
}

label {
  text-align: left;
  margin-left: 15px;
  margin-top: 15px;
}
form {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100%;
  max-height: 100%;
  padding: 0% 5% 3% 5%;
}

#input-div {
  height: 90%;
  overflow: scroll;
  width: 100%;

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
  margin-top: 10px;
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
  height: 100px;
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