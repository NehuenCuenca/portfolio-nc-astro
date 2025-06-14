<template>
    <nav ref="navbarRootElement" class="nav">
        <div class="nav__mobile-bar">
            <button v-if="currentTheme" type="button" @click="toggleMenu(true)" class="nav__mobile-bar-button nav__mobile-bar-button_open-menu">
                <Icon icon="bx:menu" width="40" class="nav__mobile-bar-button-icon"/>
            </button>

            <Transition>
                <div class="nav__mobile-menu" v-if="isMenuOpen" :class="isMenuOpen ? 'nav__mobile-menu_open' : ''" >
                    <div class="nav__mobile-menu-content">                  
                        <button v-if="currentTheme" type="button" @click="toggleMenu(false)" class="nav__mobile-bar-button nav__mobile-bar-button_close-menu">
                            <Icon icon="bx:x" width="50" class="nav__mobile-bar-button-icon"/>
                        </button>

                        <ul class="nav__mobile-menu-section-links-list">
                            <li class="nav__mobile-menu-section-link-item">
                                <a @click="toggleMenu(false)" class="nav__mobile-menu-link" href="#hero-section">Inicio</a>
                            </li>
                            <li class="nav__mobile-menu-section-link-item">
                                <a @click="toggleMenu(false)" class="nav__mobile-menu-link" href="#formation-section">Formación</a>
                            </li>
                            <li class="nav__mobile-menu-section-link-item">
                                <a @click="toggleMenu(false)" class="nav__mobile-menu-link" href="#technologies-section">Tecnologias</a>
                            </li>
                            <li class="nav__mobile-menu-section-link-item">
                                <a @click="toggleMenu(false)" class="nav__mobile-menu-link" href="#projects-section">Proyectos</a>
                            </li>
                            <li class="nav__mobile-menu-section-link-item">
                                <a @click="toggleMenu(false)" class="nav__mobile-menu-link" href="#services-section">Servicios</a>
                            </li>
                            <li class="nav__mobile-menu-section-link-item">
                                <a @click="toggleMenu(false)" class="nav__mobile-menu-link" href="#contact-section">Contacto</a>
                            </li>
                        </ul>

                        <div class="nav__mobile-menu-togglers">
                            <!-- <button v-if="currentLanguage" type="button" class="nav__mobile-bar-button nav__mobile-bar-button_i18n-toggler" @click="toggleI18n" title="Cambiar idioma">
                                <Icon v-if="currentLanguage === 'es'" width="50" icon="material-symbols:language-us" class="nav__mobile-button-icon nav__mobile-button-icon_i18n-US"/>
                                <Icon v-else width="50" icon="material-symbols:language-es" class="nav__mobile-button-icon nav__mobile-button-icon_i18n-ES"/>
                            </button> -->
                            <button v-if="currentTheme" type="button" class="nav__mobile-bar-button nav__mobile-bar-button_theme-toggler mobile-nav-button" @click="toggleTheme" title="Cambiar tema">
                                <Icon v-if="currentTheme === 'light'" width="40" icon="bx:moon" class="nav__mobile-bar-button-icon"/>
                                <Icon v-else width="40" icon="bx:sun" class="nav__mobile-bar-button-icon"/>
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>


        <div class="nav__desktop-bar">
            <ul class="nav__desktop-bar-section-links-list">
                <li class="nav__desktop-bar-section-link-item">
                    <a class="nav__desktop-bar-link" href="#formation-section">Formación</a>
                </li>
                <li class="nav__desktop-bar-section-link-item">
                    <a class="nav__desktop-bar-link" href="#technologies-section">Tecnologias</a>
                </li>
                <li class="nav__desktop-bar-section-link-item">
                    <a class="nav__desktop-bar-link" href="#projects-section">Proyectos</a>
                </li>
                <li class="nav__desktop-bar-section-link-item">
                    <a class="nav__desktop-bar-link" href="#services-section">Servicios</a>
                </li>
                <li class="nav__desktop-bar-section-link-item">
                    <a class="nav__desktop-bar-link" href="#contact-section">Contacto</a>
                </li>
            </ul>

            <div class="nav__desktop-bar-togglers">
                <!-- <button v-if="currentLanguage" type="button" class="nav__desktop-bar-button nav__desktop-bar-button_i18n-toggler" @click="toggleI18n">
                    <Icon v-if="currentLanguage === 'es'" width="50" icon="material-symbols:language-us" class="nav__desktop-bar-button-icon nav__desktop-bar-button-icon_i18n-US"/>
                    <Icon v-else width="50" icon="material-symbols:language-es" class="nav__desktop-bar-button-icon nav__desktop-bar-button-icon_i18n-US"/>
                </button> -->
                <button v-if="currentTheme" type="button" class="nav__desktop-bar-button nav__desktop-bar-button_theme-toggler nav-button" @click="toggleTheme">
                    <Icon v-if="currentTheme === 'light'" width="40" icon="bx:moon" class="nav__desktop-bar-button-icon"/>
                    <Icon v-else width="40" icon="bx:sun" class="nav__desktop-bar-button-icon"/>
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { Icon } from '@iconify/vue';

import { calculateSettingAsThemeString, updateThemeOnHtmlEl } from 'src/helpers/theme';

const currentTheme = ref(null);
const currentLanguage = ref(navigator.language);
const isMenuOpen = ref(false);

const navbarRootElement = ref(null)

onBeforeMount(() => {
    const localStorageTheme = localStorage.getItem("theme");
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    const currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
        
    updateThemeOnHtmlEl({ theme: currentThemeSetting });
    currentTheme.value = currentThemeSetting
})

onMounted(() => {
    const observer = new IntersectionObserver( (entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                const navLinks = Array.from(navbarRootElement.value.querySelectorAll('.nav__desktop-bar-link'))
                navLinks.forEach((navLink) => {
                    // const navLinkParentClassList= navLink.parentElement.classList
                    const linkContainsWatchingSectionClass = navLink.classList.contains('nav__desktop-bar-link_watching-section')
                    if( linkContainsWatchingSectionClass ){ navLink.classList.remove('nav__desktop-bar-link_watching-section')}
                
                    const navLinkHrefHash = new URL(navLink.href).hash
                    const intersectedSectionId = `#${entry.target.id}` 
                    if( intersectedSectionId === navLinkHrefHash ) {
                        navLink.classList.add('nav__desktop-bar-link_watching-section')
                    }
                })
            }
        })
    }, { threshold: 0.3 })

    const sections = Array.from(document.querySelectorAll('section'))
    sections.forEach((section) => observer.observe(section))
})

const toggleMenu = (bool) => isMenuOpen.value = bool


const toggleI18n = () => { 
    alert('COMING SOON')
}

const toggleTheme = () => { 
    const newTheme = (currentTheme.value === 'light') ? 'dark': 'light'
        
    localStorage.setItem("theme", newTheme);
    updateThemeOnHtmlEl({ theme: newTheme });
    currentTheme.value = newTheme
}
</script>

<style scoped>

.nav {}
.nav__mobile-bar, .nav__desktop-bar {
    width: 100%;
    height: clamp(10dvh, 100%, 12dvh);
    padding: 1rem;
    background: rgb(0, 60, 67);
    background: linear-gradient(180deg, var(--secondary-bg-color), var(--primary-bg-color));
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    color: var(--title-color);
    display: flex;
    align-items: center;
    opacity: 0;
    animation: fadeInFromTop .5s ease 3s 1 normal forwards;
}

.nav__mobile-bar {justify-content: center; }
.nav__desktop-bar {justify-content: space-between; }

.nav__mobile-menu {
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: var(--title-color);
    display: none;
    overflow-y: hidden;
}

.nav__mobile-menu_open {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.nav__mobile-menu-content {
    width: 100%;
    padding: 2rem 1rem;
    border-radius: 0 0 20px 20px;
    background-color: var(--secondary-bg-color);
    color: var(--title-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
}


.nav__mobile-bar-button,
.nav__mobile-bar-button-icon {
    color: var(--title-color);
}

.nav__mobile-bar-button_open-menu {}
.nav__mobile-bar-button_close-menu {}

.nav__mobile-menu-section-links-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.nav__mobile-menu-section-link-item {}

.nav__mobile-menu-link,
.nav__desktop-bar-link {
    font: normal normal 500 2rem var(--display-font, Tahoma);
    text-decoration: none;
}
.nav__mobile-menu-togglers {}
.nav__mobile-bar-button_i18n-toggler {}
.nav__mobile-bar-button_theme-toggler {}

.nav__desktop-bar {
    display: none;
}

.nav__desktop-bar-section-links-list {}

.nav__desktop-bar-link,
.nav__desktop-bar-link_watching-section {
  position: relative;
  --on-hover-horizontal-margin: -7px;
  --on-hover-vertical-margin: -7px;
  --on-hover-border-width: 3px;
  --on-hover-border-distance-display: 12px;
}

.nav__desktop-bar-link::before,
.nav__desktop-bar-link::after {
  content: "";
  position: absolute;
  display: block;
  border: 0 solid transparent;
  width: 0%;
  height: 0%;
  transition: all 0.3s ease;
}

.nav__desktop-bar-link::after {
  left: var(--on-hover-horizontal-margin);
  top: var(--on-hover-vertical-margin);
  border-top: var(--on-hover-border-width) solid transparent;
  border-left: var(--on-hover-border-width) solid transparent;
}

.nav__desktop-bar-link::before {
  right: var(--on-hover-horizontal-margin);
  bottom: var(--on-hover-vertical-margin);
  border-bottom: var(--on-hover-border-width) solid transparent;
  border-right: var(--on-hover-border-width) solid transparent;
}

:is( .nav__desktop-bar-link:hover, .nav__desktop-bar-link_watching-section )::before,
:is( .nav__desktop-bar-link:hover, .nav__desktop-bar-link_watching-section )::after {
  width: var(--on-hover-border-distance-display);
  height: var(--on-hover-border-distance-display);
  border-color: var(--title-color);
}

.nav__mobile-menu-togglers,
.nav__desktop-bar-togglers {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.nav__desktop-bar-button {
    color: var(--phrase-color);
    cursor: pointer;
    transition: scale .3s ease, color .3s ease;
}

.nav__desktop-bar-button:hover {
    scale: 1.2;
    color: var(--title-color);
}

.nav__desktop-bar-button_i18n-toggler,
.nav__desktop-bar-button_theme-toggler {
    padding: 0;
}

.nav__desktop-bar-button-icon {
    --icon-size: var(--heading-sm-fs);
    width: var(--icon-size);
    height: var(--icon-size);
}

.nav__desktop-bar-button-icon_i18n-US,
.nav__desktop-bar-button-icon_i18n-ES {
   --icon-size: var(--heading-lg-fs);
    width: var(--icon-size);
    height: var(--icon-size); 
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


@media (width >= 768px) {
    .nav__mobile-bar {
        display: none;
    }

    .nav__desktop-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .nav__desktop-bar-link{
        font: normal normal 500 clamp(var(--body-sm-fs), 1.5vw, var(--heading-sm-fs)) var(--display-font, Tahoma);
        font: normal normal 500 clamp(1.1rem, 1.5vw, var(--heading-sm-fs)) var(--display-font, Tahoma);
        text-decoration: none;
    }

    .nav__desktop-bar-section-links-list {
        display: flex;
        gap: 0 1.5rem;
    }

    .nav__desktop-bar-togglers {
        gap: .5rem;
    }
}


@keyframes fadeInFromTop {
    0% {
        opacity: 0;
        transform: translateY(-50px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
