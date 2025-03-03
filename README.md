# Open Holochain Curriculum

A modular technical curriculum for educators to mix and match to teach Holochain.


## Key Principles
- **Open** : make it easy for educators to use, extend and maintain
- **Modular** : small components that are easy to mix and match
- **Practical** : focus on learning by building
- **LLM friendly** : easy for educators to use AI assistants to maintain curriculum


## Installation

```
git clone git@github.com:CodeWithJV/open-holochain-curriculum.git
cd open-holochain-curriculum
npm i
```

If you want to pull down all the submodules 
```
git submodule update --init --recursive
```

## Curriculum Elements

- **Activities** : hands on exercises students can use to engage with the material
- **Slides** : slides to teach concepts and introduce challenges
- **Challenges** : coding exercises with stand alone repos

Slides are built using [slidev](https://sli.dev/) - checkout their [guide](https://sli.dev/guide/) for a quick overview.

## Scripts

- **Fetch Glossary**: The `scripts/fetch-glossary.js` script downloads and parses the official Holochain Glossary into a Markdown file at `docs/glossary.md`. Run it after saving the glossary HTML page locally as `glossary.html` in the project root.
  ```
  node scripts/fetch-glossary.js
  ```

## Other learning resources

- [Self paced training](https://resources.holochain.org/self-paced-training/) (2023)
- [Holochain Gym](https://holochain-gym.github.io/) (2022)
