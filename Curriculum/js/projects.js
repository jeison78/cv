

async function obtenerPortafolioJSON() {
    try {
        const response = await fetch('portafolio.json');
        const data = await response.json();
        data.reverse();
        const body = document.querySelector('.portfolio-grid');
        data.forEach(project => {
            const {  category_group, img, alt, title, href, category} = project
            const categoryObjet = Object.values(category_group);
            const figure = document.createElement("FIGURE");
            
            figure.classList.add('item', 'lbaudio');
            figure.setAttribute('data-groups', `["${categoryObjet.join('", "') }"]`);
          
            const HTML = `
                <div class="portfolio-item-img">
                    <img src="img/portfolio/${img}" alt="${alt}" title="" />
                    ${href ? `<a href="${href}" class="lightbox mfp-iframe" title="${title}"></a>`: ""}
                </div>

                <h4 class="name">${title}</h4>
                <span class="category">${category}</span>
            `
            figure.innerHTML = HTML;
            body.appendChild(figure)
            
        });        
    } catch (error) {
        console.error("Error", error);
    }
}

obtenerPortafolioJSON();