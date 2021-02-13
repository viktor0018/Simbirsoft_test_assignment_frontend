<script>
//import Home from "../pages/Home.vue";
import Competitions from "../pages/Competitions.vue";
import Teams from "../pages/Teams.vue";
import CompetitionCalendar from "../pages/CompetitionCalendar.vue";
import TeamCalendar from "../pages/TeamCalendar.vue";

const routes = [
  { path: "/teams/:id", component: Teams, name: "Teams" },
  { path: "/teams/:id/:search", component: Teams, name: "Teams_" },

  {
    path: "/competition_calendar/:id/:start_date/:end_date",
    component: CompetitionCalendar,
    name: "CompetitionCalendar",
  },
  {
    path: "/team_calendar/:id/:start_date/:end_date",
    component: TeamCalendar,
    name: "TeamCalendar",
  },

  { path: "/", component: Competitions, name: "Competitions" },
  { path: "/:search", component: Competitions, name: "Competitions_" },
];

export default routes;
</script>
