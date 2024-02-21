import { Dictionary } from "@/lang/getDictionary";

async function Header({ dictionary }: { dictionary: Dictionary }) {
  return (
    <header className="flex items-center justify-between p-2 sticky top-0 backdrop-blur-md">
      <h1 className="text">{dictionary.header.title}</h1>
      <div>
        {dictionary.header.dataVersion}
        <b>2.0.0</b>
      </div>
    </header>
  );
}

export default Header;
