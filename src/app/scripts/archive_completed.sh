#!/bin/bash

# Archive comprehensive hero architecture
mkdir -p /reports/archived/comprehensive-hero-architecture
mv -f /reports/comprehensive-hero-architecture/* /reports/archived/comprehensive-hero-architecture/ 2>/dev/null
rm -rf /reports/comprehensive-hero-architecture

# Archive completed feature work sub-audits (1-5)
mkdir -p /reports/archived/feature-work
mv -f /reports/feature-work/01-timeline-expansion.md /reports/archived/feature-work/ 2>/dev/null
mv -f /reports/feature-work/02-card-layout-lab.md /reports/archived/feature-work/ 2>/dev/null
mv -f /reports/feature-work/03-resources-page.md /reports/archived/feature-work/ 2>/dev/null
mv -f /reports/feature-work/04-gear-expansion.md /reports/archived/feature-work/ 2>/dev/null
mv -f /reports/feature-work/05-design-system-expansion-answers.md /reports/archived/feature-work/ 2>/dev/null

echo "Archive process completed."