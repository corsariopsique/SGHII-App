import React from 'react'
import BarraSuperior from '../BarraSuperior'
import BarraLateral from '../BarraLateral'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div>
        <BarraSuperior />
        <BarraLateral />
        <Outlet />
    </div>
  )
}
