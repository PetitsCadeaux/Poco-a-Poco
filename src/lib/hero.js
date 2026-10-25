import { createContext } from 'react'

// Mascota elegida y lo que lleva puesto; la leen todas las mascotas dibujadas en la app.
export const HeroContext = createContext({ pet: 'pio', name: '', worn: [] })
