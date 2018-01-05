# groovebase
A live-music experience tracker that allows you to keep track of the artists you've seen, the setlists you've witnessed and the venues you've visited.

## Inspiration
I am a huge fan of live music - concerts, festivals, bar performances, karaoke - the list goes on and on. I wanted to create an application where you can track all of the live performances you've seen, including the individual setlists, while providing you some insight into shows you've seen, artists you've tracked and venues you've visited.

## Technologies Used
grooveBase is a full-stack single page application. I used various front-end and back-end technologies while utilizing three APIs to bring the app to life.
### Front-End
* React
* Redux
* React-Redux
* HTML5/CSS

### Back-End
* Express
* PostgreSQL

### APIs
* Setlist.fm
  * A crowd-sourced setlist database. I used this API in constructing the setlist search function and when rendering the individual show's corresponding setlists.
* Bandsintown
  * Bandsintown is an application that tracks artists touring schedules and provides details on how to get tickets. I utilized this API in creating the 'See This Artist Again' feature which shows you upcoming shows for artsits you have tracked on grooveBase.
* Last.fm
  * Last.fm is a music information database. I utilized this API to display each artist's top albums when you navigate to the single-artist page.
