export const mixin = {
  methods: {
    showNotification(msg, variant) {
      this.$refs.notif.kendoWidget().show(msg, variant);
    }
  }
};
