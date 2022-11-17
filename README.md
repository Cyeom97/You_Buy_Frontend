# You_Buy_Frontend

Created By: Kathya Castaneda, Sarah Duperoux, Christopher Yeom, Justin Junious

![ScreenShot](client/src/Images/Screenshot%202022-11-17%20at%2011.07.09%20AM.png)

### **_Description_**

You Buy, not to be confused with Ebay. We are building an application reminiscint of Ebay but closer to craigslist. With this application you will have the ability to create a user and log in. View potential items for sale and sell items yourself.

You will also be able to create a wishlist of items you would like to purchase. Unlike EBAY you can not actually purchase here. You can connect with the seller to purchase using a traditional in person experience.

### **_Technologies Used_**

- React
- Postgres
- Sequelize
- Node.js
- Express.js
- Javascript
- Html
- Css

### **_Getting Started_**

#### [Heroku Deployment]()

#### **_ERD, CHD & Trello_**

We used this diagram as a reference to understand user experience and how the database would connect/flow.
Feel free to modify this and make your own.

[Hierarchy & ERD](https://lucid.app/lucidchart/b24131d0-e5ea-44fd-9942-bcbcc9305a70/edit?beaconFlowId=EB21F93B55BEAE44&invitationId=inv_bb135fe6-5ed3-4b21-9802-d3619f1585c2&page=0_0#)

Here is a link to our [Trello Board](https://trello.com/b/Z42jcobv/youbuycom-project). This is what we used to plan out how we will build this application.

---

- `Fork` and `Clone`
- `cd client`
- `npm install` to install front-end dependencies
- `npm start` to launch the browser
- `touch .gitignore` and move the `node_modules` into the `gitignore` file

---

### How it works

Since the back-end and front-end are two different repositories. You need to deploy to Heroku transfer data from the back-end to the front-end. To actually connect the back to the front, you need to utilize `axios`.

#### How does axios work?

- import `axios` to all the `pages` files
- In the `useEffect`, use `axios.get` to read, `.put` to update, `.post` to create, `.delete` to destroy.
- The `axios` calls the back-end to recieve data

#### App.js

- The `App.js` acts as the route page to direct users where to go based on what they want to see
- It also allows functionality for users to `register`, `signin`, and `signout`

#### Api.js

Since we are using `axios`, we need to catch each request or response we send or recieve. This is where `api.js` comes into play. When you open the file, it intercepts every request `axios` makes, then reads the `token` in `localStorage`. The if statement concludes that if the `token` exists, we set the authorization header. Then we return the new `config` if the `token` exists, but if it doesn't, then return the default `config`

#### Auth.js

This file is important to store users token. In this file, we return two things, a user object and the user JWT. It allows for users to signin by comparing the token to whichever token the user is inputing.

#### Register.js

The `Register.js` simply allows users to register. It allows users to submit information to the back-end via a service function. Then it resets the form that the user completed once the request was completed. Finally it redirects the user to the login page.

#### SignIn.js

The `SignIn.js` compared the information a user has submitted. It then compares that information to the localStorage to see if there is a match. Once there is a match, the user is redirected to a protected route which is the user profile page. Protected Routes can only be accessed if a condition is met.

#### Profile.js

Once a user has successfully signin, they are redirected to their profile page. Here the user has access to adding, update, and delete a product. Users can also view any messages recieved from other users about a certain product.

#### Home.js

The `Home.js` views all products in the database. This is used by calling an axios request to the back-end. Then it stores the data into a useState. The homepage also shows categories that group the products. From the homepage, you can click on a product that transfers you to the details of that specfic product, or you can click on a category which

### **_Future Updates_**

One of the functionality we wish to add is a wishlist
