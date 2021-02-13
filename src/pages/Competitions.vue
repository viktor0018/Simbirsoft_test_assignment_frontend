<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="filtered_data"
      ref="table-projects"
      :lineNumbers="false"
      :search-options="{
        enabled: false,
        placeholder: 'Search...',
      }"
      :paginationOptions="{
        enabled: true,
        nextLabel: 'next',
        prevLabel: 'prev',
        rowsPerPageLabel: 'lines',
        ofLabel: 'of',
        allLabel: 'All',
      }"
      :selectOptions="{
        enabled: false,
        selectOnCheckboxOnly: true,
        selectionInfoClass: '',
        selectionText: 'rows selected',
        clearSelectionText: 'Clear',
      }"
    >
      <div slot="emptystate">
        <div class="text-center">
          No data...
        </div>
      </div>

      <div slot="table-actions" class="d-flex ">
        <input
          class="form-control m-r-5"
          style="width:150px"
          type="text"
          v-model="search"
          placeholder="Input search text here"
          v-on:keyup="setFilters()"
        />

        <button class="btn btn-primary " @click="resetFilters()">
          Reset
        </button>
      </div>

      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'id'">
          <div class="col-auto d-flex flex-column">
            <button
              @click="goTeam(props.row)"
              type="button"
              class="btn btn-default btn-sm m-5"
            >
              Show teams
            </button>

            <button
              @click="goCalendar(props.row)"
              type="button"
              class="btn btn-default btn-sm m-5"
            >
              Show calendar
            </button>
          </div>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import PageOptions from "../config/PageOptions.vue";
import { HTTP } from "../config/Http.js";
import moment from "moment";

export default {
  data() {
    return {
      filtered_data: [],
      data: [],
      search: "",

      columns: [
        {
          label: "Name",
          field: "name",
        },

        {
          label: "Action",
          field: "id",
          width: "40px",
          tdClass: "text-center text-nowrap",
          thClass: "text-center text-nowrap",
        },
      ],
    };
  },

  monted() {},
  created() {
    console.log("created");
    this.search = this.$route.params.search ? this.$route.params.search : "";
    this.getData();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    goTeam(row) {
      this.$router.push({ name: "Teams", params: { id: row.id } });
    },
    goCalendar(row) {
      this.$router.push({
        name: "CompetitionCalendar",
        params: {
          id: row.id,
          start_date: moment().format("YYYY-MM-DD"),
          end_date: moment().format("YYYY-MM-DD"),
        },
      });
    },
    getData() {
      HTTP.get("/competitions", { params: { plan: "TIER_ONE" } })
        .then((resp) => {
          console.log(resp.data);
          this.data = resp.data.competitions;
          this.setFilters();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },

    setFilters() {
      this.filtered_data = this.data;
      console.log("this.search", this.search);
      if (this.search != "") {
        this.filtered_data = this.filtered_data.filter(
          (x) => x.name == this.search
        );
        this.$router
          .replace({
            name: "Competitions_",
            params: {
              search: this.search,
            },
          })
          .catch(() => {});
      } else {
        this.$router
          .push({
            name: "Competitions",
          })
          .catch(() => {});
      }
    },
    resetFilters() {
      this.search = "";
      this.setFilters();
    },
  },
};
</script>
