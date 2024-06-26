import Image from "next/image";
import styles from "./page.module.css";
import Test from "@/components/Test";
import Template1 from "@/components/Template1/Template1";

export default function Home() {
  return <>
    <Test />
    <Template1/>
  </>
}
