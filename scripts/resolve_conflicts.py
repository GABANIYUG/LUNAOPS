import re

def clean_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern for git conflict block: <<<<<<< HEAD ... ======= ... >>>>>>> [hash]
    pattern = re.compile(r'<<<<<<< HEAD\r?\n(.*?)\r?\n=======\r?\n(.*?)\r?\n>>>>>>> [a-f0-9]+', re.DOTALL)
    
    def replacer(match):
        part1 = match.group(1)
        part2 = match.group(2)
        # For export-panel-modal, keep z-index 4000 and width min(760px, 92vw)
        if '#export-panel-modal' in path or 'z-index' in part1:
            return '''  z-index: 4000 !important;
}

#export-panel-modal .mission-dialog,
#export-panel-modal .export-dialog,
.export-dialog {
  width: min(760px, 92vw);
  position: relative;
  z-index: 4001;
  pointer-events: auto;
}

.export-status-bar {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1.1rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  margin-top: 1rem;
  line-height: 1.4;
}
.export-status-bar.status-info {
  background: rgba(14, 165, 233, 0.15);
  border: 1px solid rgba(14, 165, 233, 0.45);
  color: #7dd3fc;
}
.export-status-bar.status-success {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.45);
  color: #86efac;
}
.export-status-bar.status-error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.45);
  color: #fca5a5;'''
        # By default keep part1
        return part1

    new_content = pattern.sub(replacer, content)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Cleaned {path}")

clean_file('src/exportPanel.ts')
clean_file('src/style.css')

