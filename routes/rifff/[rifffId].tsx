import { Handlers, PageProps } from "$fresh/server.ts";
import { HandlerContext } from "$fresh/server.ts";
import { Rifff, RifffWad } from "types";
import { fetchRifff } from "@util/fetchRifff.ts";
import processRifffData from "@util/processRifffData.ts"
import RifffPage from "@components/RifffPage.tsx";

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const pattern = new URLPattern({ pathname: "/rifff/:id" });
    const rifff_id = pattern.exec(req.url)?.pathname.groups.id;

    if (rifff_id == undefined) {
      throw new Error('Bad rifff_id');
    }
    const rifff: Awaited<Promise<Rifff>> = await fetchRifff(rifff_id);
    const rifffWad = processRifffData(rifff);
    return ctx.render(rifffWad);
  },
};

export default (props: PageProps<RifffWad>) => <RifffPage {...props.data}></RifffPage>
