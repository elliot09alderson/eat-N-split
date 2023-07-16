const data = {
  Title: "Guardians of the Galaxy Vol. 2",
  Year: "2017",
  Rated: "PG-13",
  Released: "05 May 2017",
  Runtime: "136 min",
  Genre: "Action, Adventure, Comedy",
  Director: "James Gunn",
  Writer: "James Gunn, Dan Abnett, Andy Lanning",
  Actors: "Chris Pratt, Zoe Saldana, Dave Bautista",
};

// const { Title, Year, Actors } = data;
// console.log(Title);

// const arr = Array.from({ length: 20 }, (_, i) => i + 1);
// _____________SPREAD ________________
// const myData = { ...data };
// const myARr = [...arr];

// console.log(myARr);

// console.log(myData);

// Arrow Function

const myArgs = [
  {
    name: "pratik",
    class: "xyz",
    age: 56,
    profession: "Engineer",
  },
  {
    name: "shanu",
    class: "abc",
    age: 34,
    profession: "Civil Engineer",
  },
  {
    name: "srijan",
    class: "abc",
    age: 12,
    profession: "engineer",
  },
  {
    name: "pratik",
    class: "xyz",
    age: 89,
    profession: "Doctor",
  },
];

const myData = myArgs.reduce((acc, curr, idx) => acc + curr.age, 0);
console.log(myData);

// const Below30 = myArgs.filter((item) => item.profession === "Engineer" );
// console.log(Below30);

// .filter((data) => data.profession === "engineer");
// console.log(myData);

// const [p, second, x] = myArgs;

// console.log(second);

// ############# HOC ############

// function traditional(a, b, ...abc) {
//   const { Title } = { ...abc };
//   console.log(Title);
//   return a + b;
// }
// traditional(4, 5, data);

// const getData = (a, b) => {
//   return a + b;
// };

// this keyword is not used YESSS!!!
// const getSecondData = (a, b) => a + b;
