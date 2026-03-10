/* ============================================
   TRAVILA — Pages JavaScript
   (Search Results, Tour Detail, Booking, Confirmation)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Detail Page Tabs ----
    const dtabs = document.querySelectorAll('.dtab');
    const dtabContents = document.querySelectorAll('.dtab-content');

    dtabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            dtabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            dtabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === 'tab-' + target) {
                    content.classList.add('active');
                }
            });
        });
    });

    // ---- Price Range Slider ----
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (priceRange && priceValue) {
        priceRange.addEventListener('input', () => {
            priceValue.textContent = '$' + parseInt(priceRange.value).toLocaleString();
        });
    }

    // ---- Grid/List View Toggle ----
    const viewBtns = document.querySelectorAll('.view-btn');
    const resultsGrid = document.getElementById('resultsGrid');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (resultsGrid) {
                const view = btn.dataset.view;
                if (view === 'list') {
                    resultsGrid.style.gridTemplateColumns = '1fr';
                } else {
                    resultsGrid.style.gridTemplateColumns = '';
                }
            }
        });
    });

    // ---- Payment Method Toggle ----
    const paymentOptions = document.querySelectorAll('.payment-option');
    const cardFields = document.querySelector('.card-fields');

    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');

            const radio = option.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;

            // Show card fields only for credit card
            if (cardFields) {
                if (option.dataset.method === 'card') {
                    cardFields.classList.add('visible');
                } else {
                    cardFields.classList.remove('visible');
                }
            }
        });
    });

    // ---- Booking Form Submission ----
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Backend integration point
            window.location.href = 'confirmation.html';
        });
    }

});
