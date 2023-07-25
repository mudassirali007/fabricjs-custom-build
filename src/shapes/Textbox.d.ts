import type { TClassProperties } from '../typedefs';
import { IText } from './IText/IText';
import type { TextStyleDeclaration } from './Text/StyledText';
export declare const textboxDefaultValues: Partial<TClassProperties<Textbox>>;
export type GraphemeData = {
    wordsData: {
        word: string;
        width: number;
    }[][];
    largestWordWidth: number;
};
/**
 * Textbox class, based on IText, allows the user to resize the text rectangle
 * and wraps lines automatically. Textboxes have their Y scaling locked, the
 * user can only change width. Height is adjusted automatically based on the
 * wrapping of lines.
 */
export declare class Textbox extends IText {
    /**
     * Minimum width of textbox, in pixels.
     * @type Number
     * @default
     */
    minWidth: number;
    /**
     * Minimum calculated width of a textbox, in pixels.
     * fixed to 2 so that an empty textbox cannot go to 0
     * and is still selectable without text.
     * @type Number
     * @default
     */
    dynamicMinWidth: number;
    /**
     * Use this boolean property in order to split strings that have no white space concept.
     * this is a cheap way to help with chinese/japanese
     * @type Boolean
     * @since 2.6.0
     */
    splitByGrapheme: boolean;
    static type: string;
    static textLayoutProperties: string[];
    static ownDefaults: Record<string, any>;
    static getDefaults(): {
        controls: {
            mr: import("../..").Control;
            ml: import("../..").Control;
            mb: import("../..").Control;
            mt: import("../..").Control;
            tl: import("../..").Control;
            tr: import("../..").Control;
            bl: import("../..").Control;
            br: import("../..").Control;
            mtr: import("../..").Control;
        };
    };
    /**
     * Unlike superclass's version of this function, Textbox does not update
     * its width.
     * @private
     * @override
     */
    initDimensions(): void;
    /**
     * Generate an object that translates the style object so that it is
     * broken up by visual lines (new lines and automatic wrapping).
     * The original text styles object is broken up by actual lines (new lines only),
     * which is only sufficient for Text / IText
     * @private
     */
    _generateStyleMap(textInfo: any): {};
    /**
     * Returns true if object has a style property or has it on a specified line
     * @param {Number} lineIndex
     * @return {Boolean}
     */
    styleHas(property: any, lineIndex: number): boolean;
    /**
     * Returns true if object has no styling or no styling in a line
     * @param {Number} lineIndex , lineIndex is on wrapped lines.
     * @return {Boolean}
     */
    isEmptyStyles(lineIndex: number): boolean;
    /**
     * @param {Number} lineIndex
     * @param {Number} charIndex
     * @private
     */
    _getStyleDeclaration(lineIndex: number, charIndex: number): TextStyleDeclaration;
    /**
     * @param {Number} lineIndex
     * @param {Number} charIndex
     * @param {Object} style
     * @private
     */
    protected _setStyleDeclaration(lineIndex: number, charIndex: number, style: object): void;
    /**
     * @param {Number} lineIndex
     * @param {Number} charIndex
     * @private
     */
    _deleteStyleDeclaration(lineIndex: number, charIndex: number): void;
    /**
     * probably broken need a fix
     * Returns the real style line that correspond to the wrapped lineIndex line
     * Used just to verify if the line does exist or not.
     * @param {Number} lineIndex
     * @returns {Boolean} if the line exists or not
     * @private
     */
    protected _getLineStyle(lineIndex: number): boolean;
    /**
     * Set the line style to an empty object so that is initialized
     * @param {Number} lineIndex
     * @param {Object} style
     * @private
     */
    protected _setLineStyle(lineIndex: number): void;
    /**
     * Wraps text using the 'width' property of Textbox. First this function
     * splits text on newlines, so we preserve newlines entered by the user.
     * Then it wraps each line using the width of the Textbox by calling
     * _wrapLine().
     * @param {Array} lines The string array of text that is split into lines
     * @param {Number} desiredWidth width you want to wrap to
     * @returns {Array} Array of lines
     */
    _wrapText(lines: string[], desiredWidth: number): string[][];
    /**
     * For each line of text terminated by an hard line stop,
     * measure each word width and extract the largest word from all.
     * The returned words here are the one that at the end will be rendered.
     * @param {string[]} lines the lines we need to measure
     *
     */
    getGraphemeDataForRender(lines: string[]): GraphemeData;
    /**
     * Helper function to measure a string of text, given its lineIndex and charIndex offset
     * It gets called when charBounds are not available yet.
     * Override if necessary
     * Use with {@link Textbox#wordSplit}
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {String} text
     * @param {number} lineIndex
     * @param {number} charOffset
     * @returns {number}
     */
    _measureWord(word: any, lineIndex: number, charOffset?: number): number;
    /**
     * Override this method to customize word splitting
     * Use with {@link Textbox#_measureWord}
     * @param {string} value
     * @returns {string[]} array of words
     */
    wordSplit(value: string): string[];
    /**
     * Wraps a line of text using the width of the Textbox as desiredWidth
     * and leveraging the known width o words from GraphemeData
     * @private
     * @param {Number} lineIndex
     * @param {Number} desiredWidth width you want to wrap the line to
     * @param {GraphemeData} graphemeData an object containing all the lines' words width.
     * @param {Number} reservedSpace space to remove from wrapping for custom functionalities
     * @returns {Array} Array of line(s) into which the given text is wrapped
     * to.
     */
    _wrapLine(lineIndex: number, desiredWidth: number, { largestWordWidth, wordsData }: GraphemeData, reservedSpace?: number): Array<any>;
    /**
     * Detect if the text line is ended with an hard break
     * text and itext do not have wrapping, return false
     * @param {Number} lineIndex text to split
     * @return {Boolean}
     */
    isEndOfWrapping(lineIndex: number): boolean;
    /**
     * Detect if a line has a linebreak and so we need to account for it when moving
     * and counting style.
     * @return Number
     */
    missingNewlineOffset(lineIndex: any): 1 | 0;
    /**
     * Gets lines of text to render in the Textbox. This function calculates
     * text wrapping on the fly every time it is called.
     * @param {String} text text to split
     * @returns {Array} Array of lines in the Textbox.
     * @override
     */
    _splitTextIntoLines(text: string): {
        _unwrappedLines: string[][];
        lines: string[];
        graphemeText: string[];
        graphemeLines: string[][];
    };
    getMinWidth(): number;
    _removeExtraneousStyles(): void;
    /**
     * Returns object representation of an instance
     * @method toObject
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toObject(propertiesToInclude?: Array<any>): Pick<Omit<Partial<import("./IText/IText").ITextProps> & TClassProperties<this>, keyof import("./IText/IText").SerializedITextProps>, "canvas" | "excludeFromExport" | "cornerStyle" | "cornerSize" | "cornerColor" | "cornerStrokeColor" | "cornerDashArray" | "transparentCorners" | "borderColor" | "borderDashArray" | "hasBorders" | "hasControls" | "noScaleCache" | "centeredScaling" | "centeredRotation" | "snapAngle" | "snapThreshold" | "hoverCursor" | "moveCursor" | "selectionBackgroundColor" | "perPixelTargetFind" | "selectable" | "evented" | "activeOn" | "minScaleLimit" | "objectCaching" | "includeDefaultValues" | "inverted" | "absolutePositioned" | "touchCornerSize" | "padding" | "borderOpacityWhenMoving" | "borderScaleFactor" | "lockMovementX" | "lockMovementY" | "lockRotation" | "lockScalingX" | "lockScalingY" | "lockSkewingX" | "lockSkewingY" | "lockScalingFlip" | Exclude<{ [K in keyof this]: this[K] extends Function ? never : K; }[keyof this], keyof import("./IText/IText").SerializedITextProps>> & import("./IText/IText").SerializedITextProps;
}
//# sourceMappingURL=Textbox.d.ts.map