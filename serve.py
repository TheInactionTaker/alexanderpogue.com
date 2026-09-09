#!/usr/bin/env python3
"""Local preview server for alexanderpogue.com.

GitHub Pages resolves an extensionless URL by looking for "<path>.html", which
plain `python -m http.server` does not do. Without that, every link on the site
404s locally while working fine once deployed. This server mirrors the hosted
behaviour so the preview matches production.

    python serve.py [port]        # defaults to 8000
"""

import http.server
import os
import sys

DEFAULT_PORT = 8000


class GitHubPagesHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        local = super().translate_path(path)

        if os.path.isfile(local):
            return local

        # A bare path resolves to "<path>.html" if one exists. GitHub Pages
        # prefers that file over a directory of the same name, which matters
        # here because projects.html sits next to the projects/ folder.
        if not os.path.splitext(local)[1] or os.path.isdir(local):
            as_html = local.rstrip("/\\") + ".html"
            if os.path.isfile(as_html):
                return as_html

        return local


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), GitHubPagesHandler)
    print(f"Serving {os.getcwd()} at http://127.0.0.1:{port}/  (Ctrl+C to stop)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
