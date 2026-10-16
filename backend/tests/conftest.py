"""
conftest.py — Pytest configuration for the LUNAOPS backend tests.

Adds the backend/ directory to sys.path so that `import spice_service`,
`import app`, and `import schemas` resolve correctly when pytest is run
from the backend/ directory.
"""
import sys
import os

# Ensure backend/ is on the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
