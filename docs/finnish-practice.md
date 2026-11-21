# Näyttö feature — Finnish in Context

## Customer answers

The feature helps people moving to Finland recognize colloquial Finnish through
short, humorous fill-in-the-blank exercises. It is open to all ages and should
work on iOS, Android, and desktop browsers. Practice is individual and available
offline after an initial online visit. The approved vocabulary is `paska`,
`saatana`, `helvetti`, and `perkele` with their inflected forms. Exclude
genital terms and keep scenarios focused on objects or situations.

## Stories and acceptance criteria

| Story | Given | When | Then | Estimate |
| --- | --- | --- | --- | ---: |
| As a newcomer, I want a short Finnish dialogue so I can understand the situation | I open practice | The first question loads | I see a Finnish dialogue, three forms, and context in English | 2 h |
| As a learner, I want to check an answer so I can learn why that form fits | A question is open | I submit a form | The app identifies the correct form and explains it in English | 3 h |
| As a learner, I want examples across the approved vocabulary so I can recognize different forms | I practice the lesson | I finish the last question | I have encountered all four words and see my score | 3 h |
| As a commuter, I want an offline lesson so I can practise without data | The page confirms offline availability | I disconnect and reopen it | The full lesson loads and works | 4 h |
| As a mobile learner, I want the same lesson on my phone so I can practise away from a computer | I have a modern iOS or Android browser | I open the practice URL | The layout fits the screen and all answers can be tapped | 2 h |
| As an independent learner, I want to control my session so I can practise repeatedly | I reach the result | I select Practise again | The lesson restarts at zero without an account or chat | 2 h |

Individual preliminary estimate is 16 hours. Teacher review and device
verification remain open.

## Design and lifecycle

Build a linked practice area with local question data, browser-side scoring,
and a service worker scoped to `/practice/`. The browser can install the web
app where supported. The first visit caches only public lesson assets. Scoring
needs no server action, database migration, API change, or account. Update the
service worker cache version when changing its assets and verify an offline
reload in preview before release.

Kotus describes how Finnish swear words function as interjections and
intensifiers. The exercises use original examples and include the register
in the feedback. [Kotus, Kirosanojen kielioppia](https://kotus.fi/kolumni/kirosanojen-kielioppia/)
