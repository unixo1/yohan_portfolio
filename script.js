// 푸터에 현재 연도 표시
var yearElement = document.getElementById('year');
if (yearElement) {
  var now = new Date();
  var year = now.getFullYear();
  yearElement.textContent = year;
}

// 스크롤 애니메이션
var sections = document.querySelectorAll('.section > .container');
for (var i = 0; i < sections.length; i++) {
  var section = sections[i];
  var rect = section.getBoundingClientRect();
  if (rect.top > window.innerHeight * 0.7) {
    section.classList.add('reveal');
  } else {
    section.classList.add('reveal');
    section.classList.add('is-visible');
  }
}

var lastScroll = 0;
var scrollingDown = true;

window.addEventListener('scroll', function() {
  var currentScroll = window.scrollY;
  if (currentScroll > lastScroll) {
    scrollingDown = true;
  } else {
    scrollingDown = false;
  }
  lastScroll = currentScroll;
});

var observer = new IntersectionObserver(function(entries) {
  for (var j = 0; j < entries.length; j++) {
    var entry = entries[j];
    if (entry.isIntersecting && scrollingDown) {
      entry.target.classList.add('is-visible');
      entry.target.classList.remove('is-hidden');
    } else if (!entry.isIntersecting && !scrollingDown) {
      entry.target.classList.remove('is-visible');
      entry.target.classList.add('is-hidden');
    }
  }
}, { threshold: 0.3 });

for (var k = 0; k < sections.length; k++) {
  observer.observe(sections[k]);
}
