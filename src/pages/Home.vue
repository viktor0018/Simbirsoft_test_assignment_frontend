<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="competitions"
      ref="table-projects"
      :lineNumbers="false"
      :search-options="{
        enabled: true,
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
          No leagues...
        </div>
      </div>

      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'id'">
          <div class="col-auto d-flex flex-column">
            <button
              @click="alert(1)"
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
//import { show_error } from "../config/Message";

export default {
  data() {
    return {
      competitions: [],

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
    this.getLeagues();
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    document.body.className = "";
    next();
  },
  methods: {
    getLeagues() {
      HTTP.get("/competitions")
        .then((resp) => {
          console.log(resp.data);
          this.competitions = resp.data.competitions;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
  },
};
</script>
