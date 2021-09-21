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
      <div class="config-section" id="branding">
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
                    :placeholder="businessSettings.information.businessName"
                  />
                </div>
                <div class="business-information-item">
                  <p>Business Phone Number:</p>
                  <input
                    type="text"
                    :placeholder="
                      businessSettings.information.businessPhoneNumber
                    "
                  />
                </div>
                <div class="business-information-item">
                  <p class="bold">Business Email Addresses:</p>
                  <div
                    class="business-information-item"
                    v-for="(address, index) in businessSettings.information
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
                        businessSettings.information.businessAddress.address1one
                      "
                    />
                  </div>
                  <div class="business-information-item">
                    <p>Address 2:</p>
                    <input
                      type="text"
                      :placeholder="
                        businessSettings.information.businessAddress.address1two
                      "
                    />
                  </div>
                  <div class="business-information-item">
                    <p>City, State, Zip Code:</p>
                    <input
                      type="text"
                      :placeholder="
                        businessSettings.information.businessAddress.address2
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
            <div class="service-wrapper">
              <div class="service-section">
                <h5 class="bold">Add New Service:</h5>
                <div class="service-item">
                  <p>Service Name:</p>
                  <input
                    type="text"
                    v-model.trim="inputs.services.serviceName"
                  />
                </div>
                <div class="service-item">
                  <p>Photo:</p>
                  <input
                    type="file"
                    id="hidden-file-button"
                    @change="onFileChange"
                    style="display: none"
                  />
                  <button-standard-with-icon
                    text="Choose File"
                    @click="chooseFile()"
                    class="form-button"
                  />
                </div>
                <div class="service-item">
                  <p>Employees Required</p>
                  <input
                    type="number"
                    v-model.number="inputs.services.employeesRequired"
                  />
                </div>

                <div class="service-item">
                  <p>Price Option:</p>
                  <select
                    name="price-option"
                    id=""
                    v-model="inputs.services.priceOption"
                  >
                    <option disabled value="">Select a price option</option>
                    <option>Hourly Rate</option>
                    <option>Flat Rate</option>
                  </select>
                </div>
                <div
                  class="service-item"
                  v-if="inputs.services.priceOption === 'Hourly Rate'"
                >
                  <div class="service-item">
                    <p>Minimum # Hours:</p>
                    <input
                      type="number"
                      v-model.number="inputs.services.hourly.baseTime"
                    />
                  </div>
                  <div class="service-item">
                    <p>
                      Base Rate ({{ inputs.services.hourly.baseTime }}
                      Hours)
                    </p>
                    <input v-model.number="inputs.services.hourly.baseRate" />
                  </div>
                  <div class="service-item">
                    <p>Additional Hourly:</p>
                    <input v-model.number="inputs.services.hourly.addHourly" />
                  </div>
                  <button-standard-with-icon
                    text="Add Service"
                    @click="addService()"
                    class="form-button"
                  />
                </div>
                <div
                  class="service-item"
                  v-if="inputs.services.priceOption == 'Flat Rate'"
                >
                  <div class="service-item">
                    <p>Flat Rate:</p>
                    <input
                      type="number"
                      v-model.number="inputs.services.flat.flatRate"
                    />
                  </div>
                  <div class="service-item">
                    <button-standard-with-icon
                      text="Add Service"
                      @click="addService()"
                      class="form-button"
                    />
                  </div>
                </div>
              </div>
              <div class="service-section">
                <h5 v-if="!businessSettings.services.length">
                  No services have been added yet! Add some!
                </h5>
                <div
                  class="service-item"
                  style="border-bottom: 1px solid gray; margin-bottom: 10px"
                  v-for="service in businessSettings.services"
                  :key="service.id"
                >
                  <h4>{{ service.serviceName }}</h4>
                  <div class="service-display-section">
                    <div class="service-item" v-if="service.photo">
                      <p>Photo: {{ service.photo.name }}</p>
                    </div>
                  </div>

                  <div class="service-display-section">
                    <div
                      class="service-item"
                      v-if="service.priceOption === 'Flat Rate'"
                    >
                      <p>
                        <b>Flat Rate:</b>
                        {{ formatPrice(service.flat.flatRate) }}
                      </p>
                    </div>
                    <div
                      class="service-item"
                      v-if="service.priceOption === 'Hourly Rate'"
                    >
                      <p><b>Base Time: </b>{{ service.hourly.baseTime }}</p>
                      <p>
                        <b>Base Rate: </b
                        >{{ formatPrice(service.hourly.baseRate) }}
                      </p>
                      <p>
                        <b>Additional Hourly: </b
                        >{{ formatPrice(service.hourly.addHourly) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="config-section">
        <base-card>
          <template v-slot:title>Packages</template>
          <template v-slot:content>
            <div class="package-wrapper">
              <div class="package-section">
                <h5 class="bold">Add New package:</h5>
                <div class="package-item">
                  <p>Package Name:</p>
                  <input
                    type="text"
                    v-model.trim="inputs.packages.packageName"
                  />
                </div>
                <div class="package-item">
                  <p>Photo:</p>
                  <input
                    type="file"
                    id="hidden-file-button"
                    @change="onFileChange"
                    style="display: none"
                  />
                  <button-standard-with-icon
                    text="Choose File"
                    @click="chooseFile()"
                    class="form-button"
                  />
                </div>
                <div class="package-item">
                  <p>Services Included:</p>
                  <div
                    class="package-item row-flex"
                    v-for="service in businessSettings.services"
                    :key="service.id"
                  >
                    <p>
                      <input
                        type="checkbox"
                        :id="service.id"
                        @change="toggleServiceFromPackage(service.id)"
                        :name="service.serviceName"
                      />{{ service.serviceName }}
                    </p>
                  </div>
                </div>

                <div class="package-item">
                  <p>Price Option:</p>
                  <select
                    name="price-option"
                    id=""
                    v-model="inputs.packages.priceOption"
                  >
                    <option disabled value="">Select a price option</option>
                    <option>Hourly Rate</option>
                    <option>Flat Rate</option>
                  </select>
                </div>
                <div
                  class="package-item"
                  v-if="inputs.packages.priceOption === 'Hourly Rate'"
                >
                  <div class="package-item">
                    <p>Minimum # Hours:</p>
                    <input
                      type="number"
                      v-model.number="inputs.packages.hourly.baseTime"
                    />
                  </div>
                  <div class="package-item">
                    <p>
                      Base Rate ({{ inputs.packages.hourly.baseTime }}
                      Hours)
                    </p>
                    <input v-model.number="inputs.packages.hourly.baseRate" />
                  </div>
                  <div class="package-item">
                    <p>Additional Hourly:</p>
                    <input v-model.number="inputs.packages.hourly.addHourly" />
                  </div>
                  <button-standard-with-icon
                    text="Add Package"
                    @click="addPackage()"
                    class="form-button"
                  />
                </div>
                <div
                  class="package-item"
                  v-if="inputs.packages.priceOption == 'Flat Rate'"
                >
                  <div class="package-item">
                    <p>Flat Rate:</p>
                    <input
                      type="number"
                      v-model.number="inputs.packages.flat.flatRate"
                    />
                  </div>
                  <div class="package-item">
                    <button-standard-with-icon
                      text="Add package"
                      @click="addPackage()"
                      class="form-button"
                    />
                  </div>
                </div>
              </div>
              <div class="package-section">
                <h5 v-if="!businessSettings.packages.length">
                  No packages have been added yet! Add some!
                </h5>
                <div
                  class="package-item"
                  style="border-bottom: 1px solid gray; margin-bottom: 10px"
                  v-for="packag in businessSettings.packages"
                  :key="packag.id"
                >
                  <h4>{{ packag.packageName }}</h4>
                  <div class="package-display-section">
                    <div class="package-item" v-if="packag.photo">
                      <p>Photo: {{ packag.photo.name }}</p>
                    </div>
                  </div>

                  <div class="package-display-section">
                    <div
                      class="package-item"
                      v-if="packag.priceOption === 'Flat Rate'"
                    >
                      <p>
                        <b>Flat Rate:</b>
                        {{ formatPrice(packag.flat.flatRate) }}
                      </p>
                    </div>
                    <div
                      class="package-item"
                      v-if="packag.priceOption === 'Hourly Rate'"
                    >
                      <p><b>Base Time: </b>{{ packag.hourly.baseTime }}</p>
                      <p>
                        <b>Base Rate: </b
                        >{{ formatPrice(packag.hourly.baseRate) }}
                      </p>
                      <p>
                        <b>Additional Hourly: </b
                        >{{ formatPrice(packag.hourly.addHourly) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="config-section">
        <base-card>
          <template v-slot:title>Add-Ons</template>
          <template v-slot:content>
            <div class="add-on-wrapper">
              <div class="add-on-section">
                <h5 class="bold">Add New Add-On:</h5>
                <div class="add-on-item">
                  <p>Add-On Name:</p>
                  <input type="text" v-model.trim="inputs.addOns.addOnName" />
                </div>
                <div class="add-on-item">
                  <p>Photo:</p>
                  <input
                    type="file"
                    id="hidden-file-button"
                    @change="onFileChange"
                    style="display: none"
                  />
                  <button-standard-with-icon
                    text="Choose File"
                    @click="chooseFile()"
                    class="form-button"
                  />
                </div>
                <div class="add-on-item"></div>

                <div class="add-on-item">
                  <p>Price Option:</p>
                  <select
                    name="price-option"
                    id=""
                    v-model="inputs.addOns.priceOption"
                  >
                    <option disabled value="">Select a price option</option>
                    <option>Unit Rate</option>
                    <option>Flat Rate</option>
                  </select>
                </div>
                <div
                  class="add-on-item"
                  v-if="inputs.addOns.priceOption === 'Unit Rate'"
                >
                  <div class="add-on-item">
                    <p>Minimum # Units:</p>
                    <input
                      type="number"
                      v-model.number="inputs.addOns.unit.minUnits"
                    />
                  </div>
                  <div class="add-on-item">
                    <p>Unit Rate:</p>
                    <input v-model.number="inputs.addOns.unit.unitRate" />
                  </div>
                  <button-standard-with-icon
                    text="Add Add-On"
                    @click="addAddOn()"
                    class="form-button"
                  />
                </div>
                <div
                  class="add-on-item"
                  v-if="inputs.addOns.priceOption == 'Flat Rate'"
                >
                  <div class="add-on-item">
                    <p>Flat Rate:</p>
                    <input
                      type="number"
                      v-model.number="inputs.addOns.flat.flatRate"
                    />
                  </div>
                  <div class="add-on-item">
                    <button-standard-with-icon
                      text="Add Add-On"
                      @click="addAddOn()"
                      class="form-button"
                    />
                  </div>
                </div>
              </div>
              <div class="add-on-section">
                <h5 v-if="!businessSettings.addOns.length">
                  No addOns have been added yet! Add some!
                </h5>
                <div
                  class="add-on-item"
                  style="border-bottom: 1px solid gray; margin-bottom: 10px"
                  v-for="addOn in businessSettings.addOns"
                  :key="addOn.id"
                >
                  <h4>{{ addOn.addOnName }}</h4>
                  <div class="add-on-display-section">
                    <div class="add-on-item" v-if="addOn.photo">
                      <p>Photo: {{ addOn.photo.name }}</p>
                    </div>
                  </div>

                  <div class="add-on-display-section">
                    <div
                      class="add-on-item"
                      v-if="addOn.priceOption === 'Flat Rate'"
                    >
                      <p>
                        <b>Flat Rate:</b>
                        {{ formatPrice(addOn.flat.flatRate) }}
                      </p>
                    </div>
                    <div
                      class="add-on-item"
                      v-if="addOn.priceOption === 'Unit Rate'"
                    >
                      <p>
                        <b>Unit Rate: </b>{{ formatPrice(addOn.unit.unitRate) }}
                      </p>
                      <p><b>Minimum # Units: </b>{{ addOn.unit.minUnits }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="config-section">
        <base-card>
          <template v-slot:title>Discounts</template>
          <template v-slot:content>
            <div class="discounts-wrapper">
              <div class="discounts-section">
                <h5 class="bold">Add New Discounts:</h5>
                <div class="discounts-item">
                  <p>Discount Name:</p>
                  <input
                    type="text"
                    v-model.trim="inputs.discounts.discountName"
                  />
                </div>
                <div class="discounts-item">
                  <p>Discount Type:</p>
                  <select
                    name="price-option"
                    id=""
                    v-model="inputs.discounts.discountType"
                  >
                    <option disabled value="">Select a price option</option>
                    <option value="percentage">Percentage</option>
                    <option value="dollar">Dollar</option>
                  </select>
                </div>
                <div
                  class="discounts-item"
                  v-if="inputs.discounts.discountType === 'percentage'"
                >
                  <div class="discounts-item">
                    <p>Discount Percentage <i>(example: '10' = 10%)</i></p>
                    <input
                      type="number"
                      v-model.number="
                        inputs.discounts.percentage.discountAmount
                      "
                    />
                  </div>

                  <button-standard-with-icon
                    text="Add Discount"
                    @click="addDiscount()"
                    class="form-button"
                  />
                </div>
                <div
                  class="discounts-item"
                  v-if="inputs.discounts.discountType == 'dollar'"
                >
                  <div class="discounts-item">
                    <p>Dollar Discount:</p>
                    <input
                      type="number"
                      v-model.number="inputs.discounts.dollar.discountAmount"
                    />
                  </div>

                  <button-standard-with-icon
                    text="Add Discount"
                    @click="addDiscount()"
                    class="form-button"
                  />
                </div>
              </div>
              <div class="discounts-section">
                <h5 v-if="!businessSettings.discounts.length">
                  No discounts have been added yet! Add some!
                </h5>
                <div
                  class="discounts-item"
                  style="border-bottom: 1px solid gray; margin-bottom: 10px"
                  v-for="discount in businessSettings.discounts"
                  :key="discount.id"
                >
                  <h4>{{ discount.discountName }}</h4>

                  <div class="discounts-display-section">
                    <div
                      class="discounts-item"
                      v-if="discount.discountType === 'percentage'"
                    >
                      <p>
                        <b>Discount Amount:</b>
                        {{ discount.percentage.discountAmount * 100 }}%
                      </p>
                    </div>
                    <div
                      class="discounts-item"
                      v-if="discount.discountType === 'dollar'"
                    >
                      <p>
                        <b>Discount Amount: </b
                        >{{ formatPrice(discount.dollar.discountAmount) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <!-- <div class="config-section">
        <base-card>
          <template v-slot:title>Equipment</template>
          <template v-slot:content>
            <div class="discounts-wrapper">
              <div class="discounts-section">
                <h5 class="bold">Add New Equipment:</h5>
                <div class="discounts-item">
                  <p>Equipment Name:</p>
                  <input
                    type="text"
                    v-model.trim="inputs.discounts.discountName"
                  />
                </div>
                <div class="discounts-item">
                  <p>Service:</p>
                  <select
                    name="price-option"
                    id=""
                    v-model="inputs.discounts.discountType"
                  >
                    <option disabled value="">Select a price option</option>
                    <option value="percentage">Percentage</option>
                    <option value="dollar">Dollar</option>
                  </select>
                </div>
                <div
                  class="discounts-item"
                  v-if="inputs.discounts.discountType === 'percentage'"
                >
                  <div class="discounts-item">
                    <p>Discount Percentage <i>(example: '10' = 10%)</i></p>
                    <input
                      type="number"
                      v-model.number="
                        inputs.discounts.percentage.discountAmount
                      "
                    />
                  </div>

                  <button-standard-with-icon
                    text="Add Discount"
                    @click="addDiscount()"
                    class="form-button"
                  />
                </div>
                <div
                  class="discounts-item"
                  v-if="inputs.discounts.discountType == 'dollar'"
                >
                  <div class="discounts-item">
                    <p>Dollar Discount:</p>
                    <input
                      type="number"
                      v-model.number="inputs.discounts.dollar.discountAmount"
                    />
                  </div>

                  <button-standard-with-icon
                    text="Add Discount"
                    @click="addDiscount()"
                    class="form-button"
                  />
                </div>
              </div>
              <div class="discounts-section">
                <h5 v-if="!businessSettings.discounts.length">
                  No discounts have been added yet! Add some!
                </h5>
                <div
                  class="discounts-item"
                  style="border-bottom: 1px solid gray; margin-bottom: 10px"
                  v-for="discount in businessSettings.discounts"
                  :key="discount.id"
                >
                  <h4>{{ discount.discountName }}</h4>

                  <div class="discounts-display-section">
                    <div
                      class="discounts-item"
                      v-if="discount.discountType === 'percentage'"
                    >
                      <p>
                        <b>Discount Amount:</b>
                        {{ discount.percentage.discountAmount * 100 }}%
                      </p>
                    </div>
                    <div
                      class="discounts-item"
                      v-if="discount.discountType === 'dollar'"
                    >
                      <p>
                        <b>Discount Amount: </b
                        >{{ formatPrice(discount.dollar.discountAmount) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div> -->
      <div class="config-section">
        <base-card>
          <template v-slot:title>Automations</template>
          <template v-slot:content>
            <div class="discounts-wrapper">
              <div class="discounts-section">
                <h5 class="bold">Add New Automation:</h5>
                <div class="discounts-item">
                  <p>Automation Name:</p>
                  <input
                    type="text"
                    v-model.trim="inputs.automations.automationName"
                  />
                </div>
                <div class="discounts-item">
                  <p>Applicable Contact Type:</p>
                  <select
                    name="price-option"
                    id=""
                    v-model="inputs.automations.applicableContactType"
                  >
                    <option disabled value="">Select a price option</option>
                    <option value="client">Client</option>
                    <option value="employee">Employee</option>
                    <option value="organizer">Organizer</option>
                    <option value="vendor">Vendor</option>
                    <option value="venue">Venue</option>
                  </select>
                </div>
                <div
                  class="discounts-item"
                  v-if="inputs.automations.applicableContactType"
                >
                  <div class="discounts-item">
                    <p>
                      <input
                        type="checkbox"
                        @click="
                          inputs.automations.approvalRequired =
                            !inputs.automations.approvalRequired
                        "
                      />
                      Approval Required?:
                    </p>
                  </div>
                  <div class="discounts-item">
                    <p>Trigger:</p>
                    <p>
                      <input
                        type="checkbox"
                        @click="
                          (inputs.automations.trigger.timeCategory = undefined),
                            (inputs.automations.trigger.distance = undefined),
                            (inputs.automations.direction = undefined),
                            (inputs.automations.trigger.immediate =
                              !inputs.automations.trigger.immediate)
                        "
                      />
                      Immediate? (will invalidate time-related selections)
                    </p>
                    <p>
                      <input
                        type="number"
                        placeholder="3"
                        v-model="inputs.automations.trigger.distance"
                        :disabled="inputs.automations.trigger.immediate"
                        style="width: 40px; padding: 4px; margin-right: 10px"
                      />
                      <select
                        :disabled="inputs.automations.trigger.immediate"
                        name=""
                        id=""
                        v-model="inputs.automations.trigger.timeCategory"
                      >
                        <option disabled value="">timeframe</option>

                        <option value="days">days</option>
                        <option value="weeks">weeks</option>
                        <option value="months">months</option>
                      </select>
                      <select
                        name=""
                        id=""
                        v-model="inputs.automations.trigger.direction"
                        :disabled="inputs.automations.trigger.immediate"
                      >
                        <option value="before">before</option>
                        <option value="after">after</option>
                      </select>
                      <select
                        id=""
                        v-model="inputs.automations.trigger.trigger"
                        :disabled="inputs.automations.trigger.immediate"
                      >
                        <option disabled value="">trigger</option>

                        <option value="event-date">event date</option>
                        <option value="book-date">booked date</option>
                      </select>
                    </p>
                  </div>
                  <div class="discounts-item">
                    <p>Action Type:</p>
                    <select
                      name=""
                      id=""
                      v-model="inputs.automations.actionType.type"
                    >
                      <option value="email">Email</option>
                      <option value="to-do">To-Do</option>
                    </select>
                    <div
                      class="discounts-item"
                      v-if="inputs.automations.actionType.type === 'email'"
                    >
                      <p>From:</p>
                      <select
                        v-model="inputs.automations.actionType.email.from"
                        name=""
                        id=""
                      >
                        <option
                          v-for="(email, index) in businessSettings.information
                            .businessEmailAddresses"
                          :key="index"
                          :value="email.address"
                        >
                          {{ email.address }}
                        </option>
                      </select>
                      <p>Subject:</p>
                      <input
                        type="text"
                        v-model="inputs.automations.actionType.email.subject"
                      />
                      <p>Content:</p>
                      <textarea
                        type="text"
                        rows="10"
                        v-model="inputs.automations.actionType.email.content"
                      />
                      <button-standard-with-icon
                        text="Add Automation"
                        @click="addAutomation()"
                        class="form-button"
                      />
                    </div>
                    <div
                      class="discounts-item"
                      v-if="inputs.automations.actionType.type === 'to-do'"
                    >
                      <p>Content:</p>
                      <input
                        type="text"
                        v-model="inputs.automations.actionType.toDo.content"
                      />
                    </div>
                  </div>
                  <button-standard-with-icon
                    text="Add Automation"
                    @click="addAutomation()"
                    class="form-button"
                  />
                </div>
              </div>
              <div class="discounts-section">
                <h5 v-if="!businessSettings.automations.length">
                  No automations have been added yet! Add some!
                </h5>
                <div
                  class="discounts-item"
                  style="border-bottom: 1px solid gray; margin-bottom: 10px"
                  v-for="automation in businessSettings.automations"
                  :key="automation.id"
                >
                  <h4>{{ automation.automationName }}</h4>

                  <div class="discounts-display-section">
                    <div class="discounts-item">
                      <p>
                        <b>Contact Type:</b>
                        {{ automation.automationName }}
                      </p>
                      <p>
                        <b>Trigger: </b>
                        {{
                          `${automation.trigger.distance} ${automation.trigger.timeCategory} ${automation.trigger.direction} ${automation.trigger.trigger}`
                        }}
                      </p>
                      <p>
                        <b>Approval Required:</b>
                        {{ automation.approvalRequired }}
                      </p>
                      <p>
                        <b>Automation Type:</b>
                        {{ automation.actionType.type }}
                      </p>

                      <div
                        class="discounts-item"
                        v-if="automation.actionType.type === 'email'"
                      >
                        <p>
                          <b>From Email: </b>
                          {{ automation.actionType.email.from }}
                        </p>
                        <p>
                          <b>Subject: </b>
                          {{ automation.actionType.email.subject }}
                        </p>
                        <p>
                          <b>Content: </b>
                          {{ automation.actionType.email.content }}
                        </p>
                      </div>
                      <div
                        class="discounts-item"
                        v-if="automation.actionType.type === 'toDo'"
                      >
                        <p>
                          <b>Content: </b>
                          {{ automation.actionType.toDo.content }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
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
import helpers from "../../../helpers.js";
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
          priceOption: undefined,
          flat: {
            flatRate: undefined,
          },
          hourly: {
            baseTime: undefined,
            baseRate: undefined,
            addHourly: undefined,
          },
          photo: undefined,
          equipmentNeeded: [],
          employeesRequired: undefined,
        },
        packages: {
          id: undefined,
          packageName: undefined,
          priceOption: undefined,
          flat: {
            flatRate: undefined,
          },
          hourly: {
            baseTime: undefined,
            baseRate: undefined,
            addHourly: undefined,
          },
          serviceIds: [],
          employeesRequired: undefined,
          photo: undefined,
        },
        addOns: {
          addOnName: undefined,
          priceOption: undefined,
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
        discounts: {
          discountName: undefined,
          discountType: undefined,
          percentage: {
            discountAmount: undefined,
          },
          dollar: {
            discountAmount: undefined,
          },
        },
        automations: {
          automationName: undefined,
          applicablePackages: [],
          applicableContactType: undefined,
          approvalRequired: false,
          trigger: {
            timeCategory: undefined,
            distance: undefined,
            trigger: undefined,
            direction: undefined,
            immediate: false,
          },
          // work within aws to determine allowable triggers
          actionType: {
            type: undefined,
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
  methods: {
    formatPrice: helpers.formatPrice,
    chooseFile() {
      document.getElementById("hidden-file-button").click();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.inputs.services.photo = files[0];
      console.log(files);
      console.log(this.inputs.services.photo);
    },
    addService() {
      let service = this.inputs.services;
      if (service.flat.flatRate) {
        service.flat.flatRate *= 100;
      }
      if (service.priceOption === "Hourly Rate") {
        service.hourly.baseRate *= 100;
        service.hourly.addHourly = service.hourly.addHourly * 100;
      }
      this.businessSettings.services.push(service);
      service = {
        serviceName: undefined,
        priceOption: undefined,
        flat: {
          flatRate: undefined,
        },
        hourly: {
          baseTime: undefined,
          baseRate: undefined,
          addHourly: undefined,
        },
        photo: undefined,
        equipmentNeeded: [],
        employeesRequired: undefined,
      };
    },
    toggleServiceFromPackage(id) {
      let array = this.inputs.packages.serviceIds;
      let index = array.indexOf(id);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(id);
      }
    },
    addPackage() {
      let item = this.inputs.packages;
      if (item.flat.flatRate) {
        item.flat.flatRate *= 100;
      }
      if (item.priceOption === "Hourly Rate") {
        item.hourly.baseRate *= 100;
        item.hourly.addHourly = item.hourly.addHourly * 100;
      }

      this.businessSettings.packages.push(item);
      this.inputs.packages = {
        id: undefined,
        packageName: undefined,
        priceOption: undefined,
        flat: {
          flatRate: undefined,
        },
        hourly: {
          baseTime: undefined,
          baseRate: undefined,
          addHourly: undefined,
        },
        serviceIds: [],
        employeesRequired: undefined,
        photo: undefined,
      };
    },
    addAddOn() {
      let item = this.inputs.addOns;
      if (item.flat.flatRate) {
        item.flat.flatRate *= 100;
      }
      if (item.priceOption === "Unit Rate") {
        item.unit.unitRate *= 100;
      }

      this.businessSettings.addOns.push(item);
      this.inputs.addOns = {
        addOnName: undefined,
        priceOption: undefined,
        unit: {
          unitRate: undefined,
          minUnits: undefined,
        },
        flat: {
          flatRate: undefined,
        },
        photo: undefined,
        equipmentNeeded: undefined,
      };
    },
    addDiscount() {
      let item = this.inputs.discounts;
      if (item.discountType === "dollar") {
        item.dollar.discountAmount *= 100;
      }
      if (item.discountType === "percentage") {
        item.percentage.discountAmount *= 0.01;
      }
      this.businessSettings.discounts.push(item);
      this.inputs.discounts = {
        discountName: undefined,
        discountType: undefined,
        percentage: {
          discountAmount: undefined,
        },
        dollar: {
          discountAmount: undefined,
        },
      };
    },
    addAutomation() {
      let item = this.inputs.automations;
      this.businessSettings.automations.push(item);
      this.inputs.automations = {
        automationName: undefined,
        applicablePackages: [],
        applicableContactType: undefined,
        approvalRequired: false,
        trigger: {
          timeCategory: undefined,
          distance: undefined,
          direction: undefined,
          trigger: undefined,
        },
        // work within aws to determine allowable triggers
        actionType: {
          type: undefined,
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
      };
    },
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

.config-section {
  height: 75%;
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

.business-information-wrapper,
.service-wrapper,
.package-wrapper,
.add-on-wrapper,
.discounts-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 100%;
  overflow-y: scroll;
}

.business-information-section,
.service-section,
.package-section,
.add-on-section,
.discounts-section {
  width: 50%;
}

.business-information-item,
.service-item,
.package-item,
.add-on-item,
.discounts-item {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 10px;
}

.business-information-item > p,
.service-item > p,
.service-section > h5,
.package-item > p,
.package-section > h5,
.add-on-item > p,
.add-on-section > h5,
.discounts-item > p,
.discounts-section > h5 {
  text-align: left;
}

.business-information-item > input,
.service-item > input,
.service-item > select,
.package-item > input,
.package-item > select,
.package-item > label,
.add-on-item > select,
.add-on-item > label,
.add-on-item > input,
.discounts-item > select,
.discounts-item > label,
.discounts-item > input,
.form-button {
  width: 50%;
  align-self: left;
  justify-self: left;
}

.bold {
  font-weight: 600;
  margin-top: 20px;
}

:disabled {
  opacity: 0.5;
}

.floating-button {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background-color: var();
}

#branding {
  height: 25%;
}
</style>