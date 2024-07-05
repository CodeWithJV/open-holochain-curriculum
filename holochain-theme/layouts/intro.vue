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
        <slot />
      </div>
    </div>
  </div>
</template>
