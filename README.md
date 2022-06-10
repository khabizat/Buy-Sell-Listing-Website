Buy/Sell Listing Website
=========

## Shoestagram

The following project is an app where you can put shoes up for sale. As a user you can purchase or post shoes to sell for the app. 
If you choose to sell, make sure to set the price.This lets buyers find the items within their budget quickly, and easily contact sellers.

### Features

#### Users:

-Can see featured shoes on main feed

-Can filter shoes by price

-Add favourite shoes to check up on them later

-Send messages to the user that is listing the shoe

### Admins:

-Post items, which can be seen by others

-Remove items from the site

-Mark items as SOLD!,

-Send a message via app,  on negotiations in buying the said shoe


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples. 
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Sass 1.3x 
- Morgan 1.9x
- Express 1.9x
- Ejs 2.6x
- Dotenv 2.0x
- Cookie Session 2.0x
- Chalk 1.4x
- Body Parser 1.2x
- Bcryptjs 2.4x
 