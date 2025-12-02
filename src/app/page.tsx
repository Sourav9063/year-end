import Image from "next/image";
import yearEndMImage from "../assets/year-end-m.png";

export default function Home() {

  

  return (
    <div id="output">
      <Image src={yearEndMImage} alt="background" height={496} width={336} />
    </div>
  );
}
