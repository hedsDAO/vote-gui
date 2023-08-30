import Header from "@/components/Landing/Header";
import Spaces from "@/components/Landing/Spaces";
import * as styles from "@/app/styles";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <div className={styles.$homeLayoutStyles}>
      <Header />
      <Suspense fallback={<Loading />} >
        <Spaces />
      </Suspense>
    </div>
  );
}
