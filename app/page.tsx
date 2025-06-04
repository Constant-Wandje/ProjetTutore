"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation de connexion
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg" style={{ width: "400px" }}>
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h1 className="h3 mb-3 fw-bold text-primary">TaskFlow</h1>
                <p className="text-muted">Connectez-vous à votre compte</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="remember" />
                  <label className="form-check-label" htmlFor="remember">
                    Se souvenir de moi
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Connexion...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </button>

                <div className="text-center">
                  <a href="/forgot-password" className="text-decoration-none">
                    Mot de passe oublié ?
                  </a>
                </div>
              </form>

              <hr className="my-4" />

              <div className="text-center">
                <p className="mb-0">Pas encore de compte ?</p>
                <a href="/signup" className="btn btn-outline-primary w-100 mt-2">
                  Créer un compte
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          <div className="text-center text-white">
            <h2 className="display-4 fw-bold mb-4">Organisez vos projets</h2>
            <p className="lead">
              Gérez vos tâches, collaborez avec votre équipe et atteignez vos objectifs plus efficacement.
            </p>
            <div className="mt-5">
              <div className="row">
                <div className="col-4">
                  <div className="bg-white bg-opacity-10 rounded p-3 mb-3">
                    <i className="bi bi-kanban fs-1"></i>
                  </div>
                  <h6>Tableaux Kanban</h6>
                </div>
                <div className="col-4">
                  <div className="bg-white bg-opacity-10 rounded p-3 mb-3">
                    <i className="bi bi-people fs-1"></i>
                  </div>
                  <h6>Collaboration</h6>
                </div>
                <div className="col-4">
                  <div className="bg-white bg-opacity-10 rounded p-3 mb-3">
                    <i className="bi bi-graph-up fs-1"></i>
                  </div>
                  <h6>Suivi des progrès</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
