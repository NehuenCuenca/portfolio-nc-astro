import BuscaminasImg from '@assets/projects/Buscaminas.webp'
import MegaGymLogoImg from '@assets/projects/MegaLogo.webp'
import MinijuegoMatematicasImg from '@assets/projects/CuentasMatematicas.webp'
import ArenaMobileImg from '@assets/projects/ArenaMobileInicio.webp'
import BuscadorPaisesImg from '@assets/projects/BanderasDelMundo.webp'
import CuentaClaraImg from '@assets/projects/CuentaClara.webp'

export const projects = [
    { 
        nameTitle: 'Buscaminas',
        image: BuscaminasImg,
        externalLinks: { 
            demo: 'https://buscaminas-nc.netlify.app/',
            repository: 'https://github.com/NehuenCuenca/buscaminas-vue'
        },
        description: '<p>Desarrollé una recreación de este clásico juego manteniendo <strong>3 niveles de dificultad</strong> y además, <strong>almacena los 3 mejores tiempos</strong> según el nivel de dificultad.</p>',
        technologies: [
            {
                technologyName: 'Vue'
            },
        ]
    },
    { 
        nameTitle: 'Gym landing page',
        image: MegaGymLogoImg,
        externalLinks: { 
            demo: 'https://megagym-gchu.netlify.app/',
            repository: 'https://github.com/NehuenCuenca/megagym-nc'
        },
        description: '<p>Basado en <strong>un gimnasio local que no posee web page</strong> y solo usa redes sociales. Diseñar y desarrollar esta landing me sació de conceptos modernos sobre diseño web.</p>',
        technologies: [
            {
                technologyName: 'Astro'
            },
            {
                technologyName: 'Vue'
            },
        ]
    },
    { 
        nameTitle: 'Minijuego matematico',
        image: MinijuegoMatematicasImg,
        externalLinks: { 
            demo: 'https://math-minigame-rework-nc.netlify.app/',
            repository: 'https://github.com/NehuenCuenca/math-minigame-rework'
        },
        description: '<p>Es un juego de la Nintendo DS sobre <strong>realizar 10 cuentas matemáticas (suma, resta y multiplicación) en el menor tiempo posible</strong>. Rediseñe su versión anterior, <strong>mejorando la UX.</strong></p>',
        technologies: [
            {
                technologyName: 'Vue'
            }
        ]
    },
    { 
        nameTitle: 'ArenaMobile',
        image: ArenaMobileImg,
        externalLinks: { 
            demo: 'https://arena-mobile.vercel.app/',
            repository: 'https://github.com/No-Country/c16-81-t-php'
        },
        description: '<p>Entre 3 desconocidos ideamos una website que permita crear y gestionar torneos de juegos mobile</strong> (disp. movil). Logramos desarrollar su <strong>landing page, API y user dashboard</strong>.</p>',
        technologies: [
            {
                technologyName: 'Laravel'
            },
            {
                technologyName: 'React'
            },
        ]
    },
    { 
        nameTitle: 'Buscador de países',
        image: BuscadorPaisesImg,
        externalLinks: { 
            demo: 'https://countries-api-vue-nc.netlify.app/',
            repository: 'https://github.com/NehuenCuenca/FM-RestCountriesApiVue'
        },
        description: '<p>Un <a href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca" target="_blank" style="text-decoration:underline;" >challenge</a> que <strong>consulta una lista de países a una API y los exhibe por páginas</strong>. Cuenta con dos filtros<strong>: por nombre de pais y por continente</strong>.</p>',
        technologies: [
            {
                technologyName: 'Vue'
            }
        ]
    },
    { 
        nameTitle: 'CuentaClara',
        image: CuentaClaraImg,
        externalLinks: { 
            repository: 'https://github.com/NehuenCuenca/morosos-anahi-frontend'
        },
        description: '<p>Facilita la <strong>gestión de fiados</strong> realizados en un negocio. <strong>Es un CRUD de los balances acumulados</strong>. Permite <strong>descargar un .excel</strong> de los balances dados en una fecha.</p>',
        technologies: [
            {
                technologyName: 'Vue'
            },
            {
                technologyName: 'Laravel'
            },
        ]
    },
]