// import { password, newP } from '$lib/index.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { backend_url, POST } from '$lib';

export const load: PageServerLoad = async ({ params }) => {
	// if (params.slug != process.env.pass){
	// const res = await POST(`${backend_url}internal/events/all/`,{})
    // const result = await res.json()
    // if (result.status != 200){
    //     error(404, {message: 'Unable to resolve the response'})
    // }
    // return {data: result.data}
    return {data: [{
        eventId:"TP01",
        name:"Number",
        minMember:1,
        maxMember:1,
        isTeam: true,
        fee: 999
    }]}
};
