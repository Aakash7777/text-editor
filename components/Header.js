import Icon from "@material-tailwind/react/Icon";
import { userService } from "../services";

function Header() {
  const signOut = () => {
    userService.logout();
  };
  return (
    <header className="flex items-center justify-between sticky top-0 z-50 px-4 py-4 shadow-md min-h-32 bg-white">
      <div className="flex items-center">
        <Icon name="description" size="5xl" color="gray" />
        <h1 className="ml-2 text-gray-700 text-2xl">Text Editor</h1>
      </div>

      <div className="flex items-center cursor-pointer">
        <Icon name="account_circle" size="5xl" color="gray" onClick={signOut} />
      </div>
    </header>
  );
}

export default Header;
