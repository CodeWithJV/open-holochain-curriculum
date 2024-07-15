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
- Cannot use non-deterministic functions (e.g., time, random numbers)

</v-clicks>

---

# Validation Outcomes

<v-clicks>

- Valid
- Invalid (with description)
- Unresolved dependencies

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
