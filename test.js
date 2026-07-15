const { faker } = require('@faker-js/faker');
const sq= require('mysql2');
const{v4:uuid}=require('uuid')
const con=sq.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password:'ru'
})

try{
con.query("show tables",(err,result)=>{
    if (err) {throw err;}
    console.log(result);
})
}catch(err){
    console.log(err);
}
//manually entering the values 
const q = `
INSERT INTO user (id, username, email, password)
VALUES (?, ?, ?, ?)
`;
const usr = [
    "7",
    "Rupesh",
    "rupesh777kap@gmail.com",
    "rupe"
];

con.query(q, usr, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);
});

//insert in bulk
let createRandomUser=()=>{
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
let data = [];
for (let i = 0; i < 100; i++) {
    let u = createRandomUser();
    data.push([u.id, u.username, u.email, u.password]);
}

q = `
INSERT INTO user (id, username, email, password)
VALUES ?
`;
con.query(q, [data], (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);
});
con.end();