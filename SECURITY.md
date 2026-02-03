# Security Policy

## Supported Versions

This project is actively maintained. Security updates are provided for the latest version.

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Reporting a Vulnerability

We take the security of this project seriously. If you discover a security vulnerability, please follow these steps:

### 1. **DO NOT** disclose the vulnerability publicly

Please do not create a public GitHub issue for security vulnerabilities.

### 2. Report the vulnerability privately

Send details to the repository owner via:
- GitHub Security Advisories (preferred)
- Direct message on GitHub

### 3. Include the following information

- Type of vulnerability
- Full path to the source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability, including how an attacker might exploit it

### 4. Response timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity and complexity

## Security Best Practices

When contributing to this project, please follow these security best practices:

### Firebase Security

- Never commit Firebase API keys directly in code
- Use environment variables for all sensitive configuration
- Ensure Firebase Security Rules are properly configured
- Restrict Firestore write access to authenticated users or Cloud Functions only

### Code Security

- Avoid using `innerHTML` - use `textContent` or DOM methods instead
- Validate and sanitize all user inputs
- Use HTTPS for all external API calls
- Keep dependencies up to date

### Cloud Functions Security

- Validate all incoming request payloads
- Implement rate limiting for public endpoints
- Use proper error handling without exposing sensitive information
- Log security-relevant events for monitoring

## Dependency Security

We use npm to manage dependencies. To check for known vulnerabilities:

```bash
npm audit
```

To automatically fix vulnerabilities:

```bash
npm audit fix
```

## Security Features

Current security measures in this project:

- ✅ XSS prevention using `textContent` instead of `innerHTML`
- ✅ Input validation for Cloud Function requests
- ✅ Environment variables for sensitive configuration
- ✅ HTTPS-only API communication
- ✅ Proper error handling with sanitized error messages
- ✅ Firebase Security Rules (should be configured in Firebase Console)

## Known Security Considerations

### Firebase API Keys

Firebase API keys in the frontend are **intentionally public** and are designed to work this way. Security is enforced through Firebase Security Rules, not by hiding the API key. Ensure your Firebase Security Rules are properly configured to restrict unauthorized access.

### Telegram Bot Token

The Telegram bot token should be stored securely as an environment variable and never committed to version control. Access to the bot token allows sending messages on behalf of your bot.

## Security Updates

Security updates will be released as soon as possible after a vulnerability is confirmed. Users will be notified via:

- GitHub Security Advisories
- Release notes
- Repository README (for critical issues)

## Acknowledgments

We appreciate the security research community's efforts in responsibly disclosing vulnerabilities. Contributors who report valid security issues will be acknowledged (if desired) in the fix release notes.

---

Last updated: 2026-02-03
