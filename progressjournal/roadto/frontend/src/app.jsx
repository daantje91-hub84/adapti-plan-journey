import React, { useState, useEffect } from 'react';

function App() {
  const [projects, setProjects] = useState([]);
  const [isSidenavExpanded, setSidenavExpanded] = useState(false);
  
  // ===================================================================
  // NEU: States für Lade- und Fehlerzustände
  // ===================================================================
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      // Setzt den Ladezustand vor dem Fetch-Aufruf
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8000/api/projects/');
        
        // Prüft, ob die Server-Antwort erfolgreich war
        if (!response.ok) {
          throw new Error(`Netzwerkantwort war nicht OK (Status: ${response.status}). Läuft der Backend-Server?`);
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        // Fängt Netzwerkfehler ab und speichert eine detailliertere Fehlermeldung
        console.error("Fehler beim Laden der Projekte:", error);
        let errorMessage = error.message;
        // Spezifische Fehlermeldung für den häufigen "Failed to fetch"-Fehler
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            errorMessage = 'Die Anfrage an das Backend ist fehlgeschlagen. Mögliche Ursachen:\n\n' +
                           '1. Der Django-Backend-Server läuft nicht auf http://localhost:8000.\n' +
                           '2. Ein Browser-Problem (CORS oder Mixed Content). Wenn diese Seite über HTTPS geladen wird, blockiert der Browser Anfragen an ein HTTP-Backend. Stelle sicher, dass beide über HTTP laufen.';
        }
        setError(errorMessage);
      } finally {
        // Setzt den Ladezustand zurück, egal ob erfolgreich oder nicht
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setSidenavExpanded(true);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('sidenav-expanded', isSidenavExpanded);
  }, [isSidenavExpanded]);

  // Funktion zum Rendern des Hauptinhalts basierend auf Lade- und Fehlerzustand
  const renderMainContent = () => {
    if (isLoading) {
      return <p>Lade Projekte vom Backend...</p>;
    }

    if (error) {
      return (
        <div className="error-message" style={{ textAlign: 'left', background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #ff4d4f' }}>
          <h2 style={{color: '#cf1322'}}>Fehler beim Laden der Daten</h2>
          <p>Es konnte keine Verbindung zum Backend hergestellt werden. Bitte überprüfe die folgenden Punkte:</p>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#fff0f6', padding: '10px', borderRadius: '6px', marginTop: '10px' }}>{error}</pre>
        </div>
      );
    }

    return (
      <div className="projects-grid">
        {projects.map(project => (
          <a href="#" className="project-card" key={project.id}>
            <div className="card-header">
              <h2 className="project-title">{project.name}</h2>
              <span className="material-icons card-menu">more_vert</span>
            </div>
            <div className="card-body">
              <p className="next-milestone">NÄCHSTER MEILENSTEIN:</p>
              <p className="milestone-title">{project.milestones && project.milestones.length > 0 ? project.milestones[0].name : 'Noch keine Meilensteine'}</p>
            </div>
            <div className="card-footer">
              <div className="progress-info">
                <span className="progress-label">Fortschritt</span>
                <span className="progress-percent">0%</span>
              </div>
              <div className="card-progress-bar">
                <div className="card-progress-fill" style={{ width: `0%` }}></div>
              </div>
            </div>
          </a>
        ))}
        <div className="project-card-placeholder">
          <span className="material-icons">add_circle_outline</span>
          <span>Neues Projekt hinzufügen</span>
        </div>
      </div>
    );
  };

  return (
    <div className="app-body">
      {/* Header und Navigation bleiben unverändert */}
      <header className="app-header">
        <div className="header-left">
          <span className="material-icons hamburger-menu" onClick={() => setSidenavExpanded(!isSidenavExpanded)}>menu</span>
          <a href="#" className="app-header__logo">
            <div className="icon"><span className="material-icons">trending_up</span></div>
            <span className="text">Progress</span>
          </a>
        </div>
        <div className="app-header__actions">
          <button className="quick-add-btn" title="Schnell hinzufügen">
            <span className="material-icons">add</span>
          </button>
          <span className="material-icons">search</span>
          <span className="material-icons">notifications</span>
          <span className="material-icons">account_circle</span>
        </div>
      </header>

      <nav className="app-nav">
        <a href="#" className="nav-item active"><span className="material-icons">space_dashboard</span><span className="nav-text">Dashboard</span></a>
        <a href="#" className="nav-item"><span className="material-icons">inbox</span><span className="nav-text">Inbox</span></a>
        <a href="#" className="nav-item"><span className="material-icons">today</span><span className="nav-text">Heute</span></a>
        <a href="#" className="nav-item"><span className="material-icons">topic</span><span className="nav-text">Projekte</span></a>
        <a href="#" className="nav-item"><span className="material-icons">timeline</span><span className="nav-text">Timeline</span></a>
        <a href="#" className="nav-item"><span className="material-icons">settings</span><span className="nav-text">Einstellungen</span></a>
      </nav>

      <main className="main-content">
        <div className="dashboard-header">
            <h1>Dashboard</h1>
            <a href="#" className="button-cta">
                <span className="material-icons">add</span>
                Neues Projekt
            </a>
        </div>
        {/* Hier wird die neue Render-Logik aufgerufen */}
        {renderMainContent()}
      </main>
    </div>
  );
}

export default App;
