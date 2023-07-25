import type { ControlRenderingStyleOverride } from '../controls/controlRendering';
import { Group } from './Group';
import type { FabricObject } from './Object/FabricObject';
export declare class ActiveSelection extends Group {
    _objects: FabricObject[];
    /**
     * controls how selected objects are added during a multiselection event
     * - `canvas-stacking` adds the selected object to the active selection while respecting canvas object stacking order
     * - `selection-order` adds the selected object to the top of the stack,
     * meaning that the stack is ordered by the order in which objects were selected
     * @default `canvas-stacking`
     */
    multiSelectionStacking: 'canvas-stacking' | 'selection-order';
    static type: string;
    constructor(objects?: FabricObject[], options?: any, objectsRelativeToGroup?: boolean);
    /**
     * @private
     */
    _shouldSetNestedCoords(): boolean;
    /**
     * @private
     * @override we don't want the selection monitor to be active
     */
    __objectSelectionMonitor(): void;
    /**
     * Adds objects with respect to {@link multiSelectionStacking}
     * @param targets object to add to selection
     */
    multiSelectAdd(...targets: FabricObject[]): void;
    /**
     * @private
     * @param {FabricObject} object
     * @param {boolean} [removeParentTransform] true if object is in canvas coordinate plane
     * @returns {boolean} true if object entered group
     */
    enterGroup(object: FabricObject, removeParentTransform?: boolean): boolean;
    /**
     * we want objects to retain their canvas ref when exiting instance
     * @private
     * @param {FabricObject} object
     * @param {boolean} [removeParentTransform] true if object should exit group without applying group's transform to it
     */
    exitGroup(object: FabricObject, removeParentTransform?: boolean): void;
    /**
     * @private
     * @param {'added'|'removed'} type
     * @param {FabricObject[]} targets
     */
    _onAfterObjectsChange(type: 'added' | 'removed', targets: FabricObject[]): void;
    /**
     * If returns true, deselection is cancelled.
     * @since 2.0.0
     * @return {Boolean} [cancel]
     */
    onDeselect(): boolean;
    /**
     * Returns string representation of a group
     * @return {String}
     */
    toString(): string;
    /**
     * Decide if the object should cache or not. Create its own cache level
     * objectCaching is a global flag, wins over everything
     * needsItsOwnCache should be used when the object drawing method requires
     * a cache step. None of the fabric classes requires it.
     * Generally you do not cache objects in groups because the group outside is cached.
     * @return {Boolean}
     */
    shouldCache(): boolean;
    /**
     * Check if this group or its parent group are caching, recursively up
     * @return {Boolean}
     */
    isOnACache(): boolean;
    /**
     * Renders controls and borders for the object
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {Object} [styleOverride] properties to override the object style
     * @param {Object} [childrenOverride] properties to override the children overrides
     */
    _renderControls(ctx: CanvasRenderingContext2D, styleOverride?: ControlRenderingStyleOverride, childrenOverride?: ControlRenderingStyleOverride): void;
}
//# sourceMappingURL=ActiveSelection.d.ts.map