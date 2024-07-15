<template>
  <div class="slidev-layout cover relative">
    <div class="absolute -z-50">
      <img
        src="./../assets/title.png"
        alt=""
        class="translate-x-[-5%] -scale-y-101"
      />
    </div>
    <div class="flex items-center justify-end font font-serif">
      <div class="flex w-[62%] flex-col">
        <img src="./../assets/logo.svg" alt="" />
        <h6
          style="
            font-size: large;
            font-weight: 500;
            margin-top: -0.5em;
            text-transform: uppercase;
          "
        >
          <slot />
        </h6>
      </div>
    </div>
  </div>
</template>
