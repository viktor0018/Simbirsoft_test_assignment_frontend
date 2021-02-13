<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="matches"
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
          ...
        </div>
      </div>

      <div slot="table-actions" class="d-flex ">
        <select
          class="form-control m-r-5"
          style="width:100px"
          v-model="current_year"
          @change="yearUpdate()"
        >
          <option disabled value="">Please select one</option>
          <option v-for="(year, key) in years" :key="key">{{ year }}</option>
        </select>

        <date-range-picker
          :startDate="dateRange.startDate"
          :endDate="dateRange.endDate"
          @update="dateRangeUpdate()"
          :locale-data="locale"
          v-model="dateRange"
          opens="left"
          style="width:160px"
          class="m-r-5"
        >
          <div slot="input">
            {{ dateRange.startDate }} - {{ dateRange.endDate }}
          </div>
        </date-range-picker>
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
              @click="alert(1)"
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
      years: [],
      current_year: 0,
      matches: [],
      data: [],
      id: 0,

      dateRange: {
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
      },

      locale: {
        direction: "ltr", //direction of text
        format: "DD-MM-YYYY", //fomart of the dates displayed
        separator: " - ", //separator between the two ranges
        applyLabel: "Apply",
        cancelLabel: "Cancel",
        weekLabel: "W",
        customRangeLabel: "Custom Range",
        daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
        monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
        firstDay: 1, //ISO first day of week - see moment documenations for details
      },

      columns: [
        {
          label: "Away team",
          field: "awayTeam.name",
        },

        {
          label: "Home team",
          field: "homeTeam.name",
        },

        {
          label: "Winner",
          field: "score.winner",
        },
        {
          label: "Date",
          field: "match_date",
        },
      ],
    };
  },

  monted() {},
  created() {
    console.log("created");
    this.id = this.$route.params.id;
    if (!this.$route.params.start_date) {
      this.$route.params.start_date = moment().format("YYYY-MM-DD");
    } else {
      this.dateRange.startDate = moment(this.$route.params.start_date).format(
        "YYYY-MM-DD"
      );
    }

    if (!this.$route.params.end_date) {
      this.dateRange.endDate = moment().format("YYYY-MM-DD");
    } else {
      this.dateRange.endDate = moment(this.$route.params.end_date).format(
        "YYYY-MM-DD"
      );
    }
    this.getCalendar();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    goTeam(row) {
      this.$router.push({ name: "Team", params: { id: row.id } });
    },
    getCalendar() {
      HTTP.get("/teams/" + this.id + "/matches")
        .then((resp) => {
          this.data = resp.data.matches;

          this.data.map((x) => {
            x.time = new Date(x.utcDate).getTime() / 1000;
            x.match_date = moment(x.utcDate).format("YYYY-MM-DD");
          });
          this.matches = this.data;

          const min_date = Math.min(...this.matches.map((x) => x.time));
          const max_date = Math.max(...this.matches.map((x) => x.time));

          const max_year = new Date(max_date * 1000).getFullYear();
          const min_year = new Date(min_date * 1000).getFullYear();

          this.years = Array.from(
            { length: max_year - min_year + 1 },
            (v, k) => min_year + k
          );
          this.setFilters();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
    dateRangeUpdate() {
      this.dateRange.startDate = moment(this.dateRange.startDate).format(
        "YYYY-MM-DD"
      );

      this.dateRange.endDate = moment(this.dateRange.endDate).format(
        "YYYY-MM-DD"
      );
      this.setFilters();
    },

    yearUpdate() {
      this.dateRange.startDate = this.current_year + "-01-01";
      this.dateRange.endDate = this.current_year + "-12-31";
      this.setFilters();
    },

    searchUpdate() {
      this.setFilters();
    },
    setFilters() {
      this.matches = this.data;
      const start = new Date(this.dateRange.startDate).getTime() / 1000;
      const end = new Date(this.dateRange.endDate).getTime() / 1000;
      if (start != end) {
        this.matches = this.matches.filter(
          (x) => x.time > start && x.time < end
        );
      }

      this.$router
        .replace({
          name: "TeamCalendar",
          params: {
            id: this.id,
            start_date: this.dateRange.startDate,
            end_date: this.dateRange.endDate,
          },
        })
        .catch(() => {});
    },

    resetFilters() {
      this.dateRange.startDate = moment().format("YYYY-MM-DD");
      this.dateRange.endDate = moment().format("YYYY-MM-DD");
      this.matches = this.data;

      this.current_year = 0;
    },
  },
};
</script>
