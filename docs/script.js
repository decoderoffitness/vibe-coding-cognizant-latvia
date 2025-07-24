// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const solutionForm = document.getElementById('solution-form');
    const errorTextarea = document.getElementById('error');
    const submitBtn = document.querySelector('.btn-submit');
    const solutionContainer = document.getElementById('solution-container');
    const solutionText = document.getElementById('solution-text');
    const copyBtn = document.getElementById('copy-btn');
    const feedbackBtns = document.querySelectorAll('.feedback-btn');
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
            title: "NetworkError",
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
                    🔍 Root Cause Analysis
                </h5>
                <p style="color: var(--text-secondary);">This WebDriverException typically occurs when the ChromeDriver version doesn't match your Chrome browser version or when there are permission issues.</p>
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
                    <li style="margin-bottom: 0.5rem;">Increase timeout values for slow-loading elements</li>
                    <li style="margin-bottom: 0.5rem;">Use more specific selectors to avoid ambiguity</li>
                    <li style="margin-bottom: 0.5rem;">Wait for network idle before interacting with elements</li>
                    <li style="margin-bottom: 0.5rem;">Check if elements are in iframes or shadow DOM</li>
                </ol>
            </div>
            
            <div>
                <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    📝 Code Example
                </h5>
                <pre style="background: #000; border: 1px solid var(--border); border-radius: 0.5rem; padding: 1rem; overflow-x: auto; font-family: 'Fira Code', monospace; font-size: 0.85rem; line-height: 1.4;"><code>const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Wait for network to be idle
  await page.goto('https://example.com', { waitUntil: 'networkidle' });
  
  // Use more specific locators with timeout
  await page.locator('button[data-testid="submit"]').click({ timeout: 10000 });
  
  // Wait for element to be visible
  await page.locator('#result').waitFor({ state: 'visible' });
  
  await browser.close();
})();</code></pre>
            </div>
        `,
        
        cypress: `
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    🌲 Root Cause Analysis
                </h5>
                <p style="color: var(--text-secondary);">Cypress command queue failures often result from timing issues or incorrect element selection.</p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    💡 Solution Steps
                </h5>
                <ol style="color: var(--text-secondary); padding-left: 1.5rem;">
                    <li style="margin-bottom: 0.5rem;">Use cy.wait() for dynamic content loading</li>
                    <li style="margin-bottom: 0.5rem;">Implement proper data-cy attributes for reliable selection</li>
                    <li style="margin-bottom: 0.5rem;">Add retry logic for flaky assertions</li>
                    <li style="margin-bottom: 0.5rem;">Clear application state between tests</li>
                </ol>
            </div>
            
            <div>
                <h5 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    📝 Code Example
                </h5>
                <pre style="background: #000; border: 1px solid var(--border); border-radius: 0.5rem; padding: 1rem; overflow-x: auto; font-family: 'Fira Code', monospace; font-size: 0.85rem; line-height: 1.4;"><code>describe('Form Submission', () => {
  beforeEach(() => {
    cy.visit('/form');
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  
  it('should submit form successfully', () => {
    // Wait for dynamic content
    cy.intercept('GET', '/api/form-data').as('formData');
    cy.wait('@formData');
    
    // Use data-cy attributes
    cy.get('[data-cy=name-input]').type('John Doe');
    cy.get('[data-cy=email-input]').type('john@example.com');
    
    // Submit and verify
    cy.get('[data-cy=submit-btn]').click();
    cy.get('[data-cy=success-message]').should('be.visible');
  });
});</code></pre>
            </div>
        `
    };

    // Initialize functions
    function updateCharCount() {
        if (errorTextarea) {
            const count = errorTextarea.value.length;
            if (charCount) {
                charCount.textContent = count + ' characters';
            }
        }
    }

    function loadPopularIssues() {
        if (!issuesGrid) return;
        
        const loadingHTML = Array(6).fill(0).map(() => `
            <div class="issue-card loading">
                <div class="issue-icon">
                    <div class="skeleton-icon"></div>
                </div>
                <div class="issue-content">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-description"></div>
                </div>
                <div class="issue-arrow">
                    <div class="skeleton-arrow"></div>
                </div>
            </div>
        `).join('');
        
        issuesGrid.innerHTML = loadingHTML;
        
        setTimeout(() => {
            const issuesHTML = popularIssues.map(issue => `
                <div class="issue-card" onclick="selectIssue('${issue.tool}', '${issue.title}')">
                    <div class="issue-icon">
                        <i class="${issue.icon}" style="${issue.color}"></i>
                    </div>
                    <div class="issue-content">
                        <h4>${issue.title}</h4>
                        <p>${issue.description}</p>
                    </div>
                    <div class="issue-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            `).join('');
            
            issuesGrid.innerHTML = issuesHTML;
        }, 1500);
    }

    function setLoadingState(loading) {
        if (!submitBtn) return;
        
        if (loading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Error...';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Solution';
        }
    }

    function displaySolution(solution) {
        if (solutionText && solutionContainer) {
            solutionText.innerHTML = solution;
            solutionContainer.classList.remove('hidden');
            
            solutionContainer.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
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
        
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 3000);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(solutionForm);
        const tool = formData.get('tool');
        const errorMessage = errorTextarea.value.trim();
        
        if (!errorMessage) {
            showToast('Please enter an error message', 'error');
            return;
        }
        
        setLoadingState(true);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const solution = solutionTemplates[tool] || solutionTemplates.selenium;
            displaySolution(solution);
            showToast('Solution generated successfully!', 'success');
            
        } catch (error) {
            showToast('Failed to generate solution. Please try again.', 'error');
            console.error('Error generating solution:', error);
        } finally {
            setLoadingState(false);
        }
    }

    async function copySolution() {
        if (!solutionText) return;
        
        try {
            const text = solutionText.textContent;
            await navigator.clipboard.writeText(text);
            showToast('Solution copied to clipboard!', 'success');
        } catch (error) {
            showToast('Failed to copy to clipboard', 'error');
        }
    }

    function sendFeedback(isHelpful) {
        const message = isHelpful ? 'Thank you for your feedback!' : 'Thanks for letting us know. We\'ll improve our solutions.';
        showToast(message, 'success');
    }

    // Global functions
    window.selectIssue = function(tool, title) {
        const radioBtn = document.querySelector(`input[value="${tool}"]`);
        if (radioBtn) {
            radioBtn.checked = true;
        }
        
        if (errorTextarea) {
            errorTextarea.value = `${title} error encountered while running ${tool} tests. Please provide solution.`;
            updateCharCount();
        }
        
        scrollToForm();
    };

    window.scrollToForm = function() {
        const errorForm = document.getElementById('error-form');
        if (errorForm) {
            errorForm.scrollIntoView({ behavior: 'smooth' });
        }
    };

    window.showContactInfo = function() {
        alert('Contact Information:\n\nEmail: monty.bagati@cognizant.com\nPhone: +371 25657827');
    };

    window.toggleMobileNav = function() {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        }
    };

    // Event listeners
    if (solutionForm) {
        solutionForm.addEventListener('submit', handleFormSubmit);
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', copySolution);
    }

    if (feedbackBtns) {
        feedbackBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const isHelpful = e.target.closest('.feedback-btn').dataset.helpful === 'true';
                sendFeedback(isHelpful);
            });
        });
    }

    if (errorTextarea) {
        errorTextarea.addEventListener('input', updateCharCount);
    }

    // Initialize
    loadPopularIssues();
    updateCharCount();
});
