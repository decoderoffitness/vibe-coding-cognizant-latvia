// DOM Elements
const solutionForm = document.getElementById('solution-form');
const solutionContainer = document.getElementById('solution-container');
const solutionText = document.getElementById('solution-text');
const submitBtn = document.getElementById('submit-btn');
const errorTextarea = document.getElementById('error');
const charCount = document.getElementById('char-count');
const issuesGrid = document.getElementById('issues-grid');

// Popular issues data
const popularIssues = [
  {
    id: 1,
    tool: "selenium",
    title: "WebDriverException",
    description: "Driver initialization failures and connection timeouts",
    icon: "fas fa-robot",
    color: "color: #3b82f6"
  },
  {
    id: 2,
    tool: "playwright",
    title: "TimeoutError", 
    description: "Element locator timeouts and page load issues",
    icon: "fas fa-theater-masks",
    color: "color: #8b5cf6"
  },
  {
    id: 3,
    tool: "cypress",
    title: "CypressError",
    description: "Command queue and assertion failures",
    icon: "fas fa-vial", 
    color: "color: #22c55e"
  },
  {
    id: 4,
    tool: "selenium",
    title: "StaleElementReference",
    description: "DOM changes invalidating element references",
    icon: "fas fa-robot",
    color: "color: #3b82f6"
  },
  {
    id: 5,
    tool: "playwright", 
    title: "Network Errors",
    description: "Failed network requests and CORS issues",
    icon: "fas fa-theater-masks",
    color: "color: #8b5cf6"
  },
  {
    id: 6,
    tool: "cypress",
    title: "Flaky Tests",
    description: "Intermittent test failures and race conditions", 
    icon: "fas fa-vial",
    color: "color: #22c55e"
  }
];

// Solution templates
const solutionTemplates = {
  selenium: `
    <div style="margin-bottom: 1.5rem;">
      <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        🔧 Root Cause Analysis
      </h5>
      <p style="color: var(--text-secondary);">WebDriver connection issue, likely due to driver version mismatch or incorrect configuration.</p>
    </div>
    
    <div style="margin-bottom: 1.5rem;">
      <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        💡 Solution Steps
      </h5>
      <ol style="color: var(--text-secondary); padding-left: 1.5rem;">
        <li style="margin-bottom: 0.5rem;">Update ChromeDriver to match your Chrome browser version</li>
        <li style="margin-bottom: 0.5rem;">Verify the driver executable path in your code</li>
        <li style="margin-bottom: 0.5rem;">Add explicit wait conditions for better reliability</li>
        <li style="margin-bottom: 0.5rem;">Check for any firewall or antivirus blocking the driver</li>
      </ol>
    </div>
    
    <div>
      <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        📝 Code Example
      </h5>
      <pre style="background: #000; border: 1px solid var(--border); border-radius: 0.5rem; padding: 1rem; overflow-x: auto; font-family: 'Fira Code', monospace; font-size: 0.85rem; line-height: 1.4;"><code>from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# Setup with explicit options
options = webdriver.ChromeOptions()
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(options=options)
wait = WebDriverWait(driver, 10)

# Use explicit waits
element = wait.until(EC.presence_of_element_located((By.ID, "myElement")))
element.click()</code></pre>
    </div>
  `,
  
  playwright: `
    <div style="margin-bottom: 1.5rem;">
      <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        🎭 Root Cause Analysis
      </h5>
      <p style="color: var(--text-secondary);">Element locator timeout indicates the element is not available when expected.</p>
    </div>
    
    <div style="margin-bottom: 1.5rem;">
      <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        💡 Solution Steps
      </h5>
      <ol style="color: var(--text-secondary); padding-left: 1.5rem;">
        <li style="margin-bottom: 0.5rem;">Use wait_for_selector() for better element timing</li>
        <li style="margin-bottom: 0.5rem;">Increase timeout values for slow-loading elements</li>
        <li style="margin-bottom: 0.5rem;">Check for dynamic content or lazy loading</li>
        <li style="margin-bottom: 0.5rem;">Verify network conditions and page load events</li>
      </ol>
    </div>
    
    <div>
      <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        📝 Code Example
      </h5>
      <pre style="background: #000; border: 1px solid var(--border); border-radius: 0.5rem; padding: 1rem; overflow-x: auto; font-family: 'Fira Code', monospace; font-size: 0.85rem; line-height: 1.4;"><code>from playwright.async_api import async_playwright

async with async_playwright() as p:
    browser = await p.chromium.launch()
    page = await browser.new_page()
    
    await page.goto('https://example.com')
    
    # Wait for element with custom timeout
    await page.wait_for_selector('#myElement', timeout=30000)
    
    # Interact with element
    await page.click('#myElement')
    await browser.close()</code></pre>
    </div>
  `,
  
  cypress: `
    <div style="margin-bottom: 1.5rem;">
      <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        🌲 Root Cause Analysis
      </h5>
      <p style="color: var(--text-secondary);">Command timeout or assertion failure due to element state mismatch.</p>
    </div>
    
    <div style="margin-bottom: 1.5rem;">
      <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        💡 Solution Steps
      </h5>
      <ol style="color: var(--text-secondary); padding-left: 1.5rem;">
        <li style="margin-bottom: 0.5rem;">Use cy.should() for robust assertions with retries</li>
        <li style="margin-bottom: 0.5rem;">Add cy.wait() for API calls or animations</li>
        <li style="margin-bottom: 0.5rem;">Configure custom timeouts in cypress.config.js</li>
        <li style="margin-bottom: 0.5rem;">Use cy.intercept() to handle network requests</li>
      </ol>
    </div>
    
    <div>
      <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        📝 Code Example
      </h5>
      <pre style="background: #000; border: 1px solid var(--border); border-radius: 0.5rem; padding: 1rem; overflow-x: auto; font-family: 'Fira Code', monospace; font-size: 0.85rem; line-height: 1.4;"><code>// cypress.config.js
export default defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
  },
})

// In your test
cy.get('#myElement', { timeout: 10000 })
  .should('be.visible')
  .and('contain', 'Expected Text')
  .click()

// Wait for API calls
cy.intercept('POST', '/api/submit').as('submitRequest')
cy.get('#submit').click()
cy.wait('@submitRequest')</code></pre>
    </div>
  `
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  loadPopularIssues();
  updateCharCount();
  
  // Event listeners
  solutionForm.addEventListener('submit', handleFormSubmit);
  errorTextarea.addEventListener('input', updateCharCount);
});

// Load popular issues
function loadPopularIssues() {
  issuesGrid.innerHTML = popularIssues.map(issue => `
    <div class="issue-card">
      <div class="issue-header">
        <i class="${issue.icon} issue-icon" style="${issue.color}"></i>
        <div>
          <div class="issue-title">${issue.title}</div>
          <div class="issue-tool">${issue.tool}</div>
        </div>
      </div>
      <p class="issue-description">${issue.description}</p>
      <div class="issue-link">
        <i class="fas fa-arrow-right"></i>
        View Solution
      </div>
    </div>
  `).join('');
}

// Update character count
function updateCharCount() {
  const count = errorTextarea.value.length;
  charCount.textContent = `${count} characters`;
}

// Handle form submission
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(solutionForm);
  const tool = formData.get('tool');
  const errorMessage = errorTextarea.value.trim();
  
  if (!errorMessage) {
    showToast('Please enter an error message', 'error');
    return;
  }
  
  // Show loading state
  setLoadingState(true);
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get solution template
    const solution = solutionTemplates[tool] || solutionTemplates.selenium;
    
    // Display solution
    displaySolution(solution);
    showToast('Solution generated successfully!', 'success');
    
  } catch (error) {
    showToast('Failed to generate solution. Please try again.', 'error');
    console.error('Error generating solution:', error);
  } finally {
    setLoadingState(false);
  }
}

// Set loading state
function setLoadingState(loading) {
  if (loading) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Error...';
  } else {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Solution';
  }
}

// Display solution
function displaySolution(solution) {
  solutionText.innerHTML = solution;
  solutionContainer.classList.remove('hidden');
  
  // Scroll to solution
  solutionContainer.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

// Copy solution to clipboard
async function copySolution() {
  try {
    const text = solutionText.textContent;
    await navigator.clipboard.writeText(text);
    showToast('Solution copied to clipboard!', 'success');
  } catch (error) {
    showToast('Failed to copy to clipboard', 'error');
  }
}

// Send feedback
function sendFeedback(isHelpful) {
  const message = isHelpful ? 'Thank you for your feedback!' : 'Thanks for letting us know. We\'ll improve our solutions.';
  showToast(message, 'success');
}

// Scroll to form
function scrollToForm() {
  document.getElementById('error-form').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

// Simple toast notification
function showToast(message, type = 'success') {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'var(--green)' : 'var(--red)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    max-width: 300px;
    font-weight: 500;
  `;
  
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => {
      document.body.removeChild(toast);
      document.head.removeChild(style);
    }, 300);
  }, 3000);
}

// Mobile navigation toggle
function toggleMobileNav() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
}

// Contact info function
function showContactInfo() {
  alert('Contact Information:\n\nEmail: monty.bagati@cognizant.com\nPhone: +371 25657827');
}
