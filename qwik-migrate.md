# Qwik migrate version of skill-icons

## Overview

- This is a `Qwik` migrate version of the `skill-icons` project.
- The `endpoint` is the same as the original project, but with additional query params.

## API References

<details>
 <summary><code>GET</code> <code><b>/icons</b></code> <code>(get skill icons)</code></summary>

### Parameters

> | param          | data type | type       | value                             | description                                                    |
> | :------------- | :-------- | ---------- | :-------------------------------- | -------------------------------------------------------------- |
> | `i`            | `String`  | `required` | can be `all`, `js`, or `html,css` | name of icon(s) to be render,                                  |
> | `t`, `theme`   | `String`  |            | `default: dark`                   | icon theme to be `light` or `dark`                             |
> | `perline`      | `Int`     |            | `default: 15` `min: 1` `max: 50`  | num icons per line                                             |
> | `gap`          | `Int`     |            | `default: 0` `min: 0` `max: 100`  | gap between icons                                              |
> | `p`, `padding` | `Int`     |            | `default: 0` `min: 0` `max: 100`  | padding around wrapper                                         |
> | `px`           | `Int`     |            | `default: 0` `min: 0` `max: 100`  | horizontal padding (will be overwritten when `padding` is set) |
> | `py`           | `Int`     |            | `default: 0` `min: 0` `max: 100`  | vertical padding (will be overwritten when `padding` is set)   |

### Responses

> | http code | content-type       | response                                                  |
> | --------- | ------------------ | --------------------------------------------------------- |
> | `200`     | `image/svg+xml`    |
> | `400`     | `application/json` | `{ msg: "You didn't specify any icons!" }`                |
> | `400`     | `application/json` | `{ msg: '"theme" must be either "light" or "dark"' }`     |
> | `400`     | `application/json` | `{ msg: '"perline" must be a number in range [1..50]' }`  |
> | `400`     | `application/json` | `{ msg: '"gap" must be a number in range [0..100]' }`     |
> | `400`     | `application/json` | `{ msg: '"padding" must be a number in range [0..100]' }` |
> | `400`     | `application/json` | `{ msg: '"px" must be a number in range [0..100]' }`      |
> | `400`     | `application/json` | `{ msg: '"py" must be a number in range [0..100]' }`      |
> | `400`     | `application/json` | `{ msg: "You didn't format the icons param correctly!" }` |
> | `500`     | `application/json` | `{ err: any }`                                            |

### Example request

> ```
>  http://localhost:5173/icons?i=html,css,js&theme=light&perline=5&gap=5&padding=10
> ```
>
> ![example1](https://skill-icons-livid.vercel.app/icons?i=html,css,js&theme=light&perline=5&gap=5&padding=10)

</details>

## Instructions

### Installation

- Run `yarn` to install the dependencies

```bash
yarn
```

- If you get error with `sharp` package, just follow the instruction or run this command

```bash
yarn add sharp --ignore-engines
```

### Build & Deploy

- Just run `yarn build` and the `icons.json` file will be generated in the `public/icons` folder.

```bash
yarn build
```

- Deploy with Vercel

```bash
yarn deploy
```
