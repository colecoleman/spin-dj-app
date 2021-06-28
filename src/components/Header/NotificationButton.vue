<template>
  <div
    id="notification-button"
    @mousedown.prevent=""
    :class="isClicked ? `` : `pointer`"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20.632"
      height="20"
      viewBox="0 0 28.632 28"
    >
      <path
        id="Icon_material-notifications-active"
        data-name="Icon material-notifications-active"
        d="M9.745,4.456,7.692,2.4A14.969,14.969,0,0,0,1.776,13.675H4.648a12.127,12.127,0,0,1,5.1-9.218Zm17.791,9.218h2.872A15.061,15.061,0,0,0,24.492,2.4L22.453,4.456A12.2,12.2,0,0,1,27.536,13.675Zm-2.829.718c0-4.408-2.355-8.1-6.462-9.075V4.341a2.154,2.154,0,1,0-4.308,0v.976c-4.121.976-6.462,4.652-6.462,9.075v7.179L4.6,24.444V25.88H27.579V24.444l-2.872-2.872ZM16.092,30.188a2.515,2.515,0,0,0,.574-.057,2.913,2.913,0,0,0,2.068-1.694,2.883,2.883,0,0,0,.215-1.12H13.206a2.893,2.893,0,0,0,2.886,2.872Z"
        transform="translate(-1.776 -2.188)"
        fill="#00ffe2"
      />
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style>
#notification-button {
  min-width: 60px;
  width: 60px;
  min-height: 60px;
  height: 60px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  background-color: black;
  border-radius: 30px;
}
</style>

