<template>
  <div class="slidev-layout cover relative">
    <div class="absolute -z-50">
      <img
        src="/assets/title.png"
        alt=""
        class="translate-x-[-5%] -scale-y-101"
      />
    </div>
    <div class="flex items-center justify-end font font-serif">
      <div class="flex w-[62%] flex-col">
        <img src="/assets/logo.svg" alt="" />
        <h6 style="font-size: medium; padding-top: 1rem; font-weight: 600">
          Developer Guide
        </h6>
        <slot />
      </div>
    </div>
  </div>
</template>
