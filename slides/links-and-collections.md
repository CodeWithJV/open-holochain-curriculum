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

</v-clicks>

---

# Types of Links

<v-clicks>

- Unidirectional / One-to-Many
  - Example: Users to Messages

- Bidirectional (A combination of two one way links) / Many-to-Many
  - Example: Friends of Users

- Unlike other DHT items, links can be permanently deleted

</v-clicks>

---

# Link Structure

<v-clicks>

Links have four components:

1. [Base address](https://developer.holochain.org/resources/glossary/#link-base) (the 'known' thing)
2. [Target address](https://developer.holochain.org/resources/glossary/#link-target) (the 'unknown' thing)
3. [Type](https://developer.holochain.org/resources/glossary/#link-type)
4. [Optional tag](https://developer.holochain.org/resources/glossary/#link-tag) (extra information about the relationship)

</v-clicks>

---

# Anchors in Holochain
> A Holochain application design pattern in which an easily discoverable base is designated as a location to store a large number of links. The base’s address is typically calculated from a short string, whose value is either hard-coded into the application’s code, discovered via link traversal, or entered via the UI.
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

# Challenge 2
Links & Collections
