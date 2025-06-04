"use client"

import type React from "react"

import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation d'envoi d'email
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
    }, 2000)
  }

  if (isEmailSent) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <div className="card shadow-lg" style={{ width: "400px" }}>
          <div className="card-body p-5 text-center">
            <div className="text-success mb-4">
              <i className="bi bi-check-circle display-1"></i>
            </div>
            <h3 className="h4 mb-3">Email envoyé !</h3>
            <p className="text-muted mb-4">
              Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>. Vérifiez votre boîte de
              réception et suivez les instructions.
            </p>
            <div className="d-grid gap-2">
              <a href="/" className="btn btn-primary">
                Retour à la connexion
              </a>
              <button className="btn btn-outline-secondary" onClick={() => setIsEmailSent(false)}>
                Renvoyer l'email
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg" style={{ width: "400px" }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h1 className="h3 mb-3 fw-bold text-primary">TaskFlow</h1>
            <h2 className="h5 mb-3">Mot de passe oublié ?</h2>
            <p className="text-muted">
              Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Adresse email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Envoi en cours...
                </>
              ) : (
                "Envoyer le lien de réinitialisation"
              )}
            </button>
          </form>

          <div className="text-center">
            <a href="/" className="text-decoration-none">
              ← Retour à la connexion
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
