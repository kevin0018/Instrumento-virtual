/**
 * OrientationBanner - Componente reutilizable para mostrar un banner
 * que recomienda girar el dispositivo si está en móvil y en orientación vertical.
 *
 * Uso:
 * import OrientationBanner from './components/OrientationBanner.js';
 * const banner = new OrientationBanner();
 * banner.mount(); // Llamar una vez al iniciar la app
 */
export default class OrientationBanner {
    /**
     * @param {Object} options - Configuración opcional
     * @param {string} options.message - Mensaje a mostrar en el banner
     * @param {string} options.id - ID del banner (por si hay varios)
     */
    constructor(options = {}) {
        this.bannerId = options.id || 'rotate-banner';
        this.closeBtnId = options.closeBtnId || 'close-rotate-banner';
        this.message = options.message || '';
        this.isMounted = false;
    }

    // Metodo para montar el banner en el DOM y activar listeners
    mount() {
        if (this.isMounted) return;
        this._injectStyles();
        this._createBanner();
        this._addListeners();
        this.isMounted = true;
    }

    // Metodo para desmontar el banner y limpiar listeners
    unmount() {
        const banner = document.getElementById(this.bannerId);
        if (banner) banner.remove();
        this._removeListeners();
        this.isMounted = false;
    }

    // Detecta si es dispositivo móvil
    _isMobileDevice() {
        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);
    }

    // Muestra u oculta el banner según la orientación
    _updateBannerVisibility = () => {
        const banner = document.getElementById(this.bannerId);
        if (!banner) return;
        if (this._isMobileDevice() && window.matchMedia("(orientation: portrait)").matches) {
            banner.style.display = "flex";
        } else {
            banner.style.display = "none";
        }
    };

    // Crea el banner en el DOM si no existe
    _createBanner() {
        if (document.getElementById(this.bannerId)) return;
        const banner = document.createElement('div');
        banner.id = this.bannerId;
        banner.className = 'rotate-banner';
        banner.style.display = 'none';
        banner.innerHTML = `
            <span>${this.message}</span>
            <button id="${this.closeBtnId}" aria-label="Cerrar banner">✖</button>
        `;
        document.body.appendChild(banner);

        // Listener para cerrar el banner
        document.getElementById(this.closeBtnId).onclick = () => {
            banner.style.display = 'none';
        };
    }

    // Inyecta los estilos CSS del banner si no existen
    _injectStyles() {
        if (document.getElementById('rotate-banner-styles')) return;
        const style = document.createElement('style');
        style.id = 'rotate-banner-styles';
        style.textContent = `
            .rotate-banner {
                display: flex;
                align-items: center;
                justify-content: center;
                position: fixed;
                left: 0; right: 0; bottom: 0;
                background: #ffe0b2;
                color: #6d3c11;
                font-family: "Bad Script", cursive;
                font-size: 1rem;
                padding: 16px 10px 10px 10px;
                z-index: 1000;
                border-radius: 12px 12px 0 0;
                box-shadow: 0 -2px 8px #0001;
                gap: 20px;
            }
            .rotate-banner button {
                background: transparent;
                border: none;
                font-size: 1.2rem;
                color: #6d3c11;
                cursor: pointer;
                margin-left: 20px;
            }
            @media (min-width: 769px) {
                .rotate-banner {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Agrega listeners de orientación y resize
    _addListeners() {
        this._boundUpdate = this._updateBannerVisibility.bind(this);
        window.addEventListener("DOMContentLoaded", this._boundUpdate);
        window.addEventListener("orientationchange", this._boundUpdate);
        window.matchMedia("(orientation: portrait)").addEventListener("change", this._boundUpdate);
        window.addEventListener("resize", this._boundUpdate);
    }

    // Limpia listeners
    _removeListeners() {
        window.removeEventListener("DOMContentLoaded", this._boundUpdate);
        window.removeEventListener("orientationchange", this._boundUpdate);
        window.matchMedia("(orientation: portrait)").removeEventListener("change", this._boundUpdate);
        window.removeEventListener("resize", this._boundUpdate);
    }
}