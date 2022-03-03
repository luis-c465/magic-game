# Magic game

A game for the terra hackathon in the coding club

## Playing

<!-- TODO: Add instructions here of how to play -->

Go to [https://luis-c465.github.io/magic-game/](https://luis-c465.github.io/magic-game/)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Git](https://git-scm.com/download/win)

## Installing magic game

To install magic game, follow these steps:

<!-- Linux and macOS: -->

Enter the following command in the terminal

```bash
git clone https://github.com/luis-c465/magic-game.git
```

<!-- Windows:

```cmd
git clone https://github.com/luis-c465/magic-game.git
``` -->

## Using magic game

### Hosting

To use magic game loccaly you need to start a localhost server

Bellow are multiple options of how to start one

#### Python

First install [Python](https://www.python.org/downloads/) if you have not done so already

1. Enter the following command in the terminal

   ```bash
   python3 -m http.server
   ```

   It will then give an output similar to

   ```bash
   Serving HTTP on :: port 8000 (http://[::]:8000/) ...
   ```

2. Open the link shown in parentheses in youir browser

   In this example it would be `http://[::]:8000/`

---

#### Visual Studio Code extension (live server)

First install [Visual Studio Code](https://code.visualstudio.com/download) if you have not done so already

1. Open magic game folder in Visual Studio Code

2. Install the extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

3. After installing the extension click the `Go Live` button at the bottom right of the screen

## Idea

Endless game where the player fights off increasingly harder tanks on preset levels blocks with random tank amounts. After defeating all the tanks in that wave the player can upgrade his wand and move to the next wave in a different map.

## Player

A tank with various magic wands that can be switched between with the number keys

### Pixel art ideas

![](https://image.shutterstock.com/image-illustration/pixel-art-magic-staff-icons-260nw-1845902590.jpg)

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbn0Z8lgoHUr9MSrwKCUpV-oJL5gJ5PLySIw&usqp=CAU)

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhHfR3YcznYJEYlgPxrx5XTLPB1EULydLJKQ&usqp=CAU)

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTotqxbAi3Wu98LWxdjEg-dzrWcAM_VS_0EnQ&usqp=CAU)

### Ice wand

Slows down bullets and reduces their damage

### Fire wand

Speeds up bullets and increases their damage

### Jelly wand

Slows down enemies and reduces bullet damage to 1

### Portal gun

Shoots portals at any valid wall
Sends bullets from any portal to the other

### Broken wand

Applies the effects of up to 3 non portal guns simultaneously

### Spread wand

Transforms a bullet into many small ones which go out in a short shotgun cone from the player

### Kaboom wand

- Transforms a bullet into a slow moving bomb that explodes on contact with a bullet, player, or enemy

### Transform wand

- Transform into that tank for 1.5 seconds with better stats

## Tanks

### Pixel art ideas

![](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/baa79985-4b05-412f-a3c8-4729d846e8e8/d5lvqz2-8bcd7f20-7cff-43e1-a750-010248ca1b78.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JhYTc5OTg1LTRiMDUtNDEyZi1hM2M4LTQ3MjlkODQ2ZThlOFwvZDVsdnF6Mi04YmNkN2YyMC03Y2ZmLTQzZTEtYTc1MC0wMTAyNDhjYTFiNzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.934B4n5OsdUihGUCfs9JzwlUIwWfFt0wCc1f4XLqp0Q)

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4RpievNPpR3Ub9o2Tim2fhGQ8CVpcQEy5bMMxokjBFJfAUNtbEO5bz9cRJ3WOZNRYTnQ&usqp=CAU)

### Broken tank

- Fires 1 bullet every second in a +- 15 degrees in the direction toward the player

### Machine gun

- Fires 5 bullets per second and does not move

### Rail gun tank

- Fires through walls breaking them toward the player

### Wizard tank

- Wears a magic hat
- Buffs closest tank which changes all their bullets into that type of magic
  Usually protected by other tanks

### Tank tank

- Tank with a tank hat
- Takes multiple bullets to destroy

### Creeper tank

- Moves toward the player very quickly and explodes
