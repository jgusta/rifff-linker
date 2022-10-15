import { JSX } from "preact/jsx-runtime";
import { PageMeta } from "@util/types.ts";
import Nav from "@components/Nav.tsx";
import Footer from "@components/Footer.tsx";
import { tw } from "twind";
import PageHeading from "@components/PageHeading.tsx";
import { css } from "twind/css";

export const Layout = ({ meta, children }: {
  meta: Partial<PageMeta>;
  children: JSX.Element;
}) => {
  const wrapper = css({
    minHeight: "100vh",
    display: "grid",
    gap: "20px",
    gridTemplateRows: "80px 1fr minmax(48px, auto)",
    gridTemplateAreas: '"nav" "content" "footer"',
    backgroundColor: '#2e343c'
  });
  return (
    <body class={tw`font-sans`}>
      <PageHeading meta={meta} />
      <div class={tw`${wrapper}`}>
        <Nav tClass="main-nav" />
        <div class="content">
          {children}
        </div>
        <Footer tClass="main-footer" />
      </div>
    </body>
  );
};
