"use client"

import { useState } from "react"

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const notifications = [
    {
      id: "1",
      message: "Marie Dubois vous a assigné une tâche",
      time: "Il y a 5 minutes",
      read: false,
    },
    {
      id: "2",
      message: 'Nouvelle activité dans "Projet Marketing"',
      time: "Il y a 1 heure",
      read: false,
    },
    {
      id: "3",
      message: "Réunion prévue dans 30 minutes",
      time: "Il y a 2 heures",
      read: true,
    },
  ]

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/dashboard">
          TaskFlow
        </a>

        <div className="d-flex align-items-center gap-3">
          <div className="input-group" style={{ width: "300px" }}>
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input type="text" className="form-control border-start-0" placeholder="Rechercher..." />
          </div>

          <div className="position-relative">
            <button
              className="btn btn-light position-relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="bi bi-bell"></i>
              <span className="notification-badge">2</span>
            </button>

            {showNotifications && (
              <div
                className="dropdown-menu dropdown-menu-end show position-absolute"
                style={{ width: "350px", top: "100%", right: 0 }}
              >
                <div className="dropdown-header d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Notifications</h6>
                  <button className="btn btn-sm btn-link p-0">Tout marquer comme lu</button>
                </div>
                <div className="dropdown-divider"></div>
                {notifications.map((notif) => (
                  <div key={notif.id} className={`dropdown-item ${!notif.read ? "bg-light" : ""}`}>
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="mb-1 small">{notif.message}</p>
                        <small className="text-muted">{notif.time}</small>
                      </div>
                      {!notif.read && (
                        <div className="ms-2">
                          <span
                            className="badge bg-primary rounded-pill"
                            style={{ width: "8px", height: "8px" }}
                          ></span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div className="dropdown-divider"></div>
                <a className="dropdown-item text-center" href="/notifications">
                  Voir toutes les notifications
                </a>
              </div>
            )}
          </div>

          <div className="position-relative">
            <button className="btn p-0" onClick={() => setShowProfile(!showProfile)}>
              <div className="avatar">JD</div>
            </button>

            {showProfile && (
              <div className="dropdown-menu dropdown-menu-end show position-absolute" style={{ top: "100%", right: 0 }}>
                <div className="dropdown-header">
                  <strong>John Doe</strong>
                  <br />
                  <small className="text-muted">john.doe@example.com</small>
                </div>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/profile">
                  <i className="bi bi-person me-2"></i>
                  Mon profil
                </a>
                <a className="dropdown-item" href="/settings">
                  <i className="bi bi-gear me-2"></i>
                  Paramètres
                </a>
                <a className="dropdown-item" href="/help">
                  <i className="bi bi-question-circle me-2"></i>
                  Aide
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Déconnexion
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
