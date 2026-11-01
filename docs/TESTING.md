# Testing Strategy & Verification Report

Utsav enforces a comprehensive testing regime spanning unit tests, integration tests, contract tests, and end-to-end browser workflows.

## Test Commands

```bash
# Run full Vitest test suite
npm run test

# Run tests with code coverage analysis
npm run coverage

# Run Firestore security rules verification on local Firebase emulator
npm run test:rules

# Run automated browser E2E and visual checks with Playwright
npm run test:e2e

# Run format and strict linting checks
npm run format:check
npm run lint

# Run strict TypeScript compiler verification
npm run typecheck
```

## Test Suite Distribution (219+ Tests Across 39 Suites)

| Layer                   | Coverage Area                                                                                          | Test Files                                                                                                                                             | Total Tests   | Status          |
| :---------------------- | :----------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :-------------- |
| **Financial Engine**    | Exact rupee allocations, largest-remainder math, zero-drift rounding, budget summaries                 | `src/core/allocate.test.ts`, `src/core/money.test.ts`, `src/core/budget-summary.test.ts`, `src/core/estimate.test.ts`                                  | 24            | ✅ Passed       |
| **Temporal & Muhurat**  | Timeline calculation, monsoon/festival warning checks, ICS calendar generation, date offsets           | `src/core/schedule.test.ts`, `src/core/calendar.test.ts`, `src/core/ics.test.ts`                                                                       | 17            | ✅ Passed       |
| **Vendor Workflows**    | Vendor checklist progression, advance payment math, contact state updates                              | `src/core/changes.test.ts`, `src/core/assemble.test.ts`                                                                                                | 34            | ✅ Passed       |
| **GenAI & Providers**   | Gemini 2.5 structured parsing, 7-tool function declarations, model chain failover, prompt construction | `src/ai/assistant.test.ts`, `src/ai/tools.test.ts`, `src/ai/prompts.test.ts`, `src/ai/engines.test.ts`                                                 | 24            | ✅ Passed       |
| **Server & Security**   | Per-request nonce CSP headers, in-memory rate limiting, Zod schema validation, origin guarding         | `src/server/guard.test.ts`, `src/server/csp.test.ts`, `src/server/throttle.test.ts`, `src/server/memo.test.ts`                                         | 18            | ✅ Passed       |
| **API Endpoints**       | End-to-end route tests for `/api/brief`, `/api/plan`, `/api/ideas`, `/api/assistant`, `/api/health`    | `src/app/api/routes.test.ts`                                                                                                                           | 13            | ✅ Passed       |
| **User Interface**      | Wizard 3-step intake, interactive dashboard tabs, assistant chat drawer, bulb meters, family sharing   | `src/ui/wizard/Wizard.test.tsx`, `src/ui/dashboard/Dashboard.test.tsx`, `src/ui/dashboard/DashboardTabs.test.tsx`, `src/ui/common/BulbStrand.test.tsx` | 38            | ✅ Passed       |
| **Localization (i18n)** | Key symmetry, parameter substitution, language switching across EN, HI, TA, TE                         | `src/i18n/i18n.test.tsx`                                                                                                                               | 6             | ✅ Passed       |
| **Persistence**         | LocalStorage schema adherence, reactive subscriptions, offline sync                                    | `src/store/local.test.ts`                                                                                                                              | 5             | ✅ Passed       |
| **Security Rules**      | Firestore security rules emulator tests (owner/editor/viewer RBAC)                                     | `vitest.rules.config.mts`                                                                                                                              | 8             | ✅ Passed       |
| **Visual Geometry**     | 3D serial light curve calculations and strand distributions                                            | `src/ui/scene/lane.test.ts`, `src/ui/scene/strands.test.ts`                                                                                            | 7             | ✅ Passed       |
| **Total**               |                                                                                                        | **39 Test Suites**                                                                                                                                     | **219 Tests** | **100% Passed** |

## Deterministic Mocking Strategy

- **Zero Network Flakiness**: All GenAI endpoints are tested with deterministic fixture providers (`MockAiProvider`) that simulate model responses, malformed JSON, and rate limits without outbound network calls.
- **Clock Independence**: Every temporal test accepts an explicit `today` parameter, eliminating time-zone or date-shift flakiness.
