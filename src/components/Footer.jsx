import { Github, Star } from 'lucide-react'

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <p>
        <strong>FocusBox.dev</strong> — Local, Minimal, and Yours.
        <br />
        <small>
          A productivity app for task management and timeboxing. 
          <a 
            href="https://github.com/adityak74/focusbox.dev" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="View source code on GitHub"
            className="github-link"
          >
            <Github size={14} />
            <span>Open source</span>
            <Star size={12} />
          </a> • 
          <a href="/privacy" aria-label="Privacy policy">
            Privacy
          </a>
        </small>
      </p>
    </footer>
  )
}

export default Footer