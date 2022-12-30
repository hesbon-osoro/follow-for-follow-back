import HeadTag from 'next/head';

const Head = ({ title = 'Follow For Follow Back' }: { title: string }) => (
  <HeadTag>
    <title>{title}</title>
    <meta
      name="description"
      content="Find your mutual connections on GitHub with Follow for Follow back. Increase your followers and following with this tool."
    />
    <meta
      name="keywords"
      content="GitHub, mutual connections, followers, following, social media, networking, developer community"
    />
    <link rel="icon" href="./fffb.png" />
  </HeadTag>
);

export default Head;
