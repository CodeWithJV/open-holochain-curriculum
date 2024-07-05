<template>
  <div class="slidev-layout cover relative">
    <div
      class="absolute -z-50 w-full h-full scale-x-50 -scale-y-60 -translate-x-1/4 -translate-y-[calc(25%-0.2rem)]"
    >
      <img src="/assets/title.png" alt="" class="h-[100%]" />
    </div>
    <div
      class="absolute -z-50 w-full h-full scale-50 -translate-x-1/4 translate-y-1/4"
    >
      <img src="/assets/title.png" alt="" class="h-[100%]" />
    </div>
    <div
      class="absolute -z-50 w-full h-full -scale-x-50 -scale-y-60 translate-x-1/4 -translate-y-[calc(25%-0.2rem)]"
    >
      <img src="/assets/title.png" alt="" class="h-[100%]" />
    </div>
    <div
      class="absolute -z-50 w-full h-full -scale-x-50 scale-y-50 translate-x-1/4 translate-y-1/4"
    >
      <img src="/assets/title.png" alt="" class="h-[100%]" />
    </div>
    <div
      class="flex items-center flex-col justify-center w-[65%] mx-auto font font-serif text-center"
    >
      <slot />
    </div>
  </div>
</template>
