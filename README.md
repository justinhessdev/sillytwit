# Sillytwit
## Filter through silly twitter reviews

## Instructions:

1. Clone the Repo: [https://github.com/justinhessdev/sillytwit](https://github.com/justinhessdev/sillytwit "Sillytwit")

2. Locate project in terminal and run:
		
		npm run dev
		
Now Sillytwit is up and running live on **localhost:8080**

Check it out!		
	
________________________

**Note**

The command 
	
	npm run dev
	
works with live reload by webpack dev server on **localhost:8080** because:	

##### In package.json we add the following script: 

	"dev": "webpack-dev-server --content-base src --inline --hot"
	
________________________


## App Walkthrough

###### Screenshot
![Alt text](./src/img/sillytwit.png?raw=true "Sillytwit Screenshot")

The app, as shown above, is comprised of **React** components:

1. Keyword Component 
2. Rating Component
3. ReviewList Component
4. Total Component
5. Layout Component

-- Total Component is rendered within the ReviewList Component

-- Layout Component renders all other components

In my **client.js** I render my Layout component to the DOM:
	
	const app = document.getElementById('app')
	ReactDOM.render(<Layout/>, app)
	
and **app** is the main element located in **index.html** where all the **React** magic happens:

	<div id="app"></div>
	
**Random account info:**
	
###### Appfigures account: Justinhessdev@gmail.com
 
###### Client Key: e6be4344104e4d6f95d5cfb3fa23a32f

