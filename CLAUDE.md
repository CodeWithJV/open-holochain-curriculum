# Holochain Curriculum Development Guide

## Build/Test Commands
- Build app: `npm run build:happ` - Builds both zomes and packages the app
- Build zomes only: `npm run build:zomes` - Compiles Rust code to WASM
- Run tests: `npm run test --workspace tests` - Runs all tests in the tests workspace
- Run single test: `cd tests && npx vitest run src/path/to/test.test.ts`
- Start dev environment: `npm run network` - Runs app locally with UI and playground
- Package the app: `npm run package` - Creates distributable package

## Code Style Guidelines
- **Rust:** Use 4-space indentation, descriptive variable names, and doc comments for public APIs
- **TypeScript:** Follow standard TS practices with strict typing enabled
- **Naming:** Use camelCase for JS/TS, snake_case for Rust
- **Error Handling:** Rust uses `ExternResult<T>` and proper error propagation with `?` operator
- **Architecture:** Follow Holochain's DNA/Zome structure with separate integrity and coordinator zomes
- **Testing:** Create thorough tests using vitest and @holochain/tryorama for scenario testing
- **Imports:** Group imports by origin (stdlib, external crates/packages, local)
- **Validation:** Implement proper validation in integrity zomes for all entries and links

## Tools
- **holochain-playground:** Used for visualization and testing
- **tryorama:** For scenario-based testing
- **hc/hc-spin:** CLI tools for Holochain development

## Git Workflow
- **Commit Messages**: Write concise, descriptive commit messages
- **Co-Authoring**: Never mention Claude in commits or include Co-Authored-By attributes
- **Commit Style**: Follow imperative style ("Add feature" not "Added feature")
