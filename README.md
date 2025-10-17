# Helldivers 2 Stratagem Wordle

A Helldivers 2 themed wordle style guessing game where you must identify the correct stratagem based on feedback in multiple categories. Each guess returns color-coded hints **red**, **orange**, or **green** to guide you toward the correct stratagem.

## Features

* **Stratagem Guessing Gameplay** – Inspired by Wordle and Loldle, themed around Helldivers 2.
* **Multi-Category Clues** – Feedback given across:

  * Department
  * Type
  * Arrows (number of arrow inputs)
  * Level
  * Cooldown
  * Call-in Time
  * Traits
* 🟥🟧🟩 **Color Feedback System**:

  * **Green** – Exact match.
  * **Orange** – Partial or close match.
  * **Red** – Incorrect category.

## How to Play

1. Enter a stratagem guess.
2. Receive feedback with colored indicators across all categories.
3. Use the hints to narrow down the correct stratagem.
4. Master Helldiver knowledge to win!

HTML / CSS / JavaScript (Vanilla, no frameworks)

Adding New Items

To add a new item:

{
        name: "Stratagem name",
        department: "department name",
        type: "stratagem type",
        arrows: "1",
        level: "1",
        cooldown: "100",
        calltime: "1.0",
        traits: ["Trait1", "Trait2", "Trait3"],
        img: "images/defense/Image_Name.webp"
    },
    
Add this to the stratagems dictionary, include the appropriate image path.

## Credits

Created by Moukie
Inspired by Loldle & Wordle
Assets © Arrowhead Game Studios
