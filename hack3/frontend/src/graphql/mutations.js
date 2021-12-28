import { gql } from "@apollo/client";

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: ID!, $status: Status!) {
    updateTask(id: $id, status: $status) {
      id
      title
      content
      dueDate
      status
    }
  }
`;

// TODO 4.1 Create Task Mutation.
// Uncomment the following lines and fill the gql part
export const CREATE_TASK_MUTATION = gql`  
mutation createTask(
  # $input: CreateTaskInput!,
  $id: ID!, 
  $title: String!, 
  $content: String!, 
  $dueDate: Date!, 
  $status: Status!
) {
  createTask(
    input:{
      id: $id
      title: $title, 
      content: $content, 
      dueDate: $date, 
      status: $status
    }
  ){
    id
    title
    content
    dueDate
    status
  }
}
`;

// mutation createPost(
//   $title: String!
//   $body: String!
//   $published: Boolean!
//   $authorId: ID!
// ) {
//   createPost(
//     data: {
//       title: $title
//       body: $body
//       published: $published
//       author: $authorId
//     }
//   ) {
//     title
//     body
//     author {
//       name
//     }
//     published
//   }
// }

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
