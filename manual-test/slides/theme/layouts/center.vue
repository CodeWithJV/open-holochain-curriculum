<template>
  <div class="slidev-layout cover relative">
    <div
      class="absolute -z-50 w-full h-full -translate-x-[50%] -translate-y-[12.5%]"
    >
      <img
        src="./../assets/big-circle.svg"
        alt=""
        class="h-[125%] rotate-[90deg]"
      />
    </div>
    <div
      class="w-[60%] mx-auto flex items-center flex-col justify-center text-center font font-serif"
    >
      <slot />
    </div>
  </div>
</template>
