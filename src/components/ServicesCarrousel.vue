<template>
  <div class="services-carrousel">
    <div class="services-carrousel__header">
      <button type="button" class="services-carrousel__header-control-button services-carrousel__header-control-button_previous" @click="handleCurrentIdxService(currentIdxService-1)">
        <Icon icon="bx:left-arrow" width="40" class="services-carrousel__header-control-button-icon"/>
      </button>
      <ul class="services-carrousel__header-services-list">
        <li class="services-carrousel__header-service-item" v-for="({name, icon}, idxService) in services" :class="(idxService === currentIdxService) ? 'services-carrousel__header-service-item_current' : ''">
          <button type="button" class="services-carrousel__header-service-item-card" @click="handleCurrentIdxService(idxService)">
            <Icon class="services-carrousel__header-service-item-card-icon" :icon="icon" width="65" />
            <span class="services-carrousel__header-service-item-card-name">{{ name }}</span>
          </button>
          <div class="progress-bar-container">
            <button type="button" class="progress-bar-container__control-button" @click="toggleProgressBarAnimation(idxService)" aria-label="Pausar/Continuar">
              <Icon :icon="isPlaying[idxService] ? 'bx:pause' : 'bx:play'" width="40" class="progress-bar-container__control-button-icon" title="Pausar/Continuar"/>
            </button>
            <div class="progress-bar" ref="progressBarRefs">
              <div class="progress-bar__current-progress" :class="{ 'progress-bar__current-progress_paused': !isPlaying[idxService] }"></div>
            </div>
          </div>
        </li>
      </ul>
      <button type="button" class="services-carrousel__header-control-button services-carrousel__header-control-button_next" @click="handleCurrentIdxService(currentIdxService+1)">
        <Icon icon="bx:right-arrow" width="40" class="services-carrousel__header-control-button-icon"/>
      </button>
    </div>
    <ol class="services-carrousel__content-service-list">
      <li class="services-carrousel__content-service-item" v-for="(itemContent, idxServiceContent) in services[currentIdxService].content">
        <span class="services-carrousel__content-service-item-number">{{ idxServiceContent+1 }}</span>
        <p class="services-carrousel__content-service-item-text" v-html="itemContent"></p>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';

const props = defineProps({
  services: Array
})

const progressBarRefs = ref([])
const isPlaying = ref(props.services.map(() => true))

onMounted(() => {
  progressBarRefs.value.forEach((progressBar, index) => {
    progressBar.addEventListener('animationend', (animationEvent) => {
      if (isPlaying.value[index]) {
        handleCurrentIdxService(currentIdxService.value+1)
      }
    })
  })
})

const currentIdxService = ref(0)
const handleCurrentIdxService = (nextIdxService) => {
  if(nextIdxService === currentIdxService) return
  if( nextIdxService >= 0 && nextIdxService < props.services.length ) {
    isPlaying.value = props.services.map(() => true)
    return currentIdxService.value = nextIdxService
  }
  
  currentIdxService.value = (nextIdxService >= props.services.length) 
                            ? 0
                            : props.services.length-1
}

const toggleProgressBarAnimation = (index) => {
  isPlaying.value[index] = !isPlaying.value[index]
}
</script>

<style scoped>
.services-carrousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.services-carrousel__header {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

.services-carrousel__header-control-button {}
.services-carrousel__header-control-button_previous {}
.services-carrousel__header-control-button_next {}

.services-carrousel__header-control-button-icon {
  color: var(--title-color);
}

.services-carrousel__header-services-list {}

.services-carrousel__header-service-item {
  display: none;
  transition: color .3s ease, background-color .3s ease;
}
.services-carrousel__header-service-item_current {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; 
}

.services-carrousel__header-service-item-card {
  transition: background-color .3s ease, color .3s ease;
}
.services-carrousel__header-service-item_current .services-carrousel__header-service-item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  padding: 1.2rem;
  background-color: var(--paragraph-color);
  border-radius: 10px 40px;
}
.services-carrousel__header-control-button,
.services-carrousel__header-service-item-card {
  -webkit-tap-highlight-color: transparent;
}

.services-carrousel__header-service-item-card-icon {
  color: var(--secondary-bg-color);
}

.services-carrousel__header-service-item-card-name {
  font: normal normal 400 clamp(var(--body-md-fs), 3.5vw, var(--subtitle-fs)) var(--display-font, Tahoma);
  color: var(--primary-bg-color);
}

.progress-bar-container {
  display: flex;
  align-items: center;
  /* gap: 1rem; */
  min-width: fit-content;
}

.progress-bar {
  background-color: var(--secondary-bg-color);
  min-width: 60px;
  position: relative;
  display: flex;
  align-items: center;
}

.progress-bar-container__control-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

.progress-bar-container__control-button-icon {
  color: var(--title-color);
}

.progress-bar__current-progress {
  min-height: 3px;
  width: 0%;
  background-color: var(--title-color);
  animation: growProgressBar 16s linear .3s 1 normal;
}

.progress-bar__current-progress_paused {
  animation-play-state: paused;
}

@keyframes growProgressBar {
  0% {width: 0%;}
  100% {width: 100%;}
}

.services-carrousel__content-service-list {
  width: 90dvw;
  background: var(--paragraph-color);
  background: linear-gradient(0deg, var(--title-color) 0%, var(--subtitle-color)70%);
  border-radius: 10px 50px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.services-carrousel__content-service-item {
  color: var(--primary-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
}

.services-carrousel__content-service-item-number {
  font: normal normal 400 clamp(var(--body-lg-fs), 8vw, var(--heading-sm-fs)) var(--display-font, Tahoma);
  color: var(--secondary-bg-color);
}

.services-carrousel__content-service-item-text {
  text-align: center;
  font: normal normal 400 clamp(var(--caption-fs), 5vw, var(--body-md-fs)) var(--default-font, Arial);
}

.services-carrousel__content-service-item-text:deep(strong) { 
  font-weight: 800;
  color: var(--primary-bg-color) 
}

@media (width >= 425px) {
  .services-carrousel{
    width: 100%;
  }

  .services-carrousel__header-control-button { display: none; }

  .services-carrousel__header-services-list {
    width: clamp(425px, 100%, 768px);
    display: flex;
    justify-content: space-evenly;
  }

  .services-carrousel__header-service-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem; 
  }

  .services-carrousel__header-service-item-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    border-radius: 10px 40px;
  }
  .services-carrousel__header-service-item_current .services-carrousel__header-service-item-card,
  .services-carrousel__header-service-item-card {
    padding: 1rem;
  }

  .services-carrousel__header-service-item_current .services-carrousel__header-service-item-card-name {
    color: var(--primary-bg-color);
  }
  .services-carrousel__header-service-item-card-name {
    color: var(--phrase-color);
  }

  .services-carrousel__header-service-item .progress-bar-container {
    display: none;
  }

  .services-carrousel__header-service-item_current .progress-bar-container {
    display: flex;
  }

  .services-carrousel__content-service-list {
    padding: 2rem;
    align-items: start;
  }
  .services-carrousel__content-service-item {
    flex-direction: row;
    gap: 1.5rem;
  }
  .services-carrousel__content-service-item-text {
    text-align: start;
  }
}

@media (width >= 650px) {
  .services-carrousel__content-service-list {
    border-radius: 0;
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 1.5rem 2rem;
  }

  .services-carrousel__content-service-item {
    width: 35%;
    max-width: 300px;
    flex-direction: column;
    gap: 1rem;
  }

  .services-carrousel__content-service-item-text {
    text-align: center;
  }
}

@media (width >= 1024px) {
  .services-carrousel__header-service-item-card{
    transition: background-color .3s ease, color .3s ease;
  }
  .services-carrousel__header-service-item-card:hover {
    background-color: var(--paragraph-color);
  }

  .services-carrousel__header-service-item-card:hover .services-carrousel__header-service-item-card-name {
    color: var(--primary-bg-color);
  }
}

</style>