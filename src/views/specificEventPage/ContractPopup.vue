<template>
  <full-page-popup>
    <template v-slot:icon
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="16.75"
        height="22"
        viewBox="0 0 16.75 22"
      >
        <path
          id="Icon_awesome-file-contract"
          data-name="Icon awesome-file-contract"
          d="M9.188,5.578V0H.984A.982.982,0,0,0,0,.984V20.016A.982.982,0,0,0,.984,21H14.766a.982.982,0,0,0,.984-.984V6.563H10.172A.987.987,0,0,1,9.188,5.578ZM2.625,2.953a.328.328,0,0,1,.328-.328H6.234a.328.328,0,0,1,.328.328v.656a.328.328,0,0,1-.328.328H2.953a.328.328,0,0,1-.328-.328Zm0,2.625a.328.328,0,0,1,.328-.328H6.234a.328.328,0,0,1,.328.328v.656a.328.328,0,0,1-.328.328H2.953a.328.328,0,0,1-.328-.328ZM10.533,15.75h1.936a.656.656,0,0,1,0,1.313H10.533a1.763,1.763,0,0,1-1.585-.979.454.454,0,0,0-.417-.267.447.447,0,0,0-.411.254l-.315.629a.656.656,0,0,1-.587.363l-.047,0a.654.654,0,0,1-.575-.447l-.69-2.07-.435,1.308a1.771,1.771,0,0,1-1.682,1.211H3.281a.656.656,0,0,1,0-1.312h.508a.46.46,0,0,0,.436-.314l.746-2.241a.985.985,0,0,1,1.868,0L7.409,14.9a1.841,1.841,0,0,1,2.707.581A.468.468,0,0,0,10.533,15.75Zm4.93-11.443L11.447.287A.984.984,0,0,0,10.75,0H10.5V5.25h5.25V5A.981.981,0,0,0,15.463,4.307Z"
          transform="translate(0.5 0.5)"
          fill="#fff"
        />
      </svg>
    </template>
    <template v-slot:title>Contract</template>
    <template v-slot:action1>
      <svg
        width="17.995"
        height="17.995"
        viewBox="0 0 17.995 17.995"
        @click="closePopup()"
      >
        <path
          d="M19.33,15.581h0l-5.459-5.459L19.33,4.663h0a.564.564,0,0,0,0-.8L16.751,1.289a.564.564,0,0,0-.8,0h0L10.5,6.748,5.038,1.289h0a.564.564,0,0,0-.8,0L1.664,3.868a.564.564,0,0,0,0,.8h0l5.459,5.459L1.664,15.581h0a.564.564,0,0,0,0,.8l2.579,2.579a.564.564,0,0,0,.8,0h0L10.5,13.5l5.459,5.459h0a.564.564,0,0,0,.8,0l2.579-2.579a.564.564,0,0,0,0-.8Z"
          transform="translate(-1.5 -1.125)"
          fill="#fff"
        />
      </svg>
    </template>
    <template v-slot:content>
      <div id="contract-popup-content-wrapper">
        <div id="contract-popup-left-menu">
          <h3>Document View</h3>
          <button-standard-with-icon text="Print" @click="printContract()">
            <template v-slot:icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.25"
                height="19.25"
                viewBox="0 0 19.25 19.25"
              >
                <g
                  id="Icon_feather-printer"
                  data-name="Icon feather-printer"
                  transform="translate(-0.875 -0.875)"
                >
                  <path
                    id="Path_129"
                    data-name="Path 129"
                    d="M5.25,7.875V1.75h10.5V7.875"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                  <path
                    id="Path_130"
                    data-name="Path 130"
                    d="M5.25,15.75H3.5A1.75,1.75,0,0,1,1.75,14V9.625A1.75,1.75,0,0,1,3.5,7.875h14a1.75,1.75,0,0,1,1.75,1.75V14a1.75,1.75,0,0,1-1.75,1.75H15.75"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                  <path
                    id="Path_131"
                    data-name="Path 131"
                    d="M5.25,12.25h10.5v7H5.25Z"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                </g>
              </svg>
            </template>
          </button-standard-with-icon>
          <button-standard-with-icon text="Save" @click="saveContract()">
            <template v-slot:icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.25"
                height="19.25"
                viewBox="0 0 19.25 19.25"
              >
                <g
                  id="Icon_feather-printer"
                  data-name="Icon feather-printer"
                  transform="translate(-0.875 -0.875)"
                >
                  <path
                    id="Path_129"
                    data-name="Path 129"
                    d="M5.25,7.875V1.75h10.5V7.875"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                  <path
                    id="Path_130"
                    data-name="Path 130"
                    d="M5.25,15.75H3.5A1.75,1.75,0,0,1,1.75,14V9.625A1.75,1.75,0,0,1,3.5,7.875h14a1.75,1.75,0,0,1,1.75,1.75V14a1.75,1.75,0,0,1-1.75,1.75H15.75"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                  <path
                    id="Path_131"
                    data-name="Path 131"
                    d="M5.25,12.25h10.5v7H5.25Z"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                </g>
              </svg>
            </template>
          </button-standard-with-icon>
        </div>
        <div id="contract-document-view-wrapper">
          <contract-popup-document-view></contract-popup-document-view>
        </div>
        <div id="contract-popup-right-column">
          <div class="contract-item">
            <p>Signed By:</p>
            <h5>Firstname LastName</h5>
          </div>
          <div class="contract-item">
            <p>Signed On:</p>
            <h5>12/31/2021</h5>
          </div>
          <div class="contract-item">
            <p>IP Address:</p>
            <h5>123.12.123.12</h5>
          </div>
        </div>
      </div>
    </template>
  </full-page-popup>
</template>


<script>
import FullPagePopup from "../../components/UI/FullPagePopup.vue";
import ContractPopupDocumentView from "./ContractPopupDocumentView.vue";
import ButtonStandardWithIcon from "../../components/UI/ButtonStandardWithIcon.vue";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
    saveContract() {
      html2canvas(
        document.getElementById("contract-popup-document-view"),
        {}
      ).then(function (canvas) {
        console.log("starting downloading");
        var imgData = canvas.toDataURL("image/png");
        console.log("done downloading");
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
        console.log("main page done");
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
        console.log("downloading");
        doc.save("file.pdf");
      });
    },
    printContract() {
      html2canvas(
        document.getElementById("contract-popup-document-view"),
        {}
      ).then(function (canvas) {
        console.log("starting downloading");
        var imgData = canvas.toDataURL("image/png");
        console.log("done downloading");
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
        console.log("main page done");
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
        console.log("downloading");
        doc.autoPrint();
        doc.output("dataurlnewwindow");
      });
    },
  },
  components: {
    FullPagePopup,
    ContractPopupDocumentView,
    ButtonStandardWithIcon,
  },
};
</script>

<style scoped>
#contract-popup-content-wrapper {
  display: flex;
  flex-direction: row;
  min-height: 100%;
  height: 100%;
}

#contract-popup-left-menu,
#contract-popup-right-column {
  width: 20%;
  padding: 15px;
}

#contract-document-view-wrapper {
  overflow: scroll;
  height: 100%;
}

.contract-item {
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.contract-item > h5 {
  width: 50%;
  font-weight: 600;
  text-align: left;
}

.contract-item > p {
  width: 50%;
  text-align: left;
  margin-left: 20px;
}

.summary-item > h4 {
  width: 50%;
  text-align: left;
}
</style>