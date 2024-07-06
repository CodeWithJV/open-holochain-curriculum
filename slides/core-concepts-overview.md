layout: ./theme

---
# conceptual building blocks of holochain

This list is incomplete, but is just enough to get you started.

The concepts are also simplified and a bit more nuanced when you dig deeper

The [holochain glossary](https://developer.holochain.org/resources/glossary/) has more precise definitions.

---

# Starting metaphor

Holochain is like a cross betweeen github and bittorrent for distributed applications.

---

# [Holochain application (hApp)](https://developer.holochain.org/resources/glossary/#application-app)

- a collection of components a Holochain user can install and run
- has one or more packages of executable code (DNA)
- (optionally) UI code

A hApp is like a docker-compose file packaged with all the compiled and bundled code for the containers

---

# [DNA](https://developer.holochain.org/resources/glossary/#dna)

**Backend microservice running in its own container**

- written in rust
- composed of multiple zomes (modules)
- zomes come in two flavours: integrity and coordination

<v-click>
- [integrity zome](https://developer.holochain.org/resources/glossary/#integrity-zome)
  - defines data schema
  - validates state changes
- [coordination zome](https://developer.holochain.org/resources/glossary/#coordinator-zome)
  - reads and writes data
  - exposes endpoints to ui and other nodes
</v-click>

---

# [Network](https://developer.holochain.org/resources/glossary/#network)

This is the bittorrent part of the main metaphor

- each DNA has it's own network 
- the hash of the DNAs compiled integrity code plus [DNA modifiers](https://developer.holochain.org/resources/glossary/#dna-modifiers) is the network address
- the integrity code is the published rules of the game, breaking those rules leads to eviction from the network
- modifying any integrity code creates a completely separate network (think installing a new instance of an app from scratch)

<v-clicks>
**migrating between networks is possible but expensive and non-trivial**
**deterministic compilation of integrity code is important (and hard)**
</v-clicks>

---

# Nodes

- each [node](https://developer.holochain.org/resources/glossary/#node) in the network runs the application code and validates (a subset) of the global state
- chunks of state are duplicated across multiple nodes (think IPFS)
- nodes gossip with each other and attest that state changes of themselves and neighbours are valid
- if a node breaks the validation rules, they are kicked out of the network

<v-clicks>
**holochain apps have great data redundancy for *public* data**
if you're interestd in mechanics checkout - [gossip](https://developer.holochain.org/resources/glossary/#gossip), [dht operation](https://developer.holochain.org/resources/glossary/#dht-operation), [warrant](https://developer.holochain.org/resources/glossary/#warrant), [neighbourhood](https://developer.holochain.org/resources/glossary/#neighborhood)
</v-clicks>

---

# [Agent](https://developer.holochain.org/resources/glossary/#agent)

An application user (either human or machine)

- has a public and private key pair. 
- public key is the [agent id](https://developer.holochain.org/resources/glossary/#agent-id) and unique for each instantiation of a DNA (dna + agent-id = [cell](https://developer.holochain.org/resources/glossary/#cell))
- all state changes (actions) are signed by an agent and stored in a local [source chain](https://developer.holochain.org/resources/glossary/#source-chain)

---

# [Actions](https://developer.holochain.org/resources/glossary/#record)

- the building blocks of all data stored in the network
- actions = verbs (i.e. create, update, delete)
- often accompanied with an entry
- entry = application specific nouns (person, post, comment)
- an action + entry = a record
- the source chain is a chain of records

---

# [Entry Types](https://developer.holochain.org/resources/glossary/#entry-type)

