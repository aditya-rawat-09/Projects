import http.server
import socketserver
import os
import webbrowser
import threading
import time

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def open_browser():
    time.sleep(1)
    webbrowser.open('http://localhost:8000')

def find_free_port(start_port=8000):
    for port in range(start_port, start_port + 10):
        try:
            with socketserver.TCPServer(("", port), MyHTTPRequestHandler) as test_server:
                return port
        except OSError:
            continue
    return None

if __name__ == "__main__":
    # Change to script directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Find available port
    PORT = find_free_port(8000)
    if PORT is None:
        print("No available ports found")
        exit(1)
    
    # Update browser opening function
    def open_browser():
        time.sleep(1)
        webbrowser.open(f'http://localhost:{PORT}')
    
    # Start browser in a separate thread
    browser_thread = threading.Thread(target=open_browser)
    browser_thread.daemon = True
    browser_thread.start()
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}")
        print("Press Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped")