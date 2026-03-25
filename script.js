async function gerarNovoHash() {
    const senha = document.getElementById('input-senha').value;
    if (!senha) return alert("Por favor, digita uma senha!");

    // Gerar SHA-256
    const msgUint8 = new TextEncoder().encode(senha);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Mostrar resultado
    document.getElementById('resultado-container').style.display = 'block';
    document.getElementById('hash-result').innerText = hashHex;
    document.getElementById('feedback').style.display = 'none';
}

function copiarHash() {
    const hashText = document.getElementById('hash-result').innerText;
    
    navigator.clipboard.writeText(hashText).then(() => {
        const feedback = document.getElementById('feedback');
        feedback.style.display = 'block';
        
        // Mudar texto do botão temporariamente
        const btn = document.getElementById('btn-copiar');
        const originalText = btn.innerText;
        btn.innerText = "Copiado!";
        btn.style.background = "#28a745";

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "#444";
        }, 2000);
    });
}
