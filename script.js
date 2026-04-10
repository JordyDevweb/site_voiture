// script.js

// Initialisation d'EmailJS avec ta clé publique
emailjs.init("HeO1_mAy0qgr_5xfd");

// Base de données des véhicules
const carsData = [
  { id: 1, brand: 'BMW', model: 'Série 3', year: 2022, km: '35 000', gearbox: 'Automatique', price: '35 000', category: 'berline', image: './image/BMW.jpg', doors: 5, fuel: 'Hybride Rechargeable', power: '292 ch', description: 'Une berline de luxe alliant dynamisme ultra-sportif et efficacité énergétique. L\'habitacle premium avec son grand double écran vous séduira instantanément.', features: ['Écran tactile 12.3"', 'Sièges en cuir', 'Toit ouvrant panoramique', 'Régulateur de vitesse adaptatif', 'Jantes alliage 18"'] },
  { id: 2, brand: 'Audi', model: 'A4', year: 2021, km: '40 000', gearbox: 'Manuelle', price: '28 000', category: 'berline', image: './image/audi.jpg', doors: 5, fuel: 'Diesel', power: '150 ch', description: 'L\'élégance audacieuse et le confort routier par excellence. Idéale pour les gros rouleurs avec une consommation particulièrement maîtrisée.', features: ['Virtual Cockpit', 'Climatisation auto 3 zones', 'Radars avant et arrière', 'Phares Matrix LED'] },
  { id: 3, brand: 'Mercedes', model: 'Classe A', year: 2023, km: '20 000', gearbox: 'Automatique', price: '30 000', category: 'compacte', image: './image/pexels-auto-2179220_1920.jpg', doors: 5, fuel: 'Essence', power: '163 ch', description: 'La compacte star avec son interface futuriste MBUX à commande vocale intelligente. Un véritable bijou technologique taillé pour la ville.', features: ['Système MBUX', 'Caméra 360°', 'Éclairage d\'ambiance 64 couleurs', 'Aide au maintien dans la voie'] },
  { id: 4, brand: 'Peugeot', model: '3008', year: 2020, km: '50 000', gearbox: 'Manuelle', price: '25 000', category: 'suv', image: './image/Peugeot_yaris.jpg', doors: 5, fuel: 'Diesel', power: '130 ch', description: 'Le SUV familial le plus plébiscité. Son design racé, son poste de conduite novateur i-Cockpit et sa tenue de route sont exceptionnels.', features: ['i-Cockpit Peugeot', 'Jantes alliage diamantées', 'Grip Control', 'Apple CarPlay / Android Auto'] },
  { id: 5, brand: 'Renault', model: 'Clio', year: 2019, km: '60 000', gearbox: 'Manuelle', price: '18 000', category: 'compacte', image: './image/clio.jpg', doors: 5, fuel: 'Essence', power: '90 ch', description: 'Citadine polyvalente et très économique au quotidien. Son habitacle a été entièrement repensé avec des matériaux de qualité et un écran central ergonomique.', features: ['Écran Easy Link', 'Reconnaissance des panneaux', 'Climatisation', 'Régulateur & Limiteur'] },
  { id: 6, brand: 'Toyota', model: 'Yaris', year: 2022, km: '25 000', gearbox: 'Automatique', price: '20 000', category: 'compacte', image: './image/Toyota.jpg', doors: 5, fuel: 'Hybride', power: '116 ch', description: 'La reine de la ville en motorisation hybride auto-rechargeable. Extrêmement fiable, silencieuse et redoutablement économe en carburant.', features: ['Système Hybride HSD', 'Caméra de recul', 'Démarrage sans clé Smart Entry', 'Freinage d\'urgence'] }
];

document.addEventListener("DOMContentLoaded", function () {
  
  // --- 1. Génération dynamique des véhicules ---
  const carsContainer = document.getElementById('cars-container');
  if (carsContainer) {
    carsContainer.innerHTML = ''; // Nettoyer
    carsData.forEach((car, index) => {
      const delay = (index % 3) * 150;
      const cardHtml = `
        <div class="col-md-4 car-item" data-category="${car.category}" data-aos="zoom-in" data-aos-delay="${delay}">
          <div class="card car-card" onclick="openCarModal(${car.id})">
            <img src="${car.image}" alt="${car.brand} ${car.model}">
            <div class="card-body">
              <h5>${car.brand} ${car.model}</h5>
              <p>${car.year} • ${car.km} km</p>
              <h6>${car.price} €</h6>
              <button class="btn btn-dark w-100" onclick="event.stopPropagation(); openCarModal(${car.id})">Réserver / Détails</button>
            </div>
          </div>
        </div>
      `;
      carsContainer.insertAdjacentHTML('beforeend', cardHtml);
    });
  }

  // --- 2. Animations AOS (Base) ---
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.parentElement.setAttribute('data-aos', 'fade-up');
    card.parentElement.setAttribute('data-aos-delay', (index * 150).toString());
  });

  const sectionTitles = document.querySelectorAll('h3');
  sectionTitles.forEach(title => {
    title.setAttribute('data-aos', 'fade-down');
  });

  AOS.init({
    duration: 800,
    once: true,
    offset: 100
  });

  // --- 3. Système de filtres des véhicules ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const carItems = document.querySelectorAll('.car-item');

  const searchInput = document.getElementById('searchInput');

  function applyFilters() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const filterCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let hasVisibleItem = false;
    carItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      const isCategoryMatch = filterCategory === 'all' || itemCategory === filterCategory;
      const carName = item.querySelector('h5').innerText.toLowerCase();
      const isSearchMatch = carName.includes(searchText);

      if (isCategoryMatch && isSearchMatch) {
        if (item.style.display !== 'block') {
           item.style.display = 'block';
           item.classList.remove('aos-animate');
           setTimeout(() => item.classList.add('aos-animate'), 10);
        }
        hasVisibleItem = true;
      } else {
        item.style.display = 'none';
      }
    });
    
    setTimeout(() => AOS.refresh(), 100);
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => {
        b.classList.remove('btn-dark', 'active');
        b.classList.add('btn-outline-dark');
      });
      this.classList.remove('btn-outline-dark');
      this.classList.add('btn-dark', 'active');
      
      applyFilters();
    });
  });

  // --- 4. Bouton Scroll to Top ---
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if(scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- 5. Gestion du Formulaire (Spinner + Toast) ---
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submitBtn");
  const submitSpinner = document.getElementById("submitSpinner");
  const submitBtnText = document.getElementById("submitBtnText");
  const successToast = document.getElementById('successToast');

  if(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // UI Loading State
      if(submitBtn) submitBtn.disabled = true;
      if(submitSpinner) submitSpinner.classList.remove("d-none");
      if(submitBtnText) submitBtnText.innerText = "Envoi...";

      emailjs.sendForm(
        "service_gmccpda",    
        "template_jhrqlql",   
        this                  
      ).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          form.reset();
          
          // Show Bootstap Toast
          if(successToast) {
            const toast = new bootstrap.Toast(successToast);
            toast.show();
          }

        },
        function (error) {
          alert("Erreur lors de l'envoi : " + JSON.stringify(error));
          console.log("FAILED...", error);
        }
      ).finally(() => {
        // Restore UI
        if(submitBtn) submitBtn.disabled = false;
        if(submitSpinner) submitSpinner.classList.add("d-none");
        if(submitBtnText) submitBtnText.innerText = "Envoyer";
      });
    });
  }
});

// --- 6. Fonctions Globales (Accessibles depuis onclick HTML) ---
window.openCarModal = function(id) {
  const car = carsData.find(c => c.id === id);
  if(car) {
    document.getElementById('carModalImage').src = car.image;
    document.getElementById('carModalName').innerText = `${car.brand} ${car.model}`;
    document.getElementById('carModalPrice').innerText = `${car.price} €`;
    document.getElementById('carModalDesc').innerText = car.description;

    // Génération des petits badges
    const badgesHtml = `
      <span class="badge text-bg-light border me-2 mb-2 p-2 px-3 fw-normal shadow-sm"><i class="fas fa-calendar-alt text-warning me-1"></i> ${car.year}</span>
      <span class="badge text-bg-light border me-2 mb-2 p-2 px-3 fw-normal shadow-sm"><i class="fas fa-tachometer-alt text-warning me-1"></i> ${car.km} km</span>
      <span class="badge text-bg-light border me-2 mb-2 p-2 px-3 fw-normal shadow-sm"><i class="fas fa-gas-pump text-warning me-1"></i> ${car.fuel}</span>
      <span class="badge text-bg-light border me-2 mb-2 p-2 px-3 fw-normal shadow-sm"><i class="fas fa-cogs text-warning me-1"></i> ${car.gearbox}</span>
      <span class="badge text-bg-light border me-2 mb-2 p-2 px-3 fw-normal shadow-sm"><i class="fas fa-door-open text-warning me-1"></i> ${car.doors} portes</span>
      <span class="badge text-bg-light border me-2 mb-2 p-2 px-3 fw-normal shadow-sm"><i class="fas fa-bolt text-warning me-1"></i> ${car.power}</span>
    `;
    document.getElementById('carModalBadges').innerHTML = badgesHtml;

    // Génération de la liste des équipements (Features) sur 2 colonnes
    let featuresHtml = '';
    car.features.forEach(feat => {
      featuresHtml += `
        <div class="col-6 mb-2">
          <div class="d-flex align-items-center">
            <i class="fas fa-check text-success me-2 border rounded-circle p-1" style="background: rgba(25, 135, 84, 0.1); font-size: 0.7rem;"></i>
            <span class="text-secondary small fw-medium">${feat}</span>
          </div>
        </div>
      `;
    });
    document.getElementById('carModalFeatures').innerHTML = featuresHtml;
    
    // Attribuer l'action au bouton de la modale
    document.getElementById('carModalReserveBtn').setAttribute('onclick', `reserverDepuisModal('${car.brand} ${car.model}')`);
    
    const modalEl = document.getElementById('carModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
};

window.reserverDepuisModal = function(carName) {
  // Fermer Modale
  const modalEl = document.getElementById('carModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if(modal) modal.hide();

  // Pré-remplir formulaire
  const subjectSelect = document.getElementById('subject');
  if(subjectSelect) subjectSelect.value = "Achat";
  
  const messageField = document.querySelector('textarea[name="message"]');
  if(messageField) {
    messageField.value = `Bonjour,\n\nJe souhaiterais avoir plus d'informations ou réserver le véhicule suivant : ${carName}.\n\nMerci de me recontacter.`;
  }

  // Scroll doux vers contact
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
};