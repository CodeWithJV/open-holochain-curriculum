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

# Links and Collections in Holochain

---
layout: intro
---

# Understanding Links and Collections

---

# Links in Holochain

<v-clicks>

- Connect two addressable items on the DHT
- Examples of addressable items:
  - Actions
  - Entries
  - Agents
  - Collections
  - Any item with a public hash on the DHT

</v-clicks>

---

# Types of Links

<v-clicks>

- Unidirectional / One-to-Many
  - Example: Users to Messages

- Bidirectional / Many-to-Many
  - Example: Friends of Users

- Unlike other DHT items, links can be permanently deleted

</v-clicks>

---

# Link Structure

<v-clicks>

Links have four components:

1. Base address (the 'known' thing)
2. Target address (the 'unknown' thing)
3. Type (defined according to app needs)
4. Optional tag (extra information about the relationship)

</v-clicks>

---

# Collections in Holochain

<v-clicks>

- Define arbitrary points on the DHT
- Can be linked to other addressable items
- Useful for application-wide arrays
  - Example: "All subreddits"

- Not used for addressables corresponding to specific DHT items
  - Example: "Messages from User"

</v-clicks>

---

# Benefits of Linking Data

<v-clicks>

- Connects known things to unknown things
- Helpful for indexing and retrieval
- Examples:
  - Link blog posts to an agent (see all posts by user)
  - Link comments to a blog post (see all comments on a post)
  - Link blog posts to a collection (get all blog posts on the DHT)
  - Link updated entries to original entries

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

# Link Operations

<v-clicks>

- Creating links
- Querying links
- Deleting links
- Updating links (delete and recreate)

</v-clicks>

---

# Best Practices

<v-clicks>

- Design your link structure carefully
- Use meaningful link types and tags
- Consider query performance when designing links
- Be mindful of data privacy when linking

</v-clicks>

---

# Summary

<v-clicks>

- Links connect addressable items on the DHT
- Collections define arbitrary points for linking
- Links enable complex relationships and efficient querying
- Proper use of links and collections is crucial for effective Holochain development

</v-clicks>

---
layout: end
---

# Challenge 2
Links & Collections
