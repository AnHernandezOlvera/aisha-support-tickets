# AISHA | Reports

This project is a **technical test** implementing a simple ticket management module built with **React 19**, **Redux Toolkit**, **Material UI**, and **Tailwind CSS**.  
It delivers a **partial CRUD flow**: tickets can be created, listed, viewed in detail, and deleted.  
Includes form validation, file upload, feedback notifications, and a responsive UI.

---

## Features

- **Create tickets** with subject, priority, details, and optional file attachment.
- **List tickets** in a paginated table.
- **View ticket details** in a modal dialog.
- **Delete tickets**

---

## Tech Stack

- ⚛️ **React 19**
- 🎨 **Material UI + Tailwind CSS**
- 🗄️ **Redux Toolkit**
- 📦 **TypeScript**

---

## Project Structure

src/
├── features/reports # Ticket logic (components + Redux slice)
├── hooks # Custom hooks (form validation, scroll, resize)
├── layouts # Main layout, header, footer
├── store # Global Redux store
├── theme # MUI theme configuration
├── assets # Fonts, icons, branding

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
