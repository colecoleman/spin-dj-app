<template>
  <div id="container">
    <div id="left-section-container">
      <div id="form-div">
        <base-card>
          <div id="heading-div">
            <h1>Adding a new event?</h1>
            <h3><i>Book it!</i></h3>
          </div>
        </base-card>
        <base-card>
          <div>
            <div class="form-div">
              <h2>Let's get some details about the event.</h2>
              <h5>Event Date:*</h5>

              <input
                type="date"
                class="datepicker-input quarter-width"
                :class="eventDateEmpty ? 'incomplete-field' : ''"
                v-model.lazy="eventDate"
              />

              <h5>Start Time:*</h5>
              <input
                type="time"
                class="datepicker-input quarter-width"
                :class="eventStartTimeEmpty ? 'incomplete-field' : ''"
                v-model.lazy="eventStartTime"
              />
              <h5>End Time:*</h5>
              <input
                type="time"
                class="datepicker-input quarter-width"
                :class="eventEndTimeEmpty ? 'incomplete-field' : ''"
                v-model.lazy="eventEndTime"
              />
              <h5>Location(s):*</h5>
              <div id="location-list-div" v-if="eventLocations.length >= 0">
                <div v-for="(location, index) in eventLocations" :key="index">
                  <h5>
                    {{ location.locationName }}
                  </h5>
                  <p>{{ location.locationAddress1 }}</p>
                  <p>{{ location.locationAddress2 }}</p>
                </div>
              </div>
              <div id="location-input-div">
                <h5>Name:*</h5>
                <input
                  type="text"
                  class="half-width"
                  :class="locationNameIncomplete ? 'incomplete-field' : ''"
                  placeholder="Location Name"
                  v-model.lazy="addressFields.locationName"
                />
                <h5>Address 1:*</h5>
                <input
                  type="text"
                  class="half-width"
                  :class="locationAddress1Incomplete ? 'incomplete-field' : ''"
                  placeholder="12345 Street Drive"
                  v-model.lazy="addressFields.locationAddress1"
                />
                <h5>Address 2:*</h5>
                <input
                  type="text"
                  class="half-width"
                  :class="locationAddress2Incomplete ? 'incomplete-field' : ''"
                  placeholder="Anywhere, AZ, 12345"
                  v-model.lazy="addressFields.locationAddress2"
                />
              </div>
              <button @click="addAnotherAddress">Add Another Address</button>
            </div>
          </div>
        </base-card>
        <base-card
          ><div class="form-section-inner-wrapper">
            <h2>Now, some info on the client:*</h2>
            <div class="row-flex" id="existing-client-check-div">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                @click="existingClientButton()"
                mousedown.prevent="_"
              >
                <path
                  id="Icon_feather-circle"
                  data-name="Icon feather-circle"
                  d="M22,12.5A9.5,9.5,0,1,1,12.5,3,9.5,9.5,0,0,1,22,12.5Z"
                  transform="translate(-2 -2)"
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_82"
                  data-name="Path 82"
                  d="M7,0A7,7,0,1,1,0,7,7,7,0,0,1,7,0Z"
                  transform="translate(3.5 3.5)"
                  :fill="existingClientCheck ? '#ffffff' : '#000000'"
                />
              </svg>
              <h5>Existing Client?:</h5>
            </div>
            <div v-if="existingClientCheck" class="left-align">
              <h5>Search for existing client:</h5>
              <input
                type="text"
                placeholder="Rose Mary"
                class="half-width"
                v-model="clientSearchTerm"
                @keyup="searchForClients()"
              />
              <div id="existing-client-window">
                <div
                  v-for="client in matchingClients"
                  :key="client.id"
                  class="row-flex list-item"
                  @click="addSearchedClientToEvent(client)"
                >
                  <img :src="client.profilePicture" alt="client-photo" />
                  <h5>{{ client.firstName }} {{ client.lastName }}</h5>
                </div>
              </div>
            </div>
            <div class="form-div" v-if="!existingClientCheck">
              <h5>First Name</h5>
              <input
                type="text"
                class="half-width"
                :class="
                  clientFieldFirstNameIncomplete ? 'incomplete-field' : ''
                "
                placeholder="Lily"
                v-model.lazy="clientFields.firstName"
              />
              <h5>Last Name</h5>
              <input
                type="text"
                class="half-width"
                :class="clientFieldLastNameIncomplete ? 'incomplete-field' : ''"
                placeholder="Aldrin"
                v-model.lazy="clientFields.lastName"
              />
              <h5>Phone Number</h5>
              <input
                type="tel"
                class="half-width"
                :class="
                  clientFieldPhoneNumberIncomplete ? 'incomplete-field' : ''
                "
                placeholder="(123) 867-5309"
                v-model.lazy="clientFields.phoneNumber"
              />
              <h5>Email Address</h5>
              <input
                type="email"
                class="half-width"
                :class="
                  clientFieldEmailAddressIncomplete ? 'incomplete-field' : ''
                "
                placeholder="lilyaldrin@domain.com"
                v-model.lazy="clientFields.emailAddress"
              />
              <button @click="addAnotherClient()" class="three-quarter-width">
                Add Another Client To Event
              </button>
            </div>
          </div></base-card
        >
        <base-card
          ><div class="form-section-inner-wrapper">
            <h2>Pricing and packaging</h2>
            <div class="left-align">
              <h4>Add Item:</h4>
              <h5>Choose from selections below:*</h5>
              <select
                class="half-width input"
                :class="eventItemsEmpty ? 'incomplete-field' : ''"
                v-model="itemPicker"
              >
                <option value="Packages">Packages</option>
                <option value="Services">Services</option>
                <option value="Add-Ons">Add-Ons</option>
              </select>
              <div
                class="pricing-options-window"
                v-if="itemPicker === 'Add-Ons'"
              >
                <div
                  v-for="addOn in addOns"
                  :key="addOn.id"
                  class="row-flex"
                  @click="addAddOnToEvent(addOn)"
                >
                  <img :src="addOn.photo" alt="add-on photo" />

                  <p>{{ addOn.addOnName }}</p>
                </div>
              </div>
              <div
                class="pricing-options-window"
                v-if="itemPicker === 'Services'"
              >
                <div
                  v-for="item in services"
                  :key="item.id"
                  class="row-flex list-item"
                  @click="addServiceToEvent(item)"
                >
                  <img :src="item.photo" alt="service photo" />
                  <p>{{ item.serviceName }}</p>
                </div>
              </div>
              <div
                class="pricing-options-window"
                v-if="itemPicker === 'Packages'"
              >
                <div
                  v-for="item in packages"
                  :key="item.id"
                  class="row-flex"
                  @click="addPackageToEvent(item)"
                >
                  <img :src="item.photo" alt="package photo" />
                  <div>
                    <h5>{{ item.packageName }}</h5>
                    <div
                      v-for="service in item.selectedServices"
                      :key="service.id"
                    >
                      <p>{{ service.serviceName }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-div">
              <h4>Adjustments:</h4>
              <div class="indention row-flex row-space">
                <div>
                  <p>Adjustment Type:</p>
                  <select
                    v-model="adjustmentFields.adjustmentType"
                    class="select"
                  >
                    <option value="Charge">Charge</option>
                    <option value="Discount">Discount</option>
                  </select>
                </div>
                <div>
                  <p>Name:</p>
                  <input
                    type="text"
                    placeholder="Friends and Family"
                    v-model="adjustmentFields.adjustmentName"
                  />
                </div>
                <div>
                  <p>Amount:</p>
                  <input
                    type="number"
                    placeholder="$100"
                    v-model="adjustmentFields.adjustmentAmount"
                  />
                </div>
              </div>
              <button
                class="indention quarter-width"
                @click="addAdjustmentToEvent()"
              >
                Add Adjustment
              </button>

              <h4>Payments:</h4>
              <div class="indention row-flex row-space">
                <div>
                  <p>Type:</p>
                  <select class="select" v-model="paymentFields.paymentType">
                    <option value="Card">Card</option>
                    <option value="Check">Check</option>
                    <option value="Cash">Cash</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <p>Date:</p>
                  <input type="date" v-model="paymentFields.paymentDate" />
                </div>
                <div>
                  <p>Amount:</p>
                  <input
                    type="number"
                    placeholder="$100"
                    v-model="paymentFields.paymentAmount"
                  />
                </div>
              </div>
              <div class="indention">
                <p>Reference*</p>
                <input
                  type="text"
                  placeholder="ASKJFHNKJ0987654"
                  v-model="paymentFields.paymentReference"
                />
              </div>
              <button
                class="indention quarter-width"
                @click="addPaymentToEvent()"
              >
                Add Payment
              </button>
            </div>
          </div></base-card
        >
        <base-card class="row-flex no-bottom-margin"
          ><div id="button-div" class="row-flex">
            <button
              id="submitButton"
              type="button"
              @click="validationCheck(), submitEvent()"
            >
              Submit
            </button>
            <button
              id="addAnother"
              type="button"
              @click="submitAndAddAnother()"
            >
              Submit and Add Another
            </button>
            <button id="resetButton" type="button" @click="resetInput()">
              Reset
            </button>
          </div></base-card
        >
      </div>
    </div>
    <div id="review-div">
      <base-card>
        <div id="right-section-inner-wrapper">
          <h2>Review</h2>
          <div class="review-section-section">
            <h3>Event Information:</h3>
            <h4 v-if="eventDate">Event Date:</h4>
            <p>{{ eventDate }}</p>
            <h4 v-if="eventStartTime">Start Time:</h4>
            <p v-if="eventStartTime">
              {{ convertTwentyFourHourTime(eventStartTime) }}
            </p>
            <h4 v-if="eventEndTime">End Time:</h4>
            <p v-if="eventEndTime">
              {{ convertTwentyFourHourTime(eventEndTime) }}
            </p>
            <h4 v-if="eventStartTime && eventEndTime">Time Difference</h4>
            <p v-if="eventStartTime && eventEndTime">
              {{ calculateTimeDifference() }}
            </p>
            <h4 v-if="addressFields.locationName">Location Name:</h4>
            <p>{{ addressFields.locationName }}</p>

            <p>{{ addressFields.locationAddress1 }}</p>

            <p>{{ addressFields.locationAddress2 }}</p>
            <div v-if="eventLocations.length >= 0">
              <div v-for="(location, index) in eventLocations" :key="index">
                <h4>Location Name:</h4>
                <p>{{ location.locationName }}</p>

                <p>{{ location.locationAddress1 }}</p>

                <p>{{ location.locationAddress2 }}</p>
              </div>
            </div>
          </div>
          <div class="review-section-section">
            <h3>Client Information:</h3>
            <h4 v-if="clientFields.firstName">First Name:</h4>
            <p>{{ clientFields.firstName }}</p>
            <h4 v-if="clientFields.lastName">Last Name:</h4>
            <p>{{ clientFields.lastName }}</p>
            <h4 v-if="clientFields.phoneNumber">Phone Number:</h4>
            <p>{{ clientFields.phoneNumber }}</p>
            <h4 v-if="clientFields.emailAddress">Email Address:</h4>
            <p>{{ clientFields.emailAddress }}</p>
            <div v-if="eventClients.length >= 0">
              <div v-for="(client, index) in eventClients" :key="index">
                <h4>First Name:</h4>
                <p>{{ client.firstName }}</p>
                <h4>Last Name:</h4>
                <p>{{ client.lastName }}</p>
                <h4>Phone Number:</h4>
                <p>{{ client.phoneNumber }}</p>
                <h4>Email Address:</h4>
                <p>{{ client.emailAddress }}</p>
              </div>
            </div>
          </div>
          <div class="review-section-section">
            <h3>Invoice Details:</h3>
            <h4 v-if="eventItems.eventPackages.length > 0">Packages:</h4>
            <div
              v-for="(item, index) in eventItems.eventPackages"
              :key="item.id"
              class="indention"
            >
              <div class="row-flex">
                <h5>{{ item.packageName }}</h5>
                <svg
                  @click="removePackageFromEvent(index)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 38 38"
                >
                  <g
                    id="Icon_ionic-ios-close-circle-outline"
                    data-name="Icon ionic-ios-close-circle-outline"
                    transform="translate(19) rotate(45)"
                  >
                    <g
                      id="Icon_ionic-ios-close-circle-outline-2"
                      data-name="Icon ionic-ios-close-circle-outline"
                      transform="translate(13.435 -4.773) rotate(45)"
                    >
                      <path
                        id="Path_63"
                        data-name="Path 63"
                        d="M19.463,18.429l-2.407-2.407,2.407-2.407a.73.73,0,0,0-1.032-1.032l-2.407,2.407-2.407-2.407a.73.73,0,0,0-1.032,1.032l2.407,2.407-2.407,2.407a.706.706,0,0,0,0,1.032.725.725,0,0,0,1.032,0l2.407-2.407,2.407,2.407a.733.733,0,0,0,1.032,0A.725.725,0,0,0,19.463,18.429Z"
                        transform="translate(-3.148 -3.147)"
                        fill="#fff"
                      />
                      <path
                        id="Path_64"
                        data-name="Path 64"
                        d="M12.875,4.654A8.218,8.218,0,1,1,7.061,7.061a8.167,8.167,0,0,1,5.814-2.407m0-1.279a9.5,9.5,0,1,0,9.5,9.5,9.5,9.5,0,0,0-9.5-9.5Z"
                        fill="#fff"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <br />
              <div
                v-for="item in item.selectedServices"
                :key="item.id"
                class="indention"
              >
                <h5>
                  {{ item.serviceName }}
                </h5>
                <p class="right-align">
                  ${{
                    parseInt(
                      calculateServiceInvoiceTotal(item)
                    ).toLocaleString()
                  }}
                </p>
              </div>
            </div>
            <h4 v-if="eventItems.eventServices.length > 0">Services:</h4>
            <div v-if="eventItems.eventServices.length > 0" class="indention">
              <div
                v-for="(item, index) in eventItems.eventServices"
                :key="item.id"
                class="indention"
              >
                <div class="row-flex">
                  <h5>
                    {{ item.serviceName }}
                  </h5>
                  <svg
                    @click="removeServiceFromEvent(index)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 38 38"
                  >
                    <g
                      id="Icon_ionic-ios-close-circle-outline"
                      data-name="Icon ionic-ios-close-circle-outline"
                      transform="translate(19) rotate(45)"
                    >
                      <g
                        id="Icon_ionic-ios-close-circle-outline-2"
                        data-name="Icon ionic-ios-close-circle-outline"
                        transform="translate(13.435 -4.773) rotate(45)"
                      >
                        <path
                          id="Path_63"
                          data-name="Path 63"
                          d="M19.463,18.429l-2.407-2.407,2.407-2.407a.73.73,0,0,0-1.032-1.032l-2.407,2.407-2.407-2.407a.73.73,0,0,0-1.032,1.032l2.407,2.407-2.407,2.407a.706.706,0,0,0,0,1.032.725.725,0,0,0,1.032,0l2.407-2.407,2.407,2.407a.733.733,0,0,0,1.032,0A.725.725,0,0,0,19.463,18.429Z"
                          transform="translate(-3.148 -3.147)"
                          fill="#fff"
                        />
                        <path
                          id="Path_64"
                          data-name="Path 64"
                          d="M12.875,4.654A8.218,8.218,0,1,1,7.061,7.061a8.167,8.167,0,0,1,5.814-2.407m0-1.279a9.5,9.5,0,1,0,9.5,9.5,9.5,9.5,0,0,0-9.5-9.5Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <p class="right-align">
                  ${{
                    parseInt(
                      calculateServiceInvoiceTotal(item)
                    ).toLocaleString()
                  }}
                </p>
              </div>
            </div>
            <h4 v-if="eventItems.eventAddOns.length > 0">Add-Ons:</h4>
            <div v-if="eventItems.eventAddOns.length > 0" class="indention">
              <div
                v-for="(item, index) in eventItems.eventAddOns"
                :key="item.id"
                class="indention"
              >
                <div class="row-flex">
                  <h5>{{ item.addOnName }}</h5>
                  <svg
                    @click="removeAddOnFromEvent(index)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 38 38"
                  >
                    <g
                      id="Icon_ionic-ios-close-circle-outline"
                      data-name="Icon ionic-ios-close-circle-outline"
                      transform="translate(19) rotate(45)"
                    >
                      <g
                        id="Icon_ionic-ios-close-circle-outline-2"
                        data-name="Icon ionic-ios-close-circle-outline"
                        transform="translate(13.435 -4.773) rotate(45)"
                      >
                        <path
                          id="Path_63"
                          data-name="Path 63"
                          d="M19.463,18.429l-2.407-2.407,2.407-2.407a.73.73,0,0,0-1.032-1.032l-2.407,2.407-2.407-2.407a.73.73,0,0,0-1.032,1.032l2.407,2.407-2.407,2.407a.706.706,0,0,0,0,1.032.725.725,0,0,0,1.032,0l2.407-2.407,2.407,2.407a.733.733,0,0,0,1.032,0A.725.725,0,0,0,19.463,18.429Z"
                          transform="translate(-3.148 -3.147)"
                          fill="#fff"
                        />
                        <path
                          id="Path_64"
                          data-name="Path 64"
                          d="M12.875,4.654A8.218,8.218,0,1,1,7.061,7.061a8.167,8.167,0,0,1,5.814-2.407m0-1.279a9.5,9.5,0,1,0,9.5,9.5,9.5,9.5,0,0,0-9.5-9.5Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <p class="right-align">
                  ${{
                    parseInt(calculateAddOnInvoiceTotal(item)).toLocaleString()
                  }}
                </p>
              </div>
            </div>
            <h4
              v-if="
                eventItems.eventAddOns.length > 0 ||
                eventItems.eventServices.length > 0 ||
                eventItems.eventPackages.length > 0
              "
            >
              Subtotal:
            </h4>
            <p
              v-if="
                eventItems.eventAddOns.length > 0 ||
                eventItems.eventServices.length > 0 ||
                eventItems.eventPackages.length > 0
              "
              class="right-align"
            >
              ${{ calculateSubtotal().toLocaleString() }}
            </p>
            <h4
              v-if="
                adjustmentFields.adjustmentAmount ||
                adjustmentFields.adjustmentType ||
                adjustmentFields.adjustmentName ||
                eventInvoice.adjustments.length > 0
              "
            >
              Adjustments:
            </h4>
            <div class="indention">
              <h5 class="indention" v-if="adjustmentFields.adjustmentName">
                {{ adjustmentFields.adjustmentName + `: ` }}
              </h5>
              <p
                v-if="
                  adjustmentFields.adjustmentType === 'Discount' &&
                  adjustmentFields.adjustmentAmount
                "
                class="right-align"
              >
                - ${{ adjustmentFields.adjustmentAmount }}
              </p>
              <p
                v-if="
                  adjustmentFields.adjustmentType === 'Charge' &&
                  adjustmentFields.adjustmentAmount
                "
                class="right-align"
              >
                + ${{ adjustmentFields.adjustmentAmount }}
              </p>
            </div>
            <div v-if="eventInvoice.adjustments.length > 0" class="indention">
              <div
                v-for="(item, index) in eventInvoice.adjustments"
                :key="index"
              >
                <div class="row-flex">
                  <h5 class="indention" v-if="item.adjustmentName">
                    {{ item.adjustmentName + `: ` }}
                  </h5>
                  <svg
                    @click="removeAdjustmentFromEvent(index)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 38 38"
                  >
                    <g
                      id="Icon_ionic-ios-close-circle-outline"
                      data-name="Icon ionic-ios-close-circle-outline"
                      transform="translate(19) rotate(45)"
                    >
                      <g
                        id="Icon_ionic-ios-close-circle-outline-2"
                        data-name="Icon ionic-ios-close-circle-outline"
                        transform="translate(13.435 -4.773) rotate(45)"
                      >
                        <path
                          id="Path_63"
                          data-name="Path 63"
                          d="M19.463,18.429l-2.407-2.407,2.407-2.407a.73.73,0,0,0-1.032-1.032l-2.407,2.407-2.407-2.407a.73.73,0,0,0-1.032,1.032l2.407,2.407-2.407,2.407a.706.706,0,0,0,0,1.032.725.725,0,0,0,1.032,0l2.407-2.407,2.407,2.407a.733.733,0,0,0,1.032,0A.725.725,0,0,0,19.463,18.429Z"
                          transform="translate(-3.148 -3.147)"
                          fill="#fff"
                        />
                        <path
                          id="Path_64"
                          data-name="Path 64"
                          d="M12.875,4.654A8.218,8.218,0,1,1,7.061,7.061a8.167,8.167,0,0,1,5.814-2.407m0-1.279a9.5,9.5,0,1,0,9.5,9.5,9.5,9.5,0,0,0-9.5-9.5Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </svg>
                </div>

                <p
                  v-if="
                    item.adjustmentType === 'Discount' && item.adjustmentAmount
                  "
                  class="right-align"
                >
                  - ${{ item.adjustmentAmount }}
                </p>
                <p
                  v-if="
                    item.adjustmentType === 'Charge' && item.adjustmentAmount
                  "
                  class="right-align"
                >
                  + ${{ item.adjustmentAmount }}
                </p>
              </div>
            </div>
            <h4
              v-if="
                paymentFields.paymentAmount || eventInvoice.payments.length > 0
              "
            >
              Payments:
            </h4>
            <div class="indention">
              <h5 class="indention" v-if="paymentFields.paymentType">
                {{ paymentFields.paymentType + `: ` }}
              </h5>
              <p v-if="paymentFields.paymentAmount" class="right-align">
                - ${{ paymentFields.paymentAmount.toLocaleString() }}
              </p>
            </div>
            <div v-if="eventInvoice.payments.length > 0" class="indention">
              <div v-for="(item, index) in eventInvoice.payments" :key="index">
                <div class="row-flex">
                  <h5 class="indention" v-if="item.paymentType">
                    {{ item.paymentType + ` ` }}
                  </h5>
                  <svg
                    @click="removePaymentFromEvent(index)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 38 38"
                  >
                    <g
                      id="Icon_ionic-ios-close-circle-outline"
                      data-name="Icon ionic-ios-close-circle-outline"
                      transform="translate(19) rotate(45)"
                    >
                      <g
                        id="Icon_ionic-ios-close-circle-outline-2"
                        data-name="Icon ionic-ios-close-circle-outline"
                        transform="translate(13.435 -4.773) rotate(45)"
                      >
                        <path
                          id="Path_63"
                          data-name="Path 63"
                          d="M19.463,18.429l-2.407-2.407,2.407-2.407a.73.73,0,0,0-1.032-1.032l-2.407,2.407-2.407-2.407a.73.73,0,0,0-1.032,1.032l2.407,2.407-2.407,2.407a.706.706,0,0,0,0,1.032.725.725,0,0,0,1.032,0l2.407-2.407,2.407,2.407a.733.733,0,0,0,1.032,0A.725.725,0,0,0,19.463,18.429Z"
                          transform="translate(-3.148 -3.147)"
                          fill="#fff"
                        />
                        <path
                          id="Path_64"
                          data-name="Path 64"
                          d="M12.875,4.654A8.218,8.218,0,1,1,7.061,7.061a8.167,8.167,0,0,1,5.814-2.407m0-1.279a9.5,9.5,0,1,0,9.5,9.5,9.5,9.5,0,0,0-9.5-9.5Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </svg>
                </div>

                <p v-if="item.paymentAmount" class="right-align">
                  - ${{ item.paymentAmount.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row-flex">
          <h3>Total:</h3>
          <h4 class="right-align">${{ calculateTotal().toLocaleString() }}</h4>
        </div>
      </base-card>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import BaseCard from "../../components/UI/BaseCard.vue";


export default {
  data() {
    return {
      existingClientCheck: false,
      addressFields: {
        locationName: undefined,
        locationAddress1: undefined,
        locationAddress2: undefined,
      },
      clientFields: {
        firstName: undefined,
        lastName: undefined,
        phoneNumber: undefined,
        emailAddress: undefined,
      },
      clientFieldFirstNameIncomplete: false,
      clientFieldLastNameIncomplete: false,
      clientFieldPhoneNumberIncomplete: false,
      clientFieldEmailAddressIncomplete: false,
      locationNameIncomplete: false,
      locationAddress1Incomplete: false,
      locationAddress2Incomplete: false,
      paymentReferenceEmpty: false,
      eventDateEmpty: false,
      eventItemsEmpty: false,
      eventStartTimeEmpty: false,
      eventEndTimeEmpty: false,
      fieldsEmpty: false,

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
      addOns: [],
      services: [],
      packages: [],
      eventItems: {
        eventAddOns: [],
        eventServices: [],
        eventPackages: [],
      },
      eventInvoice: {
        adjustments: [],
        payments: [],
        depositRequired: null,
      },
      eventDate: undefined,
      eventStartTime: undefined,
      eventEndTime: undefined,
      hourTimeDifference: undefined,
      minuteTimeDifference: undefined,
      fifteenMinuteIntervalPriceFactor: undefined,
      itemPicker: "Packages",
      eventLocations: [],
      clientSearchTerm: null,
      matchingClients: [],
      eventClients: [],
      notes: null,
      matchingEvents: [],
      missingFields: false,
    };
  },
  computed: {
    events() {
      return this.$store.state.clientEventCombined;
    },
    today() {
      return new dayjs();
    },
    clients() {
      return this.$store.state.clients;
    },
  },
  methods: {
    addAnotherAddress() {
      this.eventLocations.push(this.addressFields);
      this.addressFields = {
        locationName: undefined,
        locationAddress1: undefined,
        locationAddress2: undefined,
      };
    },
    existingClientButton() {
      this.existingClientCheck = !this.existingClientCheck;
    },
    searchForClients() {
      console.log(this.clientSearchTerm);
      if (this.clientSearchTerm === "") {
        this.clientSearchTerm = null;
        this.matchingClients = [];
      } else if (this.clientSearchTerm != null) {
        console.log(this.clientSearchTerm);
        this.matchingClients = [];
        this.clients.forEach((client) => {
          let combinedName = client.firstName.concat(" ", client.lastName);
          if (
            client.firstName
              .toLowerCase()
              .includes(this.clientSearchTerm.toLowerCase()) ||
            client.lastName
              .toLowerCase()
              .includes(this.clientSearchTerm.toLowerCase()) ||
            combinedName
              .toLowerCase()
              .includes(this.clientSearchTerm.toLowerCase())
          ) {
            this.matchingClients.push(client);
          }
        });
      }
    },
    addSearchedClientToEvent(client) {
      this.eventClients.push(client);
    },
    addAnotherClient() {
      this.eventClients.push(this.clientFields);

      this.clientFields = {
        firstName: undefined,
        lastName: undefined,
        phoneNumber: undefined,
        emailAddress: undefined,
      };
    },
    addServiceToEvent(item) {
      this.eventItems.eventServices.push(item);
    },
    addPackageToEvent(item) {
      this.eventItems.eventPackages.push(item);
    },
    addAddOnToEvent(item) {
      this.eventItems.eventAddOns.push(item);
    },
    removeServiceFromEvent(index) {
      this.eventItems.eventServices.splice(index, 1);
    },

    removeAddOnFromEvent(index) {
      this.eventItems.eventAddOns.splice(index, 1);
    },

    removePackageFromEvent(index) {
      this.eventItems.eventPackages.splice(index, 1);
    },
    addAdjustmentToEvent() {
      let item = {
        adjustmentType: this.adjustmentFields.adjustmentType,
        adjustmentName: this.adjustmentFields.adjustmentName,
        adjustmentAmount: this.adjustmentFields.adjustmentAmount,
      };
      this.eventInvoice.adjustments.push(item);
      this.adjustmentFields.adjustmentType = undefined;
      this.adjustmentFields.adjustmentName = undefined;
      this.adjustmentFields.adjustmentAmount = undefined;
    },
    addPaymentToEvent() {
      let item = {
        paymentType: this.paymentFields.paymentType,
        paymentDate: this.paymentFields.paymentDate,
        paymentReference: this.paymentFields.paymentReference,
        paymentAmount: this.paymentFields.paymentAmount,
      };
      this.eventInvoice.payments.push(item);
      this.paymentFields.paymentType = undefined;
      this.paymentFields.paymentDate = undefined;
      this.paymentFields.paymentReference = undefined;
      this.paymentFields.paymentAmount = undefined;
    },
    removeAdjustmentFromEvent(index) {
      this.eventInvoice.adjustments.splice(index, 1);
    },

    removePaymentFromEvent(index) {
      this.eventInvoice.payments.splice(index, 1);
    },

    validationCheck() {
      if (
        this.addressFields.locationName === undefined &&
        this.eventLocations.length === 0
      ) {
        this.locationNameIncomplete = true;
      } else {
        this.locationNameIncomplete = false;
      }
      if (
        this.addressFields.locationAddress1 === undefined &&
        this.eventLocations.length === 0
      ) {
        this.locationAddress1Incomplete = true;
      } else {
        this.locationAddress1Incomplete = false;
      }
      if (
        this.addressFields.locationAddress2 === undefined &&
        this.eventLocations.length === 0
      ) {
        this.locationAddress2Incomplete = true;
      } else {
        this.locationAddress2Incomplete = false;
      }
      if (
        this.clientFields.firstName === undefined &&
        this.eventClients.length === 0
      ) {
        this.clientFieldFirstNameIncomplete = true;
      } else {
        this.clientFieldFirstNameIncomplete = false;
      }
      if (
        this.clientFields.lastName === undefined &&
        this.eventClients.length === 0
      ) {
        this.clientFieldLastNameIncomplete = true;
      } else {
        this.clientFieldLastNameIncomplete = false;
      }
      if (
        this.clientFields.phoneNumber === undefined &&
        this.eventClients.length === 0
      ) {
        this.clientFieldPhoneNumberIncomplete = true;
      } else {
        this.clientFieldPhoneNumberIncomplete = false;
      }
      if (
        this.clientFields.emailAddress === undefined &&
        this.eventClients.length === 0
      ) {
        this.clientFieldEmailAddressIncomplete = true;
      } else {
        this.clientFieldEmailAddressIncomplete = false;
      }
      if (
        this.eventItems.eventAddOns.length === 0 &&
        this.eventItems.eventServices.length === 0 &&
        this.eventItems.eventPackages.length === 0
      ) {
        this.eventItemsEmpty = true;
      } else {
        this.eventItemsEmpty = false;
      }
      if (this.eventDate === undefined) {
        this.eventDateEmpty = true;
      } else {
        this.eventDateEmpty = false;
      }
      if (this.eventStartTime === undefined) {
        this.eventStartTimeEmpty = true;
      } else {
        this.eventStartTimeEmpty = false;
      }
      if (this.eventEndTime === undefined) {
        this.eventEndTimeEmpty = true;
      } else {
        this.eventEndTimeEmpty = false;
      }
      if (
        this.paymentFields.paymentAmount &&
        this.paymentFields.paymentReference === null
      ) {
        this.paymentReferenceEmpty = true;
      }
      if (
        this.clientFieldFirstNameIncomplete ||
        this.clientFieldLastNameIncomplete ||
        this.clientFieldPhoneNumberIncomplete ||
        this.clientFieldEmailAddressIncomplete ||
        this.locationNameIncomplete ||
        this.locationAddress1Incomplete ||
        this.locationAddress2Incomplete ||
        this.paymentReferenceEmpty ||
        this.eventDateEmpty ||
        this.eventItemsEmpty ||
        this.eventStartTimeEmpty ||
        this.eventEndTimeEmpty
      ) {
        this.fieldsEmpty = true;
      } else {
        this.fieldsEmpty = false;
      }
    },
    submitEvent() {
      if (this.fieldsEmpty) {
        alert(
          "Oops! There's some fields missing. Check over your responses to make sure everything is complete!"
        );
      } else {
        this.eventLocations.push(this.addressFields);
        this.eventClients.push(this.clientFields);
        this.eventInvoice.adjustments.push(this.adjustmentFields);
        this.eventInvoice.payments.push(this.paymentFields);
        console.log(
          this.eventItems,
          this.eventInvoice,
          this.eventDate,
          this.eventStartTime,
          this.eventEndTime,
          this.eventLocations
        );
        
      }
    },
    resetInput() {
      this.existingClientCheck = false;
      this.addressFields = {
        locationName: undefined,
        locationAddress1: undefined,
        locationAddress2: undefined,
      };
      this.clientFields = {
        firstName: undefined,
        lastName: undefined,
        phoneNumber: undefined,
        emailAddress: undefined,
      };
      this.clientFieldFirstNameIncomplete = false;
      this.clientFieldLastNameIncomplete = false;
      this.clientFieldPhoneNumberIncomplete = false;
      this.clientFieldEmailAddressIncomplete = false;
      this.locationNameIncomplete = false;
      this.locationAddress1Incomplete = false;
      this.locationAddress2Incomplete = false;
      this.paymentReferenceEmpty = false;
      this.eventDateEmpty = false;
      this.eventItemsEmpty = false;
      this.eventStartTimeEmpty = false;
      this.eventEndTimeEmpty = false;
      this.fieldsEmpty = false;

      this.adjustmentFields = {
        adjustmentType: null,
        adjustmentName: null,
        adjustmentAmount: null,
      };
      this.paymentFields = {
        paymentType: null,
        paymentDate: null,
        paymentReference: null,
        paymentAmount: null,
      };
      this.addOns = [];
      this.services = [];
      this.packages = [];
      this.eventItems = {
        eventAddOns: [],
        eventServices: [],
        eventPackages: [],
      };
      this.eventInvoice = {
        adjustments: [],
        payments: [],
        depositRequired: null,
      };
      this.eventDate = undefined;
      this.eventStartTime = undefined;
      this.eventEndTime = undefined;
      this.hourTimeDifference = undefined;
      this.minuteTimeDifference = undefined;
      this.fifteenMinuteIntervalPriceFactor = undefined;
      this.itemPicker = "Packages";
      this.eventLocations = [];
      this.clientSearchTerm = null;
      this.matchingClients = [];
      this.eventClients = [];
      this.notes = null;
      this.matchingEvents = [];
      this.missingFields = false;
    },
    // assignEventToContact(eventId, firstName, lastName, eventDate) {
    //   this.associatedEventIds.push(eventId);
    //   this.searchTerm = `${firstName} ${lastName}, ${eventDate}`;
    // },
    convertTwentyFourHourTime(time) {
      let string = time.split(":");

      let hh = string[0];
      let m = string[1];
      let dd = "AM";
      let h = hh;
      if (hh > 12) {
        h = hh - 12;
        dd = "PM";
      } else if (hh == 0) {
        h = 12;
      }

      if (this.eventStartTime && this.eventEndTime) {
        this.calculateTimeDifference();
      }
      return h + ":" + m + " " + dd;
    },
    calculateTimeDifference() {
      let startTime = this.eventStartTime.split(":");
      let endTime = this.eventEndTime.split(":");
      let fromTimeHour = dayjs().hour(parseInt(startTime[0]));
      let toTimeHour = dayjs().hour(parseInt(endTime[0]));
      let hourTimeDifference = toTimeHour.diff(fromTimeHour, "hours");
      if (hourTimeDifference < 0) {
        hourTimeDifference = hourTimeDifference + 24;
      }
      let fromTimeMinute = dayjs().minute(parseInt(startTime[1]));
      let toTimeMinute = dayjs().minute(parseInt(endTime[1]));
      let tempMinuteTimeDifference = toTimeMinute.diff(
        fromTimeMinute,
        "minutes"
      );
      let minuteTimeDifference = tempMinuteTimeDifference;

      if (minuteTimeDifference <= -1) {
        minuteTimeDifference = 60 + minuteTimeDifference;
        hourTimeDifference--;
      } else if (minuteTimeDifference > 60) {
        hourTimeDifference++;
        minuteTimeDifference = 0;
      }

      this.hourTimeDifference = hourTimeDifference;
      this.minuteTimeDifference = minuteTimeDifference;
      return (
        hourTimeDifference + " hours" + ", " + minuteTimeDifference + " minutes"
      );
    },
    calculateServiceInvoiceTotal(service) {
      this.calculateFifteenMinuteIntervalFactor();
      if (service.priceOption === "flat") {
        return parseInt(service.flatRatePriceOption.rate);
      } else if (service.priceOption === "hourly") {
        let price;
        let additionalHours =
          this.hourTimeDifference - service.hourlyPriceOption.baseTime;

        price =
          parseInt(service.hourlyPriceOption.baseRate) +
          parseInt(
            service.hourlyPriceOption.additionalHourlyRate * additionalHours
          );

        let minutePrice =
          parseInt(service.hourlyPriceOption.additionalHourlyRate) *
          this.fifteenMinuteIntervalPriceFactor;

        price = price + minutePrice;

        return price;
      }
    },
    calculateFifteenMinuteIntervalFactor() {
      let fifteenMinuteIntervalPriceFactor;
      if (this.minuteTimeDifference > 0 && this.minuteTimeDifference <= 15) {
        fifteenMinuteIntervalPriceFactor = 0.25;
      } else if (
        this.minuteTimeDifference > 15 &&
        this.minuteTimeDifference <= 30
      ) {
        fifteenMinuteIntervalPriceFactor = 0.5;
      } else if (
        this.minuteTimeDifference > 30 &&
        this.minuteTimeDifference <= 45
      ) {
        fifteenMinuteIntervalPriceFactor = 0.75;
      } else if (
        this.minuteTimeDifference > 45 &&
        this.minuteTimeDifference <= 59
      ) {
        fifteenMinuteIntervalPriceFactor = 1;
      }
      if (isNaN(fifteenMinuteIntervalPriceFactor)) {
        fifteenMinuteIntervalPriceFactor = 0;
      }
      this.fifteenMinuteIntervalPriceFactor = fifteenMinuteIntervalPriceFactor;
    },
    calculateAddOnInvoiceTotal(addOn) {
      if (addOn.priceOption === "flat") {
        return parseInt(addOn.flatRatePriceOption.rate);
      } else if (addOn.priceOption === "hourly") {
        let price;
        price = parseInt(addOn.rate) * parseInt(this.hourTimeDifference);

        let minutePrice =
          parseInt(addOn.rate) * this.fifteenMinuteIntervalPriceFactor;

        price = price + minutePrice;

        return price;
      }
    },
    calculateSubtotal() {
      this.calculateFifteenMinuteIntervalFactor();
      let subtotal = 0;
      this.eventItems.eventAddOns.forEach((item) => {
        if (item.priceOption === "flat") {
          subtotal = subtotal + item.rate;
        }
        if (item.priceOption === "hourly") {
          let hourTotal =
            parseInt(item.rate) * parseInt(this.hourTimeDifference);
          let minuteTotal =
            parseInt(item.rate) *
            parseInt(this.fifteenMinuteIntervalPriceFactor);
          subtotal = subtotal + hourTotal + minuteTotal;
        }
      });
      this.eventItems.eventServices.forEach((item) => {
        if (item.priceOption === "flat") {
          subtotal = subtotal + parseInt(item.flatRatePriceOption.rate);
        }
        if (item.priceOption === "hourly") {
          let price;
          let additionalHours =
            this.hourTimeDifference - item.hourlyPriceOption.baseTime;

          price =
            parseInt(item.hourlyPriceOption.baseRate) +
            parseInt(
              item.hourlyPriceOption.additionalHourlyRate * additionalHours
            );

          let minutePrice =
            parseInt(item.hourlyPriceOption.additionalHourlyRate) *
            this.fifteenMinuteIntervalPriceFactor;

          price = price + minutePrice;

          subtotal = subtotal + price;
        }
      });
      this.eventItems.eventPackages.forEach((item) => {
        let packageTotal = 0;
        item.selectedServices.forEach((item) => {
          if (item.priceOption === "flat") {
            packageTotal =
              packageTotal + parseInt(item.flatRatePriceOption.rate);
          }
          if (item.priceOption === "hourly") {
            let price = 0;
            let additionalHours =
              this.hourTimeDifference - item.hourlyPriceOption.baseTime;

            price =
              parseInt(item.hourlyPriceOption.baseRate) +
              parseInt(
                item.hourlyPriceOption.additionalHourlyRate * additionalHours
              );

            let minutePrice =
              parseInt(item.hourlyPriceOption.additionalHourlyRate) *
              this.fifteenMinuteIntervalPriceFactor;

            price = parseInt(price) + parseInt(minutePrice);

            packageTotal = packageTotal + price;
            // return price;
          }
        });
        subtotal = parseInt(subtotal) + parseInt(packageTotal);
      });
      return subtotal;
    },
    calculateTotal() {
      let total = parseInt(this.calculateSubtotal());

      let adjustmentAmount = 0;

      if (this.eventInvoice.adjustments.length > 0) {
        this.eventInvoice.adjustments.forEach((item) => {
          if (item.adjustmentType === "Discount") {
            adjustmentAmount =
              adjustmentAmount - parseInt(item.adjustmentAmount);
          } else if (item.adjustmentType === "Charge")
            adjustmentAmount =
              adjustmentAmount + parseInt(item.adjustmentAmount);
        });
      }
      if (
        this.adjustmentFields.adjustmentType === "Charge" &&
        this.adjustmentFields.adjustmentAmount
      ) {
        adjustmentAmount =
          adjustmentAmount + parseInt(this.adjustmentFields.adjustmentAmount);
      }
      if (
        this.adjustmentFields.adjustmentType === "Discount" &&
        this.adjustmentFields.adjustmentAmount
      ) {
        adjustmentAmount =
          adjustmentAmount - parseInt(this.adjustmentFields.adjustmentAmount);
      }
      let paymentAmount = 0;
      if (this.eventInvoice.payments.length > 0) {
        this.eventInvoice.payments.forEach((item) => {
          paymentAmount = paymentAmount + parseInt(item.paymentAmount);
        });
      }
      if (this.paymentFields.paymentAmount) {
        paymentAmount =
          paymentAmount + parseInt(this.paymentFields.paymentAmount);
      }

      total =
        parseInt(total) + parseInt(adjustmentAmount) - parseInt(paymentAmount);
      // if (total === undefined || isNaN(total)) {
      //   total = 0;
      // }

      return total;
    },
  },
  components: { BaseCard },
  
};
</script>

<style scoped>
/* Establishing Styles */
h1 {
  width: 90%;
  text-transform: uppercase;
  text-align: left;
  background-color: none;
  background-image: linear-gradient(transparent 95%, #00f5ff 99%);
  background-size: 55px;
  margin: 10px;
}
h2 {
  text-align: center;
}
h3 {
  width: 60%;
  margin: 0px;

  text-align: right;
  align-self: right;
}
h4 {
  text-transform: none;
  margin: 10px;
}
h5 {
  margin: 5px;
}
p {
  font-weight: 300;
  font-size: 15px;
  margin: 0 0 0 15px;
}

img {
  width: 50px;
  height: 50px;
  clip-path: circle(25px at center);
}
/* Layout Styles */
#container {
  margin: 10px;
  height: calc(100% - 20px);
  display: flex;
  flex-direction: row;
}
#left-section-container {
  width: 70%;
  overflow: scroll;
  border-radius: 25px;
  padding: 3px;
}

.form-div {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  height: 100%;
  text-align: left;
}

#form-div > div {
  margin-bottom: 10px;
}

#heading-div {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
}

#right-section-inner-wrapper {
  width: 100%;
  text-align: left;
  overflow: scroll;
  height: 90%;
  border-bottom: 1px solid white;
}

#location-input-div {
  margin: 10px 0 10px 10px;
}

#existing-client-window,
.pricing-options-window {
  padding-left: 20px;
}

#existing-client-check-div {
  margin: 10px;
}

#review-div {
  width: 30%;
  margin-left: 10px;
}

.review-section-section {
  margin-top: 10px;
  border-top: 1px solid white;
}

#button-div {
  display: flex;

  flex-direction: row;
  width: 100%;
  align-items: center;
  align-self: center;
}

/* Sub-Styles */

#right-section-inner-wrapper h3 {
  text-align: left;
  width: 100%;
}

.incomplete-field {
  border: 1px solid red;
}

#location-list-div {
  margin-left: 10px;
}

#location-list-div > div {
  margin: 20px 10px 10px 10px;
}

#button-div button {
  padding-left: 15px;
  padding-right: 15px;
  margin: auto;
}

#form-div button {
  margin-left: 30px;
  width: 30%;
}

/* Form Styling */

input,
textarea,
.input,
select {
  color: white;
  font-family: montserrat, helvetica, sans-serif;
  background: none;
  border: 1px solid white;
  border-radius: 20px;
  height: 30px;
  padding-left: 20px;
  margin: 15px;
}

input:focus,
textarea:focus,
.input:focus select:focus {
  outline: none;
  border: 1px solid #00f5ff;
}

input[type="”date”"] {
  position: relative;
}

input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.35);
  font-family: Montserrat, Helvetica, sans-serif;
}

.datepicker-input::-webkit-calendar-picker-indicator {
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  display: block;
  padding-right: 10px;

  border-width: thin;
  z-index: 100;
  filter: invert(1);
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

.error {
  color: red;
}

/* Class Stylings */

.row-flex {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
}

.row-flex > div {
  height: 100%;
}

.row-space {
  justify-content: space-between;
}

.indention {
  margin-left: 10%;
  margin-bottom: 0;
}

.left-align {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-items: flex-start;
  text-align: left;
}

.right-align {
  text-align: right;
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

.list-item {
  margin: 10px;
  margin-bottom: 20px;
}
</style>