def update_style_css():
    path = 'src/style.css'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    brand_css_rules = '''
/* ==========================================================================
   LUNAOPS Master Brand & Logo System (Selene Labs Aerospace Aesthetic)
   ========================================================================== */

.brand-logo-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
}

.brand-logo-link:hover {
  transform: scale(1.08) rotate(6deg);
  filter: drop-shadow(0 0 14px rgba(66, 221, 245, 0.7));
}

.brand-logo-emblem {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(3, 8, 16, 0.85);
  border: 1px solid rgba(66, 221, 245, 0.4);
  box-shadow: 0 0 12px rgba(66, 221, 245, 0.35), inset 0 0 8px rgba(66, 221, 245, 0.15);
  transition: all 0.25s ease;
}

.brand-text-block {
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
}

.brand-title-line {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.title-accent {
  font-weight: 900;
  color: var(--cyan-accent);
  text-shadow: 0 0 16px rgba(66, 221, 245, 0.75), 0 0 32px rgba(66, 221, 245, 0.3);
}

.brand-motto-row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-top: 0.05rem;
}

.motto-text {
  color: #94A3B8;
  font-weight: 500;
}

.motto-sep {
  color: var(--cyan-accent);
  opacity: 0.8;
  font-weight: 700;
}

.motto-accent {
  color: var(--cyan-accent);
  font-weight: 700;
  text-shadow: 0 0 8px rgba(66, 221, 245, 0.5);
}

/* Loader Logo Animation */
.loader-emblem-wrap {
  width: 68px;
  height: 68px;
  margin: 0 auto 0.75rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(5, 19, 38, 0.9) 0%, rgba(1, 5, 10, 0.95) 100%);
  border: 1.5px solid rgba(66, 221, 245, 0.45);
  box-shadow: 0 0 24px rgba(66, 221, 245, 0.4), inset 0 0 16px rgba(66, 221, 245, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: emblem-float 3.5s ease-in-out infinite alternate;
}

.loader-emblem {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px rgba(66, 221, 245, 0.6));
}

.loader-accent {
  color: var(--cyan-accent);
  font-weight: 900;
}

.loader-motto {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--cyan-accent);
  text-transform: uppercase;
  margin: 0.2rem 0 0.65rem;
  opacity: 0.9;
  text-shadow: 0 0 10px rgba(66, 221, 245, 0.4);
}

@keyframes emblem-float {
  0% { transform: translateY(0px) scale(1); box-shadow: 0 0 20px rgba(66, 221, 245, 0.35); }
  100% { transform: translateY(-4px) scale(1.04); box-shadow: 0 0 32px rgba(66, 221, 245, 0.6); }
}

/* Modal Headers & Mission Workspace Lockups */
.mission-brand-lockup {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.mission-header-emblem {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(66, 221, 245, 0.35);
  box-shadow: 0 0 10px rgba(66, 221, 245, 0.3);
  flex-shrink: 0;
}

.mission-motto-tag {
  display: inline-block;
  margin-left: 0.55rem;
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  background: rgba(66, 221, 245, 0.12);
  border: 1px solid rgba(66, 221, 245, 0.35);
  color: var(--cyan-accent);
  font-weight: 700;
  font-size: 0.56rem;
  letter-spacing: 0.12em;
  text-shadow: 0 0 6px rgba(66, 221, 245, 0.4);
}

/* South Pole Explorer Header */
.spe-header-emblem {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid rgba(66, 221, 245, 0.35);
  box-shadow: 0 0 8px rgba(66, 221, 245, 0.35);
  flex-shrink: 0;
}

.spe-motto-pill {
  margin-left: auto;
  margin-right: 0.5rem;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  background: rgba(66, 221, 245, 0.1);
  border: 1px solid rgba(66, 221, 245, 0.3);
  color: var(--cyan-accent);
  font-family: var(--font-mono);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* Export Tab & Dialog Branding */
.export-header-brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.export-tab-emblem {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(66, 221, 245, 0.35);
  box-shadow: 0 0 10px rgba(66, 221, 245, 0.3);
  flex-shrink: 0;
}

.export-motto-badge {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--cyan-accent);
  text-transform: uppercase;
  margin-top: 0.2rem;
  opacity: 0.9;
}

.export-dialog-brand-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.export-dialog-emblem {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(66, 221, 245, 0.35);
  box-shadow: 0 0 10px rgba(66, 221, 245, 0.35);
  flex-shrink: 0;
}

.export-title-line {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.export-dialog-motto {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  background: rgba(66, 221, 245, 0.12);
  border: 1px solid rgba(66, 221, 245, 0.3);
  color: var(--cyan-accent);
  font-family: var(--font-mono);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}
'''
    if '.brand-logo-emblem' not in content:
        content += '\n' + brand_css_rules
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated src/style.css with brand rules")
    else:
        print("src/style.css already has brand rules")


def update_landing_css():
    path = 'src/landing.css'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    landing_brand_rules = '''
/* ==========================================================================
   LUNAOPS Landing Page Brand Emblem & Motto Enhancements
   ========================================================================== */

.hero-emblem-badge {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 0.45rem;
  filter: drop-shadow(0 0 6px rgba(66, 221, 245, 0.5));
}

.touchdown-emblem {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(66, 221, 245, 0.4);
  box-shadow: 0 0 12px rgba(66, 221, 245, 0.4);
  flex-shrink: 0;
}

.status-content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.status-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-motto-tag {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  border-radius: 3px;
  background: rgba(66, 221, 245, 0.15);
  border: 1px solid rgba(66, 221, 245, 0.4);
  color: var(--cyan-bright);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-shadow: 0 0 8px rgba(66, 221, 245, 0.5);
}
'''
    if '.hero-emblem-badge' not in content:
        content += '\n' + landing_brand_rules
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated src/landing.css with brand rules")
    else:
        print("src/landing.css already has brand rules")


update_style_css()
update_landing_css()

