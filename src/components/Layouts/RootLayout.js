import React from 'react'
import BarraSuperior from '../BarraSuperior'
import BarraLateral from '../BarraLateral'

export default function RootLayout() {
  return (
    <div>
        <BarraSuperior />
        <BarraLateral />
    </div>
  )
}
