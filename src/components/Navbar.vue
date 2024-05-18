<template>
    <nav>
        <div class="nav-mobile">
            <a class="nav-link home-link" href="#hero-section">Inicio</a>

            <button type="button" @click="toggleMenu(true)" class="nav-button">
                <SvgByTheme :currentTheme="currentTheme"
                    :lightSvg="BxMenuLight"
                    :darkSvg="BxMenuDark" 
                    :size="30" :altText="'BOTON ABRIR MENU'"
                />
            </button>

            <div class="mobile-menu" v-if="IsMenuOpen" :class="IsMenuOpen ? 'mobile-menu_open' : ''">
                <button type="button" @click="toggleMenu(false)" class="mobile-nav-button">
                    <SvgByTheme :currentTheme="currentTheme"
                        :lightSvg="BxXLight"
                        :darkSvg="BxXDark" 
                        :size="45" :altText="'BOTON CERRAR MENU'"
                    />
                </button>

                <button type="button" class="nav-button" @click="toggleTheme">
                    <SvgByTheme :currentTheme="currentTheme"
                        :lightSvg="BxMoon"
                        :darkSvg="BxSun" 
                        :size="30" :altText="'BOTON ALTERNAR TEMA'"
                    />
                </button>

                <ul class="mobile-links-sections-list">
                    <li class="mobile-links-sections-list__link-item">
                        <a @click="toggleMenu(false)" class="mobile-nav-link" href="#formation-section">Formacion</a>
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
            </div>
        </div>


        <div class="nav-desktop">
            <a class="nav-link home-link" href="#hero-section">Inicio</a>

            <ul class="links-sections-list">
                <li class="links-sections-list__link-item">
                    <a class="nav-link" href="#formation-section">Formacion</a>
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

            <button type="button" class="nav-button" @click="toggleTheme" v-if="currentTheme">
                <SvgByTheme :currentTheme="currentTheme"
                    :lightSvg="BxMoon"
                    :darkSvg="BxSun" 
                    :size="30" :altText="'Boton alternar tema'"
                />
            </button>
        </div>
    </nav>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import SvgByTheme from '@components/SvgByTheme.vue';
import { calculateSettingAsThemeString, updateThemeOnHtmlEl } from 'src/helpers/theme';

import BxMenuDark from '@assets/svgs/Menu/BxMenuDark.svg'
import BxMenuLight from '@assets/svgs/Menu/BxMenuLight.svg'
import BxXLight from '@assets/svgs/X/BxXLight.svg'
import BxXDark from '@assets/svgs/X/BxXDark.svg'
import BxMoon from '@assets/svgs/BxMoon.svg'
import BxSun from '@assets/svgs/BxSun.svg'

const currentTheme = ref(null);
const IsMenuOpen = ref(false);

onBeforeMount(() => {
    const localStorageTheme = localStorage.getItem("theme");
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    const currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
        
    updateThemeOnHtmlEl({ theme: currentThemeSetting });
    currentTheme.value = currentThemeSetting
})

const toggleMenu = (bool) => {
    IsMenuOpen.value = bool
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
    min-height: 15vh;
    padding: 0 1rem;
    background: rgb(0, 60, 67);
    background: var(--navbar-fade-bg);
    color: var(--color-titles);
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: fadeInFromTop 1s ease 0s 1 normal forwards;
}


.mobile-menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 2rem 1rem;
    border-radius: 0 0 20px 20px;
    background-color: var(--color-details);
    color: var(--color-titles);
    display: none;
}


.mobile-menu_open {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    animation: fadeInFromTop .5s ease 0s 1 normal forwards;
}

.mobile-nav-button {}

.mobile-links-sections-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
}


.mobile-links-sections-list__link-item {}

.nav-desktop {
    display: none;
}

.nav-link,
.mobile-nav-link {
    font: normal normal 500 1.3rem var(--display-font, Tahoma);
    text-decoration: none;
}

.home-link {
    font-size: 1.8rem;
}

.nav-button {
    color: var(--color-font);
    cursor: pointer;
    transition: scale .3s ease;
}

.nav-button:hover {
    scale: 1.2;
}

.links-sections-list__link-item {
    display: block;
    height: 100%;
    position: relative;
    transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
}

.links-sections-list__link-item:after {
    content: "";
    position: absolute;
    width: 0%;
    height: 1px;
    display: block;
    transition: all 0.3s ease;
    bottom: 0%;
}

.links-sections-list__link-item:hover::after {
    width: 100%;
    height: 3px;
    background-color: var(--color-titles);
    border-radius: 10px;
}




@media (width >=768px) {
    .nav-mobile {
        display: none;
    }

    .nav-desktop {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
    }

    .home-link {
        margin: 0 auto 0 0;
    }

    .links-sections-list {
        display: flex;
        gap: 0 1.5rem;
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
