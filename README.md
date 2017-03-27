# Such Issues Wow
### An awesomely simple git repository browser

### Specification
Build a simple interactive UI to display a list of a user-specified arbitrary organization's Github projects ranked by any meaningful metric you'd like, and allow the user to browse recent commits on that project.

### Up and Running!
This project was built without npm, yarn, or any type of framework. This is delicious vanilla JS with some jQuery sprinkles for helping helpfulness.

To get going, simply load `index.html` in your favorite browser.

### Testing

No test suite is included with this project.

To run manual tests you can do the following:

##### Searching for an Organization

* Search for an organization that is private, .e.g. `TheCognizantFoundry` and watch for an error message.
* Search for a nonexistent organization, e.g. `doge` and watch for an error message.
* Search for an organization that is public, e.g. `airbnb` and watch the list of repositories populate. Repos with the largest amount of open issues are at the top of the list.

##### Viewing Commit History for a Repository

* A repository without commits will render a modal with a message that there are no commits to view.
* A repository with a commit history will render a modal with the most recent commits with some details on those commits.

### Here is a Shiba Inu GIF
Just because.

![](https://media.giphy.com/media/8PCSupMBgXDm8/giphy.gif)
