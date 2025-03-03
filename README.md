# Open Holochain Curriculum

A modular technical curriculum for educators to mix and match to teach Holochain.

## Overview

The Open Holochain Curriculum is a comprehensive, hands-on learning platform designed to help educators teach Holochain development. The curriculum follows a progressive learning path, starting with fundamental concepts and building towards more advanced features through a series of slides and practical coding challenges.

## Key Principles
- **Open** : make it easy for educators to use, extend and maintain
- **Modular** : small components that are easy to mix and match
- **Practical** : focus on learning by building
- **LLM friendly** : easy for educators to use AI assistants to maintain curriculum

## Installation

```
git clone git@github.com:CodeWithJV/open-holochain-curriculum.git
cd open-holochain-curriculum
npm i
```

If you want to pull down all the submodules 
```
git submodule update --init --recursive
```

## Curriculum Structure

### Slides (Presentation Materials)

The curriculum follows a progressive learning sequence through these slide decks:

1. **[Building Blocks](https://codewithjv.github.io/open-holochain-curriculum/slides/building-blocks/)**
   - Core Holochain concepts: hApp, DNA, Network, Node, Agent, Action, Entry
   - Analogies to help understand Holochain (Git + BitTorrent)
   - Zome architecture (integrity vs. coordinator zomes)
   - Agent-centric architecture and source chains

2. **[Project Structure](https://codewithjv.github.io/open-holochain-curriculum/slides/project-structure/)**
   - Organization of Holochain projects: DNAs, Tests, UI, Workdir
   - Integrity and Coordinator zome code organization
   - Backend-frontend connection via @holochain/client
   - Package management and build scripts

3. **[Actions and Entries](https://codewithjv.github.io/open-holochain-curriculum/slides/actions-and-entries/)**
   - Data model: Entries (nouns) and Actions (verbs)
   - Records as wrappers of Entry + Action
   - CRUD operations in Holochain
   - Hash types: ActionHash, EntryHash, AnyDhtHash
   - Entry status and lifecycle management

4. **[Links and Collections](https://codewithjv.github.io/open-holochain-curriculum/slides/links-and-collections/)**
   - Connecting data in the DHT with links
   - Link structure: base, target, type, tag
   - Creating, retrieving, and deleting links
   - Paths as predictable locations in the DHT
   - Using links for collections and relationships

5. **[Testing and Validation](https://codewithjv.github.io/open-holochain-curriculum/slides/testing-and-validation/)**
   - Validation rules to ensure data integrity
   - Deterministic vs. non-deterministic validation
   - Use cases for validation: data shape, privileges, rate limiting
   - Testing with Tryorama and Vitest

### Coding Challenges

Each challenge applies concepts from corresponding slides with increasing complexity:

1. **[Challenge 1: Actions and Entries](https://github.com/CodeWithJV/holochain-challenge-1)**
   - Create a joke app with CRUD operations
   - Implement create_joke, get_joke, update_joke, delete_joke
   - Understand ActionHash vs EntryHash
   - Learn how records persist in DHT even after updates/deletes

2. **[Challenge 2: Links and Collections](https://github.com/CodeWithJV/holochain-challenge-2)**
   - Build a blog app with posts and comments
   - Create collections via Path ("all_posts")
   - Link posts to authors and comments to posts
   - Retrieve related entries and handle updates

3. **[Challenge 3: Testing and Validation](https://github.com/CodeWithJV/holochain-challenge-3)**
   - Continue blog app development
   - Add tests with Tryorama
   - Implement validation rules (character limits, authorship verification)
   - Rate limiting with validation rules

4. **[Challenge 4: Scaffolding & Signals](https://github.com/CodeWithJV/holochain-challenge-4)**
   - Build a messaging app 
   - Use Holochain scaffolding tools
   - Implement real-time updates with signals
   - Handle secure communication between agents

## Teaching Recommendations

### Suggested Sequence

For maximum learning effectiveness, follow this sequence:

1. Present the Building Blocks slides to establish foundational concepts
2. Present Project Structure slides to understand code organization
3. Present Actions and Entries slides to deepen understanding of the data model
4. Work through Challenge 1 to apply CRUD operations
5. Present Links and Collections slides 
6. Work through Challenge 2 to implement relationships between data
7. Present Testing and Validation slides
8. Work through Challenge 3 to implement validation rules and tests
9. Work through Challenge 4 to learn scaffolding and signals

### Teaching Tips

- Allow ample time for hands-on coding during challenges
- Use the playground visualizations to help students understand DHT operations
- Emphasize the agent-centric nature of Holochain throughout
- Connect concepts to real-world analogies (Git, BitTorrent, etc.)
- Highlight how validation rules protect network integrity
- Demonstrate debugging techniques for common issues

## Curriculum Elements

- **Slides** : slides to teach concepts and introduce challenges
- **Challenges** : coding exercises with stand alone repos

Slides are built using [slidev](https://sli.dev/) - checkout their [guide](https://sli.dev/guide/) for a quick overview.

## Viewing the Slides

The slides are available online at: 
- [Holochain Curriculum Landing Page](https://codewithjv.github.io/open-holochain-curriculum/)
- [Building Blocks](https://codewithjv.github.io/open-holochain-curriculum/slides/building-blocks/)
- [Project Structure](https://codewithjv.github.io/open-holochain-curriculum/slides/project-structure/)
- [Actions and Entries](https://codewithjv.github.io/open-holochain-curriculum/slides/actions-and-entries/)
- [Links and Collections](https://codewithjv.github.io/open-holochain-curriculum/slides/links-and-collections/)
- [Testing and Validation](https://codewithjv.github.io/open-holochain-curriculum/slides/testing-and-validation/)

To run the slides locally:
```bash
# Install dependencies
npm install

# Start a specific presentation
npx slidev slides/building-blocks.md
npx slidev slides/project-structure.md
npx slidev slides/actions-and-entries.md
npx slidev slides/links-and-collections.md
npx slidev slides/testing-and-validation.md
```

## Development

### Building Slides for GitHub Pages

The slides are automatically built and deployed to GitHub Pages when changes are pushed to the main branch. If you want to build them locally:

```bash
npm run build
```

This will generate HTML versions of all slide decks in the `dist` directory.

## Scripts

- **Fetch Glossary**: The `scripts/fetch-glossary.js` script downloads and parses the official Holochain Glossary into a Markdown file at `docs/glossary.md`. Run it after saving the glossary HTML page locally as `glossary.html` in the project root.
  ```
  node scripts/fetch-glossary.js
  ```

## Other learning resources

- [Self paced training](https://resources.holochain.org/self-paced-training/) (2023)
- [Holochain Gym](https://holochain-gym.github.io/) (2022)