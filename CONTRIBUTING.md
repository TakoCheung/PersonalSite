# Contributing to Personal Website

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node.js version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:
- Use a clear and descriptive title
- Provide detailed description of the proposed feature
- Explain why this enhancement would be useful
- Include mockups or examples if applicable

### Security Vulnerabilities

**DO NOT** create public issues for security vulnerabilities. Please refer to [SECURITY.md](SECURITY.md) for reporting security issues.

## 🔧 Development Setup

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Firebase CLI (`npm install -g firebase-tools`)
- Git

### Initial Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/PersonalSite.git
   cd PersonalSite
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Set up Firebase functions:
   ```bash
   cd ../chatFunction/functions
   npm install
   ```

### Running Tests

```bash
cd frontend
npm run lint
```

### Development Workflow

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Test your changes locally
4. Lint your code:
   ```bash
   npm run lint
   ```

5. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

7. Create a Pull Request

## 📝 Coding Standards

### JavaScript/Vue.js

- Use ES6+ syntax
- Follow Vue 3 Composition API best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Avoid `console.log` in production code (use `console.warn` or `console.error` with purpose)

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings (except to avoid escaping)
- Add trailing commas in multi-line objects/arrays

### Vue Components

- Use PascalCase for component names
- Keep components small and focused
- Use props for parent-child communication
- Emit events for child-parent communication
- Document props and events in comments

### Security

- Never commit sensitive data (API keys, passwords, tokens)
- Use environment variables for configuration
- Avoid `innerHTML` - use `textContent` or proper DOM methods
- Validate and sanitize user inputs
- Follow Firebase Security Rules best practices

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's coding standards
- [ ] All tests pass (`npm run lint`)
- [ ] Commit messages are clear and descriptive
- [ ] No sensitive data is included
- [ ] Documentation is updated (if needed)
- [ ] Changes are minimal and focused

### Pull Request Description

Please include:
- Summary of changes
- Related issue number (if applicable)
- Type of change (bug fix, feature, documentation, etc.)
- Testing performed
- Screenshots (for UI changes)

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged

## 🏗️ Project Structure

```
PersonalSite/
├── frontend/              # Vue.js application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── views/        # Page components
│   │   ├── database/     # Firebase config
│   │   ├── router/       # Routing
│   │   └── utils/        # Helper functions
│   └── package.json
├── chatFunction/         # Firebase Cloud Functions
│   └── functions/
│       └── index.js
└── README.md
```

## 🧪 Testing

Currently, the project uses ESLint for code quality. We welcome contributions to add:
- Unit tests (Jest, Vitest)
- Component tests (Vue Test Utils)
- E2E tests (Cypress, Playwright)

## 📖 Additional Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Vuetify Documentation](https://vuetifyjs.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vuex Documentation](https://vuex.vuejs.org/)

## 💬 Getting Help

- Check existing issues and pull requests
- Review the [README.md](README.md)
- Ask questions in your pull request or issue

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

All contributors will be recognized in the project. Thank you for making this project better!

---

Happy Contributing! 🎉
