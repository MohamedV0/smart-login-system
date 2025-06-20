# 🔐 Smart Login System

<div align="center">
  <img src="./images/auth.png" alt="Smart Login System Logo" width="100">
  <h3>Secure and user-friendly authentication solution</h3>
  <p>A modern web application with a complete registration and authentication flow</p>
</div>

## 📋 Project Overview

This project was developed as part of the [Route Academy](https://www.linkedin.com/company/routeacademy/) Full Stack Development Program. It represents the fourth JavaScript assignment in the curriculum, focusing on implementing a secure authentication system with user registration and login functionality.

<div align="center">
  <a href="https://mohamedv0.github.io/smart-login-system/">
    <img src="https://img.shields.io/badge/View_Live_Demo-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Preview" />
  </a>
</div>

## 💫 Interface Preview

<div align="center">
  <img src="docs/ui-screenshots/Hero.png" alt="Smart Login System Interface" width="800">
  
  <a href="docs/ui-screenshots">
    <img src="https://img.shields.io/badge/View_All_Screenshots-6366F1?style=for-the-badge&logo=instagram&logoColor=white" alt="View All Screenshots" />
  </a>
</div>

## ✨ Features

- 📝 **User Registration** with name, email, and password
- 🔒 **Secure Login** with email and password
- 🛡️ **Password Hashing** with PBKDF2 and random salts for enhanced security
- ✅ **Real-time Input Validation** with meaningful error messages
- 🔑 **Session Management** with localStorage
- 🚪 **Protected Routes** for authenticated users only
- 👤 **User Profile Display** with login timestamp
- 📱 **Responsive Design** for all devices
- 🎨 **Modern UI** with smooth transitions and animations

## 🛠️ Technology Stack

<div align="center">

### 🎨 Frontend Technologies
[![Frontend Skills](https://skillicons.dev/icons?i=html,css,js,bootstrap)](https://skillicons.dev)

### 📚 Libraries & Frameworks
[![SweetAlert2](https://img.shields.io/badge/SweetAlert2-8A2BE2?style=for-the-badge&logo=javascript&logoColor=white&style=plastic)](https://sweetalert2.github.io/)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=font-awesome&logoColor=white&style=plastic)](https://fontawesome.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white&style=plastic)](https://getbootstrap.com/)
[![CryptoJS](https://img.shields.io/badge/CryptoJS-333333?style=for-the-badge&logo=javascript&logoColor=white&style=plastic)](https://github.com/brix/crypto-js)

### 💻 Development Tools
[![VSCode](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white&style=plastic)](https://code.visualstudio.com/)
[![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white&style=plastic)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white&style=plastic)](https://github.com/)

</div>

## 📁 Project Structure

```
Smart Login System/
├── css/
│   ├── all.min.css (Font Awesome)
│   ├── bootstrap.min.css
│   ├── main.css (Custom styles)
│   └── sweetalert-custom.css
├── docs/
│   ├── project-requirements.md
│   └── ui-screenshots/
│       └── Hero.png
├── images/
│   └── Login.png
├── js/
│   ├── auth.js (Main application logic)
│   ├── bootstrap.bundle.min.js
│   └── sweetalert-config.js
├── webfonts/ (Font Awesome icon fonts)
├── index.html
└── README.md
```

## 🚀 How to Use

1. Clone the repository
   ```bash
   git clone https://github.com/MohamedV0/smart-login-system.git
   ```
2. Open `index.html` in your browser
3. Create a new account via the Sign Up tab
4. Log in with your credentials
5. View your profile information on the Home page
6. Log out when finished

## 📊 Code Organization

The JavaScript code follows an object-oriented pattern with separate classes for:

- **UserManager**: Core functionality for user authentication and management
- **Validator**: Form validation and error messages
- **UI**: UI updates and interactions
- **Utilities**: Helper functions for common tasks, including secure password hashing implementation

## ✅ Requirements Fulfilled

This implementation meets all the requirements specified in the [project requirements](./docs/project-requirements.md):

| Requirement | Implementation |
|-------------|----------------|
| Registration | ✅ Collects name, email, and password with validation |
| Login | ✅ Authenticates users against localStorage data |
| Home (Protected Route) | ✅ Shows welcome message and prevents unauthorized access |
| Logout | ✅ Clears session and redirects to login |
| Data Persistence | ✅ Uses localStorage for user data and session management |
| Input Validation | ✅ Real-time validation with meaningful error messages |
| Security | ✅ PBKDF2 password hashing with random salts for data protection |
| Clean UI/UX | ✅ Modern design with smooth transitions and feedback |

---

<div align="center">
  <p>Developed with ❤️ by <a href="https://github.com/MohamedV0">Mohamed Ashraf</a> as part of <a href="https://www.linkedin.com/company/routeacademy/">Route Academy</a> Full Stack Program</p>
  <p>
    <a href="https://github.com/MohamedV0"><img src="https://img.shields.io/badge/GitHub-MohamedV0-181717?style=flat&logo=github&logoColor=white" alt="GitHub"></a>
    <a href="mailto:mohamed.ashraf.v0@gmail.com"><img src="https://img.shields.io/badge/Contact-Email-EA4335?style=flat&logo=gmail&logoColor=white" alt="Email"></a>
    <a href="https://www.linkedin.com/in/mohamed-ashraf-v0/"><img src="https://img.shields.io/badge/LinkedIn-Profile-0A66C2?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
    <a href="https://mohamedv0.netlify.app/"><img src="https://img.shields.io/badge/Portfolio-Website-00C7B7?style=flat&logo=netlify&logoColor=white" alt="Portfolio"></a>
  </p>
</div>