<template>
    <nav ref="navbarRootElement">
        <div class="nav-mobile">
            <button v-if="currentTheme" type="button" @click="toggleMenu(true)" class="mobile-nav-button">
                <SvgByTheme :currentTheme="currentTheme"
                    :lightSvg="BxMenuLight"
                    :darkSvg="BxMenuDark" 
                    :size="40" :altText="'BOTON ABRIR MENU'" 
                />
            </button>

            <Transition>
                <div class="mobile-menu" v-if="isMenuOpen" :class="isMenuOpen ? 'mobile-menu_open' : ''" >
                    <div class="mobile-menu-content">                  
                        <button v-if="currentTheme" type="button" @click="toggleMenu(false)" class="mobile-nav-button">
                            <SvgByTheme :currentTheme="currentTheme"
                                :lightSvg="BxXLight"
                                :darkSvg="BxXDark" 
                                :size="55" :altText="'BOTON CERRAR MENU'"
                            />
                        </button>

                        <ul class="mobile-links-sections-list">
                            <li class="mobile-links-sections-list__link-item">
                                <a @click="toggleMenu(false)" class="mobile-nav-link" href="#hero-section">Inicio</a>
                            </li>
                            <li class="mobile-links-sections-list__link-item">
                                <a @click="toggleMenu(false)" class="mobile-nav-link" href="#formation-section">Formación</a>
                            </li>
                            <li class="mobile-links-sections-list__link-item">
                                <a @click="toggleMenu(false)" class="mobile-nav-link" href="#technologies-section">Tecnologias</a>
                            </li>
                            <li class="mobile-links-sections-list__link-item">
                                <a @click="toggleMenu(false)" class="mobile-nav-link" href="#projects-section">Proyectos</a>
                            </li>
                            <li class="mobile-links-sections-list__link-item">
                                <a @click="toggleMenu(false)" class="mobile-nav-link" href="#services-section">Servicios</a>
                            </li>
                            <li class="mobile-links-sections-list__link-item">
                                <a @click="toggleMenu(false)" class="mobile-nav-link" href="#contact-section">Contacto</a>
                            </li>
                        </ul>

                        <div class="togglers">
                            <button v-if="currentLanguage" type="button" class="nav-button" @click="toggleI18n">
                                <SvgByTheme :currentTheme="currentTheme"
                                    :lightSvg="(currentLanguage === 'es') ? MSESLight : MSENLight"
                                    :darkSvg="(currentLanguage === 'en') ? MSENDark : MSESDark" 
                                    :size="50" :altText="'Boton alternar idioma'"
                                />
                            </button>
                            <button v-if="currentTheme" type="button" class="mobile-nav-button" @click="toggleTheme">
                                <SvgByTheme :currentTheme="currentTheme"
                                    :lightSvg="BxMoon"
                                    :darkSvg="BxSun" 
                                    :size="40" :altText="'BOTON ALTERNAR TEMA'"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>


        <div class="nav-desktop">
            <ul class="links-sections-list">
                <li class="links-sections-list__link-item">
                    <a class="nav-link" href="#formation-section">Formación</a>
                </li>
                <li class="links-sections-list__link-item">
                    <a class="nav-link" href="#technologies-section">Tecnologias</a>
                </li>
                <li class="links-sections-list__link-item">
                    <a class="nav-link" href="#projects-section">Proyectos</a>
                </li>
                <li class="links-sections-list__link-item">
                    <a class="nav-link" href="#services-section">Servicios</a>
                </li>
                <li class="links-sections-list__link-item">
                    <a class="nav-link" href="#contact-section">Contacto</a>
                </li>
            </ul>

            <div class="togglers">
                <button v-if="currentLanguage" type="button" class="nav-button" @click="toggleI18n">
                    <SvgByTheme :currentTheme="currentTheme"
                        :lightSvg="(currentLanguage === 'es') ? MSENLight : MSESLight"
                        :darkSvg="(currentLanguage === 'en') ? MSESDark : MSENDark" 
                        :size="50" :altText="'Boton alternar idioma'"
                    />
                </button>
                <button v-if="currentTheme" type="button" class="nav-button" @click="toggleTheme">
                    <SvgByTheme :currentTheme="currentTheme"
                        :lightSvg="BxMoon"
                        :darkSvg="BxSun" 
                        :size="40" :altText="'Boton alternar tema'"
                    />
                </button>
            </div>
            
        </div>
    </nav>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import SvgByTheme from '@components/SvgByTheme.vue';
import { calculateSettingAsThemeString, updateThemeOnHtmlEl } from 'src/helpers/theme';

import BxMenuDark from '@assets/svgs/Menu/BxMenuDark.svg'
import BxMenuLight from '@assets/svgs/Menu/BxMenuLight.svg'
import BxXLight from '@assets/svgs/X/BxXLight.svg'
import BxXDark from '@assets/svgs/X/BxXDark.svg'
import BxMoon from '@assets/svgs/BxMoon.svg'
import BxSun from '@assets/svgs/BxSun.svg'
import MSESLight from '@assets/svgs/I18n/MSESLight.svg'
import MSESDark from '@assets/svgs/I18n/MSESDark.svg'
import MSENLight from '@assets/svgs/I18n/MSENLight.svg'
import MSENDark from '@assets/svgs/I18n/MSENDark.svg'

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
                const navLinks = Array.from(navbarRootElement.value.querySelectorAll('.nav-link'))
                navLinks.forEach((navLink) => {
                    const navLinkParentClassList= navLink.parentElement.classList
                    if( navLinkParentClassList.contains('links-sections-list__link-item_watching-section') ){ navLinkParentClassList.remove('links-sections-list__link-item_watching-section')}
                
                    const navLinkHrefHash = new URL(navLink.href).hash
                    const intersectedSectionId = `#${entry.target.id}` 
                    if( intersectedSectionId === navLinkHrefHash ) {
                        navLinkParentClassList.add('links-sections-list__link-item_watching-section')
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
.nav-mobile,
.nav-desktop {
    width: 100%;
    height: clamp(10dvh, 100%, 12dvh);
    padding: 1rem;
    background: rgb(0, 60, 67);
    background: linear-gradient(180deg,  var(--color-details), var(--color-bg));
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    color: var(--color-titles);
    display: flex;
    align-items: center;
    opacity: 0;
    animation: fadeInFromTop .5s ease 1.5s 1 normal forwards;
}

.nav-mobile { justify-content: end; }
.nav-desktop { justify-content: space-between; }


.mobile-menu {
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: var(--color-titles);
    display: none;
    overflow-y: hidden;
}

.mobile-menu_open {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.mobile-menu-content {
    width: 100%;
    padding: 2rem 1rem;
    border-radius: 0 0 20px 20px;
    background-color: var(--color-details);
    color: var(--color-titles);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
}

.mobile-nav-button {}

.mobile-links-sections-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}


.mobile-links-sections-list__link-item {}

.nav-desktop {
    display: none;
}

.nav-link,
.mobile-nav-link {
    font: normal normal 500 2rem var(--display-font, Tahoma);
    text-decoration: none;
}

.nav-button {
    color: var(--color-font);
    cursor: pointer;
    transition: scale .3s ease;
}

.nav-button:hover {
    scale: 1.2;
}

.links-sections-list__link-item,
.links-sections-list__link-item_watching-section {
    display: block;
    height: 100%;
    position: relative;
    transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
}

.links-sections-list__link-item:after,
.links-sections-list__link-item_watching-section:after {
    content: "";
    position: absolute;
    width: 0%;
    height: 1px;
    display: block;
    transition: all 0.3s ease;
    bottom: 0%;
}

.links-sections-list__link-item:hover::after,
.links-sections-list__link-item_watching-section::after {
    width: 100%;
    height: 3px;
    background-color: var(--color-titles);
    border-radius: 10px;
}

.togglers {
    display: flex;
    align-items: center;
    gap: 1rem;
}


@media (width >= 768px) {
    .nav-mobile {
        display: none;
    }

    .nav-desktop {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .links-sections-list__link-item .nav-link{
        font: normal normal 500 clamp(1.1rem, 1.5vw, 2rem) var(--display-font, Tahoma);
        text-decoration: none;
    }

    .links-sections-list {
        display: flex;
        gap: 0 1.2rem;
    }

    .togglers {
        gap: 0;
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
