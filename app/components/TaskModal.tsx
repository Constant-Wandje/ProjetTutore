"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface Task {
  id: string
  title: string
  description?: string
  assignee?: string
  dueDate?: string
  priority: "low" | "medium" | "high"
  labels: string[]
}

interface TaskModalProps {
  task: Task
  onClose: () => void
  onSave: (task: Task) => void
}

export default function TaskModal({ task, onClose, onSave }: TaskModalProps) {
  const [formData, setFormData] = useState<Task>(task)
  const [comments] = useState([
    {
      id: "1",
      author: "Marie Dubois",
      content: "J'ai commencé à travailler sur cette tâche. Les wireframes seront prêts demain.",
      time: "Il y a 2 heures",
    },
    {
      id: "2",
      author: "Jean Martin",
      content: "Parfait ! N'oublie pas d'inclure la version mobile.",
      time: "Il y a 1 heure",
    },
  ])

  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addLabel = (label: string) => {
    if (!formData.labels.includes(label)) {
      setFormData((prev) => ({
        ...prev,
        labels: [...prev.labels, label],
      }))
    }
  }

  const removeLabel = (label: string) => {
    setFormData((prev) => ({
      ...prev,
      labels: prev.labels.filter((l) => l !== label),
    }))
  }

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-card-text me-2"></i>
              Détails de la tâche
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-8">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">
                      Titre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description || ""}
                      onChange={handleChange}
                      placeholder="Ajouter une description plus détaillée..."
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-chat-dots me-2"></i>
                      Commentaires
                    </h6>

                    {comments.map((comment) => (
                      <div key={comment.id} className="d-flex mb-3">
                        <div className="avatar me-3">
                          {comment.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-grow-1">
                          <div className="bg-light rounded p-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <strong className="small">{comment.author}</strong>
                              <small className="text-muted">{comment.time}</small>
                            </div>
                            <p className="mb-0 small">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="d-flex">
                      <div className="avatar me-3">JD</div>
                      <div className="flex-grow-1">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Ajouter un commentaire..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <button className="btn btn-primary" type="button">
                            <i className="bi bi-send"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="assignee" className="form-label fw-bold">
                      Assigné à
                    </label>
                    <select
                      className="form-select"
                      id="assignee"
                      name="assignee"
                      value={formData.assignee || ""}
                      onChange={handleChange}
                    >
                      <option value="">Non assigné</option>
                      <option value="Marie Dubois">Marie Dubois</option>
                      <option value="Jean Martin">Jean Martin</option>
                      <option value="Sophie Laurent">Sophie Laurent</option>
                      <option value="Pierre Durand">Pierre Durand</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label fw-bold">
                      Date d'échéance
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dueDate"
                      name="dueDate"
                      value={formData.dueDate || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="priority" className="form-label fw-bold">
                      Priorité
                    </label>
                    <select
                      className="form-select"
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="low">Faible</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Élevée</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Étiquettes</label>
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {formData.labels.map((label, index) => (
                        <span key={index} className="badge bg-secondary d-flex align-items-center">
                          {label}
                          <button
                            type="button"
                            className="btn-close btn-close-white ms-1"
                            style={{ fontSize: "8px" }}
                            onClick={() => removeLabel(label)}
                          ></button>
                        </span>
                      ))}
                    </div>
                    <div className="d-flex flex-wrap gap-1">
                      {["Design", "Frontend", "Backend", "Urgent", "Bug", "Feature"].map((label) => (
                        <button
                          key={label}
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => addLabel(label)}
                          disabled={formData.labels.includes(label)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr />

                  <div className="d-grid gap-2">
                    <button type="button" className="btn btn-outline-secondary">
                      <i className="bi bi-paperclip me-2"></i>
                      Ajouter une pièce jointe
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                      <i className="bi bi-arrow-right me-2"></i>
                      Déplacer
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                      <i className="bi bi-files me-2"></i>
                      Copier
                    </button>
                    <button type="button" className="btn btn-outline-danger">
                      <i className="bi bi-trash me-2"></i>
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
