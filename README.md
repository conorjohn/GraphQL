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

at the end of the course, you can use the relay input object mutations and can test this by using the query variables field in graphiql, here is a sample qquery/mutation

mutation AddVideoQuery($input: AddVideoInput!){
  createVideo(input: $input){
    video{
      title
    }
  }
}

then include your query variable
{
  "input":{
    "title": "Video Title",
    "duration":300,
    "released":false,
    "clientMutationId": "abcd"
  }
}
run these two snippets

then run this afterwards to test

query AllVideosQuery{
  videos{
    edges{
      node{
        title
      }
    }
  }
}

" 
