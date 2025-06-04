"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

interface Board {
  id: string
  title: string
  description: string
  color: string
  lastActivity: string
  members: number
  tasks: number
}

export default function Dashboard() {
  const [boards] = useState<Board[]>([
    {
      id: "1",
      title: "Projet Marketing",
      description: "Campagne publicitaire Q1 2024",
      color: "#0079bf",
      lastActivity: "Il y a 2 heures",
      members: 5,
      tasks: 12,
    },
    {
      id: "2",
      title: "Développement Web",
      description: "Refonte du site e-commerce",
      color: "#61bd4f",
      lastActivity: "Il y a 1 jour",
      members: 3,
      tasks: 8,
    },
    {
      id: "3",
      title: "Formation Équipe",
      description: "Programme de formation continue",
      color: "#f2d600",
      lastActivity: "Il y a 3 jours",
      members: 8,
      tasks: 15,
    },
    {
      id: "4",
      title: "Support Client",
      description: "Amélioration du service client",
      color: "#eb5a46",
      lastActivity: "Il y a 5 jours",
      members: 4,
      tasks: 6,
    },
  ])

  const [recentActivity] = useState([
    {
      id: "1",
      user: "Marie Dubois",
      action: "a ajouté une carte",
      target: "Révision du design",
      board: "Projet Marketing",
      time: "Il y a 30 minutes",
    },
    {
      id: "2",
      user: "Jean Martin",
      action: "a déplacé",
      target: "Intégration API",
      board: "Développement Web",
      time: "Il y a 1 heure",
    },
    {
      id: "3",
      user: "Sophie Laurent",
      action: "a commenté",
      target: "Formation React",
      board: "Formation Équipe",
      time: "Il y a 2 heures",
    },
  ])

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0">Tableau de bord</h2>
                <button className="btn btn-primary">
                  <i className="bi bi-plus-lg me-2"></i>
                  Nouveau tableau
                </button>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-primary">4</h5>
                  <p className="card-text">Tableaux actifs</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-success">41</h5>
                  <p className="card-text">Tâches totales</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-warning">12</h5>
                  <p className="card-text">En cours</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-info">20</h5>
                  <p className="card-text">Membres d'équipe</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <h5 className="mb-3">Mes tableaux</h5>
              <div className="row">
                {boards.map((board) => (
                  <div key={board.id} className="col-md-6 mb-3">
                    <div className="card h-100" style={{ cursor: "pointer" }}>
                      <div className="card-header text-white" style={{ backgroundColor: board.color, height: "60px" }}>
                        <h6 className="card-title mb-0">{board.title}</h6>
                      </div>
                      <div className="card-body">
                        <p className="card-text text-muted small">{board.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-people me-1"></i>
                            <small>{board.members}</small>
                            <i className="bi bi-list-task ms-3 me-1"></i>
                            <small>{board.tasks}</small>
                          </div>
                          <small className="text-muted">{board.lastActivity}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <h5 className="mb-3">Activité récente</h5>
              <div className="card">
                <div className="card-body">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="d-flex mb-3">
                      <div className="avatar me-3">
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-1 small">
                          <strong>{activity.user}</strong> {activity.action} <em>{activity.target}</em>
                        </p>
                        <p className="mb-1 small text-muted">dans {activity.board}</p>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                    </div>
                  ))}
                  <div className="text-center">
                    <a href="/activity" className="btn btn-sm btn-outline-primary">
                      Voir toute l'activité
                    </a>
                  </div>
                </div>
              </div>

              <div className="card mt-4">
                <div className="card-header">
                  <h6 className="mb-0">Tâches à faire aujourd'hui</h6>
                </div>
                <div className="card-body">
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="task1" />
                    <label className="form-check-label" htmlFor="task1">
                      Réviser le design de la page d'accueil
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="task2" />
                    <label className="form-check-label" htmlFor="task2">
                      Préparer la présentation client
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="task3" defaultChecked />
                    <label className="form-check-label text-decoration-line-through" htmlFor="task3">
                      Réunion équipe développement
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
