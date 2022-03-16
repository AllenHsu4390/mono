import { CreatorProfile } from "./creator-profile";
import { AssetGrid } from "./asset-grid";
import Page from "./page";

const creator = {
  desc: "Hi, I'm a creator. I make cool things. Check out my work!",
};

const assets = Array(10)
  .fill(1)
  .map((_, index) => {
    return index + 1;
  })
  .map((i) => {
    return {
      key: `${i}`,
      src: "https://source.unsplash.com/random",
    };
  });

export default function AlbumPage() {
  return (
    <Page hasFooter={true}>
      <>
        <CreatorProfile creator={creator} />
        <AssetGrid assets={assets} />
      </>
    </Page>
  );
}
