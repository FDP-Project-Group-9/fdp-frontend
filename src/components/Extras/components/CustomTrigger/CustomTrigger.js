import React from 'react'
import sidebarArrow from './assets/sidebar-arrow.svg'
import style from './CustomTrigger.module.css'

function CustomTrigger({collapsed}) {
  return (
    <div className="container">
      <img className={collapsed ? style["rotate-out"] : style["rotate-in"]} src={sidebarArrow} alt="" />
    </div>
  )
}

export default CustomTrigger
