"use client";
// Desc: Sidebar component
import { collection, orderBy, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import NewChatBtn from "./NewChatBtn";
import ChatRow from "./ChatRow";

function SideBar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  console.log(chats);
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/*New Chat btn*/}
          <NewChatBtn />

          <div>{/* Model Selection */}</div>

          {/* Map throught ChatRows  */}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>

      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="profile pic"
          className="rounded-full h-12 w-12 cursor-pointer mb-2 mx-auto hover:opacity-50"
        />
      )}
    </div>
  );
}

export default SideBar;
