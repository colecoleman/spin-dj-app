<template>
  <section>
    <div id="configuration-navigation">
      <base-navigation-card>
        <template v-slot:navigation>
          <admin-view-config-navigation-items />
        </template>
      </base-navigation-card>
    </div>
    <div id="body">
      <div class="config-section">
        <base-card>
          <template v-slot:title>Branding</template>
          <template v-slot:content>
            <div id="branding-preferences-wrapper">
              <div class="branding-preferences-item">
                <p>
                  Background Color:
                  {{ businessSettings.brandingPreferences.backgroundColor }}
                </p>

                <input
                  type="color"
                  v-model="businessSettings.brandingPreferences.backgroundColor"
                  name=""
                  id=""
                />
              </div>
              <div class="branding-preferences-item">
                <p>
                  Foreground Color:
                  {{ businessSettings.brandingPreferences.foregroundColor }}
                </p>
                <input
                  type="color"
                  v-model="businessSettings.brandingPreferences.foregroundColor"
                  name=""
                  id=""
                />
              </div>
              <div class="branding-preferences-item">
                <p>
                  Card Outline:
                  {{ businessSettings.brandingPreferences.cardOutline }}
                </p>
                <input
                  type="color"
                  v-model="businessSettings.brandingPreferences.cardOutline"
                  name=""
                  id=""
                />
              </div>
              <div class="branding-preferences-item">
                <p>
                  Highlight Color:
                  {{ businessSettings.brandingPreferences.highlightColor }}
                </p>
                <input
                  type="color"
                  v-model="businessSettings.brandingPreferences.highlightColor"
                  name=""
                  id=""
                />
              </div>
              <div class="branding-preferences-item">
                <p>
                  Text Color:
                  {{ businessSettings.brandingPreferences.textColor }}
                </p>
                <input
                  type="color"
                  v-model="businessSettings.brandingPreferences.textColor"
                  name=""
                  id=""
                />
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="config-section">
        <base-card
          ><template v-slot:title>Information</template>
          <template v-slot:content>
            <div class="business-information-wrapper">
              <div class="business-information-section">
                <div class="business-information-item">
                  <p class="bold">Business Name:</p>
                  <input
                    type="text"
                    :placeholder="businessSettings.businessInfo.businessName"
                  />
                </div>
                <div class="business-information-item">
                  <p>Business Phone Number:</p>
                  <input
                    type="text"
                    :placeholder="
                      businessSettings.businessInfo.businessPhoneNumber
                    "
                  />
                </div>
                <div class="business-information-item">
                  <p class="bold">Business Email Addresses:</p>
                  <div
                    class="business-information-item"
                    v-for="(address, index) in businessSettings.businessInfo
                      .businessEmailAddresses"
                    :key="index"
                  >
                    <p>Email Address ({{ index + 1 }}):</p>
                    <input type="text" :placeholder="address.address" />
                  </div>
                </div>
              </div>
              <div class="business-information-section">
                <div class="business-information-item">
                  <p class="bold">Business Address:</p>
                  <div class="business-information-item">
                    <p>Address 1:</p>
                    <input
                      type="text"
                      :placeholder="
                        businessSettings.businessInfo.businessAddress
                          .address1one
                      "
                    />
                  </div>
                  <div class="business-information-item">
                    <p>Address 2:</p>
                    <input
                      type="text"
                      :placeholder="
                        businessSettings.businessInfo.businessAddress
                          .address1two
                      "
                    />
                  </div>
                  <div class="business-information-item">
                    <p>City, State, Zip Code:</p>
                    <input
                      type="text"
                      :placeholder="
                        businessSettings.businessInfo.businessAddress.address2
                      "
                    />
                  </div>
                </div>
              </div>
            </div> </template
        ></base-card>
      </div>
      <div class="config-section">
        <base-card>
          <template v-slot:title>Services</template>
          <template v-slot:content>
            <h5 v-if="!businessSettings.services">
              No services have been added yet! Add some!
            </h5>
            <div class="service-section">
              <h5 class="bold">Add New Service:</h5>
              <div class="service-item">
                <p>Service Name:</p>
                <input type="text" />
              </div>
              <div class="service-item">
                <p>Price Option:</p>
                <select name="price-option" id="">
                  <option value="hourly">Hourly Rate</option>
                  <option value="flat">Flat Rate</option>
                </select>
              </div>
              <div class="service-item">
                <div class="service-item">
                  <p>Minimum # Hours:</p>
                  <input type="number" />
                </div>
                <div class="service-item">
                  <p>
                    Base Rate (4 Hours) <i>DEV: FILL WITH PREVIOUS INPUT</i>
                  </p>
                  <input type="number" />
                </div>
                <div class="service-item">
                  <p>Additional Hourly:</p>
                  <input type="number" />
                </div>
              </div>
              <div class="service-item">
                <div class="service-item">
                  <p>Flat Rate:</p>
                  <input type="number" />
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="config-section">
        <base-card>
          <template v-slot:title>Packages</template>
          <template v-slot:content></template>
        </base-card>
      </div>
      <div class="config-section">
        <base-card>
          <template v-slot:title>Add-Ons</template>
          <template v-slot:content></template>
        </base-card>
      </div>
      <div class="config-section">
        <base-card>
          <template v-slot:title>Discounts</template>
          <template v-slot:content></template>
        </base-card>
      </div>
      <div class="config-section">
        <base-card>
          <template v-slot:title>Equipment</template>
          <template v-slot:content><h4>Coming Soon</h4></template>
        </base-card>
      </div>
      <div class="config-section">
        <base-card>
          <template v-slot:title>Automations</template>
          <template v-slot:content></template>
        </base-card>
      </div>
      <div class="config-section">
        <base-card>
          <template v-slot:title>To-Dos</template>
          <template v-slot:content></template>
        </base-card>
      </div>
      <div class="config-section">
        <base-card>
          <template v-slot:title>Payments</template>
          <template v-slot:content></template>
        </base-card>
      </div>
      <div class="config-section">
        <base-card>
          <template v-slot:title>Reports</template>
          <template v-slot:content></template>
        </base-card>
      </div>
    </div>
    <button-standard-with-icon
      class="floating-button"
      text="Save"
    ></button-standard-with-icon>
  </section>
</template>

<script>
import BaseCard from "../../../SharedComponents/SharedComponentsUI/BaseCard.vue";
import BaseNavigationCard from "../../../SharedComponents/SharedComponentsUI/BaseNavigationCard.vue";
import ButtonStandardWithIcon from "../../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";
import AdminViewConfigNavigationItems from "./AdminViewConfigNavigationItems.vue";
export default {
  data() {
    return {
      businessSettings: {},

      inputs: {
        information: {
          businessName: "Spin Entertainment",
          businessAddress: {
            address1one: "12345 Anywhere St",
            address1two: undefined,
            address2: "Anywhere, AZ, 12345",
          },
          businessPhoneNumber: 13148568522,
          businessEmailAddresses: [
            {
              address: "name@domain.com",
            },
            {
              address: "company@domain.com",
            },
          ],
        },
        branding: {
          backgroundColor: "#F0F0F0",
          foregroundColor: "#FFFFFF",
          cardOutline: "#DDDDDD",
          highlightColor: "#00F5FF",
          textColor: "#000000",
        },
        services: {
          serviceName: undefined,
          priceOption: {
            flat: {
              flatRate: undefined,
            },
            hourly: {
              baseTime: undefined,
              baseRate: undefined,
              addhourly: undefined,
            },
          },
          photo: undefined,
          equipmentNeeded: [],
          employeesRequired: undefined,
        },
        packages: {
          packageName: undefined,
          servicesIncluded: [],
          baseTime: undefined,
          baseDiscount: undefined,
          addHourlyDiscount: undefined,
        },
        addOns: {
          addOnName: undefined,
          priceOption: {
            unit: {
              unitRate: undefined,
              minUnits: undefined,
            },
            flat: {
              flatRate: undefined,
            },
            photo: undefined,
            equipmentNeeded: undefined,
          },
        },
        discounts: {
          discountName: undefined,
          discountType: {
            percentage: {
              discountAmount: undefined,
            },
            dollar: {
              discountAmount: undefined,
            },
          },
        },
        automations: {
          applicablePackages: [],
          applicableContactType: [],
          approvalRequired: false,
          trigger: undefined,
          // work within aws to determine allowable triggers
          actionType: {
            email: {
              to: undefined,
              from: undefined,
              subject: undefined,
              content: undefined,
            },
            toDo: {
              content: undefined,
            },
          },
        },
      },
      services: [],
      packages: [],
      addOns: [],
      discounts: [],
      automations: [],
    };
  },
  created() {
    this.businessSettings = this.$store.state.businessSettings;
  },

  components: {
    BaseNavigationCard,
    BaseCard,
    AdminViewConfigNavigationItems,
    ButtonStandardWithIcon,
  },
};
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
#configuration-navigation {
  width: 20%;
  height: 100%;
}
#body {
  width: 80%;
  height: 100%;
  overflow: scroll;
}

#branding-preferences-wrapper {
  display: flex;
  flex-direction: row;
}

.branding-preferences-item {
  display: flex;
  flex-direction: column;
  width: 20%;
}

.business-information-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.business-information-section,
.service-section {
  width: 50%;
}

.business-information-item,
.service-item {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 10px;
}

.business-information-item > p,
.service-item > p,
.service-section > h5 {
  text-align: left;
}

.business-information-item > input,
.service-item > input,
.service-item > select {
  width: 50%;
}

.bold {
  font-weight: 600;
  margin-top: 20px;
}

.floating-button {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background-color: var();
}
</style>