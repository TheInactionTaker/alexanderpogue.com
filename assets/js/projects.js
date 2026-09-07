(function () {
    var filters = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
    var cards = Array.prototype.slice.call(document.querySelectorAll('.project-card'));
    var emptyMessage = document.getElementById('project-grid-empty');

    function applyFilters() {
        var hidden = {};
        filters.forEach(function (filter) {
            if (filter.checked) {
                hidden[filter.getAttribute('data-filter')] = true;
            }
        });

        var visible = 0;

        cards.forEach(function (card) {
            var isUnreleased = card.getAttribute('data-released') === 'false';
            var hide = hidden[card.getAttribute('data-type')] === true ||
                (hidden.unreleased === true && isUnreleased);

            card.classList.toggle('is-hidden', hide);
            if (!hide) {
                visible++;
            }
        });

        emptyMessage.hidden = visible > 0;
    }

    filters.forEach(function (filter) {
        filter.addEventListener('change', applyFilters);
    });

    applyFilters();
})();
