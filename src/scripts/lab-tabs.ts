// Toggles the active lab-detail tab and its matching content section.
const tabs = document.querySelectorAll('.lab-tab');
const sections = document.querySelectorAll('.lab-section');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetId = tab.getAttribute('data-tab');

    tabs.forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');

    sections.forEach((s) => s.classList.remove('is-active'));
    const target = document.getElementById(`tab-${targetId}`);
    if (target) target.classList.add('is-active');
  });
});
