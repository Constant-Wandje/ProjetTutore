"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Navbar from "../../components/Navbar"
import TaskModal from "../../components/TaskModal"

interface Task {
  id: string
  title: string
  description?: string
  assignee?: string
  dueDate?: string
  priority: "low" | "medium" | "high"
  labels: string[]
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

export default function BoardPage() {
  const params = useParams()
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "À faire",
      tasks: [
        {
          id: "1",
          title: "Créer les wireframes",
          description: "Concevoir les maquettes pour les nouvelles pages",
          assignee: "Marie Dubois",
          dueDate: "2024-01-15",
          priority: "high",
          labels: ["Design", "Urgent"],
        },
        {
          id: "2",
          title: "Recherche utilisateur",
          assignee: "Jean Martin",
          priority: "medium",
          labels: ["Recherche"],
        },
      ],
    },
    {
      id: "inprogress",
      title: "En cours",
      tasks: [
        {
          id: "3",
          title: "Développement API",
          description: "Implémenter les endpoints REST",
          assignee: "Sophie Laurent",
          dueDate: "2024-01-20",
          priority: "high",
          labels: ["Backend", "API"],
        },
      ],
    },
    {
      id: "review",
      title: "En révision",
      tasks: [
        {
          id: "4",
          title: "Tests unitaires",
          assignee: "Pierre Durand",
          priority: "medium",
          labels: ["Tests"],
        },
      ],
    },
    {
      id: "done",
      title: "Terminé",
      tasks: [
        {
          id: "5",
          title: "Configuration serveur",
          assignee: "Marie Dubois",
          priority: "low",
          labels: ["DevOps"],
        },
      ],
    },
  ])

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  const handleAddTask = (columnId: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "Nouvelle tâche",
      priority: "medium",
      labels: [],
    }

    setColumns(columns.map((col) => (col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col)))
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
    <div>
      <Navbar />
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Projet Marketing</h2>
            <p className="text-muted mb-0">Campagne publicitaire Q1 2024</p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary">
              <i className="bi bi-funnel me-2"></i>
              Filtrer
            </button>
            <button className="btn btn-outline-secondary">
              <i className="bi bi-people me-2"></i>
              Membres
            </button>
            <button className="btn btn-primary">
              <i className="bi bi-share me-2"></i>
              Partager
            </button>
          </div>
        </div>

        <div className="row">
          {columns.map((column) => (
            <div key={column.id} className="col-md-3 mb-4">
              <div className="board-column p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 fw-bold">{column.title}</h6>
                  <span className="badge bg-secondary">{column.tasks.length}</span>
                </div>

                {column.tasks.map((task) => (
                  <div key={task.id} className="task-card" onClick={() => handleTaskClick(task)}>
                    <h6 className="mb-2">{task.title}</h6>

                    {task.description && <p className="small text-muted mb-2">{task.description}</p>}

                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {task.labels.map((label, index) => (
                        <span key={index} className="badge bg-light text-dark small">
                          {label}
                        </span>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        {task.assignee && (
                          <div className="avatar me-2" style={{ width: "24px", height: "24px", fontSize: "10px" }}>
                            {task.assignee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        )}
                        <span className={`badge bg-${getPriorityColor(task.priority)} small`}>{task.priority}</span>
                      </div>

                      {task.dueDate && (
                        <small className="text-muted">
                          <i className="bi bi-calendar me-1"></i>
                          {new Date(task.dueDate).toLocaleDateString("fr-FR")}
                        </small>
                      )}
                    </div>
                  </div>
                ))}

                <button className="btn btn-light w-100 mt-2" onClick={() => handleAddTask(column.id)}>
                  <i className="bi bi-plus me-2"></i>
                  Ajouter une carte
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showTaskModal && selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setShowTaskModal(false)}
          onSave={(updatedTask) => {
            setColumns(
              columns.map((col) => ({
                ...col,
                tasks: col.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
              })),
            )
            setShowTaskModal(false)
          }}
        />
      )}
    </div>
  )
}
