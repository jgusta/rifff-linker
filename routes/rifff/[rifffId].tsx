import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";

export async function getRiffData(rifffId:string) {
    const resp = await fetch('https://endlesss.fm/api/v3/feed/shared_rifff/' + rifffId);
    const arr = await resp.json();
    return arr[0]
}

export const handler: Handlers = {
    async GET(req,ctx){
        const pattern = new URLPattern({ pathname: '/rifff/:id' });
        const rifffId = pattern.exec(req.url)?.pathname.groups.id;
        if(rifffId == undefined){
            throw new Error();
        }
        const data = await getRiffData(rifffId);
        const resp = await ctx.render(data)
        return resp;
    }
}

export default function RifffPage(){}
