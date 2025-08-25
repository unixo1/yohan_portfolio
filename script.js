// ---- 푸터에 현재 연도 표시 ----
var yearEl = document.getElementById('year');
if (yearEl) {
  var now = new Date();
  yearEl.textContent = now.getFullYear();
}

// ---- 스크롤 시 섹션 나타나는 효과 ----
(function () {
  var prefersReduced = false;
  try {
    prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  var targets = document.querySelectorAll('.section > .container');
  if (!targets.length) return;

  // 처음 로드할 때 화면에 안 보이는 요소 숨기기
  for (var i = 0; i < targets.length; i++) {
    var el = targets[i];
    var rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.7) {
      el.classList.add('reveal'); // 숨김 상태
    } else {
      el.classList.add('reveal', 'is-visible'); // 바로 보이기
    }
  }

  if (prefersReduced) return;

  var lastScrollY = window.scrollY;
  var isScrollingDown = true;

  // 스크롤 방향 감지
  window.addEventListener('scroll', function () {
    var currentScrollY = window.scrollY;
    isScrollingDown = currentScrollY > lastScrollY;
    lastScrollY = currentScrollY;
  });

  // IntersectionObserver: 화면에 보이는지 감지
  var io = new IntersectionObserver(function (entries) {
    for (var j = 0; j < entries.length; j++) {
      var entry = entries[j];
      if (entry.isIntersecting && isScrollingDown) {
        entry.target.classList.add('is-visible');
        entry.target.classList.remove('is-hidden');
      } else if (!entry.isIntersecting && !isScrollingDown) {
        entry.target.classList.remove('is-visible');
        entry.target.classList.add('is-hidden');
      }
    }
  }, { threshold: 0.3 });

  for (var k = 0; k < targets.length; k++) {
    io.observe(targets[k]);
  }
})();
