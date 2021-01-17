# Contributing LeagueOfApi

A big welcome and thank you for considering contributing to LeagueOfApi open source projects! It’s people like you that make it a reality for users in our community.

Reading and following these guidelines will help us make the contribution process easy and effective for everyone involved. It also communicates that you agree to respect the time of the developers managing and developing these open source projects. In return, we will reciprocate that respect by addressing your issue, assessing changes, and helping you finalize your pull requests.

Please feel free to submit pull requests or open issues to improve the champions in the project.

Again be sure to follow the following guidelines to get started!
# Contributing guidelines

## Acceptable Contributions

### Pull Requests

LeagueOfApi only accept pull requests that:

* Fixes bugs for existing functions
* Enhances the API or implementation of an existing function
* Adding more tests for optimal user experience

In the case of adding a new function:

* Document where the original source came from
* Document the path where the function is exported

PRs to our libraries are always welcome and can be a quick way to get your fix or improvement for the next release. In general, PRs should:

* Only fix/add the functionalities.
* Add unit or integration tests for fixed or changed functionality.
* Always include documentation in the repo.

For changes that address core functionality or would require breaking changes, it's best to open an Issue to discuss your proposal first. This is not required but can save time creating and reviewing changes.

* Fork the repository to your own Github account
* Clone the project to your computer
* Create a branch locally with a descriptive name
* Commit changes to the branch
* Push changes to your fork
* Open a PR in our repository
## Code of Conduct

Please read this before starting on your new implementations. We have set some basic rules so that everyone can get along. [Code of Conduct - LeagueOfApi](https://github.com/cemilkeskin/LeagueOfAPIs/blob/main/CODE-OF-CONDUCT.md)
## Report bugs

* Open a ticket on github, with a bug tag
* Set application to VERBOSE in your .env file
* Include your Error logs
* Explain the setup
* include the following:

```
OS: 
Docker version: 
Global npms: 
npm version: 
```

examples, of good and bad requests

good: Getting error "" when trying to call endopoint
what data sending

Bad: endpoint does not work
## Suggest new features

* Open a feature request on github with a "enhancement" label
* Declare why usefull

## Guidelines for development

1. Fork the repo
1. Clone your fork
1. Create a branch ex. when creating a feature create a feature branch.
1. Open terminal and navigate to the `api` folder using the command: `cd api`
1. Install all dependencies with the following command: `npm install`
1. After successfully installing all dependencies and packages, simply write `npm start` to start your server
1. Build container by opening a new terminal in your console and writing: `docker-compose build`
1. To get all the tables up and running simply write the command: `docker-compose up` to the new terminal we just opened.
1. Now that you have all your terminals running, you can test it out on your desired browser by writing: `localhost:3001/`
1. After implementing your own code be sure to test it out before sending it to the repo by writing `npm run test` in the terminal
1. If you do not have any errors when testing it out, create a new branch
1. If things are working for you, add your changes with `git add.`
1. Commit your changes with `git commit -m "<your message>"`
1. Push your changes to your fork with `git push`
1. Create a pull request.
1. Iterate on the solution.
1. Finally merge your commit!


Global variables are open to use like:

`app`, `DatabaseHelper`, `Helpers`, `pg`

### (logging)

```
if(process.env.VERBOSE >= 2) {
  console.log()
}
```

expected log levels:
| verbose level | code |
| --- | --- |
| 2 | console.log |
| 1 | console.warn |
| 0 | console.error |

## Roadmap and vision

I invision that this porject would expand and create a community where people would use this project on a daily basis to help them at their daily tasks.

## Get in touch

If you wish to contact the creator, send an email to: cemil.keskin@student.ehb.be
Follow my projects on GitHub: https://github.com/cemilkeskin