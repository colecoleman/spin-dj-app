import store from "./store/index.js";
export function formatDate(date) {
  if (!date) {
    return "UNKNOWN";
  }
  if (typeof date === "object") {
    return date.toLocaleDateString("lookup", {
      day: "numeric",
      year: "numeric",
      month: "long",
    });
  } else if (typeof date === "number") {
    return new Date(date).toLocaleString("lookup", {
      day: "numeric",
      year: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (date.includes("T")) {
    return new Date(date).toLocaleDateString("lookup", {
      day: "numeric",
      year: "numeric",
      month: "long",
    });
  } else {
    return new Date(date).toLocaleDateString("lookup", {
      day: "numeric",
      year: "numeric",
      month: "long",
    });
  }
}
export function formatTime(date) {
  if (!date) {
    return "00:00";
  }
  if (typeof date === "object") {
    return date.toLocaleString("lookup", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (date.includes("T")) {
    return new Date(date).toLocaleString("lookup", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
export function formatPhoneNumber(num) {
  var cleaned = ("" + num).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return num;
}
export function calculateEventTime(data) {
  if (typeof data.startTime === "object" && typeof data.endTime === "object") {
    return Math.abs(data.startTime - data.endTime);
  } else if (data.startTime.includes("T") && data.startTime.includes("T")) {
    return Math.abs(Date.parse(data.startTime) - Date.parse(data.endTime));
  }
}
export function productTotal(product, data) {
  if (product.type === "Package" || product.type === "Service") {
    let hours = Helpers.calculateEventTime(data) / (60 * 60 * 1000);
    let overage = hours - product.pricing.baseTime;
    if (product.priceOption === "Flat") {
      return product.pricing.baseRate;
    } else {
      return product.pricing.baseRate + product.pricing.addHourly * overage;
    }
  }
  if (product.type === "Add-On") {
    return product.pricing.units * product.pricing.unitRate;
  }
}
export function subtotal(invoice, data) {
  let subtotal = 0;
  for (let x = 0; x < invoice.products.length; x++) {
    subtotal += Helpers.productTotal(invoice.products[x], data);
  }
  return subtotal;
}
export function total(invoice, data) {
  let subtotal = Helpers.subtotal(invoice, data);
  for (let x = 0; x < invoice.adjustments.length; x++) {
    if (invoice.adjustments[x].type === "percentage") {
      subtotal -= subtotal * invoice.adjustments[x].amount;
    }
    if (invoice.adjustments[x].type === "dollar") {
      subtotal = subtotal - invoice.adjustments[x].amount;
    }
  }
  return subtotal;
}
export function balanceOutstanding(invoice, data) {
  let total = Helpers.total(invoice, data);
  if (invoice.payments.length > 0) {
    invoice.payments.forEach((element) => {
      if (element.amount) {
        total -= element.amount;
      }
    });
  }
  return total;
}
export function formatPrice(n) {
  let price = n / 100;
  return price.toLocaleString("lookup", {
    localeMatcher: "lookup",
    style: "currency",
    currency: store.getters.currencyCode,
  });
}
export function finalPaymentDueDate(data, finalPaymentSettings) {
  let date = new Date(data.date);
  if (finalPaymentSettings.type === "weeks") {
    return new Date(date.setDate(date.getDate() - finalPaymentSettings.increment * 7));
  } else if (finalPaymentSettings.type === "months") {
    return new Date(date.setMonth(date.getMonth() - finalPaymentSettings.increment));
  } else if (finalPaymentSettings.type === "days") {
    return new Date(
      date.setDate(date.setDate(date.getDate() - finalPaymentSettings.increment))
    );
  } else {
    return data.date;
  }
}

export default class Helpers {
  // format helpers

  static formatDate(date) {
    if (!date) {
      return "UNKNOWN";
    }
    if (typeof date === "object") {
      return date.toLocaleDateString("lookup", {
        day: "numeric",
        year: "numeric",
        month: "long",
      });
    } else if (typeof date === "number") {
      return new Date(date).toLocaleString("lookup", {
        day: "numeric",
        year: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (date.includes("T")) {
      return new Date(date).toLocaleDateString("lookup", {
        day: "numeric",
        year: "numeric",
        month: "long",
      });
    } else {
      return new Date(date).toLocaleDateString("lookup", {
        day: "numeric",
        year: "numeric",
        month: "long",
      });
    }
  }

  static formatTime(date) {
    if (!date) {
      return "00:00";
    }
    if (typeof date === "object") {
      return date.toLocaleString("lookup", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (date.includes("T")) {
      return new Date(date).toLocaleString("lookup", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  static formatPhoneNumber(num) {
    var cleaned = ("" + num).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return num;
  }

  // invoice math helpers
  static calculateEventTime(data) {
    if (
      typeof data.startTime === "object" &&
      typeof data.endTime === "object"
    ) {
      return Math.abs(data.startTime - data.endTime);
    } else if (data.startTime.includes("T") && data.startTime.includes("T")) {
      return Math.abs(Date.parse(data.startTime) - Date.parse(data.endTime));
    }
  }
  static productTotal(product, data) {
    if (product.type === "Package" || product.type === "Service") {
      let hours = Helpers.calculateEventTime(data) / (60 * 60 * 1000);
      let overage = hours - product.pricing.baseTime;
      if (product.priceOption === "Flat") {
        return product.pricing.baseRate;
      } else {
        return product.pricing.baseRate + product.pricing.addHourly * overage;
      }
    }
    if (product.type === "Add-On") {
      return product.pricing.units * product.pricing.unitRate;
    }
  }

  static subtotal(invoice, data) {
    let subtotal = 0;
    for (let x = 0; x < invoice.products.length; x++) {
      subtotal += Helpers.productTotal(invoice.products[x], data);
    }
    return subtotal;
  }
  static total(invoice, data) {
    let subtotal = Helpers.subtotal(invoice, data);
    for (let x = 0; x < invoice.adjustments.length; x++) {
      if (invoice.adjustments[x].type === "percentage") {
        subtotal -= subtotal * invoice.adjustments[x].amount;
      }
      if (invoice.adjustments[x].type === "dollar") {
        subtotal = subtotal - invoice.adjustments[x].amount;
      }
    }
    return subtotal;
  }
  static balanceOutstanding(invoice, data) {
    let total = Helpers.total(invoice, data);
    if (invoice.payments.length > 0) {
      invoice.payments.forEach((element) => {
        if (element.amount) {
          total -= element.amount;
        }
      });
    }
    return total;
  }
  static formatPrice(n) {
    let price = n / 100;
    return `${"$" + price.toLocaleString()}`;
  }

  static finalPaymentDueDate(data, finalPaymentSettings) {
    let date = new Date(data.date);
    if (finalPaymentSettings.type === "weeks") {
      return new Date(date.setDate(date.getDate() - finalPaymentSettings.increment * 7));
    } else if (finalPaymentSettings.type === "months") {
      return new Date(date.setMonth(date.getMonth() - finalPaymentSettings.increment));
    } else if (finalPaymentSettings.type === "days") {
      return new Date(
        date.setDate(date.setDate(date.getDate() - finalPaymentSettings.increment))
      );
    } else {
      return data.date;
    }
  }

  // utility functions to help other helpers
}

export class Routers {
  static navigateToClientPage(id) {
    Helpers.$router.push("contacts/clients/" + id);
  }
}
