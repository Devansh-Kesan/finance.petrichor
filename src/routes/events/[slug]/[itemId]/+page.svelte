<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript } from "@codemirror/lang-javascript";
    import { onMount } from "svelte";

    export let data: any;

    let iframe:HTMLIFrameElement
    
    let markdown = data.markdown;
    let transformed_code: string;

    function convertToHtml() {
        fetch("?/convert", {
            method: "POST",
            body: markdown,
        }).then(res => res.json())
        .then (res => {
            res = (JSON.parse(res.data)[0])
            transformed_code = res
        });
    }

    const srcdoc = `
    <!doctype html>
    <html>
        <head>
            <script type='module'>
                let c;

                function update(source) {
                    
                    const blob = new Blob([source],{ type: 'text/javascript' });
                    const url = URL.createObjectURL(blob);
                    
                    import(url).then(( { default : App }) => {
                        if (c) c.$destroy();

                        document.body.innerHTML = '';
                        c = new App({ target: document.body })
                    
                    })

                }


                window.addEventListener('message', event => {
                update(event.data)})
            <\/script>
            <style>
            * {
                box-sizing: border-box;
            }
            html,body {
                overflow:hidden;
            }
                body {
                    margin: 0;
                }
        </style>
        </head>
        <body></body>  
    </html>
    `
    let height = 0;
    function update(code : string) {
        iframe.contentWindow?.postMessage(code, "*")
        setTimeout(() => {
            height = iframe.contentWindow?.document.body.scrollHeight
            console.log(height)
        }, 100)
    }

    $: iframe && transformed_code && update(transformed_code)
</script>

<main>
    <div class="update Area">
        <button on:click={convertToHtml}>Convert</button>
    </div>
    <div class="readmeArea">
        <div class="textareaElement">
            <CodeMirror bind:value={markdown} lang={javascript()} />
        </div>
        <iframe class="outputArea" bind:this={iframe} title='repl' {srcdoc} height={height}/>
    </div>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
        top: 0;
        left: 0;
    }
    * {
        box-sizing: border-box;
    }
    .textareaElement {
        overflow-x: hidden;
        overflow-y: auto;
        border: 1px solid #4caf50;
        border-radius: 5px;
        padding: 10px;
        min-height: 150px;  
        width: 50%;
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
        overflow: hidden;
        width: 50%;
        border: 1px solid #4c66af;
        border-radius: 5px;
        min-height: 150px;
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
