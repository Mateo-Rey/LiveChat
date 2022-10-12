import React from "react";
import { ImBoxAdd } from "react-icons/im";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function Register() {
  const [err, setErr] = useState();
  const [user, setUser] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        return setUser(userCredential.user);
        // ...
      })
      .catch((err) => setErr(err));
  };
  const storage = getStorage();
  const storageRef = ref(storage, `images/${user}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        {err && <span>There has been an error: {err}</span>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <ImBoxAdd />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
}

export default Register;
