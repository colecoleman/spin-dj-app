import { createStore } from "vuex";
import axios from "axios";
import { Storage, Auth } from "aws-amplify";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      user: undefined,
      event: undefined,
      tenants: [],
      statuses: [],
      conversations: [],
      notifications: [],
      toDos: [],
      automations: {},
      contactsArr: [],
      contacts: [],
      equipment: [],
      events: [],
      library: {
        tracks: [],
        playlists: [],
        meta: {},
      },
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
            userId: typeof x === "string" ? x : x.userId,
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
      let contacts = event.contacts.map((x) => {
        let userId = x.key ? x.key.userId : x.id;
        let tenantId = x.key ? x.key.tenantId : event.tenantId;
        let key = { userId, tenantId };
        return context.dispatch("getContactListItem", key).then((res) => {
          if (!res) {
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
              return;
            }
          });
        })
      ));
    },
    async getLocationContacts(context, location) {
      location.contacts = await Promise.all(
        location.contacts.map(async (contact) => {
          let { userId, tenantId } = contact;
          let key = { userId, tenantId };
          return await context.dispatch("getContactListItem", key);
        })
      );
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
      if (eventIndex > -1) {
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
      }
    },
    async updateBusinessIdentity(context) {
      let payload = {
        action: "updateIdentity",
        payload: context.state.businessSettings.identity,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          console.log(response);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async updatePaymentSettings(context) {
      let payload = {
        action: "updatePaymentSettings",
        payload: context.state.businessSettings.payments,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async deletePackage(context, item) {
      let payload = {
        action: "deletePackage",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          context.commit("adminConfigDeletePackage", response.data);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async addPackage(context, item) {
      let payload = {
        action: "addPackage",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then(() => {
          context.commit("adminConfigAddPackage", item);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async editPackage(context, item) {
      let payload = {
        action: "editPackage",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then(() => {
          context.commit("adminConfigEditPackage", item);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async deleteService(context, item) {
      let payload = {
        action: "deleteService",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          context.commit("adminConfigDeleteService", response.data);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async addService(context, item) {
      let payload = {
        action: "addService",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then(() => {
          context.commit("adminConfigAddService", item);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async editService(context, item) {
      let payload = {
        action: "editService",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          let mutationPayload = { index: response.data, item: item };
          context.commit("adminConfigEditService", mutationPayload);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async deleteAddOn(context, item) {
      let payload = {
        action: "deleteAddOn",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          context.commit("adminConfigDeleteAddOn", response.data);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async addAddOn(context, item) {
      let payload = {
        action: "addAddOn",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then(() => {
          context.commit("adminConfigAddAddOn", item);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async editAddOn(context, item) {
      let payload = {
        action: "editAddOn",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          let mutationPayload = { index: response.data, item: item };
          context.commit("adminConfigEditAddOn", mutationPayload);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async deleteAdjustment(context, item) {
      let payload = {
        action: "deleteAdjustment",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          context.commit("adminConfigDeleteAdjustment", response.data);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async addAdjustment(context, item) {
      let payload = {
        action: "addAdjustment",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then(() => {
          context.commit("adminConfigAddAdjustment", item);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async editAdjustment(context, item) {
      let payload = {
        action: "editAdjustment",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          let mutationPayload = { index: response.data, item: item };
          context.commit("adminConfigEditAdjustment", mutationPayload);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async deleteForm(context, item) {
      let payload = {
        action: "deleteForm",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          context.commit("adminConfigDeleteForm", response.data);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async addForm(context, item) {
      let payload = {
        action: "addForm",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then(() => {
          context.commit("adminConfigAddForm", item);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async editForm(context, item) {
      let payload = {
        action: "editForm",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          let mutationPayload = { index: response.data, item: item };
          context.commit("adminConfigEditForm", mutationPayload);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async deleteContract(context, item) {
      let payload = {
        action: "deleteContract",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          context.commit("adminConfigDeleteContract", response.data);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async addContract(context, item) {
      let payload = {
        action: "addContract",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then(() => {
          context.commit("adminConfigAddContract", item);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async editContract(context, item) {
      let payload = {
        action: "editContract",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          let mutationPayload = { index: response.data, item: item };
          context.commit("adminConfigEditContract", mutationPayload);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async deleteAutomation(context, item) {
      let payload = {
        action: "deleteAutomation",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          context.commit("adminConfigDeleteAutomation", response.data);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async addAutomation(context, item) {
      let payload = {
        action: "addAutomation",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };

      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then(() => {
          context.commit("adminConfigAddAutomation", item);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
    },
    async editAutomation(context, item) {
      let payload = {
        action: "editAutomation",
        payload: item,
        tenantId: context.state.user.userId,
        // using userId to avoid accidental tampering by non-admin
      };
      await axios
        .put(`https://api.spindj.io/updateBusinessSettings`, payload)
        .then((response) => {
          let mutationPayload = { index: response.data, item: item };
          context.commit("adminConfigEditAutomation", mutationPayload);
        })
        .catch((e) =>
          context.commit("addStatus", {
            type: "error",
            note: e,
          })
        );
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
              console.log(result);
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
          return res.data.filter((x) => {
            return x.userId !== x.tenantId;
          });
        });
      let uncategorizedRoleMap = contacts.map((x) => {
        if (!x.role) {
          return context.dispatch("editContact", {
            contactKey: {
              userId: x.userId,
              tenantId: x.tenantId,
            },
            value: "client",
            variable: "role",
          });
        } else {
          return;
        }
      });
      await Promise.all(uncategorizedRoleMap);

      context.commit("setContacts", [...contacts]);
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
        .post(`https://api.spindj.io/admin/deleteUser`, payload)
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
      // let { body, id } = payload;
      console.log(payload);

      return new Promise((resolve, reject) => {
        axios
          .put(
            "https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/chat/sendMessage",
            payload
          )
          .then(
            (result) => {
              resolve(result);
              context.commit("sendMessage", payload);
              console.log(result);
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
    async createNewConversation(context, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .put(
            "https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/chat/createConversation",
            payload
          )
          .then((res) => {
            console.log(res);
            resolve(res);
            context.commit("createNewConversation", payload);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getConversations(context, keys) {
      let conversations = [];
      if (!keys && context.state.user.conversations) {
        conversations = [...context.state.user.conversations];
      } else if (keys) {
        conversations = [...keys];
      }
      if (conversations.length > 0) {
        return new Promise((resolve, reject) => {
          axios
            .post(
              `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/chat/getConversations`,
              conversations
            )
            .then(
              (result) => {
                if (result.data && !keys) {
                  context.state.conversations = [...result.data];
                } else {
                  context.state.conversations = [];
                }
                resolve(result.data);
              },
              (error) => {
                reject(error);
              }
            );
        });
      } else {
        return [];
      }
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
      let dbEvent = { ...event, tenantId: context.state.user.tenantId };
      return new Promise((resolve, reject) => {
        axios
          .put(
            `https://api.spindj.io/admin/${context.state.user.tenantId}/createEvent`,
            dbEvent
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
      let editPayload = await axios
        .put(
          `https://api.spindj.io/admin/${payload.eventKey.tenantId}/events/${payload.eventKey.userId}`,
          payload
        )
        .then(
          (result) => {
            console.log(result);
            return {
              variable: payload.variable,
              eventId: result.data.Attributes.userId,
              data: result.data.Attributes,
            };
          },
          (error) => {
            context.commit("addStatus", {
              type: "error",
              note: error,
            });
          }
        );
      context.commit("editEvent", editPayload);
      if (editPayload.variable === "contacts") {
        await context.dispatch("getEventContacts", context.state.event);
      }
      if (payload.variable === "locations") {
        await context.dispatch("getEventLocations", context.state.event);
      }
      console.log(context.state.event);
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
            // `https://api.spindj.io/admin/${context.state.user.tenantId}/stripe/pay/${payload.eventId}`,
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
            window.location.href = res.data.url;
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    async stripeCreatePortal(context) {
      return new Promise((resolve, reject) => {
        if (context.state.user.stripeId) {
          axios
            .put(
              `https://api.spindj.io/stripe/portal/${context.state.user.stripeId}`
            )
            .then((res) => {
              window.location.href = res.data.url;
            })
            .catch((e) => {
              reject(e);
            });
        } else {
          context.dispatch("stripeCreateSubscription");
        }
      });
    },
    async stripeCheckSubscription(context) {
      let stripeCustomerId = context.state.user.stripeId
        ? context.state.user.stripeId
        : undefined;
      if (stripeCustomerId) {
        return await axios
          .put("https://api.spindj.io/stripeCheckSubscription", {
            id: stripeCustomerId,
          })
          .then((res) => {
            return res.data;
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        return "non_existent";
      }
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
    async uploadLibrary(context, payload) {
      let library = payload;
      console.log(library);
      return await Storage.put(
        `${context.state.user.tenantId}/library`,
        payload
      )
        .then((res) => {
          console.log(res);
          context.commit("addStatus", {
            type: "success",
            note: "Library Uploaded!",
          });
          context.dispatch("retrieveLibrary");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async retrieveLibrary(context) {
      if (context.state.library.tracks.length === 0) {
        return new Promise((resolve, reject) => {
          Storage.get(`${context.state.user.tenantId}/library`, {
            download: true,
          })
            .then(async (res) => {
              let body = await res.Body.text();
              let bodyObject = JSON.parse(body);
              context.commit("setTracks", bodyObject.tracks);
              context.commit("setLibrary", bodyObject);
            })
            .catch((e) => {
              reject({
                message: "No Library Found",
                error: e,
              });
            });
        });
      }
    },
    searchTracks(context, payload) {
      return new Promise((resolve) => {
        let tracks = [...context.state.library.tracks];
        let array = [];
        let searchTerm = payload.toLowerCase().replace(/[^a-z0-9]/gi, "");
        if (payload.length > 0) {
          let name;
          let artist;
          array = tracks.filter((x) => {
            if (x["Name"]) {
              name = x["Name"].toLowerCase().replace(/[^a-z0-9]/gi, "");
            }
            if (x["Artist"]) {
              artist = x["Artist"].toLowerCase().replace(/[^a-z0-9]/gi, "");
            }
            if (name.includes(searchTerm) || artist.includes(searchTerm)) {
              return true;
            } else if (
              searchTerm.includes(name) ||
              searchTerm.includes(artist)
            ) {
              return true;
            }
          });
        }
        let exactMatch = array.find((x) => {
          let name;
          let artist;
          if (x["Name"]) {
            name = x["Name"].toLowerCase().replace(/[^a-z0-9]/gi, "");
          }
          if (x["Artist"]) {
            artist = x["Artist"].toLowerCase().replace(/[^a-z0-9]/gi, "");
          }
          if (searchTerm.includes(name) && searchTerm.includes(artist)) {
            return true;
          } else {
            return false;
          }
        });

        if (exactMatch) {
          resolve([exactMatch]);
        } else {
          resolve(array);
        }
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
      state.statuses.unshift(status);
      setTimeout(() => {
        state.statuses.splice(0, 1);
      }, 3000);
    },
    clearStatus(state, index) {
      state.statuses.splice(index, 1);
    },
    // admin mutations ////////////////////////////////
    updateBusinessIdentity(state, payload) {
      state.businessSettings.identity = payload;
    },
    adminConfigAddService(state, payload) {
      state.businessSettings.product.services.push(payload);
    },
    adminConfigEditService(state, payload) {
      let { index, item } = payload;
      state.businessSettings.product.services[index] = item;
    },
    adminConfigDeleteService(state, payload) {
      state.businessSettings.product.services.splice(payload, 1);
    },
    adminConfigAddPackage(state, payload) {
      state.businessSettings.product.packages.push(payload);
    },
    adminConfigEditPackage(state, payload) {
      let index = state.businessSettings.product.packages.findIndex((x) => {
        return x.id === payload.id;
      });
      state.businessSettings.product.packages[index] = payload;
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
      let { index, item } = payload;
      state.businessSettings.product.addOns[index] = item;
    },
    adminConfigAddAdjustment(state, payload) {
      if (!state.businessSettings.product.discounts) {
        state.businessSettings.product.discounts = [];
      }
      state.businessSettings.product.discounts.push(payload);
    },
    adminConfigDeleteAdjustment(state, payload) {
      state.businessSettings.product.discounts.splice(payload, 1);
    },
    adminConfigEditAdjustment(state, payload) {
      let { index, item } = payload;
      state.businessSettings.product.discounts[index] = item;
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
      let { index, item } = payload;
      state.businessSettings.contracts[index] = item;
    },
    adminConfigAddForm(state, payload) {
      state.businessSettings.product.forms.forms.push(payload);
    },
    adminConfigDeleteForm(state, payload) {
      state.businessSettings.product.forms.forms.splice(payload, 1);
    },
    adminConfigEditForm(state, payload) {
      let { index, item } = payload;
      state.businessSettings.product.forms.forms[index] = item;
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
      let { index, item } = payload;
      state.businessSettings.automations[index] = item;
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
      let index = state.contacts.findIndex(
        (e) => e.userId === payload.userKey.userId
      );
      if (index > -1) {
        state.contacts.splice(index, 1);
      }
    },

    // event mutations ////////////////////////////

    addEvent(state, payload) {
      state.events.push(payload);
    },
    editEvent(state, payload) {
      state.event[payload.variable] = payload.data[payload.variable];
    },
    addPaymentToEvent(state, payload) {
      state.event.invoice.payments.push(payload);
    },
    setEvent(state, payload) {
      state.event = payload;
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
    setTracks(state, payload) {
      state.library.tracks = [...payload];
    },
    setLibrary(state, payload) {
      state.library.playlists.push(...payload.playlists);
      state.library.meta = { ...state.library.meta, ...payload.meta };
    },

    // message specific mutations

    sendMessage(state, payload) {
      let { body, conversationKey } = payload;
      let { id } = conversationKey;
      let activeConversation = state.conversations.find((x) => {
        return x.id === id;
      });
      activeConversation.messages[body.id] = body;
      console.log(activeConversation.messages);
    },
    createNewConversation(state, payload) {
      state.conversations.push(payload);
    },
  },
  getters: {
    events(state) {
      return state.events;
    },
    user(state) {
      return state.user;
    },
    userRole(state) {
      if (state.user.tenantId === state.user.userId) {
        return "admin";
      } else {
        return state.user.role;
      }
    },
    // business settings getters
    // // business settings identity getters
    identity(state) {
      if (state.businessSettings && state.user) {
        return state.businessSettings.identity;
      } else {
        return undefined;
      }
    },
    branding(state) {
      let defaultBranding = {
        backgroundColor: "#F0F0F0",
        foregroundColor: "#FFFFFF",
        cardOutline: "#DDDDDD",
        highlightColor: "#00F5FF",
        textColor: "#000000",
      };
      if (state.businessSettings && state.user) {
        if (state.businessSettings.identity) {
          return state.businessSettings.identity.branding;
        } else {
          return defaultBranding;
        }
      } else {
        return defaultBranding;
      }
    },
    businessLogo(state) {
      let defaultLogo = "../assets/spin-logo-with-text.svg";
      if (state.businessSettings) {
        if (state.businessSettings.identity) {
          return state.businessSettings.identity.businessLogo;
        } else {
          return defaultLogo;
        }
      } else {
        return defaultLogo;
      }
    },
    businessEmailAddresses(state) {
      return state.businessSettings.identity.emailAddresses;
    },
    businessAddress(state) {
      return state.businessSettings.identity.businessAddress;
    },
    businessName(state) {
      return state.businessSettings.identity.businessName;
    },
    businessPhoneNumber(state) {
      return state.businessSettings.identity.phoneNumber;
    },
    automations(state) {
      if (state.businessSettings.automations) {
        return state.businessSettings.automations;
      } else {
        return [];
      }
    },
    // // business settings product getters
    addOns(state) {
      if (state.businessSettings.product.addOns) {
        return state.businessSettings.product.addOns;
      } else {
        return [];
      }
    },
    contracts(state) {
      if (state.businessSettings) {
        return state.businessSettings.contracts;
      } else {
        return [];
      }
    },
    discounts(state) {
      if (state.businessSettings.product.discounts) {
        return state.businessSettings.product.discounts;
      } else {
        return [];
      }
    },
    forms(state) {
      console.log(state.businessSettings);
      if (state.businessSettings.product.forms.forms) {
        return state.businessSettings.product.forms.forms;
      } else {
        return state.businessSettings.product.forms;
      }
    },
    formTemplates(state) {
      if (state.businessSettings.product.forms.fieldTemplates) {
        return state.businessSettings.product.forms.fieldTemplates;
      } else {
        return [];
      }
    },
    packages(state) {
      console.log(state.businessSettings);
      if (state.businessSettings.product.packages) {
        return state.businessSettings.product.packages;
      } else {
        return [];
      }
    },
    services(state) {
      console.log(state.businessSettings);
      if (state.businessSettings.product.services) {
        return state.businessSettings.product.services;
      } else {
        return [];
      }
    },
    // // business settings payments getters
    paymentSettings(state) {
      return state.businessSettings.payments;
    },
    currencyCode(state) {
      if (state.businessSettings.payments.currencyCode) {
        return state.businessSettings.payments.currencyCode;
      } else {
        return "USD";
      }
    },
    depositType(state) {
      if (state.businessSettings.payments.deposit) {
        if (state.businessSettings.payments.deposit.type) {
          return state.businessSettings.payments.deposit.type;
        } else {
          return "dollar";
        }
      } else {
        return "dollar";
      }
    },
    depositAmount(state) {
      if (state.businessSettings.payments.deposit) {
        return state.businessSettings.payments.deposit.amount;
      } else if (state.businessSettings.payments.depositAmount) {
        return state.businessSettings.payments.depositAmount;
      } else {
        return "100";
      }
    },
    depositTerminology(state) {
      if (state.businessSettings.payments.deposit) {
        if (state.businessSettings.payments.deposit.terminology) {
          return state.businessSettings.payments.deposit.terminology;
        } else {
          return "deposit";
        }
      } else {
        return "deposit";
      }
    },
    finalPaymentSettings(state) {
      if (state.businessSettings.payments.finalPayment) {
        return state.businessSettings.payments.finalPayment;
      } else {
        return {
          increment: 2,
          type: "weeks",
        };
      }
    },
    finalPaymentIncrement(state) {
      if (state.businessSettings.payments.finalPayment) {
        return state.businessSettings.payments.finalPayment.increment;
      } else {
        return 2;
      }
    },
    finalPaymentType(state) {
      if (state.businessSettings.payments.finalPayment) {
        return state.businessSettings.payments.finalPayment.type;
      } else {
        return "weeks";
      }
    },
    creditCardEnabled(state) {
      if (state.businessSettings.payments.creditCard.enabled) {
        return state.businessSettings.payments.creditCard.enabled;
      } else {
        return false;
      }
    },
    checkEnabled(state) {
      if (state.businessSettings.payments.check.enabled) {
        return state.businessSettings.payments.check.enabled;
      } else {
        return false;
      }
    },
    checkInstructions(state) {
      if (state.businessSettings.payments.check.instructions) {
        return state.businessSettings.payments.check.instructions;
      } else {
        return "";
      }
    },
    customPaymentName(state) {
      if (state.businessSettings.payments.custom.name) {
        return state.businessSettings.payments.custom.name;
      } else {
        return "";
      }
    },
    customPaymentInstructions(state) {
      if (state.businessSettings.payments.custom.instructions) {
        return state.businessSettings.payments.custom.instructions;
      } else {
        return "";
      }
    },

    // contact getters

    clients: (state) => (sortFunction) => {
      let clients = state.contacts.filter((x) => x.role === "client");
      if (sortFunction) {
        clients = clients.sort(sortFunction);
      }
      return clients;
    },
    employees: (state) => (sortFunction) => {
      let employees = state.contacts.filter((x) => x.role === "employee");
      if (sortFunction) {
        employees = employees.sort(sortFunction);
      }
      return employees;
    },
    organizers: (state) => (sortFunction) => {
      let organizers = state.contacts.filter((x) => x.role === "organizer");
      if (sortFunction) {
        organizers = organizers.sort(sortFunction);
      }
      return organizers;
    },
    vendors: (state) => (sortFunction) => {
      let vendors = state.contacts.filter((x) => x.role === "vendor");
      if (sortFunction) {
        vendors = vendors.sort(sortFunction);
      }
      return vendors;
    },
    locations: (state) => (sortFunction) => {
      let locations = state.contacts.filter((x) => x.role === "location");
      if (sortFunction) {
        locations = locations.sort(sortFunction);
      }
      return locations;
    },
    uncategorized(state) {
      return state.contacts.filter(
        (x) =>
          x.role !== "client" &&
          x.role !== "employee" &&
          x.role !== "location" &&
          x.role !== "organizer" &&
          x.role !== "vendor"
      );
    },
    libraryTracks: (state) => (start, end) => {
      return state.library.tracks.slice(start, end);
    },
    libraryPlaylists(state) {
      return state.library.playlists;
    },
    libraryMeta(state) {
      return state.library.meta;
    },

    // messaging getters

    getConversation: (state) => (id) => {
      return state.conversations.find((x) => {
        return x.id === id;
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
