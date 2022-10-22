import { JSX } from "preact/jsx-runtime";
import { tw, css } from "twind/css";
import Nav from "@components/Nav.tsx";
import Footer from "@components/Footer.tsx";
import PageHeading from "@components/PageHeading.tsx";
import { PageMeta } from "types";

const Layout = ({ meta, children }: {
  meta: Partial<PageMeta>;
  children: JSX.Element;
}) => {
  const wrapper = css({
    minHeight: "100vh",
    display: "grid",
    gap: "0px",
    gridTemplateRows: "50px 1fr minmax(60px, auto)",
    gridTemplateAreas: '"nav" "content" "footer"',
  });
    
  return (
    <body class={tw`font-sans`}>
      <PageHeading meta={meta} />
      <div class={`${tw(wrapper)} wrapper`}>
        <Nav tClass="main-nav" />
        <div class="content">
          {children}
        </div>
        <Footer tClass="main-footer" />
      </div>
    </body>
  );
};
export default Layout