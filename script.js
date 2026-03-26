// script.js

// Assurez-vous que EmailJS est chargé dans votre HTML avant ce script
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/dist/email.min.js"></script>

// Initialisation avec votre clé publique EmailJS
emailjs.init("HeO1_mAy0qgr_5xfd"); // Remplacez par votre clé publique

document.addEventListener("DOMContentLoaded", function () {
  // Sélection du formulaire
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Envoi du formulaire via EmailJS
    emailjs.sendForm(
      "service_9lfyjgu",   // Ton Service ID
      "template_tz1zt7n",  // Ton Template ID
      this                  // "this" = le formulaire HTML
    ).then(
      function (response) {
        alert("✅ Email envoyé avec succès !");
        console.log("SUCCESS!", response.status, response.text);
        form.reset(); // vide le formulaire après envoi
      },
      function (error) {
        alert("❌ Erreur lors de l'envoi : " + JSON.stringify(error));
        console.error("FAILED...", error);
      }
    );
  });
});