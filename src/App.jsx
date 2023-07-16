import React, { useEffect, useState } from "react";
import "./eat-split.css";
// import "./app.css";
// import PackagingList from "./components/PackagingList";
// import Stats from "./components/Stats";
// import Logo from "./components/Logo";
// import Form from "./components/Form";

// const App = () => {
//   const initialItems = [
//     { id: 1, description: "Passports", quantity: 2, packed: false },
//     { id: 2, description: "Socks", quantity: 3, packed: true },
//     { id: 3, description: "Knife", quantity: 5, packed: false },
//     { id: 4, description: "Underwear", quantity: 1, packed: true },
//   ];
//   const [items, setItems] = useState(initialItems);
//   const [description, setDescription] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!description) return;
//     setItems((prev) => [
//       ...prev,
//       { quantity, description, id: Date.now(), packed: false },
//     ]);
//     setDescription("");
//     setQuantity(0);
//   }

//   function editItem(id) {
//     setItems(items.map((i) => (i.id == id ? { ...i, packed: !i.packed } : i)));
//   }
//   function deleteItem(id) {
//     setItems(items.filter((i) => i.id !== id));
//   }

//   return (
//     <div className="app">
//       <Logo />
//       <Form
//         setDescription={(desc) => setDescription(desc)}
//         handleSubmit={handleSubmit}
//         setQuantity={(q) => setQuantity(q)}
//         setItems={(i) => setItems(i)}
//         quantity={quantity}
//         description={description}
//       />
//       <PackagingList
//         items={items}
//         deleteItem={deleteItem}
//         editItem={editItem}
//       />
//       <Stats />
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <>
//       <TipCalculator />
//     </>
//   );
// };

// function TipCalculator() {
//   const [bill, setBill] = useState(0);
//   const [firstTip, setFirstTip] = useState("");
//   const [secondTip, setSecondTip] = useState("");
//   const total = firstTip + secondTip;
//   console.log(bill);

//   return (
//     <>
//       <Bill bill={bill} setBill={setBill}>
//         How much was the bill
//       </Bill>
//       <Rating totalTip={firstTip} setTotalTip={setFirstTip}>
//         <span>How much you like the service?</span>
//       </Rating>
//       <Rating totalTip={secondTip} setTotalTip={setSecondTip}>
//         <span>How much your friend like the service?</span>
//       </Rating>
//       <Total bill={bill} total={total} />
//       <Button
//         setFirstTip={setFirstTip}
//         setBill={setBill}
//         setSecondTip={setSecondTip}
//       >
//         Reset
//       </Button>
//     </>
//   );
// }
// function Bill({ bill, setBill, children }) {
//   return (
//     <>
//       <span>children</span>
//       <input
//         type="text"
//         value={bill}
//         onChange={(e) => setBill(+e.target.value)}
//       />
//       <br />
//     </>
//   );
// }

// function Rating({ children, totalTip, setTotalTip }) {
//   return (
//     <>
//       {children}
//       <select
//         name=""
//         id=""
//         onChange={(e) => setTotalTip(+e.target.value)}
//         value={totalTip}
//       >
//         <option value="0">Dissatisfied 0%</option>
//         <option value="5">Okay 5%</option>
//         <option value="10">Nice 10%</option>
//         <option value="20">Awesome 20%</option>
//       </select>
//       <br />
//     </>
//   );
// }

// function Total({ bill, total }) {
//   return (
//     <>
//       <h2>
//         You pay {bill + (bill * (total / 2)) / 100} ₹{" "}
//         {bill !== 0 && (
//           <span>
//             ( {bill} + {(bill * (total / 2)) / 100} ₹ tip )
//           </span>
//         )}
//       </h2>
//       <br />
//       {/* */}
//     </>
//   );
// }

// function Button({ children, setBill, setFirstTip, setSecondTip }) {
//   function clear() {
//     setBill(0);
//     setFirstTip(0);
//     setSecondTip(0);
//   }
//   return <button onClick={() => clear()}>{children}</button>;
// }

// ----------------------------------------> EAT AND SPLIT <-----------------------------

function App() {
  return (
    <>
      <EatAndSplit />
    </>
  );
}

function EatAndSplit() {
  const initialFriends = [
    {
      id: 122,
      name: "pratik",
      image: "",
      balance: -5,
    },
    {
      id: 123,
      name: "shanu",
      image: "",
      balance: 5,
    },
    {
      id: 124,
      name: "srijan",
      image: "",
      balance: 8,
    },
    {
      id: 125,
      name: "Mahendra",
      image: "",
      balance: -100,
    },
  ];
  const [friends, setFriends] = useState([...initialFriends]);
  const [userData, setUserData] = useState(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  function splitUserBill(newBalance) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === userData.id
          ? { ...friend, balance: friend.balance + newBalance }
          : friend
      )
    );
    setUserData(null);
  }
  function sendUserData(data) {
    setUserData((prev) => (prev?.id === data.id ? null : data));
    setShowAddMenu(false);
  }
  function handleShowAddMenu() {
    setShowAddMenu((prev) => !prev);
  }
  function addNewFriend(newFriend) {
    setFriends([...friends, newFriend]);
    setShowAddMenu(false);
  }

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendList
            friends={friends}
            userData={userData}
            sendUserData={sendUserData}
          />
          {showAddMenu && <AddFriend addNewFriend={addNewFriend} />}
          <Button onClick={handleShowAddMenu}>
            {showAddMenu ? "Close" : "Add Friend"}
          </Button>
        </div>
        {userData && (
          <SplitBill
            key={userData.id}
            splitUserBill={splitUserBill}
            userData={userData}
          />
        )}
      </div>
    </>
  );
}

function FriendList({ friends, sendUserData, userData }) {
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            sendUserData={sendUserData}
            userData={userData}
          />
        ))}
      </ul>
    </>
  );
}

function Friend({ friend, sendUserData, userData }) {
  const mark = friend.id === userData?.id;
  return (
    <li className={mark ? `selected` : ""}>
      <image src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 ? (
        <p className="green">
          your friend {friend.name} owes you {friend.balance}
        </p>
      ) : friend.balance < 0 ? (
        <p className="red">
          {" "}
          you owes {friend.name} {Math.abs(friend.balance)}{" "}
        </p>
      ) : (
        <p> you and your friend are even</p>
      )}

      <Button onClick={() => sendUserData(friend)}>
        {mark ? "close" : "select"}
      </Button>
    </li>
  );
}

function SplitBill({ splitUserBill, userData }) {
  const [billValue, setBillValue] = useState(null);
  const [expense, setExpense] = useState(null);
  const [pay, setPay] = useState("you");

  function handleSubmit(e) {
    e.preventDefault();
    if (!pay || !billValue) return;
    const newBalance = pay === "you" ? billValue - expense : -expense;
    splitUserBill(newBalance);
    setBillValue(null);
    setExpense(null);
    setPay("you");
  }
  return (
    <>
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split Bill with {userData.name}</h2>
        <label>💵Bill Value</label>
        <input
          type="number"
          onChange={(e) => setBillValue(+e.target.value)}
          value={billValue ? billValue : ""}
        />
        <label>🍕 Your Expense</label>
        <input
          type="number"
          onChange={(e) =>
            setExpense(+e.target.value > billValue ? expense : +e.target.value)
          }
          value={expense ? expense : ""}
        />
        <label>👨‍👧{userData.name} expense</label>
        <input
          type="number"
          value={billValue ? billValue - expense : ""}
          disabled={true}
        />
        <label> 🩸 Who is paying the bill?</label>
        <select onChange={(e) => setPay(e.target.value)}>
          <option value="you">You</option>
          <option value="friend">{userData.name}</option>
        </select>

        <Button>Split Bill</Button>
      </form>
    </>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function AddFriend({ addNewFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    if (!name || !image) return;
    e.preventDefault();
    const newFriend = { id: crypto.randomUUID(), name, image, balance: 0 };
    addNewFriend(newFriend);
    setName("");
    setImage("");
  }
  return (
    <form action="" className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor=""> 👧Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="">🦋Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

export default App;
