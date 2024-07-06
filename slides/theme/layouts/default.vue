<template>
  <div class="slidev-layout cover relative">
    <div
      class="absolute -z-50 w-full h-full translate-x-[40%] translate-y-[69%]"
    >
      <img
        src="./../assets/big-circle.svg"
        alt=""
        class="h-[150%] float-right rotate-[30deg]"
      />
    </div>
    <div class="flex flex-col justify-end font font-serif">
      <slot />
    </div>
  </div>
</template>
