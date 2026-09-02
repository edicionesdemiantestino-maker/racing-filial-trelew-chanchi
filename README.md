# Racing Club · Filial Trelew · Chanchi Estévez

Sitio estático en **D:\\** (sin depender del disco C:).

## Tipografía alineada al sitio oficial

Racing Club publica en su [fonts.css](https://www.racingclub.com.ar/css/fonts.css) **Montserrat** (400/700) para textos y **Druk Wide** para titulares (fuente comercial con licencia).

En este sitio:

- **Montserrat** (Google Fonts, varios pesos) — cuerpo, menú, UI, pies.
- **Oswald** (Google Fonts) — titulares en mayúsculas; sustituto abierto con óptica cercana a una grotesca condensada como Druk Wide, sin copiar archivos del manual del club.

## Escudo e historia institucional

- `assets/escudo-racing-oficial.svg` proviene de `https://www.racingclub.com.ar/img/logo.svg`.
- La sección **Historia del escudo** en `index.html` es una síntesis informativa tomada de [racingclub.com.ar/escudo](https://www.racingclub.com.ar/escudo), con enlace explícito al sitio oficial para el texto y las imágenes de cada modelo histórico.

La marca y el escudo son titularidad de Racing Club de Avellaneda.

## Borrador privado (hasta OK del cliente)

Hasta la aprobación del titular para publicar:

1. **Franja visible** al inicio del sitio avisando modo borrador (clase `priv-banner`).
2. **Meta** `robots` y `googlebot` con `noindex, nofollow` en `<head>` de `index.html`.
3. **`vercel.json`** envía el encabezado `X-Robots-Tag: noindex, nofollow` en todas las rutas (capa extra si el sitio está montado en Vercel).

Cuando el cliente dé el OK público: quitar la franja `priv-banner`, cambiar o eliminar las metas de robots, borrar o editar el header en `vercel.json`, y opcionalmente usar `robots` permisivo solo si corresponde.

## Vista previa local

Abrir `index.html` en el navegador o servir la carpeta:

```bash
npx --yes serve .
```

## Vercel

Proyecto root: esta carpeta. Framework preset: **Other** (sitio estático). `index.html` está en la raíz.
