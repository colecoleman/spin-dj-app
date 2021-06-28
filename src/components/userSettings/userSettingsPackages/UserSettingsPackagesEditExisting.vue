<template>
  <section id="main-wrapper">
    <div class="three-quarter-width" id="scroll-wrapper">
      <base-card id="details-form">
        <div id="middle-section-inner-wrapper">
          <div id="top-wrapper">
            <div id="heading-div">
              <h2>Got some changes to make?</h2>
            </div>
          </div>
          <div id="input-div">
            <form>
              <div class="form-div">
                <h4 for="service Name">Package Name:*</h4>
                <input
                  type="text"
                  name="Package Name"
                  placeholder="Gold Package"
                  v-model="packageName"
                  :class="{ 'incomplete-field': packageNameMissing }"
                />
                <h4 for="Description">Description:*</h4>
                <input
                  type="text"
                  name="Description"
                  placeholder="Describe your service for your clients to see."
                  v-model="packageDescription"
                  :class="{ 'incomplete-field': packageDescriptionMissing }"
                />
                <h4 for="Notes">Notes:</h4>
                <textarea
                  name="Notes"
                  rows="1"
                  placeholder="Put something descriptive here!"
                  v-model="notes"
                />

                <h4 for="Representative Image">Image:</h4>
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
        </div>
      </base-card>
      <base-card id="service-form">
        <div id="service-wrapper">
          <h2>Much better. Changing the structure?</h2>
          <h4>Here are your available services:</h4>
          <p>Click to add them to your package:</p>
          <div id="services-window">
            <div
              v-for="(service, index) in services"
              :key="index"
              class="service-item"
              @click="selectServices(service.id)"
            >
              <h4>{{ service.serviceName }}</h4>

              <div
                v-if="service.priceOption === 'hourly'"
                id="service-item-price"
              >
                <h5>
                  ${{
                    parseInt(
                      service.hourlyPriceOption.baseRate
                    ).toLocaleString()
                  }}
                  for {{ service.hourlyPriceOption.baseTime }} hours
                </h5>
                <h5>
                  + ${{
                    parseInt(
                      service.hourlyPriceOption.additionalHourlyRate
                    ).toLocaleString()
                  }}/ add. hour
                </h5>
              </div>
              <div
                v-if="service.priceOption === 'flat'"
                id="service-item-price"
              >
                <h5>
                  ${{
                    parseInt(service.flatRatePriceOption.rate).toLocaleString()
                  }}, flat rate
                </h5>
              </div>
            </div>
          </div>
          <h4>Services Chosen:</h4>
          <p>You can edit the pricing and details to your liking</p>
          <h5 class="error" v-if="selectedServices.length <= 0">
            You haven't added any services! Please add some to get started.
          </h5>
          <div id="services-window">
            <div
              v-for="(service, index) in selectedServices"
              :key="index"
              class="service-item chosen-service-item"
            >
              <div class="chosen-service-item-info">
                <div class="chosen-service-item-info-heading">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    @click="removeServices(service)"
                  >
                    <path
                      id="Path_63"
                      data-name="Path 63"
                      d="M19.463,18.429l-2.407-2.407,2.407-2.407a.73.73,0,0,0-1.032-1.032l-2.407,2.407-2.407-2.407a.73.73,0,0,0-1.032,1.032l2.407,2.407-2.407,2.407a.706.706,0,0,0,0,1.032.725.725,0,0,0,1.032,0l2.407-2.407,2.407,2.407a.733.733,0,0,0,1.032,0A.725.725,0,0,0,19.463,18.429Z"
                      transform="translate(25.521 -6.523) rotate(90)"
                    />
                    <path
                      id="Path_64"
                      data-name="Path 64"
                      d="M12.875,4.654A8.218,8.218,0,1,1,7.061,7.061a8.167,8.167,0,0,1,5.814-2.407m0-1.279a9.5,9.5,0,1,0,9.5,9.5,9.5,9.5,0,0,0-9.5-9.5Z"
                      transform="translate(22.375 -3.375) rotate(90)"
                    />
                  </svg>
                  <h4>{{ service.serviceName }}</h4>
                </div>

                <div
                  v-if="service.priceOption === 'hourly'"
                  id="service-item-price"
                >
                  <h5>
                    ${{
                      parseInt(
                        service.hourlyPriceOption.baseRate
                      ).toLocaleString()
                    }}
                    for
                    {{ service.hourlyPriceOption.baseTime }}
                    hours
                  </h5>
                  <h5>
                    + ${{
                      parseInt(
                        service.hourlyPriceOption.additionalHourlyRate
                      ).toLocaleString()
                    }}/ add. hour
                  </h5>
                </div>
                <div
                  v-if="service.priceOption === 'flat'"
                  id="service-item-price"
                >
                  <h5>
                    ${{
                      parseInt(
                        service.flatRatePriceOption.rate
                      ).toLocaleString()
                    }}, flat rate
                  </h5>
                </div>
              </div>
              <div
                class="chosen-service-item-override"
                v-if="service.priceOption === 'hourly'"
              >
                <div class="chosen-service-item-override-field">
                  <h5>Base Rate:</h5>
                  <input
                    type="number"
                    :placeholder="service.hourlyPriceOption.baseRate"
                    v-model.lazy="
                      selectedServices[index].hourlyPriceOption.baseRate
                    "
                  />
                </div>
                <div class="chosen-service-item-override-field">
                  <h5>Base Time:</h5>
                  <input
                    type="number"
                    :placeholder="service.hourlyPriceOption.baseTime"
                    v-model.lazy="
                      selectedServices[index].hourlyPriceOption.baseTime
                    "
                  />
                </div>

                <div class="chosen-service-item-override-field">
                  <h5>Add. Hourly Rate:</h5>
                  <input
                    type="number"
                    :placeholder="
                      service.hourlyPriceOption.additionalHourlyRate
                    "
                    v-model.lazy="
                      selectedServices[index].hourlyPriceOption
                        .additionalHourlyRate
                    "
                  />
                </div>
              </div>
              <div
                class="chosen-service-item-override"
                v-if="service.priceOption === 'flat'"
              >
                <div class="chosen-service-item-override-field">
                  <h5>Rate:</h5>
                  <input
                    type="number"
                    :placeholder="service.flatRatePriceOption.rate"
                    v-model="selectedServices[index].flatRatePriceOption.rate"
                  />
                </div>
              </div>
            </div>
          </div>
          <h4>Employees Needed:</h4>
          <p>
            For some services, you can assign multiple tasks to one employee.
          </p>
          <p>
            Your <i>service items</i> already have required employees counted.
            If you'd like, you can override them below.
          </p>
          <div id="services-window">
            <div
              v-for="service in selectedServices"
              :key="service.id"
              class="service-item chosen-service-item"
            >
              <div class="chosen-service-item-info">
                <div class="chosen-service-item-info-heading">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    @click="removeServices(service)"
                  >
                    <path
                      id="Path_63"
                      data-name="Path 63"
                      d="M19.463,18.429l-2.407-2.407,2.407-2.407a.73.73,0,0,0-1.032-1.032l-2.407,2.407-2.407-2.407a.73.73,0,0,0-1.032,1.032l2.407,2.407-2.407,2.407a.706.706,0,0,0,0,1.032.725.725,0,0,0,1.032,0l2.407-2.407,2.407,2.407a.733.733,0,0,0,1.032,0A.725.725,0,0,0,19.463,18.429Z"
                      transform="translate(25.521 -6.523) rotate(90)"
                    />
                    <path
                      id="Path_64"
                      data-name="Path 64"
                      d="M12.875,4.654A8.218,8.218,0,1,1,7.061,7.061a8.167,8.167,0,0,1,5.814-2.407m0-1.279a9.5,9.5,0,1,0,9.5,9.5,9.5,9.5,0,0,0-9.5-9.5Z"
                      transform="translate(22.375 -3.375) rotate(90)"
                    />
                  </svg>
                  <h4>{{ service.serviceName }}</h4>
                </div>

                <div id="service-item-price">
                  <h5>
                    Employees Required:
                    {{ service.additionalEmployees }}
                  </h5>
                </div>
              </div>

              <div class="chosen-service-item-override">
                <div class="chosen-service-item-override-field">
                  <h5>Employees Required:</h5>
                  <input
                    type="number"
                    :placeholder="service.additionalEmployees"
                    v-model="selectedServices.additionalEmployees"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </base-card>
      <h5 class="error" v-if="fieldsMissing">
        Please complete the missing fields
      </h5>
      <h5 v-if="successfullyUploaded">Successfully Uploaded!</h5>
      <div id="button-wrapper">
        <base-card>
          <div id="button-div">
            <button
              id="submitButton"
              type="button"
              @click="
                validationCheck();
                submitservices();
              "
            >
              Submit
            </button>
          </div>
        </base-card>
      </div>
    </div>
    <div id="review-div">
      <base-card>
        <div id="right-section-inner-wrapper">
          <h2>Review</h2>
          <h4>Package Name:</h4>
          <p>{{ packageName }}</p>
          <h4>Package Description</h4>
          <p>{{ packageDescription }}</p>
          <h4>Notes:</h4>
          <p>{{ notes }}</p>
          <h4>Photo:</h4>
          <img v-if="selectedFile" :src="selectedFileUrl" alt="Package Image" />
          <h4>Selected Services:</h4>
          <p v-for="service in selectedServices" :key="service.id">
            {{ service.serviceName }}
          </p>
          <h4>Price Simulation:</h4>
          <h5>4 Hours:</h5>
          <p>${{ calculateFourHourPricePreview() }}</p>
          <h5>5 Hours:</h5>
          <p>${{ calculateFiveHourPricePreview() }}</p>
          <h5>6 Hours:</h5>
          <p>${{ calculateSixHourPricePreview() }}</p>
          <h5>7 Hours:</h5>
          <p>${{ calculateSevenHourPricePreview() }}</p>
          <h5>8 Hours:</h5>
          <p>${{ calculateEightHourPricePreview() }}</p>
          <h4>Employees Required:</h4>
          <p>{{ employeesNeeded }}</p>
        </div>
      </base-card>
    </div>
  </section>
</template>

<script>
import BaseCard from "../../UI/BaseCard.vue";


export default {
  data() {
    return {
      packageName: null,
      packageDescription: null,
      packageId: null,
      package: [],
      notes: null,
      additionalEmployees: 0,
      services: [],
      selectedServices: [],
      selectedFile: null,
      packageNameMissing: false,
      fourHourPricePreview: 0,
      fiveHourPricePreview: 0,
      sixHourPricePreview: 0,
      sevenHourPricePreview: 0,
      eightHourPricePreview: 0,
      packageDescriptionMissing: false,
      successfullyUploaded: false,
      fieldsMissing: false,
    };
  },
  computed: {
    selectedFileUrl() {
      return URL.createObjectURL(this.selectedFile);
    },
    employeesNeeded() {
      return this.calculateEmployeesNeeded();
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
    selectServices(id) {
      let serviceToBeAdded = this.services.findIndex((x) => x.id === id);
      this.selectedServices.push(this.services[serviceToBeAdded]);
      console.log(this.selectedServices);
      console.log(this.services);
    },

    getStockItem(id) {
      let matchedItem = this.services.findIndex((x) => x.id === id);
      console.log(matchedItem);
      console.log(this.services);
      console.log(this.services[matchedItem]);
      return this.services[matchedItem];
    },

    removeServices(item) {
      let indexToBeRemoved = this.selectedServices.findIndex(
        (x) => x.id === item.id
      );
      this.selectedServices.splice(indexToBeRemoved, 1);
      console.log(this.selectedServices);
    },
    calculateFourHourPricePreview() {
      console.log("four");
      let prices = [];
      this.selectedServices.forEach((element) => {
        if (element.priceOption == "hourly") {
          let timeDifference = 4 - parseInt(element.hourlyPriceOption.baseTime);
          console.log(timeDifference);
          let basePrice = parseInt(element.hourlyPriceOption.baseRate);
          console.log(basePrice);
          let hourlyDifferenceTime = parseInt(
            element.hourlyPriceOption.additionalHourlyRate * timeDifference
          );
          console.log(hourlyDifferenceTime);
          let total = basePrice + hourlyDifferenceTime;
          console.log(total);
          prices.push(total);
        } else if (element.priceOption == "flat") {
          prices.push(element.flatRatePriceOption.rate);
        }
      });
      let result = prices.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      if (isNaN(result)) {
        return "0".toLocaleString();
      } else {
        return result.toLocaleString();
      }
    },
    calculateFiveHourPricePreview() {
      console.log("five");
      let prices = [];
      this.selectedServices.forEach((element) => {
        if (element.priceOption === "hourly") {
          let timeDifference = 5 - parseInt(element.hourlyPriceOption.baseTime);
          console.log(timeDifference);
          let basePrice = parseInt(element.hourlyPriceOption.baseRate);
          console.log(basePrice);
          let hourlyDifferenceTime = parseInt(
            element.hourlyPriceOption.additionalHourlyRate * timeDifference
          );
          console.log(hourlyDifferenceTime);
          let total = basePrice + hourlyDifferenceTime;
          console.log(total);
          prices.push(total);
        } else if (element.priceOption === "flat") {
          prices.push(element.flatRatePriceOption.rate);
        }
      });
      let result = prices.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      if (isNaN(result)) {
        return "0".toLocaleString();
      } else {
        return result.toLocaleString();
      }
    },
    calculateSixHourPricePreview() {
      console.log("six");
      let prices = [];
      this.selectedServices.forEach((element) => {
        if (element.priceOption === "hourly") {
          let timeDifference = 6 - parseInt(element.hourlyPriceOption.baseTime);
          console.log(timeDifference);
          let basePrice = parseInt(element.hourlyPriceOption.baseRate);
          console.log(basePrice);
          let hourlyDifferenceTime = parseInt(
            element.hourlyPriceOption.additionalHourlyRate * timeDifference
          );
          console.log(hourlyDifferenceTime);
          let total = basePrice + hourlyDifferenceTime;
          console.log(total);
          prices.push(total);
        } else if (element.priceOption === "flat") {
          prices.push(element.flatRatePriceOption.rate);
        }
      });
      let result = prices.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      if (isNaN(result)) {
        return "0".toLocaleString();
      } else {
        return result.toLocaleString();
      }
    },
    calculateSevenHourPricePreview() {
      console.log("seven");
      let prices = [];
      this.selectedServices.forEach((element) => {
        if (element.priceOption === "hourly") {
          let timeDifference = 7 - parseInt(element.hourlyPriceOption.baseTime);
          console.log(timeDifference);
          let basePrice = parseInt(element.hourlyPriceOption.baseRate);
          console.log(basePrice);
          let hourlyDifferenceTime = parseInt(
            element.hourlyPriceOption.additionalHourlyRate * timeDifference
          );
          console.log(hourlyDifferenceTime);
          let total = basePrice + hourlyDifferenceTime;
          console.log(total);
          prices.push(total);
        } else if (element.priceOption === "flat") {
          prices.push(element.flatRatePriceOption.rate);
        }
      });
      let result = prices.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      if (isNaN(result)) {
        return "0".toLocaleString();
      } else {
        return result.toLocaleString();
      }
    },
    calculateEightHourPricePreview() {
      console.log("eight");
      let prices = [];
      this.selectedServices.forEach((element) => {
        if (element.priceOption === "hourly") {
          let timeDifference = 8 - parseInt(element.hourlyPriceOption.baseTime);
          console.log(timeDifference);
          let basePrice = parseInt(element.hourlyPriceOption.baseRate);
          console.log(basePrice);
          let hourlyDifferenceTime = parseInt(
            element.hourlyPriceOption.additionalHourlyRate * timeDifference
          );
          console.log(hourlyDifferenceTime);
          let total = basePrice + hourlyDifferenceTime;
          console.log(total);
          prices.push(total);
        } else if (element.priceOption === "flat") {
          prices.push(element.flatRatePriceOption.rate);
        }
      });
      let result = prices.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      if (isNaN(result)) {
        return "0".toLocaleString();
      } else {
        return result.toLocaleString();
      }
    },

    calculateEmployeesNeeded() {
      let employees = [];
      this.selectedServices.forEach((element) => {
        employees.push(parseInt(element.additionalEmployees));
      });
      let result = employees.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      if (isNaN(result)) {
        return 1;
      } else {
        return result;
      }
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
      return this.packageName === null ? true : false;
    },

    validateRate() {
      return this.rate === null ? true : false;
    },
    validateDescription() {
      return this.packageDescription === null ? true : false;
    },

    submitservices() {
      console.log(this.$route.params.packageid);
      // let id = this.$route.params.packageid;

      if (this.fieldsMissing) {
        return;
      } 
      // else {
      //   db.collection("packages")
      //     .doc(id)
      //     .update({
      //       packageName: this.packageName,
      //       packageDescription: this.packageDescription,
      //       notes: this.notes,
      //       employeesNeeded: this.calculateEmployeesNeeded(),
      //       selectedServices: this.selectedServices,
      //     })
      //     .then(() => {
      //       if (this.selectedFile === null) {
      //         this.$router.push("/packages");
      //         return;
      //       } else {
      //         const storageRef = firebase.storage().ref();
      //         const servicePhotoRef = storageRef.child(
      //           "packages/" + id + ".jpeg"
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
      //               db.collection("packages")
      //                 .doc(id)
      //                 .update({ photo: downloadURL })
      //                 .then(console.log("successfully updated"));
      //             })
      //             .then(() => {
      //               this.resetInput();
      //               this.$data.successfullyUploaded = true;
      //               this.$router.push("/packages");
      //             });
      //         });
      //       }
      //     });
      // }
    },
    resetInput() {
      this.packageName = null;
      this.packageDescription = null;
      this.notes = null;
      this.additionalEmployees = 0;
      this.services = [];
      this.selectedServices = [];
      this.selectedFile = null;
      this.packageNameMissing = false;
      this.rateMissing = false;
      this.packageDescriptionMissing = false;
      this.fourHourPricePreview = undefined;
      this.fiveHourPricePreview = undefined;
      this.sixHourPricePreview = undefined;
      this.sevenHourPricePreview = undefined;
      this.eightHourPricePreview = undefined;
      this.successfullyUploaded = false;
      this.fieldsMissing = false;
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
h3 {
  width: 60%;
  margin: 0px;

  text-align: right;
  align-self: right;
}
h4 {
  text-align: left;
  margin: 10px;
}
h5 {
  margin: 20px;
  text-align: left;
}

p {
  text-align: left;
  margin-left: 20px;
}

#main-wrapper {
  height: calc(100% - 20px);
  margin-top: 10px;
  display: flex;
}

#middle-section-inner-wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
}

#review-div {
  margin-left: 10px;
  width: 35%;
}
#right-section-inner-wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  height: 100%;
  overflow: scroll;
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

#scroll-wrapper {
  overflow: scroll;
  padding: 0 5px 0 5px;
  border-radius: 20px;
}

#input-div {
  display: flex;
  flex-direction: column;
}

form {
  display: flex;
  flex-direction: row;
  margin: 20px;
}

.form-div {
  display: flex;
  flex-direction: column;
  width: 70%;
}

textarea {
  height: 100px;
  /* width: 80%; */
  padding: 10px 0 0 20px;
}

input[type="file"] {
  background: none;
  border: 0;
}

img {
  height: 60px;
  width: 60px;
}

svg {
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
  /* margin-top: 10px; */
  margin: 20px 0 20px 0;
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
  line-height: 0.9;
}

.increment-spinner-left {
  margin: 20px 0 20px 0;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-right: none;
}
.increment-spinner-right {
  margin: 20px 0 20px 0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-left: none;
}

.number-wrapper {
  display: flex;
  flex-direction: row;
}

#details-form {
  height: unset;
}

#service-form {
  margin-top: 10px;
  height: unset;
}

#services-div {
  width: 100%;
  margin: 20px;
}

.service-item {
  border: 1px solid white;
  border-radius: 20px;
  margin: 20px;
  padding: 0 20px 0 20px;
  border-bottom: 1px solid white;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: stretch;
  align-items: center;
}

.service-item:hover {
  border: 1px solid #00f5ff;
  fill: #00f5ff;
  /* color: #00f5ff; */
  cursor: pointer;
}

.service-item::after {
  flex: 1;
  width: 100%;
}

.chosen-service-item {
  height: fit-content;
  padding: 20px;
  flex-direction: column;
}

.chosen-service-item-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: stretch;
  align-items: center;
  border-bottom: 1px solid white;
  fill: white;
}

.chosen-service-item-info-heading {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.chosen-service-item-override {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
}

.chosen-service-item-override-field {
  flex-direction: column;
  margin: 5px;
}

.chosen-service-item-override-field input,
.chosen-service-item-override-field h5 {
  margin-top: 0;
  margin-bottom: 0;
}

.chosen-service-item-override input {
  width: auto;
}

.service-item-price {
  align-self: center;
  align-content: center;
  align-items: center;
}

#service-item-price h5 {
  margin: 2px;
  text-align: right;
  align-self: center;
}

#service-wrapper p {
  text-align: left;
  margin: 0px 5px 5px 15px;
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

.quarter-width {
  width: 25%;
}

.half-width {
  width: 50%;
}

.three-quarter-width {
  width: 75%;
}

button {
  height: 40px;
  width: 50%;
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

#button-wrapper {
  height: 100px;
  margin-top: 10px;
}
#button-div {
  display: flex;
  /* height: 100px; */
  flex-direction: row;
  /* width: 50%; */
  align-items: center;
  align-self: center;
  justify-content: center;
}

#button-div button {
  padding-left: 15px;
  padding-right: 15px;
  margin: 10px;
}

.error {
  color: red;
  text-align: center;
}
</style>