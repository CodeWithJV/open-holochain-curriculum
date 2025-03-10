# Holochain Glossary

This glossary is sourced from the [Holochain Developer Documentation](https://developer.holochain.org/resources/glossary/).

## Action {#action}

A piece of data that represents a [record](#record) on an [agent’s](#agent) [source chain](#source-chain). Everything an [agent](#agent) does in a [Holochain application](#holochain-application-h-app) is expressed as actions, stored on their [source chain](#source-chain) as [records](#record). When the source chain records a piece of data, it’s most accurate to say that it’s recording the agent’s act of creating it. Actions link to the hash of their previous action, which creates a tamper-evident [journal](#journal) or [ledger](#ledger) of all their actions in an application.

## Address {#address}

An individual piece of data in a [content-addressable store](#content-addressable-storage-cas) that can be stored or retrieved by its identifier, usually the hash of the data.

## Address space {#address-space}

The entire range of possible [DHT addresses](#dht-address). This space is circular, meaning the last address is adjacent to the first address.

## Agency {#agency}

The power of an [agent](#agent) to act in their environment.

## Agent {#agent}

Records of all the [source chain](#source-chain) [actions](#action) that an agent has published, along with any [warrants](#warrant) against them for malicious activity.

## Agent activity operation {#agent-activity-operation}

A [DHT operation](#dht-operation) produced by the author of a [source chain](#source-chain) [record](#record), notifying the [validation authorities](#validation-authority) for the author’s [agent ID entry](#agent-id-entry) that they’ve published something. The [base](#base) of an agent activity operation is the agent ID of the operation’s [author](#author), which means that the author’s [neighbors](#neighbor), as [peers](#peer) whose [agent addresses](#agent-address) are [near](#nearness) to theirs, are the [validation authorities](#validation-authority) for their agent activity data.

## Agent-centric {#agent-centric}

Describes any [distributed system](#distributed-system) that puts [agents](#agent) at the center of the design, giving them [agency](#agency) over their online identity and the data they create. Agent-centric systems are usually [decentralized](#decentralization) and use [public-key cryptography](#public-key-cryptography) to identify agents. [Git](https://git-scm.com), Holochain, [Dat](https://www.datprotocol.com/), and [Secure Scuttlebutt](https://scuttlebutt.nz) are highly agent-centric, while [client/server](#client-server) and [blockchain](#blockchain) systems are less so.

## Agent address {#agent-address}

The address of an [agent ID](#agent-id) entry on a Holochain [DHT](#distributed-hash-table-dht), calculated from the agent’s [public key](#public-key-cryptography). It is used in locating an agent’s [transport address](#transport-address) for [gossiping](#gossip) and making [remote calls](#remote-call), and in calculating the proper [validation authorities](#validation-authority) to send a [DHT operation](#dht-operation) to or receive a piece of [DHT data](#dht-data) from.

## Agent ID {#agent-id}

The public key of an [agent](#agent). It serves as their unique ID in a [DHT](#distributed-hash-table-dht).

## Agent ID entry {#agent-id-entry}

The entry associated with the third of the four [genesis records](#genesis-records) at the beginning of an [agent’s](#agent) [source chain](#source-chain), which contains their [agent ID](#agent-id). The [address](#address) of this entry is also the [agent’s address](#agent-address) on the DHT.

## Anchor {#anchor}

A Holochain application design pattern in which an easily discoverable [base](#base) is designated as a location to store a large number of [links](#link). The base’s [address](#address) is typically calculated from a short string, whose value is either hard-coded into the application’s code, discovered via link traversal, or entered via the UI. [Entries](#entry) and [agent IDs](#agent-id) can also serve as anchor bases.

## Append-only {#append-only}

Any data structure that can only be written to. Once written, that data becomes ‘immutable’ (it can’t be modified or deleted). An agent’s [source chain](#source-chain) and the [DHT](#distributed-hash-table-dht) are both append-only.

## App entry {#app-entry}

An entity that holds application data. On the DHT, an app entry is created for every [new entry action](#entry-creation-action), and [validation authorities](#validation-authority) who hold the entry also hold the [actions](#action) of all [agents](#agent) who have published that exact same entry as [metadata](#metadata), along with other metadata such as [links](#link). App entries are [deduplicated](#deduplication) but individual agents’ writes of those entries are distinguished by their respective actions attached to the entry.

## Application (app) {#application-app-}

When we’re talking about Holochain, ‘app’ is synonymous with [hApp](#holochain-application-h-app), a collection of [back end](#back-end) and optionally [front end](#front-end) components that comprise something a Holochain user can interact with.

## Assigned capability grant {#assigned-capability-grant}

A [capability grant](#capability-grant) that only allows specified [agents](#agent) to call a [zome function](#zome-function) in the [grantor’s](#capability-grantor) [cell](#cell).

## Atomic commit {#atomic-commit}

The guarantee that all [source chain](#source-chain) [commits](#commit) performed in one [zome function](#zome-function) call will succeed or fail together, similar to a database transaction. Failure can be caused by [validation](#validation-rule) failure for an individual [record](#record) or a hardware I/O failure. It can also be caused by a prior atomic commit finishing and advancing the source chain [state](#state-transition) while the current function call is running, that is, between the time that the conductor created the current function’s [workspace](#workspace) and the time that it attempted to persist its own changes to the source chain.

## Author {#author}

A [capability grant](#capability-grant) that allows anyone possessing the [source chain](#source-chain) [author’s](#author) private key to call any [zome function](#zome-function) in a [cell](#cell). The only callers that should possess this key are the agent’s own [clients](#client) and other [bridged](#bridge-call) cells associated with the same [agent ID](#agent-id) in the same [conductor](#conductor).

## Back end {#back-end}

When we’re talking about Holochain, synonymous with one or more [DNAs](#dna) for a [hApp](#holochain-application-h-app)—that is, code that contains the base-level persistence and validation logic.

## Base {#base}

The [DHT address](#dht-address) to which an [operation](#dht-operation) applies. [Validation authorities](#validation-authority) who claim responsibility for this address receive, validate, and apply operations that produce [data](#dht-data) and [metadata](#metadata) attached to this base, which is then made available to [agents](#agent) who request it. This base consequently serves as a locator that allows an agent to know which authorities to request the data from, as each base maps to a DHT address, which is handled by a number of authorities who publish their coverage of the base via their [storage arc](#storage-arc), and whose [agent addresses](#agent-address) can be mapped to their [transport addresses](#transport-address) via a [peer table](#peer-table) lookup.

## Blockchain {#blockchain}

A [distributed](#distributed-system), partially [decentralized](#decentralization) system that promises [Byzantine fault tolerance](#byzantine-fault-tolerance-bft) by using a [global consensus](#global-consensus) protocol to get all nodes to agree on a single, shared history of events. This history is stored as a [hash chain](#hash-chain) of ‘blocks’, or bundles of [state transitions](#state-transition). A blockchain can be public (anyone can join) or permissioned/private (membership is controlled). Public blockchains are usually [trustless](#trustless), ensuring tamper-resistance by making cheating more costly than honesty.

## Bootstrapping {#bootstrapping}

The act of joining an application’s [DHT](#distributed-hash-table-dht). Bootstrapping typically involves:

## Bootstrap service {#bootstrap-service}

A service which keeps track of lists of [transport addresses](#transport-address) for [peers](#peer), segregated by [DNA hash](#dna-hash). When an [agent](#agent) wants to [bootstrap](#bootstrapping) into an [application’s](#holochain-application-h-app) [DHT](#distributed-hash-table-dht), they ask the bootstrapping service for a list of existing peers and make individual connections to them over the appropriate [transport implementation](#transport-implementation).

## Bridge call {#bridge-call}

A [zome function](#zome-function) call made between [cells](#cell) in one [agent’s](#agent) [conductor](#conductor), which allows the agent’s cells to access each other’s public APIs.

## Bundling {#bundling}

The act of packaging:

## Byzantine fault tolerance (BFT) {#byzantine-fault-tolerance-bft-}

The ability of a [distributed system](#distributed-system) to reach [consistency](#consistency) despite ‘Byzantine failures’, which are data corruptions caused by accidental or intentional faults in [nodes](#node) or the networking transport medium between them.

## Callback {#callback}

A [zome function](#zome-function) with a reserved name, only callable by the [conductor](#conductor) during a lifecycle event. The callbacks are as follows:

## Capability {#capability}

A privilege granted by a [capability grant](#capability-grant) to call certain [zome functions](#zome-function). The [grantor](#capability-grantor) can revoke this capability by [deleting](#delete-entry-action) the original grant from their [source chain](#source-chain).

## Capability-based security {#capability-based-security}

A security model that allows the owner of a resource to grant others access while maintaining ultimate control. Instead of allowing direct access to the resource, it mediates access and manages privileges by issuing [capability claims](#capability-claim), or tokens representing access to the resource. In Holochain, an [agent’s](#agent) [conductor](#conductor) protects their running [cells](#cell) and authorizes callers’ access to them by issuing and checking the [secrets](#capability-secret) and credentials they supply against existing [grants](#capability-grant).

## Capability claim {#capability-claim}

A [private](#private-entry) [system entry](#system-entry) that a [subject](#capability-subject) writes to their [source chain](#source-chain) to record the [secret](#capability-secret) they received for a [transferrable](#transferrable-capability-grant) or [assigned](#assigned-capability-grant) [capability grant](#capability-grant). This allows them to later call the [zome functions](#zome-function) to which access has been granted.

## Capability grant {#capability-grant}

A [private](#private-entry) [system entry](#system-entry) that an [agent](#agent) writes to their [source chain](#source-chain) to record the granting of a [capability](#capability) and its conditions for access, including the [secret](#capability-secret) (if the grant is [transferrable](#transferrable-capability-grant) or [assigned](#assigned-capability-grant)) and the assignees (if the grant is assigned). If the access being granted is [unrestricted](#unrestricted-capability-grant), no secret or assignees are specified.

## Capability grantor {#capability-grantor}

The [agent](#agent) who creates a [capability grant](#capability-grant).

## Capability secret {#capability-secret}

A secret series of bytes for a [capability grant](#capability-grant), created by the [grantor](#capability-grantor), which proves that its bearer has been granted a [capability](#capability) and is allowed to exercise it.

## Capability subject {#capability-subject}

The entity that is given permission to access a resource via [capability-based security](#capability-based-security). In Holochain, this can be a [client](#client) or [bridged](#bridge-call) [cell](#cell) on the user’s machine, or it can be another [agent](#agent) making a [remote call](#remote-call).

## Cell {#cell}

A particular Holochain [DNA](#dna) when it’s bound to an [agent ID](#agent-id) and running in the [conductor](#conductor). DNA + agent ID = cell.

## Centralization {#centralization}

The degree to which computing power, [agency](#agency), decision-making power, or responsibility in a [distributed system](#distributed-system) is concentrated in certain nodes. [Client/server](#client-server) systems, while technically distributed, are highly centralized, both in computer power and agency, while [cloud](#cloud) systems have decentralized computing power and centralized agency and [peer-to-peer](#peer-to-peer) systems have both decentralized computing power and agency. The complement of centralization is, of course, [decentralization](#decentralization).

## Client {#client}

In Holochain terms, any piece of external software that accesses a [DNA’s](#dna) [zome functions](#zome-function). The client makes function calls over the [conductor’s](#conductor) [RPC interface](#rpc-interface), and can be a [GUI](#graphical-user-interface-gui), shell script, service, or scheduled task. This client needs to be granted a [capability](#capability) to make these calls, because the RPC interface represents the user’s [agency](#agency) in the application, and access to it should be restricted. For this reason, a client also usually lives on the same machine as the [conductor](#conductor).

## Client/server {#client-server}

A highly [centralized](#centralization) [distributed system](#distributed-system) architecture in which certain privileged nodes are responsible for most of the processing, storage, and decision-making. Client/server systems typically give low [agency](#agency) to end-users, due to the fact that the privileged nodes mediate most user interactions.

## Cloning {#cloning}

The act of creating a copy of an existing cell by duplicating it and changing one or more [DNA modifiers](#dna-modifiers) in order to obtain a distinct DNA [hash](#dna-hash) and optionally its behavior via [DNA properties](#dna-properties), thus creating an isolated [network](#network) and [DHT](#distributed-hash-table-dht) for the resulting clone cell. This allows all [agents](#agent) who have created clone cells with the same modifications to enjoy a private shared space using existing rules without creating a DNA from scratch. An example is a message application with channels, where a clone cell represents a channel.

## Cloud {#cloud}

A specific [client/server](#client-server) configuration in which computing power is [decentralized](#decentralization) among many servers, but agency is still [centralized](#centralization) in those servers.

## Commit {#commit}

The act of adding a [record](#record) to a [source chain](#source-chain).

## Commons {#commons}

Any resource that is used and managed by a group of agents, but is owned by none. In order to be healthy, a commons must have rules governing its use. A Holochain [DHT](#distributed-hash-table-dht) is a type of digital commons whose rules are enforced by its [DNA](#dna) and Holochain’s [subconscious](#subconscious) rules.

## Conductor {#conductor}

The service that lives on an [agent’s](#agent) device and hosts all of their [cells](#cell), stores their data, makes their [zome functions](#zome-function) available to local [clients](#client) via an [RPC interface](#rpc-interface), and handles [network](#network) communication between their cells and other agents’ cells.

## Conductor admin API {#conductor-admin-api}

The [RPC interface](#rpc-interface) that a [conductor](#conductor) exposes, which allows [clients](#client) to:

## Conductor app API {#conductor-app-api}

The [RPC interface](#rpc-interface) that a [conductor](#conductor) exposes, which allows [clients](#client) to:

## Conflict-free replicated data type (CRDT) {#conflict-free-replicated-data-type-crdt-}

A function that allows two [nodes](#node) in a [distributed system](#distributed-system) to separately make changes to the same piece of data without creating conflicts. A CRDT is [logically monotonic](#logical-monotonicity), which means it satisfies the [CALM theorem](#consistency-as-logical-monotonicity-calm-theorem) and doesn’t need a [coordination protocol](#coordination-protocol) to arrive at consistency. Holochain makes sparing use of CRDTs when retrieving [entries](#entry) and [links](#link), and we also recommend considering using CRDTs in app design to handle the merging of different agents’ data.

## Consensus {#consensus}

The point at which all [nodes](#node) in a [distributed system](#distributed-system) agree on the state of the data they hold. [Blockchains](#blockchain) enforce a form of consistency called [global consensus](#global-consensus), whereas Holochain uses ‘strong’ [eventual consistency](#eventual-consistency).

## Consistency/availability/partition-tolerance (CAP) theorem {#consistency-availability-partition-tolerance-cap-theorem}

A principle that states that all [distributed systems](#distributed-system) are prone to [partition](#partition), and that in the presence of a partition, a design can only guarantee availability (data can always be accessed and written) or [consistency](#consistency) (data is always correct), but not both.

## Consistency as logical monotonicity (CALM) theorem {#consistency-as-logical-monotonicity-calm-theorem}

A principle that states that as long as a function is [logically monotonic](#logical-monotonicity), it can be run on multiple [nodes](#node) in a [distributed system](#distributed-system) and reach strong [eventual consistency](#eventual-consistency) without needing [coordination protocols](#coordination-protocol). Holochain’s DHT is CALM, in that every [DHT operation](#dht-operation) is simply accumulated without attempts to reconcile it with other operations. State is then determined by processing the final state of the accumulated operations when data of a certain type is requested.

## Content-addressable storage (CAS) {#content-addressable-storage-cas-}

Any storage system that gives a unique ID to each piece of data and allows it to be retrieved by its ID rather than its physical location. A [DHT](#distributed-hash-table-dht) is a type of CAS using [hashes](#hash) as IDs.

## Coordination protocol {#coordination-protocol}

An algorithm that governs the synchronization of data in a [distributed system](#distributed-system) and aims to prevent or resolve data conflicts that happen when two [nodes](#node) are out of sync with each other. Any [state transition](#state-transition) that isn’t [logically monotonic](#logical-monotonicity) needs a coordination protocol. In Holochain, [countersigning](#countersigning) is a simple coordination protocol between two or more agents who want to reach agreement with each other.

## Coordinator zome {#coordinator-zome}

A [zome](#zome) that defines [zome functions](#zome-function). Arbitrary public zome functions give a DNA [DNA](#dna) its API which mediates interactions between [clients](#client) and a [cell](#cell) instantiated from the DNA, while arbitrary private zome functions can be [scheduled](#scheduling), and special private zome functions with reserved names are called by the [conductor](#conductor) as a consequence of lifecycle events such as [cell initialization](#init-callback) and [source chain commits](#post-commit-callback). Zome functions in a coordinator zome have access to most of the [host API](#holochain-host-api), including the ability to:

## Counterparty {#counterparty}

An agent involved in a [countersigning](#countersigning) session.

## Countersigning {#countersigning}

A simple [coordination protocol](#coordination-protocol) between two or more [agents](#agent) in a Holochain [DHT](#distributed-hash-table-dht) in which they agree to lock their respective [source chain](#source-chain) [states](#state-transition), reach [consistency](#consistency) on the contents of each other’s source chain, and sign one single shared entry which they then [commit](#commit) to their source chains. An [enzyme](#enzyme) and optional [M-of-N signers](#m-of-n-signing) can also be involved in the transaction for further corroboration, enabling [lightweight consensus](#lightweight-consensus) among multiple parties.

## Create-entry action {#create-entry-action}

An [entry creation action](#entry-creation-action) that causes an [entry](#entry) to be made available to other [DHT](#distributed-hash-table-dht) members (unless the entry is [private](#private-entry), in which case only a record of its creation is published).

## Create-link action {#create-link-action}

An [action](#action) that causes a [link](#link) from one piece of [record data](#record-data) to another to be available to other [DHT](#distributed-hash-table-dht) members.

## Create, read, update, delete (CRUD) {#create-read-update-delete-crud-}

The four main [actions](#action) an application needs to do with data. Even though all data structures in Holochain are [append-only](#append-only), modification and deletion of data can still be simulated by publishing a new action that marks the old data as modified in a [CALM](#consistency-as-logical-monotonicity-calm-theorem) way. [Entry creation actions](#entry-creation-action) create and/or update entries, while [delete-entry actions](#delete-entry-action) remove them. [Links](#link) can also be created and deleted in a similar way.

## CRUD action {#crud-action}

A [record](#record) that expresses a [CRUD](#create-read-update-delete-crud) operation on a piece of data or metadata. [Create-entry](#create-entry-action), [update-entry](#update-entry-action), [delete-entry](#delete-entry-action), [create-link](#create-link-action), and [delete-link](#delete-link-action) actions are all CRUD actions.

## Dead data {#dead-data}

As no data in a Holochain [DHT](#distributed-hash-table-dht) or [agent’s](#agent) [source chain](#source-chain) are ever deleted, existing data must be marked as no longer active. Dead data takes four forms:

## Decentralization {#decentralization}

The act of removing central points of control. Many [distributed systems](#distributed-system) are decentralized to various degrees. The inverse of decentralization is [centralization](#centralization).

## Deduplication {#deduplication}

The removal of identical entries in a [CAS](#content-addressable-storage-cas). Most CASes, including Holochain’s [DHT](#distributed-hash-table-dht), deduplicate content automatically. Holochain’s DHT does, however, disambiguate between individual writes of an [entry](#entry) by storing the [authors’](#author) [actions](#action) alongside it as [metadata](#metadata).

## DeepKey {#deepkey}

(Future) Holochain’s default implementation of a [DPKI](#distributed-public-key-infrastructure-dpki).

## Delete-entry action {#delete-entry-action}

An [action](#action) that causes an [entry creation action](#entry-creation-action) to be marked as [dead](#dead-data). If all such actions that caused an [entry](#entry) to be published are marked as dead, the entry itself will also be marked as dead.

## Delete-link action {#delete-link-action}

An [action](#action) that causes a [create-link action](#create-link-action) to be marked as [dead](#dead-data). [Links](#link) with identical [base](#link-base), [target](#link-target), [type](#link-type), and [tag](#link-tag) are not [deduplicated](#deduplication), so deleting a create-link action also deletes the link. However, other create-link actions may contain the same data, so they will still remain.

## DevHub {#devhub}

A [hApp](#holochain-application-h-app) that acts as a package manager for other hApps. It is installed by default in the [Launcher](#launcher) and is also integrated into the Launcher’s app store.

## DHT address {#dht-address}

The unique ID of a piece of [record data](#record-data) ([entry](#entry), [action](#action), or [agent](#agent)) on the [DHT](#distributed-hash-table-dht). Every piece of data has an address that is generated directly from its content, usually by a [hash](#hash) function. This makes the DHT a [content-addressable storage](#content-addressable-storage-cas) system.

## DHT data {#dht-data}

A piece of data that lives in the [DHT](#distributed-hash-table-dht). DHT data is assigned to a [neighborhood](#neighborhood) of [validation authorities](#validation-authority) based on the base [address](#address) of the [DHT operation](#dht-operation) that expresses its creation, and is [deduplicated](#deduplication). All DHT data is either [record data](#record-data) with an address of its own, or [metadata](#metadata) attached to a piece of record data. DHT data is created when [agents](#agent) [author](#author) [source chain](#source-chain) [actions](#action), which then produce [operations](#dht-operation) that are sent to the respective validation authorities for the operations’ [bases](#base). Those authorities then apply the operations to their own DHT [shard](#sharding) after validating them.

## DHT operation {#dht-operation}

A unit of [gossip](#gossip) that communicates a request to a [validation authority](#validation-authority) to transform the data they hold in some way. Each DHT operation has a [base](#base) [address](#address) and gets sent to the authorities that claim responsibility for that address by advertising that their [storage arcs](#storage-arc) include the address. For each type of [record](#record)/[action](#action), an [author](#author) produces one or more DHT operations. For example, a [create-entry action](#create-entry-action) for a [public entry](#public-entry) produces three DHT operations:

## Distributed hash table (DHT) {#distributed-hash-table-dht-}

A collection of data stored collectively by many [nodes](#node) in a [peer-to-peer](#peer-to-peer) network. In a DHT, a node retrieves data by address, usually its cryptographic [hash](#hash), by searching for a [peer](#peer) who holds the data. Holochain uses a [validating DHT](#validating-dht) to store [DHT data](#dht-data) and chooses agents to hold data based on the [nearness](#nearness) of their [agent address](#agent-address) to the data’s address. Agents can claim [authority](#validation-authority) over an arbitrary range of the DHT’s [address space](#address-space) by publishing their [storage arc](#storage-arc). Each [DNA](#dna) has its own separate DHT.

## Distributed ledger technology (DLT) {#distributed-ledger-technology-dlt-}

Any technology that involves many [nodes](#node) in a distributed system sharing an [append-only](#append-only) history of [state transitions](#state-transition). [Blockchain](#blockchain) DLTs use a [global ledger](#global-ledger), whereas others use some form of [sharded](#sharding) or separate, interoperating ledgers. Holochain is a type of DLT in which each [agent](#agent) is responsible for their own ledger, called a [source chain](#source-chain).

## Distributed public key infrastructure (DPKI) {#distributed-public-key-infrastructure-dpki-}

A [public key infrastructure](#public-key-infrastructure-pki) that doesn’t rely on a central authority. [DeepKey](#deep-key) is Holochain’s default DPKI implementation.

## Distributed system {#distributed-system}

Any system that involves multiple [nodes](#node) talking to one another over a network, whether [decentralized](#decentralization) or [centralized](#centralization). Because communication isn’t instantaneous, different nodes can create conflicting data, particularly in the presence of a [partition](#partition). Many distributed systems use a [coordination protocol](#coordination-protocol) to reach [consistency](#consistency), while others rely on the [CALM theorem](#consistency-as-logical-monotonicity-calm-theorem) to avoid conflicts altogether.

## DNA {#dna}

A package of executable code that defines the shared ‘rules of the game’ for a group of [agents](#agent). A DNA is made up of [zomes](#zome), which define [validation rules](#validation-rule) for data, as well as [zome functions](#zome-function) that allow agents to write to their [source chain](#source-chain), retrieve data from the [DHT](#distributed-hash-table-dht), send [signals](#signal) to a listening [client](#client), or make [remote calls](#remote-call) to another [cell](#cell). Each DNA has its own isolated [network](#network) and [DHT](#distributed-hash-table-dht) shared by all cells using the DNA.

## DNA bundle {#dna-bundle}

The file that holds a complete [DNA](#dna), both executable [zomes](#zome) and metadata (see [DNA manifest](#dna-manifest) for details on this metadata).

## DNA hash {#dna-hash}

The cryptographic hash of all of the properties of a [DNA](#dna) considered to be [DNA modifiers](#dna-modifiers). The DNA hash serves as the unique ID for a DNA’s [network](#network).

## DNA instance {#dna-instance}

See [cell](#cell).

## DNA manifest {#dna-manifest}

A file that specifies the components of a [DNA](#dna), including locations of compiled [zomes](#zome) and metadata such as a name, description, [network seed](#network-seed), [properties](#dna-properties), [origin time](#origin-time), and [quantum time](#quantum-time). This manifest can be used by the [hc](#hc) tool to build a [DNA bundle](#dna-bundle).

## DNA modifiers {#dna-modifiers}

All properties of a DNA which affect its hash — that is, its [integrity zomes](#integrity-zome), [properties](#dna-properties), [network seed](#network-seed), [origin time](#origin-time), and [quantum time](#quantum-time).

## DNA properties {#dna-properties}

Arbitrary data that affects the operation of the [DNA](#dna). A user can specify properties at DNA installation time, which causes the DNA to be [cloned](#cloning) if the user-specified properties are different from the default properties. The executable code can then access those properties to change its behavior, similar to configuration files or environment variables. This is a simple way of allowing separate [networks](#network) of users to enjoy isolated and slightly modified experiences using a set of base rules. The DNA properties are considered [DNA modifiers](#dna-modifiers).

## End-to-end encryption (E2EE) {#end-to-end-encryption-e2ee-}

A channel between two nodes in a public network that allows them to transfer secret messages that cannot be decrypted by eavesdroppers. Holochain’s node-to-node [network](#network) communications, including [gossip](#gossip), [publishing](#publish), and [remote calls](#remote-call), use E2EE (currently [QUIC](https://en.wikipedia.org/wiki/QUIC) with TLS encryption).

## Entry {#entry}

A basic unit of application data in a Holochain app. Each entry has its own defined [type](#entry-type). When an [agent](#agent) [commits](#commit) an entry, it is included in an [action](#action) into a [record](#record) that expresses an [entry creation action](#entry-creation-action). This data is written to their [source chain](#source-chain) as a record of the action having taken place. An entry can be [public](#public-entry) or [private](#private-entry); if it’s public, it’s also [published](#publish) to the [DHT](#distributed-hash-table-dht). There are [app entries](#app-entry) whose purpose and structure are defined by the [DNA](#dna) developer, and there are special public or private [system entries](#system-entry) such as an [agent ID entry](#agent-id-entry) and [capability grants](#capability-grant) and [claims](#capability-claim).

## Entry creation action {#entry-creation-action}

Any [action](#action) that writes an [entry](#entry) to the DHT, either a [create-entry](#create-entry-action) or [update-entry](#update-entry-action) action. If the entry’s [type](#entry-type) is [public](#public-entry), the entry will be published to the [DHT](#distributed-hash-table-dht) along with its [action](#action). If the entry’s type is [private](#private-entry), only the action is published.

## Entry type {#entry-type}

A specification for any sort of entry that a [DNA](#dna) should recognize and understand, similar to an OOP class or database table schema. An entry type definition can specify whether entries of its type should be [public](#public-entry) or [private](#private-entry), and how many [required validations](#required-validations) should exist. DNA developers create their own entry types for the data their app needs to store, and can write [validation functions](#validation-function) for [operations](#dht-operation) that [create, update, or delete](#create-read-update-delete-crud) entries of those types.

## Entry types callback {#entry-types-callback}

A private [zome function](#zome-function) in an [integrity zome](#integrity-zome) that yields all the entry types defined in the zome’s schema. This callback is called by the [conductor](#conductor) at [DNA](#dna) installation time, so the conductor can know which entry-producing [operations](#dht-operation) should be routed to which [integrity zome](#integrity-zome).

## Enzyme {#enzyme}

An agent involved in a [countersigning](#countersigning) session who has been nominated to witness the session – that is, to collect, sign, and redistribute full sets of signatures from all [counterparties](#counterparty), including themselves. An enzyme can also be one of a set of optional [M-of-N signers](#m-of-n-signing) in the session.

## Ephemeral schedule {#ephemeral-schedule}

A schedule on which a [scheduler function](#scheduler-function) is directed to run. A scheduler function called on an ephemeral schedule only runs once after a defined delay, and unlike a [recurring schedule](#recurring-schedule) does not survive through stops and starts of a [cell](#cell).

## Eventual consistency {#eventual-consistency}

A promise made by distributed systems that optimize for availability over consistency (see [CAP theorem](#consistency-availability-partition-tolerance-cap-theorem)), meaning that given enough time, every [node](#node) ought to eventually reach [consistency](#consistency) with each other. Strong eventual consistency means that nodes will eventually reach consistency without conflicts, which is possible for any system whose [state transition](#state-transition) functions adhere to the [CALM theorem](#consistency-as-logical-monotonicity-calm-theorem).

## Fork (DNA) {#fork-dna-}

To change a [DNA](#dna) in a way that doesn’t necessarily alter its behavior, resulting in a new [hash](#dna-hash) for the DNA that gives it a separate [network](#network) and [DHT](#distributed-hash-table-dht) from the one associated with the original DNA. Forking is most easily done by passing a [network seed](#network-seed) at DNA installation time.

## Fork (source chain) {#fork-source-chain-}

To create alternate versions of one’s history in an app by basing two [source chain](#source-chain) [records](#record) on one parent record. Forking one’s source chain is always an [invalid](#validation-rule) action, detected at the [subconscious](#subconscious) level by [agent activity](#agent-activity) [authorities](#validation-authority).

## Front end {#front-end}

In Holochain terms, synonymous with [graphical user interface](#graphical-user-interface-gui) or, more generally, [client](#client).

## Genesis records {#genesis-records}

The four records at the beginning of an [agent’s](#agent) [source chain](#source-chain), consisting of:

## Global consensus {#global-consensus}

Agreement among all [nodes](#node) in a [blockchain](#blockchain) on the state of a single, shared [global ledger](#global-ledger). Holochain prefers ‘local’ consensus, both between interacting parties using [countersigning](#countersigning) and among a small set of third-party [validation authorities](#validation-authority).

## Global ledger {#global-ledger}

A [ledger](#ledger) whose contents are identical across all [nodes](#node) in a [blockchain](#blockchain). The state of a global ledger is arrived at through a [global consensus](#global-consensus) procedure.

## Gossip {#gossip}

A protocol used by many [peer-to-peer](#peer-to-peer) networks to rapidly propagate data. Each [node](#node) knows a few other nodes, who know a few more, and so forth. Whenever any node receives a message, they broadcast it to some or all of their peers. Data propagates slowly at first, then spreads at an exponential rate. Nodes in a Holochain [network](#network) share [DHT operations](#dht-operation), [neighborhood](#neighborhood) health information, and peer [transport addresses](#transport-address) via gossip.

## Graphical user interface (GUI) {#graphical-user-interface-gui-}

In Holochain terms, a [client](#client) that presents a visual way for a user to interact with a [hApp](#holochain-application-h-app) running in their [conductor](#conductor). As with any client of a Holochain application, the GUI must possess a [capability](#capability) allowing them to call the hApp’s public [zome functions](#zome-function).

## hApp bundle {#happ-bundle}

One or more [DNAs](#dna), which together form the [back end](#back-end) for a complete [hApp](#holochain-application-h-app). These components are specified in a [hApp manifest](#h-app-manifest) file, and can be packaged together in a zip archive along with the manifest or downloaded separately from the internet. A hApp can also be bundled with a web-based [GUI](#graphical-user-interface-gui) to become a [web hApp](#web-h-app).

## hApp manifest {#happ-manifest}

A file that specifies the DNAs comprising a [hApp bundle](#h-app-bundle).

## Hash {#hash}

A unique ‘fingerprint’ for a piece of data, calculated by running the data through a cryptographic hashing function. A hash can serve as a unique identifier for that data (such as with [addresses](#address) of [DHT data](#dht-data)) and makes it easy to verify the integrity of the data after it’s been retrieved. In a Holochain DHT, the hash of an [entry](#entry) also serves as its [base](#base), allowing an agent to calculate which [authorities](#validation-authority) to request the entry from.

## Hash chain {#hash-chain}

An [append-only](#append-only) data structure that can be used as a tamper-evident, sequential log of events, such as a [source chain](#source-chain) or [blockchain](#blockchain).

## hc {#hc}

A command-line tool for [scaffolding](#scaffolding), [bundling](#bundling), testing, and running [hApps](#holochain-application-h-app).

## History {#history}

The sequence of [actions](#action) taken by an [agent](#agent), stored as [records](#record) in their [source chain](#source-chain).

## Holo {#holo}

The company funding the development of Holochain and facilitating [hosting services](#holo-host) for Holochain apps.

## Holochain Development Kit (HDK) {#holochain-development-kit-hdk-}

Holochain’s standard Rust-based software development kit (SDK) for [DNA](#dna) developers. It provides developer-friendly access to the [Holochain host API](#holochain-host-api), as well as macros for defining [entry](#entry) and [link](#link) types, [validation functions](#validation-function), [init callbacks](#init-callback), and other [zome functions](#zome-function).

## Holochain application (hApp) {#holochain-application-happ-}

A collection of [DNAs](#dna) in a [hApp bundle](#h-app-bundle) and optionally a [client](#client) or clients that allow users to interact with those DNAs.

## Holochain Core {#holochain-core}

The basic components of Holochain — the [conductor](#conductor), the [ribosome](#ribosome), and the storage and networking layers.

## Holochain host API {#holochain-host-api}

The set of core functions that the Holochain [conductor](#conductor) makes available via the [ribosome](#ribosome) to a running [cell](#cell). These functions allow the cell to access and manipulate an [agent’s](#agent) [source chain](#source-chain), run cryptographic functions, retrieve and publish [DHT data](#dht-data), send [signals](#signal) to [clients](#client), [bridge](#bridge-call) to the agent’s other cells, and make [remote calls](#remote-call) to their [peers](#peer).

## Holo Host {#holo-host}

A platform and marketplace where Holochain users offer their spare computing capacity to host [cells](#cell) for web users, functioning as a bridge between Holochain and the traditional web. Read more at [Holo’s website](https://holo.host/host/).

## Host API {#host-api}

See [Holochain host API](#holochain-host-api).

## Immune system {#immune-system}

A property of Holochain’s [validating DHT](#validating-dht), whereby healthy [nodes](#node) detect invalid data, share proof of corruption among their peers via [warrants](#warrant), and take defensive action against the corrupt nodes that [authored](#author) the data by blocking network communication with them. While each agent is individually free to interact with a warranted peer, most agents will refuse to interact or gossip with them. The cumulative effect is a collective exclusion of the corrupt nodes (see [mutual sovereignty](#mutual-sovereignty)).

## Inductive validation {#inductive-validation}

The act of relying on inductive reasoning within a [validation function](#validation-function) to validate a piece of data that has dependencies by checking whether the data is valid in the context of its most immediate dependencies only. If other validators report that those dependencies are valid, it can be assumed that they have also applied the same inductive reasoning, as have the validators of those dependencies’ dependencies, all the way back to the root nodes of the dependency graph. This can greatly speed up complex validation algorithms that operate on data with large dependency graphs.

## Init callback {#init-callback}

A function in a [DNA](#dna) that the [conductor](#conductor) executes when an [agent](#agent) calls a [cell](#cell) for the first time, and after they have joined the DNA’s [network](#network). This can be used to set up initial [source chain](#source-chain) [#state](#state-transition), etc.

## Init complete action {#init-complete-action}

An [action](#action) that Holochain automatically writes to an [agent’s](#agent) [source chain](#source-chain) to indicate that the [init callbacks](#init-callback) in all of a [DNA’s](#dna) [zomes](#zome) have successfully run.

## Integrity zome {#integrity-zome}

A [zome](#zome) that defines a data schema. It does this through three specially named [zome functions](#zome-function):

## Intrinsic data integrity {#intrinsic-data-integrity}

Holochain’s foundational strategy for guaranteeing data integrity. Data is considered valid or invalid based on the [DNA’s](#dna) [validation rules](#validation-rule), as well as Holochain’s [subconscious](#subconscious) validation rules.

## Journal {#journal}

Synonymous with [ledger](#ledger).

## Launcher {#launcher}

A desktop application that allows a person to search for, install, and run [hApps](#holochain-application-h-app). The Launcher can be downloaded from its [GitHub repository](https://github.com/holochain/launcher/releases).

## Ledger {#ledger}

A history of events or [state transitions](#state-transition). In [distributed ledger technology](#distributed-ledger-technology-dlt), ledgers are usually stored as [hash chains](#hash-chain), such as a Holochain [agent’s](#agent) [source chain](#source-chain).

## Lightweight consensus {#lightweight-consensus}

An informal term for a Holochain application pattern in which the ownership of scarce resources are tracked and protected from conflicting ownership claims by establishing a set of trusted nodes as [M-of-N signers](#m-of-n-signing), a majority of whom must witness every [countersigned](#countersigning) transaction involving the resources in order for ownership to be considered valid.

## Link {#link}

A piece of [metadata](#metadata) connecting one [address](#address) to another. Each link has a [type](#link-type), can have a [tag](#link-tag) for storing arbitrary content, and is stored in the DHT at its [base’s](#link-base) [address](#address). Neither the base nor the target are required to have any [record data](#record-data) stored at them.

## Link base {#link-base}

The [address](#address) that a [link](#link) links from. The base usually points to the address of a piece of [record data](#record-data) on the same [DHT](#distributed-hash-table-dht), but can also point to an external hash-based address on another DHT or non-Holochain-based data store, in which case it’s informally called a ‘baseless’ link (although technically there is a base; it simply contains no record data). The [anchor](#anchor) pattern is a common use for baseless links.

## Link tag {#link-tag}

An arbitrary piece of data, stored with a [link](#link), that contains arbitrary application-defined information. Among other uses, a link tag can be used in a query filter or store information about the [link target](#link-target) to avoid a second [DHT](#distributed-hash-table-dht) query to retrieve the target’s content.

## Link target {#link-target}

The [address](#address) that a [link](#link) points to. As with the [base](#link-base), a target can point to the address of a piece of [record data](#record-data) on the same DHT, but can also point to something external or left unspecified. The target addresses of links within the same DHT do not automatically have any metadata pointing back to the [base](#link-base), and therefore by default have no knowledge that they’re being pointed to.

## Link type {#link-type}

A specification for a [link](#link) defined in an [integrity zome](#integrity-zome) that a [DNA](#dna) should recognize and understand, similar to a foreign reference in a database table schema. DNA developers create their own link types for the data their app needs to store, and can write [validation functions](#validation-function) for [operations](#dht-operation) that [create, update, or delete](#create-read-update-delete-crud) links of those types.

## Link types callback {#link-types-callback}

A private [zome function](#zome-function) in an [integrity zome](#integrity-zome) that yields all the link types defined in the zome’s schema. This callback is called by the [conductor](#conductor) at [DNA](#dna) installation time.

## Live data {#live-data}

[DHT data](#dht-data) or [source chain](#source-chain) data that meets two criteria:

## Lobby {#lobby}

A Holochain application design pattern, in which one [DHT](#distributed-hash-table-dht) is established as a common space which [agents](#agent) can join and either request access to a privileged DHT or ask privileged agents to mediate access to that DHT using [remote calls](#remote-call).

## Logical monotonicity {#logical-monotonicity}

The property of a system whereby [monotonicity](#monotonicity) is applied to state changes. Practically this means that state changes are only accumulated, never forgotten, so that the system’s final state results from the application of all accumulated state changes. [CALM](#consistency-as-logical-monotonicity-calm-theorem) systems such as Holochain are logically monotonic. Two examples of this in Holochain are:

## Membrane {#membrane}

One of two types of permeable boundaries that allow or disallow access:

## Membrane proof {#membrane-proof}

A [record](#record) written to an agent’s [source chain](#source-chain) that proves they have permission to join a [DHT](#distributed-hash-table-dht), for example, an invite code or signed authorization from an existing member. The [DNA](#dna) for the DHT has a [validation function](#validation-function) that checks the validity of the membrane proof; if agents validating the membrane proof determine that it’s invalid, they can refuse to communicate with the new agent. This is the [immune system’s](#immune-system) first line of defense against malicious actors.

## Metadata {#metadata}

Supplementary data attached to a [base](#base) in a [DHT](#distributed-hash-table-dht). Metadata can be one of:

## Microservice {#microservice}

An application architecture pattern that encourages small, single-purpose [back end](#back-end) services. Holochain [DNAs](#dna) can be seen as microservices that combine to form a fully featured [hApp](#holochain-application-h-app).

## M-of-N signing {#m-of-n-signing}

An extension to [countersigning](#countersigning), in which a number of optional witnesses are also involved as [counterparties](#counterparty) signing the session, a majority of which must sign in order for the session to complete. One optional witness must also be nominated as the session’s [enzyme](#enzyme).

## Monotonicity {#monotonicity}

A property of a function whereby values are either non-decreasing or non-increasing (that is, values may stay the same, but if they change, they may only ever go up or go down). An example in Holochain can be found in the timestamps of an [agent](#agent)’s [source chain](#source-chain), where a source chain [action](#action) can never be earlier than the action that precedes it. See also [logical monotonicity](#logical-monotonicity).

## Mutual sovereignty {#mutual-sovereignty}

The relationship between the autonomy of the individual and the collective intentions of the group. A successful [commons](#commons) finds a healthy tension between these opposites. Holochain’s design is based on this principle, empowering [participants](#participant) to control their own identity and responses to their peers by equipping each of them with a full copy of the application’s code. This code constitutes a formal, executable definition of the group’s rules and norms, as [DNA](#dna) modules, so by running the application a participant consents to become a member of the group and be bound by those rules and norms.

## Nearness {#nearness}

The mathematical distance between two [addresses](#address) to each other in the [DHT’s](#distributed-hash-table-dht) [address space](#address-space).

## Neighbor {#neighbor}

See [neighborhood](#neighborhood).

## Neighborhood {#neighborhood}

A range of [DHT addresses](#dht-address) about which a [node](#node) attempts to know everything they ought to know. Neighbors collectively support the [resilience](#resilience) of all [DHT data](#dht-data) whose [address](#dht-address) is within their respective [storage arcs](#storage-arc) by storing and [validating](#validation-rule) it and [gossiping](#gossip) it to all [neighbors](#neighbor) with whom their storage arcs overlap.

## Network {#network}

In Holochain terms, a collection of [nodes](#node) [gossiping](#gossip) with each other to form a [validating DHT](#validating-dht), aiding in data storage and retrieval, [validation](#validation-rule), and peer discovery. Each [DNA](#dna) has a separate network.

## Network seed {#network-seed}

An optional string, specified in a [DNA bundle](#dna-bundle) file or passed at [cell](#cell) [cloning](#cloning) time, that modifies the [DNA’s hash](#dna-hash) without modifying any of its behavior. This can be used to create a unique [network](#network) shared by all [agents](#agent) who use the same network seed. Hence, a network seed is considered a [DNA modifier](#dna-modifiers).

## Node {#node}

An individual [agent](#agent) in a Holochain [network](#network) who has an [agent address](#agent-address) and can be talked to via [gossip](#gossip).

## Open/close chain actions {#open-close-chain-actions}

[System actions](#system-action) that track the continuity of an [agent’s](#agent) participation across multiple [source chains](#source-chain). A close chain action marks a source chain as closed and points to a new source chain (either in the same or another [DHT](#distributed-hash-table-dht)) that continues the agent’s activity, while an open chain action marks a source chain as a continuation of a prior source chain.

## Origin time {#origin-time}

A timestamp deemed to be the ‘birthdate’ of a [DNA](#dna). It defines the earliest valid timestamp for any data on any [source chain](#source-chain) of any [cell](#cell) in the DNA’s [network](#network), and helps make gossip more efficient. Origin time is considered a [DNA modifier](#dna-modifiers).

## Participant {#participant}

Synonymous with ‘user’. We often prefer the term ‘participant’ because a Holochain [DHT](#distributed-hash-table-dht) is a [commons](#commons) of [mutually sovereign](#mutual-sovereignty) peers who all actively work to maintain its integrity, rather than people who merely ‘use’ an application.

## Partition {#partition}

A situation in which some nodes in a [distributed system](#distributed-system) are temporarily or permanently unable to communicate with each other.

## Path {#path}

A specific application of the [anchor](#anchor) pattern in which anchors, in addition to serving as the bases for large numbers of links, also point to other anchors in a hierarchical structure.

## Peer {#peer}

Synonymous with [node](#node) or [agent](#agent) in a [peer-to-peer](#peer-to-peer) network; the plural term ‘peers’ describes agents who belong to the same network.

## Peer discovery {#peer-discovery}

The act of finding the transport addresses of peers to communicate with. Initial discovery is done as a part of [bootstrapping](#bootstrapping), and ongoing peer discovery is handled by [DHT](#distributed-hash-table-dht) lookups and [gossip](#gossip). The currently supported peer discovery methods are:

## Peer table {#peer-table}

A mapping of [agent addresses](#agent-address) to [transport addresses](#transport-address) which an [agent](#agent) maintains in order to participate in a Holochain [network](#network). This peer table is populated via various [peer discovery](#peer-discovery) methods. It will typically contain a high concentration of entries contained in the agent’s own [storage arc](#storage-arc), as well as a small number of entries for peers in other parts of the network’s [address space](#address-space). Each [DNA](#dna) which an agent is running will be part of its own network, which means that it will also have its own peer table.

## Peer-to-peer {#peer-to-peer}

Describes any highly [decentralized](#decentralization) [distributed system](#distributed-system) in which [nodes](#node) talk directly to one another without the intermediation of a [server](#client-server) or other type of [central](#centralization) node.

## Playground {#playground}

A community-contributed UI that visualizes the state of the [cells](#cell) in a [hApp’s](#holochain-application-h-app) [network](#network) that are running in a local [conductor](#conductor). It can be used to help a developer understand the working of Holochain’s [subconscious](#subconscious) and foundational data structures, as well as troubleshoot a hApp. The Playground is included by default in every hApp [scaffolded](#scaffolding) by Holochain’s official scaffolding tool. See [Playground’s GitHub organization](https://github.com/holochain-playground).

## Post-commit callback {#post-commit-callback}

A private callback defined in a [coordinator zome](#coordinator-zome) that receives every [record](#record) [committed](#commit) by that zome after another [zome function](#zome-function) has successfully committed them. A post-commit callback is a normal zome function in every respect, except that it can’t make commits of its own.

## Private entry {#private-entry}

An [entry](#entry) which is stored on an [agent’s](#agent) [source chain](#source-chain), but not [published](#publish) to the [DHT](#distributed-hash-table-dht).

## Proxy relay {#proxy-relay}

A special software service that helps two Holochain nodes behind restrictive firewalls or NATs communicate with each other by mediating network traffic between them.

## Public entry {#public-entry}

An [entry](#entry) whose [type](#entry-type) is marked ‘public’ and is [published](#publish) to the [DHT](#distributed-hash-table-dht).

## Public-key cryptography {#public-key-cryptography}

A cryptographic system that consists of two keys, a public component and a private component. These keys are mathematically related to each other in a way that’s easy for the key pair’s owner to prove, but nearly impossible for a third-party to reverse-engineer. In Holochain, an [agent’s](#agent) public key lives in the [DHT](#distributed-hash-table-dht) and serves as their [ID](#agent-id) while the private key stays on the agent’s device. [Peers](#peer) can verify an agent’s claim of authorship on [published](#publish) [DHT data](#dht-data) by checking their [signature](#public-key-signature), and can use an agent’s public key to encrypt a private message that only the holder of the corresponding private key can decrypt.

## Public-key infrastructure (PKI) {#public-key-infrastructure-pki-}

A way for agents to share their public keys, prove their authenticity, and revoke old keys if they’ve been compromised. Most PKIs, such as the global TLS certificate authority system, are centralized. Holochain will provide a [distributed PKI](#distributed-public-key-infrastructure-dpki) system.

## Public-key signature {#public-key-signature}

The hash of a piece of data, encrypted with a private key. It can be decrypted by anyone who has a copy of the public key, which allows them to verify authorship of the signed data. In Holochain, the [author](#author) of any [record data](#record-data) that gets published to the [DHT](#distributed-hash-table-dht) attaches their signature to each of the [DHT operations](#dht-operation) they produce, to prove authorship and allow third-party tampering to be detected.

## Public/private key pair {#public-private-key-pair}

See [public-key cryptography](#public-key-cryptography).

## Publish {#publish}

To convert a [record](#record) into one or more [DHT operations](#dht-operation) and send them to the respective [validation authorities](#validation-authority) for [validation](#validation-rule), transformation into [record data](#record-data), and storage. This happens after it has passed the author’s own copy of the [validation rules](#validation-rule). The validation authorities who are responsible for that entry’s [address](#address) receive it, validate it, and if it’s valid, store a copy of it and pass a [validation receipt](#validation-receipt) back to the author.

## Quantized gossip {#quantized-gossip}

In Holochain’s [DHT](#distributed-hash-table-dht), the practice of synchronizing data held by two [validation authorities](#validation-authority) by first agreeing on a two-dimensional window to compare lists of respectively held [DHT operations](#dht-operation). This window is fitted to one or more cells in a grid, in which the horizontal axis is the DHT’s [address space](#address-space) and the vertical axis is the time since the [DNA](#dna)’s [origin time](#origin-time), quantized by the [quantum time](#quantum-time). As every DHT operation has both an address and a timestamp, it can be located on the grid. This technique is used to increase speed and reduce payload size of [gossip](#gossip) rounds.

## Quantum time {#quantum-time}

A value specified in the [DNA manifest](#dna-manifest) that defines the smallest time window for which two peers will compare a subset of the data they’re each holding during a round of [DHT](#distributed-hash-table-dht) synchronization. The quantum time is a [DNA modifier](#dna-modifiers), and with the [origin time](#origin-time) affects the way in which peers [gossip](#gossip). All peers in a network must agree on the [quantized gossip](#quantized-gossip) parameters they use in order to gossip DHT data successfully with one another.

## Record {#record}

The data structure that holds an [action](#action) in an [agent’s](#agent) [source chain](#source-chain). Some records are a combination of [action](#action) and [entry](#entry), such as [entry creation actions](#entry-creation-action), while others contain all their data inside the action.

## Record data {#record-data}

Any piece of [address](#address)able data that can (though doesn’t need to) be published to the [DHT](#distributed-hash-table-dht). Record data consists of anything contained in a [record](#record) — that is, an [action](#action) or an [entry](#entry), which are stored by separate [validation authorities](#validation-authority) on the DHT. Each [base](#base) in a DHT may only have one piece of record data associated with it. This is in contrast to [metadata](#metadata), of which there can be many attached to a base.

## Recurring schedule {#recurring-schedule}

A schedule on which a [scheduler function](#scheduler-function) is directed to run. A recurring schedule specifies a time interval, similar to a UNIX cronjob or Windows scheduled task. Unlike an [ephemeral schedule](#ephemeral-schedule), functions running on a recurring schedule survive through [cell](#cell) stops and starts.

## Remote call {#remote-call}

A [remote procedure call](#remote-procedure-call-rpc) that one agent’s [cell](#cell) makes to [the zome functions](#zome-function) of another agent’s cell within a [network](#network). The callee controls remote access to their zome functions via [capability-based security](#capability-based-security).

## Remote procedure call (RPC) {#remote-procedure-call-rpc-}

A network port that the [conductor](#conductor) exposes, allowing [clients](#client) to call the [conductor admin API](#conductor-admin-api) or [conductor app API](#conductor-app-api) via WebSocket. By default, this interface only listens for local connections, so it can’t be accessed over the internet.

## Required validations {#required-validations}

The number of [validation receipts](#validation-receipt) that an instance of a given [entry type](#entry-type) must have in order to be considered accepted by the [validation authorities](#validation-authority) and be ‘live’ on the [DHT](#distributed-hash-table-dht). On initial [publish](#publish), the author of a record collects these receipts; thereafter, validation authorities gossip these receipts to each other. If the author can’t collect the required number of receipts, it will try to republish to more authorities later.

## Resilience {#resilience}

The measure of a [network’s](#network) capacity to hold itself in integrity as [nodes](#node) leave, join, or attempt to attack it. In a Holochain [DHT](#distributed-hash-table-dht), [neighbors](#neighbor) attempt to collaboratively adjust their [storage arcs](#storage-arc) to ensure that every piece of data is covered by enough [validation authorities](#validation-authority) to make it always available.

## Ribosome {#ribosome}

The ‘sandbox’ or ‘virtual machine’ inside which a [cell](#cell) runs. In Holochain’s current design, the ribosome is a [WebAssembly](#web-assembly-wasm) runtime that exposes Holochain’s [host API](#holochain-host-api) to the cell and allows the [conductor](#conductor) to call the cell’s exposed [zome functions](#zome-function).

## Rust {#rust}

The programming language currently used to build Holochain Core and [DNAs](#dna)/[zomes](#zome). See [Rust website](https://www.rust-lang.org/).

## Saturation {#saturation}

The state at which there are enough [peers](#peer) holding a piece of [DHT data](#dht-data) to make sure it’s reliably available to anyone who asks for it (see [resilience](#resilience)).

## Scaffolding {#scaffolding}

The act of generating application code from generic templates and app-specific specifications using a tool built for the purpose. Holochain’s [scaffolding tool](https://github.com/holochain/scaffolding) can generate [zome](#zome), [test](#tryorama), and [UI](#graphical-user-interface-gui) code.

## Scenario test {#scenario-test}

An automated test that simulates real-life conditions involving multiple [cells](#cell) in a [network](#network), used to test a [DNA’s](#dna) functionality and tolerance of various failure modes. [Tryorama](#tryorama) is used to write scenario tests in JavaScript.

## Scheduler function {#scheduler-function}

A private [zome function](#zome-function) (that is, a function which is not exposed as part of a [cell’s](#cell) public API) which another zome function can direct to be called on an [ephemeral](#ephemeral-schedule) or [recurring schedule](#recurring-schedule). A scheduler function only receives a schedule and can only return a schedule (either a new one or the same one); any state information must be retrieved from the [source chain](#source-chain) of the [agent](#agent) on which the [cell](#cell) is running, or from the [DHT](#distributed-hash-table-dht) which the cell is a part of.

## Scheduling {#scheduling}

The act of directing a [scheduler function](#scheduler-function) to be called later, either [ephemerally](#ephemeral-schedule) or on a [recurring schedule](#recurring-schedule).

## Sharding {#sharding}

A process of reducing the processing and storage load of individual [nodes](#node) in a [distributed system](#distributed-system) by distributing data and/or work among them. While some sharded systems such as [Ethereum 2](https://ethereum.org/en/eth2/) separate nodes into discrete shards, Holochain’s [DHT](#distributed-hash-table-dht) separates them into [neighborhoods](#neighborhood) of overlapping [storage arcs](#storage-arc). Each node in a DHT takes responsibility to store a shard of the total public data in the DHT, according to the chosen size of their own storage arc.

## Signal {#signal}

Signals are “fire and forget”; they are not persisted to any [source chain](#source-chain) or the [DHT](#distributed-hash-table-dht) and will be lost and not retried if they don’t reach the intended recipient(s).

## Source chain {#source-chain}

A [hash chain](#hash-chain) of [records](#record) committed by an [agent](#agent). Every agent has a separate source chain for each of the [cells](#cell) they’re running, which stores all of the [actions](#action) or [state transitions](#state-transition) the cell has made.

## State transition {#state-transition}

A modification of application state. In Holochain, all state transitions are initially created as [records](#record) in an [agent’s](#agent) [source chain](#source-chain) that represent the [actions](#action) of [creating, updating, and deleting](#create-read-update-delete-crud) data and metadata, as well as of system-level actions such as [capability grants](#capability-grant). A state transition further yields one or more [operations](#dht-operation) that are then [published](#publish) to the [DHT](#distributed-hash-table-dht), that is, they are sent to the appropriate [validation authorities](#validation-authority), who then apply those operations to their own DHT [shard](#sharding), which causes a state transition for the [base](#base) to which the operation applies.

## Subconscious {#subconscious}

The ‘base’ [validation rules](#validation-rule) defined by Holochain that check validity of [DHT operations](#dht-operation) and the integrity of each [agent’s](#agent) [source chain](#source-chain).

## Storage arc {#storage-arc}

A range of [DHT addresses](#dht-address) for which an [agent](#agent) claims [authority](#validation-authority) — that is, responsibility to [validate](#validation-rule), store, [gossip](#gossip), and serve all [DHT data](#dht-data) whose addresses fall within the arc.

## System action {#system-action}

Any [action](#action) meant for Holochain’s internal use. A system action can be one of:

## System entry {#system-entry}

Any type of [entry](#entry) meant for Holochain’s internal use. System entries can be [created](#create-entry-action), [updated](#update-entry-action), and [deleted](#delete-entry-action) just like [app entries](#app-entry). The system entry types currently defined are:

## Transferrable capability grant {#transferrable-capability-grant}

A [capability grant](#capability-grant) that allows any caller who can produce the right [secret](#capability-secret) to call a [zome function](#zome-function) in the grantor’s [cell](#cell).

## Transport address {#transport-address}

The underlying network address of an [agent](#agent) in a [network](#network), such as its IP address. This is different from its [agent address](#agent-address), which is a [DHT address](#dht-address), although every agent address maps to a transport address, published by the agent themselves and held by the [agent ID entry’s](#agent-id-entry) [validation authorities](#validation-authority).

## Transport implementation {#transport-implementation}

A networking layer that allows [peers](#peer) in the same [network](#network) to [gossip](#gossip) with each other and make [remote calls](#remote-call). Currently Holochain only supports two transport implementations:

## Trustless {#trustless}

Describes a [peer-to-peer](#peer-to-peer) [distributed system](#distributed-system) that is [Byzantine fault tolerant](#byzantine-fault-tolerance-bft) even when [nodes](#node) are anonymous and membership is unrestricted. Trust is placed in the algorithm, rather than the reputation of the actors.

## Tryorama {#tryorama}

A [scenario testing](#scenario-test) library for Holochain. See [Tryorama GitHub repo](https://github.com/holochain/tryorama).

## Unrestricted capability grant {#unrestricted-capability-grant}

A [capability grant](#capability-grant) that allows any [peer](#peer) or [client](#client) to call a [zome function](#zome-function) in the grantor’s [cell](#cell).

## Update-entry action {#update-entry-action}

An [entry creation action](#entry-creation-action) that replaces another entry creation action, essentially allowing the simulated modification of already-written data in a way that allows for multiple branching revision chains. This can be used to modify [public](#public-entry) or [private](#private-entry), [system](#system-entry) or [app](#app-entry) entries.

## Validating DHT {#validating-dht}

Holochain’s [DHT](#distributed-hash-table-dht) design which creates an [immune system](#immune-system) for the network. An [agent](#agent) chooses [validation authorities](#validation-authority) at random to [publish](#publish) or retrieve DHT data, based on peers’ [nearness](#nearness) to the [address](#address) of the data being validated and the [storage arcs](#storage-arc) they claim authority for. If an entry fails validation, the validation authority publishes a [warrant](#warrant) against the entry’s author.

## Validation authority {#validation-authority}

An [agent](#agent) on an application’s [validating DHT](#validating-dht), chosen at random to validate a [DHT operation](#dht-operation), based on their [agent address](#agent-address)’ [nearness](#nearness) to the base [address](#address) of the operation and their published [storage arc](#storage-arc). After validating, they also store the entry and help maintain its [resilience](#resilience) by gossiping it with their [neighbors](#neighbor) and cooperating to adjust their storage arcs to ensure reliable availability.

## Validation receipt {#validation-receipt}

A signed piece of data sent by a [validation authority](#validation-authority) to the [author](#author) of an [operation](#dht-operation) indicating whether it was deemed valid or not.

## Validation rule {#validation-rule}

Any executable code that checks data for validity. Validation rules can either be [subconscious](#subconscious) or written in a [zome](#zome) as a [validation function](#validation-function).

## Validation function {#validation-function}

A function in an application’s [DNA](#dna) that contains the validation rules for a [DHT operation](#dht-operation). This function allows every [agent](#agent) to check the correctness of data they see. If a [validation authority](#validation-authority) is performing validation on an operation and finds that it’s invalid, they can generate and share a [warrant](#warrant) proving that the record’s author has broken the ‘rules of the game’.

## Validation receipt {#validation-receipt}

A [signed](#public-key-signature) piece of data created by the [validation-authority](#validation-authority) for a [DHT operation](#dht-operation), attesting to its validity according to the [validation rules](#validation-rule) in the app.

## Validator {#validator}

See [validation authority](#validation-authority).

## Warrant {#warrant}

(Future) A [signed](#public-key-signature) piece of data that attests that either:

## WebAssembly (WASM) {#webassembly-wasm-}

A low-level program byte code format that can be run on almost any platform, including the web browser. Holochain expects [zomes](#zome) to be compiled to WebAssembly so the [ribosome](#ribosome) can execute them. See [WebAssembly website](https://webassembly.org/).

## Web hApp {#web-happ}

A [hApp](#holochain-application-h-app) [bundled](#bundling) with a web-based UI.

## Weight {#weight}

A value, available as a field in most [action](#action) types, that serves as an estimation of the cost of validating the [operations](#dht-operation) and storing/serving the [data](#dht-data) associated with an action. This value, along with the timestamp of the action and actions preceding it, can be used in a [validation function](#validation-function) to throttle excessive [source chain](#source-chain) writes which could cause overloading of the [network](#network) supporting a [DHT](#distributed-hash-table-dht).

## Workspace {#workspace}

A snapshot of an agent’s current cell [state](#state-transition), that is, their [source chain](#source-chain), taken at the start of a [zome function](#zome-function) call. All [commits](#commit) are staged to this workspace and not written to the source chain until the function completes and validation succeeds for all commits (see [atomic commit](#atomic-commit)).

## Zome {#zome}

A basic unit of modularity inside a [DNA](#dna). A zome defines a package of [zome functions](#zome-function) and can be either an [integrity](#integrity-zome) or [coordinator zome](#coordinator-zome).

## Zome function {#zome-function}

A function, created by the developer of a [zome](#zome), that allows external code to access the zome’s functionality. A zome function can be:

