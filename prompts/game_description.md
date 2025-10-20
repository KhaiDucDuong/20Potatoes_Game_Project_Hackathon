# 💧 Save the Drop

A simple **environmental awareness mini-game** built using only **HTML, CSS, and JavaScript**.  
The player controls a water droplet trying to stay clean while avoiding falling trash.  

---

## 🎮 Gameplay

- You control a **💧 water droplet** that moves **left and right** using arrow keys or A/D keys.
- **Avoid** falling **trash (🗑️)** — they pollute your drop.
- **Collect** falling **clean raindrops (💦)** — they increase your score.
- The game gets faster over time, testing your reflexes.
- When you hit too much trash, **the game ends**.

---

## 🧱 Features

- Pure **HTML**, **CSS**, and **JavaScript** (no frameworks or engines)
- Uses **emoji icons** instead of images — simple, lightweight, and expressive
- **Responsive gameplay** — works in browser without setup
- **Collision detection** using `getBoundingClientRect()`
- **Scoring system** and increasing difficulty

---

## 🖼️ Visual Elements

| Element | Icon | Description |
|----------|------|-------------|
| Player | 💧 | You, the water droplet |
| Clean Drop | 💦 | Good item — collect to score points |
| Trash | 🗑️ | Bad item — avoid to stay alive |

---

## ⚙️ How It Works

1. The game area is a fixed container (`#gameArea`) using `position: relative;`.
2. Items (`div` elements) fall using JavaScript animation loops (`requestAnimationFrame`).
3. Collision is checked between the player and falling items.
4. Score and lives are updated dynamically.
5. Game restarts when the droplet gets polluted too many times.

