  <template>
  <div class="square-button-icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.5"
      height="19.25"
      viewBox="0 0 17.5 19.25"
    >
      <g
        id="Icon_feather-trash-2"
        data-name="Icon feather-trash-2"
        transform="translate(0.875 0.875)"
      >
        <path
          id="Path_115"
          data-name="Path 115"
          d="M2.625,5.25h15.75"
          transform="translate(-2.625 -1.75)"
          fill="none"
          stroke="red"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.75"
        />
        <path
          id="Path_116"
          data-name="Path 116"
          d="M16.625,5.25V17.5a1.75,1.75,0,0,1-1.75,1.75H6.125a1.75,1.75,0,0,1-1.75-1.75V5.25M7,5.25V3.5A1.75,1.75,0,0,1,8.75,1.75h3.5A1.75,1.75,0,0,1,14,3.5V5.25"
          transform="translate(-2.625 -1.75)"
          fill="none"
          stroke="red"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.75"
        />
        <path
          id="Path_117"
          data-name="Path 117"
          d="M8.75,9.625v5.25"
          transform="translate(-2.625 -1.75)"
          fill="none"
          stroke="red"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.75"
        />
        <path
          id="Path_118"
          data-name="Path 118"
          d="M12.25,9.625v5.25"
          transform="translate(-2.625 -1.75)"
          fill="none"
          stroke="red"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.75"
        />
      </g>
    </svg>
  </div>
</template>


<script>
export default {
  props: ["text", "icon"],
};
</script>

<style scoped>
.square-button-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-transform: uppercase;
  margin: 10px;
  padding: 10px;
  border: 1px solid white;
  border-radius: 7px;
}

.square-button-icon:hover {
  background-color: gray;
}

.square-button-icon:active {
  background: white;
  color: black;
}
.square-button-icon:active > svg {
  fill: black;
}
</style>