import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
        customProperties: true,
      },
    themes: {
        light: {
            primary: '#673AB7',
            secondary: '#E0E0E0',
            error: '#dc3545',
        }
    },
  },
});
