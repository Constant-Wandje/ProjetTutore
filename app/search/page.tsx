"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

interface SearchResult {
  id: string
  type: "task" | "board" | "user"
  title: string
  description?: string
  board?: string
  assignee?: string
  priority?: string
  labels?: string[]
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState({
    type: "all",
    priority: "all",
    assignee: "all",
    board: "all",
  })

  const [searchResults] = useState<SearchResult[]>([
    {
      id: "1",
      type: "task",
      title: "Créer les wireframes",
      description: "Concevoir les maquettes pour les nouvelles pages",
      board: "Projet Marketing",
      assignee: "Marie Dubois",
      priority: "high",
      labels: ["Design", "Urgent"],
    },
    {
      id: "2",
      type: "task",
      title: "Développement API",
      description: "Implémenter les endpoints REST",
      board: "Développement Web",
      assignee: "Sophie Laurent",
      priority: "high",
      labels: ["Backend", "API"],
    },
    {
      id: "3",
      type: "board",
      title: "Formation Équipe",
      description: "Programme de formation continue",
    },
    {
      id: "4",
      type: "user",
      title: "Jean Martin",
      description: "Développeur Frontend",
    },
  ])

  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const filteredResults = searchResults.filter((result) => {
    if (
      searchQuery &&
      !result.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !result.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    if (activeFilters.type !== "all" && result.type !== activeFilters.type) {
      return false
    }

    if (activeFilters.priority !== "all" && result.priority !== activeFilters.priority) {
      return false
    }

    if (activeFilters.assignee !== "all" && result.assignee !== activeFilters.assignee) {
      return false
    }

    if (activeFilters.board !== "all" && result.board !== activeFilters.board) {
      return false
    }

    return true
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "task":
        return "bi-card-text"
      case "board":
        return "bi-kanban"
      case "user":
        return "bi-person"
      default:
        return "bi-search"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "task":
        return "primary"
      case "board":
        return "success"
      case "user":
        return "info"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger"
      case "medium":
        return "warning"
      case "low":
        return "success"
      default:
        return "secondary"
    }
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-12">
              <h2 className="h4 mb-4">Recherche et Filtres</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">Filtres</h6>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Type</label>
                    <select
                      className="form-select form-select-sm"
                      value={activeFilters.type}
                      onChange={(e) => handleFilterChange("type", e.target.value)}
                    >
                      <option value="all">Tous les types</option>
                      <option value="task">Tâches</option>
                      <option value="board">Tableaux</option>
                      <option value="user">Utilisateurs</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Priorité</label>
                    <select
                      className="form-select form-select-sm"
                      value={activeFilters.priority}
                      onChange={(e) => handleFilterChange("priority", e.target.value)}
                    >
                      <option value="all">Toutes les priorités</option>
                      <option value="high">Élevée</option>
                      <option value="medium">Moyenne</option>
                      <option value="low">Faible</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Assigné à</label>
                    <select
                      className="form-select form-select-sm"
                      value={activeFilters.assignee}
                      onChange={(e) => handleFilterChange("assignee", e.target.value)}
                    >
                      <option value="all">Tous les utilisateurs</option>
                      <option value="Marie Dubois">Marie Dubois</option>
                      <option value="Jean Martin">Jean Martin</option>
                      <option value="Sophie Laurent">Sophie Laurent</option>
                      <option value="Pierre Durand">Pierre Durand</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Tableau</label>
                    <select
                      className="form-select form-select-sm"
                      value={activeFilters.board}
                      onChange={(e) => handleFilterChange("board", e.target.value)}
                    >
                      <option value="all">Tous les tableaux</option>
                      <option value="Projet Marketing">Projet Marketing</option>
                      <option value="Développement Web">Développement Web</option>
                      <option value="Formation Équipe">Formation Équipe</option>
                      <option value="Support Client">Support Client</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-outline-secondary btn-sm w-100"
                    onClick={() =>
                      setActiveFilters({
                        type: "all",
                        priority: "all",
                        assignee: "all",
                        board: "all",
                      })
                    }
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              </div>

              <div className="card mt-3">
                <div className="card-header">
                  <h6 className="mb-0">Recherches récentes</h6>
                </div>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    <a href="#" className="list-group-item list-group-item-action border-0 px-0 py-2">
                      <i className="bi bi-clock-history me-2 text-muted"></i>
                      wireframes design
                    </a>
                    <a href="#" className="list-group-item list-group-item-action border-0 px-0 py-2">
                      <i className="bi bi-clock-history me-2 text-muted"></i>
                      API développement
                    </a>
                    <a href="#" className="list-group-item list-group-item-action border-0 px-0 py-2">
                      <i className="bi bi-clock-history me-2 text-muted"></i>
                      formation équipe
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="card">
                <div className="card-body">
                  <div className="input-group mb-4">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rechercher des tâches, tableaux, utilisateurs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-primary">Rechercher</button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">
                      {filteredResults.length} résultat{filteredResults.length > 1 ? "s" : ""} trouvé
                      {filteredResults.length > 1 ? "s" : ""}
                    </h6>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-list me-1"></i>
                        Liste
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-grid me-1"></i>
                        Grille
                      </button>
                    </div>
                  </div>

                  <div className="list-group">
                    {filteredResults.map((result) => (
                      <div key={result.id} className="list-group-item list-group-item-action">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center mb-2">
                              <i className={`${getTypeIcon(result.type)} me-2 text-${getTypeColor(result.type)}`}></i>
                              <h6 className="mb-0">{result.title}</h6>
                              <span className={`badge bg-${getTypeColor(result.type)} ms-2`}>
                                {result.type === "task" ? "Tâche" : result.type === "board" ? "Tableau" : "Utilisateur"}
                              </span>
                            </div>

                            {result.description && <p className="text-muted mb-2 small">{result.description}</p>}

                            <div className="d-flex flex-wrap gap-2 align-items-center">
                              {result.board && (
                                <span className="badge bg-light text-dark">
                                  <i className="bi bi-kanban me-1"></i>
                                  {result.board}
                                </span>
                              )}

                              {result.assignee && (
                                <span className="badge bg-light text-dark">
                                  <i className="bi bi-person me-1"></i>
                                  {result.assignee}
                                </span>
                              )}

                              {result.priority && (
                                <span className={`badge bg-${getPriorityColor(result.priority)}`}>
                                  {result.priority === "high"
                                    ? "Élevée"
                                    : result.priority === "medium"
                                      ? "Moyenne"
                                      : "Faible"}
                                </span>
                              )}

                              {result.labels &&
                                result.labels.map((label, index) => (
                                  <span key={index} className="badge bg-secondary">
                                    {label}
                                  </span>
                                ))}
                            </div>
                          </div>

                          <div className="ms-3">
                            <button className="btn btn-sm btn-outline-primary">Ouvrir</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredResults.length === 0 && (
                    <div className="text-center py-5">
                      <i className="bi bi-search display-1 text-muted"></i>
                      <h5 className="mt-3">Aucun résultat trouvé</h5>
                      <p className="text-muted">Essayez de modifier vos critères de recherche ou vos filtres.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
