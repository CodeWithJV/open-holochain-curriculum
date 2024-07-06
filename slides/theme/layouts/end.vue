<template>
  <div class="slidev-layout cover relative">
    <div class="absolute -z-50 w-full h-full translate-x-[36%]">
      <img
        src="/assets/big-circle.svg"
        alt=""
        class="h-[100%] animate-spin-slow float-right"
      />
    </div>
    <div
      class="w-[60%] text-center mx-auto flex items-center flex-col justify-center font font-serif"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 500s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
