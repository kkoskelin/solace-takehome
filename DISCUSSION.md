# Discussion

Here are some items I'd pursue further:

- style with tailwind for mobile-first
- revise `page.tsx` to send searchTerm as a query parameter to the `GET /advocates` endpoint
  - revise `route.ts` to receive search term from query string and apply it to WHERE predicate
- do not render the search results table unless the searchTerm is defined and search results size > 0
- render 'no results found' for search terms with no matches instead of an empty results table
- create migration to change phoneNumber to be stored as a string (add column, update, remove column)
  - update Typescript schema for the `Advocate` type to reflect this change
- format phone numbers as `<a href="tel:##########">###-###-####</a>`
- identify most common query patterns to determine which columns ought to be indexed

Speculative, if database were particularly large:

- consider setting a LIMIT on number of results returned, with an option for paging or requesting more refined search terms
- offer separate query terms for each of last name, first name, city, degree, specialties, years of experience
  - offer these as text input, drop-down menus, or number inputs

Additional desires:

- add `jest` or `vite` testing framework, generate coverage reports
- extract simple typescript functions to their own files so they can be unit-tested
- keep clean boundaries and manage dependencies wrt fetch functions and state setters
- do not seed database using a `POST` request
- add eslint rules, prettier rules
- add playwright testing suite
- configure unit tests and E2E tests in Github Actions
