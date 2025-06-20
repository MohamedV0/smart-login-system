# Smart Login Application - Project Requirements

## Project Overview
This is the **fourth** JavaScript assignment. You will build a complete registration & authentication flow inspired by the reference implementation below.

## Demo Reference
Reference Implementation: [Smart Login Demo](https://smart-login.netlify.app/)

## Core Requirements
1. Registration
   - Provide a form that collects **Name**, **Email**, and **Password**.
   - Validate the inputs in real-time and on submit.
     - Email must follow valid syntax.
     - Password must meet your chosen strength policy.
     - If the email is already registered, display an error such as *"This e-mail already exists – please use another one."*
   - On successful registration redirect the user automatically to the **Login** page.

2. Login
   - Provide a login form that accepts **Email** and **Password**.
   - Authenticate the user against the data stored during registration (use *localStorage*).
   - On success redirect automatically to the **Home** page.
   - On failure display clear error messages (e.g. *"Incorrect password"* or *"Account not found"*).

3. Home (Protected Route)
   - Display a simple greeting such as **"Welcome, <user-name>"**.
   - Prevent direct access to this page unless the user is authenticated.

4. Logout
   - Provide a **Logout** button that clears the current session and redirects to the **Login** page.

## Technical Guidelines
- Use *localStorage* to persist registered users and the current session.
- Implement basic route-guard logic to block/redirect unauthorized access.
- Match or improve upon the visual design of the demo.
- Write modular, well-commented, and clean code.
- Handle all edge-cases and provide user-friendly feedback.
