<template>
  <div class="services-carrousel">
    <div class="services-carrousel__header">
      <button type="button" class="services-carrousel__header-control-button services-carrousel__header-control-button_previous" @click="handleCurrentIdxService(currentIdxService-1)">
        <Icon icon="bx:left-arrow" width="40" class="services-carrousel__header-control-button-icon"/>
      </button>
      <ul class="services-carrousel__header-services-list">
        <li class="services-carrousel__header-service-item" v-for="({name, icon}, idxService) in services" :class="(idxService === currentIdxService) ? 'services-carrousel__header-service-item_current' : ''">
          <button type="button" class="services-carrousel__header-service-item-card" @click="handleCurrentIdxService(idxService)">
            <Icon class="services-carrousel__header-service-item-card-icon" :icon="icon" width="80" />
            <span class="services-carrousel__header-service-item-card-name">{{ name }}</span>
          </button>
          <div class="progress-bar">
            <div class="progress-bar__current-progress"></div>
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
import { ref } from 'vue';

const props = defineProps({
  services: Array
})

const currentIdxService = ref(0)

const handleCurrentIdxService = (nextIdxService) => {
  if( nextIdxService >= 0 && nextIdxService < props.services.length ) return currentIdxService.value = nextIdxService; 
  
  currentIdxService.value = (nextIdxService >= props.services.length) 
                            ? 0
                            : props.services.length-1
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
.services-carrousel__header-control-button {
}
.services-carrousel__header-control-button_previous {
}
.services-carrousel__header-control-button-icon {
  color: var(--color-titles);
}
.services-carrousel__header-services-list {
}
.services-carrousel__header-service-item {
  display: none;
}
.services-carrousel__header-service-item_current {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; 
}
.services-carrousel__header-service-item_current .services-carrousel__header-service-item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  padding: 1.2rem;
  background: var(--color-font);
  background: linear-gradient(45deg, var(--color-titles) 0%, var(--color-font) 100%);
  border-radius: 10px 40px;
}
.services-carrousel__header-service-item-card-icon {
  color: var(--color-details);
}
.services-carrousel__header-service-item-card-name {
  font: normal normal 400 clamp(1.1rem, 5vh, 1.3rem) var(--display-font, Tahoma);
  color: var(--color-bg);
}
.progress-bar {
  background-color: var(--color-details);
  min-width: 100%;
}
.progress-bar__current-progress {
  min-height: 3px;
  width: 60%;
  background-color: var(--color-titles);
}
.services-carrousel__header-control-button_next {
}
.services-carrousel__content-service-list {
  width: 90%;
  max-width: 700px;
  background: var(--color-font);
  background: linear-gradient(45deg, var(--color-titles) 0%, var(--color-font) 100%);
  border-radius: 10px 50px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.services-carrousel__content-service-item {
  color: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
}
.services-carrousel__content-service-item-number {
  font: normal normal 400 clamp(1.3rem, 5vh, 1.6rem) var(--display-font, Tahoma);
}
.services-carrousel__content-service-item-text {
  text-align: center;
  font: normal normal 400 clamp(1rem, 5vh, 1.2rem) var(--default-font, Arial);
}

.services-carrousel__content-service-item-text:deep(strong) { 
  font-weight:800;
  color: var(--color-bg) 
}

@media (width >= 425px) {
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
  .services-carrousel__header-control-button {
    display: none;

  }
  .services-carrousel__header-control-button_previous {
  }
  .services-carrousel__header-control-button-icon {
    color: var(--color-titles);
  }
  .services-carrousel__header-services-list {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
  .services-carrousel__header-service-item {
    /* display: none; */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem; 
  }
  .services-carrousel__header-service-item_current {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem; 
  }

  .services-carrousel__header-service-item_current, .services-carrousel__header-service-item-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
  }

  .services-carrousel__header-service-item-card {
    padding: 1.2rem 0;
  }

  .services-carrousel__header-service-item-card-icon {
    color: var(--color-details);
  }

  .services-carrousel__header-service-item-card-name {
    font: normal normal 400 clamp(1.1rem, 2.8vh, 2rem) var(--display-font, Tahoma);
    color: var(--color-details);
  }

  .services-carrousel__header-service-item_current .services-carrousel__header-service-item-card-name {
    color: var(--color-bg);
  }

  .progress-bar {
    display: none;
  }

  .services-carrousel__header-service-item_current .progress-bar {
    display: block;
    background-color: var(--color-details);
    min-width: 100%;
  }

  .services-carrousel__content-service-list {
    width: 90%;
    border-radius: 10px 50px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 2rem;
  }
  .services-carrousel__content-service-item {
    color: var(--color-bg);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
  }
  .services-carrousel__content-service-item-number {
    font: normal normal 400 2rem var(--display-font, Tahoma);
  }
  .services-carrousel__content-service-item-text {
    text-align: start;
    font: normal normal 400 clamp(1rem, 3vh, 1.3rem) var(--default-font, Arial);
  }

}
</style>