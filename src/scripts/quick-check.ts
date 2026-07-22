/**
 * Practice quick-check behavior.
 *
 * Runs entirely in the browser: no storage, no network, no score. State lives
 * only in the current page and disappears on refresh. Without JavaScript, the
 * check buttons stay hidden and each scenario's native <details> discussion
 * remains available, so the page never breaks.
 */

type OptionInfo = {
  quality: 'best' | 'defensible' | 'not-quite';
  explanation: string;
};

type ScenarioData = {
  options: Record<string, OptionInfo>;
  discussion: string;
};

const VERDICTS: Record<OptionInfo['quality'], string> = {
  best: 'Strong choice.',
  defensible: 'Defensible choice.',
  'not-quite': 'Worth another look.',
};

function initScenario(root: HTMLElement): void {
  const form = root.querySelector<HTMLFormElement>('[data-qc-form]');
  const button = root.querySelector<HTMLButtonElement>('[data-qc-check]');
  const feedback = root.querySelector<HTMLElement>('[data-qc-feedback]');
  const fallback = root.querySelector<HTMLElement>('[data-qc-fallback]');
  const dataEl = root.querySelector<HTMLScriptElement>('[data-qc-data]');
  if (!form || !button || !feedback || !dataEl) return;

  let data: ScenarioData;
  try {
    data = JSON.parse(dataEl.textContent ?? '') as ScenarioData;
  } catch {
    return; // Leave the no-JS discussion in place.
  }

  // JS confirmed: show the interactive control, tuck the static discussion away.
  button.hidden = false;
  if (fallback) fallback.hidden = true;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    feedback.hidden = false;
    feedback.replaceChildren();

    const checked = form.querySelector<HTMLInputElement>('input[type="radio"]:checked');
    if (!checked) {
      feedback.dataset.tone = 'revisit';
      const p = document.createElement('p');
      p.textContent = 'Choose the label you think fits best, then check again.';
      p.style.margin = '0';
      feedback.append(p);
      return;
    }

    const info = data.options[checked.value];
    if (!info) return;

    feedback.dataset.tone = info.quality === 'not-quite' ? 'revisit' : 'correct';

    const head = document.createElement('p');
    head.style.margin = '0 0 0.5rem';
    const verdict = document.createElement('strong');
    verdict.textContent = VERDICTS[info.quality];
    head.append(verdict);

    const body = document.createElement('p');
    body.style.margin = '0 0 0.5rem';
    body.textContent = info.explanation;

    const wrap = document.createElement('p');
    wrap.style.margin = '0';
    const wrapLabel = document.createElement('strong');
    wrapLabel.textContent = 'The bigger picture: ';
    wrap.append(wrapLabel, document.createTextNode(data.discussion));

    feedback.append(head, body, wrap);
  });
}

function init(): void {
  document.querySelectorAll<HTMLElement>('[data-quick-check]').forEach(initScenario);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Mark this file as a module so its top-level names stay file-scoped.
export {};
