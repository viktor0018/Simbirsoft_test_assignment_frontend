import Vue from "vue";
import VueX from "vuex";
import routes from "./config/PageRoutes";

// plugins
import VueRouter from "vue-router";
import VueBootstrap from "bootstrap-vue";
import VueInsProgressBar from "vue-ins-progress-bar";
import VueSweetalert2 from "vue-sweetalert2";
import VueNotification from "vue-notification";
import VuePanel from "./plugins/panel/";
import VueGoodTable from "vue-good-table";
import VueCustomScrollbar from "vue-custom-scrollbar";
import Cors from "cors";
import DateRangePicker from "vue2-daterange-picker";
// plugins css
// plugins css
import "bootstrap-vue/dist/bootstrap-vue.css";
import "nvd3/build/nv.d3.min.css";
import "vue-event-calendar/dist/style.css";
import "vue-hljs/dist/vue-hljs.min.css";
import "@agametov/vueditor/dist/style/vueditor.min.css";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";
import "simple-line-icons/css/simple-line-icons.css";
import "flag-icon-css/css/flag-icon.min.css";
import "ionicons/dist/css/ionicons.min.css";
import "vue-good-table/dist/vue-good-table.css";
import "fullcalendar/dist/fullcalendar.css";
import "vue-select/dist/vue-select.css";
import "vue-slider-component/theme/antd.css";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";

// color admin css
import "/public/assets/css/default/app.min.css";
import "./scss/vue.scss";
import "bootstrap-social/bootstrap-social.css";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(VueX);
Vue.use(VueRouter);
Vue.use(VueBootstrap);
Vue.use(VueSweetalert2);
Vue.use(VueNotification);
Vue.use(VuePanel);
Vue.use(VueGoodTable);
Vue.use(VueInsProgressBar, {
  position: "fixed",
  show: true,
  height: "3px",
});

Vue.component("vue-custom-scrollbar", VueCustomScrollbar);
Vue.component("date-range-picker", DateRangePicker);
Vue.use(Cors);

const router = new VueRouter({
  routes,
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
