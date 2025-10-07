import { ArrowLeft } from 'lucide-react'

function Privacy() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <div className="privacy-header">
          <a href="/" className="back-link">
            <ArrowLeft size={16} />
            Back to FocusBox.dev
          </a>
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: December 19, 2024</p>
        </div>

        <div className="privacy-content">
          <section>
            <h2>Local-First Privacy</h2>
            <p>
              FocusBox.dev is designed with privacy as a core principle. Your data stays on your device - 
              we don't collect, store, or transmit any personal information.
            </p>
          </section>

          <section>
            <h2>Data Storage</h2>
            <p>
              All your tasks, settings, and preferences are stored locally in your browser's localStorage. 
              This means:
            </p>
            <ul>
              <li>Your data never leaves your device</li>
              <li>No accounts or sign-ups required</li>
              <li>No servers to store your information</li>
              <li>Complete control over your data</li>
            </ul>
          </section>

          <section>
            <h2>No Tracking</h2>
            <p>
              We don't use any analytics, tracking pixels, or third-party services that could monitor your usage. 
              The app works entirely offline after the initial load.
            </p>
          </section>

          <section>
            <h2>Open Source</h2>
            <p>
              FocusBox.dev is open source and available on <a href="https://github.com/adityak74/focusbox.dev" target="_blank" rel="noopener noreferrer">GitHub</a>. 
              You can review the entire codebase to verify our privacy claims.
            </p>
          </section>

          <section>
            <h2>Browser Data</h2>
            <p>
              The only data stored is what you explicitly create within the app:
            </p>
            <ul>
              <li>Task lists and descriptions</li>
              <li>Timer settings and preferences</li>
              <li>Theme preferences (light/dark mode)</li>
              <li>Column configurations</li>
            </ul>
            <p>
              You can clear all data at any time using the "Clear Data" option in settings.
            </p>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>
              FocusBox.dev uses minimal third-party services:
            </p>
            <ul>
              <li><strong>Google Fonts</strong>: For the Inter font family (loaded from Google's CDN)</li>
              <li><strong>Cloudflare Pages</strong>: For hosting the static website</li>
            </ul>
            <p>
              These services don't have access to your app data or usage patterns.
            </p>
          </section>

          <section>
            <h2>PWA Installation</h2>
            <p>
              When you install FocusBox.dev as a Progressive Web App (PWA), the same privacy principles apply. 
              Your data remains local to your device and is not synced to any external services.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              If you have any questions about this privacy policy, you can reach out through our 
              <a href="https://github.com/adityak74/focusbox.dev" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
            </p>
          </section>

          <section>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on this page 
              with an updated "Last updated" date. Since this is a local-first app, you'll need to refresh 
              the page to see policy updates.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Privacy
