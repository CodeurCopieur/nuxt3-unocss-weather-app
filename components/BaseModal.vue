<script setup>
  defineEmits(['close-modal'])
  defineProps({
    modalActive: {
      type: Boolean,
      default: false
    }
  });
</script>
<template>
  <teleport to='body'>
    <Transition name="modal-outer">
      <div 
        v-show="modalActive"
        class="flex justify-center absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 px-8">
        <transition  name="modal-inner">
          <div 
          v-if="modalActive"
          class="p-4 bg-white self-start mt-32 max-w-screen-md">
            <slot/>
            <button 
              @click="$emit('close-modal')"
              class="text-white mt-8 bg-weather-primary py-2 px-6" >Close</button>
          </div>
        </transition>
      </div>
    </Transition>
  </teleport>
</template>
<style scoped>
  .modal-outer-enter-active, .modal-outer-leave-active {
    transition: opacity .3s cubic-bezier(0.52, 0.02, 0.19, 1.02)
  }
  .modal-outer-enter-from, .modal-outer-leave-to {
    opacity: 0;
  }

  .modal-inner-enter-active {
    transition: all .3s cubic-bezier(0.52, 0.02, 0.19, 1.02) .15s;
  }

  .modal-inner-leave-active {
    transition: all .3s cubic-bezier(0.52, 0.02, 0.19, 1.02)
  }

  .modal-inner-enter-from{
    opacity: 0;
    transform: scale(.8);
  }

  .modal-inner-leave-to {
    transform: scale(.8);
  }

</style>
