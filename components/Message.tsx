import { DocumentData } from "firebase/firestore";
import Image from "next/image"; // Añade esta línea

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#43454]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <Image
          src={message.user.avatar}
          alt="User Avatar"
          width={32}
          height={32}
        />{" "}
        {/* Modifica esta línea */}
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
