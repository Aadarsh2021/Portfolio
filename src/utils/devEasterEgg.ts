/**
 * DevTools Console Easter Egg
 * Crafted for CTOs, Engineering Leads, and Technical Recruiters inspecting the DOM & runtime.
 */
export function initDevEasterEgg() {
  if (typeof window === 'undefined') return;

  const headerStyle = [
    'color: #FF2A54',
    'font-size: 13px',
    'font-weight: 900',
    'line-height: 1.2',
    'text-shadow: 0 0 10px rgba(255, 42, 84, 0.6)'
  ].join(';');

  const titleStyle = [
    'color: #00E5FF',
    'font-size: 14px',
    'font-weight: 800',
    'padding: 4px 0'
  ].join(';');

  const bodyStyle = [
    'color: #E2E8F0',
    'font-size: 12px',
    'line-height: 1.6'
  ].join(';');

  const pillStyle = [
    'background: #111625',
    'color: #00E676',
    'padding: 3px 8px',
    'border-radius: 4px',
    'border: 1px solid rgba(0, 230, 118, 0.35)',
    'font-weight: 700'
  ].join(';');

  const banner = `
   ___             __                __      _____ __          __             
  /   | ____ _____/ /___  __________/ /_    /_  __/ /_  ____ _/ /____  _______
 / /| |/ __ \`/ __  / __ \`/ ___/ ___/ __ \\    / / / __ \\/ __ \`/ //_/ / / / ___/
/ ___ / /_/ / /_/ / /_/ / /  (__  ) / / /   / / / / / / /_/ / ,< / /_/ / /    
/_/  |_\\__,_/\\__,_/\\__,_/_/  /____/_/ /_/   /_/ /_/ /_/\\__,_/_/|_|\\__,_/_/     
`;

  console.log(`%c${banner}`, headerStyle);
  console.log(
    '%c⚡ Aadarsh Thakur — Full-Stack Engineer & Cloud Architect',
    titleStyle
  );
  console.log(
    '%c🎓 IIT Patna (M.Tech AI & Data Science) • 📜 2 Published Patents • 🚀 9+ Production Systems',
    bodyStyle
  );
  console.log(
    '%c● All Systems Operational | 100/100 Lighthouse Standard | Type-Safe Architecture',
    pillStyle
  );
  console.log(
    '%cLooking under the hood? Inspecting clean code is an engineer\'s best habit. Let\'s build something extraordinary together:\n' +
    '📬 thakuraadarsh1@gmail.com  |  📱 +91 9310574300  |  🐙 https://github.com/Aadarsh2021',
    bodyStyle
  );
}
