"use strict";
function filteredUsers(user) {
    return user.filter((x) => x.age >= 18);
}
console.log(filteredUsers([
    {
        firstName: "Rythem",
        lastName: "Goyal",
        age: 20,
    },
]));
