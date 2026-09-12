(function () {
    var dialog = document.getElementById('gallery-lightbox');
    if (!dialog) {
        return;
    }

    var img = dialog.querySelector('.gallery-lightbox-image');
    var caption = dialog.querySelector('.gallery-lightbox-caption');
    var items = document.querySelectorAll('.gallery-item');

    function openItem(item) {
        var thumb = item.querySelector('img');
        img.src = thumb ? thumb.currentSrc || thumb.src : item.getAttribute('href');
        img.alt = thumb ? thumb.alt : '';
        var title = item.getAttribute('data-title');
        caption.textContent = title || '';
        caption.hidden = !title;
        dialog.showModal();

        var fullSrc = item.getAttribute('href');
        if (img.src !== fullSrc) {
            var full = new Image();
            full.onload = function () {
                if (dialog.open) {
                    img.src = fullSrc;
                }
            };
            full.src = fullSrc;
        }
    }

    items.forEach(function (item) {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            openItem(item);
        });
    });

    dialog.addEventListener('click', function (event) {
        if (event.target === dialog || event.target.classList.contains('gallery-lightbox-frame')) {
            dialog.close();
        }
    });

    dialog.addEventListener('close', function () {
        img.removeAttribute('src');
        img.alt = '';
    });
})();
