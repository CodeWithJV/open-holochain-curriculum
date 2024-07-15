- Starting a project with nix develop

- Folder Structure
 - DNAs folder
  - Backend code
  - Written in Rust
  - Intergrity and Coordinator zomes
 - Tests folder
  - For testing backend application (cover later)
 - UI folder
  - Where all the frontend code is written
  - HC supports Svelte / Vue / Solid i think?
  - But can be written in any frontend languege using there Javascript API (React, CLI, etc)
 - workdir (not important)
  - Holochain configuration stuff
 - package.json / flake.nix / cargo.toml
  - scripts for project
  - dependency files
 - (Image of folder structure)

- Data in Holochain
 - Each peice of data in Holochain takes shape as a Record
 - Every Record contains an Action

- Actions
 - Stores metadata for the record:
 - Every action is commit to the agents source chain

- Actions
 - Every action contains
 - The agent ID of the author
 - A timestamp of when action was commit to source chain
 - The type of action ()
 - The hash of the previous action in the author’s history of state changes, called their source chain (note: the first action in their chain doesn’t contain this field, as it’s the first)
 - The index of the action in the author’s source chain, called the action seq
 - If there is an entry corrisponding to it, the hash of the entry

- Actions
 - Some common actions are 
  - Create
  - Update
  - Delete
 - Some Actions corrispond to an Entry
  - Create
  - Update

- Entries
 - A unit of physical data on the DHT (Text Message/Blog Post)
 - arbitrary blob of bytes
 - its address is the hash of that blob
 - Corrisponds to a specific action
 - Once on the DHT CANNOT be completely removed
 - Also contains the hash of the action ascociated with it

- Summary
 - Records are the action/entry pair but can also contain just the action
 - An action contains meta data about the record and the hash of the entry if there is one
 - An entry contains the action hash and an abarety blob of bytes (ie: text data)
 - An image of the relationship of them all

- Challenge: Actions and Entries