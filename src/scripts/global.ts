// Masquer le loader une fois tout est prêt
window.addEventListener('load', () => {
    const loader = document.getElementById('global-loader')
    if (loader) loader.style.display = 'none'
})
