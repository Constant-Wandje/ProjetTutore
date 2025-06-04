"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      icon: "bi-speedometer2",
      label: "Tableau de bord",
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      icon: "bi-kanban",
      label: "Mes tableaux",
      href: "/boards",
      active: pathname.startsWith("/board"),
    },
    {
      icon: "bi-calendar",
      label: "Calendrier",
      href: "/calendar",
      active: pathname === "/calendar",
    },
    {
      icon: "bi-people",
      label: "Équipes",
      href: "/teams",
      active: pathname === "/teams",
    },
    {
      icon: "bi-graph-up",
      label: "Rapports",
      href: "/reports",
      active: pathname === "/reports",
    },
  ]

  const recentBoards = [
    { name: "Projet Marketing", href: "/board/1" },
    { name: "Développement Web", href: "/board/2" },
    { name: "Formation Équipe", href: "/board/3" },
  ]

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`} style={{ width: isCollapsed ? "60px" : "250px" }}>
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          {!isCollapsed && <h6 className="mb-0">Navigation</h6>}
          <button className="btn btn-sm btn-light" onClick={() => setIsCollapsed(!isCollapsed)}>
            <i className={`bi ${isCollapsed ? "bi-chevron-right" : "bi-chevron-left"}`}></i>
          </button>
        </div>

        <ul className="nav nav-pills flex-column">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item mb-1">
              <a href={item.href} className={`nav-link d-flex align-items-center ${item.active ? "active" : ""}`}>
                <i className={`${item.icon} me-2`}></i>
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>

        {!isCollapsed && (
          <>
            <hr className="my-4" />

            <div className="mb-3">
              <h6 className="mb-2">Tableaux récents</h6>
              <ul className="nav nav-pills flex-column">
                {recentBoards.map((board, index) => (
                  <li key={index} className="nav-item mb-1">
                    <a href={board.href} className="nav-link py-1 px-2 small">
                      <i className="bi bi-kanban me-2"></i>
                      {board.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <button className="btn btn-primary w-100">
                <i className="bi bi-plus me-2"></i>
                Nouveau tableau
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
