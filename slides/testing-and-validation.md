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
Testing and Validation
---

# Validation Rules

> Any executable code that checks data for validity. 
>
> [Glossary: Validation Rule](https://developer.holochain.org/resources/glossary/#validation-rule)

<v-clicks>

- Define valid actions in the Holochain network
- Similar to sanitizing incoming data in web2 servers
- Ensure data integrity and security
- Run by each agent before committing data to source chain
- Checked by peers when propagating data
- Publishing state changes that break validation results in expulsion.

</v-clicks>

---

# Characteristics 

<v-clicks>

- Run before publishing to source chain
- Can lead to agent blocking if rules are violated
- Cannot use non-deterministic functions

</v-clicks>

---

## Deterministic vs Non-Deterministic
<br/>
<v-clicks>

Allowed (Deterministic):
- Pure functions
- Checking entry contents
- Verifying signatures
- Validating data structures

Not Allowed (Non-Deterministic):
- Current time or timestamps
- Random number generation
- External API calls
- Reading cell owner's state

</v-clicks>

---

# Validation Outcomes


<v-clicks>

- Valid: Action passes all checks
- Invalid: Action fails, with description
- Unresolved dependencies: Missing data, retry later

```rust
pub enum ValidateCallbackResult {
    Valid,
    Invalid(String),
    UnresolvedDependencies(Vec<AnyDhtHash>),
}
```

</v-clicks>


---

## Some basic use cases for Validation Rules

<br/>

<v-clicks>

- Make sure chess moves, transactions, property transfers, and votes are legitimate.
- Set up privileges for certain users based on certain actions
- Limit the rate of certain actions to prevent abuse / over populating the DHT
- Check for properly structured data, upper/lower bounds on numbers, string lengths, non-empty fields, or correctly formatted content

</v-clicks>

---

# Testing in Holochain

<v-clicks>

- Tryorama: Holochain's JavaScript testing suite
- Great for testing zome functions
- Great for testing validation rules

</v-clicks>

---
layout: end
---

# Challenge 3
Testing and Validation
