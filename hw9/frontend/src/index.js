import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.css'
import{
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import {split} from "apollo-link";
import{WebSocketLink, webSocketLink} from "apollo-link-ws";
import{getMainDefinition} from "apollo-utilities";

//create an http link;
const httpLink = new HttpLink({
  uri: "http://localhost:5500/",
});

//create a webSocket link:
const wsLink = new WebSocketLink({
  uri: "ws://localhost:5500/",
});

ReactDOM.render(
  <ApolloProvider client={ApolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
