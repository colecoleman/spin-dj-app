import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            toDos: [
                {
                    id: 1,
                    associatedClientId: 1,
                    associatedEventId: 1,
                    title: "Setup Call",
                    completed: false,
                },
                {
                    id: 2,
                    associatedClientId: 2,
                    associatedEventId: 2,
                    title: "Send Invoice",
                    completed: false,
                },
                {
                    id: 3,
                    associatedClientId: 3,
                    associatedEventId: 3,
                    title: "Setup Call",
                    completed: false,
                },
                {
                    id: 4,
                    associatedClientId: 4,
                    associatedEventId: 4,
                    title: "Send Invoice",
                    completed: false,
                },
                {
                    id: 5,
                    associatedClientId: 5,
                    associatedEventId: 5,
                    title: "Setup Call",
                    completed: false,
                },
                {
                    id: 6,
                    associatedClientId: 6,
                    associatedEventId: 6,
                    title: "Send Invoice",
                    completed: false,
                },
                {
                    id: 7,
                    associatedClientId: 7,
                    associatedEventId: 7,
                    title: "Message Mom",
                    completed: true,
                },
                {
                    id: 8,
                    associatedClientId: 8,
                    associatedEventId: 8,
                    title: "Setup Call",
                    completed: false,
                },
            ],
            automations: {
                approved: [
                    
                ],
                pending: [{
                    id: 1,
                    title: 'Send Review Request',
                    performDate: '2021 - 12 - 26',
                    associatedContactId: 1,
                    associatedEventId: 1,
                },
                {   
                    id: 2,
                    title: 'Send Final Invoice',
                    performDate: '2021 - 12 - 26',
                    associatedContactId: 1,
                    associatedEventId: 1,
                },
                {
                    id: 3,
                    title: 'Send Final invoice',
                    performDate: '2021 - 12 - 26',
                    associatedContactId: 1,
                    associatedEventId: 1,
                },
                {   
                    id: 4,
                    title: 'Send Review Request',
                    performDate: '2021 - 12 - 26',
                    associatedContactId: 1,
                    associatedEventId: 1,
                },
                {
                    id: 5,
                    title: 'Send Review Request',
                    performDate: '2021 - 12 - 26',
                    associatedContactId: 1,
                    associatedEventId: 1,
                },],
            },
            contacts: {
                clients: [
                    {
                        id: 1,
                        firstName: "Amanda",
                        lastName: "Jennings",
                        phoneNumber: "636-699-5652",
                        emailAddress: "amandakoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long just like this one is getting a bit lengthy",
                        profilePicture: undefined,
                        createdDate: "2020-11-24",
                        source: "The Knot",
                        lastLogin: "2021-05-04",
                        lifetimeValue: 100000
                    },
                    {
                        id: 2,
                        firstName: "Jenny",
                        lastName: "Jenkins",
                        phoneNumber: "636-459-7652",
                        emailAddress: "amandakoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,     
                        createdDate: "2020-11-24",
                        source: "The Knot",
                        lastLogin: "2021-05-04",
                        lifetimeValue: 90000
    
                    },
                    {
                        id: 3,
                        firstName: "Maggie",
                        lastName: "Mahoney",
                        phoneNumber: "636-234-5652",
                        emailAddress: "magsmahones@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,
                        createdDate: "2020-11-24",
                        source: "The Knot",
                        lastLogin: "2021-05-04",
                        lifetimeValue: 110000
                    },
                    {
                        id: 4,
                        firstName: "Jacob",
                        lastName: "Jingelheimerschmidt",
                        phoneNumber: "636-699-4563",
                        emailAddress: "longemail@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,
                        createdDate: "2020-11-24",
                        source: "The Knot",
                        lastLogin: "2021-05-04",
                        lifetimeValue: 80000
                   
                    },
                    {
                        id: 5,
                        firstName: "Bobert",
                        lastName: "Bobertson",
                        phoneNumber: "636-123-5652",
                        emailAddress: "ghjklkoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,
                        createdDate: "2020-11-24",
                        source: "The Knot",
                        lastLogin: "2021-05-04",
                        lifetimeValue: 240000
                   
                    },
                ],
                prospects: [{
                    id: 1,
                        firstName: "Amanda",
                        lastName: "Jennings",
                        phoneNumber: "636-699-5652",
                        emailAddress: "amandakoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long just like this one is getting a bit lengthy",
                        profilePicture: undefined,

                    },
                    {
                        id: 2,
                        firstName: "Jenny",
                        lastName: "Jenkins",
                        phoneNumber: "636-459-7652",
                        emailAddress: "amandakoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 3,
                        firstName: "Maggie",
                        lastName: "Mahoney",
                        phoneNumber: "636-234-5652",
                        emailAddress: "magsmahones@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    { 
                        id: 4,
                        firstName: "Jacob",
                        lastName: "Jingelheimerschmidt",
                        phoneNumber: "636-699-4563",
                        emailAddress: "longemail@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 5,
                        firstName: "Bobert",
                        lastName: "Bobertson",
                        phoneNumber: "636-123-5652",
                        emailAddress: "ghjklkoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },],
                vendors: [{
                    id: 1,
                    businessName: "Fun Flowers",
                        firstName: "Amanda",
                        lastName: "Jennings",
                        phoneNumber: "636-699-5652",
                        emailAddress: "amandakoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long just like this one is getting a bit lengthy",
                        profilePicture: undefined,

                    },
                    {
                    businessName: "Cool Guy DJ Company",

                        id: 2,
                        firstName: "Jenny",
                        lastName: "Jenkins",
                        phoneNumber: "636-459-7652",
                        emailAddress: "amandakoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 3,
                        firstName: "Maggie",
                        lastName: "Mahoney",
                        phoneNumber: "636-234-5652",
                        emailAddress: "magsmahones@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 4,
                        firstName: "Jacob",
                        lastName: "Jingelheimerschmidt",
                        phoneNumber: "636-699-4563",
                        emailAddress: "longemail@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 5, 
                        firstName: "Bobert",
                        lastName: "Bobertson",
                        phoneNumber: "636-123-5652",
                        emailAddress: "ghjklkoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },],
                employees: [{
                    id: 1,
                        firstName: "Amanda",
                        lastName: "Jennings",
                        phoneNumber: "636-699-5652",
                        emailAddress: "amandakoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long just like this one is getting a bit lengthy",
                    },
                    {
                        id: 2,
                        firstName: "Jenny",
                        lastName: "Jenkins",
                        phoneNumber: "636-459-7652",
                        emailAddress: "amandakoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 3,
                        firstName: "Maggie",
                        lastName: "Mahoney",
                        phoneNumber: "636-234-5652",
                        emailAddress: "magsmahones@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 4,
                        firstName: "Jacob",
                        lastName: "Jingelheimerschmidt",
                        phoneNumber: "636-699-4563",
                        emailAddress: "longemail@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 5,
                        firstName: "Bobert",
                        lastName: "Bobertson",
                        phoneNumber: "636-123-5652",
                        emailAddress: "ghjklkoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },],
                locations: [{
                    id: 1,
                        firstName: "Amanda",
                        lastName: "Jennings",
                        phoneNumber: "636-699-5652",
                        emailAddress: "amandakoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long just like this one is getting a bit lengthy",
                        profilePicture: undefined,

                    },
                    {
                        id: 2,
                        firstName: "Jenny",
                        lastName: "Jenkins",
                        phoneNumber: "636-459-7652",
                        emailAddress: "amandakoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 3,
                        firstName: "Maggie",
                        lastName: "Mahoney",
                        phoneNumber: "636-234-5652",
                        emailAddress: "magsmahones@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 4,
                        firstName: "Jacob",
                        lastName: "Jingelheimerschmidt",
                        phoneNumber: "636-699-4563",
                        emailAddress: "longemail@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 5,
                        firstName: "Bobert",
                        lastName: "Bobertson",
                        phoneNumber: "636-123-5652",
                        emailAddress: "ghjklkoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },],
                organizers: [{
                    id: 1,
                        firstName: "Amanda",
                        lastName: "Jennings",
                        phoneNumber: "636-699-5652",
                        emailAddress: "amandakoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long just like this one is getting a bit lengthy",
                        profilePicture: undefined,

                    },
                    {
                        id: 2,
                        firstName: "Jenny",
                        lastName: "Jenkins",
                        phoneNumber: "636-459-7652",
                        emailAddress: "amandakoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 3,
                        firstName: "Maggie",
                        lastName: "Mahoney",
                        phoneNumber: "636-234-5652",
                        emailAddress: "magsmahones@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 4,
                        firstName: "Jacob",
                        lastName: "Jingelheimerschmidt",
                        phoneNumber: "636-699-4563",
                        emailAddress: "longemail@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },
                    {
                        id: 5,
                        firstName: "Bobert",
                        lastName: "Bobertson",
                        phoneNumber: "636-123-5652",
                        emailAddress: "ghjklkoch@gmail.com",
                        recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                        profilePicture: undefined,

    
                    },]
            },
            equipment: [],
            events: [
                {
                    id: 1,
                    eventInvoice: {
                        data: {
                            invoiceNumber: 123456489,
                            invoiceDate: '2021-04-21',
                            eventDate: '2021-12-31',
                            finalPaymentDue: '2021-12-01'

                        },
                        packages: [
                            
                            {
                                name: "Holy Matrimony",
                                priceOption: 'hourly',
                                baseTime: 4,
                                baseRate: 130000,
                                addHourly: 10000,
                                eventHours: 5,
                                total: function() {
                                    let total;
                                    if (this.priceOption === "hourly") {
                                        if (this.baseTime < this.eventHours) {
                                          let additionalHourly = this.eventHours - this.baseTime;
                                          total = this.baseRate + this.addHourly * additionalHourly;
                                        }
                                        if (this.baseTime >= this.eventHours) {
                                          total = this.baseRate;
                                        }
                                      }
                                      return total
                                }
                            }
                        ],
                        services: [],
                        addOns: [
                            {
                                name: 'Uplighting',
                                priceOption: 'unit',
                                unitPrice: 3000,
                                eventUnits: 20,
                                total: function() {
                                    let price;
                                    if (this.priceOption === "unit") {
                                        price = this.unitPrice * this.eventUnits;
                                        }
                                    return price;
                                },
                                
                            }
                        ],
                     
                        
                        adjustments: [
                            {
                            name: 'Friends and Family',
                            type: 'discount',
                            amount: -20000,
                            id: 123456789
                            }
                        ],
                        paymentsCollected: [
                            {
                                referenceNumber: '123456789',
                                source: 'Stripe',
                                amount: 20000
                            },
                            {
                                referenceNumber: '987654321',
                                source: 'Stripe',
                                amount: 20000
                            },
                        ],
                    },
                    eventLocations: [
                        {
                            venueName: "The Ceremony Venue",
                            venueStartTime: "18:00",
                            venueEndTime: "19:00",
                            address1: "12345 Anywhere Dr",
                            address2: "Anywhere, MO, 12345",
                        },
                        {
                            venueName: "The Reception Venue",
                            venueStartTime: "19:00",
                            venueEndTime: "22:00",
                            address1: "54321 Nowhere Dr",
                            address2: "Nowhere, MO, 54321",
                        }
                    ],
                    eventDate: "2020-02-05",
                    eventStartTime: "18:00",
                    eventEndTime: "22:00",
                    associatedContacts: [
                        {
                            id: 1, 
                            role: 'client',
                        },
                        {
                            id: 2, 
                            role: 'client',
                        },
                        {
                            id: 1, 
                            role: 'vendor',
                        },
                        {
                            id: 5, 
                            role: 'employee',
                        },
                    ],

                    employeesNeeded: 2,
                },
                {
                    id: 2,
                    payments: 10000,
                    eventInvoice: {
                        packageName: "DJ Package", 
                        payments: 10000,
                        total: 100000,
                        balanceOutstanding: 90000,
                    },
                    eventLocations: [
                        {
                            venueName: "The Venue 2",
                            address1: "12345 Anywhere Dr",
                            address2: "Anywhere, MO, 12345",
                        }
                    ],
                    total: 100000,
                    eventDate: "2020-02-05",
                    eventStartTime: "18:00",
                    eventEndTime: "22:00",
                    associatedContacts: [
                        {
                            id: 1, 
                            role: 'client',
                        },
                        {
                            id: 2, 
                            role: 'client',
                        },
                    ],

                    employeesNeeded: 2,

                },
                {
                    id: 3,
                    eventInvoice: {
                        packageName: "DJ Package", 
                        payments: 10000,
                        total: 100000,
                        balanceOutstanding: 90000,
                    },
                    eventLocations: [
                        {
                            venueName: "The Venue 3",
                            address1: "12345 Anywhere Dr",
                            address2: "Anywhere, MO, 12345",
                        }
                    ],
                    payments: 10000,
                    total: 100000,
                    eventDate: "2020-02-05",
                    eventStartTime: "18:00",
                    eventEndTime: "22:00",
                    associatedContacts: [
                        {
                            id: 4, 
                            role: 'client',
                        },
                        {
                            id: 3, 
                            role: 'client',
                        },
                    ],

                    employeesNeeded: 2,

                },
                {
                    id: 4,
                    
                    eventInvoice: {
                        packageName: "DJ Package", 
                        payments: 10000,
                        total: 100000,
                        balanceOutstanding: 90000,
                    },
                    eventLocations: [
                        {
                            venueName: "The Venue 5",
                            address1: "12345 Anywhere Dr",
                            address2: "Anywhere, MO, 12345",
                        }
                    ],
                    payments: 10000,
                    total: 100000,
                    eventDate: "2020-02-05",
                    eventStartTime: "18:00",
                    eventEndTime: "22:00",
                    associatedContacts: [
                        {
                            id: 4, 
                            role: 'client',
                        },
                        {
                            id: 3, 
                            role: 'client',
                        },
                    ],
                    employeesNeeded: 2,

                },
                {
                    id: 5,
                    
                    eventInvoice: {
                        packageName: "DJ Package", 
                        payments: 10000,
                        total: 100000,
                        balanceOutstanding: 90000,
                    },
                    eventLocations: [
                        {
                            venueName: "The Venue 6",
                            address1: "12345 Anywhere Dr",
                            address2: "Anywhere, MO, 12345",
                        }
                    ],
                    payments: 10000,
                    total: 100000,
                    eventDate: "2020-02-05",
                    eventStartTime: "18:00",
                    eventEndTime: "22:00",
                    associatedContacts: [
                        {
                            id: 5, 
                            role: 'client',
                        },
                        {
                            id: 6, 
                            role: 'client',
                        },
                    ],
                    employeesNeeded: 2,

                },
                {
                    id: 6,
                    payments: 10000,
                    total: 100000,
                    eventInvoice: {
                        packageName: "DJ Package", 
                        payments: 10000,
                        total: 100000,
                        balanceOutstanding: 90000,
                    },
                    eventLocations: [
                        {
                            venueName: "The Venue 7",
                            address1: "12345 Anywhere Dr",
                            address2: "Anywhere, MO, 12345",
                        }
                    ],
                    eventDate: "2020-02-05",
                    eventStartTime: "18:00",
                    eventEndTime: "22:00",
                    associatedContacts: [
                        {
                            id: 1, 
                            role: 'client',
                        },
                        {
                            id: 2, 
                            role: 'client',
                        },
                    ],
                }
            ],
            packages: [],
            services: [],
            addOns: [],
            businessSettings: {
                businessInfo: {
                    businessName: 'Spin Entertainment',
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
                        }]
                }
            },
            users: [],
            clientEventCombined: [],
        };
    },
    actions: {
        // getClients({ commit }) {
            
        // },
       
        // getEvents({ commit }) {
        //     db.collection('events')
        // },
        // getAddOns({ commit }) {
        //     db.collection('addOns')
        //     .get()
        //     .then((querySnapshot) => {
        //         let addOns = [];
        //         querySnapshot.forEach((doc) => { 
        //             let temp = doc.data();
        //             temp.id = doc.id;
        //             addOns.push(temp);
        //         });
        //         console.log(addOns)
        //         commit('setAddOns', addOns);
                
        //     });
            
        // },
        // getContacts({ commit }) {
        //     db.collection('contacts')
        //     .get()
        //     .then((querySnapshot) => {
        //         let contacts = [];
        //         querySnapshot.forEach((doc) => {
        //             let temp = doc.data();
        //             temp.id = doc.id;
        //             contacts.push(temp);
        //         });
        //         commit('setContacts', contacts);
                
        //     });
            
        // },
        // getEquipment({ commit }) {
        //     db.collection('equipment')
        //     .get()
        //     .then((querySnapshot) => {
        //         let equipment = [];
        //         querySnapshot.forEach((doc) => { 
        //             let temp = doc.data();
        //             temp.id = doc.id;
        //             equipment.push(temp)
        //         });
        //         commit('setEquipment', equipment);
                
        //     });
            
        // },
        // getPackages({ commit }) {
        //     db.collection('packages')
        //     .get()
        //     .then((querySnapshot) => {
        //         let packages = [];
        //         querySnapshot.forEach((doc) => { 
        //             let temp = doc.data();
        //             temp.id = doc.id;
        //             packages.push(temp)
        //         });
        //         commit('setPackages', packages);
                
        //     });
            
        // },
        // getServices({ commit }) {
        //     db.collection('services')
        //     .get()
        //     .then((querySnapshot) => {
        //         let services = [];
        //         querySnapshot.forEach((doc) => { 
        //             let temp = doc.data();
        //             temp.id = doc.id;
        //             services.push(temp);
        //         });
        //         commit('setServices', services);
                
        //     });
            
        // },
        // getUserSettings({ commit }) {
        //     db.collection('userSettings')
        //     .get()
        //     .then((querySnapshot) => {
        //         let userSettings = [];
        //         querySnapshot.forEach((doc) => { 
        //             let temp = doc.data();
        //             temp.id = doc.id;
        //             userSettings.push(temp)
        //         });
        //         commit('setUserSettings', userSettings);
                
        //     });
            
        // },
        // getUsers({ commit }) {
        //     db.collection('users')
        //     .get()
        //     .then((querySnapshot) => {
        //         let users = [];
        //         querySnapshot.forEach((doc) => { 
        //             let temp = doc.data();
        //             temp.id = doc.id;
        //             users.push(temp)
        //         });
        //         commit('setUsers', users);
                
        //     });
            
        // },
        addClient( state, client) {
            console.log(client);
            state.commit('addClient', client);
        },
        addProspect( state, prospect) {
            console.log(prospect);
            state.commit('addProspect', prospect);
        },
        addVendor( state, vendor) {
            console.log(vendor);
            state.commit('addVendor', vendor);
        },
        addLocation( state, location) {
            console.log(location);
            let item = {
            }
            item.name = location.name
            item.address = location.address;
            console.log(location);

            state.commit('addLocation', location);
            let contact = location.contact;
            contact.businessName = location.name;
            state.commit('addVendor', contact)
        },
        addOrganizer( state, organizer) {
            console.log(organizer);
            state.commit('addOrganizer', organizer);
        },
        addEmployee( state, employee) {
            console.log(employee);
            state.commit('addEmployee', employee);
        },
        getCombined({ commit }) {
            commit('clientEventCombine');
        },
        approveAutomation( state, id ) {
            console.log(id)
            state.commit('approveAutomation', id)
        },
        deleteAutomation( state, id ) {
            state.commit('deleteAutomation', id)
        },
        deleteApprovedAutomation( state, id ) {
            state.commit('deleteApprovedAutomation', id)
        },
        completeToDo( state, id) {
            state.commit('completeToDo', id)
        },
        addToDo(state, payload) {
            state.commit('addToDo', payload)
        },
        editClient(state, {id, key, value}) {
            state.commit('editClient', {id, key, value})
          },
          deleteContact(state, {category, id}) {
              console.log(category)
              state.commit('deleteContact', {category, id})
          }
    },
    mutations: {
        setClients(state, payload) {
            state.clients = payload;
        },
        addClient(state, payload) {
            state.contacts.clients.push(payload)
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
        addOrganizer(state, payload) {
            state.contacts.organizers.push(payload)
        },
        setEvents(state, payload) {
            state.events = payload;
            this.commit('clientEventCombine');
        },
        setAddOns(state, payload) {
            state.addOns = payload;
        },
        setContacts(state, payload) {
            state.contacts = payload;
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
        setUsers(state, payload) {
            state.users = payload;
        },
        // clientEventCombine(state) {   
            // const associatedUser = state.event
        // },
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
        editClient(state, {id, key, value}) {
            let subject = state.contacts.clients.find((c) => c.id === id);
            subject[key] = value;
            console.log(subject)
        },
        editEvent(state, {id, key, value}) {
            let subject = state.events.find((e) => e.id === id);
            subject[key] = value;
            console.log(subject);
            
        },
        deleteContact(state, {category, id}) {
            let cat = state.contacts[category];
            let subject = cat.findIndex(e => e.id === id);
            cat.splice(subject, 1);

        }
    },
    getters: {

    },
    
});

// store.dispatch('getClients');
// store.dispatch('getEvents');
// store.dispatch('getAddOns');
store.dispatch('getCombined');

export default store;
