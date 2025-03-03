- Links
 - Let you connect two addressable items on the DHT together
 - Some examples of addresables could be:
  - An Action
  - An Entry
  - An Agent
  - A Collection (More on this)
  - Anything else that that has its hash public on the DHT

- Links can be of different relationships:
 - Unidirectional/One to Many (Users to Messages)
 - Bidirectional/Many to Many (Friends of Users)
 
 - Unlike other items on the DHT, links can be permenently deleted

- Collections
 - Collections define abitrary points on the DHT
 - These points can be used to link to other addressables
 - Collections are good for defining an array of addressables that are application wide, eg: 'All subreddits'
 - Addressables that corrispond to another item on the DHT (Messages from User) are NOT collections

- Linking data together on the DHT can help connect known things to unknown things
 - This makes it helpful for indexing something from something else
 - Retreiving a group of something from another certain something
 - Examples:
 - Linking each blog post of an agent to the agent (See all posts by user)
 - Linking each comment to a blog post (see all comments on a blog post)
 - Linking from a blog post to an collection (get all blog posts on the DHT)
 - Linking from the old original entry to the new updated one 
 
- The link structure has four components:
 - The base address, or the address from which it is linked. This is the ‘known’ thing.
 - The target address, or the address it’s linking to. This is the ‘unknown’ thing.
 - A type; as with entries, you can define link types according to your app’s needs.
 - An optional tag containing extra information about the nature of the relationship or target. You can put whatever you like into this tag, then retrieve it or filter on it when you’re querying a base address for links.

Challenge - Links and Collections