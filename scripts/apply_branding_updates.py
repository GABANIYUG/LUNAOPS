import re

def update_main_ts():
    path = 'src/main.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update loader in main.ts
    loader_pattern = re.compile(r'<div class="loader-content">.*?<div class="spinner"></div>\s*<p class="loader-text">LUNAOPS</p>\s*<p class="loader-sub"', re.DOTALL)
    loader_replacement = '''<div class="loader-content">
    <div class="loader-emblem-wrap">
      <img src="/lunaops-emblem.svg" class="loader-emblem" alt="LUNAOPS Emblem" />
    </div>
    <div class="spinner"></div>
    <p class="loader-text">LUNA<span class="loader-accent">OPS</span></p>
    <p class="loader-motto">EXPLORE THE LUNAR FRONTIER &middot; PLAN WITH PRECISION</p>
    <p class="loader-sub"'''
    
    content = loader_pattern.sub(loader_replacement, content)

    # 2. Update brand header in main.ts
    brand_pattern = re.compile(r'<!-- Brand Header -->\s*<div class="brand">\s*<div class="brand-header-row">\s*<span class="brand-dot"></span>\s*<h1 class="title">LUNAOPS</h1>\s*<span class="geodetic-badge">IAU MOON_ME</span>\s*</div>\s*<p class="subtitle">.*?</p>', re.DOTALL)
    brand_replacement = '''<!-- Brand Header -->
  <div class="brand">
    <div class="brand-header-row">
      <a href="/" class="brand-logo-link" title="LUNAOPS &middot; Explore the lunar frontier &middot; Plan with precision">
        <img src="/lunaops-emblem.svg" class="brand-logo-emblem" alt="LUNAOPS Logo" />
      </a>
      <div class="brand-text-block">
        <div class="brand-title-line">
          <h1 class="title">LUNA<span class="title-accent">OPS</span></h1>
          <span class="geodetic-badge">IAU MOON_ME</span>
        </div>
        <div class="brand-motto-row">
          <span class="motto-text">EXPLORE THE LUNAR FRONTIER</span>
          <span class="motto-sep">&middot;</span>
          <span class="motto-accent">PLAN WITH PRECISION</span>
        </div>
      </div>
    </div>
    <p class="subtitle">NASA Space Apps 2026 &middot; SELENE LABS &middot; LUNAR SOUTH POLE MISSION PLANNER</p>'''

    content = brand_pattern.sub(brand_replacement, content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated src/main.ts")


def update_landing_ts():
    path = 'src/landing.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # In panel-badge, add hero-emblem-badge
    old_badge = '''<div class="panel-badge" id="panel-badge">
      <span class="panel-badge-dot"></span>
      <span class="panel-badge-text" id="panel-phase-badge">SELENE LABS &middot; NASA SPACE APPS 2026 &middot; LOW EARTH ORBIT</span>
    </div>'''
    new_badge = '''<div class="panel-badge" id="panel-badge">
      <img src="/lunaops-emblem.svg" class="hero-emblem-badge" alt="LUNAOPS Emblem" />
      <span class="panel-badge-dot"></span>
      <span class="panel-badge-text" id="panel-phase-badge">SELENE LABS &middot; NASA SPACE APPS 2026 &middot; LOW EARTH ORBIT</span>
    </div>'''
    if old_badge in content:
        content = content.replace(old_badge, new_badge)

    # In touchdown-dock status-line, add touchdown-emblem and motto tag
    old_touchdown = '''    <div class="status-line" id="status-line">
      <svg class="status-check" viewBox="0 0 16 16" fill="none">
        <polyline points="3,9 7,13 13,4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="status-text">TOUCHDOWN COMPLETE &middot; SOUTH POLE</span>
      <span class="status-sub">Shackleton Crater Rim &middot; 89&deg;54&prime;S &middot; NASA Space Apps 2026</span>
    </div>'''
    new_touchdown = '''    <div class="status-line" id="status-line">
      <img src="/lunaops-emblem.svg" class="touchdown-emblem" alt="LUNAOPS" />
      <div class="status-content">
        <div class="status-header">
          <svg class="status-check" viewBox="0 0 16 16" fill="none">
            <polyline points="3,9 7,13 13,4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="status-text">TOUCHDOWN COMPLETE &middot; SOUTH POLE</span>
          <span class="status-motto-tag">PLAN WITH PRECISION</span>
        </div>
        <span class="status-sub">Shackleton Crater Rim &middot; 89&deg;54&prime;S &middot; NASA Space Apps 2026</span>
      </div>
    </div>'''
    if old_touchdown in content:
        content = content.replace(old_touchdown, new_touchdown)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated src/landing.ts")


def update_mission_workspace():
    path = 'src/missionWorkspace.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update modal header
    header_pattern = re.compile(r'<div class="mission-header">\s*<div class="mission-title-group">\s*<div class="mission-kicker">.*?</div>\s*<h2 class="mission-title">New Mission Analysis Workspace</h2>\s*</div>', re.DOTALL)
    header_replacement = '''<div class="mission-header">
        <div class="mission-brand-lockup">
          <img src="/lunaops-emblem.svg" class="mission-header-emblem" alt="LUNAOPS" />
          <div class="mission-title-group">
            <div class="mission-kicker">
              <span>NASA SPACE APPS 2026 &middot; CLPS MISSION PLANNER</span>
              <span class="mission-motto-tag">PLAN WITH PRECISION</span>
            </div>
            <h2 class="mission-title">New Mission Analysis Workspace</h2>
          </div>
        </div>'''
    content = header_pattern.sub(header_replacement, content)

    # 2. Update Export tab header
    export_tab_pattern = re.compile(r'<div class="card-header">\s*<h3>[^\n]*Scientific Report Export &amp; Reproducibility</h3>', re.DOTALL)
    export_tab_replacement = '''<div class="card-header">
          <div class="export-header-brand">
            <img src="/lunaops-emblem.svg" class="export-tab-emblem" alt="LUNAOPS" />
            <div>
              <h3>Scientific Report Export &amp; Reproducibility</h3>
              <span class="export-motto-badge">EXPLORE THE LUNAR FRONTIER &middot; PLAN WITH PRECISION</span>
            </div>
          </div>'''
    content = export_tab_pattern.sub(export_tab_replacement, content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated src/missionWorkspace.ts")


def update_candidate_comparison():
    path = 'src/candidateComparison.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    header_pattern = re.compile(r'<div class="mission-header">\s*<div class="mission-title-group">\s*<div class="mission-kicker">.*?</div>\s*<h2 class="mission-title">Landing Site &amp; Mission Date Comparison</h2>\s*</div>', re.DOTALL)
    header_replacement = '''<div class="mission-header">
        <div class="mission-brand-lockup">
          <img src="/lunaops-emblem.svg" class="mission-header-emblem" alt="LUNAOPS" />
          <div class="mission-title-group">
            <div class="mission-kicker">
              <span>NASA SPACE APPS 2026 &middot; PHASE 5 SCIENTIFIC COMPARISON</span>
              <span class="mission-motto-tag">PLAN WITH PRECISION</span>
            </div>
            <h2 class="mission-title">Landing Site &amp; Mission Date Comparison</h2>
          </div>
        </div>'''
    content = header_pattern.sub(header_replacement, content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated src/candidateComparison.ts")


def update_south_pole_explorer():
    path = 'src/southPoleExplorer.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    spe_pattern = re.compile(r'<div class="spe-header">\s*<div class="spe-title-row">\s*(?:<span class="spe-dot"></span>)?\s*<span class="spe-title">SOUTH POLE EXPLORER</span>\s*<span class="spe-badge">.*?</span>\s*</div>', re.DOTALL)
    spe_replacement = '''<div class="spe-header">
  <div class="spe-title-row">
    <img src="/lunaops-emblem.svg" class="spe-header-emblem" alt="LUNAOPS Polar Emblem" />
    <span class="spe-title">SOUTH POLE EXPLORER</span>
    <span class="spe-badge">USGS POLAR STEREO &middot; 80&deg;S&ndash;90&deg;S</span>
    <span class="spe-motto-pill">PLAN WITH PRECISION</span>
  </div>'''
    content = spe_pattern.sub(spe_replacement, content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated src/southPoleExplorer.ts")


def update_export_panel():
    path = 'src/exportPanel.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    old_header_pat = re.compile(r'<div class="mission-modal-header export-dialog-header">\s*<div class="mission-header-info">\s*<h2>.*?</h2>\s*<p class="export-subtitle">\${subtitle}</p>\s*</div>', re.DOTALL)
    new_header = '''<div class="mission-modal-header export-dialog-header">
        <div class="export-dialog-brand-row">
          <img src="/lunaops-emblem.svg" class="export-dialog-emblem" alt="LUNAOPS" />
          <div class="mission-header-info">
            <div class="export-title-line">
              <h2>${title}</h2>
              <span class="export-dialog-motto">PLAN WITH PRECISION</span>
            </div>
            <p class="export-subtitle">${subtitle}</p>
          </div>
        </div>'''
    content = old_header_pat.sub(new_header, content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated src/exportPanel.ts")


update_main_ts()
update_landing_ts()
update_mission_workspace()
update_candidate_comparison()
update_south_pole_explorer()
update_export_panel()
print("All branding updates injected!")
