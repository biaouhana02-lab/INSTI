const images = [
  { src: "20ans.jpeg", link: "https://www.gouv.bj/article/1687/celebration-20-annees-existence-insti-lokossa-organise-premieres-journees-scientifiques/" },
  { src: "gaz2.jpg", link: "https://www.facebook.com/100076209937678/posts/pfbid0v6MWiDgLnGk45K5YBQzATjN2d19DnogjfV3rxsDe13m6UaLmLJraFH2aVzpVui8Fl/" },
  { src: "actpeda (8)", link: "https://insti.edu.bj/" },
  { src: "gaz3.jpg", link: "https://www.facebook.com/Gazettedutechnoinsti" },
  { src: "unstiminsti.jpg", link: "https://www.facebook.com/share/p/1F5WzRuYbU/" },
  { src: "actpeda (20).jpg", link: "https://insti.edu.bj/" },
  { src: "actpeda (21).jpg", link: "https://insti.edu.bj/" },
  

];

const carousel = document.querySelector('.carousel');
let current = 0;


const buttons = document.querySelectorAll('.button');

const img = document.querySelectorAll(".detail img");
let zoomed = false;

buttons.forEach(button => {

  button.addEventListener('mouseover', () => {
    button.style.transform = 'scale(1.2)';
    button.style.transition = 'transform 0.3s';
  });

  button.addEventListener('mouseout', () => {
    button.style.transform = 'scale(1)';
  });

  button.addEventListener('click', () => {
    window.location.href = 'enregistrement.html';
    alert("Enregistrez-vous avant de vous inscrire.");
  });
});



// Fonction pour afficher l'image active
function showImage(index) {
  carousel.innerHTML = `<a href="${images[index].link}"><img src="${images[index].src}" alt="Image ${index + 1}" style="width:100%;height:100%;object-fit:cover;"></a>`;
}

// Afficher la première image
showImage(current);

// Défilement automatique toutes les 3 secondes
setInterval(() => {
  current = (current + 1) % images.length;
  showImage(current);
}, 3000);


function animateValue(el, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));

  let timer = setInterval(function () {
    current += increment;
    el.textContent = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Sélectionner tous les nombres et lancer l'animation
document.querySelectorAll(".number").forEach(num => {
  let target = parseInt(num.getAttribute("data-target"));
  animateValue(num, 0, target, 2000); // 2 secondes
});



img.forEach(element => {


  function zoomerImage() {
    img.style.transform = "scale(1.5)";
    zoomed = true;
  }

  function dezoomerImage() {
    img.style.transform = "scale(1)";
    zoomed = false;
  }


  img.addEventListener("mouseover", zoomerImage);
  img, addEventListener("mouseout", dezoomerImage);
});




// Générer les bâtiments (A à L)
const batimentSelect = document.getElementById('batiment');
const cabineSelect = document.getElementById('cabine');
const batiments = {};
const lettres = "ABCDEFGHIJKL";

for (let i = 0; i < lettres.length; i++) {
  let opt = document.createElement("option");
  opt.value = lettres[i];
  opt.textContent = "Bâtiment " + lettres[i];
  batimentSelect.appendChild(opt);

  // chaque bâtiment a 6 cabines libres
  batiments[lettres[i]] = [true, true, true, true, true, true];
}

// Charger cabines dispo selon bâtiment choisi
batimentSelect.addEventListener("change", () => {
  cabineSelect.innerHTML = '<option value="">-- Choisir une cabine --</option>';
  let b = batimentSelect.value;
  if (b) {
    batiments[b].forEach((dispo, i) => {
      let opt = document.createElement("option");
      opt.value = i;
      opt.textContent = "Cabine " + (i + 1) + (dispo ? "" : " (indisponible)");
      opt.disabled = !dispo;
      cabineSelect.appendChild(opt);
    });
  }
});

let reservations = []; // tableau des réservations

// Soumission réservation
document.getElementById("reservationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let nom = document.getElementById("nom").value;
  let email = document.getElementById("email").value;
  let matricule = document.getElementById("matricule").value;
  let b = batimentSelect.value;
  let c = cabineSelect.value;

  if (!b || c === "") {
    alert(" Veuillez choisir un bâtiment et une cabine disponible.");
    return;
  }

  if (!batiments[b][c]) {
    alert("Cette cabine est déjà réservée !");
    return;
  }

  // Marquer cabine comme réservée
  batiments[b][c] = false;
  reservations.push({ nom, email, matricule, batiment: b, cabine: c });

  alert(`✅ Réservation confirmée !\n\nNom: ${nom}\nBâtiment: ${b}\nCabine: ${parseInt(c) + 1}\nPaiement: 500 F`);

  // recharger options
  batimentSelect.dispatchEvent(new Event("change"));
});

// Annuler réservation
document.getElementById("annulerBtn").addEventListener("click", () => {
  let matricule = document.getElementById("matricule").value;
  if (!matricule) {
    alert("Entrez votre matricule pour annuler une réservation.");
    return;
  }

  let index = reservations.findIndex(r => r.matricule === matricule);
  if (index === -1) {
    alert("Aucune réservation trouvée avec ce matricule.");
    return;
  }

  let r = reservations[index];
  batiments[r.batiment][r.cabine] = true; // libérer la cabine
  reservations.splice(index, 1);

  alert(`❌ Réservation annulée.\n\nNom: ${r.nom}\nBâtiment: ${r.batiment}\nCabine: ${parseInt(r.cabine) + 1}`);

  batimentSelect.dispatchEvent(new Event("change"));
  localStorage.setItem("reservation", JSON.stringify(reservation));

  // Redirection vers page paiement
  window.location.href = "paiement.html";
});



// Redirection automatique après enregistrement
window.location.href = "https://insti.bj/preinscription";


