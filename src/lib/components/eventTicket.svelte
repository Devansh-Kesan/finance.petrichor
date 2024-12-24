<script>
    let events = [];

    function addEvent() {
        const newEvent = {
            id: 45123,
            name: "Sample Event",
            minMembers: 5,
            maxMembers: 20,
            isTeam: "Yes",
        };
        events = [...events, newEvent];
    }
</script>

<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        background-color: #f9f9f9;
        min-height: 100vh;
    }

    .container {
        width: 60%;
        max-width: 1200px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .header {
        display: flex;
        justify-content: flex-end; 
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
    }

    .add-event-btn {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 15px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .add-event-btn:hover {
        background-color: #0056b3;
    }

    .event-list {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .event-block {
        width: 30%;
        background-color: #f4f4f4;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .event-block span {
        font-size: 14px;
        font-weight: bold;
    }
</style>

<div class="container">
    <div class="header">
        <button class="add-event-btn" on:click={addEvent}>Add Event</button>
    </div>

    <div class="event-list">
        {#each events as event}
            <div class="event-block">
                <span>Event ID: {event.id}</span>
                <span>Name: {event.name}</span>
                <span>Min Members: {event.minMembers}</span>
                <span>Max Members: {event.maxMembers}</span>
                <span>Is Team Event: {event.isTeam}</span>
            </div>
        {/each}
    </div>
</div>
