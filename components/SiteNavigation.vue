<template>
 <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container mx-auto flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <NuxtLink to="/">
        <div class="flex items-center gap-3">
          <Icon 
            name="solar:sun-2-bold" 
            class="text-2xl" />
          <p class="text-2xl">la météo locale</p>
        </div>
      </NuxtLink>
      <div class="flex gap-3 flex-1 justify-end">
        <Icon 
          name="material-symbols:info" 
          class="text-xl hover:text-weather-secondary duration-150 cursor-pointer" />
        <Icon 
          name="material-symbols:add-box" 
          class="text-xl hover:text-weather-secondary duration-150 cursor-pointer" />
      </div>
    </nav>
 </header>
</template>