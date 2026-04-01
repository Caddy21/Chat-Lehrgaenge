// ==UserScript==
// @name         [LSS] 64 - Verbandsgebäude Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fügt einen Button "Gebäude" in der Gebäudeübersicht ein
// @author       Caddy21
// @match        https://www.leitstellenspiel.de/*
// @match        https://polizei.leitstellenspiel.de/*
// @icon         https://github.com/Caddy21/-docs-assets-css/raw/main/yoshi_icon__by_josecapes_dgqbro3-fullview.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Funktion zum Einfügen des Buttons
    function addGebaeudeButton() {
        const header = document.getElementById('chat_panel_heading');
        if (!header) return;

        // Verhindern, dass doppelt eingefügt wird
        if (document.getElementById('verband_gebaeude') || document.getElementById('schooling')) return;

        // Container für unsere Buttons
        const wrapper = document.createElement('div');
        wrapper.style.display = 'inline-flex';
        wrapper.style.gap = '5px';
        wrapper.style.marginLeft = '10px';

        // Verbandsgebäude Button
        const gebaeudeButton = document.createElement('a');
        gebaeudeButton.className = 'btn btn-xs btn-default';
        gebaeudeButton.href = '#';
        gebaeudeButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('a[href="/verband/gebauede"]')?.click();
        });
        gebaeudeButton.id = 'verband_gebaeude';
        gebaeudeButton.textContent = 'Verbandsgebäude';

        // Verbandslehrgänge Button
        const lehrgangButton = document.createElement('a');
        lehrgangButton.className = 'btn btn-xs btn-default';
        lehrgangButton.href = '#';
        lehrgangButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('a[href="/schoolings"]')?.click();
        });
        lehrgangButton.id = 'schooling';
        lehrgangButton.textContent = 'Lehrgänge';

        // Buttons rein
        wrapper.appendChild(gebaeudeButton);
        wrapper.appendChild(lehrgangButton);

        // 👉 Direkt hinter "Chat" einfügen
        // Wir hängen uns einfach ans Textnode ran
        const textNode = Array.from(header.childNodes)
        .find(node => node.nodeType === Node.TEXT_NODE && node.textContent.includes('Chat'));

        if (textNode) {
            textNode.after(wrapper);
        } else {
            // Fallback: einfach anhängen
            header.appendChild(wrapper);
        }
    }

    // Script immer wieder versuchen, bis die Seite geladen ist
    const interval = setInterval(() => {
        if (document.readyState === 'complete') {
            addGebaeudeButton();
            clearInterval(interval);
        }
    }, 500);
})();
