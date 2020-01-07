class WebpackLifecyclePlugin {
    constructor(cycles) {
        this.cycles = cycles;
    }

    apply(compiler) {
        for (let cycle in this.cycles) {
            const c = this.cycles[cycle];
            const cb = c.cb;
            const type = c.type;

            compiler.hooks[cycle][type](`Lifecycle: ${cycle}`, function() {
                console.log(`WEBPACK IS AT LIFECYCLE METHOD: ${cycle}`);
                cb(...arguments);
            });
        }
    }
}

module.exports = WebpackLifecyclePlugin;
