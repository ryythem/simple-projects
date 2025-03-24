interface User {
  firstName: string;
  lastName: string;
  age: number;
}

function filteredUsers(user: User[]) {
  return user.filter((x) => x.age >= 18);
}

console.log(
  filteredUsers([
    {
      firstName: "Rythem",
      lastName: "Goyal",
      age: 20,
    },
  ])
);
