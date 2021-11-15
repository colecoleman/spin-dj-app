
import { createStore } from "vuex";
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: undefined,
            branding: undefined,
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
            businessSettings: {},
        };
    },
    actions: {
        async getUser(context, user) {
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users/${user}`).then((result)=> {
                    resolve(result.data);
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                })
            })
        },
        async setUser(context, user) {
            await axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${user}/users/${user}`).then(response => {
                context.commit('setUser', response.data.Item);
            })
        },
        async setBusinessSettings(context) {
            await axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/settings`).then(response => {
                context.commit('setBusinessSettings', response.data.Item.businessSettings);
                context.commit('setBranding', response.data.Item.businessSettings.identity);
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
            axios.put(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${state.user.tenantId}/users/${state.user.userId}`, payload).then(() => {
                commit('setBusinessSettings', payload.value);
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
                    context.commit('editEvent', result)
                }, error => {
                    context.commit('addError', error);
                    reject(error);
                });
            })
        },
        addEvent(context, event) {
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
        async adminGetEvents(context) {
            return new Promise((resolve, reject) => {
                axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events`).then((result)=> {
                    resolve(result);
                    context.commit('setEvents', result);
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


        adminAddEvent(context, payload) {
            context.commit('adminAddEvent', payload)
        },
    
        adminConfigAddService(context, payload) {
            context.commit('adminConfigAddService', payload);
        },
        adminConfigDeleteService(context, payload) {
            context.commit('adminConfigDeleteService', payload);
        },
        adminConfigAddPackage(context, payload) {
            context.commit('adminConfigAddPackage', payload);
        },
        adminConfigDeletePackage(context, payload) {
            context.commit('adminConfigDeletePackage', payload);
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
            context.commit('changeEmployeeAvailability', payload)
        },
        changeEmployeeAvailabilityRules(context, payload) {
            context.commit('changeEmployeeAvailabilityRules', payload)
        },
        getCombined({ commit }) {
            commit('clientEventCombine');
        },
        approveAutomation( context, id ) {
            context.commit('approveAutomation', id)
        },
        deleteAutomation( context, id ) {
            context.commit('deleteAutomation', id)
        },
        deleteApprovedAutomation( context, id ) {
            context.commit('deleteApprovedAutomation', id)
        },
        
        changeProspectStatus(context, payload) {
            context.commit('changeProspectStatus', payload)
        },

        addProspectLocation(context, payload) {
            context.commit('addProspectLocation', payload)
        },
        addProspectDateTime(context, payload) {
            context.commit('addProspectDateTime', payload)
        },


        
   
        addContactNote(context, payload) {
            context.commit('addContactNote', payload)
        },
        editClient(context, {id, key, value}) {
            context.commit('editClient', {id, key, value})
          },
        deleteContact(context, {category, id}) {
            context.commit('deleteContact', {category, id})
        },
       
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setBusinessSettings(state, settings) {
            state.businessSettings = settings;
            document.title = state.businessSettings.identity.businessName;
        },
        setBranding(state, settings) {
            state.branding = settings;
        },
        addError(state, error) {
            state.errors.push(error);
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
        adminConfigDeleteService(state, payload) {
            state.businessSettings.product.services.splice(payload, 1);
        },
        adminConfigAddPackage(state, payload) {
            state.businessSettings.product.packages.push(payload);
        },
        adminConfigDeletePackage(state, payload) {
            state.businessSettings.product.packages.splice(payload, 1);
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
        adminConfigIdentitySetBusinessName(state, payload) {
            state.businessSettings.identity.businessName = payload;
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
