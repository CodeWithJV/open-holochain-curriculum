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
Holochain Building Blocks
---

# Overview

Let's go through core concepts to get started with Holochain

<!-- 
Instructor Notes:
- This is a foundational slide introducing Holochain's core concepts
- Students need to understand these building blocks before the hands-on challenges
- The links to the glossary are useful for further exploration
- Encourage students to refer back to this slide as they progress
- These concepts form the vocabulary used throughout the course
-->

<v-clicks>

- [Holochain application (hApp)](https://developer.holochain.org/resources/glossary/#application-app)
- [DNA](https://developer.holochain.org/resources/glossary/#dna)
- [Network](https://developer.holochain.org/resources/glossary/#network)
- [Node](https://developer.holochain.org/resources/glossary/#node)
- [Agent](https://developer.holochain.org/resources/glossary/#agent)
- [Action](https://developer.holochain.org/resources/glossary/#action)
- [Entry](https://developer.holochain.org/resources/glossary/#entry)

</v-clicks>

---
layout: fact
---

# Holochain is ...

<!-- 
Instructor Notes:
- These analogies help contextualize Holochain for newcomers
- The Git comparison highlights the source chain and immutable history aspects
- The BitTorrent comparison emphasizes the distributed and peer-to-peer nature
- These analogies are particularly helpful for developers coming from other technologies
- Ask students if these analogies help or if they have better ones
-->

<v-clicks> 

### like a cross between git and bittorrent 

### An end-to-end open source P2P app framework

</v-clicks>

---

# Application (hApp)

> a collection of back end and optionally front end components that comprise something a Holochain user can interact with.
> 
> [Glossary: Holochain application (hApp)](https://developer.holochain.org/resources/glossary/#application-app)

<!-- 
Instructor Notes:
- The hApp is the complete package that users interact with
- In Challenge 1, students will work with a complete hApp (jokes application)
- The docker-compose analogy helps students understand the bundling concept
- Emphasize that a hApp can contain multiple DNAs (though Challenge 1 has just one)
- The UI is optional but most hApps (including Challenge 1) include one
-->

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

> A package of executable code that defines the shared 'rules of the game' for a group of agents.
> 
> [Glossary: DNA](https://developer.holochain.org/resources/glossary/#dna)

<!-- 
Instructor Notes:
- DNAs are the backend component of Holochain apps
- Challenge 1 uses a single DNA called "jokes"
- The microservice analogy helps students understand the modularity
- Each DNA defines its own network, data model, and validation rules
- DNAs are compiled to WebAssembly, which enables them to run in various environments
- Emphasize that DNAs contain zomes, which we'll explore next
-->

<v-clicks>

- defines the data schema and validation rules of the package
- exposes endpoints for client code to interact with the application
- composed of multiple zomes (modules)
- compiled down to WebAssembly, written in rust

</v-clicks>

<v-click>

**Like a backend microservice running in its own container**

</v-click>

---

# Zome Architecture

<!-- 
Instructor Notes:
- The separation of integrity and coordinator zomes is crucial to understand
- This separation is one of Holochain's key design patterns
- Challenge 1 uses both types of zomes for the jokes application
- This first slide introduces the basic concept of zomes
-->

<v-clicks>

> A basic unit of modularity inside a DNA.
> 
> [Glossary: Zome](https://developer.holochain.org/resources/glossary/#zome)

- Zomes are the modular building blocks that make up a DNA
- Different zomes can handle different features
- There are two main types of zomes:
  - [**integrity zomes**](https://developer.holochain.org/resources/glossary/#integrity-zome): define behavior that must remain the same for all participants
  - [**coordination zomes**](https://developer.holochain.org/resources/glossary/#coordinator-zome): define behavior that can be customized without breaking compatibility

</v-clicks>

---

# Integrity Zomes

> The foundational code that defines data structures and validation rules - the "rule book" that everyone must follow.
> 
> [Glossary: Integrity Zome](https://developer.holochain.org/resources/glossary/#integrity-zome)

<!-- 
Instructor Notes:
- The integrity zome defines the data models and validation rules
- These are the "rules of the game" - they can't be changed without creating a new network
- The code example shows how entry types are defined
-->

<div class="flex">
<div class="w-1/2">

<v-clicks>

- Define data schema
- Set validation rules
- Cannot be changed without creating a new network
- Determine the network identity
- Handle validation of actions

</v-clicks>

<v-click>

**"Rules of the game"**

</v-click>

</div>

<div class="w-1/2">

<v-click>

```rust
// Integrity zome (data definitions)
#[hdk_entry_helper]
#[derive(Clone)]
pub struct Joke {
    pub text: String,
    pub creator: AgentPubKey,
}

// Validation function (optional)
pub fn validate_create_joke(
    joke: Joke
) -> ExternResult<ValidateCallbackResult> {
    if joke.text.is_empty() {
        return Ok(ValidateCallbackResult::Invalid(
            "Joke cannot be empty".into()
        ));
    }
    Ok(ValidateCallbackResult::Valid)
}
```

</v-click>

</div>
</div>

---

# Coordination Zomes

> The action-oriented code that implements application features and exposes a user-facing api.
> 
> [Glossary: Coordinator Zome](https://developer.holochain.org/resources/glossary/#coordinator-zome)

<!-- 
Instructor Notes:
- The coordinator zome implements the business logic and external APIs
- These can be updated without creating a new network
- The code example shows a typical CRUD function
- The "playing the game" analogy helps clarify the distinction from integrity zomes
-->

<div class="flex">
<div class="w-1/2">

<v-clicks>

- Implement business logic
- Expose APIs to clients  
- Can be updated without network change
- Reference integrity zomes for data types
- Handle application flow and user interactions

</v-clicks>

<v-click>

**"Playing the game"**

</v-click>

</div>

<div class="w-1/2">

<v-click>

```rust
// Coordinator zome (business logic)
#[hdk_extern]
pub fn create_joke(joke: Joke) -> ExternResult<Record> {
    // Create the entry
    let joke_hash = create_entry(
        &EntryTypes::Joke(joke.clone())
    )?;
    
    // Get the record
    let record = get(joke_hash, GetOptions::default())?
        .ok_or(wasm_error!("Could not find joke"))?;
    
    Ok(record)
}
```

</v-click>

</div>
</div>

---

# Network

> a collection of nodes gossiping with each other to form a validating DHT
> 
> [Glossary: Network](https://developer.holochain.org/resources/glossary/#network)

<!-- 
Instructor Notes:
- Each DNA has its own network, which is a key architectural choice in Holochain
- The network is identified by the hash of the DNA's integrity code
- This means changes to integrity code create a completely new network
- This fact is crucial for students to understand, especially for app versioning
- The warnings about migration and deterministic compilation are important practical considerations
- In Challenge 1, students will see a simulated network in the Playground
-->

<v-clicks>

- each DNA has its own network 
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

<!-- 
Instructor Notes:
- Nodes are the individual participants in the network (i.e., running instances of the app)
- In Challenge 1, students will see multiple nodes in the Playground
- The validation and gossip aspects are key to Holochain's security model
- Each node validates a subset of the DHT, providing efficient verification
- The redundancy provides fault tolerance and resilience
- The links to additional concepts help curious students explore further
-->

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

<!-- 
Instructor Notes:
- Agents are the actors in the system (usually humans operating the app)
- Each agent has a unique cryptographic identity (their agent key)
- The agent-id + DNA = cell (the specific instance of the app for that agent)
- All actions are signed by the agent's private key, providing cryptographic attribution
- The source chain is a key concept - it's the immutable record of all the agent's actions
- In Challenge 1, students will see multiple agents creating and sharing jokes
-->

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

> A piece of data that represents a change of state and stored on an agent's source chain.
> 
> [Glossary: Action](https://developer.holochain.org/resources/glossary/#action)

<!-- 
Instructor Notes:
- Actions are the fundamental state change mechanism in Holochain
- Every time an agent does something, it's recorded as an action
- Actions are signed by the agent, creating cryptographic accountability
- The chain of actions creates the tamper-evident ledger
- The "verbs" analogy helps students understand how actions relate to operations
- In Challenge 1, students will implement create, update, and delete actions
-->

<v-clicks>

- the building blocks of all data stored in the network
- signed by the agent who authored the action
- link to the hash of their previous action -> a tamper-evident ledger of all state changes

</v-clicks>

<v-click>

**Actions are the system defined verbs of a holochain application**

</v-click>
---

# Action Types

<!-- 
Instructor Notes:
- This simplified slide focuses on the conceptual understanding of action types
- The CRUD analogy helps students understand these in familiar terms
-->

<v-clicks>

- **Create**: Add new data to DHT (like INSERT)
  - Creates a new entry and action

- **Update**: Modify existing data (like UPDATE but immutable) 
  - Creates a new action that references the original
  - Original data remains unchanged

- **Delete**: Mark data as deleted (like DELETE but preserves data)
  - Creates a delete action only (no entry)
  - Changes entry status to "Dead"

</v-clicks>

---

# Entry

> A basic unit of application data in a Holochain app
> 
> [Glossary: Entry](https://developer.holochain.org/resources/glossary/#entry)

<!-- 
Instructor Notes:
- Entries are the actual data being stored (vs actions which are operations)
- Use the "nouns" analogy to contrast with actions as "verbs"
- Entries are defined by the app developer (in Challenge 1, the Joke entry)
- Content-addressable storage is a key concept - identical content = identical hash
- The combination of actions and entries creates records in the source chain
- In Challenge 1, students will work with Joke entries - creating, updating, and deleting them
-->

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

# Entry Characteristics

<!-- 
Instructor Notes:
- This simplified slide focuses on the key characteristics of entries
- Emphasize the immutable nature and content-addressed storage
- The status tracking is particularly important for understand entry lifecycle
-->

<v-clicks>

- **Definition**: Entries are defined in integrity zomes with validation rules
- **Usage**: CRUD operations are implemented in coordinator zomes  
- **Characteristics**:
  - [Content-addressed](https://developer.holochain.org/resources/glossary/#content-addressable-storage-cas) (hash of content is the address)
  - Immutable (never changed, only superseded)
  - Validation rules determine what's valid
  - Status tracking ([Live](https://developer.holochain.org/resources/glossary/#live-data), [Dead](https://developer.holochain.org/resources/glossary/#dead-data), Pending)

</v-clicks>


---

# In Summary

<!-- 
Instructor Notes:
- This summary table provides a quick reference for all the key concepts
- It's helpful for students to see how all the pieces fit together
- Each concept is linked to the glossary for further reading
- This is a good slide to refer back to when students have questions
- These concepts provide the foundation for Challenge 1
- Consider having students explain these concepts in their own words
-->

|                                                                                                     |                                                                            |
|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| [Holochain application (hApp)](https://developer.holochain.org/resources/glossary/#application-app) | Collection of back-end and front-end components a user can install and run |
| [DNA](https://developer.holochain.org/resources/glossary/#dna)                                      | Package of executable code defining shared rules                           |
| [Network](https://developer.holochain.org/resources/glossary/#network)                              | Collection of nodes forming a validating DHT                               |
| [Node](https://developer.holochain.org/resources/glossary/#node)                                    | Individual agent that validates and stores state                           |
| [Agent](https://developer.holochain.org/resources/glossary/#agent)                                  | Participant in network who authors state changes                        |
| [Action](https://developer.holochain.org/resources/glossary/#action)                                | Signed state change in the system                                          |
| [Entry](https://developer.holochain.org/resources/glossary/#entry)                                  | Application-specific data unit                                             |

---
layout: end
---

# Next: Project Structure
Understanding How Holochain Apps are Organized

<!-- 
Instructor Notes:
- This slide transitions to the next topic - Project Structure
- After covering the building blocks, students need to understand how they're organized
- Project structure is crucial for navigating and working with a Holochain application
- This is particularly important for Challenge 1, where they'll work with a pre-built structure
- The project structure slides will show them how to navigate the codebase
- This progression of concepts (building blocks → structure → actions/entries) prepares them for Challenge 1
-->
