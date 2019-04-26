
/*
    Here we "simulate" a database with in-memory Map.
    Furthermore, we do not deal with the "proper" handling of
    passwords. Passwords should NEVER be saved in plain text,
    but rather hashed with secure algorithms like BCrypt.
 */

const users = new Map();
const messages = [];
const friends = new Map();
const messageCounter = null;

//FUNCTION ORIGINAL CODE
function addTestUsers () {
    const user1 = createUser("jon", "doe", "oslo", "16 - 3 - 1994", "123");
    const user2 = createUser("jane", "doe", "bergen", "14 - 02 - 1995", "123" );
    users.set(user1.id, user1);
    users.set(user2.id, user2);
}

function getUser(id){

    return users.get(id);
}

function verifyUser(id, password){

    const user = getUser(id);

    if(user === undefined){
        return false;
    }

    /*
        WARNING: remember that those passwords should be hashed,
        with salt and pepper...
        But we are not dealing with backend details
        in this course, like secure storage of passwords
     */
    return user.password === password;
}

function createUser(id, surname, hometown, dateOfBirth, password){

    if(getUser(id) !== undefined ){
        return false;
    }

    const user = {
        id: id,
        surname: surname,
        hometown: hometown,
        dateOfBirth: dateOfBirth,
        postCount: null,
        password: password
    };

    users.set(id, user);
    return true;
}

function createPost(userId, text){
    const post = {

    }
}

function createFriends(senderId, recieverId) {
    const friends = {
        userId1: senderId,
        userId2: recieverId,
        friends: false
    }
}

module.exports = {addTestUsers, getUser, verifyUser, createUser};
