class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        try{
            this.states = config.states;
            this.initial = config.initial;
            this.state = config.initial;
            this.previousStates = [];
            this.redoStates = [];
        }
        catch(e){
            throw new Error('Error: wrong parametr');
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        try{
            if (typeof this.states[state] === 'undefined'){
                throw new Error;
            }
            this.previousStates.push(this.state);
            this.state = state;
            this.redoStates = [];
        }catch(e){
            throw new Error('Error: state isn\'t exist');
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        try{
            this.previousStates.push(this.state);
            this.state = this.states[this.state]['transitions'][event];
            this.redoStates = [];
            if (typeof this.state == 'undefined') throw new Error;
        }
        catch(e){
            throw new Error('Error: wrong event');
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (typeof event == 'undefined'){
            return Object.keys(this.states);
        }else{
            let stateEvent = [];
            for (let key in this.states) {
                if (typeof this.states[key]['transitions'][event] !== 'undefined'){
                    stateEvent.push(key);
                }
            }
            return stateEvent;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.previousStates.length == 0 ){
            return false;
        }
        this.redoStates.push(this.state);
        this.state = this.previousStates.pop();
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoStates.length == 0 ){
            return false;
        }
        this.state = this.redoStates.pop();
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.redoStates = [];
        this.previousStates = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
