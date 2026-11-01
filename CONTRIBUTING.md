# Contributing to Utsav

Thank you for contributing to Utsav (उत्सव). We maintain strict engineering standards across type safety, automated testing, security, and accessibility.

## Development Workflow

1. Fork and clone the repository.
2. Install dependencies:
   ```bash
   npm ci
   ```
3. Copy environment configuration:
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Quality Verification Checklist

Before opening a pull request or submitting code, ensure all checks pass:

```bash
# 1. Format verification
npm run format:check

# 2. Strict linter (zero warnings allowed)
npm run lint

# 3. TypeScript strict compiler check
npm run typecheck

# 4. Automated unit, integration, and API test suite
npm run test

# 5. Production build
npm run build
```

## Architectural Guidelines

- **Separation of Concerns**: Mathematical calculations (rupee allocation, timeline dependencies, variance calculation) must remain deterministic in `src/core/`. Generative AI in `src/ai/` handles natural language parsing, cultural context, and interactive suggestions only.
- **Type Safety**: Strictly avoid `any` or `@ts-ignore`. All external data and API requests must be validated using Zod schemas (`src/server/schemas.ts`).
- **Accessibility**: All interactive elements must adhere to WCAG 2.2 AA standards with full keyboard support and screen reader landmarks.
- **Security**: No secrets or API credentials may be exposed to client-side bundles. All server responses must carry strict CSP headers.
