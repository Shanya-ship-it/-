import { ReactElement, JSXElementConstructor, ReactFragment } from "react";

const BuildPage = (index: number) => (
  <>
    <h3>Page {index}</h3>
    <div>страшный страшный текст</div>
  </>
);

export const PageOne = () => BuildPage(1);
export const PageTwo = () => BuildPage(2);
