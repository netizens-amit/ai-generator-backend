export interface DesignSystem {
    name: string;
    description: string;
    colors: {
        usage: string;
        contrast: string;
    };
    typography: {
        headings: string;
        body: string;
        sizes: string;
    };
    spacing: {
        sections: string;
        elements: string;
    };
    components: {
        buttons: string;
        cards: string;
        inputs: string;
    };
    layout: string;
    effects: string;
}
export declare const DESIGN_SYSTEMS: Record<string, DesignSystem>;
