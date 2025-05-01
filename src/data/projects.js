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
        description: '<p>Desarrollé una recreacion de este clasico juego usando <strong>Vue 3 y su Composition API.</strong></p><p>El juego <strong>cuenta con 3 niveles</strong> de dificultad y ademas, <strong>almacena los 3 mejores tiempos</strong> segun el nivel de dificultad.</p>'
    },
    { 
        nameTitle: 'Landing page para gym',
        image: MegaGymLogoImg,
        externalLinks: { 
            demo: 'https://megagym-gchu.netlify.app/',
            repository: 'https://github.com/NehuenCuenca/megagym-nc'
        },
        description: '<p>Proyecto que trata sobre <strong>un gimnasio local el cual no cuenta con una pagina web</strong> y solo hace uso de redes sociales.</p><p>El diseñar y desarrollar esta landing page me ayudo a <strong>sacarle mejor provecho a la herramienta Figma</strong> y tambien me hizo dar cuenta de varios conceptos sobre diseño web.</p><p>Aqui usé <strong>Astro con</strong> la integracion de <strong>React</strong>.</p>'
    },
    { 
        nameTitle: 'Minijuego de matematicas',
        image: MinijuegoMatematicasImg,
        externalLinks: { 
            demo: 'https://math-minigame-rework-nc.netlify.app/',
            repository: 'https://github.com/NehuenCuenca/math-minigame-rework'
        },
        description: '<p>Este es otro juego el cual se podia disfrutar en la Nintendo DS.</p><p>Se trata de <strong>realizar 10 cuentas matematicas en el menor tiempo posible</strong>. Las cuentas incluyen: <strong>suma, resta y multiplicacion.</strong></p><p><strong>Rediseñe</strong> su version anterior, <strong>mejorando la experiencia de usuario</strong> en los distintos tipos de pantallas y añadiendo un tema claro/oscuro.</p>'
    },
    { 
        nameTitle: 'ArenaMobile',
        image: ArenaMobileImg,
        externalLinks: { 
            demo: 'https://arena-mobile.vercel.app/',
            repository: 'https://github.com/No-Country/c16-81-t-php'
        },
        description: '<p>La idea principal de este proyecto era realizar una <strong>plataforma que permita crear y gestionar torneos de juegos mobile</strong> (para dispositivos moviles).</p><p>Fue para una <strong>simulación de No Country</strong>, donde <strong>entre 3 personas</strong>, totalmente desconocidas, <strong>tuvimos que adaptarnos</strong> ante los inconvenientes como equipo, organizarnos <strong>y lograr parte del desarrollo de la plataforma</strong> (Landing page, API y dashboard de usuario).</p>'
    },
    { 
        nameTitle: 'Buscador de paises',
        image: BuscadorPaisesImg,
        externalLinks: { 
            demo: 'https://countries-api-vue-nc.netlify.app/',
            repository: 'https://github.com/NehuenCuenca/FM-RestCountriesApiVue'
        },
        description: '<p>Se trata de un <strong>challenge de <a href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca" target="_blank">FrontendMentor</a></strong> el cual consiste en un buscador de paises.</p><p>La pagina consigue los datos de los paises mediante una </strong>llamada a su respectiva API y los renderiza de manera paginada</strong>. El proyecto </trong>cuenta con dos filtros</strong>: por nombre de pais y por región; <strong>además del interruptor entre tema claro y oscuro</strong>.</p><p>Fue realizado con <strong>HTML, CSS y Vue</strong>.</p>'
    },
    { 
        nameTitle: 'CuentaClara',
        image: CuentaClaraImg,
        externalLinks: { 
            repository: 'https://github.com/NehuenCuenca/morosos-anahi-frontend'
        },
        description: '<p>CuentaClara es una aplicacion web desarrollada para la <strong>gestion de fiados que se lleva a cabo en un negocio</strong>.</p><p><strong>Permite visualizar a los clientes con su respectivo balance</strong> acumulado (ya sea de deuda o a su favor). Para ello <strong>se registra una deuda</strong> describiendo un monto, cantidad y detalle con fecha y hora. Estas deudas <strong>pueden ser editadas, saldadas y hasta borradas del historial de un cliente</strong>.</p><p>Tambien <strong>es posible descargar un archivo excel</strong> sobre las deudas y los respectivos balances transcurridos en un mes/año seleccionado.</p>'
    },
]