"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+33 1 23 45 67 89",
    bio: "Développeur full-stack passionné par les nouvelles technologies.",
    location: "Paris, France",
    website: "https://johndoe.dev",
  })

  const [notifications, setNotifications] = useState({
    emailTasks: true,
    emailComments: true,
    emailMentions: true,
    pushTasks: false,
    pushComments: true,
    pushMentions: true,
  })

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de sauvegarde
    alert("Profil mis à jour avec succès !")
  }

  const handleNotificationChange = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-12">
              <h2 className="h4 mb-4">Mon Profil</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <div className="card-body text-center">
                  <div className="avatar mx-auto mb-3" style={{ width: "80px", height: "80px", fontSize: "24px" }}>
                    JD
                  </div>
                  <h5 className="card-title">
                    {profileData.firstName} {profileData.lastName}
                  </h5>
                  <p className="card-text text-muted">{profileData.email}</p>
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-camera me-2"></i>
                    Changer la photo
                  </button>
                </div>
              </div>

              <div className="card mt-3">
                <div className="card-body">
                  <h6 className="card-title">Statistiques</h6>
                  <div className="row text-center">
                    <div className="col-6">
                      <div className="border-end">
                        <h5 className="text-primary">24</h5>
                        <small className="text-muted">Tâches créées</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <h5 className="text-success">18</h5>
                      <small className="text-muted">Tâches terminées</small>
                    </div>
                  </div>
                  <hr />
                  <div className="row text-center">
                    <div className="col-6">
                      <div className="border-end">
                        <h5 className="text-info">5</h5>
                        <small className="text-muted">Tableaux</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <h5 className="text-warning">12</h5>
                      <small className="text-muted">Équipes</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="card">
                <div className="card-header">
                  <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                        onClick={() => setActiveTab("profile")}
                      >
                        Informations personnelles
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "notifications" ? "active" : ""}`}
                        onClick={() => setActiveTab("notifications")}
                      >
                        Notifications
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "security" ? "active" : ""}`}
                        onClick={() => setActiveTab("security")}
                      >
                        Sécurité
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="card-body">
                  {activeTab === "profile" && (
                    <form onSubmit={handleProfileSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="firstName" className="form-label">
                            Prénom
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="lastName" className="form-label">
                            Nom
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="phone" className="form-label">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="bio" className="form-label">
                          Biographie
                        </label>
                        <textarea
                          className="form-control"
                          id="bio"
                          rows={3}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="location" className="form-label">
                            Localisation
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="website" className="form-label">
                            Site web
                          </label>
                          <input
                            type="url"
                            className="form-control"
                            id="website"
                            value={profileData.website}
                            onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Enregistrer les modifications
                      </button>
                    </form>
                  )}

                  {activeTab === "notifications" && (
                    <div>
                      <h5 className="mb-4">Préférences de notification</h5>

                      <div className="mb-4">
                        <h6 className="mb-3">Notifications par email</h6>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="emailTasks"
                            checked={notifications.emailTasks}
                            onChange={() => handleNotificationChange("emailTasks")}
                          />
                          <label className="form-check-label" htmlFor="emailTasks">
                            Nouvelles tâches assignées
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="emailComments"
                            checked={notifications.emailComments}
                            onChange={() => handleNotificationChange("emailComments")}
                          />
                          <label className="form-check-label" htmlFor="emailComments">
                            Nouveaux commentaires
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="emailMentions"
                            checked={notifications.emailMentions}
                            onChange={() => handleNotificationChange("emailMentions")}
                          />
                          <label className="form-check-label" htmlFor="emailMentions">
                            Mentions dans les commentaires
                          </label>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h6 className="mb-3">Notifications push</h6>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="pushTasks"
                            checked={notifications.pushTasks}
                            onChange={() => handleNotificationChange("pushTasks")}
                          />
                          <label className="form-check-label" htmlFor="pushTasks">
                            Nouvelles tâches assignées
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="pushComments"
                            checked={notifications.pushComments}
                            onChange={() => handleNotificationChange("pushComments")}
                          />
                          <label className="form-check-label" htmlFor="pushComments">
                            Nouveaux commentaires
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="pushMentions"
                            checked={notifications.pushMentions}
                            onChange={() => handleNotificationChange("pushMentions")}
                          />
                          <label className="form-check-label" htmlFor="pushMentions">
                            Mentions dans les commentaires
                          </label>
                        </div>
                      </div>

                      <button className="btn btn-primary">Enregistrer les préférences</button>
                    </div>
                  )}

                  {activeTab === "security" && (
                    <div>
                      <h5 className="mb-4">Sécurité du compte</h5>

                      <div className="mb-4">
                        <h6 className="mb-3">Changer le mot de passe</h6>
                        <form>
                          <div className="mb-3">
                            <label htmlFor="currentPassword" className="form-label">
                              Mot de passe actuel
                            </label>
                            <input type="password" className="form-control" id="currentPassword" required />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">
                              Nouveau mot de passe
                            </label>
                            <input type="password" className="form-control" id="newPassword" required />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="confirmNewPassword" className="form-label">
                              Confirmer le nouveau mot de passe
                            </label>
                            <input type="password" className="form-control" id="confirmNewPassword" required />
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Changer le mot de passe
                          </button>
                        </form>
                      </div>

                      <div className="mb-4">
                        <h6 className="mb-3">Authentification à deux facteurs</h6>
                        <div className="d-flex justify-content-between align-items-center p-3 border rounded">
                          <div>
                            <strong>Authentification à deux facteurs</strong>
                            <p className="mb-0 text-muted small">
                              Ajoutez une couche de sécurité supplémentaire à votre compte
                            </p>
                          </div>
                          <button className="btn btn-outline-primary">Activer</button>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h6 className="mb-3">Sessions actives</h6>
                        <div className="list-group">
                          <div className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <strong>Session actuelle</strong>
                              <p className="mb-0 text-muted small">Chrome sur Windows • Paris, France</p>
                            </div>
                            <span className="badge bg-success">Actuelle</span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <strong>Mobile</strong>
                              <p className="mb-0 text-muted small">Safari sur iPhone • Il y a 2 jours</p>
                            </div>
                            <button className="btn btn-sm btn-outline-danger">Déconnecter</button>
                          </div>
                        </div>
                      </div>

                      <div className="alert alert-danger">
                        <h6 className="alert-heading">Zone de danger</h6>
                        <p className="mb-2">
                          Une fois que vous supprimez votre compte, il n'y a pas de retour en arrière. Soyez certain.
                        </p>
                        <button className="btn btn-danger">Supprimer mon compte</button>
                      </div>
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
