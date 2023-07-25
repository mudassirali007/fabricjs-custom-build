import type { CollectionEvents, ObjectEvents } from '../EventTypeDefs';
import { Point } from '../Point';
import type { TClassProperties, TSVGReviver } from '../typedefs';
import { FabricObject } from './Object/FabricObject';
import type { FabricObjectProps, SerializedObjectProps, TProps } from './Object/types';
export type LayoutContextType = 'initialization' | 'object_modified' | 'added' | 'removed' | 'layout_change' | 'imperative';
export type LayoutContext = {
    type: LayoutContextType;
    /**
     * array of objects starting from the object that triggered the call to the current one
     */
    path?: Group[];
    [key: string]: any;
};
export interface GroupEvents extends ObjectEvents, CollectionEvents {
    layout: {
        context: LayoutContext;
        result: LayoutResult;
        diff: Point;
    };
}
export type LayoutStrategy = 'fit-content' | 'fit-content-lazy' | 'fixed' | 'clip-path';
/**
 * positioning and layout data **relative** to instance's parent
 */
export type LayoutResult = {
    /**
     * new centerX as measured by the containing plane (same as `left` with `originX` set to `center`)
     */
    centerX: number;
    /**
     * new centerY as measured by the containing plane (same as `top` with `originY` set to `center`)
     */
    centerY: number;
    /**
     * correctionX to translate objects by, measured as `centerX`
     */
    correctionX?: number;
    /**
     * correctionY to translate objects by, measured as `centerY`
     */
    correctionY?: number;
    width: number;
    height: number;
};
export interface GroupOwnProps {
    layout: LayoutStrategy;
    subTargetCheck: boolean;
    interactive: boolean;
}
export interface SerializedGroupProps extends SerializedObjectProps, GroupOwnProps {
    objects: SerializedObjectProps[];
}
export interface GroupProps extends FabricObjectProps, GroupOwnProps {
}
export declare const groupDefaultValues: {
    layout: string;
    strokeWidth: number;
    subTargetCheck: boolean;
    interactive: boolean;
};
declare const Group_base: {
    new (...args: any[]): {
        _objects: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[];
        _onObjectAdded(object: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>): void;
        _onObjectRemoved(object: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>): void;
        _onStackOrderChanged(object: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>): void;
        add(...objects: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[]): number;
        insertAt(index: number, ...objects: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[]): number;
        remove(...objects: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[]): FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[];
        forEachObject(callback: (object: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>, index: number, array: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[]) => any): void;
        getObjects(...types: string[]): FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[];
        item(index: number): FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>;
        isEmpty(): boolean;
        size(): number;
        contains(object: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>, deep?: boolean | undefined): boolean;
        complexity(): number;
        sendObjectToBack(object: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>): boolean;
        bringObjectToFront(object: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>): boolean;
        sendObjectBackwards(object: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>, intersecting?: boolean | undefined): boolean;
        bringObjectForward(object: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>, intersecting?: boolean | undefined): boolean;
        moveObjectTo(object: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>, index: number): boolean;
        /**
         * @private
         * @param {string} key
         * @param {*} value
         */
        findNewLowerIndex(object: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>, idx: number, intersecting?: boolean | undefined): number;
        findNewUpperIndex(object: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>, idx: number, intersecting?: boolean | undefined): number;
        collectObjects({ left, top, width, height }: import("../typedefs").TBBox, { includeIntersecting }?: {
            includeIntersecting?: boolean | undefined;
        }): import("./Object/InteractiveObject").InteractiveFabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[];
    };
} & {
    new (options?: GroupProps): FabricObject<GroupProps, SerializedGroupProps, GroupEvents>;
    ownDefaults: Record<string, any>;
    getDefaults(): Record<string, any>;
    stateProperties: string[];
    cacheProperties: string[];
    type: string;
    _fromObject<S extends import("./Object/Object").FabricObject<Partial<import("./Object/types/ObjectProps").ObjectProps>, SerializedObjectProps, ObjectEvents>>(object: Record<string, unknown>, { extraParam, ...options }?: import("../typedefs").Abortable & {
        extraParam?: string | undefined;
    }): Promise<S>;
    fromObject<T extends TProps<SerializedObjectProps>>(object: T, options?: import("../typedefs").Abortable | undefined): Promise<import("./Object/Object").FabricObject<Partial<import("./Object/types/ObjectProps").ObjectProps>, SerializedObjectProps, ObjectEvents>>;
};
/**
 * @fires object:added
 * @fires object:removed
 * @fires layout once layout completes
 */
export declare class Group extends Group_base {
    /**
     * Specifies the **layout strategy** for instance
     * Used by `getLayoutStrategyResult` to calculate layout
     * `fit-content`, `fit-content-lazy`, `fixed`, `clip-path` are supported out of the box
     * @default
     */
    layout: LayoutStrategy;
    /**
     * Used to optimize performance
     * set to `false` if you don't need contained objects to be targets of events
     * @default
     * @type boolean
     */
    subTargetCheck: boolean;
    /**
     * Used to allow targeting of object inside groups.
     * set to true if you want to select an object inside a group.\
     * **REQUIRES** `subTargetCheck` set to true
     * @default
     * @type boolean
     */
    interactive: boolean;
    /**
     * Used internally to optimize performance
     * Once an object is selected, instance is rendered without the selected object.
     * This way instance is cached only once for the entire interaction with the selected object.
     * @private
     */
    protected _activeObjects: FabricObject[];
    static stateProperties: string[];
    static type: string;
    static ownDefaults: Record<string, any>;
    private __objectSelectionTracker;
    private __objectSelectionDisposer;
    private _firstLayoutDone;
    static getDefaults(): Record<string, any>;
    /**
     * Constructor
     *
     * @param {FabricObject[]} [objects] instance objects
     * @param {Object} [options] Options object
     * @param {boolean} [objectsRelativeToGroup] true if objects exist in group coordinate plane
     */
    constructor(objects?: FabricObject[], options?: Partial<GroupProps>, objectsRelativeToGroup?: boolean);
    /**
     * Checks if object can enter group and logs relevant warnings
     * @private
     * @param {FabricObject} object
     * @returns
     */
    canEnterGroup(object: FabricObject): boolean;
    /**
     * Override this method to enhance performance (for groups with a lot of objects).
     * If Overriding, be sure not pass illegal objects to group - it will break your app.
     * @private
     */
    protected _filterObjectsBeforeEnteringGroup(objects: FabricObject[]): FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[];
    /**
     * Add objects
     * @param {...FabricObject[]} objects
     */
    add(...objects: FabricObject[]): number;
    /**
     * Inserts an object into collection at specified index
     * @param {FabricObject[]} objects Object to insert
     * @param {Number} index Index to insert object at
     */
    insertAt(index: number, ...objects: FabricObject[]): number;
    /**
     * Remove objects
     * @param {...FabricObject[]} objects
     * @returns {FabricObject[]} removed objects
     */
    remove(...objects: FabricObject[]): FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[];
    _onObjectAdded(object: FabricObject): void;
    _onRelativeObjectAdded(object: FabricObject): void;
    /**
     * @private
     * @param {FabricObject} object
     * @param {boolean} [removeParentTransform] true if object should exit group without applying group's transform to it
     */
    _onObjectRemoved(object: FabricObject, removeParentTransform?: boolean): void;
    /**
     * @private
     * @param {'added'|'removed'} type
     * @param {FabricObject[]} targets
     */
    _onAfterObjectsChange(type: 'added' | 'removed', targets: FabricObject[]): void;
    _onStackOrderChanged(): void;
    /**
     * @private
     * @param {string} key
     * @param {*} value
     */
    _set(key: string, value: any): this;
    /**
     * @private
     */
    _shouldSetNestedCoords(): boolean;
    /**
     * Remove all objects
     * @returns {FabricObject[]} removed objects
     */
    removeAll(): FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[];
    /**
     * invalidates layout on object modified
     * @private
     */
    __objectMonitor(ev: ObjectEvents['modified']): void;
    /**
     * keeps track of the selected objects
     * @private
     */
    __objectSelectionMonitor<T extends boolean>(selected: T, { target: object }: ObjectEvents[T extends true ? 'selected' : 'deselected']): void;
    /**
     * @private
     * @param {boolean} watch
     * @param {FabricObject} object
     */
    _watchObject(watch: boolean, object: FabricObject): void;
    /**
     * @private
     * @param {FabricObject} object
     * @param {boolean} [removeParentTransform] true if object is in canvas coordinate plane
     * @returns {boolean} true if object entered group
     */
    enterGroup(object: FabricObject, removeParentTransform?: boolean): boolean;
    /**
     * @private
     * @param {FabricObject} object
     * @param {boolean} [removeParentTransform] true if object is in canvas coordinate plane
     */
    _enterGroup(object: FabricObject, removeParentTransform?: boolean): void;
    /**
     * @private
     * @param {FabricObject} object
     * @param {boolean} [removeParentTransform] true if object should exit group without applying group's transform to it
     */
    exitGroup(object: FabricObject, removeParentTransform?: boolean): void;
    /**
     * @private
     * @param {FabricObject} object
     * @param {boolean} [removeParentTransform] true if object should exit group without applying group's transform to it
     */
    _exitGroup(object: FabricObject, removeParentTransform?: boolean): void;
    /**
     * Decide if the object should cache or not. Create its own cache level
     * needsItsOwnCache should be used when the object drawing method requires
     * a cache step. None of the fabric classes requires it.
     * Generally you do not cache objects in groups because the group is already cached.
     * @return {Boolean}
     */
    shouldCache(): boolean;
    /**
     * Check if this object or a child object will cast a shadow
     * @return {Boolean}
     */
    willDrawShadow(): boolean;
    /**
     * Check if instance or its group are caching, recursively up
     * @return {Boolean}
     */
    isOnACache(): boolean;
    /**
     * Execute the drawing operation for an object on a specified context
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    drawObject(ctx: CanvasRenderingContext2D): void;
    /**
     * @override
     * @return {Boolean}
     */
    setCoords(): void;
    /**
     * Renders instance on a given context
     * @param {CanvasRenderingContext2D} ctx context to render instance on
     */
    render(ctx: CanvasRenderingContext2D): void;
    /**
     * @public
     * @param {Partial<LayoutResult> & { layout?: string }} [context] pass values to use for layout calculations
     */
    triggerLayout<T extends this['layout']>(context?: Partial<LayoutResult> & {
        layout?: T;
    }): void;
    /**
     * @private
     * @param {FabricObject} object
     * @param {Point} diff
     */
    _adjustObjectPosition(object: FabricObject, diff: Point): void;
    /**
     * initial layout logic:
     * calculate bbox of objects (if necessary) and translate it according to options received from the constructor (left, top, width, height)
     * so it is placed in the center of the bbox received from the constructor
     *
     * @private
     * @param {LayoutContext} context
     */
    _applyLayoutStrategy(context: LayoutContext): void;
    /**
     * Override this method to customize layout.
     * If you need to run logic once layout completes use `onLayout`
     * @public
     * @param {string} layoutDirective
     * @param {FabricObject[]} objects
     * @param {LayoutContext} context
     * @returns {LayoutResult | undefined}
     */
    getLayoutStrategyResult<T extends this['layout']>(layoutDirective: T, objects: FabricObject[], context: LayoutContext): any;
    /**
     * Override this method to customize layout.
     * A wrapper around {@link Group#getObjectsBoundingBox}
     * @public
     * @param {string} layoutDirective
     * @param {FabricObject[]} objects
     * @param {LayoutContext} context
     * @returns {LayoutResult | undefined}
     */
    prepareBoundingBox<T extends this['layout']>(layoutDirective: T, objects: FabricObject[], context: LayoutContext): any;
    /**
     * Calculates center taking into account originX, originY while not being sure that width/height are initialized
     * @public
     * @param {string} layoutDirective
     * @param {FabricObject[]} objects
     * @param {LayoutContext} context
     * @returns {LayoutResult | undefined}
     */
    prepareInitialBoundingBox<T extends this['layout']>(layoutDirective: T, objects: FabricObject[], context: LayoutContext): {
        centerX: number;
        centerY: number;
        correctionX: number;
        correctionY: number;
        width: number;
        height: number;
    } | undefined;
    /**
     * Calculate the bbox of objects relative to instance's containing plane
     * @public
     * @param {FabricObject[]} objects
     * @returns {LayoutResult | null} bounding box
     */
    getObjectsBoundingBox(objects: FabricObject[], ignoreOffset?: boolean): LayoutResult | null;
    /**
     * Hook that is called once layout has completed.
     * Provided for layout customization, override if necessary.
     * Complements `getLayoutStrategyResult`, which is called at the beginning of layout.
     * @public
     * @param {LayoutContext} context layout context
     * @param {LayoutResult} result layout result
     */
    onLayout(context: LayoutContext, result: LayoutResult): void;
    /**
     *
     * @private
     * @param {'toObject'|'toDatalessObject'} [method]
     * @param {string[]} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @returns {FabricObject[]} serialized objects
     */
    __serializeObjects(method: 'toObject' | 'toDatalessObject', propertiesToInclude?: string[]): any[];
    /**
     * Returns object representation of an instance
     * @param {string[]} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toObject<T extends Omit<GroupProps & TClassProperties<this>, keyof SerializedGroupProps>, K extends keyof T = never>(propertiesToInclude?: K[]): Pick<T, K> & SerializedGroupProps;
    toString(): string;
    dispose(): void;
    /**
     * @private
     */
    _createSVGBgRect(reviver?: TSVGReviver): string;
    /**
     * Returns svg representation of an instance
     * @param {TSVGReviver} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */
    _toSVG(reviver?: TSVGReviver): string[];
    /**
     * Returns styles-string for svg-export, specific version for group
     * @return {String}
     */
    getSvgStyles(): string;
    /**
     * Returns svg clipPath representation of an instance
     * @param {Function} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */
    toClipPathSVG(reviver?: TSVGReviver): string;
    /**
     * @todo support loading from svg
     * @private
     * @static
     * @memberOf Group
     * @param {Object} object Object to create a group from
     * @returns {Promise<Group>}
     */
    static fromObject<T extends TProps<SerializedGroupProps>>({ objects, ...options }: T): Promise<Group>;
}
export {};
//# sourceMappingURL=Group.d.ts.map