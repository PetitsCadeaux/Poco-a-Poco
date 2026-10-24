# ✨ LinguaStar ✨

_Brilla aprendiendo idiomas._

App para aprender idiomas escuchando y hablando: francés, portugués, coreano, japonés, turco, euskera, quechua, guaraní, aimara y geringoso.

## Qué tiene
- Escuchar sin leer, repetir en voz alta, grabarte y comparar, repaso espaciado, racha y meta diaria.
- **Rangos** por idioma (Bronce, Plata, Oro, Platino, Diamante) con puntos.
- **Misiones diarias** que piden hablar: practicar, grabarse y comparar la voz.
- **Mundo**: mapa que se arrastra y se acerca; tocás una bandera y aprendés el idioma de ese lugar.
- **Estudio de voces**: hablantes nativos graban las frases y la app usa su voz.

## Voces reales
1. Quien habla el idioma abre la app → Progreso → *Abrir el estudio de voces*, escribe su nombre y graba las frases.
2. Toca *Descargar ZIP* y se lo pasa a quien administra la app.
3. En GitHub, dentro de la carpeta `public/`, se sube la carpeta `audio/` que viene en el ZIP (ya trae `audio/<idioma>/` con los audios y un `index.json`).
4. Vercel publica solo. Las frases que tengan audio suenan con esa voz y muestran "Voz real de …"; las demás siguen con la voz del dispositivo.

## Desarrollo
```
npm install
npm run dev
npm run build
```
