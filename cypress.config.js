const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on) {
      on('task', {
        log(mensagem) {
          console.log(mensagem);
          return null;
        },
      });
    },
  },
});
