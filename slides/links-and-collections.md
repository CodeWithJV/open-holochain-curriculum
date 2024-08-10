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
Links and Collections
---

# Links in Holochain

> A piece of metadata connecting one address to another. Data on the DHT is connected via one-way links. They allow you to create a graph database, making information easy to discover.
> 
> [Glossary: Links](https://developer.holochain.org/resources/glossary/#link) 


<v-clicks>

- Connect two addressable items on the DHT
- Examples of addressables:
  - Actions
  - Entries
  - Agents
  - Anchors
  - Anything with a public hash on the DHT

- Unlike other DHT items, links can be permanently deleted

</v-clicks>

---

# Link Structure

<v-clicks>

Links have four components:

1. [Base address](https://developer.holochain.org/resources/glossary/#link-base) (the 'known' thing)
2. [Target address](https://developer.holochain.org/resources/glossary/#link-target) (the 'unknown' thing)
3. [Type](https://developer.holochain.org/resources/glossary/#link-type) (developer specified structure)
4. [Optional tag](https://developer.holochain.org/resources/glossary/#link-tag) (extra information about the relationship)

</v-clicks>

---

# Creating Links

[hdk docs: create_link](https://docs.rs/hdk/latest/hdk/link/fn.create_link.html)
<v-clicks>

- Use the `create_link` function
- Example:

```rust
create_link(
    base_address,
    target_address,
    LinkTypes::MyLinkType,
    link_tag
)?;
```

- `base_address` and `target_address` can be any addressable item
- `LinkTypes` is an enum defined in your integrity zome
- `link_tag` is optional and can contain any serializable data

</v-clicks>

---

# Retrieving Links

[hdk docs: get_links](https://docs.rs/hdk/latest/hdk/link/fn.get_links.html)

<v-clicks>

- Use the `get_links` function
- Example:

```rust
let links = get_links(
    GetLinksInputBuilder::try_new(base_address, LinkTypes::MyLinkType)?
    .build()
)?;
```

- Returns a vector of `Link` structs
- Each `Link` contains:
  - `target`: the address the link points to
  - `tag`: the optional tag data
  - `create_link_hash`: hash of the CreateLink action (useful for deletion)

</v-clicks>

---

# Deleting Links

[hdk docs: delete_link](https://docs.rs/hdk/latest/hdk/link/fn.delete_link.html)

<v-clicks>

- Use the `delete_link` function
- Example:

```rust
delete_link(link_create_hash)?;
```

- `link_create_hash` is the hash of the CreateLink action
- To delete a link, you need to:
  1. Find the link (usually with `get_links`)
  2. Extract the `create_link_hash` from the Link
  3. Call `delete_link` with this hash

</v-clicks>

---

# Anchors in Holochain
> an easily discoverable base address is designated as a location to store a large number of links. The base’s address is typically calculated from a short string, whose value is either hard-coded into the application’s code, discovered via link traversal, or entered via the UI.
>
> [Glossary: Anchors](https://developer.holochain.org/resources/glossary/#anchor)

<v-clicks>

- Define arbitrary points on the DHT
- Can be linked to other addressable items
- Useful for application-wide collections
  - Example: "All subreddits"

- Not used for collections corresponding to specific DHT items
  - Example: "All Messages from User"

</v-clicks>

---

# Paths in Holochain
> A path is a string that represents a location in a tree-like structure. It's similar to a file system path. Paths are used to create predictable entry hashes that can serve as base addresses for links.
>
> [Glossary: Path](https://developer.holochain.org/resources/glossary/#path)

<v-clicks>

- Create predictable entry hashes
- Organize data in a hierarchical structure
- Can be used as link bases for collections
- Components are separated by periods (.)
- Example: "all_posts.2023.july"

</v-clicks>

---

# Creating and Using Paths

<v-clicks>

- Use the `Path` struct to create paths
- Example:

```rust
let path = Path::from("all_posts");
let path_hash = path.path_entry_hash()?;
```

- Use the path hash as a link base:

```rust
create_link(path_hash, target_hash, LinkTypes::AllPosts, ())?;
```

- Retrieve links using the path:

```rust
let links = get_links(
    GetLinksInputBuilder::try_new(path_hash, LinkTypes::AllPosts)?.build()
)?;
```

</v-clicks>

---

# Use Cases for Links

<v-clicks>

- Retrieving groups of related items
- Creating relationships between data
- Building complex data structures
- Enabling efficient querying and filtering

</v-clicks>

---
layout: end
---

# Example: Creating and Retrieving Links with Anchors

---

# Creating Links with a Path

```rust
use hdk::prelude::*;

#[hdk_extern]
pub fn create_post(post: Post) -> ExternResult<ActionHash> {
    let post_hash = create_entry(&EntryTypes::Post(post.clone()))?;
    let record = get(post_hash.clone(), GetOptions::default())?.ok_or(
        wasm_error!(WasmErrorInner::Guest("Could not find the newly created Post".to_string()))
    )?;

    let path = Path::from("all_posts");
    create_link(path.path_entry_hash()?, post_hash.clone(), LinkTypes::AllPosts, ())?;
    Ok(record)
}

```

---

# Retrieving Links with a Path

```rust
use hdk::prelude::*;

#[hdk_extern]
pub fn get_all_posts() -> ExternResult<Vec<Link>> {
    let path = Path::from("all_posts");
    get_links(GetLinksInputBuilder::try_new(path.path_entry_hash()?, LinkTypes::AllPosts)?.build())
}
```

---

# Challenge 2
Links & Collections
