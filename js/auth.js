const STORAGE_KEYS = {
    USERS: 'users',
    CURRENT_USER: 'currentUser'
};

const PATTERNS = {
    name: /^[a-zA-Z\s]{3,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^.{6,}$/
};

// DOM Elements
const DOM = {
    loginTab: document.getElementById('loginTab'),
    signupTab: document.getElementById('signupTab'),
    loginContent: document.getElementById('loginContent'),
    signupContent: document.getElementById('signupContent'),
    loginForm: document.getElementById('loginForm'),
    signupForm: document.getElementById('signupForm'),
    logoutBtn: document.getElementById('logoutBtn'),
    authPage: document.getElementById('authPage'),
    homePage: document.getElementById('homePage'),
    userNameElement: document.getElementById('userName'),
    userEmailElement: document.getElementById('userEmail'),
    loginTimeElement: document.getElementById('loginTime')
};

/**
 * User Manager Class
 * Handles all user-related operations including authentication and storage
 */

class UserManager {
    constructor() {
        this.users = [];
        this.init();
    }

    init() {
        this.loadUsers();
        this.setupEventListeners();
        this.checkAuthState();
    }

    loadUsers() {
        try {
            const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
            this.users = storedUsers ? JSON.parse(storedUsers) : [];
        } catch (error) {
            console.error('Error loading users:', error);
            this.users = [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.users));
        } catch (error) {
            console.error('Error saving users:', error);
            UI.showAlert('Failed to save user data', 'danger');
        }
    }

    createUser(name, email, password) {
        if (this.isEmailTaken(email)) {
            return {
                success: false,
                message: 'Email already exists'
            };
        }

        const newUser = {
            id: this.generateUserId(),
            name,
            email,
            password: Utilities.hashPassword(password),
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveToStorage();
        
        return {
            success: true,
            message: 'Account created successfully'
        };
    }

    generateUserId() {
        return `${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email);

        if (!user || !Utilities.verifyPassword(password, user.password)) {
            return {
                success: false,
                message: 'Incorrect email or password'
            };
        }

        const sessionData = {
            userId: user.id,
            name: user.name,
            email: user.email,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionData));
        
        return {
            success: true,
            user: sessionData
        };
    }

    logout() {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        this.navigateToAuth();
        UI.showAlert('Logged out successfully', 'success');
    }

    isEmailTaken(email) {
        return this.users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    getCurrentUser() {
        try {
            const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    setupEventListeners() {
        if (DOM.loginTab && DOM.signupTab) {
            DOM.loginTab.addEventListener('click', () => this.switchTab('login'));
            DOM.signupTab.addEventListener('click', () => this.switchTab('signup'));
        }

        if (DOM.signupForm) {
            DOM.signupForm.addEventListener('submit', this.handleSignup.bind(this));
        }

        if (DOM.loginForm) {
            DOM.loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }

        if (DOM.logoutBtn) {
            DOM.logoutBtn.addEventListener('click', this.logout.bind(this));
        }

        this.setupInputValidations();
    }

    setupInputValidations() {
        const inputs = {
            signupName: {
                element: document.getElementById('signupName'),
                pattern: PATTERNS.name,
                fieldName: 'Name'
            },
            signupEmail: {
                element: document.getElementById('signupEmail'),
                pattern: PATTERNS.email,
                fieldName: 'Email'
            },
            signupPassword: {
                element: document.getElementById('signupPassword'),
                pattern: PATTERNS.password,
                fieldName: 'Password'
            },
            loginEmail: {
                element: document.getElementById('loginEmail'),
                pattern: PATTERNS.email,
                fieldName: 'Email'
            },
            loginPassword: {
                element: document.getElementById('loginPassword'),
                pattern: PATTERNS.password,
                fieldName: 'Password'
            }
        };

        Object.values(inputs).forEach(({ element, pattern, fieldName }) => {
            if (element) {
                element.addEventListener('input', Utilities.debounce(() => {
                    Validator.validateInput(element, pattern, fieldName);
                }, 300));
            }
        });
    }

    switchTab(tab) {
        const authTabs = document.querySelector('.auth-tabs');

        if (tab === 'login') {
            DOM.loginTab.classList.add('active');
            DOM.signupTab.classList.remove('active');
            DOM.loginContent.classList.add('active');
            DOM.signupContent.classList.remove('active');
            authTabs.classList.remove('signup-active');
        } else {
            DOM.loginTab.classList.remove('active');
            DOM.signupTab.classList.add('active');
            DOM.loginContent.classList.remove('active');
            DOM.signupContent.classList.add('active');
            authTabs.classList.add('signup-active');
        }

    }

    handleSignup(e) {
        e.preventDefault();

        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();

        const nameValidation = Validator.validateInput(document.getElementById('signupName'), PATTERNS.name, 'Name');
        const emailValidation = Validator.validateInput(document.getElementById('signupEmail'), PATTERNS.email, 'Email');
        const passwordValidation = Validator.validateInput(document.getElementById('signupPassword'), PATTERNS.password, 'Password');

        if (!nameValidation || !emailValidation || !passwordValidation) {
            UI.showAlert('All inputs are required and must be valid', 'danger');
            return;
        }

        const result = this.createUser(name, email, password);
        if (result.success) {
            UI.showAlert('Success! Redirecting to login...', 'success');
            UI.clearForm(DOM.signupForm);

            setTimeout(() => {
                this.switchTab('login');
            }, 2000);
        } else {
            UI.showAlert(result.message, 'danger');
        }
    }

    handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        const emailValidation = Validator.validateInput(document.getElementById('loginEmail'), PATTERNS.email, 'Email');
        const passwordValidation = Validator.validateInput(document.getElementById('loginPassword'), PATTERNS.password, 'Password');

        if (!emailValidation || !passwordValidation) {
            UI.showAlert('All inputs are required and must be valid', 'danger');
            return;
        }

        const result = this.login(email, password);
        if (result.success) {
            UI.showAlert('Login successful! Redirecting...', 'success');

            setTimeout(() => {
                this.navigateToHome();
            }, 1000);
        } else {
            UI.showAlert(result.message, 'danger');
        }
    }

    navigateToHome() {
        if (DOM.authPage && DOM.homePage) {
            DOM.authPage.classList.add('d-none');
            DOM.homePage.classList.remove('d-none');
            this.updateHomePageInfo();
        }
    }

    navigateToAuth() {
        if (DOM.authPage && DOM.homePage) {
            DOM.authPage.classList.remove('d-none');
            DOM.homePage.classList.add('d-none');
        }
    }

    updateHomePageInfo() {
        const currentUser = this.getCurrentUser();

        if (currentUser) {
            if (DOM.userNameElement) {
                DOM.userNameElement.textContent = currentUser.name;
            }

            if (DOM.userEmailElement) {
                DOM.userEmailElement.textContent = currentUser.email;
            }

            if (DOM.loginTimeElement && currentUser.loginTime) {
                DOM.loginTimeElement.textContent = Utilities.formatDate(new Date(currentUser.loginTime));
            }
        }
    }

    checkAuthState() {
        const currentUser = this.getCurrentUser();
        currentUser ? this.navigateToHome() : this.navigateToAuth();
    }
}

/**
 * Form Validation Class
 * Handles input validation and error messages
 */
class Validator {
    static validateInput(element, pattern, fieldName) {
        if (!element) return false;

        const value = element.value.trim();
        const isValid = value && pattern.test(value);

        if (isValid) {
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
        } else {
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');

            const formGroup = element.closest('.form-group');
            if (formGroup) {
                const feedback = formGroup.querySelector('.invalid-feedback');
                if (feedback) {
                    feedback.textContent = this.getErrorMessage(fieldName, value ? 'pattern' : 'required');
                }
            }
        }

        return isValid;
    }

    static getErrorMessage(fieldName, type) {
        if (type === 'required') {
            return `${fieldName} is required`;
        }

        const messages = {
            Name: 'Name must be at least 3 characters long',
            Email: 'Please enter a valid email address',
            Password: 'Password must be at least 6 characters long'
        };

        return messages[fieldName] || 'Invalid input';
    }
}

/**
 * UI Helper Class
 * Handles UI updates and interactions
 */
class UI {
    static showAlert(message, type = 'danger') {
        const alertType = type === 'success' ? 'success' : 'error';
        showNotification(alertType, message);
    }

    static clearForm(form) {
        if (!form) return;

        form.reset();
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.classList.remove('is-invalid', 'is-valid');
        });
    }
}

/**
 * Utility Class
 * Contains helper functions
 */
class Utilities {
    static debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    static formatDate(date) {
        if (!date) return '';

        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        return date.toLocaleString(undefined, options);
    }

    static hashPassword(password) {
        const salt = CryptoJS.lib.WordArray.random(16).toString();
        const hash = CryptoJS.PBKDF2(password, salt, {
            keySize: 512 / 32,
            iterations: 1000
        }).toString();
        
        return `${salt}:${hash}`;
    }

    static verifyPassword(password, storedHash) {
        const [salt, originalHash] = storedHash.split(':');
        
        const hash = CryptoJS.PBKDF2(password, salt, {
            keySize: 512 / 32,
            iterations: 1000
        }).toString();
        
        return hash === originalHash;
    }
}

// Initialize UserManager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UserManager();
});