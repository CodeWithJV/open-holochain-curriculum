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
Project Structure
---

# DNAs Folder

<div class="flex">
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
</div>

---

# Tests Folder

<div class="flex">
<div class="w-1/2">

<v-clicks>

- For testing backend application
- Tryorama for integration tests
- Written in javascript/typescript
- Ensures DNA functions correctly

</v-clicks>

</div>
<div class="w-1/2">

```
project_root/
  ├── tests/
  │   └── your_file.test.ts
  └── ...
```

</div>
</div>

---

# UI Folder

<div class="flex">
<div class="w-1/2">

<v-clicks>

- Contains all frontend code
- Holochain supports:
  - Lit
  - Svelte
  - Vue
  - React
  - Vanilla JS
- Can use any frontend framework with Holochain's JavaScript API

</v-clicks>

</div>
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
</div>

---

# Workdir Folder

<div class="flex">
<div class="w-1/2">

<v-clicks>

- Contains Holochain configuration
- Includes:
  - `happ.yaml`: Defines hApp structure
  - `web-happ.yaml`: hApp + ui bundle

</v-clicks>

</div>
<div class="w-1/2">

```
project_root/
  ├── workdir/
  │   ├── happ.yaml
  │   └── web-happ.yaml
  └── ...
```

</div>
</div>

---

# Package management

<div class="flex">
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
<div class="w-1/2">

```
project_root/
  ├── package.json
  ├── flake.nix
  ├── Cargo.toml
  └── ...
```

</div>
</div>

---

# Running a Holochain Project

<v-clicks>

1. Set up the development environment:
   ```bash
   nix develop
   ```
   - This command installs dependencies defined in `flake.nix`

2. Launch the project:
   ```bash
   npm start
   ```
   - Starts both the Holochain conductor and the UI

3. Access your application in the browser (typically at `http://localhost:8888`)

</v-clicks>
