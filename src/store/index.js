
import { createStore } from "vuex";
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: undefined,
            errors: [],
            successes: [],
            notifications: [
                // {
                //     id: 5,
                //     title: "Congrats! New Booking!",
                //     body: "Bob Bobertson's Wedding Package",
                //     date: new Date(2021, 6, 15, 11, 15),
                //     read: false,
                // },
            ],
            toDos: [
                // {
                //     id: 8,
                //     associatedClientId: 8,
                //     associatedEventId: 8,
                //     title: "Setup Call",
                //     completed: false,
                // },
            ],
            automations: {
                // approved: [
                    
                // ],
                // pending: [{
                //     id: 1,
                //     title: 'Send Review Request',
                //     performDate: new Date(2021, 2, 1, 18, 15),
                //     associatedContactId: 1,
                //     associatedEventId: 1,
                // },
            // ]
            },
            contacts: {
                clients: [
             
                ],
                prospects: [
                 
            ],
                vendors: [
                    
                    ],
                employees: [
            ],
                locations: [
                    {
                    id: 1,
                    name: "The Venue Name",
                    address: {
                        address1: "12345 Venue Dr",
                        address2: "Anywhere, MO, 12345",
                    },
                    associatedVendorId: 1,
                    notes: {
                        private: [
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum m fur fur fur fur fur r'
                            },
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum fur fur fur fur fur fur r'
                            },
                        ],
                        public: [
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum fur fur fur fur fur fur r'
                            },
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum fur fur fur fur fur fur r'
                            },
                        ],
                    }

                },
                {
                    id: 2,
                    name: "The Venue Name",
                    address: {
                        address1: "12345 Venue Dr",
                        address2: "Anywhere, MO, 12345",
                    },
                    associatedVendorId: 2,
                    notes: {
                        private: [
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum fur dur dur dur dur dur r'
                            },
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                        ],
                        public: [
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                        ],
                    }

                },{
                    id: 3,
                    name: "The Venue Name",
                    address: {
                        address1: "12345 Venue Dr",
                        address2: "Anywhere, MO, 12345",
                    },
                    associatedVendorId: 3,
                    notes: {
                        private: [
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                        ],
                        public: [
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                        ],
                    }

                },{
                    id: 4,
                    name: "The Venue Name",
                    address: {
                        address1: "12345 Venue Dr",
                        address2: "Anywhere, MO, 12345",
                    },
                    associatedVendorId: 4,
                    notes: {
                        private: [
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                        ],
                        public: [
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                        ],
                    }

                },{
                    id: 5,
                    name: "The Venue Name",
                    address: {
                        address1: "12345 Venue Dr",
                        address2: "Anywhere, MO, 12345",
                    },
                    associatedVendorId: 5,
                    notes: {
                        private: [
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                        ],
                        public: [
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                        ],
                    }

                },{
                    id: 6,
                    name: "The Venue Name",
                    address: {
                        address1: "12345 Venue Dr",
                        address2: "Anywhere, MO, 12345",
                    },
                    associatedVendorId: 6,
                    notes: {
                        private: [
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                        ],
                        public: [
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                            {
                                date: new Date(2021, 10, 3),
                                note: 'Lorem ipsum dur dur dur dur dur dur r'
                            },
                        ],
                    }

                },
                    ],
                organizers: [
                  
            ]
            },
            equipment: [],
            events: [],        
            businessSettings: {
                identity: {
                    businessName: 'DJ Cole Coleman',
                    businessAddress: {
                        address1one: '12345 Anywhere St',
                        address1two: undefined,
                        address2: 'Anywhere, AZ, 12345'
                    },
                    businessPhoneNumber: 13148568522,
                    businessEmailAddresses: [
                        {
                            address: 'name@domain.com',
                        },
                        {
                            address: 'company@domain.com',
                        }],
                    branding: {
                        backgroundColor: '#F0F0F0',
                        foregroundColor: '#FFFFFF',
                        cardOutline: "#FFFFFF",
                        highlightColor: "#00F5FF",
                        textColor: "#000000"
                    },
                },
                product: {
                    eventTypes: ["wedding", "mitzvah"],
                    packages: [ {
                        id: "1",
                        name: "Holy Matrimony",
                        pricing: {
                            baseTime: 5,
                            baseRate: 180000,
                            addHourly: 10000,
                        },
                        priceOption: "Hourly",
                        employeesRequired: 2,
                        photo: undefined,
                    }],
                    services: [
                        {
                            id: "1",
                            name: "Wedding DJ",
                            pricing: {
                                baseTime: 5,
                                baseRate: 150000,
                                addHourly: 10000,
                            },
                            priceOption: "Hourly",
                            photo: undefined,
                            equipmentNeeded: [],
                            employeesRequired: undefined
                        },
                        {
                            id: "2",
                            name: "Wedding Officiant",
                            pricing: {
                                baseTime: 1,
                                baseRate: 30000,
                                addHourly: 0,
                            },
                            priceOption: 'Flat',
                            photo: undefined,
                            equipmentNeeded: [],
                            employeesRequired: undefined
                        }
                    ],
                    addOns: [],
                    forms: [],
                    discounts: [{
                        name: 'Friends and Family',
                        type: 'percentage',
                        amount: 10
                    }],
                },
                automations: [],
                
            },
        };
    },
    actions: {
        setUser(context, user) {
            axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${user}/users/${user}`).then(response => {
                context.commit('setUser', response.data.Item);
                console.log(response.data.Item)
            })
        },
        addError(context, error) {
            context.commit('addError', error)
        },
        clearErrors(context) {
            context.commit('clearErrors');
        },
        clearSuccesses(context) {
            context.commit('clearSuccesses');
        },
        getAdminUsers(context) {

            axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users`).then(response => {    
            context.commit('setClients', response.data.Items.filter(x => x.role === 'client'));
            context.commit('setEmployees', response.data.Items.filter(x => x.role === 'employee'));
            context.commit('setOrganizers', response.data.Items.filter(x => x.role === 'organizer'));
            context.commit('setVendors', response.data.Items.filter(x => x.role === 'vendor'));
            }).catch(e => context.commit('addError', `Error: ${e}`));
            
        },
        async addContact( context, contact) {
            return new Promise((resolve, reject) => {
                axios.put(
                    `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users`,
                    contact
                  )
                  .then((result) => {
                      resolve(result.data)
                      context.commit('addContact', result.data);
                }, error => {
                    context.commit('addError', `Error: ${error}`);
                    reject(error)
                })
            })
            
        },
        async addEvent(context, event) {
            console.log(context.state.user)
            return new Promise((resolve, reject) => {
                axios.put(
                    `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events`,
                    event
                  ).then((result) => {
                      resolve(result)
                      context.commit('addEvent', result.data);
                }, error => {
                    context.commit('addError', `Error: ${error}`);
                    reject(error)
                })
            })
        },
        async editEvent(context, payload) {
            console.log(payload);
            return new Promise((resolve, reject) => {
                axios.put(
                    `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events/${payload.eventId}`,
                    payload
                  ).then((result) => {
                    resolve(result);
                    console.log(result);
                    context.commit('editEvent', result)
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                });
            })

            
        },
        async addLocation( context, location) {
            axios.put(
                `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events`,
                location
              ).then((result) => {
                  console.log(result.data);
                  context.commit('addLocation', result.data);
              }).catch(e => context.commit('addError', `Error: ${e}`))

        },
        adminAddEvent(context, payload) {
            context.commit('adminAddEvent', payload)
        },
    
        adminConfigAddService(context, payload) {
            context.commit('adminConfigAddService', payload);
        },
        adminConfigAddPackage(context, payload) {
            context.commit('adminConfigAddPackage', payload);
        },
        adminConfigAddAddOn(context, payload) {
            context.commit('adminConfigAddAddOn', payload)
        },
        adminConfigAddDiscount(context, payload) {
            context.commit('adminConfigAddDiscount', payload)
        },
        addFormToDb(context, payload) {
            context.commit('addFormToDb', payload)
        },
        addEmployeeToEvent(context, payload) {
            context.commit('addEmployeeToEvent', payload)
        },
        changeEmployeeAvailability(context, payload) {
            console.log(payload)
            context.commit('changeEmployeeAvailability', payload)
        },
        changeEmployeeAvailabilityRules(context, payload) {
            console.log(payload)
            context.commit('changeEmployeeAvailabilityRules', payload)
        },
        getCombined({ commit }) {
            commit('clientEventCombine');
        },
        approveAutomation( context, id ) {
            console.log(id)
            context.commit('approveAutomation', id)
        },
        deleteAutomation( context, id ) {
            context.commit('deleteAutomation', id)
        },
        deleteApprovedAutomation( context, id ) {
            context.commit('deleteApprovedAutomation', id)
        },

        // prospect-specific actions
        
        changeProspectStatus(context, payload) {
            context.commit('changeProspectStatus', payload)
        },

        addProspectLocation(context, payload) {
            context.commit('addProspectLocation', payload)
        },
        addProspectDateTime(context, payload) {
            context.commit('addProspectDateTime', payload)
        },


        completeToDo( context, id) {
            context.commit('completeToDo', id)
        },
        addToDo(context, payload) {
            context.commit('addToDo', payload)
        },
        addContactNote(context, payload) {
            context.commit('addContactNote', payload)
        },
        editClient(context, {id, key, value}) {
            context.commit('editClient', {id, key, value})
          },
        deleteContact(context, {category, id}) {
            console.log(category)
            context.commit('deleteContact', {category, id})
        },
       
    },
    mutations: {
        setUser(state, user) {
            console.log(user)
            state.user = user;
        },
        addError(state, error) {
            state.errors.push(error);
            console.log(error)
        },
        clearErrors(state) {
            state.errors.length = 0;
        },
        clearSuccesses(state) {
            state.successes.length = 0;
        },
        setClients(state, payload) {
            state.contacts.clients = payload;
        },
        setEmployees(state, payload) {
            state.contacts.employees = payload;
            console.log(state.contacts);

        },
        setOrganizers(state, payload) {
            state.contacts.organizers = payload;
            console.log(state.contacts);

        },
        setVendors(state, payload) {
            state.contacts.vendors = payload;
            console.log(state.contacts);

        },
        addContact(state, payload) {
            state.contacts[`${payload.role}s`].push(payload)
        },
        addEvent(state, payload) {
            state.events.push(payload);
        },
        adminConfigAddService(state, payload) {
            state.businessSettings.product.services.push(payload);
        },
        adminConfigAddPackage(state, payload) {
            state.businessSettings.product.packages.push(payload);
        },
        adminConfigAddAddOn(state, payload) {
            state.businessSettings.product.addOns.push(payload);
        },
        adminConfigAddDiscount(state, payload) {
            state.businessSettings.product.discounts.push(payload);
        },
        addFormToDb(state, payload) {
            state.businessSettings.product.forms.push(payload);
        },
        addClient(state, payload) {
            state.contacts.clients.push(payload);
        },
        addProspect(state, payload) {
            state.contacts.prospects.push(payload)
        },
        addVendor(state, payload) {
            state.contacts.vendors.push(payload)
        },
        addLocation(state, payload) {
            state.contacts.locations.push(payload)
        },
        addEmployee(state, payload) {
            state.contacts.employees.push(payload)
        },
        addEmployeeToEvent(state, payload) {
            state.events.find((x) => x.id === payload.eventId).associatedContacts.push({id: payload.employee, role: 'employee'})
            console.log(state.events.find((x) => x.id === payload.eventId))
        },
        changeEmployeeAvailability(state, payload) {
            let employee = state.contacts.employees.find((x) => x.id === payload.employeeId)
            if (payload.type === "availability") {
                employee.availableDates.push(payload.date)
            }
            if (payload.type === "unavailability") {
                employee.unavailableDates.push(payload.date)
            }
            console.log(employee)
        },
        changeEmployeeAvailabilityRules(state, payload) {
            let employee = state.contacts.employees.find((x) => x.id === payload.employeeId)
            employee.availabilityRules = payload.availabilityRules;
        },
        addOrganizer(state, payload) {
            state.contacts.organizers.push(payload)
        },
        setEvents(state, payload) {
            state.events = payload;
            // this.commit('clientEventCombine');
        },
        setAddOns(state, payload) {
            state.addOns = payload;
        },
        setEquipment(state, payload) {
            state.equipment = payload;
        },
        setPackages(state, payload) {
            state.packages = payload;
        },
        setServices(state, payload) {
            state.services = payload;
        },
        setUserSettings(state, payload) {
            state.userSettings = payload;
        },
        approveAutomation(state, id) {
           let matchingIndex = state.automations.pending.findIndex(element => element.id === id)
           let matchingAutomation = state.automations.pending[matchingIndex];
           state.automations.approved.push(matchingAutomation);
           state.automations.pending.splice(matchingIndex, 1)

        },
        deleteAutomation(state, id) {
           let matchingIndex = state.automations.pending.findIndex(element => element.id === id)
           state.automations.pending.splice(matchingIndex, 1)
        },
        deleteApprovedAutomation(state, id) {
           let matchingIndex = state.automations.approved.findIndex(element => element.id === id)

           state.automations.approved.splice(matchingIndex, 1)
        },
        completeToDo(state, id) {
            let matchingIndex = state.toDos.findIndex(element => element.id === id);
            state.toDos[matchingIndex].completed = true;
            console.log(state.toDos[matchingIndex]);
        },
        addToDo(state, payload) {
            state.toDos.unshift(payload)
        },

//prospect-specific mutations

        changeProspectStatus(state, payload) {
            let subject = state.contacts.prospects.find((c) => c.id == payload.id);
            subject.status = payload.status;
        },

        addProspectLocation(state, payload) {
            let subject = state.contacts.prospects.find((c) => c.id == payload.id);
            subject.eventDetails.eventLocations.push(payload.location)

        },

        addProspectDateTime(state, payload) {
            let subject = state.contacts.prospects.find((c) => c.id == payload.id);
            subject.eventDetails.eventDate = payload.eventDate;
            
            if (payload.eventStartTime) {
                subject.eventDetails.eventStartTime = payload.eventStartTime;
            } else {
            subject.eventDetails.eventStartTime = undefined;

            }
            
            if (payload.eventEndTime) {
            subject.eventDetails.eventEndTime = payload.eventEndTime;
            } else {
                subject.eventDetails.eventEndTime = undefined;
            }
        },



        addContactNote(state, payload) {
             let subject = state.contacts[payload.category].find((c) => c.id = payload.id);
             let privacy = payload.note.privacy.toLowerCase();
             let note = {
                date: payload.note.date,
                note: payload.note.note};
            subject.notes[privacy].push(note);
        },
        editClient(state, {id, key, value}) {
            let subject = state.contacts.clients.find((c) => c.id === id);
            subject[key] = value;
            console.log(subject)
        },
        editEvent(state, payload) {
            // let subject = state.events.find((e) => e.id === payload.eventId);
            // subject[key] = value;
            console.log(payload)
            
        },
        deleteContact(state, {category, id}) {
            let cat = state.contacts[category];
            let subject = cat.findIndex(e => e.id === id);
            cat.splice(subject, 1);

        }
    },
    getters: {

    },
    plugins: [createPersistedState({
        paths: ['user']
    })]
    
});

// store.dispatch('getClients');
// store.dispatch('getEvents');
// store.dispatch('getAddOns');
// store.dispatch('getCombined');

export default store;
