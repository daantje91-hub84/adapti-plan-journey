#!/bin/bash
# NEU: Virtuelle Umgebung für das Backend aktivieren
echo ">>> Aktiviere Python venv..."
source project_backend/venv/bin/activate

# Der Rest deines Skripts...
echo ">>> Starte Django Backend-Server..."
# ...
# Dieses Skript startet den Django-Backend-Server und den React-Frontend-Server.

# Setzt die Farbe für die Ausgabe, um sie besser lesbar zu machen
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}>>> Starte Django Backend-Server...${NC}"

# 1. Wechsle in das Backend-Verzeichnis
cd project_backend || exit

# 2. Aktiviere das virtuelle Umfeld
source venv/bin/activate

# 3. Starte den Django-Server im Hintergrund (&)
# Die Ausgabe wird in eine Datei umgeleitet, um das Terminal sauber zu halten
python3 manage.py runserver > ../backend.log 2>&1 &

# 4. Gib die Prozess-ID des Backend-Servers aus, damit wir wissen, dass er läuft
echo -e "${GREEN}>>> Backend-Server läuft im Hintergrund (PID: $!). Log-Datei: backend.log${NC}"

# 5. Wechsle zurück und dann in das Frontend-Verzeichnis
cd ../frontend || exit

echo -e "${GREEN}>>> Starte React Frontend-Server...${NC}"

# 6. Starte den Frontend-Server im Vordergrund
# Dieser Befehl wird das Terminal-Fenster beanspruchen
npm run dev
