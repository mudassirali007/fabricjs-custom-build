import { FabricObject } from './Object/FabricObject';
import type { FabricObjectProps, SerializedObjectProps, TProps } from './Object/types';
import type { ObjectEvents } from '../EventTypeDefs';
export declare const triangleDefaultValues: {
    width: number;
    height: number;
};
export declare class Triangle<Props extends TProps<FabricObjectProps> = Partial<FabricObjectProps>, SProps extends SerializedObjectProps = SerializedObjectProps, EventSpec extends ObjectEvents = ObjectEvents> extends FabricObject<Props, SProps, EventSpec> implements FabricObjectProps {
    static type: string;
    static ownDefaults: Record<string, any>;
    static getDefaults(): {
        [x: string]: any;
    };
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render(ctx: CanvasRenderingContext2D): void;
    /**
     * Returns svg representation of an instance
     * @return {Array} an array of strings with the specific svg representation
     * of the instance
     */
    _toSVG(): string[];
}
//# sourceMappingURL=Triangle.d.ts.map