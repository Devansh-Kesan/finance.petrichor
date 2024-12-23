// Credits : https://www.youtube.com/watch?v=vHHLLJA0b70&t=13141s


import path from 'path';
import fs from 'fs';

import * as rollup from "rollup/dist/rollup.browser.es.js"
import type { Component } from '$lib/types';
import { pre_components } from '$lib';
import {compile} from  "svelte/compiler";
import { compile as mdcompile } from "mdsvex"

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {


    // const res = await POST(`${backend_url}internal/events/all/`,{
    //     "id":params.itemId
    // })
    // const result = await res.json()
    // if (result.status != 200){
    //     error(404, {message: 'Unable to resolve the response'})
    // }

    // const markdown = fs.readFileSync(path.resolve('./src/routes/events/[slug]/[itemId]/+page.svx')).toString()
    const markdown = "";
    // return {data: result.data}
    return {"event" : {
        eventId: "TP01",
        name: "Number",
        minMember: 1,
        maxMember: 1,
        isTeam: true,
        fee: 999
    }, "markdown": markdown} 
};   


const CDN_URL = "https://cdn.jsdelivr.net/npm";

const components_map: Map<string, Component> = new Map()


function generate_lookup(components: Component[]) {
    components.forEach(component => {
        components_map.set(`./${component.name}.${component.type}`, component)
    })
}

async function fetch_package(url: string): Promise<string> {
    if (url.includes("disclose-version")) {
        return ""
    }
    return ((await fetch(url)).text())
}

export const actions = {
    convert: async ({ request }) => {
        const markdown = await request.text();
        // console.log(markdown)
        generate_lookup([...pre_components, {
            id: 100,
            name: 'markdown',
            source: markdown,
            type: 'mdx'
        }])

        const bundle = await rollup.rollup({
            input:"./markdown.mdx",
            plugins: [
                {
                    name: 'repl-plugin',
                    resolveId(importee:string, importer:string) {
                        // Handle imports from 'svelte'
                        if (importer === "./Component.svelte") {
                            if (importee.endsWith("disclose-version")) return ""
                            console.log(importee)
                        }
                        if (importee === 'svelte') return `${CDN_URL}/svelte/index.mjs`;
            
                        if (importee.startsWith('svelte/')) {
                            return `${CDN_URL}/svelte/${importee.slice(7)}/index.mjs`;
                        }
            
                        // Handle relative imports for Svelte components
                        if (components_map.has(importee)) return importee;
            
                        // Handle imports from the CDN
                        if (importer && importer.startsWith(CDN_URL)) {
                            const resolved = new URL(importee, importer).href;
                            return resolved.endsWith('.mjs') ? resolved : `${resolved}/index.mjs`;
                        }
            
                        return null; // Other cases are left to Rollup
                    },
                    async load(id:string) {
                        if (components_map.has(id)) {
                            return components_map.get(id)?.source; // Return component source code
                        }
                        return await fetch_package(id); // Fetch from the CDN
                    },
                    async transform(code:string, id:string) {
                        if (id.endsWith('.svelte')) {
                            // Compile Svelte to JavaScript
                            const compiled = compile(code, {
                                generate:'dom'
                            });
                            const final_code = compiled.js.code.replace("import \"svelte/internal/disclose-version\";","\n")
                            return final_code;
                            // return compiled.js.code;
                        }
                        if (id.endsWith('.mdx')) {
                            const mk_compiled = await mdcompile(code, {})
                            const compiled = compile(mk_compiled?.code, {
                                generate:'dom'
                            });
                            const final_code = compiled.js.code.replace("import \"svelte/internal/disclose-version\";","\n")
                            return final_code;
                        }
                        return null; // Pass other files unchanged
                    },
                },
            ]
            
        });
        const output: string = ( await bundle.generate({ format: 'esm' })).output[0].code;
        return output
        }
}