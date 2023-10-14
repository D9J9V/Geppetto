"use client";
import { collection, orderBy, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import NewChatBtn from "./NewChatBtn";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import Image from "next/image"; // Añade esta línea

function SideBar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/*New Chat btn*/}
          <NewChatBtn />

          <div className="hidden sm:inline">
            <ModelSelection />
          </div>

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animating-pulse text-center text-white">
                <p>Loading Chats ...</p>
              </div>
            )}

            {/* Map throught ChatRows  */}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {session && (
        <div
          className="rounded-full h-12 w-12 cursor-pointer mb-2 mx-auto hover:opacity-50"
          onClick={() => signOut()}
        >
          <Image
            src={session.user?.image!}
            alt="profile pic"
            width={48}
            height={48}
            layout="fixed"
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
}

export default SideBar;
