# [BonVon](https://Jake123otte1.github.io/BonVon)

## Overview

BonVon is a simple one-page web application that provides flight information for air travellers. BonVon works with the Flightera API to deliver relevant information about flights to users.

## Technologies
BonVon is lightweight, only using base HTML, CSS, and JavaScript fetching to query APIs. No other libraries or packages were used for this project.

## Dev Retrospective
BonVon functions alright, but it suffers from a lack of consistent usability. This is the fault of using two indepent APIs. Unfortunately, it is difficult to find one free API that will provide all of the information to make BonVon work. This results in some errors for flights that certainly exist, and may even appear on the Top 10 tracked leaderboard.

In the future, I will likely spend more time researching API data schema before I commit to a model of user interaction.

BonVon's code is also... messy. I am not by any means a CSS savant, but there is a clear lack of structure and clarity with the HTML and CSS within the project. Everything works for most individuals and setups, but there are test cases where it does not.

In the future, I am going to focus much more on simple website setup concepts. I don't want to be spending all my time on CSS and HTML. Moving forward, I will likely be using pre-constructed frameworks more often to focus on implementing other more unique technologies.

The JavaScript is also quite bloated. The primary factor in this is the sheer amount of document element references and reassignments. They are not handled very elegantly. This can probably be better addressed by using React.js, which I plan on using for projects in the future.

Overall, not terrible. It _is_ a finished project, I guess. But there is plenty of room for shape-ups under the hood.

## Future Plans
I doubt there will be any significant updates to BonVon. The functionality is fundamentally limited by the quality of free aircraft information APIs. The only thing to do would be to clean up the website's CSS and JavaScript, but I am not sure that is worth it beyond a practice exercise.

Bon Voyage, BonVon.
