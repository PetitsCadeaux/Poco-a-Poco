# Poco a poco: idiomas

App para practicar **francés, coreano, japonés y turco** escuchando, repitiendo en voz alta y repasando un rato cada día.

## Cómo correrla

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`. Para publicarla: subila a GitHub y conectá el repo en Vercel (Vite se detecta solo, comando `npm run build`, carpeta `dist`).

## Qué hace

- **Sesión de hoy**: primero las frases que toca repasar y después frases nuevas (5 por defecto, se cambia en Progreso).
- **Cada frase**: la escuchás 3 veces sin ver el texto, después aparece el texto con la pronunciación aproximada, la repetís en voz alta, te grabás y comparás tu audio con el original.
- **Repaso espaciado**: al terminar cada frase elegís Otra vez / Difícil / Bien / Fácil y la app decide cuándo vuelve a aparecer.
- **Racha y meta diaria** de 15 frases.
- **Lecciones** para practicar un tema puntual, con un consejo de pronunciación por lección.
- Funciona instalada en el celular (PWA) y guarda el progreso en el dispositivo.

## Cosas a tener en cuenta

- El micrófono solo funciona en `localhost` o con HTTPS (Vercel ya lo da).
- El audio usa las voces del dispositivo. Si falta la voz de un idioma, la app avisa; en Android y iOS se instala desde los ajustes de voz del sistema.
- Las pronunciaciones escritas son aproximadas para hispanohablantes (ü = u francesa o turca, ë = e cerrada con labios redondeados, MAYÚSCULAS = sílaba fuerte).

## Dónde tocar

- `src/data/content.js`: todas las lecciones y frases. Para agregar una, sumá `[texto, pronunciación, significado]` a una lección.
- `src/lib/srs.js`: los intervalos del repaso espaciado.
- `src/lib/storage.js`: meta diaria y almacenamiento (hoy `localStorage`; se puede cambiar por Supabase para sincronizar entre dispositivos).
