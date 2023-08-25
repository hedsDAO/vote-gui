import Header from "@/components/Landing/Header";
import Spaces from "@/components/Landing/Spaces";
import * as styles from "@/app/styles";

export default function Home() {
  return (
    <div className={styles.$homeLayoutStyles}>
      <Header />
      <Spaces />
    </div>
  );
}
