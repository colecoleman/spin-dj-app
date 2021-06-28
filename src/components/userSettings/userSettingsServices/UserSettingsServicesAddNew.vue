<template>
  <section id="main-wrapper">
    <base-card>
      <div id="section-wrapper">
        <div id="top-wrapper">
          <div id="heading-div">
            <h1>Add new service</h1>
          </div>
        </div>
        <div id="input-div">
          <form>
            <div id="form-div-one">
              <label for="service Name">Service Name:*</label>
              <input
                type="text"
                name="Service Name"
                placeholder="DJ, Officiation, Photo Booth, Photography"
                v-model="serviceName"
                :class="{ 'incomplete-field': serviceNameMissing }"
              />
              <label for="Description">Description:*</label>
              <input
                type="text"
                name="Description"
                placeholder="Describe your service for your clients to see."
                v-model="serviceDescription"
                :class="{ 'incomplete-field': serviceDescriptionMissing }"
              />
              <label>Price Options:*</label>
              <select v-model="priceOption">
                <option value="hourly">Hourly Charge</option>
                <option value="flat">Flat Charge</option>
              </select>

              <div class="pricing-option-div" v-if="priceOption === `hourly`">
                <div class="price-item-wrapper">
                  <label for="base-time">Base Rate:</label>
                  <!-- <div class="number-wrapper-flex-wrapper"> -->
                  <div class="number-wrapper">
                    <div
                      class="increment-spinner increment-spinner-left"
                      @click="
                        hourlyBaseRateIncrement('minus'),
                          resetHourlyBaseRateFromZero()
                      "
                      @mousedown.prevent=""
                    >
                      <h4>-</h4>
                    </div>
                    <input
                      type="number"
                      name="additional-employees"
                      min="1"
                      v-model="hourlyPriceOption.baseRate"
                      class="incremental-number"
                    />
                    <div
                      class="increment-spinner increment-spinner-right"
                      @click="
                        hourlyBaseRateIncrement('plus'),
                          resetHourlyBaseRateFromZero()
                      "
                      @mousedown.prevent=""
                    >
                      <h4>+</h4>
                    </div>
                  </div>
                  <!-- </div> -->
                </div>
                <div class="price-item-wrapper">
                  <label for="base-time">Base Time (hours):</label>
                  <div class="number-wrapper">
                    <div
                      class="increment-spinner increment-spinner-left"
                      @click="
                        hourlyBaseTimeIncrement('minus'),
                          resetHourlyBaseTimeFromZero()
                      "
                      @mousedown.prevent=""
                    >
                      <h4>-</h4>
                    </div>
                    <input
                      type="number"
                      name="additional-employees"
                      min="1"
                      v-model="hourlyPriceOption.baseTime"
                      class="incremental-number"
                    />
                    <div
                      class="increment-spinner increment-spinner-right"
                      @click="
                        hourlyBaseTimeIncrement('plus'),
                          resetHourlyBaseTimeFromZero()
                      "
                      @mousedown.prevent=""
                    >
                      <h4>+</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pricing-option-div" v-if="priceOption === `hourly`">
                <div class="price-item-wrapper" style="width: 50%">
                  <label for="Add. Rate">Add. Rate:</label>

                  <div class="number-wrapper">
                    <div
                      class="increment-spinner increment-spinner-left"
                      @click="
                        additionalHourlyRateIncrement('minus'),
                          resetAdditionalHourlyRateFromZero()
                      "
                      @mousedown.prevent=""
                    >
                      <h4>-</h4>
                    </div>
                    <input
                      type="number"
                      name="Add. Rate"
                      min="1"
                      v-model="hourlyPriceOption.additionalHourlyRate"
                      class="incremental-number"
                    />
                    <div
                      class="increment-spinner increment-spinner-right"
                      @click="
                        additionalHourlyRateIncrement('plus'),
                          resetAdditionalHourlyRateFromZero()
                      "
                      @mousedown.prevent=""
                    >
                      <h4>+</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="pricing-option-div-solo"
                v-if="priceOption === `flat`"
              >
                <label for="flat-rate">Flat Rate:</label>
                <div class="number-wrapper">
                  <div
                    class="increment-spinner increment-spinner-left"
                    @click="flatRateIncrement('minus'), resetFlatRateFromZero()"
                    @mousedown.prevent=""
                  >
                    <h4>-</h4>
                  </div>
                  <input
                    type="number"
                    name="Add. Rate"
                    min="1"
                    v-model="flatRatePriceOption.rate"
                    class="incremental-number"
                  />
                  <div
                    class="increment-spinner increment-spinner-right"
                    @click="flatRateIncrement('plus'), resetFlatRateFromZero()"
                    @mousedown.prevent=""
                  >
                    <h4>+</h4>
                  </div>
                </div>
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
              <label for="additional-employees">Necessary Staff?:</label><br />
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
                No equipment has been added to this service
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
      serviceName: null,
      serviceDescription: null,
      priceOption: "hourly",
      hourlyPriceOption: {
        baseRate: 0,
        baseTime: 0,
        additionalHourlyRate: 0,
      },
      flatRatePriceOption: {
        rate: 0,
      },
      notes: null,
      additionalEmployees: 0,
      equipment: [],
      selectedEquipment: [],
      selectedFile: null,
      serviceNameMissing: false,
      rateMissing: false,
      serviceDescriptionMissing: false,
      successfullyUploaded: false,
      fieldsMissing: false,
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
    selectEquipment(equipment) {
      this.selectedEquipment.push(equipment);
      console.log(this.selectedEquipment);
    },

    removeEquipment(item) {
      let indexToBeRemoved = this.selectedEquipment.findIndex(
        (x) => x.id === item.id
      );
      this.selectedEquipment.splice(indexToBeRemoved, 1);
      console.log(this.selectedEquipment);
    },

    resetAdditionalEmployeesFromZero() {
      if (isNaN(this.additionalEmployees)) {
        console.log("Not a number, resetting");
        this.setQuantity = 0;
      }
    },

    additionalEmployeesIncrement(direction) {
      if (direction == "plus") {
        this.additionalEmployees = parseFloat(this.additionalEmployees) + 1;
      } else if (direction === "minus") {
        this.additionalEmployees = parseFloat(this.additionalEmployees) - 1;
      }
    },

    resetHourlyBaseRateFromZero() {
      if (isNaN(this.hourlyPriceOption.baseRate)) {
        console.log("Not a number, resetting");
        this.hourlyPriceOption.baseRate = 0;
      }
    },

    hourlyBaseRateIncrement(direction) {
      this.priceOption = "hourly";
      if (direction == "plus") {
        this.hourlyPriceOption.baseRate =
          parseFloat(this.hourlyPriceOption.baseRate) + 1;
      } else if (direction === "minus") {
        this.hourlyPriceOption.baseRate =
          parseFloat(this.hourlyPriceOption.baseRate) - 1;
      }
    },
    resetHourlyBaseTimeFromZero() {
      if (isNaN(this.hourlyPriceOption.baseTime)) {
        console.log("Not a number, resetting");
        this.hourlyPriceOption.baseTime = 0;
      }
    },

    hourlyBaseTimeIncrement(direction) {
      this.priceOption = "hourly";
      if (direction == "plus") {
        this.hourlyPriceOption.baseTime =
          parseFloat(this.hourlyPriceOption.baseTime) + 1;
      } else if (direction === "minus") {
        this.hourlyPriceOption.baseTime =
          parseFloat(this.hourlyPriceOption.baseTime) - 1;
      }
    },
    resetAdditionalHourlyRateFromZero() {
      if (isNaN(this.hourlyPriceOption.baseTime)) {
        console.log("Not a number, resetting");
        this.hourlyPriceOption.baseTime = 0;
      }
    },

    additionalHourlyRateIncrement(direction) {
      this.priceOption = "hourly";
      if (direction == "plus") {
        this.hourlyPriceOption.additionalHourlyRate =
          parseFloat(this.hourlyPriceOption.additionalHourlyRate) + 1;
      } else if (direction === "minus") {
        this.hourlyPriceOption.additionalHourlyRate =
          parseFloat(this.hourlyPriceOption.additionalHourlyRate) - 1;
      }
    },
    resetflatRateFromZero() {
      if (isNaN(this.hourlyPriceOption.baseTime)) {
        console.log("Not a number, resetting");
        this.hourlyPriceOption.baseTime = 0;
      }
    },

    flatRateIncrement(direction) {
      this.priceOption = "flat";
      if (direction === "plus") {
        this.flatRatePriceOption.rate =
          parseFloat(this.flatRatePriceOption.rate) + 1;
      } else if (direction === "minus") {
        this.flatRatePriceOption.rate =
          parseFloat(this.flatRatePriceOption.rate) - 1;
      }
    },

    validationCheck() {
      this.validateName() || this.validateRate() || this.validateDescription()
        ? true
        : false;
    },

    validateName() {
      return this.serviceName === null ? true : false;
    },

    validateRate() {
      return this.rate === null ? true : false;
    },
    validateDescription() {
      return this.serviceDescription === null ? true : false;
    },

    submitEquipment() {
      if (this.fieldsMissing) {
        return;
      }
      // } else {
      //   console.log(this.equipmentNeeded);
      //   db.collection("services")
      //     .add({
      //       serviceName: this.serviceName,
      //       serviceDescription: this.serviceDescription,
      //       priceOption: this.priceOption,
      //       hourlyPriceOption: this.hourlyPriceOption,
      //       flatRatePriceOption: this.flatRatePriceOption,
      //       notes: this.notes,
      //       additionalEmployees: this.additionalEmployees,
      //       selectedEquipment: this.selectedEquipment,
      //     })
      //     .then((docRef) => {
      //       const docId = docRef.id;
      //       return docId;
      //     })
      //     .then((docId) => {
      //       if (this.selectedFile === null) {
      //         this.resetInput();
      //         this.successfullyUploaded = true;
      //         this.$router.push("services");
      //         return;
      //       } else {
      //         const storageRef = firebase.storage().ref();
      //         const servicePhotoRef = storageRef.child(
      //           "services/" + docId + ".jpeg"
      //         );
      //         servicePhotoRef.put(this.selectedFile).then((snapshot) => {
      //           snapshot.ref
      //             .getDownloadURL()
      //             .then((downloadURL) => {
      //               console.log("Download available at", downloadURL);
      //               return downloadURL;
      //             })
      //             .then((downloadURL) => {
      //               console.log(downloadURL);
      //               db.collection("services")
      //                 .doc(docId)
      //                 .update({ photo: downloadURL })
      //                 .then(console.log("successfully updated"));
      //             })
      //             .then(() => {
      //               this.resetInput();
      //               this.$data.successfullyUploaded = true;
      //               this.$router.push("services");
      //             });
      //         });
      //       }
      //     });
      // }
    },
    resetInput() {
      this.serviceName = null;
      this.serviceDescription = null;
      this.priceOption = "hourly";
      this.rate = null;
      this.notes = null;
      this.additionalEmployees = 0;
      this.equipment = [];
      this.selectedEquipment = [];
      this.selectedFile = null;
      this.serviceNameMissing = false;
      this.rateMissing = false;
      this.serviceDescriptionMissing = false;
      this.successfullyUploaded = false;
      this.fieldsMissing = false;
    },
  },
  components: { BaseCard },
  // created() {
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
  margin: 0 10% 0 5%;
  justify-items: left;
  justify-content: left;
  display: flex;
  flex-direction: row;
}
.pricing-option-div-solo {
  width: 50%;
  margin: 0 10% 0 5%;
  justify-items: left;
  justify-content: left;
  display: flex;
  flex-direction: column;
}

.price-item-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.pricing-option-div div input {
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
  /* padding: 0 65% 0 10%; */
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

.error {
  color: red;
}
</style>