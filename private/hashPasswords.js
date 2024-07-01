const bcrypt = require('bcrypt');
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' }
];

const saltRounds = 10;
users.forEach(user => {
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err) throw err;
        console.log(`{ username: '${user.username}', password: '${hash}' }`);
    });
});
