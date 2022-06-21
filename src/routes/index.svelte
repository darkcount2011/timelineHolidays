<script>
import '../styles/global.css'
import { onMount } from 'svelte';
import  {fetchHolidays}  from '../components/api'
import Event from '../components/event.svelte'
import SearchForm from '../components/searchForm.svelte'

let events = []
$: console.log(events);
onMount( async () => {
 events = await fetchHolidays();
})

const convertDate = (dateStr) => {
  let newDate = new Date(dateStr)
  let prettyDate = newDate.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year:'numeric' })
  return prettyDate;
}

let searchTerm;
const getResults = () => {
  for (let event of events) {
    let lowerName = event.name.toLowerCase()
    let lowerdate = convertDate(event.date).toLowerCase()
    if (lowerName.includes(searchTerm) || lowerdate.includes(searchTerm)){
      return moveIntoView(event.name)
    }
  }
}
const moveIntoView = (element) => {
  document.getElementById(element).scrollIntoView({
    behavior:"smooth",
    block: "center",
    inline: "center"
  })
}

</script>


<main>
  <SearchForm bind:searchTerm on:submit={getResults}/>
<div class="timeline">
  {#each events as {name, date}, i}
   <Event date={convertDate(date)}
          {name}
          isleft={i % 2 === 0}
          eventID={name} />
    {/each}
</div>
</main>

<style>
    * {
  box-sizing: border-box;
}

/* Set a background color */


/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: white;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}



/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
/* Place the timelime to the left */
  .timeline::after {
    left: 31px;
  }
}
</style>