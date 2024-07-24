Intro: Validation

- Validation Rules
 - Validation Rules (rules of the game) determine which actions are valid and which aren't
 - Validation rules are logical checks similar to testing the validity/sanitising any incoming form data as you would on a web2 server 
 - Like with any application, in Holochain you can't trust incoming data from another client is safe
 - Before an action can be published to the source chain it must complete any validation rules on the client creating the action, and any other peers receiving and registering the action 
 - Validation rules allow peers to identify incoming corrupted or tampered data
 - If a published action from another client fails a validation rule check, the agent is blocked and a warrent is issued

- Validation Rules are deterministic
 - This means that the result from the validation rules must be the same everytime
 - Entries and action can be retrieved by hash, as can entire sequences of a source chain. 
 - Collections such as links on a base or full agent activity reports can’t be retrieved

Other sources of non-determinism include:
 - Conductor host API functions that retrieve the time,
 read the cell owner’s own state,
 generate a random number,
  or call a zome function in another cell are disallowed for the same reason.
 
Once it’s done its work, the validation function can return one of three values:
 - Valid
 - Invalid, with a description of what was invalid,
 - Unresolved dependencies, with a list of the addresses of dependencies that it couldn’t retrieve from the DHT. (If the conductor fails to retrieve data, it’ll short-circuit execution of the validation function, return this value, and schedule the validation for retry later.)

Use cases for validation rules:
 - The shape of valid data — validation rules on entry and link types that hold data can check for properly structured data, upper/lower bounds on numbers, string lengths, non-empty fields, or correctly formatted content.
 - Rules of the game — validation rules on connected graph data, including the history in the author’s source chain, can make sure chess moves, transactions, property transfers, and votes are legitimate.
 - Privileges — validation rules that focus on the type of action (create, update, or remove) can define who gets to do what.
 - Rate limiting — each CRUD action has a timestamp can be used to create a validation rule that rejects actions if they're written too frequently.
 - So much more!

Intro: Testing in Holochain

- Holochain comes with its own javascript testing suite called tryorama
 - Useful for testing your zome functions are working
 - Very useful for testing that your validation rules are working
 - The API is similar to the API used by your frontend to call you backend zome functions

Challenge 3: Testing in Holochain