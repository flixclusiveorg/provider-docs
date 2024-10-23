// Types and interfaces
type HsbColor = [number, number, number];
type RgbColor = [number, number, number];
type HslColor = [number, number, number];

class ColorUtils {
    private h: number = 0;
    private s: number = 0;
    private l: number = 0;
    private r: number = 0;
    private g: number = 0;
    private b: number = 0;

    constructor(color: string | HsbColor) {
        if (Array.isArray(color)) {
            // Handle HSB input
            const [h, s, v] = color;
            const hsl = this.hsbToHsl(h, s/100, v/100);
            this.h = hsl[0];
            this.s = hsl[1];
            this.l = hsl[2];
            const rgb = this.hslToRgb(this.h, this.s, this.l);
            [this.r, this.g, this.b] = rgb;
        } else {
            // Handle hex input
            const rgb = this.hexToRgb(color);
            [this.r, this.g, this.b] = rgb;
            const hsl = this.rgbToHsl(this.r, this.g, this.b);
            [this.h, this.s, this.l] = hsl;
        }
    }

    private hsbToHsl(h: number, s: number, v: number): HslColor {
        // Convert HSB/HSV to HSL
        const l = v * (1 - s/2);
        const newS = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
        return [h, newS, l];
    }

    private hslToRgb(h: number, s: number, l: number): RgbColor {
        let r: number, g: number, b: number;

        if (s === 0) {
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            r = hue2rgb(p, q, h / 360 + 1/3);
            g = hue2rgb(p, q, h / 360);
            b = hue2rgb(p, q, h / 360 - 1/3);
        }

        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }

    private rgbToHsl(r: number, g: number, b: number): HslColor {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h *= 60;
        }

        return [h, s, l];
    }

    private hexToRgb(hex: string): RgbColor {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [0, 0, 0];
    }

    private rgbToHex(r: number, g: number, b: number): string {
        const toHex = (n: number) => {
            const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    public isDark(): boolean {
        const yiq = ((this.r * 299) + (this.g * 587) + (this.b * 114)) / 1000;
        return yiq < 128;
    }

    public value(): number {
        return Math.max(this.r, this.g, this.b) / 255 * 100;
    }

    public saturationl(): number {
        return this.s * 100;
    }

    public setValue(value: number): ColorUtils {
        const currentValue = this.value();
        if (currentValue === 0) return this;
        
        const factor = value / currentValue;
        this.r = Math.min(255, this.r * factor);
        this.g = Math.min(255, this.g * factor);
        this.b = Math.min(255, this.b * factor);
        
        const hsl = this.rgbToHsl(this.r, this.g, this.b);
        [this.h, this.s, this.l] = hsl;
        return this;
    }

    public setSaturationl(sat: number): ColorUtils {
        this.s = sat / 100;
        const rgb = this.hslToRgb(this.h, this.s, this.l);
        [this.r, this.g, this.b] = rgb;
        return this;
    }

    public hex(): string {
        return this.rgbToHex(this.r, this.g, this.b);
    }
}

const clamp = (max: number, min: number, n: number) =>
    Math.max(min, Math.min(max, n));

function getContrastPoint(color: ColorUtils): [number, number] {
    if (color.isDark()) return [100, 0];
    return [0, 100];
}

function getDistanceToContrastPoint(bgColor: ColorUtils, color: ColorUtils): number {
    const contrastPoint = getContrastPoint(bgColor);
    return Math.sqrt(
        Math.pow(contrastPoint[0] - color.value(), 2) +
        Math.pow(contrastPoint[1] - color.saturationl(), 2),
    );
}

function moveColorToContrastPoint(
    bgColor: ColorUtils,
    color: ColorUtils,
    amount: number,
): ColorUtils {
    const contrastPoint = getContrastPoint(bgColor);
    const length = getDistanceToContrastPoint(bgColor, color);
    const ratio = amount / length;
    const currentPoint = [color.value(), color.saturationl()];
    const newX = currentPoint[0] + (contrastPoint[0] - currentPoint[0]) * ratio;
    const newY = currentPoint[1] + (contrastPoint[1] - currentPoint[1]) * ratio;
    return new ColorUtils(color.hex())
        .setValue(clamp(100, 0, newX))
        .setSaturationl(clamp(100, 0, newY));
}

function moveRatioColorToContrastPoint(
    bgColor: ColorUtils,
    color: ColorUtils,
    ratio: number,
): ColorUtils {
    const distance = getDistanceToContrastPoint(bgColor, color);
    return moveColorToContrastPoint(bgColor, color, distance * ratio);
}

function makeColors(c: [HsbColor, HsbColor]) {
    const primary = new ColorUtils(c[0]);
    const bg = new ColorUtils(c[1]);
    const text = moveRatioColorToContrastPoint(bg, bg, 0.7);

    return {
        primary: primary.hex(),
        primaryLighter: moveColorToContrastPoint(primary, primary, -30).hex(),
        primaryDarker: moveColorToContrastPoint(primary, primary, 30).hex(),
        background: bg.hex(),
        backgroundLighter: moveColorToContrastPoint(bg, bg, 8).hex(),
        backgroundLightest: moveColorToContrastPoint(bg, bg, 16).hex(),
        backgroundDarker: moveColorToContrastPoint(bg, bg, -8).hex(),
        line: moveColorToContrastPoint(bg, bg, 25).hex(),
        text: text.hex(),
        textLighter: moveColorToContrastPoint(bg, text, 10).hex(),
        textHighlight: bg.isDark() ? '#fff' : '#000',
    };
}

// Example usage
console.log(makeColors([[261, 28, 86], [283, 32, 9]]));