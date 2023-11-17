# react-project

> 💡 feel free to create a personal branch of this guide to add your own notes

Recommended schedule for this session:

| duration | content         |
| -------- | --------------- |
| 9:59     | Session         |
| 9:59     | Active Learning |
| 9:59     | Recap           |

## Project Idea

Music Search App

User Stories

- [x] Render fixed list of Album from json list
- [x] Display list of songs for each Album (toggle detail view)
- [x] fetch "featured" list of albums from proxy api
- [x] add search form for albums provided by proxy api
- [x] create favorite list of albums
- [x] add navigation with 2 views: search and saved albums
- [ ] persist the favorites list with localstorage
- [ ] Advanced: Add "more" button / lazy loading in search page
- [ ] Advanced: create one playlist "favorite songs" and new view + new navigation item + "add to favorite songs" button in songlist
- [ ] Advanced: create playlist and let user choose to add songs into different playlist with the "add song" button

## Custom API

- `/featured?raw=true`: a list of 20 Albums
- `/albums?query=lorem123&page=1&raw=true`: a list of found albums
