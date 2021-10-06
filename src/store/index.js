
import { createStore } from "vuex";
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: undefined,
            errors: [],
            notifications: [
                // {
                //     id: 1,
                //     title: "Congrats! New Booking!",
                //     body: "Bob Bobertson's Wedding Package",
                //     date: new Date(2021, 6, 15, 11, 15),
                //     read: false,
                // },
                // {
                //     id: 2,
                //     title: "Follow Up?",
                //     body: "Prospect: Amanda Jennings",
                //     date: new Date(2021, 6, 14, 11, 15),
                //     read: false,
                // },
                // {
                //     id: 3,
                //     title: "New Inquiry",
                //     body: "Jenny Jenkins: December, 18, 2021",
                //     date: new Date(2021, 6, 15, 11, 15),
                //     read: true,
                // },
                // {
                //     id: 4,
                //     title: "Congrats! New Booking!",
                //     body: "Bob Bobertson's Wedding Package",
                //     date: new Date(2021, 6, 15, 11, 15),
                //     read: false,
                // },
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
                //     id: 1,
                //     associatedClientId: 1,
                //     associatedEventId: 1,
                //     title: "Setup Call",
                //     completed: false,
                // },
                // {
                //     id: 2,
                //     associatedClientId: 2,
                //     associatedEventId: 2,
                //     title: "Send Invoice",
                //     completed: false,
                // },
                // {
                //     id: 3,
                //     associatedClientId: 3,
                //     associatedEventId: 3,
                //     title: "Setup Call",
                //     completed: false,
                // },
                // {
                //     id: 4,
                //     associatedClientId: 4,
                //     associatedEventId: 4,
                //     title: "Send Invoice",
                //     completed: false,
                // },
                // {
                //     id: 5,
                //     associatedClientId: 5,
                //     associatedEventId: 5,
                //     title: "Setup Call",
                //     completed: false,
                // },
                // {
                //     id: 6,
                //     associatedClientId: 6,
                //     associatedEventId: 6,
                //     title: "Send Invoice",
                //     completed: false,
                // },
                // {
                //     id: 7,
                //     associatedClientId: 7,
                //     associatedEventId: 7,
                //     title: "Message Mom",
                //     completed: true,
                // },
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
                // {   
                //     id: 2,
                //     title: 'Send Final Invoice',
                //     performDate: new Date(2021, 1, 15, 18, 15),
                //     associatedContactId: 1,
                //     associatedEventId: 1,
                // },
                // {
                //     id: 3,
                //     title: 'Send Final invoice',
                //     performDate: new Date(2021, 2, 25, 18, 15),
                //     associatedContactId: 1,
                //     associatedEventId: 1,
                // },
                // {   
                //     id: 4,
                //     title: 'Send Review Request',
                //     performDate: new Date(2021, 2, 25, 18, 15),
                //     associatedContactId: 1,
                //     associatedEventId: 1,
                // },
                // {
                //     id: 5,
                //     title: 'Send Review Request',
                //     performDate: new Date(2021, 2, 25, 18, 15),
                //     associatedContactId: 1,
                //     associatedEventId: 1,
                // },],
            },
            contacts: {
                clients: [
                //     {
                //         id: 1,
                //         firstName: "Amanda",
                //         lastName: "Jennings",
                //         phoneNumber: "636-699-5652",
                //         emailAddress: "amandakoch@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long just like this one is getting a bit lengthy",
                //         profilePicture: undefined,
                //         createdDate: "2020-11-24",
                //         source: "The Knot",
                //         lastLogin: "2021-05-04",
                //         lifetimeValue: 100000,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }
                //     },
                //     {
                //         id: 2,
                //         firstName: "Jenny",
                //         lastName: "Jenkins",
                //         phoneNumber: "636-459-7652",
                //         emailAddress: "amandakoch@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,     
                //         createdDate: "2020-11-24",
                //         source: "The Knot",
                //         lastLogin: "2021-05-04",
                //         lifetimeValue: 90000,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }
    
                //     },
                //     {
                //         id: 3,
                //         firstName: "Maggie",
                //         lastName: "Mahoney",
                //         phoneNumber: "636-234-5652",
                //         emailAddress: "magsmahones@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         createdDate: "2020-11-24",
                //         source: "The Knot",
                //         lastLogin: "2021-05-04",
                //         lifetimeValue: 110000,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }
                //     },
                //     {
                //         id: 4,
                //         firstName: "Jacob",
                //         lastName: "Jingelheimerschmidt",
                //         phoneNumber: "636-699-4563",
                //         emailAddress: "longemail@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         createdDate: "2020-11-24",
                //         source: "The Knot",
                //         lastLogin: "2021-05-04",
                //         lifetimeValue: 80000
                   
                //     },
                //     {
                //         id: 5,
                //         firstName: "Bobert",
                //         lastName: "Bobertson",
                //         phoneNumber: "636-123-5652",
                //         emailAddress: "ghjklkoch@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         createdDate: "2020-11-24",
                //         source: "The Knot",
                //         lastLogin: "2021-05-04",
                //         lifetimeValue: 240000,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }
                   
                //     },
                ],
                prospects: [
                    // {
                //     id: 1,
                //     firstName: "Amanda",
                //     lastName: "Jennings",
                //     phoneNumber: "636-699-5652",
                //     emailAddress: "amandakoch@gmail.com",
                //     status: "neutral",
                //     lastContact: new Date(2021, 6, 12),
                //     eventDetails: {
                //         eventDate: undefined,
                //         eventStartTime: undefined,
                //         eventEndTime: undefined,
                //         eventLocations: [],
                //         eventPackage: undefined,
                //         projectedValue: 100000
                //     },
                //     notes: {
                //         private: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //         public: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //     }

                // },
                // {
                //     id: 2,
                //     firstName: "Jenny",
                //     lastName: "Jenkins",
                //     phoneNumber: "636-459-7652",
                //     emailAddress: "amandakoch@gmail.com",
                //     status: "neutral",
                //     lastContact: new Date(2021, 6, 12),
                //     eventDetails: {
                //         eventDate: undefined,
                //         eventStartTime: undefined,
                //         eventEndTime: undefined,
                //         eventLocations: [],
                //         eventPackage: undefined,
                //         projectedValue: 100000
                //     },

                //     notes: {
                //         private: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //         public: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //     }


                // },
                // {
                //     id: 3,
                //     firstName: "Maggie",
                //     lastName: "Mahoney",
                //     phoneNumber: "636-234-5652",
                //     emailAddress: "magsmahones@gmail.com",
                //     status: "neutral",
                //     lastContact: new Date(2021, 6, 12),
                //     eventDetails: {
                //         eventDate: undefined,
                //         eventStartTime: undefined,
                //         eventEndTime: undefined,
                //         eventLocations: [],
                //         eventPackage: undefined,
                //         projectedValue: 100000
                //     },

                //     notes: {
                //         private: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //         public: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //     }


                // },
                // { 
                //     id: 4,
                //     firstName: "Jacob",
                //     lastName: "Jingelheimerschmidt",
                //     phoneNumber: "636-699-4563",
                //     emailAddress: "longemail@gmail.com",
                //     status: "neutral",
                //     lastContact: new Date(2021, 6, 12),
                //     eventDetails: {
                //         eventDate: undefined,
                //         eventStartTime: undefined,
                //         eventEndTime: undefined,
                //         eventLocations: [],
                //         eventPackage: undefined,
                //         projectedValue: 100000
                //     },

                //     notes: {
                //         private: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //         public: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //     }


                // },
                // {
                //     id: 5,
                //     firstName: "Bobert",
                //     lastName: "Bobertson",
                //     phoneNumber: "636-123-5652",
                //     emailAddress: "ghjklkoch@gmail.com",
                //     status: "neutral",
                //     lastContact: new Date(2021, 6, 12),
                //     eventDetails: {
                //         eventDate: undefined,
                //         eventStartTime: undefined,
                //         eventEndTime: undefined,
                //         eventLocations: [],
                //         eventPackage: undefined,
                //         projectedValue: 100000
                //     },

                //     notes: {
                //         private: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //         public: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //     }

    
                //     },
            ],
                vendors: [
                    // {
                //     id: 1,
                //     businessName: "Fun Flowers",
                //     vendorCategory: "Floral + Decor",
                //         firstName: "Amanda",
                //         lastName: "Jennings",
                //         phoneNumber: "636-699-5652",
                //         emailAddress: "amandakoch@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long just like this one is getting a bit lengthy",
                //         profilePicture: undefined,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

                //     },
                //     {
                //     businessName: "Cool Guy DJ Company",
                //     vendorCategory: "DJ + Entertainment",

                //         id: 2,
                //         firstName: "Jenny",
                //         lastName: "Jenkins",
                //         phoneNumber: "636-459-7652",
                //         emailAddress: "amandakoch@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

    
                //     },
                //     {
                //         id: 3,
                //         vendorCategory: "Photography",
                //         firstName: "Maggie",
                //         lastName: "Mahoney",
                //         phoneNumber: "636-234-5652",
                //         emailAddress: "magsmahones@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

    
                //     },
                //     {
                //         id: 4,
                //         vendorCategory: "Videography",
                //         firstName: "Jacob",
                //         lastName: "Jingelheimerschmidt",
                //         phoneNumber: "636-699-4563",
                //         emailAddress: "longemail@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

    
                //     },
                //     {
                //         id: 5, 
                //         vendorCategory: "Hair and Makeup",
                //         firstName: "Bobert",
                //         lastName: "Bobertson",
                //         phoneNumber: "636-123-5652",
                //         emailAddress: "ghjklkoch@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

    
                //     },],
                // employees: [{
                //     id: 1,
                //         firstName: "Amanda",
                //         lastName: "Jennings",
                //         phoneNumber: "636-699-5652",
                //         emailAddress: "amandakoch@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long just like this one is getting a bit lengthy",
                //         profilePicture: undefined,
                //         unavailableDates: ["2021-09-20"],
                //         availabilityRules: {
                //             dayOfWeek: {
                //                 0: true,
                //                 1: false,
                //                 2: false,
                //                 3: true,
                //                 4: false,
                //                 5: false,
                //                 6: false,

                //             },
                //             months: {
                //                 0: false,
                //                 1: false,
                //                 2: false,
                //                 3: true,
                //                 4: false,
                //                 5: false,
                //                 6: false,
                //                 7: false,
                //                 8: false,
                //                 9: false,
                //                 10: false,
                //                 11: false,
                //               },
                //             dateRanges: [
                //                 {
                //                     start: new Date(2021, 10, 3),
                //                     end: new Date(2021, 10, 10)
                //                 }
                //             ],
                //         },
                //         availableDates: [],
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }
                //     },
                //     {
                //         id: 2,
                //         firstName: "Jenny",
                //         lastName: "Jenkins",
                //         phoneNumber: "636-459-7652",
                //         emailAddress: "jennyjenkins@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         unavailableDates: [],
                //         availableDates: [],
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

    
                //     },
                //     {
                //         id: 3,
                //         firstName: "Maggie",
                //         lastName: "Mahoney",
                //         phoneNumber: "636-234-5652",
                //         emailAddress: "magsmahones@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         unavailableDates: [],
                //         availableDates: [],
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

    
                //     },
                //     {
                //         id: 4,
                //         firstName: "Jacob",
                //         lastName: "Jingelheimerschmidt",
                //         phoneNumber: "636-699-4563",
                //         emailAddress: "longemail@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         unavailableDates: [],
                //         availableDates: [],
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

    
                //     },
                //     {
                //         id: 5,
                //         firstName: "Bobert",
                //         lastName: "Bobertson",
                //         phoneNumber: "636-123-5652",
                //         emailAddress: "ghjklkoch@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         unavailableDates: [],
                //         availableDates: [],
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

    
                //     },
            ],
                locations: [
                    // {
                //     id: 1,
                //     name: "The Venue Name",
                //     address: {
                //         address1: "12345 Venue Dr",
                //         address2: "Anywhere, MO, 12345",
                //     },
                //     associatedVendorId: 1,
                //     notes: {
                //         private: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum m fur fur fur fur fur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum fur fur fur fur fur fur r'
                //             },
                //         ],
                //         public: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum fur fur fur fur fur fur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum fur fur fur fur fur fur r'
                //             },
                //         ],
                //     }

                // },
                // {
                //     id: 2,
                //     name: "The Venue Name",
                //     address: {
                //         address1: "12345 Venue Dr",
                //         address2: "Anywhere, MO, 12345",
                //     },
                //     associatedVendorId: 2,
                //     notes: {
                //         private: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum fur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //         public: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //     }

                // },{
                //     id: 3,
                //     name: "The Venue Name",
                //     address: {
                //         address1: "12345 Venue Dr",
                //         address2: "Anywhere, MO, 12345",
                //     },
                //     associatedVendorId: 3,
                //     notes: {
                //         private: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //         public: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //     }

                // },{
                //     id: 4,
                //     name: "The Venue Name",
                //     address: {
                //         address1: "12345 Venue Dr",
                //         address2: "Anywhere, MO, 12345",
                //     },
                //     associatedVendorId: 4,
                //     notes: {
                //         private: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //         public: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //     }

                // },{
                //     id: 5,
                //     name: "The Venue Name",
                //     address: {
                //         address1: "12345 Venue Dr",
                //         address2: "Anywhere, MO, 12345",
                //     },
                //     associatedVendorId: 5,
                //     notes: {
                //         private: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //         public: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //     }

                // },{
                //     id: 6,
                //     name: "The Venue Name",
                //     address: {
                //         address1: "12345 Venue Dr",
                //         address2: "Anywhere, MO, 12345",
                //     },
                //     associatedVendorId: 6,
                //     notes: {
                //         private: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //         public: [
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //             {
                //                 date: new Date(2021, 10, 3),
                //                 note: 'Lorem ipsum dur dur dur dur dur dur r'
                //             },
                //         ],
                //     }

                // },
                    ],
                organizers: [
                    // {
                //     id: 1,
                //         firstName: "Amanda",
                //         lastName: "Jennings",
                //         businessName: "Amanda Plans",
                //         phoneNumber: "636-699-5652",
                //         emailAddress: "amandakoch@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long just like this one is getting a bit lengthy",
                //         profilePicture: undefined,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

                //     },
                //     {
                //         id: 2,
                //         firstName: "Jenny",
                //         lastName: "Jenkins",
                //         phoneNumber: "636-459-7652",
                //         emailAddress: "amandakoch@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

    
                //     },
                //     {
                //         id: 3,
                //         firstName: "Maggie",
                //         lastName: "Mahoney",
                //         phoneNumber: "636-234-5652",
                //         emailAddress: "magsmahones@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

    
                //     },
                //     {
                //         id: 4,
                //         firstName: "Jacob",
                //         lastName: "Jingelheimerschmidt",
                //         phoneNumber: "636-699-4563",
                //         emailAddress: "longemail@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

    
                //     },
                //     {
                //         id: 5,
                //         firstName: "Bobert",
                //         lastName: "Bobertson",
                //         phoneNumber: "636-123-5652",
                //         emailAddress: "ghjklkoch@gmail.com",
                //         recentMessage: "This is my most recent message! It should be truncated if it should get too long",
                //         profilePicture: undefined,
                //         notes: {
                //             private: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //             public: [
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //                 {
                //                     date: new Date(2021, 10, 3),
                //                     note: 'Lorem ipsum dur dur dur dur dur dur r'
                //                 },
                //             ],
                //         }

    
                //     },
            ]
            },
            equipment: [],
            events: [
                {
                    id: 1,
                    eventType: 'wedding',
                    eventTitle: 'Wedding Package',
                    get subtotal() {
                        let eventHours = this.eventLength
                        let packageTotal = 0;
                        let serviceTotal = 0;
                        let addOnTotal = 0;
                        let total = 0;
                        
                        this.eventInvoice.packages.forEach(element => {
                            if (element.priceOption === "hourly") {
               
                                if (element.baseTime < eventHours) {
                                  let additionalHourly = eventHours - element.baseTime;

                                  packageTotal = packageTotal + (element.baseRate + element.addHourly * additionalHourly);
                                }
                                if (element.baseTime >= element.eventHours) {
                                  packageTotal = packageTotal + element.baseRate;
                                }
                              }
                              if (element.priceOption === 'flat') {
                                  packageTotal = packageTotal + element.flatRate
                              }
                        });
                        total = total + packageTotal;


                        this.eventInvoice.services.forEach(element => {
                            if (element.priceOption === "hourly") {
                                if (element.baseTime < this.eventLength) {
                                  let additionalHourly = element.eventHours - element.baseTime;
                                  serviceTotal = element.baseRate + element.addHourly * additionalHourly;
                                }
                                if (element.baseTime >= element.eventHours) {
                                  serviceTotal = element.baseRate;
                                }
                              }
                              if (element.priceOption === 'flat') {
                                  serviceTotal = packageTotal + element.flatRate
                              }
                        });
                        total = total + serviceTotal;
                        
                        this.eventInvoice.addOns.forEach(element => {
                            if (element.priceOption === "hourly") {
                                addOnTotal = addOnTotal + element.hourlyPrice * eventHours
                              }
                              if (element.priceOption === "unit") {
                                addOnTotal = addOnTotal + element.unitPrice * element.eventUnits;
                              }
                              if (element.priceOption === 'flat') {
                                  addOnTotal = addOnTotal + element.flatRate
                              }
                        });
                        total = total + addOnTotal;

                        return total;
                    },
                    get total() {

                        let adjustments = this.eventInvoice.adjustments.reduce((a, b) => a + (b["amount"] || 0), 0)
                        let subtotal = this.subtotal;

                        return subtotal + adjustments;
                    },
                    get paymentTotal() {
                        return this.eventInvoice.paymentsCollected.reduce((a, b) => a + (b["amount"] || 0), 0)
                    },
                    get balanceOutstanding() {
                        return this.total - this.paymentTotal
                    },
                    eventInvoice: {
                        data: {
                            invoiceNumber: 123456489,
                            invoiceDate: '2021-04-21',
                            eventDate: '2021-12-31',
                            finalPaymentDue: '2021-12-01',
                            

                        },
                        packages: [
                            
                            {
                                name: "Holy Matrimony",
                                priceOption: 'hourly',
                                baseTime: 4,
                                baseRate: 130000,
                                addHourly: 10000,
                            }
                        ],
                        services: [],
                        addOns: [
                            {
                                name: 'Uplighting',
                                priceOption: 'unit',
                                unitPrice: 3000,
                                eventUnits: 20,
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
                            locationId: 1,
                            venueStartTime: "18:00",
                            venueEndTime: "19:00",
                        },
                        {
                            locationId: 2,
                            venueStartTime: "19:00",
                            venueEndTime: "22:00",
                            address1: "54321 Nowhere Dr",
                        }
                    ],
                    eventStartTime: new Date(2021, 10, 25, 18, 15),
                    eventEndTime: new Date(2021, 10, 25, 23, 30),
                    get eventLength() {
                        return (this.eventEndTime - this.eventStartTime) / 36e5
                    },
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
                    eventType: 'wedding',
                    eventTitle: 'Wedding Package',
                    get total() {
                        let eventHours = this.eventLength
                        let packageTotal = 0;
                        let serviceTotal = 0;
                        let addOnTotal = 0;
                        let total = 0;
                        
                        this.eventInvoice.packages.forEach(element => {
                            if (element.priceOption === "hourly") {
               
                                if (element.baseTime < eventHours) {
                                  let additionalHourly = eventHours - element.baseTime;

                                  packageTotal = packageTotal + (element.baseRate + element.addHourly * additionalHourly);
                                }
                                if (element.baseTime >= element.eventHours) {
                                  packageTotal = packageTotal + element.baseRate;
                                }
                              }
                              if (element.priceOption === 'flat') {
                                  packageTotal = packageTotal + element.flatRate
                              }
                        });
                        total = total + packageTotal;


                        this.eventInvoice.services.forEach(element => {
                            if (element.priceOption === "hourly") {
                                if (element.baseTime < this.eventLength) {
                                  let additionalHourly = element.eventHours - element.baseTime;
                                  serviceTotal = element.baseRate + element.addHourly * additionalHourly;
                                }
                                if (element.baseTime >= element.eventHours) {
                                  serviceTotal = element.baseRate;
                                }
                              }
                              if (element.priceOption === 'flat') {
                                  serviceTotal = packageTotal + element.flatRate
                              }
                        });
                        total = total + serviceTotal;
                        
                        this.eventInvoice.addOns.forEach(element => {
                            if (element.priceOption === "hourly") {
                                addOnTotal = addOnTotal + element.hourlyPrice * eventHours
                              }
                              if (element.priceOption === 'flat') {
                                  addOnTotal = addOnTotal + element.flatRate
                              }
                        });
                        total = total + addOnTotal;
                        let adjustments = this.eventInvoice.adjustments.reduce((a, b) => a + (b["amount"] || 0), 0)
                        total = total + adjustments;

                        return total;
                    },
                    get paymentTotal() {
                        return this.eventInvoice.paymentsCollected.reduce((a, b) => a + (b["amount"] || 0), 0)
                    },
                    get balanceOutstanding() {
                        return this.total - this.paymentTotal
                    },
                    eventInvoice: {
                        data: {
                            invoiceNumber: 123456489,
                            invoiceDate: '2021-04-21',
                            eventDate: '2021-12-31',
                            finalPaymentDue: '2021-12-01',
                            

                        },
                        packages: [
                            
                            {
                                name: "Holy Matrimony",
                                priceOption: 'hourly',
                                baseTime: 4,
                                baseRate: 130000,
                                addHourly: 10000,
                            }
                        ],
                        services: [],
                        addOns: [
                            {
                                name: 'Uplighting',
                                priceOption: 'unit',
                                unitPrice: 3000,
                                eventUnits: 20,
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
                            locationId: 1,
                        }
                    ],
                    // total: 100000,
                    eventStartTime: new Date(2021, 9, 25, 18, 15),
                    eventEndTime: new Date(2021, 9, 25, 23, 30),
                    get eventLength() {
                        return (this.eventEndTime - this.eventStartTime) / 36e5
                    },
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
                    eventType: 'wedding',
                    eventTitle: 'Wedding Package',
                    get total() {
                        let eventHours = this.eventLength
                        let packageTotal = 0;
                        let serviceTotal = 0;
                        let addOnTotal = 0;
                        let total = 0;
                        
                        this.eventInvoice.packages.forEach(element => {
                            if (element.priceOption === "hourly") {
               
                                if (element.baseTime < eventHours) {
                                  let additionalHourly = eventHours - element.baseTime;

                                  packageTotal = packageTotal + (element.baseRate + element.addHourly * additionalHourly);
                                }
                                if (element.baseTime >= element.eventHours) {
                                  packageTotal = packageTotal + element.baseRate;
                                }
                              }
                              if (element.priceOption === 'flat') {
                                  packageTotal = packageTotal + element.flatRate
                              }
                        });
                        total = total + packageTotal;


                        this.eventInvoice.services.forEach(element => {
                            if (element.priceOption === "hourly") {
                                if (element.baseTime < this.eventLength) {
                                  let additionalHourly = element.eventHours - element.baseTime;
                                  serviceTotal = element.baseRate + element.addHourly * additionalHourly;
                                }
                                if (element.baseTime >= element.eventHours) {
                                  serviceTotal = element.baseRate;
                                }
                              }
                              if (element.priceOption === 'flat') {
                                  serviceTotal = packageTotal + element.flatRate
                              }
                        });
                        total = total + serviceTotal;
                        
                        this.eventInvoice.addOns.forEach(element => {
                            if (element.priceOption === "hourly") {
                                addOnTotal = addOnTotal + element.hourlyPrice * eventHours
                              }
                              if (element.priceOption === 'flat') {
                                  addOnTotal = addOnTotal + element.flatRate
                              }
                        });
                        total = total + addOnTotal;
                        let adjustments = this.eventInvoice.adjustments.reduce((a, b) => a + (b["amount"] || 0), 0)
                        total = total + adjustments;

                        return total;
                    },
                    get paymentTotal() {
                        return this.eventInvoice.paymentsCollected.reduce((a, b) => a + (b["amount"] || 0), 0)
                    },
                    get balanceOutstanding() {
                        return this.total - this.paymentTotal
                    },
                    eventInvoice: {
                        data: {
                            invoiceNumber: 123456489,
                            invoiceDate: '2021-04-21',
                            eventDate: '2021-12-31',
                            finalPaymentDue: '2021-12-01',
                            

                        },
                        packages: [
                            
                            {
                                name: "Holy Matrimony",
                                priceOption: 'hourly',
                                baseTime: 4,
                                baseRate: 130000,
                                addHourly: 10000,
                            }
                        ],
                        services: [],
                        addOns: [
                            {
                                name: 'Uplighting',
                                priceOption: 'unit',
                                unitPrice: 3000,
                                eventUnits: 20,
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
                            locationId: 1
                        }
                    ],
                    
                    eventStartTime: new Date(2021, 10, 30, 15, 15),
                    eventEndTime: new Date(2021, 10, 30, 20, 30),
                    get eventLength() {
                        return (this.eventEndTime - this.eventStartTime) / 36e5
                    },
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
                    eventType: 'wedding',
                    eventTitle: 'Wedding Package',
                    get total() {
                        let eventHours = this.eventLength
                        let packageTotal = 0;
                        let serviceTotal = 0;
                        let addOnTotal = 0;
                        let total = 0;
                        
                        this.eventInvoice.packages.forEach(element => {
                            if (element.priceOption === "hourly") {
               
                                if (element.baseTime < eventHours) {
                                  let additionalHourly = eventHours - element.baseTime;

                                  packageTotal = packageTotal + (element.baseRate + element.addHourly * additionalHourly);
                                }
                                if (element.baseTime >= element.eventHours) {
                                  packageTotal = packageTotal + element.baseRate;
                                }
                              }
                              if (element.priceOption === 'flat') {
                                  packageTotal = packageTotal + element.flatRate
                              }
                        });
                        total = total + packageTotal;


                        this.eventInvoice.services.forEach(element => {
                            if (element.priceOption === "hourly") {
                                if (element.baseTime < this.eventLength) {
                                  let additionalHourly = element.eventHours - element.baseTime;
                                  serviceTotal = element.baseRate + element.addHourly * additionalHourly;
                                }
                                if (element.baseTime >= element.eventHours) {
                                  serviceTotal = element.baseRate;
                                }
                              }
                              if (element.priceOption === 'flat') {
                                  serviceTotal = packageTotal + element.flatRate
                              }
                        });
                        total = total + serviceTotal;
                        
                        this.eventInvoice.addOns.forEach(element => {
                            if (element.priceOption === "hourly") {
                                addOnTotal = addOnTotal + element.hourlyPrice * eventHours
                              }
                              if (element.priceOption === 'flat') {
                                  addOnTotal = addOnTotal + element.flatRate
                              }
                        });
                        total = total + addOnTotal;
                        let adjustments = this.eventInvoice.adjustments.reduce((a, b) => a + (b["amount"] || 0), 0)
                        total = total + adjustments;

                        return total;
                    },
                    get paymentTotal() {
                        return this.eventInvoice.paymentsCollected.reduce((a, b) => a + (b["amount"] || 0), 0)
                    },
                    get balanceOutstanding() {
                        return this.total - this.paymentTotal
                    },
                    eventInvoice: {
                        data: {
                            invoiceNumber: 123456489,
                            invoiceDate: '2021-04-21',
                            eventDate: '2021-12-31',
                            finalPaymentDue: '2021-12-01',
                            

                        },
                        packages: [
                            
                            {
                                name: "Holy Matrimony",
                                priceOption: 'hourly',
                                baseTime: 4,
                                baseRate: 130000,
                                addHourly: 10000,
                            }
                        ],
                        services: [],
                        addOns: [
                            {
                                name: 'Uplighting',
                                priceOption: 'unit',
                                unitPrice: 3000,
                                eventUnits: 20,
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
                            locationId: 1
                        }
                    ],
                    
                    eventStartTime: new Date(2021, 8, 20, 18, 15),
                    eventEndTime: new Date(2021, 8, 20, 23, 30),
                    get eventLength() {

                        return (this.eventEndTime - this.eventStartTime) / 36e5
                    },
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
                    eventType: 'wedding',
                    eventTitle: 'Wedding Package',
                    get total() {
                        let eventHours = this.eventLength
                        let packageTotal = 0;
                        let serviceTotal = 0;
                        let addOnTotal = 0;
                        let total = 0;
                        
                        this.eventInvoice.packages.forEach(element => {
                            if (element.priceOption === "hourly") {
               
                                if (element.baseTime < eventHours) {
                                  let additionalHourly = eventHours - element.baseTime;

                                  packageTotal = packageTotal + (element.baseRate + element.addHourly * additionalHourly);
                                }
                                if (element.baseTime >= element.eventHours) {
                                  packageTotal = packageTotal + element.baseRate;
                                }
                              }
                              if (element.priceOption === 'flat') {
                                  packageTotal = packageTotal + element.flatRate
                              }
                        });
                        total = total + packageTotal;


                        this.eventInvoice.services.forEach(element => {
                            if (element.priceOption === "hourly") {
                                if (element.baseTime < this.eventLength) {
                                  let additionalHourly = element.eventHours - element.baseTime;
                                  serviceTotal = element.baseRate + element.addHourly * additionalHourly;
                                }
                                if (element.baseTime >= element.eventHours) {
                                  serviceTotal = element.baseRate;
                                }
                              }
                              if (element.priceOption === 'flat') {
                                  serviceTotal = packageTotal + element.flatRate
                              }
                        });
                        total = total + serviceTotal;
                        
                        this.eventInvoice.addOns.forEach(element => {
                            if (element.priceOption === "hourly") {
                                addOnTotal = addOnTotal + element.hourlyPrice * eventHours
                              }
                              if (element.priceOption === 'flat') {
                                  addOnTotal = addOnTotal + element.flatRate
                              }
                        });
                        total = total + addOnTotal;
                        let adjustments = this.eventInvoice.adjustments.reduce((a, b) => a + (b["amount"] || 0), 0)
                        total = total + adjustments;

                        return total;
                    },
                    get paymentTotal() {
                        return this.eventInvoice.paymentsCollected.reduce((a, b) => a + (b["amount"] || 0), 0)
                    },
                    get balanceOutstanding() {
                        return this.total - this.paymentTotal
                    },
                    eventInvoice: {
                        data: {
                            invoiceNumber: 123456489,
                            invoiceDate: '2021-04-21',
                            eventDate: '2021-12-31',
                            finalPaymentDue: '2021-12-01',
                            

                        },
                        packages: [
                            
                            {
                                name: "Holy Matrimony",
                                priceOption: 'hourly',
                                baseTime: 4,
                                baseRate: 130000,
                                addHourly: 10000,
                            }
                        ],
                        services: [],
                        addOns: [
                            {
                                name: 'Uplighting',
                                priceOption: 'unit',
                                unitPrice: 3000,
                                eventUnits: 20,
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
                            locationId: 1
                        }
                    ],
                    eventStartTime: new Date(2021, 9, 25, 18, 15),
                    eventEndTime: new Date(2021, 9, 25, 23, 30),
                    get eventLength() {
                        return (this.eventEndTime - this.eventStartTime) / 36e5
                    },
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
                    eventType: 'wedding',
                    eventTitle: 'Wedding Package',
                    get total() {
                        let eventHours = this.eventLength
                        let packageTotal = 0;
                        let serviceTotal = 0;
                        let addOnTotal = 0;
                        let total = 0;
                        
                        this.eventInvoice.packages.forEach(element => {
                            if (element.priceOption === "hourly") {
               
                                if (element.baseTime < eventHours) {
                                  let additionalHourly = eventHours - element.baseTime;

                                  packageTotal = packageTotal + (element.baseRate + element.addHourly * additionalHourly);
                                }
                                if (element.baseTime >= element.eventHours) {
                                  packageTotal = packageTotal + element.baseRate;
                                }
                              }
                              if (element.priceOption === 'flat') {
                                  packageTotal = packageTotal + element.flatRate
                              }
                        });
                        total = total + packageTotal;


                        this.eventInvoice.services.forEach(element => {
                            if (element.priceOption === "hourly") {
                                if (element.baseTime < this.eventLength) {
                                  let additionalHourly = element.eventHours - element.baseTime;
                                  serviceTotal = element.baseRate + element.addHourly * additionalHourly;
                                }
                                if (element.baseTime >= element.eventHours) {
                                  serviceTotal = element.baseRate;
                                }
                              }
                              if (element.priceOption === 'flat') {
                                  serviceTotal = packageTotal + element.flatRate
                              }
                        });
                        total = total + serviceTotal;
                        
                        this.eventInvoice.addOns.forEach(element => {
                            if (element.priceOption === "hourly") {
                                addOnTotal = addOnTotal + element.hourlyPrice * eventHours
                              }
                              if (element.priceOption === 'flat') {
                                  addOnTotal = addOnTotal + element.flatRate
                              }
                        });
                        total = total + addOnTotal;
                        let adjustments = this.eventInvoice.adjustments.reduce((a, b) => a + (b["amount"] || 0), 0)
                        total = total + adjustments;

                        return total;
                    },
                    get paymentTotal() {
                        return this.eventInvoice.paymentsCollected.reduce((a, b) => a + (b["amount"] || 0), 0)
                    },
                    get balanceOutstanding() {
                        return this.total - this.paymentTotal
                    },
                    eventInvoice: {
                        data: {
                            invoiceNumber: 123456489,
                            invoiceDate: '2021-04-21',
                            eventDate: '2021-12-31',
                            finalPaymentDue: '2021-12-01',
                            

                        },
                        packages: [
                            
                            {
                                name: "Holy Matrimony",
                                priceOption: 'hourly',
                                baseTime: 4,
                                baseRate: 130000,
                                addHourly: 10000,
                            }
                        ],
                        services: [],
                        addOns: [
                            {
                                name: 'Uplighting',
                                priceOption: 'unit',
                                unitPrice: 3000,
                                eventUnits: 20,
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
                            locationId: 1
                        }
                    ],
                    eventStartTime: new Date(2021, 9, 25, 18, 15),
                    eventEndTime: new Date(2021, 9, 25, 23, 30),
                    get eventLength() {
                        return (this.eventEndTime - this.eventStartTime) / 36e5
                    },
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
            
            businessSettings: {
                information: {
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
                },
                brandingPreferences: {
                    backgroundColor: '#F0F0F0',
                    foregroundColor: '#FFFFFF',
                    cardOutline: "#FFFFFF",
                    highlightColor: "#00F5FF",
                    textColor: "#000000"
                },
                product: {
                    eventTypes: ["wedding", "mitzvah"],
                    packages: [ {
                        id: "1",
                        packageName: "Holy Matrimony",
                        price: {
                            baseTime: 5,
                            baseRate: 180000,
                            addHourly: 10000,
                        },
                        employeesRequired: 2,
                        photo: undefined,
                    }],
                    services: [
                        {
                            id: "1",
                            serviceName: "Wedding DJ",
                            price: {
                                baseTime: 5,
                                baseRate: 150000,
                                addHourly: 10000,
                            },
                            photo: undefined,
                            equipmentNeeded: [],
                            employeesRequired: undefined
                        },
                        {
                            id: "2",
                            serviceName: "Wedding Officiant",
                            price: {
                                baseTime: 1,
                                baseRate: 30000,
                                addHourly: 0,
                            },
                            photo: undefined,
                            equipmentNeeded: [],
                            employeesRequired: undefined
                        }
                    ],
                },
                
                addOns: [],
                discounts: [],
                automations: [],
            },
            // users: [],
            // clientEventCombined: [],
        };
    },
    actions: {
        setUser(context, user) {
            axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${user}/users/${user}`).then(response => {
                console.log(response);
                context.commit('setUser', response.data.Item);
            }).then(() => {
            })
        },
        addError(context, error) {
            context.commit('addError', error)
        },
        clearErrors(context) {
            context.commit('clearErrors');
        },
        getAdminUsers(context) {
          
            console.log(context.state);

            axios.get(`https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users`).then(response => {
            console.log(response);    
            context.commit('setClients', response.data.Items.filter(x => x.role === 'client'));
            context.commit('setEmployees', response.data.Items.filter(x => x.role === 'employee'));
            context.commit('setOrganizers', response.data.Items.filter(x => x.role === 'organizer'));
            context.commit('setVendors', response.data.Items.filter(x => x.role === 'vendor'));
            });
            
        },
        async addContact( context, contact) {
            axios.put(
                `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tentantId}/users`,
                contact
              )
              .then((result) => {
                console.log(result.data);
                context.commit('addContact', result.data);
              });
        },
        
        addLocation( context, location) {
            console.log(location);
            let item = {
            }
            item.name = location.name
            item.address = location.address;
            console.log(location);

            context.commit('addLocation', item);
            let contact = location.contact;
            contact.businessName = location.name;
            context.commit('addVendor', contact)
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
        editEvent(context, {id, key, value}) {
            context.commit('editEvent', {id, key, value})
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            console.log(state.user);
        },
        addError(state, error) {
            state.errors.push(error);
        },
        clearErrors(state) {
            state.errors.length = 0;
        },
        setClients(state, payload) {
            state.contacts.clients = payload;
            console.log(state.contacts);
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
        editEvent(state, {id, key, value}) {
            let subject = state.events.find((e) => e.id === id);
            subject[key] = value;

            
        },
        deleteContact(state, {category, id}) {
            let cat = state.contacts[category];
            let subject = cat.findIndex(e => e.id === id);
            cat.splice(subject, 1);

        }
    },
    getters: {

    },
    plugins: [createPersistedState()]
    
});

// store.dispatch('getClients');
// store.dispatch('getEvents');
// store.dispatch('getAddOns');
store.dispatch('getCombined');

export default store;
