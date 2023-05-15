import { JSX } from 'preact/jsx-runtime';
import {
  tw,
} from 'twind/css';
import {css,cx} from 'fresh_emotion';
import { PageMeta } from 'types';

import Footer from '@components/Footer.tsx';
import Nav from '@components/Nav.tsx';
import PageHeading from '@components/PageHeading.tsx';

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
      <div class={cx(wrapper, 'wrapper')}>
        <Nav tClass="main-nav" />
        <div class="content">
          {children}
        </div>
        <Footer tClass="main-footer" />
      </div>
      <script dangerouslySetInnerHTML={{
        __html: `
         window.player = new window.RifffPlayer();
         `
      }}></script>
    </body>
  );
};
export default Layout