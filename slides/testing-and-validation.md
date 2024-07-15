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
layout: intro
---

# Validation in Holochain

---

# Validation Rules

<v-clicks>

- Define valid actions in the Holochain network
- Similar to sanitizing incoming data in web2 servers
- Ensure data integrity and security
- Run on both client and receiving peers
- Help identify corrupted or tampered data

</v-clicks>

---

# Characteristics of Validation Rules

<v-clicks>

- Deterministic: Same result every time
- Run before publishing to source chain
- Can lead to agent blocking if rules are violated
- Cannot use non-deterministic functions

</v-clicks>

---

# Deterministic vs Non-Deterministic

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

```rust
pub enum ValidateCallbackResult {
    Valid,
    Invalid(String),
    UnresolvedDependencies(Vec<AnyDhtHash>),
}
```

<v-clicks>

- Valid: Action passes all checks
- Invalid: Action fails, with description
- Unresolved dependencies: Missing data, retry later

</v-clicks>

---

# Validation Example

```rust
#[hdk_extern]
pub fn validate(op: Op) -> ExternResult<ValidateCallbackResult> {
    match op {
        Op::StoreEntry(store_entry) => {
            match store_entry.entry_type() {
                EntryType::App(app_entry_type) => {
                    match app_entry_type {
                        AppEntryType::Post(post) => {
                            if post.content.len() > 280 {
                                Ok(ValidateCallbackResult::Invalid(
                                    "Post content exceeds 280 characters".into()
                                ))
                            } else {
                                Ok(ValidateCallbackResult::Valid)
                            }
                        },
                        _ => Ok(ValidateCallbackResult::Valid),
                    }
                },
                _ => Ok(ValidateCallbackResult::Valid),
            }
        },
        _ => Ok(ValidateCallbackResult::Valid),
    }
}
```

</v-clicks>

---

# Use Cases for Validation Rules

<v-clicks>

- Data structure validation
- Enforcing game rules
- Defining privileges
- Rate limiting
- Ensuring data integrity

</v-clicks>

---

# Testing in Holochain

<v-clicks>

- Tryorama: Holochain's JavaScript testing suite
- Tests zome functions and validation rules
- API similar to frontend-backend communication

</v-clicks>

---

# Benefits of Testing

<v-clicks>

- Ensures zome functions work as expected
- Verifies validation rules are effective
- Simulates real-world scenarios
- Improves overall application reliability

</v-clicks>

---
layout: end
---

# Challenge 3
Testing and Validation
