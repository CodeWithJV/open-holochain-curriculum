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
core concepts
---

# Overview

Let's go through the minimum amount of concepts to get started

- [Holochain application (hApp)](https://developer.holochain.org/resources/glossary/#application-app)
- [DNA](https://developer.holochain.org/resources/glossary/#dna)
- [Network](https://developer.holochain.org/resources/glossary/#network)
- [Node](https://developer.holochain.org/resources/glossary/#node)
- [Agent](https://developer.holochain.org/resources/glossary/#agent)
- [Action](https://developer.holochain.org/resources/glossary/#record)
- [Entry](https://developer.holochain.org/resources/glossary/#entry)

---
layout: fact
---

# Holochain is ...

<v-clicks> 

### like a cross betweeen github and bittorrent 

### An end-to-end open source P2P app framework

</v-clicks>

---

# Application (hApp)

> a collection of back end and optionally front end components that comprise something a Holochain user can interact with.
> 
> [Glossary: Holochain application (hApp)](https://developer.holochain.org/resources/glossary/#application-app)

<v-clicks>

- a collection of components a Holochain user can install and run
- has one or more packages of executable code (DNA)
- (optionally) UI code

</v-clicks>

<v-click> 

**like a docker-compose file packaged with executables for the containers**

</v-click>
---

# DNA

> A package of executable code that defines the shared ‘rules of the game’ for a group of agents.
> 
> [Glossary: DNA](https://developer.holochain.org/resources/glossary/#dna)

<v-clicks>

- defines the data schema and validation rules of an application
- exposes endpoints for agents to interact with the application
- composed of multiple zomes (modules)
- compiled down to WebAssembly, written in rust

</v-clicks>

<v-click>

**Like a backend microservice running in its own container**

</v-click>

---

# Zome

> A basic unit of modularity inside a DNA. 
> 
> Defines a package of zome functions and can be either an **integrity** or **coordinator** zome.
>
> [Glossary: Zome](https://developer.holochain.org/resources/glossary/#zome)

<v-clicks>

- **integrity** zomes define data schema and validation rules for state changes
- **coordination** zomes define core application logic and external apis

</v-clicks>

<v-clicks>

integrity zomes **define the rules** of the game, coordination zomes **play the game**

</v-clicks>

---

# Network

> a collection of nodes gossiping with each other to form a validating DHT
> 
> [Glossary: Network](https://developer.holochain.org/resources/glossary/#network)

<v-clicks>

- each DNA has it's own network 
- the hash of the DNAs compiled integrity code plus [DNA modifiers](https://developer.holochain.org/resources/glossary/#dna-modifiers) is the unique network address
- modifying any integrity code creates a completely separate network

</v-clicks>

<v-clicks>

**migrating between networks is possible but expensive and non-trivial**

**deterministic compilation of integrity code is important (and hard)**

</v-clicks>

---

# Node

> An individual agent in a Holochain network who has an agent address and can be talked to via gossip.
> 
> [Glossary: Node](https://developer.holochain.org/resources/glossary/#node)

<v-clicks>

- runs the application code and validates a subset of the global state
- chunks of state are duplicated across multiple nodes 
- gossip with each other and attest that state changes of themselves and neighbours are valid
- if a node breaks the validation rules, they are kicked out of the network

</v-clicks>

<v-clicks>

**holochain apps have great data redundancy for *public* data**

dive deeper via [gossip](https://developer.holochain.org/resources/glossary/#gossip), [dht operation](https://developer.holochain.org/resources/glossary/#dht-operation), [warrant](https://developer.holochain.org/resources/glossary/#warrant), [neighbourhood](https://developer.holochain.org/resources/glossary/#neighborhood)

</v-clicks>

---

# Agent

> A human or bot who participates in a Holochain network through their cell
> 
> [Glossary: Agent](https://developer.holochain.org/resources/glossary/#agent)

<v-clicks>

- has a public and private key pair. 
- public key is the [agent-id](https://developer.holochain.org/resources/glossary/#agent-id) and unique for each instantiation of a DNA (dna + agent-id = [cell](https://developer.holochain.org/resources/glossary/#cell))
- all state changes (actions) are signed by an agent and stored in a local [source chain](https://developer.holochain.org/resources/glossary/#source-chain)
</v-clicks>

<v-clicks>

**The application can only change state by an agent creating an action**

</v-clicks>

---

# Action

> A piece of data that represents a change of state and stored on an agent’s source chain.
>
> 
> [Glossary: Action](https://developer.holochain.org/resources/glossary/#action)

<v-clicks>

- the building blocks of all data stored in the network
- signed by the agent who authored the action
- link to the hash of their previous action -> a tamper-evident ledger of all state changes

</v-clicks>

<v-click>

**Actions are the system defined verbs of a holochain application**

</v-click>
---

# Entry

> A basic unit of application data in a Holochain app
> 
> [Glossary: Entry](https://developer.holochain.org/resources/glossary/#entry)

<v-clicks>

- application specific data (e.g. person, post, comment etc.)
- integrity zomes define the permitted entry-types (data schema)
- persist via [content addressable storage](https://developer.holochain.org/resources/glossary/#content-addressable-storage-cas) in the [DHT](https://developer.holochain.org/resources/glossary/#distributed-hash-table-dht)
- action + entry = a record
- source chain is a chain of records

</v-clicks>

<v-click>

**Entries are the custom nouns of a holochain application** 

</v-click>
---

- [Holochain application (hApp)](https://developer.holochain.org/resources/glossary/#application-app)
- [DNA](https://developer.holochain.org/resources/glossary/#dna)
- [Network](https://developer.holochain.org/resources/glossary/#network)
- [Node](https://developer.holochain.org/resources/glossary/#node)
- [Agent](https://developer.holochain.org/resources/glossary/#agent)
- [Action](https://developer.holochain.org/resources/glossary/#record)
- [Entry](https://developer.holochain.org/resources/glossary/#entry)
