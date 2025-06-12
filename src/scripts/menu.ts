// ****************************** JS script for menu toggle ****************************** //

const toggle = document.getElementById('menu-toggle')
const menu = document.getElementById('mobile-menu')

if (toggle && menu) {
    const lines = toggle.querySelectorAll('.line')

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.contains('right-0')

        // Toggle visibility
        menu.classList.toggle('right-0')
        menu.classList.toggle('right-[-100%]')

        // Animate the lines (turn into X)
        lines[0].classList.toggle('rotate-45')
        lines[0].classList.toggle('absolute')
        lines[0].classList.toggle('top-1/2')

        lines[1].classList.toggle('opacity-0')
        lines[1].classList.toggle('absolute')
        lines[1].classList.toggle('top-1/2')

        lines[2].classList.toggle('-rotate-45')
        lines[2].classList.toggle('absolute')
        lines[2].classList.toggle('top-1/2')
    })

    // Close menu when clicking on a link
    document.querySelectorAll('#mobile-menu a').forEach((link) => {
        link.addEventListener('click', () => {
            menu.classList.remove('right-0')
            menu.classList.add('right-[-100%]')
            lines.forEach((line) => {
                line.classList.remove(
                    'rotate-45',
                    '-rotate-45',
                    'absolute',
                    'top-1/2',
                    'opacity-0'
                )
            })
        })
    })
}
