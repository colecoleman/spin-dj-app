import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default class Helpers {

    // format helpers

    static formatDate(date) {
      if (typeof date === 'object') {
        return date.toLocaleDateString("lookup", {
          day: "numeric",
          year: "numeric",
          month: "long",
        });
      } else if (date.includes('T')) {
        return new Date(date).toLocaleDateString("lookup", {
          day: "numeric",
          year: "numeric",
          month: "long",
        });
      } 
  }
 
    
    static formatTime(date) {
      if (typeof date === 'object') {
        return date.toLocaleString("lookup", {
          hour: "2-digit",
          minute: "2-digit",
          });
      } else if (date.includes('T')) {
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
            return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
            ""
            );
        }
      return num;
    }

    // invoice math helpers
    static calculateEventTime(data) {
      if (typeof data.startTime === 'object' && typeof data.endTime === 'object') {
        return Math.abs(data.startTime - data.endTime);
      } else if (data.startTime.includes('T') && data.startTime.includes('T')) {
        return Math.abs(Date.parse(data.startTime) - Date.parse(data.endTime))
      }
  }
    static productTotal(product, data) {
      if (product.type === "Package" || product.type === "Service") {
        let hours = Helpers.calculateEventTime(data) / (60 * 60 * 1000);
        let overage = hours - product.pricing.baseTime;
        return product.pricing.baseRate + product.pricing.addHourly * overage;
      }
      if (product.type === "Add-On") {
        console.log(Helpers.calculateEventTime(data) / (60 * 60 * 1000));
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
    
    // system helpers

    static printElement(elementName) {
        html2canvas(
          document.getElementById(elementName),
          {}
        ).then(function (canvas) {
          var imgData = canvas.toDataURL("image/png");
          var imgWidth = 210;
          var pageHeight = 260;
          var imgHeight = (canvas.height * imgWidth) / canvas.width;
          var heightLeft = imgHeight;
  
          var doc = new jsPDF("p", "mm", "a4", true);
          var position = 0;
  
          doc.addImage(
            imgData,
            "JPEG",
            5,
            position,
            imgWidth,
            imgHeight,
            undefined,
            "FAST"
          );
          heightLeft -= pageHeight;
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(
              imgData,
              "JPEG",
              5,
              position,
              imgWidth,
              imgHeight,
              undefined,
              "FAST"
            );
            heightLeft -= pageHeight;
          }
          doc.autoPrint();
          doc.output("dataurlnewwindow");
        });
      }

      static saveElement(elementName) {
        html2canvas(
            document.getElementById(elementName),
            {}
          ).then(function (canvas) {
            var imgData = canvas.toDataURL("image/png");
            var imgWidth = 210;
            var pageHeight = 260;
            var imgHeight = (canvas.height * imgWidth) / canvas.width;
            var heightLeft = imgHeight;
            var doc = new jsPDF("p", "mm", "a4", true);
            var position = 0;
            doc.addImage(
              imgData,
              "JPEG",
              5,
              position,
              imgWidth,
              imgHeight,
              undefined,
              "FAST"
            );
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              doc.addPage();
              doc.addImage(
                imgData,
                "JPEG",
                5,
                position,
                imgWidth,
                imgHeight,
                undefined,
                "FAST"
              );
              heightLeft -= pageHeight;
            }
            doc.save("file.pdf");
          });
      }
    // utility functions to help other helpers
    
    
}

export class Routers {

  static navigateToClientPage(id) {
    Helpers.$router.push("contacts/clients/" + id);
  }

}