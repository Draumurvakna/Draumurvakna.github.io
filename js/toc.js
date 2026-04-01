(function () {
  var tocContent = document.getElementById('toc-content');
  var tocContainer = document.getElementById('toc-container');
  var tocToggle = document.getElementById('toc-toggle');
  var tocNav = document.getElementById('toc-nav');

  if (!tocContent || !tocContainer) return;

  // 收集文章中的标题
  var articleEntry = document.querySelector('.article-entry');
  if (!articleEntry) return;

  var headings = articleEntry.querySelectorAll('h1, h2, h3, h4');
  if (headings.length < 2) {
    tocContainer.style.display = 'none';
    return;
  }

  // 确保每个标题都有 id
  headings.forEach(function (heading, index) {
    if (!heading.id) {
      heading.id = 'toc-heading-' + index;
    }
  });

  // 获取最小标题级别，用于缩进计算
  var minLevel = 6;
  headings.forEach(function (h) {
    var level = parseInt(h.tagName[1]);
    if (level < minLevel) minLevel = level;
  });

  // 构建目录 HTML
  var html = '<ul class="toc-list">';
  headings.forEach(function (heading) {
    var level = parseInt(heading.tagName[1]);
    var indent = level - minLevel;
    var text = heading.textContent || heading.innerText;
    html += '<li class="toc-item toc-level-' + level + '" style="padding-left:' + (indent * 12) + 'px">' +
      '<a class="toc-link" href="#' + heading.id + '">' +
      '<span class="toc-text">' + text + '</span>' +
      '</a></li>';
  });
  html += '</ul>';
  tocContent.innerHTML = html;

  // 切换目录显示/隐藏
  var isOpen = window.innerWidth >= 1400;

  function applyState() {
    if (isOpen) {
      tocContainer.classList.add('toc-open');
      tocToggle.querySelector('i').style.transform = 'rotate(180deg)';
    } else {
      tocContainer.classList.remove('toc-open');
      tocToggle.querySelector('i').style.transform = 'rotate(0deg)';
    }
  }
  applyState();

  tocToggle.addEventListener('click', function () {
    isOpen = !isOpen;
    applyState();
  });

  // 滚动高亮当前标题
  var tocLinks = tocContent.querySelectorAll('.toc-link');

  function getActiveIndex() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var offset = 80;
    var activeIndex = -1;
    for (var i = 0; i < headings.length; i++) {
      var top = headings[i].getBoundingClientRect().top + scrollTop - offset;
      if (scrollTop >= top) {
        activeIndex = i;
      }
    }
    return activeIndex;
  }

  function updateActive() {
    var idx = getActiveIndex();
    tocLinks.forEach(function (link, i) {
      if (i === idx) {
        link.classList.add('toc-active');
        // 确保激活项在可视范围内
        var li = link.parentElement;
        var liTop = li.offsetTop;
        var liBottom = liTop + li.offsetHeight;
        var navScrollTop = tocNav.scrollTop;
        var navHeight = tocNav.clientHeight - 48;
        if (liTop < navScrollTop + 40) {
          tocNav.scrollTop = liTop - 40;
        } else if (liBottom > navScrollTop + navHeight) {
          tocNav.scrollTop = liBottom - navHeight;
        }
      } else {
        link.classList.remove('toc-active');
      }
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  // 点击目录链接平滑滚动
  tocLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var href = link.getAttribute('href');
      var target = document.querySelector(href);
      if (target) {
        var top = target.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
