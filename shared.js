/* ============================================================
   MGEC — Creative Shared Scripts  (Estate Edition)
   ============================================================ */

/* ── Estate Room Registry ─────────────────── */
var ESTATE_ROOMS = [
    { key: 'stationery.html',  room: 'The Study',    sub: 'Stationery & Office Equipment', icon: 'fa-pen-ruler',    color: '#2d8f4e', num: '01' },
    { key: 'toiletry.html',    room: 'The Spa',       sub: 'Toiletry Products',             icon: 'fa-pump-soap',    color: '#3b82f6', num: '02' },
    { key: 'construction.html',room: 'The Workshop',  sub: 'Construction Works & Supplies', icon: 'fa-hard-hat',     color: '#ea580c', num: '03' },
    { key: 'plant-hire.html',  room: 'The Garage',    sub: 'Plant Hire & Transport',        icon: 'fa-truck-monster',color: '#ca8a04', num: '04' },
    { key: 'aggregates.html',  room: 'The Quarry',    sub: 'Aggregates Supplies',           icon: 'fa-mountain',     color: '#78716c', num: '05' },
    { key: 'cleaning.html',    room: 'The Laundry',   sub: 'Cleaning Services',             icon: 'fa-broom',        color: '#0891b2', num: '06' }
];

(function () {

    /* ── Scroll Progress Bar ──────────────────── */
    var bar = document.getElementById('scroll-progress');
    if (bar) {
        window.addEventListener('scroll', function () {
            var total = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
        }, { passive: true });
    }

    /* ── Back to Top ──────────────────────────── */
    var btt = document.getElementById('back-to-top');
    if (btt) {
        window.addEventListener('scroll', function () {
            btt.classList.toggle('visible', window.scrollY > 500);
        }, { passive: true });
        btt.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── Animated Counters ────────────────────── */
    var counters = document.querySelectorAll('[data-target]');
    if (counters.length) {
        var cObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting || e.target._counted) return;
                e.target._counted = true;
                var el = e.target, target = parseInt(el.getAttribute('data-target'), 10),
                    suffix = el.getAttribute('data-suffix') || '', dur = 1800, start = performance.now();
                function tick(now) {
                    var p = Math.min((now - start) / dur, 1), ease = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.round(ease * target) + suffix;
                    if (p < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.5 });
        counters.forEach(function (c) { cObs.observe(c); });
    }

    /* ── Typewriter Effect ────────────────────── */
    var tw = document.getElementById('typewriter-text');
    if (tw) {
        var phrases = (tw.getAttribute('data-phrases') || '').split('|').filter(Boolean);
        var pi = 0, ci = 0, del = false;
        function type() {
            var phrase = phrases[pi] || '';
            if (!del) { ci++; tw.textContent = phrase.slice(0, ci); if (ci >= phrase.length) { del = true; setTimeout(type, 2200); return; } }
            else { ci--; tw.textContent = phrase.slice(0, ci); if (ci <= 0) { del = false; pi = (pi + 1) % phrases.length; } }
            setTimeout(type, del ? 55 : 95);
        }
        setTimeout(type, 800);
    }

    /* ── Hero Floating Particles ──────────────── */
    var hero = document.querySelector('section');
    if (hero) {
        for (var i = 0; i < 22; i++) {
            var p = document.createElement('div');
            p.className = 'hero-particle';
            var size = Math.random() * 7 + 4;
            p.style.cssText = 'left:' + (Math.random()*100) + '%;bottom:-20px;width:' + size + 'px;height:' + size + 'px;animation-duration:' + (Math.random()*12+9) + 's;animation-delay:' + (Math.random()*12) + 's;';
            hero.appendChild(p);
        }
    }

    /* ── Stagger Scroll Cards ─────────────────── */
    document.querySelectorAll('[data-stagger]').forEach(function (group) {
        Array.from(group.children).forEach(function (child, i) {
            child.classList.add('scroll-animate');
            if (i < 6) child.classList.add('stagger-' + (i + 1));
        });
    });

    /* ============================================================
       ESTATE — Room Page Detection & Injection
       ============================================================ */
    var page = window.location.pathname.split('/').pop() || 'index.html';
    var roomIndex = -1, currentRoom = null;
    ESTATE_ROOMS.forEach(function (r, i) {
        if (r.key === page) { currentRoom = r; roomIndex = i; }
    });

    if (!currentRoom) return; /* Not a room page — nothing more to do */

    /* ── 1. Inject Room Hero Badge ────────────── */
    var heroTextBlock = document.querySelector('section .text-center.text-white');
    if (heroTextBlock) {
        /* Badge above icon */
        var badge = document.createElement('div');
        badge.className = 'room-hero-badge';
        badge.innerHTML = 'MGEC Estate &nbsp;·&nbsp; Room ' + currentRoom.num;
        heroTextBlock.insertBefore(badge, heroTextBlock.firstChild);

        /* Room name in room colour, under h1 */
        var h1 = heroTextBlock.querySelector('h1');
        if (h1) {
            var roomName = document.createElement('p');
            roomName.className = 'room-hero-name';
            roomName.style.color = currentRoom.color;
            roomName.textContent = '— ' + currentRoom.room + ' —';
            h1.parentNode.insertBefore(roomName, h1.nextSibling);
        }
    }

    /* ── 2. Inject Breadcrumb Banner ──────────── */
    var firstSection = document.querySelector('section');
    if (firstSection) {
        var prev = ESTATE_ROOMS[(roomIndex + ESTATE_ROOMS.length - 1) % ESTATE_ROOMS.length];
        var next = ESTATE_ROOMS[(roomIndex + 1) % ESTATE_ROOMS.length];

        var banner = document.createElement('nav');
        banner.className = 'room-welcome-banner';
        banner.setAttribute('aria-label', 'Estate navigation');
        banner.innerHTML =
            '<div class="room-welcome-crumb">' +
                '<i class="fas fa-home" style="color:#2d8f4e;font-size:13px;"></i>' +
                '<a href="index.html">MGEC Estate</a>' +
                '<span class="crumb-sep">›</span>' +
                '<span class="crumb-room" style="color:' + currentRoom.color + '">' +
                    '<i class="fas ' + currentRoom.icon + '" style="margin-right:5px;"></i>' + currentRoom.room +
                '</span>' +
                '<span class="crumb-sep" style="margin:0 2px;">·</span>' +
                '<span style="font-size:11px;color:#9ca3af;">' + currentRoom.sub + '</span>' +
            '</div>' +
            '<div class="room-welcome-nav">' +
                '<a href="' + prev.key + '"><i class="fas fa-chevron-left"></i> ' + prev.room + '</a>' +
                '<a href="' + next.key + '">' + next.room + ' <i class="fas fa-chevron-right"></i></a>' +
            '</div>';

        /* Insert right after the hero section */
        firstSection.parentNode.insertBefore(banner, firstSection.nextSibling);
    }

    /* ── 3. Inject Estate Directory before footer ─ */
    var footer = document.querySelector('footer');
    if (footer) {
        var miniCards = ESTATE_ROOMS.map(function (r) {
            var isCurrent = r.key === page;
            return '<a href="' + r.key + '" class="estate-room-mini' + (isCurrent ? ' current' : '') + '">' +
                (isCurrent ? '<span style="position:absolute;top:8px;right:8px;background:#4caf50;color:#fff;font-size:9px;padding:2px 7px;border-radius:10px;font-family:Poppins,sans-serif;font-weight:700;letter-spacing:.05em;">HERE</span>' : '') +
                '<span class="estate-room-mini-icon" style="color:' + r.color + '"><i class="fas ' + r.icon + '"></i></span>' +
                '<span class="estate-room-mini-name">' + r.room + '</span>' +
                '<span class="estate-room-mini-sub">' + r.sub + '</span>' +
            '</a>';
        }).join('');

        var dir = document.createElement('section');
        dir.className = 'estate-directory';
        dir.innerHTML =
            '<div style="max-width:80rem;margin:0 auto;padding:0 1.5rem;position:relative;z-index:1;">' +
                '<div style="text-align:center;margin-bottom:3rem;">' +
                    '<a href="index.html" class="estate-back-link">' +
                        '<i class="fas fa-home"></i> Back to the MGEC Estate' +
                    '</a>' +
                    '<h2 style="font-family:Poppins,sans-serif;font-size:1.6rem;font-weight:800;color:#fff;margin:16px 0 6px;letter-spacing:.02em;">Explore Other Rooms</h2>' +
                    '<p style="font-family:Poppins,sans-serif;font-size:13px;color:#6b7280;">Every room a world of quality — move freely through the estate</p>' +
                '</div>' +
                '<div class="estate-grid">' + miniCards + '</div>' +
                '<style>' +
                    '.estate-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;}' +
                    '@media(min-width:640px){.estate-grid{grid-template-columns:repeat(3,1fr)}}' +
                    '@media(min-width:1024px){.estate-grid{grid-template-columns:repeat(6,1fr)}}' +
                '</style>' +
            '</div>';

        footer.parentNode.insertBefore(dir, footer);
    }

})();
