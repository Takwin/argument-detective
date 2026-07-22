/**
 * Homepage search and family filtering.
 *
 * Runs entirely in the browser. No storage, no network, no cookies. Operates
 * on the 15 cards already rendered in source (assignment) order by toggling
 * their `hidden` attribute. If this script fails to run, all cards remain
 * visible and the reference stays fully usable.
 */

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function init(): void {
  const root = document.querySelector<HTMLElement>('[data-search-root]');
  if (!root) return;

  const input = root.querySelector<HTMLInputElement>('[data-search-input]');
  const clearBtn = root.querySelector<HTMLButtonElement>('[data-search-clear]');
  const clearAllBtn = root.querySelector<HTMLButtonElement>('[data-clear-all]');
  const familyBoxes = Array.from(root.querySelectorAll<HTMLInputElement>('[data-family-filter]'));
  const status = document.querySelector<HTMLElement>('[data-results-status]');
  const noResults = document.querySelector<HTMLElement>('[data-no-results]');
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-fallacy-card]'));
  if (!input || cards.length === 0) return;

  // Precompute a normalized haystack for each card.
  const records = cards.map((card) => ({
    el: card,
    family: card.dataset.family ?? '',
    haystack: normalize(card.dataset.search ?? ''),
  }));

  const apply = (): void => {
    const terms = normalize(input.value).split(' ').filter(Boolean);
    const activeFamilies = new Set(familyBoxes.filter((b) => b.checked).map((b) => b.value));

    let visible = 0;
    for (const rec of records) {
      const matchesText = terms.every((t) => rec.haystack.includes(t));
      const matchesFamily = activeFamilies.size === 0 || activeFamilies.has(rec.family);
      const show = matchesText && matchesFamily;
      rec.el.hidden = !show;
      if (show) visible += 1;
    }

    if (clearBtn) clearBtn.hidden = input.value.length === 0;
    if (status) {
      const filtered = terms.length > 0 || activeFamilies.size > 0;
      status.textContent = filtered
        ? `Showing ${visible} of ${records.length} fallacies`
        : `All ${records.length} fallacies`;
    }
    if (noResults) noResults.hidden = visible !== 0;
  };

  input.addEventListener('input', apply);
  familyBoxes.forEach((b) => b.addEventListener('change', apply));

  clearBtn?.addEventListener('click', () => {
    input.value = '';
    input.focus();
    apply();
  });

  clearAllBtn?.addEventListener('click', () => {
    input.value = '';
    familyBoxes.forEach((b) => (b.checked = false));
    input.focus();
    apply();
  });

  // Reveal JS-only controls now that scripting is confirmed available.
  root.querySelectorAll<HTMLElement>('[data-js-only]').forEach((el) => (el.hidden = false));

  apply();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
