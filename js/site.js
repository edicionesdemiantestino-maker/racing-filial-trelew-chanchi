;(function () {
  'use strict'

  function fg(cat, btn) {
    document.querySelectorAll('.g-t').forEach(function (t) {
      t.classList.remove('on')
    })
    btn.classList.add('on')
    document.querySelectorAll('.gi').forEach(function (i) {
      var show = cat === 'todos' || i.dataset.cat === cat
      i.style.display = show ? '' : 'none'
    })
  }

  window.fg = fg

  var nav = document.getElementById('site-nav')
  var toggle = document.getElementById('nav-toggle')
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open')
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
    })
    nav.querySelectorAll('.nav-menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.matchMedia('(max-width:960px)').matches) {
          nav.classList.remove('nav-open')
          toggle.setAttribute('aria-expanded', 'false')
        }
      })
    })
  }

  window.notifyInterest = function () {
    var input = document.querySelector('.notify input[type="email"]')
    var email = input && input.value.trim()
    if (!email || email.indexOf('@') < 1) {
      window.alert('Dejanos un email válido y te avisamos cuando esté el alta online.')
      return
    }
    window.alert('¡Gracias! Te avisamos cuando el sistema esté activo.')
    input.value = ''
  }

  var dock = document.getElementById('fab-dock')
  var spotifyBackdrop = document.getElementById('fab-spotify-backdrop')
  var spotifyPanel = document.getElementById('fab-spotify-panel')
  var spotifyIframe = document.getElementById('fab-spotify-iframe')
  var spotifyToggle = document.getElementById('fab-spotify-toggle')
  var spotifyCloseBtn = document.getElementById('fab-spotify-close')

  function isFabSpotifyWide() {
    return window.matchMedia('(max-width: 960px)').matches
  }

  function spotifyBackdropSync() {
    if (!spotifyBackdrop) return
    if (!spotifyPanel || spotifyPanel.hasAttribute('hidden')) {
      spotifyBackdrop.hidden = true
      spotifyBackdrop.setAttribute('aria-hidden', 'true')
    } else {
      spotifyBackdrop.hidden = false
      spotifyBackdrop.setAttribute('aria-hidden', 'false')
    }
  }

  function spotifyToggleUi(open) {
    if (!spotifyToggle) return
    spotifyToggle.setAttribute('aria-expanded', open ? 'true' : 'false')
    if (open) spotifyToggle.classList.add('is-on')
    else spotifyToggle.classList.remove('is-on')
    if (dock) {
      if (open) dock.classList.add('fab-dock--spotify-open')
      else dock.classList.remove('fab-dock--spotify-open')
    }
    if (isFabSpotifyWide()) {
      document.body.style.overflow = open ? 'hidden' : ''
    }
  }

  /** Cierra Spotify: iframe sin src = se corta reproducción; panel y backdrop fuera del flujo. */
  function fabSpotifyClose() {
    if (!spotifyIframe || !spotifyPanel) return
    spotifyIframe.removeAttribute('src')
    spotifyPanel.hidden = true
    spotifyPanel.setAttribute('hidden', '')
    spotifyBackdropSync()
    spotifyToggleUi(false)
    document.body.style.overflow = ''
  }

  function fabSpotifyOpen() {
    if (!spotifyPanel || !spotifyIframe) return
    var u = spotifyIframe.getAttribute('data-src')
    if (u) spotifyIframe.setAttribute('src', u)
    spotifyPanel.hidden = false
    spotifyPanel.removeAttribute('hidden')
    spotifyBackdropSync()
    spotifyToggleUi(true)
    if (isFabSpotifyWide()) {
      document.body.style.overflow = 'hidden'
    }
  }

  /** Primer clic: abre embed. Segundo clic (mismo botón): cierra y frena por completo. */
  function fabSpotifyToggle() {
    if (!spotifyPanel) return
    if (spotifyPanel.hasAttribute('hidden')) fabSpotifyOpen()
    else fabSpotifyClose()
  }

  if (spotifyToggle && spotifyPanel) {
    spotifyToggle.addEventListener('click', function (ev) {
      ev.stopPropagation()
      fabSpotifyToggle()
    })
  }

  if (spotifyCloseBtn) {
    spotifyCloseBtn.addEventListener('click', function (ev) {
      ev.stopPropagation()
      fabSpotifyClose()
    })
  }

  if (spotifyBackdrop) {
    spotifyBackdrop.addEventListener('click', fabSpotifyClose)
  }

  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Escape' && ev.key !== 'Esc') return
    if (!spotifyPanel || spotifyPanel.hasAttribute('hidden')) return
    fabSpotifyClose()
  })

  if (spotifyPanel && spotifyPanel.hasAttribute('hidden')) {
    fabSpotifyClose()
  }

  function externalLinksOpenNewTab() {
    var here = ''
    try {
      here = window.location.hostname
    } catch (e) {
      return
    }
    document.querySelectorAll('a[href]').forEach(function (a) {
      if (a.hasAttribute('data-same-tab')) return
      if (a.hasAttribute('download')) return
      var h = a.getAttribute('href')
      if (!h || h.charAt(0) === '#' || h.indexOf('javascript:') === 0) return
      var u
      try {
        u = new URL(h, window.location.href)
      } catch (err) {
        return
      }
      if (u.protocol !== 'http:' && u.protocol !== 'https:') return
      if (!u.hostname || u.hostname === here) return
      var tg = (a.getAttribute('target') || '').toLowerCase()
      if (tg === '_self') return
      if (!a.getAttribute('target')) a.setAttribute('target', '_blank')
      var rel = (a.getAttribute('rel') || '').trim().split(/\s+/).filter(Boolean)
      if (rel.indexOf('noopener') === -1) rel.push('noopener')
      if (rel.indexOf('noreferrer') === -1) rel.push('noreferrer')
      a.setAttribute('rel', rel.join(' '))
    })
  }

  // Lightbox para fotos de galería (abrir completa sin descargar)
  var imgModal = document.getElementById('img-modal')
  var imgModalImg = document.getElementById('img-modal-img')
  var imgModalCloseBtn = document.getElementById('img-modal-close')
  var imgModalDl = document.getElementById('img-modal-dl')
  var imgModalOpen = document.getElementById('img-modal-open')
  var gal = document.getElementById('gal')
  var prevOverflow = ''

  function imgModalIsOpen() {
    return !!(imgModal && !imgModal.hasAttribute('hidden'))
  }

  function imgModalClose() {
    if (!imgModal) return
    imgModal.hidden = true
    imgModal.setAttribute('aria-hidden', 'true')
    if (imgModalImg) imgModalImg.removeAttribute('src')
    if (imgModalDl) {
      imgModalDl.setAttribute('href', '#')
      imgModalDl.removeAttribute('download')
    }
    if (imgModalOpen) imgModalOpen.setAttribute('href', '#')
    document.body.style.overflow = prevOverflow || ''
    prevOverflow = ''
  }

  function imgModalOpenWith(src, alt, dlHref, dlName) {
    if (!imgModal || !imgModalImg) return
    imgModalImg.setAttribute('src', src)
    imgModalImg.setAttribute('alt', alt || 'Foto de la galería')
    if (imgModalDl) {
      imgModalDl.setAttribute('href', dlHref || src)
      if (dlName) imgModalDl.setAttribute('download', dlName)
      else imgModalDl.setAttribute('download', '')
    }
    if (imgModalOpen) imgModalOpen.setAttribute('href', src)
    prevOverflow = document.body.style.overflow || ''
    document.body.style.overflow = 'hidden'
    imgModal.hidden = false
    imgModal.setAttribute('aria-hidden', 'false')
  }

  if (imgModal) {
    imgModal.addEventListener('click', function (ev) {
      var t = ev.target
      if (t && t.hasAttribute && t.hasAttribute('data-img-modal-close')) imgModalClose()
    })
  }

  if (imgModalCloseBtn) {
    imgModalCloseBtn.addEventListener('click', function (ev) {
      ev.preventDefault()
      imgModalClose()
    })
  }

  if (gal) {
    gal.addEventListener('click', function (ev) {
      var t = ev.target
      if (!t) return
      // No interferir con botón Descargar ni videos
      if (t.closest && t.closest('a.gi-dl')) return
      var gi = t.closest ? t.closest('.gi') : null
      if (!gi || gi.classList.contains('gi-video')) return
      var img = t.tagName === 'IMG' ? t : gi.querySelector('img')
      if (!img) return
      var src = img.getAttribute('src')
      if (!src) return
      var alt = img.getAttribute('alt') || ''
      var dl = gi.querySelector('a.gi-dl')
      var dlHref = dl ? dl.getAttribute('href') : src
      var dlName = dl ? dl.getAttribute('download') : ''
      imgModalOpenWith(src, alt, dlHref, dlName)
    })
  }

  externalLinksOpenNewTab()

  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Escape' && ev.key !== 'Esc') return
    if (imgModalIsOpen()) imgModalClose()
  })
})()
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  const body = document.body;

  // Revisar si el usuario ya tenía un tema guardado
  const savedTheme = localStorage.getItem('filial_theme');
  if (savedTheme === 'academico') {
    body.classList.add('modo-academico');
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Modo Noche';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      body.classList.toggle('modo-academico');
      
      if (body.classList.contains('modo-academico')) {
        localStorage.setItem('filial_theme', 'academico');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Modo Noche';
      } else {
        localStorage.setItem('filial_theme', 'oscuro');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Modo Académico';
      }
    });
  }
});