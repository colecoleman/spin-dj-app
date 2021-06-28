<template>
  <section id="main-wrapper">
    <base-card>
      <div id="section-wrapper">
        <div id="heading-div">
          <h1>Edit Service</h1>
          <h4>Click Field To Edit</h4>
        </div>
        <div id="input-div">
          <form>
            <div id="form-div-one">
              <h4>service Name:</h4>
              <p @click="editServiceName()" v-if="!serviceNameEditing">
                {{ serviceName }}
              </p>
              <input
                v-if="serviceNameEditing"
                type="text"
                v-model="serviceName"
                ref="serviceNameInput"
              />
              <h4 for="Description">Description:</h4>
              <p
                v-if="serviceDescription && !serviceDescriptionEditing"
                @click="editServiceDescription()"
              >
                {{ serviceDescription }}
              </p>
              <p
                v-if="!serviceDescription && !serviceDescriptionEditing"
                @click="editServiceDescription()"
              >
                No Description Added. Click to add one
              </p>
              <input
                v-if="serviceDescriptionEditing"
                type="text"
                name="Description"
                v-model="serviceDescription"
                ref="serviceDescriptionInput"
              />
              <h4>Price Option:</h4>
              <p
                class="capitalize"
                v-if="!priceOptionEditing"
                @click="editPriceOption()"
              >
                <b>{{ priceOption }} Rate</b>
              </p>
              <select v-model="priceOption" v-if="priceOptionEditing">
                <option value="hourly">Hourly Charge</option>
                <option value="flat">Flat Charge</option>
              </select>

              <div class="pricing-option-div" v-if="priceOption === `hourly`">
                <div class="price-item-wrapper">
                  <label for="base-time">Base Rate:</label>
                  <p
                    @click="editPriceOption()"
                    v-if="!priceOptionEditing && priceOption === 'hourly'"
                  >
                    ${{ parseInt(hourlyPriceOption.baseRate).toLocaleString() }}
                  </p>
                  <div
                    class="number-wrapper"
                    v-if="priceOptionEditing && priceOption === 'hourly'"
                  >
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
                  <p
                    @click="editPriceOption()"
                    v-if="!priceOptionEditing && priceOption === 'hourly'"
                  >
                    {{ hourlyPriceOption.baseTime }} hours
                  </p>
                  <div
                    class="number-wrapper"
                    v-if="priceOptionEditing && priceOption === 'hourly'"
                  >
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
                  <p
                    @click="editPriceOption()"
                    v-if="!priceOptionEditing && priceOption === 'hourly'"
                  >
                    ${{ hourlyPriceOption.additionalHourlyRate }}/ hour
                  </p>

                  <div
                    class="number-wrapper"
                    v-if="priceOptionEditing && priceOption === 'hourly'"
                  >
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
                <label for="flat-rate"><b>Price:</b></label>
                <p
                  class="capitalize"
                  v-if="!priceOptionEditing && priceOption === 'flat'"
                  @click="editPriceOption()"
                >
                  ${{ flatRatePriceOption.rate }}
                </p>
                <div
                  class="number-wrapper"
                  v-if="priceOptionEditing && priceOption === 'flat'"
                >
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

              <h4 for="Notes">Notes:</h4>
              <p v-if="notes && !notesEditing" @click="editNotes()">
                {{ notes }}
              </p>
              <p v-if="!notes && !notesEditing" @click="editNotes()">
                No notes added.<br />Click to add one.
              </p>
              <textarea
                name="Notes"
                rows="1"
                placeholder="Put something descriptive here!"
                v-model="notes"
                v-if="notesEditing"
                ref="notesInput"
              />
            </div>
            <div id="form-div-two">
              <h4 for="additional-employees">Necessary Staff?:</h4>
              <p
                v-if="!additionalEmployeesEditing"
                @click="editAdditionalEmployees()"
              >
                {{ additionalEmployees }}
              </p>
              <div
                class="number-wrapper"
                style="width: 25%"
                v-if="additionalEmployeesEditing"
              >
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
              <div id="equipment-div">
                <h4>Necessary Equipment:</h4>
                <div v-if="!selectedEquipmentEditing">
                  <div v-for="item in selectedEquipment" :key="item.id">
                    <p @click="editSelectedEquipment">
                      {{ item.equipmentName }} x {{ item.unitsRequired }}
                    </p>
                  </div>
                </div>
                <p v-if="selectedEquipmentEditing">Equipment Available:</p>
                <div class="equipment-window" v-if="selectedEquipmentEditing">
                  <div
                    v-for="item in equipment"
                    :key="item.id"
                    class="equipment-list-item"
                    @click="selectEquipment(item)"
                  >
                    <h5>{{ item.equipmentName }}</h5>
                  </div>
                </div>
                <h5
                  v-if="
                    !selectedEquipmentEditing && selectedEquipment.length <= 0
                  "
                  @click="editSelectedEquipment()"
                >
                  No equipment has been added to this service. Click to add!
                </h5>
                <p
                  v-if="
                    selectedEquipment.length > 0 && selectedEquipmentEditing
                  "
                >
                  Equipment Chosen:
                </p>
                <div
                  class="equipment-window"
                  v-if="
                    selectedEquipment.length > 0 && selectedEquipmentEditing
                  "
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
                  v-if="
                    selectedEquipmentEditing && selectedEquipment.length > 0
                  "
                  class="selected-equipment-explanation"
                >
                  Click title to remove
                </h5>
              </div>
              <h4 for="Representative Image">Representative Image:</h4>
              <div id="image-div">
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
                  Choose File
                </button>
                <img name="photo" v-if="photo" :src="photo" />
                <p v-if="selectedFile">{{ selectedFile.name }}</p>
              </div>
            </div>
          </form>
        </div>
        <h5 v-if="serviceNameMissing">Please complete the missing fields</h5>
        <h5 v-if="successfullyUploaded">Successfully Uploaded!</h5>
        <div id="button-div">
          <button
            id="submitButton"
            type="button"
            @click="
              validationCheck();
              submitservice();
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
      serviceId: undefined,
      serviceName: null,

      serviceNameEditing: false,
      serviceDescription: null,
      serviceDescriptionEditing: false,
      priceOption: undefined,
      priceOptionEditing: false,
      hourlyPriceOption: {
        baseRate: 0,
        baseTime: 0,
        additionalHourlyRate: 0,
      },
      flatRatePriceOption: {
        rate: 0,
      },
      notes: null,
      notesEditing: false,
      additionalEmployees: 0,
      additionalEmployeesEditing: false,
      equipment: [],
      selectedEquipment: [],
      selectedEquipmentEditing: false,
      selectedFile: null,
      photo: undefined,
      successfullyUploaded: false,
    };
  },

  computed: {
    selectedFileUrl() {
      return URL.createObjectURL(this.selectedFile);
    },
  },
  methods: {
    editServiceName() {
      this.serviceNameEditing = true;
      this.$nextTick(() => {
        this.$refs.serviceNameInput.focus();
      });
    },
    editServiceDescription() {
      this.serviceDescriptionEditing = true;
      this.$nextTick(() => {
        this.$refs.serviceDescriptionInput.focus();
      });
    },
    editPriceOption() {
      this.priceOptionEditing = true;
    },
    editNotes() {
      this.notesEditing = true;
      this.$nextTick(() => {
        this.$refs.notesInput.focus();
      });
    },

    editAdditionalEmployees() {
      this.additionalEmployeesEditing = true;
    },

    editSelectedEquipment() {
      this.selectedEquipmentEditing = true;
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
      console.log(this.photo);
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

    validationCheck() {
      if (
        this.serviceName === null ||
        this.serviceName.trim() === "" ||
        this.serviceName === undefined
      ) {
        this.serviceNameMissing = true;
      } else {
        this.serviceNameMissing = false;
      }
    },

    // submitservice() {
    //   db.collection("services")
    //     .doc(this.serviceId)
    //     .update({
    //       serviceName: this.serviceName,
    //       serviceDescription: this.serviceDescription,
    //       additionalEmployees: this.additionalEmployees,
    //       flatRatePriceOption: this.flatRatePriceOption,
    //       hourlyPriceOption: this.hourlyPriceOption,
    //       notes: this.notes,
    //       priceOption: this.priceOption,
    //       selectedEquipment: this.selectedEquipment,
    //     })
    //     .then(() => {
    //       if (this.selectedFile === null) {
    //         this.$router.push("/services");
    //         return;
    //       } else {
    //         const storageRef = firebase.storage().ref();
    //         const servicePhotoRef = storageRef.child(
    //           "services/" + this.serviceId + ".jpeg"
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
    //                 .doc(this.serviceId)
    //                 .update({ photo: downloadURL })
    //                 .then(console.log("successfully updated"));
    //             })
    //             .then(() => {
    //               this.$router.push("/services");
    //             });
    //         });
    //       }
    //     });
    // },
    resetInput() {
      this.serviceId = undefined;
      this.serviceName = null;
      this.serviceNameMissing = false;
      this.serviceNameEditing = false;
      this.serviceDescription = null;
      this.serviceDescriptionEditing = false;
      this.priceOption = "hourly";
      this.priceOptionEditing = false;
      this.hourlyPriceOption = {
        baseRate: 0,
        baseTime: 0,
        additionalHourlyRate: 0,
      };
      this.flatRatePriceOption = {
        rate: 0,
      };
      this.notes = null;
      this.notesEditing = false;
      this.additionalEmployees = 0;
      this.additionalEmployeesEditing = false;
      this.equipment = [];
      this.selectedEquipment = [];
      this.selectedEquipmentEditing = false;
      this.selectedFile = null;
      this.photo = undefined;
      this.successfullyUploaded = false;
    },
  },
  // created() {
  //   this.serviceId = this.$route.params.serviceid;
  //   console.log(this.$route.params);
  //   console.log(this.serviceId);
  //   db.collection("services")
  //     .doc(this.serviceId)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.log("here", doc.data());
  //         this.serviceName = doc.data().serviceName;
  //         this.additionalEmployees = doc.data().additionalEmployees;
  //         this.flatRatePriceOption = doc.data().flatRatePriceOption;
  //         this.hourlyPriceOption = doc.data().hourlyPriceOption;
  //         this.notes = doc.data().notes;
  //         this.photo = doc.data().photo;
  //         this.priceOption = doc.data().priceOption;
  //         this.selectedEquipment = doc.data().selectedEquipment;
  //         this.serviceDescription = doc.data().serviceDescription;
  //       } else {
  //         console.log(doc);
  //       }
  //     });
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
  components: { BaseCard },
};
</script>

<style scoped>
/* Establishing Styles */
h1 {
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  margin: 10px;
}
h4 {
  text-align: left;
}
p {
  text-align: left;
  padding-left: 15px;
}

.capitalize {
  text-transform: capitalize;
}
#main-wrapper {
  height: calc(100% - 20px);
  margin-top: 10px;
}
/* Top-Level-Divs */
#heading-div {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
}

#input-div {
  overflow: scroll;
  width: 100%;
  display: flex;
}

#button-div {
  display: flex;
  height: 15%;
  flex-direction: row;
  width: 50%;
  align-items: center;
  align-self: center;
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
  margin: 0 5% 0 5%;
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

#equipment-div {
  margin-bottom: 20px;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input {
  margin: 5px 0 10px 0;
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
  padding-left: 8px;
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
  /* height: 100%; */
  border: 1px solid white;
  border-radius: 20px;
  /* margin-top: 10px; */
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

#image-div {
  display: flex;
  flex-direction: column;
}

#form-div-one {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  justify-content: left;
  justify-items: left;
}
#form-div-two {
  /* display: flex; */
  /* flex-direction: column; */
  width: 50%;
  /* height: 100%; */
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

#choose-file-button {
  height: 40px;
  margin-bottom: 10px;
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
  /* max-height: 100%; */
  padding: 0% 5% 3% 5%;
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

#button-div button {
  padding-left: 15px;
  padding-right: 15px;
  margin: auto;
}

h5 {
  color: red;
}
</style>