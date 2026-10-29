(function () {
  function normalizeTableHead(table) {
    var thead = table.querySelector(':scope > thead');
    var tbody = table.querySelector(':scope > tbody');
    if (!thead || !tbody || !thead.rows.length || !tbody.rows.length) return;

    var emptyHead = Array.prototype.every.call(thead.rows[0].cells, function (cell) {
      return !cell.textContent.trim();
    });
    if (!emptyHead) return;

    var firstBodyRow = tbody.rows[0];
    var isFormattedHeader = Array.prototype.every.call(firstBodyRow.cells, function (cell) {
      return cell.querySelector('strong, b');
    });
    if (!isFormattedHeader) return;

    var headerRow = document.createElement('tr');
    Array.prototype.forEach.call(firstBodyRow.cells, function (cell) {
      var th = document.createElement('th');
      th.innerHTML = cell.innerHTML;
      headerRow.appendChild(th);
    });
    thead.replaceChildren(headerRow);
    firstBodyRow.remove();
  }

  function wrapTable(table) {
    if (table.parentElement.classList.contains('article-table-scroll')) return;
    var wrapper = document.createElement('div');
    wrapper.className = 'article-table-scroll';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }

  document.querySelectorAll('.article-entry table').forEach(function (table) {
    normalizeTableHead(table);
    if (table.rows[0] && table.rows[0].cells.length >= 4) {
      table.classList.add('article-table-wide');
    }
    wrapTable(table);
  });
})();
