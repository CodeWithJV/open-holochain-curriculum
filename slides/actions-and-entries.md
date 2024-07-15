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
Project Structure, Actions and Entries
---

# Folder Structure

<v-clicks>

- DNAs folder
  - Backend code
  - Written in Rust
  - Integrity and Coordinator zomes
- Tests folder
  - For testing backend application (cover later)
- UI folder
  - Where all the frontend code is written
  - HC supports Svelte / Vue / Solid
  - But UI can be written in any frontend language using their JavaScript API (React, CLI tool, etc)
- workdir (not important)
  - Holochain configuration stuff
- package.json / flake.nix / cargo.toml
  - Scripts for project
  - Dependency files

</v-clicks>

<!-- Insert image of folder structure here -->
![Folder Structure](placeholder-folder-structure.png)

---

# Starting a Project

<v-clicks>

1. Use `nix develop` to set up the development environment & install dependencies used by the HC CLI
2. Run `npm start` to launch the project

</v-clicks>

---

# Data in Holochain

<v-clicks>

- Each piece of data in Holochain takes the shape of a Record
- Every Record contains an Action

</v-clicks>

---

# Actions

<v-clicks>

- Store metadata for the record
- Every action is committed to the agent's source chain
- Contains:
  - The agent ID of the author
  - A timestamp of when the action was committed to the source chain
  - The type of action
  - The hash of the previous action in the author's history of state changes (source chain)
  - The index of the action in the author's source chain (action seq)
  - If there is a corresponding entry, the hash of the entry

</v-clicks>

---

# Common Action Types

<v-clicks>

- Create
- Update
- Delete

Some Actions correspond to an Entry:
- Create
- Update

</v-clicks>

---

# Entries

<v-clicks>

- A unit of physical data on the DHT (e.g., Text Message, Blog Post)
- Arbitrary blob of bytes
- Its address is the hash of that blob
- Corresponds to a specific action
- Once on the DHT, CANNOT be completely removed
- Also contains the hash of the action associated with it

</v-clicks>

---

# Summary

<v-clicks>

- Records are the action/entry pair but can also contain just the action
- An action contains metadata about the record and the hash of the entry (if there is one)
- An entry contains the action hash and an arbitrary blob of bytes (i.e., text data)

</v-clicks>

<!-- Insert image of the relationship between Records, Actions, and Entries -->
![Records, Actions, and Entries Relationship](placeholder-relationship-image.png)

---
layout: end
---

# Challenge

Actions & Entries
