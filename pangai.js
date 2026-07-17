// Name: Deprecated Warning (with close)
// ID: pangaiDeprecated
// Description: Warns users that the extension is deprecated and provides the new link, closable after 15s.
// License: MIT

(function (Scratch) {
  "use strict";

  class DeprecatedExtension {
    constructor() {
      this._showAlert();
    }

    getInfo() {
      return {
        id: "pangaiDeprecated",
        name: "Deprecated Notice",
        blocks: []
      };
    }

    _showAlert() {
      // Evitar duplicados si la extensión se carga más de una vez
      if (document.getElementById("pangai-dep-warning")) return;

      const overlay = document.createElement("div");
      overlay.id = "pangai-dep-warning";
      
      // Estilos para forzar la pantalla completa sobre todo el proyecto
      Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#111111",
        color: "#ffffff",
        zIndex: "999999",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
        boxSizing: "border-box"
      });

      // Estructura interna del aviso con el contenedor del botón
      overlay.innerHTML = `
        <div style="max-width: 600px; background: #222222; padding: 40px; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.5); border: 2px solid #ff4444; display: flex; flexDirection: column; align-items: center;">
          <h1 style="color: #ff4444; margin-top: 0; font-size: 28px; margin-bottom: 20px;">You are using a deprecated extension.</h1>
          <p style="font-size: 18px; line-height: 1.6; color: #dddddd; margin-bottom: 25px;">
            You need to change your PangAI link to:
          </p>
          <div style="background: #111111; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 14px; border: 1px solid #444444; word-break: break-all; user-select: all; color: #00ffcc; margin-bottom: 30px; width: 100%; box-sizing: border-box;">
            https://logise1.github.io/pangai/pangai.js
          </div>
          <button id="pangai-close-btn" disabled style="background: #333333; color: #888888; border: 1px solid #444444; padding: 12px 24px; font-size: 16px; font-weight: bold; border-radius: 6px; cursor: not-allowed; transition: all 0.2s ease;">
            Wait 15s to close
          </button>
        </div>
      `;

      // Inyectar en el documento
      if (document.body) {
        document.body.appendChild(overlay);
      } else {
        window.addEventListener("DOMContentLoaded", () => {
          document.body.appendChild(overlay);
        });
      }

      // Lógica de la cuenta atrás y desbloqueo del botón
      let timeLeft = 15;
      const closeBtn = overlay.querySelector("#pangai-close-btn");

      const countdown = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
          closeBtn.textContent = `Wait ${timeLeft}s to close`;
        } else {
          clearInterval(countdown);
          
          // Activar botón con estilos visuales interactivos
          closeBtn.disabled = false;
          closeBtn.textContent = "Close and Continue";
          Object.assign(closeBtn.style, {
            backgroundColor: "#ff4444",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(255, 68, 68, 0.3)"
          });

          // Efecto hover simple por JS para mantener todo en un solo archivo
          closeBtn.onmouseenter = () => closeBtn.style.backgroundColor = "#ff2222";
          closeBtn.onmouseleave = () => closeBtn.style.backgroundColor = "#ff4444";

          // Evento para remover el overlay al hacer clic
          closeBtn.onclick = () => {
            overlay.remove();
          };
        }
      }, 1000);
    }
  }

  Scratch.extensions.register(new DeprecatedExtension());
})(Scratch);
