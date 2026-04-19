#!/usr/bin/env python3
"""
Simple HTTP Server for Cattle Detection Project
Serves the project with proper CORS headers for local development
"""

import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def log_message(self, format, *args):
        # Custom logging
        print(f"[SERVER] {format % args}")

def run_server(port=8000):
    """Run the HTTP server"""
    try:
        # Change to the directory containing the HTML files
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        
        with socketserver.TCPServer(("", port), CORSHTTPRequestHandler) as httpd:
            print("[CATTLE DETECTION] Server starting...")
            print(f"[DIRECTORY] Serving: {os.getcwd()}")
            print(f"[SERVER] Running at: http://localhost:{port}")
            print(f"[BROWSER] Open: http://localhost:{port}/index.html")
            print("[CONTROL] Press Ctrl+C to stop the server")
            print("-" * 50)
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n[STOP] Server stopped by user")
                httpd.shutdown()
                
    except OSError as e:
        if e.errno == 10048:  # Port already in use on Windows
            print(f"[ERROR] Port {port} is already in use. Trying port {port + 1}...")
            run_server(port + 1)
        else:
            print(f"[ERROR] Error starting server: {e}")
            sys.exit(1)
    except Exception as e:
        print(f"[ERROR] Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("[ERROR] Invalid port number. Using default port 8000.")
    
    run_server(port)