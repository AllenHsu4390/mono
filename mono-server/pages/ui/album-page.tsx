import { CreatorProfile } from "./creator-profile";
import { AssetGrid } from "./asset-grid";
import Page from "./page";

const creator = {
  desc: "Hi, I'm a creator. I make cool things. Check out my work!",
  avatarUrl: "https://source.unsplash.com/random?t=19239",
};
export default function AlbumPage() {
  return (
    <Page hasFooter={true}>
      <CreatorProfile creator={creator} />
      <AssetGrid />
    </Page>
  );
}
