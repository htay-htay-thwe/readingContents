# Reading Contents

A modern, full-featured content management platform built with Nuxt 3, Vue 3, and Tailwind CSS. This application enables users to create, share, and engage with blog posts in a seamless, responsive environment with both light and dark mode support.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- **User Authentication**: Secure login and registration system
- **Post Management**: Create, read, update, and delete blog posts
- **Rich Text Editor**: Advanced text formatting with TipTap editor
- **User Profiles**: Customizable user profiles with avatar support
- **Saved Posts**: Bookmark and save favorite posts for later reading
- **Comments & Replies**: Engage with posts through threaded discussions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Experience
- **Dark/Light Mode**: Toggle between themes for comfortable reading
- **Smooth Animations**: Enhanced UI with AOS (Animate On Scroll) library
- **Image Carousel**: Browse through multiple images in posts
- **Pagination**: Navigate through posts efficiently
- **Form Validation**: Client-side validation using VeeValidate and Yup
- **Notifications**: Real-time feedback with Notiflix

## 🛠 Tech Stack

### Frontend Framework
- **Nuxt 3** - The Intuitive Vue Framework
- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Flowbite** - Tailwind CSS component library
- **Heroicons** - Beautiful hand-crafted SVG icons

### State Management & Data
- **Pinia** - Vue Store for state management
- **Axios** - Promise-based HTTP client

### Additional Libraries
- **TipTap** - Headless, framework-agnostic rich text editor
- **VeeValidate** - Form validation library
- **Yup** - Schema validation
- **AOS** - Animate On Scroll library
- **Swiper** - Modern mobile touch slider

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16.x or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.x or higher) or **yarn** (v1.22.x or higher)

Check your installed versions:

```bash
node -v
npm -v
```

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/htay-htay-thwe/readingContents.git
```

2. **Navigate to the project directory**

```bash
cd readingContents
```

3. **Install dependencies**

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

## 🏃‍♂️ Running the Application

### Development Mode

Start the development server with hot-reload at `http://localhost:3000`:

```bash
npm run dev
```

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Generate Static Site

Generate a static version of your application:

```bash
npm run generate
```

## 📁 Project Structure

```
readingContents/
├── assets/              # Static assets (CSS, images)
│   ├── css/
│   └── img/
├── components/          # Vue components
│   ├── DetailPage/      # Post detail components
│   ├── Footer/          # Footer component
│   ├── MainPage/        # Main page components (Posts, Create, Edit)
│   ├── Navbar/          # Navigation and settings
│   ├── Profile/         # User profile components
│   └── Reg/             # Authentication components
├── pages/               # Application pages (auto-routing)
│   ├── Detail/          # Post detail page
│   ├── EditPost/        # Edit post page
│   └── Profile/         # User profile page
├── plugins/             # Nuxt plugins
├── public/              # Public static files
├── server/              # Server-side code
├── stores/              # Pinia stores
├── utils/               # Utility functions (API calls, helpers)
├── nuxt.config.ts       # Nuxt configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies
```

## 📸 Screenshots

### Authentication

##  Login Page
![Screenshot (965)](https://github.com/user-attachments/assets/d7ff4233-08ff-4494-9708-cadea3b79b21)

## Register Page
![Screenshot (964)](https://github.com/user-attachments/assets/c375a629-f59f-44f3-a209-4c161ff55cac)

### Light Mode Interface

## Main Page - light Mode
![localhost_3000_about (1)](https://github.com/user-attachments/assets/df30cb32-3ff1-4c24-914a-777531bafcb6)

## Detail Page - light Mode
![localhost_3000_detail_15](https://github.com/user-attachments/assets/ad628788-bb6b-4568-866f-d18dbe091109)

## Profile Page - change Information - light Mode
![localhost_3000_detail_15 (1)](https://github.com/user-attachments/assets/046a78b3-c2db-4c13-a4ab-3d56928fe017)

## Create Post Page - light Mode 
![localhost_3000_detail_15 (2)](https://github.com/user-attachments/assets/9820320d-9073-43cc-8f4f-ea3b16533a15)

### Dark Mode Interface

## Change Password - Dark Mode 
![localhost_3000_detail_15 (3)](https://github.com/user-attachments/assets/369f28c5-b030-4464-94f3-8a19c90d3ee5)

## Save Posts - Dark Mode 
![localhost_3000_about](https://github.com/user-attachments/assets/c1cea367-5579-4007-9850-43d54a5916ac)

## Profile Page - Dark Mode 
![localhost_3000_about (2)](https://github.com/user-attachments/assets/f5897bf3-75d1-467c-9599-349c3884d80e)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# API Configuration
NUXT_PUBLIC_API_BASE_URL=your_api_url_here
```

### Tailwind CSS

The project uses Tailwind CSS with custom configurations. You can modify the `tailwind.config.js` file to customize colors, spacing, and other design tokens.

### Color Mode

The application supports automatic dark/light mode switching. The theme preference is stored locally and persists across sessions.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow Vue 3 Composition API best practices
- Use TypeScript for type safety
- Maintain consistent code formatting
- Write meaningful commit messages
- Test your changes before submitting

## 🐛 Known Issues

- None at the moment. Please report any bugs in the Issues section.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Htay Htay Thwe**

- GitHub: [@htay-htay-thwe](https://github.com/htay-htay-thwe)

## 🙏 Acknowledgments

- [Nuxt.js](https://nuxt.com/) - The amazing framework that powers this application
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [TipTap](https://tiptap.dev/) - For the rich text editor
- [Flowbite](https://flowbite.com/) - For the beautiful UI components

---

<div align="center">
  Made with ❤️ by Htay Htay Thwe
</div>
