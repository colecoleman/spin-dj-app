import { createStore } from "vuex";
import axios from "axios";
import { Storage, Auth } from "aws-amplify";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      user: undefined,
      statuses: [],
      notifications: [],
      toDos: [],
      automations: {},
      contacts: {
        clients: [],
        // prospects: [],
        vendors: [],
        employees: [],
        locations: [],
        organizers: [],
      },
      equipment: [],
      events: [],
    };
  },
  actions: {
    async getPublicSettings(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/public/${context.state.user.tenantId}/settings`
          )
          .then(
            (result) => {
              resolve(result.data);
              context.commit("setBusinessSettings", result.data);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async getUser(context, user) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users/${user}`
          )
          .then(
            (result) => {
              resolve(result.data.Item);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    //remove below
    async adminGetContact(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users/${payload}`
          )
          .then(
            (result) => {
              resolve(result);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async nonAdminGetUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/${context.state.user.role}/${context.state.user.tenantId}/${context.state.user.userId}/users/${payload}`
          )
          .then(
            (result) => {
              resolve(result.data.Item);
              // context.commit('setUser', result.data.Item);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async setUser(context) {
      let user = await Auth.currentAuthenticatedUser();
      let userId = user.username;
      let tenantId = user.attributes["custom:tenantId"]
        ? user.attributes["custom:tenantId"]
        : userId;
      await axios
        .get(
          `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${tenantId}/users/${userId}`
        )
        .then((response) => {
          context.commit("setUser", response.data.Item);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // admin actions
    async getAdminEvents(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events`
          )
          .then(
            (result) => {
              resolve(result);
              context.commit("setEvents", result);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async setBusinessSettings(context) {
      await axios
        .get(
          `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.userId}/settings`
        )
        .then((response) => {
          if ("businessSettings" in response.data.Item) {
            context.commit(
              "setBusinessSettings",
              response.data.Item.businessSettings
            );
            if ("identity" in response.data.Item.businessSettings)
              context.commit(
                "setBranding",
                response.data.Item.businessSettings.identity
              );
          }
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async addToDo(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/todo`,
            payload
          )
          .then(
            (result) => {
              resolve(result);
              context.commit("addToDo", result.data);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async completeToDo(context, payload) {
      await axios
        .put(
          `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/todo/${payload.id}`,
          payload
        )
        .then(
          () => {
            context.commit("addStatus", {
              type: "success",
              note: "To-Do Added",
            });
            context.commit("completeToDo", payload.id);
          },
          (error) => {
            context.commit("addStatus", {
              type: "error",
              note: error,
            });
          }
        );
    },
    async getToDos(context, payload) {
      let category = payload.associatedContactId ? "contact" : "event";
      let id = payload.associatedContactId
        ? payload.associatedContactId
        : payload.associatedEventId;
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/todo/${category}/${id}`
          )
          .then(
            (result) => {
              resolve(result.data);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async updateBusinessSettings({ commit, state }) {
      let payload = {
        variable: "businessSettings",
        value: state.businessSettings,
      };
      axios
        .put(
          `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${state.user.tenantId}/users/${state.user.userId}`,
          payload
        )
        .then(() => {
          commit("setBusinessSettings", payload.value);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async checkSubdomain(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/subdomain/check/${payload}`
          )
          .then(
            (result) => {
              resolve(result);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async addSubdomain(context, payload) {
      axios
        .put(
          `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/subdomain/add/${payload}`
        )
        .then(() => {
          context.commit("adminConfigIdentityAddSubdomain", payload);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async deleteSubdomain(context, payload) {
      axios
        .put(
          `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/subdomain/delete/${payload}`
        )
        .then(() => {
          context.commit("addStatus", {
            type: "success",
            note: "Subdomain successfully deleted",
          });
          context.commit("adminConfigIdentityDeleteSubdomain", payload);
        })
        .catch((e) => {
          console.log(e);
          context.commit("addStatus", {
            type: "error",
            note: "Subdomain deletion unsuccessful. Please try again.",
          });
        });
    },
    async adminApproveAutomation(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/automations/${payload.id}`,
            payload.payload
          )
          .then(
            (result) => {
              resolve(result);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async adminDeleteAutomation(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/automations/${payload}`
          )
          .then(
            (result) => {
              resolve(result);
              context.commit("addStatus", {
                type: "success",
                note: "Automation Deleted",
              });
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },

    // contact-based-actions
    async getAdminUsers(context) {
      axios
        .get(
          `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users`
        )
        .then((response) => {
          context.commit("setContactsToCategory", {
            category: "clients",
            items: response.data.Items.filter((x) => x.role === "client"),
          });
          context.commit("setContactsToCategory", {
            category: "employees",
            items: response.data.Items.filter((x) => x.role === "employee"),
          });
          context.commit("setContactsToCategory", {
            category: "organizers",
            items: response.data.Items.filter((x) => x.role === "organizer"),
          });
          context.commit("setContactsToCategory", {
            category: "vendors",
            items: response.data.Items.filter((x) => x.role === "vendor"),
          });
        })
        .catch((e) => context.commit("addStatus", `Error: ${e}`));
    },
    async addContact(context, contact) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users`,
            contact
          )
          .then(
            (result) => {
              console.log(result);
              resolve(result.data);
              context.commit("addContact", {
                role: result.data.role,
                item: result.data,
              });
            },
            (error) => {
              context.commit("addStatus", `Error: ${error}`);
              reject(error);
            }
          );
      });
    },
    async editContact(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users/${payload.clientId}`,
            payload
          )
          .then(
            (result) => {
              resolve(result);

              context.commit("addStatus", {
                type: "success",
                note: "Contact Successfully Updated",
              });
              context.commit("editEvent", result);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async deleteUser(context, payload) {
      await axios
        .delete(
          `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users/${payload.id}`
        )
        .then(() => {
          context.commit("addStatus", {
            type: "success",
            note: "Successfully Deleted User",
          });
          context.commit("deleteUser", payload);
        })
        .catch((error) => {
          context.commit("addStatus", {
            type: "error",
            note: error,
          });
        });
    },
    async addLocation(context, location) {
      location = { ...location, id: "location" + new Date().getTime() };
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/locations`,
            location
          )
          .then(
            (result) => {
              resolve(result);

              context.commit("addContact", {
                role: "locations",
                item: result.data,
              });
            },
            (error) => {
              context.commit("addStatus", `Error: ${error}`);
              reject(error);
            }
          );
      });
    },
    async getLocation(context, location) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/locations/${location}`
          )
          .then(
            (result) => {
              resolve(result.data);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async getLocations(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/locations`
          )
          .then(
            (result) => {
              resolve(result.data);
              context.commit("setContactsToCategory", {
                category: "locations",
                items: result.data.Items,
              });
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async editLocation(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/locations/${payload.locationId}`,
            payload
          )
          .then(
            (result) => {
              resolve(result);

              // context.commit('editLocation', result)
            },
            (error) => {
              // console.log(error)
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async sendEmail(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/sendEmail`,
            payload
          )
          .then((res) => {
            resolve(res);
            context.commit("addStatus", {
              type: "success",
              note: "Email sent successfully.",
            });
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    async getContactAutomations(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/users/${payload}/automations`
          )
          .then(
            (result) => {
              resolve(result.data);
            },
            (error) => {
              console.log(error);
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    // messaging actions
    async createMessagingThread(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/messaging/createThread`,
            payload
          )
          .then(
            (result) => {
              resolve(result);
              context.commit("addStatus", {
                type: "success",
                note: "Message Thread Complete",
              });
              context.commit("editEvent", result);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async sendMessage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/messaging/message`,
            payload
          )
          .then(
            (result) => {
              resolve(result);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async getMessageThread(context, thread) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/messaging/getThread/${thread.replaceAll(
              "#",
              "%23"
            )}`
          )
          .then(
            (result) => {
              resolve(result.data);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async getThreadParticipants(context, thread) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/messaging/getThreadParticipants/${thread.replaceAll(
              "#",
              "%23"
            )}`
          )
          .then(
            (result) => {
              resolve(result.data);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    // event actions
    async addEvent(context, event) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events`,
            event
          )
          .then(
            (result) => {
              resolve(result);
              context.commit("addEvent", result.data);
            },
            (error) => {
              context.commit("addStatus", `Error: ${error}`);
              reject(error);
            }
          );
      });
    },
    async getEvent(context, payload) {
      let role;
      if (context.state.user.userId === context.state.user.tenantId) {
        role = "admin";
      } else {
        role = context.state.user.role;
      }
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/${role}/${context.state.user.tenantId}/${context.state.user.userId}/events/${payload}`
          )
          .then(
            (result) => {
              resolve(result);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async adminGetEvent(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events/${payload}`
          )
          .then(
            (result) => {
              resolve(result);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async editEvent(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events/${payload.eventId}`,
            payload
          )
          .then(
            (result) => {
              resolve(result);

              context.commit("editEvent", result);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async deleteEvent(context, payload) {
      await axios
        .delete(
          `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events/${payload}`
        )
        .then(() => {
          context.commit("addStatus", {
            type: "success",
            note: "Successfully Deleted Event",
          });
        })
        .catch((error) => {
          context.commit("addStatus", {
            type: "error",
            note: error,
          });
        });
    },
    async getEvents(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/${context.state.user.role}/${context.state.user.tenantId}/${context.state.user.userId}/events`
          )
          .then(
            (result) => {
              resolve(result);
              context.commit("setEvents", result);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async clientSignContract(context, callerPayload) {
      let payload = {
        value: callerPayload.contracts,
        variable: "contracts",
      };
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/${context.state.user.role}/${context.state.user.tenantId}/${context.state.user.userId}/events/${callerPayload.eventId}`,
            payload
          )
          .then(
            (result) => {
              resolve(result);

              context.commit("setUser", result.data.Item);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    async getEventAutomations(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/events/${payload}/automations`
          )
          .then(
            (result) => {
              resolve(result.data);
            },
            (error) => {
              console.log(error);
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
    // stripe actions
    async stripeCreateAccount(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/stripe/createAccount/${payload}`
          )
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    async stripeCheckAccount(context) {
      let stripeId =
        context.state.businessSettings.payments.creditCard.Stripe.id;
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/stripe/checkAccount/${stripeId}`
          )
          .then(
            (result) => {
              resolve(result.data);
            },
            (error) => {
              reject(error);
            }
          );
      });
    },
    async stripeCreatePaymentIntent(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/stripe/pay/${payload.eventId}`,
            payload
          )
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    async stripeCreateSubscription(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/subscribe`,
            payload
          )
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    async stripeCreatePortal(context) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/stripe/portal/${context.state.user.stripeId}`
          )
          .then((res) => {
            resolve(res);
            console.log(res);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    // utlity actions
    async addPhoto(context, payload) {
      return new Promise((resolve, reject) => {
        let name = context.state.user.userId + new Date().getTime();
        Storage.put(name, payload)
          .then((res) => {
            resolve(
              "https://spindjappstorage140016-prod.s3.amazonaws.com/public/" +
                res.key
            );
          })
          .catch((e) => {
            reject(e);
            console.log(e);
          });
      });
    },
    async getPhoto(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${context.state.user.tenantId}/getFile/${payload}`
          )
          .then(
            (result) => {
              resolve(result.data);
            },
            (error) => {
              context.commit("addStatus", {
                type: "error",
                note: error,
              });
              reject(error);
            }
          );
      });
    },
  },
  mutations: {
    // public mutations ///////////////////////////////
    setUser(state, user) {
      state.user = user;
    },
    setBusinessSettings(state, settings) {
      state.businessSettings = settings;
    },
    setBranding(state, settings) {
      state.branding = settings;
    },
    setPublicSettings(state, settings) {
      state.businessSettings = settings;
    },
    addStatus(state, status) {
      state.statuses.push(status);
    },
    clearStatus(state, index) {
      state.statuses.splice(index, 1);
    },
    // admin mutations ////////////////////////////////
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
      state.businessSettings.product.addOns.splice(payload, 1);
    },
    adminConfigEditAddOn(state, payload) {
      state.businessSettings.product.addOns[payload.index] = payload.addOn;
    },
    adminConfigAddDiscount(state, payload) {
      state.businessSettings.product.discounts.push(payload);
    },
    adminConfigDeleteDiscount(state, payload) {
      state.businessSettings.product.discounts.splice(payload, 1);
    },
    adminConfigEditDiscount(state, payload) {
      state.businessSettings.product.discounts[payload.index] =
        payload.discount;
    },
    adminConfigAddContract(state, payload) {
      if (!state.businessSettings.contracts) {
        state.businessSettings.contracts = [];
      }
      state.businessSettings.contracts.push(payload);
    },
    adminConfigDeleteContract(state, payload) {
      state.businessSettings.contracts.splice(payload, 1);
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
      if ("identity" in state.businessSettings) {
        state.businessSettings.identity.businessName = payload;
      } else {
        Object.defineProperty(state.businessSettings, "identity", {});
        // state.businessSettings.identity.businessName = payload;
      }
    },
    adminConfigIdentitySetBackgroundColor(state, payload) {
      state.businessSettings.identity.branding.backgroundColor = payload;
    },
    adminConfigIdentitySetForegroundColor(state, payload) {
      state.businessSettings.identity.branding.foregroundColor = payload;
    },
    adminConfigIdentityAddSubdomain(state, payload) {
      state.businessSettings.identity.subdomain.push(payload);
    },
    adminConfigIdentityDeleteSubdomain(state, payload) {
      state.businessSettings.identity.subdomain.splice(payload, 1);
    },
    adminConfigIdentitySetCardOutline(state, payload) {
      state.businessSettings.identity.branding.cardOutline = payload;
    },
    adminConfigIdentitySetHighlighColor(state, payload) {
      state.businessSettings.identity.branding.highlightColor = payload;
    },
    adminConfigIdentitySetTextColor(state, payload) {
      state.businessSettings.identity.branding.textColor = payload;
    },
    adminConfigIdentitySetBusinessAddress1(state, payload) {
      state.businessSettings.identity.businessAddress.streetAddress1 = payload;
    },
    adminConfigIdentitySetBusinessAddress2(state, payload) {
      state.businessSettings.identity.businessAddress.streetAddress2 = payload;
    },
    adminConfigIdentitySetBusinessCityStateZip(state, payload) {
      state.businessSettings.identity.businessAddress.cityStateZip = payload;
    },
    adminConfigIdentitySetBusinessPhoneNumber(state, payload) {
      state.businessSettings.identity.phoneNumber = payload;
    },
    adminConfigIdentitySetBusinessLogo(state, payload) {
      state.businessSettings.identity.businessLogo = payload;
    },
    adminConfigPaymentsSetDepositAmount(state, payload) {
      state.businessSettings.payments.depositAmount = payload;
    },
    adminConfigPaymentsSetFinalPaymentIncrement(state, payload) {
      if (state.businessSettings.payments.finalPayment) {
        state.businessSettings.payments.finalPayment.increment = payload;
      } else {
        state.businessSettings.payments.finalPayment = {
          type: undefined,
          increment: payload,
        };
      }
    },
    adminConfigPaymentsSetFinalPaymentType(state, payload) {
      if (state.businessSettings.payments.finalPayment) {
        state.businessSettings.payments.finalPayment.type = payload;
      } else {
        state.businessSettings.payments.finalPayment = {
          type: payload,
          increment: undefined,
        };
      }
    },
    adminConfigPaymentsSetCreditCardEnabled(state, payload) {
      state.businessSettings.payments.creditCard.enabled = payload;
    },
    adminConfigPaymentsSetCheckEnabled(state, payload) {
      state.businessSettings.payments.check.enabled = payload;
    },
    adminConfigPaymentsSetCheckInstructions(state, payload) {
      state.businessSettings.payments.check.instructions = payload;
    },
    adminConfigPaymentsSetCustomName(state, payload) {
      state.businessSettings.payments.custom.name = payload;
    },
    adminConfigPaymentsSetCustomInstructions(state, payload) {
      state.businessSettings.payments.custom.instructions = payload;
    },
    adminConfigAddAutomation(state, payload) {
      if (!state.businessSettings.automations) {
        state.businessSettings.automations = [];
      }
      state.businessSettings.automations.push(payload);
    },

    approveAutomation(state, id) {
      let matchingIndex = state.automations.pending.findIndex(
        (element) => element.id === id
      );
      let matchingAutomation = state.automations.pending[matchingIndex];
      state.automations.approved.push(matchingAutomation);
      state.automations.pending.splice(matchingIndex, 1);
    },
    deleteAutomation(state, id) {
      let matchingIndex = state.automations.pending.findIndex(
        (element) => element.id === id
      );
      state.automations.pending.splice(matchingIndex, 1);
    },
    deleteApprovedAutomation(state, id) {
      let matchingIndex = state.automations.approved.findIndex(
        (element) => element.id === id
      );

      state.automations.approved.splice(matchingIndex, 1);
    },

    // contact mutations /////////////////////////////

    setContactsToCategory(state, payload) {
      state.contacts[payload.category] = [...payload.items];
    },
    addContact(state, payload) {
      console.log(payload);
      state.contacts[`${payload.role}s`].push(payload);
    },
    editClient(state, { id, key, value }) {
      let subject = state.contacts.clients.find((c) => c.id === id);
      subject[key] = value;
    },
    deleteUser(state, payload) {
      let cat = state.contacts[payload.category];
      let subject = cat.findIndex((e) => e.id === payload.id);
      cat.splice(subject, 1);
    },
    addEmployeeToEvent(state, payload) {
      state.events
        .find((x) => x.id === payload.eventId)
        .associatedContacts.push({ id: payload.employee, role: "employee" });
    },
    ////// check on the employeeAvailability status v
    changeEmployeeAvailability(state, payload) {
      let employee = state.contacts.employees.find(
        (x) => x.id === payload.employeeId
      );
      if (payload.type === "availability") {
        employee.availableDates.push(payload.date);
      }
      if (payload.type === "unavailability") {
        employee.unavailableDates.push(payload.date);
      }
    },
    changeEmployeeAvailabilityRules(state, payload) {
      let employee = state.contacts.employees.find(
        (x) => x.id === payload.employeeId
      );
      employee.availabilityRules = payload.availabilityRules;
    },

    // event mutations ////////////////////////////

    addEvent(state, payload) {
      state.events.push(payload);
    },
    // editEvent(state, payload) {
    //   // let subject = state.events.find((e) => e.id === payload.eventId);
    //   // subject[key] = value;
    //   ;
    // },
    setEvents(state, payload) {
      state.events = [...payload.data.Items];
    },
    completeToDo(state, id) {
      console.log(state, id);
    },
    addToDo(state, payload) {
      state.toDos.unshift(payload);
    },

    //prospect-specific mutations /////////////////////

    changeProspectStatus(state, payload) {
      let subject = state.contacts.prospects.find((c) => c.id == payload.id);
      subject.status = payload.status;
    },

    addProspectLocation(state, payload) {
      let subject = state.contacts.prospects.find((c) => c.id == payload.id);
      subject.eventDetails.eventLocations.push(payload.location);
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
  },
  plugins: [
    createPersistedState({
      paths: ["businessSettings"],
    }),
  ],
});

export default store;
