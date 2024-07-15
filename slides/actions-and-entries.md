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

# Project Structure, Actions and Entries

---

# Holochain Project Structure Overview

<v-clicks>

- A typical Holochain project has several key components
- We'll explore each part of the structure in detail
- Understanding this structure is crucial for Holochain development

</v-clicks>

---

# DNAs Folder

<div class="flex">
<div class="w-1/2">

```
project_root/
  ├── DNAs/
  │   └── your_dna/
  │       ├── zomes/
  │       │   ├── integrity/
  │       │   └── coordinator/
  │       └── dna.yaml
  └── ...
```

</div>
<div class="w-1/2">

<v-clicks>

- Contains backend code
- Written in Rust
- Includes:
  - Integrity zomes
  - Coordinator zomes
- `dna.yaml` defines DNA structure

</v-clicks>

</div>
</div>

---

# Tests Folder

<div class="flex">
<div class="w-1/2">

```
project_root/
  ├── tests/
  │   └── integration/
  │       └── test_your_dna.rs
  └── ...
```

</div>
<div class="w-1/2">

<v-clicks>

- For testing backend application
- Typically includes integration tests
- Ensures DNA functions correctly
- We'll cover testing in more detail later

</v-clicks>

</div>
</div>

---

# UI Folder

<div class="flex">
<div class="w-1/2">

```
project_root/
  ├── ui/
  │   ├── src/
  │   ├── public/
  │   └── package.json
  └── ...
```

</div>
<div class="w-1/2">

<v-clicks>

- Contains all frontend code
- Holochain supports:
  - Svelte
  - Vue
  - Solid
- Can use any frontend framework with Holochain's JavaScript API
  - React
  - Angular
  - Custom CLI tools

</v-clicks>

</div>
</div>

---

# Workdir Folder

<div class="flex">
<div class="w-1/2">

```
project_root/
  ├── workdir/
  │   ├── happ.yaml
  │   └── .hc_live
  └── ...
```

</div>
<div class="w-1/2">

<v-clicks>

- Contains Holochain configuration
- Not typically modified directly
- Includes:
  - `happ.yaml`: Defines hApp structure
  - `.hc_live`: Runtime data for Holochain

</v-clicks>

</div>
</div>

---

# Configuration Files

<div class="flex">
<div class="w-1/2">

```
project_root/
  ├── package.json
  ├── flake.nix
  ├── Cargo.toml
  └── ...
```

</div>
<div class="w-1/2">

<v-clicks>

- `package.json`: 
  - Node.js dependencies
  - Project scripts
- `flake.nix`: 
  - Nix configuration for reproducible builds
- `Cargo.toml`: 
  - Rust dependencies for DNAs

</v-clicks>

</div>
</div>

---

# Starting a Holochain Project

<v-clicks>

1. Set up the development environment:
   ```bash
   nix develop
   ```
   - This command installs dependencies used by the Holochain CLI

2. Launch the project:
   ```bash
   npm start
   ```
   - Starts both the Holochain conductor and the UI

3. Access your application in the browser (typically at `http://localhost:8888`)

</v-clicks>

---

# Data in Holochain

<v-clicks>

- Holochain uses a unique data model
- Each piece of data is represented as a Record
- Every Record contains an Action
- This structure ensures data integrity and traceability

</v-clicks>

---

# Actions in Holochain

<v-clicks>

- Actions are the backbone of Holochain's data model
- They store metadata for each record
- Every action is committed to the agent's source chain
- Actions provide a tamper-evident history of all changes

</v-clicks>

---

# Action Contents

<v-clicks>

An Action contains:

- The agent ID of the author
- A timestamp of when the action was committed
- The type of action (e.g., Create, Update, Delete)
- The hash of the previous action in the author's source chain
- The index of the action in the author's source chain (action sequence)
- If there's a corresponding entry, the hash of that entry

</v-clicks>

---

# Common Action Types

<v-clicks>

1. Create
   - Introduces new data to the DHT

2. Update
   - Modifies existing data

3. Delete
   - Marks data as deleted (but doesn't remove it entirely)

Note: Create and Update actions typically correspond to an Entry

</v-clicks>

---

# Entries in Holochain

<v-clicks>

- Entries are units of application data
- Examples: Text messages, blog posts, user profiles
- Stored as arbitrary blobs of bytes
- The entry's address is the hash of its content
- Once on the DHT, entries cannot be completely removed
- Each entry contains the hash of its associated action

</v-clicks>

---

# Relationship Between Actions and Entries

<v-clicks>

- Actions and Entries form the basis of Holochain's data model
- Actions provide metadata and history
- Entries contain the actual application data
- Together, they create a robust, tamper-evident data structure

</v-clicks>

<!-- Insert image of the relationship between Records, Actions, and Entries -->
![Records, Actions, and Entries Relationship](placeholder-relationship-image.png)

---

# Summary

<v-clicks>

- Records are the fundamental unit of data in Holochain
- Records consist of an Action and (optionally) an Entry
- Actions contain metadata about state changes
- Entries contain the actual application data
- This structure ensures data integrity and traceability
- Understanding this model is crucial for effective Holochain development

</v-clicks>

---
layout: end
---

# Challenge: Actions & Entries

Design a simple blog post system using Holochain's Action and Entry model. 
Consider:
- What would be stored in the Action?
- What would be stored in the Entry?
- How would you handle comments?
