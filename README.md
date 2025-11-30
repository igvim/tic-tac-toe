# tic-tac-toe

Major takeaways from project:

- I thought it would be clever to use `switch` for the core logic of the game, but that fell through (get it? the problem was fall-through). `switch` is not good when you want to check every `case` _and_ do something independent in each.
- I created a "status object" to communicate between the game controller and the DOM - it just contained the text of the last cell played, and a status message to indicate a win or a tie. Felt like the best way to ensure the DOM didn't need to know about game state directly, but also feels easy to forget that this is a return value of the main `turn` function. In the future I might create a status object more explicitly and have the DOM ask for it directly.
