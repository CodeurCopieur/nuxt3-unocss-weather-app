<script setup>
  import {uid} from 'uid'
  const route = useRoute();
  const router = useRouter();

  const savedCities = ref([])

  const modalActive = ref(null);
  const toggleModal = () => {
    modalActive.value = !modalActive.value
  };

  const addCity = () => {
    if(localStorage.getItem('savedCities')) {
      savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
    }
    
    const locationObj = {
      id: uid(),
      state: route.params.state,
      name: route.params.name,
      coords: {
        lat: route.query.lat,
        lng: route.query.lng
      }
    }

    savedCities.value.push(locationObj)
    localStorage.setItem('savedCities',JSON.stringify(savedCities.value))

    let query = Object.assign({}, route.query)
    delete query.preview;
    query.id = locationObj.id
    router.replace({query})
  };
</script>
<template>
 <header class="sticky top-0 bg-weather-tertiary shadow-lg">
    <nav class="container max-w-screen-lg max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-white px-4 py-6">

    <NuxtLink to="/">
      <div class="flex items-center gap-3">
        <Icon 
          name="material-symbols:partly-cloudy-day-rounded" 
          class="text-2xl" />
        <p class="text-2xl">la météo locale</p>
      </div>
    </NuxtLink>

    <div class="flex gap-3 flex-1 justify-end">
      <Icon 
        name="material-symbols:info" 
        class="text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        @click="toggleModal" />
      <Icon 
        v-if="route.query.preview"
        @click="addCity"
        name="material-symbols:add" 
        class="text-xl hover:text-weather-secondary duration-150 cursor-pointer" />
    </div>

    <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
      <div class="text-black">
        <h1 class="text-2xl mb-1">À propos :</h1>
        <p class="mb-4">
          La météo locale vous permet de suivre le courant et
          météo future des villes de votre choix.
        </p>
        <h2 class="text-2xl">Comment ça marche :</h2>
        <ol class="list-decimal list-inside mb-4">
          <li>
            Recherchez votre ville en saisissant le nom dans
            barre de recherche.
          </li>
          <li>
            Sélectionnez une ville dans les résultats, cela prendra
            vous à la météo actuelle pour votre sélection.
          </li>
          <li>
            Suivez la ville en cliquant sur l'icône "+" dans le
            en haut à droite. Cela permettra d'économiser la ville pour voir à un
            plus tard sur la page d'accueil.
          </li>
        </ol>

        <h2 class="text-2xl">Supprimer une ville</h2>
        <p>
          Si vous ne souhaitez plus suivre une ville, sélectionnez simplement
          la ville dans la page d'accueil. Au fond de la
          page, il y aura une option pour supprimer la ville.
        </p>
      </div>
    </BaseModal>

    </nav>
 </header>
</template>