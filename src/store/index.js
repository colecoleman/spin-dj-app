import { createStore } from "vuex";
import axios from "axios";
import { Storage, Auth } from "aws-amplify";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      user: undefined,
      tenants: [],
      statuses: [],
      notifications: [],
      toDos: [],
      automations: {},
      contactsArr: [],
      contacts: [],
      equipment: [],
      events: [],
    };
  },
  actions: {
    async getPublicSettings(context, tenantId) {
      let tenant = tenantId ? tenantId : context.state.user.tenantId;
      return await new Promise((resolve, reject) => {
        axios.get(`https://api.spindj.io/public/${tenant}/settings`).then(
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
    async getUser(context, userId) {
      let userSearch = context.commit("searchForUser", userId);
      if (userSearch) {
        return userSearch;
      } else {
        return new Promise((resolve, reject) => {
          axios
            .get(
              `https://api.spindj.io/admin/${context.state.user.tenantId}/users/${userId}/getUser`
            )
            .then(
              (result) => {
                resolve(result.data);
                context.state.contacts.push(result.data);
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
      }
    },
    async getContactListItem(context, key) {
      let userSearch = context.commit("searchForUser", key);
      if (userSearch) {
        return userSearch;
      } else {
        return new Promise((resolve, reject) => {
          axios
            .get(
              `https://api.spindj.io/admin/${key.tenantId}/users/${key.userId}/listItem`
            )
            .then(
              (result) => {
                if (result.data.Item) {
                  resolve(result.data.Item);
                } else {
                  resolve(undefined);
                }
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
      }
    },
    async setUser(context) {
      let user = await Auth.currentAuthenticatedUser();
      let userId = user.username;
      let tenantId = user.attributes["custom:tenantId"]
        ? user.attributes["custom:tenantId"]
        : userId;
      await axios
        .get(`https://api.spindj.io/admin/${tenantId}/users/${userId}`)
        .then((response) => {
          context.commit("setUser", response.data.Item);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getTenants(context) {
      let user = context.state.user;
      if (!user.tenants) {
        user.tenants = [];
      }
      if (
        !user.tenants.find((x) => {
          return x === user.tenantId;
        }) &&
        !user.tenants.find((x) => {
          return x.tenantId === user.tenantId;
        })
      ) {
        user.tenants.push(user.tenantId);
      }
      context.state.user.tenants = await Promise.all(
        user.tenants.map(async (x) => {
          let settings;
          if (typeof x === "string") {
            settings = await context.dispatch("getPublicSettings", x);
          } else {
            settings = await context.dispatch("getPublicSettings", x.tenantId);
          }
          return {
            ...settings,
            businessName: settings.identity.businessName,
            tenantId: typeof x === "string" ? x : x.tenantId,
          };
        })
      );
      await context.dispatch("newTenantChosen", user.tenants[0]);
    },
    async newTenantChosen(context, tenant) {
      context.commit("setBusinessSettings", tenant);
      context.dispatch("getEvents").then(() => {
        context.commit("filterEventsByTenant", tenant.tenantId);
        context.dispatch("getEventsContacts");
        context.dispatch("getEventsLocations");
      });
    },

    // admin actions

    async getAdminEvents(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://api.spindj.io/admin/${context.state.user.tenantId}/events`
          )
          .then(
            (result) => {
              resolve(result);
              context.commit("setEvents", result.data.Items);
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
    async getEventsContacts(context) {
      for (let x = 0; x < context.state.events.length; x++) {
        let event = context.state.events[x];
        context.dispatch("getEventContacts", event);
      }
    },
    async getEventsLocations(context) {
      for (let x = 0; x < context.state.events.length; x++) {
        let event = context.state.events[x];
        context.dispatch("getEventLocations", event);
      }
    },
    async getEventContacts(context, event) {
      let contacts = event.contacts.map((x, index) => {
        let userId = x.key ? x.key.userId : x.id;
        let tenantId = x.key ? x.key.tenantId : event.tenantId;
        let key = { userId, tenantId };
        return context.dispatch("getContactListItem", key).then((res) => {
          if (!res) {
            console.log(index);
            // let contactRemoveParameters = {
            //   eventKey: {
            //     userId: this.event.userId,
            //     tenantId: this.event.tenantId,
            //   },
            //   operation: "removeFromList",
            //   variable: "contacts",
            //   value: index,
            // };
            // context.dispatch("editEvent", contactRemoveParameters);
          } else {
            return res;
          }
        });
      });
      event.contacts = await Promise.all(contacts);
    },
    getEventsTenants(context) {
      for (let x = 0; x < context.state.events.length; x++) {
        let event = context.state.events[x];
        context.dispatch("getEventTenant", event);
      }
    },
    async getEventTenant(context, event) {
      event.tenant = context.user.tenants.find((x) => {
        event.tenantId === x.tenantId;
      });
    },
    async getEventLocations(context, event) {
      let locations = event.locations.map((x) => {
        let userId = x.key ? x.key.userId : x;
        let tenantId = x.key ? x.key.tenantId : event.tenantId;
        let key = {
          userId,
          tenantId,
        };
        return context.dispatch("getLocation", key);
      });
      event.locations = await Promise.all(locations);
    },
    async getContactEvents(context, contact) {
      let events = contact.associatedEvents.map((x) => {
        if (x.key) {
          return x;
        } else {
          return {
            key: {
              userId: x,
              tenantId: contact.tenantId,
            },
          };
        }
      });
      events = events.filter((x) => {
        return x.key.tenantId === context.state.user.tenantId;
      });
      return (contact.associatedEvents = await Promise.all(
        events.map(async (ae, index) => {
          return await context.dispatch("adminGetEvent", ae.key).then((res) => {
            console.log(index);
            if (res) {
              return res;
            } else {
              // let parameters = {
              //   clientId: contact.userId,
              //   operation: "removeFromList",
              //   variable: "associatedEvents",
              //   value: index,
              // };
              // context.dispatch("editContact", parameters).then(() => {
              //   this.events.splice(index, 1);
              // });
              return;
            }
          });
        })
      ));
    },
    async getLocationEvents(context, location) {
      location.associatedEvents = await Promise.all(
        location.associatedEvents.map(async (ae, index) => {
          let userId = ae.key ? ae.key.userId : ae;
          let tenantId = ae.key ? ae.key.tenantId : location.tenantId;
          let key = {
            userId,
            tenantId,
          };
          return await context.dispatch("adminGetEvent", key).then((res) => {
            if (!res) {
              console.log(index);
              // let parameters = {
              //   locationId: location.userId,
              //   operation: "removeFromList",
              //   variable: "associatedEvents",
              //   value: index,
              // };
              // context.dispatch("editLocation", parameters).then(() => {
              //   location.associatedEvents.splice(index, 1);
              // });
            } else {
              return res;
            }
          });
        })
      );
      return location.associatedEvents;
    },
    async removeEventFromContact(context, payload) {
      let contact = await context.dispatch(
        "getUser",
        payload.contactKey.userId
      );
      let eventIndex = contact.associatedEvents.findIndex((x) => {
        let id = x.key ? x.key.userId : x;
        return id === payload.value.key.userId;
      });
      let contactRemoveParameters = {
        contactKey: {
          tenantId: contact.tenantId,
          userId: contact.userId,
        },
        operation: "removeFromList",
        variable: "associatedEvents",
        value: eventIndex,
      };
      await context.dispatch("editContact", contactRemoveParameters);
      return eventIndex;
    },
    async setBusinessSettings(context) {
      await axios
        .get(
          `https://api.spindj.io/admin/${context.state.user.userId}/settings`
        )
        .then((response) => {
          if ("businessSettings" in response.data.Item) {
            context.commit(
              "setBusinessSettings",
              response.data.Item.businessSettings
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/todo`,
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
          `https://api.spindj.io/admin/${context.state.user.tenantId}/todo/${payload.id}`,
          payload
        )
        .then(
          () => {
            context.commit("addStatus", {
              type: "success",
              note: "To-Do Completed",
            });
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/todo/${category}/${id}`
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
      if (Array.isArray(payload.value.product.forms)) {
        payload.value.product.forms = {
          forms: [...payload.value.product.forms],
          fieldTemplates: [],
        };
      }
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://api.spindj.io/admin/${state.user.tenantId}/users/${state.user.userId}`,
            payload
          )
          .then(() => {
            commit("setBusinessSettings", payload.value);
            resolve();
          })
          .catch((e) => {
            reject(e);
            console.log(e);
          });
      });
    },
    async checkSubdomain(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://api.spindj.io/admin/${context.state.user.tenantId}/subdomain/check/${payload}`
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
          `https://api.spindj.io/admin/${context.state.user.tenantId}/subdomain/add/${payload}`
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
          `https://api.spindj.io/admin/${context.state.user.tenantId}/subdomain/delete/${payload}`
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/automations/${payload.id}`,
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
    async adminManualAddAutomation(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://api.spindj.io/admin/${context.state.user.tenantId}/automations`,
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
    async adminDeleteAutomation(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `https://api.spindj.io/admin/${context.state.user.tenantId}/automations/${payload}`
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
    async resetUserPassword(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://api.spindj.io/admin/${context.state.user.tenantId}/users/${payload.userId}/resetPassword`,
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

    // contact-based-actions
    async getAdminUsers(context) {
      let contacts = await axios
        .get(
          `https://api.spindj.io/admin/${context.state.user.tenantId}/users/getUsers`
        )
        .then((res) => {
          console.log(res.data);
          return res.data;
        });
      let locations = await context.dispatch("getLocations");
      context.commit("setContacts", [...contacts, ...locations]);
    },
    async addContact(context, contact) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://api.spindj.io/admin/${context.state.user.tenantId}/users/putUser`,
            contact
          )
          .then(
            (result) => {
              resolve(result.data);
              context.commit("addContact", result.data);
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
            `https://api.spindj.io/admin/${payload.contactKey.tenantId}/users/${payload.contactKey.userId}`,
            payload
          )
          .then(
            (result) => {
              resolve(result);
              context.commit("addStatus", {
                type: "success",
                note: "Contact Successfully Updated",
              });
              context.commit("editContact", payload);
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
          `https://api.spindj.io/admin/${context.state.user.tenantId}/users/${payload.id}`
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/locations`,
            location
          )
          .then(
            (result) => {
              resolve(result);
              context.commit("addContact", result.data);
            },
            (error) => {
              context.commit("addStatus", `Error: ${error}`);
              reject(error);
            }
          );
      });
    },
    async getLocation(context, key) {
      let userSearch = context.commit("searchForUser", key);
      if (userSearch) {
        return userSearch;
      } else {
        return new Promise((resolve, reject) => {
          axios
            .get(
              `https://api.spindj.io/admin/${key.tenantId}/locations/${key.userId}`
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
      }
    },
    async getLocations(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://api.spindj.io/admin/${context.state.user.tenantId}/locations`
          )
          .then(
            (result) => {
              result.data.Items.forEach((element) => {
                if (context.commit("searchForUser", element)) {
                  return;
                } else {
                  context.commit("addContact", element);
                }
              });
              resolve(result.data.Items);
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/locations/${payload.locationId}`,
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/sendEmail`,
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/users/${payload}/automations`
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
        axios.put(`https://api.spindj.io/messaging/createThread`, payload).then(
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
        axios.put(`https://api.spindj.io/messaging/message`, payload).then(
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
            `https://api.spindj.io/messaging/getThread/${thread.replaceAll(
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
            `https://api.spindj.io/messaging/getThreadParticipants/${thread.replaceAll(
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/createEvent`,
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
    async getEvent(context, key) {
      let role = context.state.user.role;
      let eventSearch = context.commit("searchForEvent", key);
      if (eventSearch) {
        return eventSearch;
      } else {
        return new Promise((resolve, reject) => {
          axios
            .get(
              `https://api.spindj.io/${role}/${key.tenantId}/${context.state.user.userId}/events/${key.userId}`
            )
            .then(
              (result) => {
                resolve(result.data.Item);
                context.commit("addEvent", result.data.Item);
                return context.commit("searchForEvent", result.data.Item);
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
      }
    },
    async adminGetEvent(context, key) {
      let eventSearch = context.commit("searchForEvent", key);
      if (eventSearch) {
        return eventSearch;
      } else {
        return new Promise((resolve, reject) => {
          axios
            .get(
              `https://api.spindj.io/admin/${key.tenantId}/events/${key.userId}`
            )
            .then(
              (result) => {
                resolve(result.data.Item);
                context.commit("addEvent", result.data.Item);
                return context.commit("searchForEvent", result.data.Item);
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
      }
    },
    async editEvent(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://api.spindj.io/admin/${payload.eventKey.tenantId}/events/${payload.eventKey.userId}`,
            payload
          )
          .then(
            (result) => {
              console.log(result);
              let mutationPayload = {
                variable: payload.variable,
                eventId: result.data.Attributes.userId,
                data: result.data.Attributes,
              };
              context.commit("editEvent", mutationPayload);
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
    async deleteEvent(context, payload) {
      await axios
        .delete(
          `https://api.spindj.io/admin/${context.state.user.tenantId}/events/${payload}`
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
            `https://api.spindj.io/${context.state.user.role}/${context.state.user.tenantId}/${context.state.user.userId}/events/getEvents`
          )
          .then(
            (result) => {
              resolve(result.data);
              console.log(result);
              context.commit("setEvents", result.data);
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/events/${payload}/automations`
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/stripe/createAccount/${payload}`
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/stripe/checkAccount/${stripeId}`
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/stripe/pay/${payload.eventId}`,
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
            `https://api.spindj.io/admin/${context.state.user.tenantId}/subscribe`,
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
            `https://api.spindj.io/stripe/portal/${context.state.user.stripeId}`
          )
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    // utlity actions
    async addPhoto(context, payload) {
      let name = context.state.user.userId + Date.now();
      return await Storage.put(name, payload)
        .then((res) => {
          return (
            "https://spindjappstorage140016-prod.s3.amazonaws.com/public/" +
            res.key
          );
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getPhoto(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://api.spindj.io/admin/${context.state.user.tenantId}/getFile/${payload}`
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
    searchForUser(state, user) {
      return state.contacts.find((x) => {
        let id = user.key ? user.key.userId : user.userId ? user.userId : user;
        return x.userId == id;
      });
    },
    searchForEvent(state, event) {
      return state.events.find((x) => {
        return x == event;
      });
    },
    setBusinessSettings(state, settings) {
      state.businessSettings = settings;
    },
    filterEventsByTenant(state, tenantId) {
      if (tenantId !== "ALL") {
        state.events = state.events.filter((x) => {
          return x.tenantId === tenantId;
        });
      }
    },
    setNewBusinessSettingsByTenant(state, tenant) {
      state.businessSettings = tenant;
      document.title = state.businessSettings.identity.businessName;
    },
    setBusinessLogo(state, settings) {
      state.businessLogo = settings;
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
      state.businessSettings.product.forms.forms.push(payload);
    },
    adminConfigDeleteForm(state, payload) {
      state.businessSettings.product.forms.forms.splice(payload, 1);
    },
    adminConfigEditForm(state, payload) {
      state.businessSettings.product.forms.forms[payload.index] = payload.form;
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
    adminConfigIdentitySetHighlightColor(state, payload) {
      state.businessSettings.identity.branding.highlightColor = payload;
    },
    adminConfigIdentitySetTextColor(state, payload) {
      state.businessSettings.identity.branding.textColor = payload;
    },
    adminConfigIdentitySetSecondaryTextColor(state, payload) {
      state.businessSettings.identity.branding.secondaryTextColor = payload;
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
      state.businessSettings.identity.businessPhoneNumber = payload;
    },
    adminConfigIdentitySetBusinessLogo(state, payload) {
      state.businessSettings.identity.businessLogo = payload;
    },
    adminConfigPaymentsSetBusinessCurrencyCode(state, payload) {
      state.businessSettings.payments.currencyCode = payload;
    },
    adminConfigPaymentsSetDepositAmount(state, payload) {
      if (!state.businessSettings.payments.deposit) {
        Object.defineProperty(state.businessSettings.payments, "deposit", {
          enumerable: true,
          writable: true,
          value: { amount: payload },
        });
      } else {
        state.businessSettings.payments.deposit.amount = payload;
      }
    },
    adminConfigPaymentsSetDepositTerminology(state, payload) {
      if (!state.businessSettings.payments.deposit) {
        Object.defineProperty(state.businessSettings.payments, "deposit", {
          enumerable: true,
          writable: true,
          value: { terminology: payload },
        });
      } else {
        state.businessSettings.payments.deposit.terminology = payload;
      }
    },
    adminConfigPaymentsSetDepositType(state, payload) {
      if (!state.businessSettings.payments.deposit) {
        Object.defineProperty(state.businessSettings.payments, "type", {
          enumerable: true,
          writable: true,
          value: { type: payload },
        });
      } else {
        state.businessSettings.payments.deposit.type = payload;
      }
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
    adminConfigEditAutomation(state, payload) {
      state.businessSettings.automations[payload.index] = payload.automation;
    },
    adminConfigDeleteAutomation(state, payload) {
      state.businessSettings.automations.splice(payload, 1);
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
    setContacts(state, payload) {
      state.contacts = [...payload];
    },
    addContact(state, payload) {
      state.contacts.push(payload);
    },
    editContact(state, payload) {
      let subject = state.contacts.find((x) => {
        return x.userId == payload.contactKey.userId;
      });
      if (subject) {
        subject[payload.variable] = payload.value;
      }
    },
    deleteUser(state, payload) {
      let index = state.contacts.findIndex((e) => e.id === payload.id);
      state.contacts.splice(index, 1);
    },

    // event mutations ////////////////////////////

    addEvent(state, payload) {
      state.events.push(payload);
    },
    editEvent(state, payload) {
      let index = state.events.findIndex((e) => e.userId === payload.eventId);
      if (index > -1) {
        let event = state.events[index];
        event[payload.variable] = payload.data[payload.variable];
      }
      console.log(state.events[index]);
    },
    setEvents(state, payload) {
      state.events = [...payload];
    },
    sortEvents(state, logic) {
      if (!logic) {
        state.events.sort((a, b) => {
          return new Date(a.data.startTime).getTime() <
            new Date(b.data.startTime).getTime()
            ? -1
            : new Date(a.data.startTime).getTime() >
              new Date(b.data.startTime).getTime()
            ? 1
            : 0;
        });
      } else {
        state.events.sort(logic);
      }
    },
    addToDo(state, payload) {
      state.toDos.unshift(payload);
    },

    //prospect-specific mutations /////////////////////
  },
  getters: {
    currencyCode(state) {
      if (state.businessSettings.payments.currencyCode) {
        return state.businessSettings.payments.currencyCode;
      } else {
        return "USD";
      }
    },
    clients(state) {
      return state.contacts.filter((x) => x.role == "client");
    },
    employees(state) {
      return state.contacts.filter((x) => x.role == "employee");
    },
    organizers(state) {
      return state.contacts.filter((x) => x.role == "organizer");
    },
    vendors(state) {
      return state.contacts.filter((x) => x.role == "vendor");
    },
    locations(state) {
      return state.contacts.filter((x) => x.role == "location");
    },
    uncategorized(state) {
      return state.contacts.filter((x) => {
        return (
          x.role !== "client" &&
          x.role !== "employee" &&
          x.role !== "location" &&
          x.role !== "organizer" &&
          x.role !== "vendor"
        );
      });
    },
  },
  plugins: [
    createPersistedState({
      paths: ["businessSettings"],
    }),
  ],
});

export default store;
