import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextEditor from "../../components/TextEditor";
import { docsService } from "../../services/docs.service";
import { userService } from "../../services/user.service";

function Doc() {
  const router = useRouter();
  const [doc, setDoc] = useState();

  const getDocuMentById = () => {
    const id = location.pathname.split("/")[2];
    docsService.findById({ id }).then((res) => {
      setDoc(res.data);
    });
  };

  useEffect(() => {
    if (!userService.user) {
      router.push("/Login");
    }

    getDocuMentById();
  }, []);

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1 shadow-md">
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          <Icon name="description" size="5xl" color="gray" />
        </span>

        <div className="flex-grow px-2">
          <h2>{doc?.fileName}</h2>
        </div>

        <Icon
          name="account_circle"
          size="5xl"
          color="gray"
          onClick={(e) => userService.logout()}
        />
      </header>

      {doc ? <TextEditor doc={doc} /> : <></>}
    </div>
  );
}

export default Doc;
