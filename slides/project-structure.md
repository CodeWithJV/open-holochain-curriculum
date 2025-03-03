---
theme: ./theme
colorSchema: light
highlighter: shiki
aspectRatio: 16/9
favicon: https://www.holochain.org/img/gradiant_halo.svg
fonts:
    sans: Mulish
    serif: Lato
    weights: '100,300,400,700'
---
Holochain Project Structure
---

# Holochain App Components

<div class="flex">
<div class="w-1/2">

<v-clicks>

- **DNAs**: Backend code (Rust)
- **Tests**: Integration testing (TypeScript)
- **UI**: Frontend (Web technologies) 
- **Workdir**: Configuration files
- **Building**: Package management files

</v-clicks>

</div>
<div class="w-1/2">

```
project_root/
  ├── dnas/            # Backend
  ├── tests/           # Integration tests
  ├── ui/              # Frontend
  ├── workdir/         # Configuration
  ├── package.json     # Node dependencies
  ├── Cargo.toml       # Rust dependencies
  └── flake.nix        # Nix environment
```

</div>
</div>

---

# DNAs Folder Structure

<div class="flex">
<div class="w-1/2">

<v-clicks>

- Contains backend code
- Written in Rust
- **Zomes**: Main code modules
  - **Integrity**: Data models & validation
  - **Coordinator**: Business logic & APIs
- **dna.yaml**: DNA configuration

</v-clicks>

</div>
<div class="w-1/2">

```
project_root/
  ├── dnas/
  │   └── your_dna/
  │       ├── zomes/
  │       │   ├── integrity/
  │       │   │   └── your_zome/
  │       │   │       ├── src/
  │       │   │       │   └── lib.rs
  │       │   │       └── Cargo.toml
  │       │   └── coordinator/
  │       │       └── your_zome/
  │       │           ├── src/
  │       │           │   └── lib.rs
  │       │           └── Cargo.toml
  │       └── dna.yaml
  └── ...
```

</div>
</div>

---

# Integrity Zome Structure

<div class="flex">
<div class="w-1/2">

<v-clicks>

- Contains data models
- Defines entry types
- Implements validation rules
- Sets the "rules of the game"
- Must be deterministic
- Changes to integrity code create a new network

</v-clicks>

</div>
<div class="w-1/2">

<v-clicks>

```rust
use hdi::prelude::*;

#[hdk_entry_helper]
#[derive(Clone)]
pub struct Joke {
  pub text: String,
  pub creator: AgentPubKey,
}

entry_defs![
  PathEntry::entry_def(),
  Joke::entry_def()
];

#[hdk_extern]
pub fn validate(op: Op) -> ExternResult<
  ValidateCallbackResult
> {
  Ok(ValidateCallbackResult::Valid)
}
```

</v-clicks>

</div>
</div>

---

# Coordinator Zome Structure

<div class="flex">
<div class="w-1/2">

<v-clicks>

- Implements business logic
- Exposes APIs for client code
- CRUD operations for entries
- Query functions
- "Plays the game" according to integrity rules
- Can be updated without creating a new network

</v-clicks>

</div>
<div class="w-1/2">

<v-clicks>

```rust
use hdk::prelude::*;
use jokes_integrity::*;

#[hdk_extern]
pub fn create_joke(joke: Joke) -> ExternResult<Record> {
  let joke_hash = create_entry(
    &EntryTypes::Joke(joke.clone())
  )?;
  let record = get(joke_hash, GetOptions::default())?
    .ok_or(wasm_error!("Could not find joke"))?;
  Ok(record)
}

#[hdk_extern]
pub fn get_joke(hash: ActionHash) -> ExternResult<Option<Record>> {
  get(hash, GetOptions::default())
}
```

</v-clicks>

</div>
</div>

---

# Tests Folder: Structure

<div class="flex">
<div class="w-1/2">

<v-clicks>

- Integration tests for backend
- Written in TypeScript/JavaScript
- Uses Tryorama testing framework
- Tests scenarios with multiple agents
- Simulates real network behavior
- Critical for ensuring app reliability

</v-clicks>

</div>
<div class="w-1/2">

<v-clicks>

```typescript
// tests/src/jokes/jokes.test.ts
import { runScenario } from "@holochain/tryorama";
import { decode } from "@msgpack/msgpack";

runScenario(async (scenario) => {
  // Set up conductors with the hApp
  const [alice, bob] = await scenario.addPlayersWithHapps([
    { happ: { appBundleSource: appPath } }, 
    { happ: { appBundleSource: appPath } }
  ]);

  // Test code continues...
});
```

</v-clicks>

</div>
</div>

---

# Tests Folder: Scenario Example

<div class="flex">
<div class="w-1/2">

<v-clicks>

- Multi-agent testing
- Create data with one agent
- Wait for network sync
- Verify data with another agent
- Test different scenarios
- Validate app behavior

</v-clicks>

</div>
<div class="w-1/2">

<v-clicks>

```typescript
// Alice creates a joke
const jokeRecord = await alice.cells[0].callZome({
  zome_name: "jokes",
  fn_name: "create_joke",
  payload: { 
    text: "Why did the chicken...", 
    creator: alice.agentPubKey 
  }
});

// Wait for DHT sync
await scenario.sleep(100);

// Bob retrieves the joke
const retrievedJoke = await bob.cells[0].callZome({
  zome_name: "jokes",
  fn_name: "get_joke_by_hash",
  payload: jokeRecord.signed_action.hashed.hash
});

assert.ok(retrievedJoke);
```

</v-clicks>

</div>
</div>

---

# UI Folder

<div class="flex">
<div class="w-1/2">

<v-clicks>

- Frontend application code
- Can use any web framework:
  - Svelte 
  - React
  - Vue
  - Lit
  - Vanilla JS
- Communicates with Holochain via:
  - `@holochain/client` package
  - `callZome()` function for API calls
- CSS/assets for styling

</v-clicks>

</div>
<div class="w-1/2">

<v-clicks>

```
project_root/
  ├── ui/
  │   ├── src/
  │   │   ├── App.svelte
  │   │   ├── jokes/
  │   │   │   ├── CreateJoke.svelte
  │   │   │   ├── JokeDetail.svelte
  │   │   │   └── EditJoke.svelte
  │   │   ├── contexts.ts
  │   │   ├── index.css
  │   │   └── main.ts
  │   ├── public/
  │   │   └── assets/
  │   ├── index.html
  │   └── package.json
  └── ...
```

</v-clicks>

</div>
</div>

---

# UI-Backend Connection: Setup

<div class="flex">
<div class="w-1/2">

<v-clicks>

- UI connects to Holochain via WebSocket
- `@holochain/client` creates connection
- `AppAgentWebsocket` client handles calls
- Secure and efficient connection

</v-clicks>

</div>
<div class="w-1/2">

<v-clicks>

```typescript
import { 
  AppAgentWebsocket,
  encodeHashToBase64 
} from '@holochain/client';

// Connect to Holochain conductor
const client = await AppAgentWebsocket.connect(
  "http://localhost:8888", 
  "jokes-app"
);
```

</v-clicks>

</div>
</div>

---

# UI-Backend: API Calls

<div class="flex">
<div class="w-1/2">

<v-clicks>

- `callZome()` invokes zome functions
- Async/await for handling responses
- Structured payloads for parameters
- Returns ActionHash for created entries
- MessagePack-based serialization

</v-clicks>

</div>
<div class="w-1/2">

<v-clicks>

```typescript
// Create a joke
const record = await client.callZome({
  cap_secret: null,
  role_name: "jokes",
  zome_name: "jokes",
  fn_name: "create_joke",
  payload: {
    text: "Why did the crab...",
    creator: myAgentKey
  }
});

// Get the ActionHash
const actionHash = record.signed_action.hashed.hash;
const hash = encodeHashToBase64(actionHash);
console.log("New joke hash:", hash);
```

</v-clicks>

</div>
</div>

---

# Workdir Folder: Overview

<div class="flex">
<div class="w-1/2">

<v-clicks>

- Contains Holochain configuration
- **happ.yaml**: Defines hApp structure
  - Lists DNAs to include
  - Sets network config
- **web-happ.yaml**: Bundles hApp + UI
- May contain network seed files
- Pre-built DNA and hApp files

</v-clicks>

</div>
<div class="w-1/2">

<v-clicks>

```yaml
# workdir/happ.yaml
---
manifest_version: "1"
name: jokes-app
description: "A simple jokes application"
roles:
  - name: jokes
    provisioning:
      strategy: create
      deferred: false
    dna:
      bundled: "../dnas/jokes/workdir/jokes.dna"
      modifiers:
        network_seed: ~
        properties: ~
```

</v-clicks>

</div>
</div>

---

# Package Management

<div class="flex">
<div class="w-1/2">

<v-clicks>

- **package.json**: 
  - Node.js dependencies
  - Project scripts
  - UI dependencies
  - Workspaces configuration
- **Cargo.toml**: 
  - Rust dependencies for DNAs
  - Workspace configuration
- **flake.nix**: 
  - Nix environment definition
  - Dev environment setup

</v-clicks>

</div>
<div class="w-1/2">

<v-clicks>

```json
// package.json (partial)
{
  "name": "jokes-app",
  "private": true,
  "workspaces": [
    "ui",
    "tests"
  ],
  "scripts": {
    "start": "npm run network",
    "network": "hc s clean && npm run build:happ && concurrently...",
    "test": "npm run build:happ && npm test --workspace tests",
    // More scripts...
  }
}
```

</v-clicks>

</div>
</div>

---

# Build Scripts & Package Management

<div class="flex">
<div class="w-1/2">

<v-clicks>

- **Build pipeline**:
  - Compile Rust to WASM
  - Package DNAs
  - Build UI
  - Create distributable app
- **Development commands**:
  - Hot reloading for UI
  - Testing scripts
  - Clean environment
  - Network simulation

</v-clicks>

</div>
<div class="w-1/2">

<v-clicks>

```json
// package.json scripts
"scripts": {
  "start": "npm run network",
  "build:happ": "npm run build:dnas && npm run build:webapp && npm run pack",
  "build:dnas": "npm run build:zomes && hc app pack ./workdir",
  "build:zomes": "CARGO_TARGET_DIR=target cargo build \
  --release --target wasm32-unknown-unknown",
  "build:webapp": "cd ui && npm run build",
  "dev": "cd ui && npm run dev",
  "test": "npm run build:happ && npm test --workspace tests"
}
```

</v-clicks>

</div>
</div>

---

# Running a Holochain Project

<div class="flex">
<div class="w-1/2">

<v-clicks>

1. **Setup environment**:
   ```bash
   nix develop
   ```
   - Loads all required tools

2. **Install dependencies**:
   ```bash
   npm install
   ```
   - Sets up UI & test dependencies

</v-clicks>

</div>
<div class="w-1/2">

<v-clicks>

3. **Build & launch**:
   ```bash
   npm run start
   ```
   - Compiles zomes to WASM
   - Packages the hApp
   - Starts Holochain conductor
   - Launches UI server

</v-clicks>

</div>
</div>

---

# Common Build Commands

<div class="flex">
<div class="w-1/2">

<v-clicks>

- **Build everything**:
  ```bash
  npm run build:happ
  ```

- **Build only zomes**:
  ```bash
  npm run build:zomes
  ```

</v-clicks>

</div>
<div class="w-1/2">

<v-clicks>

- **Run tests**:
  ```bash
  npm test
  ```
  
- **Package for distribution**:
  ```bash
  npm run pack
  ```

</v-clicks>

</div>
</div>

---
layout: end
---

# Next: Challenge 1
Actions & Entries Implementation
