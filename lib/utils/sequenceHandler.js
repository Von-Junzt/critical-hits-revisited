/**
 * Sequence Handler - Manages sequential execution of asynchronous tasks
 *
 * A utility class that provides ordered execution of async operations by maintaining
 * a queue of callbacks that are processed in sequence. Useful for animations,
 * effects, or any operations that need to occur in a specific order.
 *
 * @module critical-hits-revisited/lib/utils/sequenceHandler
 * @author aushilfsalien
 * @copyright 2025
 */
export class Sequence {
    constructor() {
        this.queue = [];
    }

    add(callback) {
        this.queue.push(callback);
        return this;
    }

    async play() {
        const results = [];
        for (const task of this.queue) {
            results.push(await task());
        }
        return results;
    }
}