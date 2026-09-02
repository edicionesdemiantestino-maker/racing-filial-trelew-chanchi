Filial Trelew · Chanchi Estévez — cómo cargar materiales en /assets/
====================================================================

Este README describe la estructura de carpetas que usa index.html + css/site.css.

assets/
├── README-ASSETS.txt          ← este archivo
│
├── marca/                     ESCUDOS Y LOGOS OFICIALES (Racing + filial)
│   └── escudo-racing-oficial.svg   · favicon, nav, historia del escudo, footer
│   └── logo-filial-circular.png    · filial circular (hero, filtros marca de agua, etc.)
│   └── logo-filial.svg             · marca vectorial opcional · reserva
│
├── chanchi/                   FOTOS QUE MUESTRAN A CHANCHI ESTÉVEZ Y ARCHIVOS “chanchi-”
│   └── chanchi-celebra-cilindro.png
│   └── chanchi-celebra-gol.png
│   └── chanchi-retrato.png
│   └── chanchi-cena-filial.png
│   └── chanchi-visita-negra.png     · en galería se usa también como tribuna hinchada
│   └── chanchi-trapos-placa.png     · visita institucional (también en pestaña Filial)
│   └── chanchi-padrino-placa.png    · archivo / no debe ir en historia pública equivocada
│
├── galeria/                   MATERIAL DE LA CUADRÍCULA DE GALERÍA POR CATEGORÍA WEB
│   ├── estadio/               vistas del Cilindro / presidente Perón
│   │   └── cilindro-aereo.jpg · cilindro-torre.jpg · cilindro-fachada.jpg
│   ├── hinchada/
│   │   └── hinchada.jpg · hinchada-tifos.jpg · hinchada-noche.jpg
│   ├── historia/
│   │   └── museo.jpg
│   └── filial/
│       ├── filial-grupo-banner.png · filial-banner-trelew.png
│       └── comunidad/         fotos grupo / eventos locales (ej. filial-comunidad-001.png …)
│   (Las fotos de Chanchi viven arriba en chanchi/, aunque aparezcan en la galería.)
│
├── evolucion-escudo/          LÍNEA CRONOLÓGICA igual que racingclub.com.ar/escudo
│   └── 1903.png … 2014.png | vigente.png   (25 archivos)
│
├── media/
│   └── videopepo.mp4 · santisosa.mp4 · costas.mp4
│   (Videos en la galería pestaña «Videos».)
│
└── archivo/                   SOLO ANTIGUO / RESPALDO (la web no debe depender acá)
    └── escudos-evolucion-grid.png · escudo-slot.svg

Reglas rápidas
--------------
• Reemplazá archivo por archivo con **el mismo nombre** si no querés tocar código.
• Nueva foto para la galería “estadio”: metela en `galeria/estadio/` y agregala en index.html si hace falta un tile nuevo.
• Si cambiás nombres o rutas, actualizá `index.html` (y sólo CSS si hay fondos con url()).

Tipografía externa sitio oficial
• Montserrat (Google Fonts ya linkeado en index).
• Oswald / Bebas Neue según proyecto.
