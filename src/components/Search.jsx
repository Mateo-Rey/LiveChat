import React from "react";
import { useState } from "react";
import {
  collection,
  getDoc,
  query,
  serverTimestamp,
  setDoc,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const currentUser = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", `${username}`)
    );
    try {
      const querySnapshot = await getDoc(q);

      querySnapshot.forEach((doc) => setUser(doc.data()));
    } catch (err) {
      return setErr(err);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId, { messages: [] }));

        await updateDoc(
          doc(db, "userChats", user.uid, {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId+".date"]: serverTimestamp()
          })
        );
      }
    } catch (err) {
      return setErr(err);
    }
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Find a user"
        />
      </div>
      {err && <span>Something went wrong: {err.message}</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="user" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
