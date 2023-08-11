import { JSX } from 'preact/jsx-runtime';
import { css, cx } from 'fresh_emotion';
import { PageMeta } from 'types';

import Footer from '@components/layout/Footer.tsx';
import Nav from '@components/layout/Nav.tsx';
import PageHeading from '@components/layout/PageHeading.tsx';

const wrapper = css({
  minHeight: "100vh",
  display: "grid",
  gap: "0px",
  gridTemplateRows: "50px 1fr minmax(60px, auto)",
  gridTemplateAreas: '"nav" "content" "footer"'
});

const bodyClass = css({
  fontFamily: "sans-serif",
})

const Layout = ({ meta, children }: {
  meta: Partial<PageMeta>;
  children: JSX.Element;
}) => {
  return (
    <body class={bodyClass}>
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