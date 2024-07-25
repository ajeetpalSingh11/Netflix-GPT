import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./redux/userSlice";
import { auth} from './utils/firebase';
import Login from "./components/Login";
import Browse from "./components/Browse";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(addUser({uid : user.uid, email : user.email, displayName: user.displayName, photoURL : user.photoURL}))
        // ...
      } else {
        // User is signed out
        dispatch(removeUser())
      }
    });
  }, []);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
