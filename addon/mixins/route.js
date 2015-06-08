import Ember from 'ember';

/**
 * @module mixins
 * @class  route
 */
export default Ember.Mixin.create({

    // -------------------------------------------------------------------------
    // Dependencies

    // -------------------------------------------------------------------------
    // Attributes

    /**
     * Route to direct user to when they have been denied access to a route
     *
     * @type {Ember.String}
     * @default null
     */
    unableRoute: null,

    // -------------------------------------------------------------------------
    // Actions

    // -------------------------------------------------------------------------
    // Events

    // -------------------------------------------------------------------------
    // Properties

    // -------------------------------------------------------------------------
    // Observers

    // -------------------------------------------------------------------------
    // Methods

    /**
     * Enforce permission-based access restrictions
     *
     * @function beforeModel
     * @param {Transition} [transition]
     * @returns {void}
     */
    beforeModel: function( transition ) {
        var unableRoute;

        this._super.apply( this, arguments );

        if ( this.get( 'behaviorService' ).isUnable( transition.targetName, 'route' ) ) {
            unableRoute = this.get( 'unableRoute' );

            if ( Ember.isEmpty( unableRoute ) ) {
                transition.abort();

            } else {
                this.transitionTo( unableRoute );
           }
        }
    }
});
