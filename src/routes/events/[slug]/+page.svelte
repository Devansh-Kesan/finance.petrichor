<script lang="ts">
    import { goto } from "$app/navigation";
    import type { Event } from "$lib/types";

    export let data: any;
    let events: Event[] = data.data;
    let markdown= "Start the Markdown here"
    function changeMarkdown(e) {
        markdown = e.target.innerHtml
    }
</script>

<main>
    <div class="update Area"></div>
    <div class="readmeArea">
        {#each events as event}
            <div on:click={()=>{goto(`/events/p/${event.eventId}`)}}>Event</div>
        {/each}
    </div>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;
    }
    .textareaElement {
        overflow-x: hidden;
        overflow-y: auto;
        width: 50%;
        border: 1px solid #4caf50;
        border-radius: 5px;
        padding: 10px;
        min-height: 150px;
        resize: none;
        color: gray;
        background-color: rgb(240, 233, 233);
        font-size: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .textareaElement:focus {
        color: #33363c;
    }

    .readmeArea {
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .outputArea {
        width: 50%;
        border: 1px solid #4c66af;
        border-radius: 5px;
        padding: 10px;
    }
    @media (max-with: 900px) {
        main {
            display: flex;
        }
        .readmeArea {
            display: flex;
        }
    }
</style>
