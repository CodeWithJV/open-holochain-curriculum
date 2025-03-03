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
Scaffolding & Signals
---

# Holochain Scaffolding & Signals

Let's explore two powerful features of Holochain development

<!--
Instructor Notes:
- This slide covers more advanced Holochain features that build on previous concepts
- Scaffolding helps developers quickly generate code structures
- Signals enable real-time communication between agents
- These concepts are essential for building responsive multi-user applications
-->

---

# Scaffolding Overview

Rapidly generate boilerplate code for your Holochain app

<v-clicks>

- **What is Scaffolding?** A tool that generates code templates for common Holochain patterns
- **Benefits:** 
  - Reduces repetitive coding tasks
  - Enforces best practices
  - Creates consistent code structure
  - Accelerates development
- **Use cases:** Entry types, links, CRUD operations, collections

</v-clicks>

---

# Scaffolding Commands

The `hc scaffold` CLI provides various generators

<v-clicks>

```bash
# Create a new DNA
hc scaffold dna

# Create integrity/coordinator zome pairs
hc scaffold zome

# Create entry types with fields
hc scaffold entry-type

# Create collections
hc scaffold collection

# Create link types
hc scaffold link-type

# to see the rest
hc scaffold --help 
```

</v-clicks>

---

# Entry Type Scaffolding

Generate entry types with fields and CRUD operations

<v-clicks>

```bash
$ hc scaffold entry-type
? Entry type name: message
? Field name: content
? Choose field type: String

? Add another field? Yes
? Field name: creator 
? Choose field type: AgentPubKey
? Should a link be created? Yes
```

Generates:
- Entry struct definition
- Validation functions
- CRUD zome functions
- Link creation (if selected)

</v-clicks>

---

# Collection Scaffolding

Create patterns for organizing and retrieving entries

<v-clicks>

```bash
$ hc scaffold collection
? Collection name: all_messages
? Collection type: Global
? Which entry type should be collected? Message
```

Generates:
- Path creation for the collection
- Functions to add entries to the collection
- Functions to retrieve from the collection

</v-clicks>

---

# Link Type Scaffolding

Connect entries in your data model

<v-clicks>

```bash
$ hc scaffold link-type
? Link from which entry type? Agent
? Link to which entry type? Room
? Reference with entry hash or action hash? ActionHash
? Should the link be bidirectional? Yes
```

Generates:
- Link type definitions
- Functions to create links
- Functions to get linked entries
- Bidirectional functions (if selected)

</v-clicks>

---

# Signals in Holochain

Real-time communication mechanism between agents and UI

<v-clicks>

- **What are Signals?** Asynchronous messages that can be:
  - Local (cell to UI)
  - Remote (agent to agent)
- **Use Cases:**
  - Real-time chat
  - Activity notifications
  - Live updates
  - Collaborative editing

</v-clicks>

---

# Local Signals

Communication between cell and UI client

<v-clicks>

```rust
// In your Rust code (zome)
#[hdk_extern]
pub fn create_message(message: Message) -> ExternResult<ActionHash> {
    let hash = create_entry(&EntryTypes::Message(message.clone()))?;
    
    // Emit signal to UI
    emit_signal(Signal::MessageCreated(message))?;
    
    Ok(hash)
}
```

```javascript
// In your UI code
client.on('signal', signal => {
  if (signal.payload.type === 'MessageCreated') {
    // Update UI with new message
    addMessageToUI(signal.payload.data);
  }
});
```

</v-clicks>

---

# Remote Signals

Agent-to-agent communication across the network

<v-clicks>

```rust
#[hdk_extern]
pub fn send_message(message: Message) -> ExternResult<ActionHash> {
    // Create message in DHT
    let hash = create_entry(&EntryTypes::Message(message.clone()))?;
    
    // Get members in the room
    let members = get_members_for_room(message.room_hash)?;
    
    // Filter out self
    let recipients = members.into_iter()
        .filter(|agent| *agent != agent_info()?.agent_initial_pubkey)
        .collect();
    
    // Send remote signal to other members
    let signal = Signal::MessageCreated(message);
    send_remote_signal(signal, recipients)?;
    
    Ok(hash)
}
```

</v-clicks>

---

# Receiving Remote Signals

Set up a handler for incoming remote signals

<v-clicks>

```rust
// Define a handler for incoming remote signals
#[hdk_extern]
fn recv_remote_signal(signal: Signal) -> ExternResult<()> {
    // Forward the signal to the UI
    emit_signal(signal)?;
    Ok(())
}

// In init, create a capability grant to allow this function to be called
#[hdk_extern]
pub fn init(_: ()) -> ExternResult<InitCallbackResult> {
    let mut functions = BTreeSet::new();
    functions.insert((zome_info()?.name, "recv_remote_signal".into()));
    
    create_cap_grant(CapGrantEntry {
        tag: "remote_signal".into(),
        access: CapAccess::Unrestricted,
        functions: GrantedFunctions::Listed(functions),
    })?;
    
    Ok(InitCallbackResult::Pass)
}
```

</v-clicks>

---

# Signal Security Considerations

Important security practices when working with signals

<v-clicks>

- **Never trust signal content directly**
  - Always verify data from the DHT
  - Signals can be spoofed by malicious agents
  
- **Handle race conditions**
  - Signals are faster than DHT propagation
  - Implement retry mechanisms for fetching referenced entries
  
- **Capability grants**
  - Carefully control who can send signals to your agent
  - Most signal handlers should have restricted access

</v-clicks>

---

# Example: Chat Application

Combining scaffolding and signals for a real-time chat app

<v-clicks>

1. **Scaffold the data model**
   - `Room` entry type with name and creator
   - `Message` entry type with content, creator, timestamp, room reference
   - Links between agents, rooms, and messages

2. **Implement signal handling**
   - Send remote signals when messages are created
   - Set up receivers with capability grants
   - Handle race conditions in UI with retry logic

3. **Result:** Real-time chat experience where:
   - New rooms appear immediately for all agents
   - Messages are delivered instantly to room members
   - UI updates reflect the current state of the application

</v-clicks>

---

# Challenge 4

Build a messaging app with scaffolding and signals

<v-clicks>

- **Learning goals:**
  - Use the scaffolding tool to build a complete app
  - Implement real-time updates with signals
  - Handle node-to-node communication
  - Build security into your application
  
- **Challenge structure:**
  - UI is provided - focus on the backend
  - Scaffold entry types, collections, and links
  - Implement zome functions for chat functionality
  - Add signals for real-time updates
  
- **Repository:** [Challenge 4](https://github.com/CodeWithJV/holochain-challenge-4)

</v-clicks>

---

# Summary

<v-clicks>

- **Scaffolding** provides a quick way to generate common Holochain patterns
  - Entry types, collections, links, CRUD operations
  - Saves time and enforces best practices

- **Signals** enable real-time communication
  - Local signals (cell to UI)
  - Remote signals (agent to agent)
  - Security considerations for handling signals

- **Together, these tools allow you to:**
  - Build complex applications quickly
  - Create responsive, real-time user experiences
  - Develop collaborative multi-user applications

</v-clicks>
