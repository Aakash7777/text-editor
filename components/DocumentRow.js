import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";

function DocumentRow({ id, fileName }) {
    const router = useRouter()
  return (
    <div className="flex items-center py-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer">
      <Icon name="article" size="3xl" color="gray" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
    
      <Button
      color="gray"
      buttonType="outline"
      iconOnly={true}
      rounded={true}
      ripple="dark"
      className="border-0"
      onClick={() => router.push(`/doc/${id}`)}
    >
      <Icon name="more_vert" size="3xl" color="gray" />
    </Button>
      </div>
  );
}

export default DocumentRow;
