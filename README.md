"# GraphQL
After downloading, run npm install 

Run project by navigationg to the root directory and run 'node index.js'

Go to http://localhost:3000/graphql to launch graphiql

structure your query as 
{
videos{
	title
}
}
for a result of the titles of the stored videos 

this is how you use the node relay
{
  node (id: "VmlkZW86YQ==") {
    ... on Video {
      title
    }
  }
}

after converting graphql list type to a relay connection type, this is the sort of query you need to run 

{
	videos(first: 1) {
    edges{
      node{
        title
      }
    }
  }
}

" 
