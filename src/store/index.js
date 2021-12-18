
import { createStore } from "vuex";
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: undefined,
            // branding: {
            //     backgroundColor: "#F0F0F0",
            //     foregroundColor: "#FFFFFF",
            //     cardOutline: "#DDDDDD",
            //     highlightColor: "#00F5FF",
            //     textColor: "#000000",
            // },
            errors: [],
            successes: [],
            notifications: [],
            toDos: [],
            automations: {},
            contacts: {
                clients: [],
                prospects: [],
                vendors: [],
                employees: [],
                locations: [],
                organizers: []
            },
            equipment: [],
            events: [],        
            businessSettings: {
                product: {
                    discounts: [],
                    addOns: [],
                    services: [],
                    packages: [],
                    forms: [],
                },
                contracts: [],
                identity: {
                    businessName: undefined,
                    businessAddress: {
                        streetAddress1: undefined,
                        streetAddress2: undefined,
                        address2: undefined,
                    },
                    businessPhoneNumber: undefined,
                    branding: {
                        backgroundColor: "#F0F0F0",
                        foregroundColor: "#FFFFFF",
                        cardOutline: "#DDDDDD",
                        highlightColor: "#00F5FF",
                        textColor: "#000000",
                    },
                }
            },
            publicSettings: {},
        };
    },
    actions: {
        async getPublicSettings(context) {
            return new Promise((resolve, reject) => {
                    axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/public/${context.state.user.tenantId}/settings`).then((result)=> {
                    resolve(result.data)
                    console.log(result.data)
                    context.commit('setPublicSettings', result.data);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        async getUser(context, user) {
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users/${user}`).then((result)=> {
                    resolve(result.data.Item);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        async setUser(context, user) {
            let tenantId = function() {
                if (user.challengeParam) {
                    return user.challengeParam.userAttributes['custom:tenantId']
                } else if (user.attributes['custom:tenantId']) {
                    return user.attributes['custom:tenantId']
                } else {
                    return user.username;
                }
            };
            await axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${tenantId()}/users/${user.username}`).then(response => {
                context.commit('setUser', response.data.Item);
            }).catch((e) => {
                console.log(e)
            })
        },
        async setBusinessSettings(context) {
            await axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.userId}/settings`).then(response => {
                if ('businessSettings' in response.data.Item) {
                    context.commit('setBusinessSettings', response.data.Item.businessSettings);
                    if ('identity' in response.data.Item.businessSettings)
                        context.commit('setBranding', response.data.Item.businessSettings.identity);
                }
            }).catch((e) => context.commit('addError', e))
        },
        addError(context, error) {
            context.commit('addError', error)
        },
        clearErrors(context) {
            context.commit('clearErrors');
        },
        addSuccess(context) {
            context.commit('addSuccess');
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
        async getAdminEvents(context) {
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events`).then((result)=> {
                    resolve(result);
                    context.commit('setEvents', result)
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        adminConfigIdentitySetBusinessName(context, payload) {
            context.commit('adminConfigIdentitySetBusinessName', payload);
        },
        adminConfigIdentitySetBusinessAddress(context, payload) {
            context.commit('adminConfigIdentitySetBusinessAddress', payload);
        },
        adminConfigIdentitySetBusinessPhoneNumber(context, payload) {
            context.commit('adminConfigIdentitySetBusinessPhoneNumber', payload);
        },
        updateBusinessSettings({commit, state}) {
            let payload = {
                variable: 'businessSettings',
                value: state.businessSettings
            }
            console.log( payload);
            axios.put(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${state.user.tenantId}/users/${state.user.userId}`, payload).then((res) => {
                commit('setBusinessSettings', payload.value);
                console.log(payload.value)
                console.log(res)
            }).catch((e) => {
                console.log(e);
            })
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
        async editContact(context, payload) {
            return new Promise((resolve, reject) => {
                axios.put(
                    `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users/${payload.clientId}`,
                    payload
                  ).then((result) => {
                    resolve(result);
                    console.log(result);
                    context.commit('addSuccess', "Contact Successfully Updated")
                    context.commit('editEvent', result)
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                });
            })
        },
        async createMessagingThread(context, payload) {
            return new Promise((resolve, reject) => {
                axios.put(
                    `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/messaging/createThread`,
                    payload
                  ).then((result) => {
                    resolve(result);
                    context.commit('addSuccess', "Message Thread Complete")
                    context.commit('editEvent', result)
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                });
            })
        },
        async sendMessage(context, payload) {
            return new Promise((resolve, reject) => {
                axios.put(
                    `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/messaging/message`,
                    payload
                  ).then((result) => {
                    resolve(result);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                });
            })
        },
        async getMessageThread(context, thread) {
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/messaging/getThread/${thread.replaceAll('#', '%23')}`).then((result)=> {
                    resolve(result.data);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        async getThreadParticipants(context, thread) {
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/messaging/getThreadParticipants/${thread.replaceAll('#', '%23')}`).then((result)=> {
                    resolve(result.data);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        addEvent(context, event) {
            console.log(event)
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
        addLocation(context, location) {
            location = {...location, id: 'location' + new Date().getTime()};
            return new Promise((resolve, reject) => {
                axios.put(
                    `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/locations`,
                    location
                  ).then((result) => {
                      resolve(result)
                      context.commit('addLocation', result.data);
                }, error => {
                    context.commit('addError', `Error: ${error}`);
                    reject(error)
                })
            })
        },
        async getLocation(context, location) {
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/locations/${location}`).then((result)=> {
                    resolve(result.data);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        async getLocations(context) {
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/locations`).then((result)=> {
                    resolve(result.data);
                    context.commit('setLocations', result.data.Items)
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        async editLocation(context, payload) {
            console.log(payload);
            return new Promise((resolve, reject) => {
                axios.put(
                    `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/locations/${payload.locationId}`,
                    payload
                  ).then((result) => {
                    resolve(result);
                    console.log(result);
                    // context.commit('editLocation', result)
                }, error => {
                    // console.log(error)
                    context.commit('addError', error);
                    reject(error);
                });
            })
        },
        async editEvent(context, payload) {
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
        async deleteEvent(context, payload) {
            console.log(payload)
            await axios.delete(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events/${payload}`).then(() => {
                context.commit('addSuccess', "Successfully Deleted Event");
            }).catch((e) => {
                context.commit('addError', e)
            })
        },
        async deleteUser(context, payload) {
            console.log(payload)
            await axios.delete(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users/${payload.id}`).then(() => {
                context.commit('addSuccess', "Successfully Deleted User");
                context.commit('deleteUser', payload);
            }).catch((e) => {
                context.commit('addError', e)
            })
        },
        async getEvents(context) {
            console.log(context.state.user.role)
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/${context.state.user.role}/${context.state.user.tenantId}/${context.state.user.userId}/events`).then((result)=> {
                    resolve(result);
                    context.commit('setEvents', result);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        async nonAdminGetUser(context, payload) {
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/${context.state.user.role}/${context.state.user.tenantId}/${context.state.user.userId}/users/${payload}`).then((result)=> {
                    resolve(result);
                    // context.commit('setUser', result.data.Item);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        async clientSignContract(context, callerPayload) {
            let payload = {
                value: callerPayload.contracts,
                variable: 'contracts',
            }
            console.log(payload)
            return new Promise((resolve, reject) => {
                axios.put(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/${context.state.user.role}/${context.state.user.tenantId}/${context.state.user.userId}/events/${callerPayload.eventId}`, payload).then((result)=> {
                    resolve(result);
                    console.log(result);
                    context.commit('setUser', result.data.Item);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        async getEvent(context, payload) {
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/${context.state.user.role}/${context.state.user.tenantId}/${context.state.user.userId}/events/${payload}`).then((result)=> {
                    resolve(result);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        async adminGetEvent(context, payload) {
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events/${payload}`).then((result)=> {
                    resolve(result);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        async adminGetContact(context, payload) {
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users/${payload}`).then((result) => {
                    resolve(result);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },

        async addToDo(context, payload) {
            return new Promise((resolve, reject) => {
                axios.put(
                    `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/todo`,
                    payload
                  ).then((result) => {
                    resolve(result);
                    context.commit('addToDo', result.data);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                });
            })
        },
        async completeToDo(context, payload) {
            console.log(payload);
            await axios.put(
                `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/todo/${payload.id}`,
                payload
              ).then((result) => {
                  console.log(result);
                  context.commit('addSuccess', 'To-Do Added');
                  context.commit('completeToDo', payload.id)
            }, error => {
                context.commit('addError', `Error: ${error}`);
            })
        },
        async getToDos(context, payload) {
            let category = payload.associatedContactId ? 'contact' : 'event';
            let id = payload.associatedContactId ? payload.associatedContactId : payload.associatedEventId;
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/todo/${category}/${id}`).then((result)=> {
                    resolve(result.data);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setBusinessSettings(state, settings) {
            console.log(settings)
            if ('identity' in state.businessSettings) {
                if ('businessName' in state.businessSettings.identity) {
                    document.title = state.businessSettings.identity.businessName;
                }
            } else {
                document.title = "SPIN"
            }
        },
        setBranding(state, settings) {
            state.branding = settings;
        },
        setPublicSettings(state, settings) {
            state.publicSettings = settings;
        },
        addError(state, error) {
            state.errors.push(error);
            console.log(error)
        },
        clearErrors(state) {
            state.errors.length = 0;
        },
        addSuccess(state, payload) {
            state.successes.push(payload);
        },
        clearSuccesses(state) {
            state.successes.length = 0;
        },
        setClients(state, payload) {
            state.contacts.clients = payload;
        },
        setEmployees(state, payload) {
            state.contacts.employees = payload;
        },
        setOrganizers(state, payload) {
            state.contacts.organizers = payload;
        },
        setVendors(state, payload) {
            state.contacts.vendors = payload;
        },
        setLocations(state, payload) {
            state.contacts.locations = payload;
        },
        addContact(state, payload) {
            state.contacts[`${payload.role}s`].push(payload)
        },
        addEvent(state, payload) {
            state.events.push(payload);
        },
        addLocation(state, payload) {
            state.contacts.location.push(payload);
        },
        adminConfigAddService(state, payload) {
            state.businessSettings.product.services.push(payload);
        },
        adminConfigEditService(state, payload) {
            state.businessSettings.product.services[payload.index] = payload.service;
        },
        adminConfigDeleteService(state, payload) {
            state.businessSettings.product.services.splice(payload, 1);
        },
        adminConfigAddPackage(state, payload) {
            state.businessSettings.product.packages.push(payload);
        },
        adminConfigEditPackage(state, payload) {
            state.businessSettings.product.packages[payload.index] = payload.package;
        },
        adminConfigDeletePackage(state, payload) {
            state.businessSettings.product.packages.splice(payload, 1);
        },
        adminConfigAddAddOn(state, payload) {
            state.businessSettings.product.addOns.push(payload);
        },
        adminConfigDeleteAddOn(state, payload) {
            state.businessSettings.product.addOns.splice(payload, 1)
        },
        adminConfigEditAddOn(state,payload) {
            state.businessSettings.product.addOns[payload.index] = payload.addOn;
        },
        adminConfigAddDiscount(state, payload) {
            state.businessSettings.product.discounts.push(payload);
        },
        adminConfigDeleteDiscount(state, payload) {
            state.businessSettings.product.discounts.splice(payload, 1)
        },
        adminConfigEditDiscount(state, payload) {
            state.businessSettings.product.discounts[payload.index] = payload.discount;
        },
        adminConfigAddContract(state, payload) {
            if (!state.businessSettings.contracts) {
                state.businessSettings.contracts = []
            }
            state.businessSettings.contracts.push(payload)
        },
        adminConfigDeleteContract(state, payload) {
            state.businessSettings.contracts.splice(payload, 1)
        },
        adminConfigEditContract(state, payload) {
            state.businessSettings.contracts[payload.index] = payload.contract;
        },
        adminConfigAddForm(state, payload) {
            state.businessSettings.product.forms.push(payload);
        },
        adminConfigDeleteForm(state, payload) {
            state.businessSettings.product.forms.splice(payload, 1);
        },
        adminConfigEditForm(state, payload) {
            state.businessSettings.product.forms[payload.index] = payload.form;
        },
        adminConfigIdentitySetBusinessName(state, payload) {
            console.log(payload)
            console.log(state.businessSettings)
            if ("identity" in state.businessSettings) {
                state.businessSettings.identity.businessName = payload;
            } else {
                Object.defineProperty(state.businessSettings, "identity", {});
                // state.businessSettings.identity.businessName = payload;
            }
        },
        adminConfigIdentitySetBusinessAddress(state, payload) {
            state.businessSettings.identity.businessAddress = payload;
        },
        adminConfigIdentitySetBusinessPhoneNumber(state, payload) {
            state.businessSettings.identity.phoneNumber = payload;
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
     
        addEmployee(state, payload) {
            state.contacts.employees.push(payload)
        },
        addEmployeeToEvent(state, payload) {
            state.events.find((x) => x.id === payload.eventId).associatedContacts.push({id: payload.employee, role: 'employee'})
        },
        changeEmployeeAvailability(state, payload) {
            let employee = state.contacts.employees.find((x) => x.id === payload.employeeId)
            if (payload.type === "availability") {
                employee.availableDates.push(payload.date)
            }
            if (payload.type === "unavailability") {
                employee.unavailableDates.push(payload.date)
            }
        },
        changeEmployeeAvailabilityRules(state, payload) {
            let employee = state.contacts.employees.find((x) => x.id === payload.employeeId)
            employee.availabilityRules = payload.availabilityRules;
        },
        addOrganizer(state, payload) {
            state.contacts.organizers.push(payload)
        },
        setEvents(state, payload) {
            state.events = payload.data.Items;
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
            console.log(state, id);
        },
        addToDo(state, payload) {
            console.log(payload)
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



        // addContactNote(state, payload) {
        //      let subject = state.contacts[payload.category].find((c) => c.id = payload.id);
        //      let privacy = payload.note.privacy.toLowerCase();
        //      let note = {
        //         date: payload.note.date,
        //         note: payload.note.note};
        //     subject.notes[privacy].push(note);
        // },
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
        deleteUser(state, payload) {
            let cat = state.contacts[payload.category];
            let subject = cat.findIndex(e => e.id === payload.id);
            cat.splice(subject, 1);

        },
    },
    getters: {

    },
    plugins: [createPersistedState({
        paths: ['user', 'businessSettings']
    })]
    
});

export default store;
