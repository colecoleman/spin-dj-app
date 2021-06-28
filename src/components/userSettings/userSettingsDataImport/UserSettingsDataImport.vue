<template>
  <section>
    <base-card>
      <div class="inner-wrapper">
        <h1>Import data</h1>
        <h3>
          We built this handy tool to help you migrate data from other sources!
        </h3>

        <input
          type="file"
          name="Choose File"
          id="csv-input"
          @change="loadFile($event)"
        />
      </div>
      <button @click="uploadDataToDB()">Upload!</button>
    </base-card>
  </section>
</template>

<script>

import BaseCard from "../../UI/BaseCard.vue";
// let fileData = [];

export default {
  data() {
    return {
      uploadedFile: undefined,
    };
  },
  methods: {
    loadFile(event) {
      let file = event.target.files[0];
      console.log(file);
      let readerObj = new FileReader();
      readerObj.onload = function () {
        let fileText = readerObj.result;
        console.log(fileText);
        let key = fileText.split("\n");

        let array = [];
        key.forEach((element) => {
          let item = element.split(",");
          array.push(item);
        });

        let map = array[0];
        let tempEvents = [];
        array.forEach((element) => {
          let event = {};
          for (let i = 0; i < element.length; i++) {
            event[map[i]] = element[i];
          }
          tempEvents.push(event);
        });

        let events = [];
        tempEvents.forEach((event) => {
          let item = {
            client: {
              firstName: null,
              lastName: null,
              phoneNumber: null,
              emailAddress: null,
            },
            adjustmentFields: {
              adjustmentType: null,
              adjustmentName: null,
              adjustmentAmount: null,
            },
            paymentFields: {
              paymentType: null,
              paymentDate: null,
              paymentReference: null,
              paymentAmount: null,
            },
            eventItems: {
              eventAddOns: [null],
              eventServices: [null],
              eventPackages: [null],
            },
            eventInvoice: {
              dateCreated: null,
              dateBooked: null,
              adjustments: [
                {
                  adjustmentType: null,
                  adjustmentName: null,
                  adjustmentAmount: null,
                },
                {
                  adjustmentType: null,
                  adjustmentName: null,
                  adjustmentAmount: null,
                },
              ],
              payments: {
                0: {
                  paymentType: null,
                  paymentDate: null,
                  paymentReference: null,
                  paymentAmount: null,
                },
                1: {
                  paymentType: null,
                  paymentDate: null,
                  paymentReference: null,
                  paymentAmount: null,
                },
              },
              depositRequired: null,
            },
            eventLocations: [
              {
                locationAddress1: null,
                locationAddress2: null,
                locationName: null,
              },
              {
                locationAddress1: null,
                locationAddress2: null,
                locationName: null,
              },
            ],
            eventDate: null,
            eventStartTime: null,
            eventEndTime: null,
          };
          item.associatedClientIds = null;
          if (event["Event Date"]) {
            item.eventDate = event["Event Date"];
          }
          if (event["Add On Names"]) {
            item.eventItems.eventAddOns.AddOnName = event["Add On Names"];
          }
          if (event["Adjustment Name"]) {
            item.eventInvoice.adjustments[0].adjustmentAmount =
              event["Adjustment Name"];
          }
          if (event["Booked At"]) {
            item.eventInvoice.dateBooked = event["Booked At"];
          }
          if (event["Contact Email(s)"]) {
            item.client.emailAddress = event["Contact Email(s)"];
          }
          if (event["Name"]) {
            let name = event["Name"].split(" ");
            console.log(name);
            if (name.includes("&")) {
              let lastName = name[name.length - 3];
              item.client.lastName = lastName;

              let firstName = name.slice(0, name.length - 3);

              item.client.firstName = firstName.join(" ");
              item.client.lastName = lastName;
              // console.log(firstName);
              // console.log(lastName);

              console.log(firstName.join(" ") + lastName);
            }
          }
          if (event["Contact Phone(s)"]) {
            item.client.phoneNumber = event["Contact Phone(s)"];
          }
          if (event["Created At"]) {
            item.eventInvoice.dateCreated = event["Created At"];
          }
          if (event["End Time"]) {
            item.eventEndTime = event["End Time"];
          }
          if (event["Event Date"]) {
            item.eventDate = event["Event Date"];
          }
          if (event["Payments Collected"]) {
            item.eventInvoice.payments[0].paymentAmount =
              event["Payments Collected"];
          }

          item.eventInvoice.payments[0].paymentName = "Legacy Payments";

          if (event["Service Name"]) {
            item.eventItems.eventServices.serviceName = event["Service Name"];
          }

          if (event["Start Time"]) {
            item.eventStartTime = event["Start Time"];
          }
          if (event["Status"]) {
            item.status = event["Status"];
          }
          if (event["Tips Collected"]) {
            item.eventInvoice.payments[1].paymentAmount =
              event["Tips Collected"];
          }

          item.eventInvoice.payments[1].paymentName = "Tips Collected";
          if (event["Total Cost"]) {
            item.eventInvoice.total = event["Total Cost"];
          }
          if (event["Venue Name"]) {
            item.eventLocations[0].locationName = event["Venue Name"];
          }
          if (event["Venue Street Address"]) {
            item.eventLocations[0].locationAddress1 =
              event["Venue Street Address"];
          }
          if (
            event["Venue City"] &&
            event["Venue State/Province"] &&
            event["Venue Postal Code"]
          ) {
            item.eventLocations[0].locationAddress2 =
              event["Venue City"] +
              ", " +
              event["Venue State/Province"] +
              ", " +
              event["Venue Postal Code"];
          }
          //   console.log(item);
          events.push(item);
        });
        console.log(events);
        // fileData = Array.from(events);
        // console.log(this.uploadedEvents);
      };
      readerObj.readAsText(file);
    },
    // uploadDataToDB() {
    //   //   let array = this.uploadedEvents;
    //   //   console.log(array);
    //   console.log(fileData);
    //   //   console.log(this.uploadedEvents);
    //   //   console.log(db);
    //   fileData.forEach((event) => {
    //     db.collection("events")
    //       .add({
    //         eventItems: event.eventItems,
    //         eventInvoice: event.eventInvoice,
    //         eventDate: event.eventDate,
    //         eventStartTime: event.eventStartTime,
    //         eventEndTime: event.eventEndTime,
    //         eventLocations: event.eventLocations,
    //       })
    //       .then((docRef) => {
    //         console.log("event written with", docRef.id);
    //         return docRef.id;
    //       })
    //       .then((id) => {
    //         console.log(id);
    //         db.collection("clients")
    //           .add({
    //             firstName: event.client.firstName,
    //             lastName: event.client.lastName,
    //             emailAddress: event.client.emailAddress,
    //             phoneNumber: event.client.phoneNumber,
    //             associatedEventIds: id,
    //           })
    //           .then((docRef) => {
    //             db.collection("events").doc(id).update({
    //               associatedClientIds: docRef.id,
    //             });
    //             console.log(id, docRef.id);
    //           });
    //       });
    //   });
    // },
  },

  components: { BaseCard },
};
</script>

<style>
/* Base Structure */
section {
  margin-top: 10px;
  height: calc(100% - 20px);
  width: 100%;
}

.inner-wrapper {
  height: calc(100% -10px);
  width: 100%;
}

/* Styling-Classes */
.right-align {
  text-align: right;
}
</style>