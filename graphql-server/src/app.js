const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');


const schema = buildSchema(`
    type MenuItem {
        name: String
        cookBook: String
    }

    type Query {
        menuItems(name: String): [ MenuItem ]
        pickItem: MenuItem
    }
`);

const menuData = [
    {
        name: "Mac & Cheese",
        cookBook: "None"
    },
    {
        name: "Hamburgers",
        cookBook: "Betty Crocker"
    },
    {
        name: "Steak",
        cookBook: "How to Grill"
    },
]

const root = { 
    menuItems: ({name}) => {
        if (name) {
            return menuData.filter((x) => x.name.includes(name));
        } else {
            return menuData 
        }
    },
    pickItem: () => menuData[getRandomInt(menuData.length)]
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
var app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = app;
