import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import dayjs from 'dayjs';

export default class Helpers {

    // format helpers

    static formatDate(date) {
        return date.toLocaleDateString("lookup", {
          day: "numeric",
          year: "numeric",
          month: "long",
        });
    }
    static formattedDate(date) {
        // TO-DO: CHANGE TO JS DATE OBJECT, AND REMOVE THIS FUNCTION
        return dayjs(date).format("M/D/YYYY");
    }
    
    static formatTime(date) {
        return date.toLocaleString("lookup", {
        hour: "2-digit",
        minute: "2-digit",
        });
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
      return null;
    }

    // invoice math helpers

    static calculatePackagePrice(pckg, event) {
        let packageTotal = 0;
        if (pckg.priceOption === "hourly") {
          if (pckg.baseTime < event.eventLength) {
            let additionalHourly = event.eventLength - pckg.baseTime;
  
            packageTotal =
              packageTotal + (pckg.baseRate + pckg.addHourly * additionalHourly);
          }
          if (pckg.baseTime >= event.eventLength) {
            packageTotal = packageTotal + pckg.baseRate;
          }
        }
        if (pckg.priceOption === "flat") {
          packageTotal = packageTotal + pckg.flatRate;
        }
        return this.formatPrice(packageTotal);
      }

    static calculateAddOnPrice(addOn, event) {
        let addOnTotal = 0;
        if (addOn.priceOption === "hourly") {
          addOnTotal = addOnTotal + addOn.hourlyPrice * event.eventLength;
        }
        if (addOn.priceOption === "unit") {
          addOnTotal = addOnTotal + addOn.unitPrice * addOn.eventUnits;
        }
        if (addOn.priceOption === "flat") {
          addOnTotal = addOnTotal + addOn.flatRate;
        }
        return this.formatPrice(addOnTotal);
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
    
    static formatPrice(n) {
        let price = n / 100;
        return `${"$" + price.toLocaleString()}`;
    }
}

export class Routers {

  static navigateToClientPage(id) {
    this.$router.push("contacts/clients/" + id);
  }

}